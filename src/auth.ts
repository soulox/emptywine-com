// Authentication, sessions, and the D1 data layer for accounts + orders.
// Password hashing uses WebCrypto PBKDF2 (no external deps). Sessions live in
// KV (revocable, auto-expiring); users and orders live in D1 (relational,
// unique-email constraint). Also hosts parseLabelConfig, shared by the order
// and label-PDF routes so the LabelConfig coercion lives in exactly one place.
import type { LabelConfig } from './labelpdf';

// Secrets/vars are Worker secrets, not part of the generated Env type.
export type Secrets = {
  ADMIN_TOKEN?: string; SLACK_WEBHOOK_URL?: string;
  // SMTP submission (SmarterMail) for transactional email
  SMTP_HOST?: string; SMTP_PORT?: string; SMTP_USER?: string; SMTP_PASSWORD?: string; SMTP_FROM?: string;
};
export function secrets(env: Env): Secrets { return env as unknown as Secrets; }

export type OrderStatus = 'received' | 'in_production' | 'shipped' | 'cancelled';
export const ORDER_STATUSES: OrderStatus[] = ['received', 'in_production', 'shipped', 'cancelled'];

export interface User {
  id: string; email: string; name: string; company: string; phone: string; emailVerified: boolean;
}
export interface OrderRow {
  id: string; orderNo: string; userId: string; design: LabelConfig;
  quantity: number; notes: string; status: OrderStatus; lang: 'en' | 'fr';
  createdAt: string; updatedAt: string;
}

// ---------- encoding helpers ----------
const enc = new TextEncoder();
function bytesToB64(b: Uint8Array): string { let s = ''; for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s); }
function b64ToBytes(s: string): Uint8Array { const bin = atob(s); const a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }
function b64url(b: Uint8Array): string { return bytesToB64(b).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
export function randomToken(bytes = 32): string { return b64url(crypto.getRandomValues(new Uint8Array(bytes))); }
function randomId(prefix: string): string { return prefix + b64url(crypto.getRandomValues(new Uint8Array(12))).slice(0, 16); }

// ---------- password hashing (PBKDF2-SHA256) ----------
const PBKDF2_ITERS = 100000;
async function pbkdf2(password: string, salt: Uint8Array, iters: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: iters, hash: 'SHA-256' }, key, 256);
  return new Uint8Array(bits);
}
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITERS);
  return `pbkdf2$${PBKDF2_ITERS}$${bytesToB64(salt)}$${bytesToB64(hash)}`;
}
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iters = parseInt(parts[1], 10);
  if (!Number.isFinite(iters) || iters < 1) return false;
  const actual = await pbkdf2(password, b64ToBytes(parts[2]), iters);
  return timingSafeEqual(actual, b64ToBytes(parts[3]));
}

// ---------- cookies & sessions ----------
const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days
export function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get('Cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return null;
}
export function sessionCookie(token: string, maxAge = SESSION_TTL): string {
  return `ew_sess=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}
export function clearSessionCookie(): string {
  return 'ew_sess=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0';
}
export async function createSession(env: Env, userId: string): Promise<string> {
  const token = randomToken(32);
  await env.CONTACTS.put(`sess:${token}`, userId, { expirationTtl: SESSION_TTL });
  return token;
}
export async function destroySession(request: Request, env: Env): Promise<void> {
  const token = getCookie(request, 'ew_sess');
  if (token) await env.CONTACTS.delete(`sess:${token}`);
}
export async function currentUser(request: Request, env: Env): Promise<User | null> {
  const token = getCookie(request, 'ew_sess');
  if (!token) return null;
  const userId = await env.CONTACTS.get(`sess:${token}`);
  if (!userId) return null;
  return getUserById(env, userId);
}

// ---------- one-shot email tokens (KV, TTL) ----------
export async function issueToken(env: Env, kind: 'verify' | 'reset', userId: string): Promise<string> {
  const token = randomToken(24);
  const ttl = kind === 'verify' ? 60 * 60 * 24 : 60 * 60; // verify 24h, reset 1h
  await env.CONTACTS.put(`${kind}:${token}`, userId, { expirationTtl: ttl });
  return token;
}
export async function consumeToken(env: Env, kind: 'verify' | 'reset', token: string): Promise<string | null> {
  const key = `${kind}:${token}`;
  const userId = await env.CONTACTS.get(key);
  if (userId) await env.CONTACTS.delete(key); // single-use
  return userId;
}

// ---------- users (D1) ----------
interface UserRow { id: string; email: string; name: string | null; company: string | null; phone: string | null; email_verified: number; }
function mapUser(r: UserRow): User {
  return { id: r.id, email: r.email, name: r.name ?? '', company: r.company ?? '', phone: r.phone ?? '', emailVerified: !!r.email_verified };
}
export async function getUserById(env: Env, id: string): Promise<User | null> {
  const r = await env.DB.prepare('SELECT id,email,name,company,phone,email_verified FROM users WHERE id=?').bind(id).first<UserRow>();
  return r ? mapUser(r) : null;
}
export async function getUserByEmail(env: Env, email: string): Promise<User | null> {
  const r = await env.DB.prepare('SELECT id,email,name,company,phone,email_verified FROM users WHERE email=?').bind(email.toLowerCase()).first<UserRow>();
  return r ? mapUser(r) : null;
}
// Returns the stored hash for a login attempt, or null if no such account.
export async function findLogin(env: Env, email: string): Promise<{ id: string; passwordHash: string } | null> {
  const r = await env.DB.prepare('SELECT id,password_hash FROM users WHERE email=?').bind(email.toLowerCase())
    .first<{ id: string; password_hash: string }>();
  return r ? { id: r.id, passwordHash: r.password_hash } : null;
}
// Throws if the email is already taken (UNIQUE constraint).
export async function createUser(env: Env, d: { email: string; passwordHash: string; name: string; company: string; phone: string }): Promise<User> {
  const id = randomId('usr_');
  await env.DB.prepare('INSERT INTO users (id,email,password_hash,name,company,phone,email_verified,created_at) VALUES (?,?,?,?,?,?,0,?)')
    .bind(id, d.email.toLowerCase(), d.passwordHash, d.name, d.company, d.phone, new Date().toISOString()).run();
  return { id, email: d.email.toLowerCase(), name: d.name, company: d.company, phone: d.phone, emailVerified: false };
}
export async function setEmailVerified(env: Env, id: string): Promise<void> {
  await env.DB.prepare('UPDATE users SET email_verified=1 WHERE id=?').bind(id).run();
}
export async function setPassword(env: Env, id: string, passwordHash: string): Promise<void> {
  await env.DB.prepare('UPDATE users SET password_hash=? WHERE id=?').bind(passwordHash, id).run();
}

// ---------- orders (D1) ----------
interface OrderDbRow {
  id: string; order_no: string | null; user_id: string; design_json: string;
  quantity: number | null; notes: string | null; status: string; lang: string;
  created_at: string; updated_at: string; rowid: number;
}
function mapOrder(r: OrderDbRow): OrderRow {
  let design: LabelConfig;
  try { design = JSON.parse(r.design_json) as LabelConfig; } catch { design = {} as LabelConfig; }
  return {
    id: r.id, orderNo: r.order_no ?? `EW-${1000 + r.rowid}`, userId: r.user_id, design,
    quantity: r.quantity ?? 0, notes: r.notes ?? '', status: (r.status as OrderStatus), lang: r.lang === 'fr' ? 'fr' : 'en',
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}
const ORDER_COLS = 'rowid,id,order_no,user_id,design_json,quantity,notes,status,lang,created_at,updated_at';

export async function createOrder(env: Env, d: { userId: string; design: LabelConfig; quantity: number; notes: string; lang: 'en' | 'fr' }): Promise<OrderRow> {
  const id = randomId('ord_');
  const now = new Date().toISOString();
  const row = await env.DB.prepare(
    'INSERT INTO orders (id,user_id,design_json,quantity,notes,status,lang,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?) RETURNING rowid'
  ).bind(id, d.userId, JSON.stringify(d.design), d.quantity, d.notes, 'received', d.lang, now, now).first<{ rowid: number }>();
  const orderNo = `EW-${1000 + Number(row!.rowid)}`;
  await env.DB.prepare('UPDATE orders SET order_no=? WHERE id=?').bind(orderNo, id).run();
  return { id, orderNo, userId: d.userId, design: d.design, quantity: d.quantity, notes: d.notes, status: 'received', lang: d.lang, createdAt: now, updatedAt: now };
}
export async function listOrdersByUser(env: Env, userId: string): Promise<OrderRow[]> {
  const res = await env.DB.prepare(`SELECT ${ORDER_COLS} FROM orders WHERE user_id=? ORDER BY rowid DESC`).bind(userId).all<OrderDbRow>();
  return (res.results ?? []).map(mapOrder);
}
export async function getOrderByNo(env: Env, orderNo: string): Promise<OrderRow | null> {
  const r = await env.DB.prepare(`SELECT ${ORDER_COLS} FROM orders WHERE order_no=?`).bind(orderNo).first<OrderDbRow>();
  return r ? mapOrder(r) : null;
}
export async function updateOrderStatus(env: Env, orderNo: string, status: OrderStatus): Promise<void> {
  await env.DB.prepare('UPDATE orders SET status=?, updated_at=? WHERE order_no=?').bind(status, new Date().toISOString(), orderNo).run();
}
export interface AdminOrder extends OrderRow { email: string; company: string; }
export async function listAllOrders(env: Env, limit = 200): Promise<AdminOrder[]> {
  const res = await env.DB.prepare(
    `SELECT o.rowid,o.id,o.order_no,o.user_id,o.design_json,o.quantity,o.notes,o.status,o.lang,o.created_at,o.updated_at,
            u.email AS email, u.company AS company
     FROM orders o JOIN users u ON u.id=o.user_id ORDER BY o.rowid DESC LIMIT ?`
  ).bind(limit).all<OrderDbRow & { email: string; company: string | null }>();
  return (res.results ?? []).map((r) => ({ ...mapOrder(r), email: r.email, company: r.company ?? '' }));
}

// ---------- shared LabelConfig coercion (also used by /api/label.pdf) ----------
export function parseLabelConfig(body: Record<string, unknown>): LabelConfig {
  const str = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n]+/g, ' ').slice(0, max).trim();
  const clamp = (v: unknown) => { const n = Number(v); return Number.isFinite(n) ? Math.min(2, Math.max(0.4, n)) : 1; };
  const style = (['cream', 'noir', 'blanc'] as const).find((s) => s === body.style) ?? 'cream';
  const lang: 'en' | 'fr' = body.lang === 'fr' ? 'fr' : 'en';
  const sc = (body.scales ?? {}) as Record<string, unknown>;
  return {
    appellation: str(body.appellation, 60) || 'Appellation Contrôlée',
    brand: str(body.brand, 60) || 'emptywine',
    klass: str(body.klass, 40) || 'Grand Réserve',
    varietal: str(body.varietal, 60) || (lang === 'fr' ? 'Bourgogne · Pinot Noir' : 'Burgundy · Pinot Noir'),
    vintage: str(body.vintage, 12) || 'MMXXV',
    style, lang,
    scales: {
      appellation: clamp(sc.appellation), brand: clamp(sc.brand), class: clamp(sc.class),
      varietal: clamp(sc.varietal), vintage: clamp(sc.vintage),
    },
  };
}
