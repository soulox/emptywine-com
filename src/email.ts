// Transactional email via authenticated SMTP submission (SmarterMail), sent
// straight from the Worker over a Cloudflare TCP socket — no third-party API.
// Flow: connect :587 → EHLO → STARTTLS → EHLO → AUTH LOGIN → MAIL/RCPT/DATA.
// Never throws (a failed send must not break signup/reset). When SMTP_* is
// unconfigured (local dev) the link is logged to the console instead.
import { connect } from 'cloudflare:sockets';
import { secrets } from './auth';

type Lang = 'en' | 'fr';

const EMAIL: Record<Lang, { verify: T; reset: T }> = {
  en: {
    verify: { subject: 'Confirm your emptywine account', heading: 'Confirm your email', body: 'Welcome to emptywine. Confirm your email address to activate your account and place orders.', cta: 'Confirm email', ignore: 'If you did not create an account, you can ignore this message.' },
    reset: { subject: 'Reset your emptywine password', heading: 'Reset your password', body: 'We received a request to reset your password. This link expires in one hour.', cta: 'Reset password', ignore: 'If you did not request this, you can safely ignore this message.' },
  },
  fr: {
    verify: { subject: 'Confirmez votre compte emptywine', heading: 'Confirmez votre e-mail', body: 'Bienvenue chez emptywine. Confirmez votre adresse e-mail pour activer votre compte et passer commande.', cta: 'Confirmer l’e-mail', ignore: 'Si vous n’avez pas créé de compte, vous pouvez ignorer ce message.' },
    reset: { subject: 'Réinitialisez votre mot de passe emptywine', heading: 'Réinitialisez votre mot de passe', body: 'Nous avons reçu une demande de réinitialisation de votre mot de passe. Ce lien expire dans une heure.', cta: 'Réinitialiser le mot de passe', ignore: 'Si vous n’êtes pas à l’origine de cette demande, ignorez ce message.' },
  },
};
interface T { subject: string; heading: string; body: string; cta: string; ignore: string; }

function template(t: T, link: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#fbfaf7;padding:40px 0">
  <div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:14px;padding:36px 32px">
    <div style="font-size:18px;font-weight:700;letter-spacing:.02em;color:#2a2723">emptywine</div>
    <h1 style="font-size:22px;font-weight:600;color:#2a2723;margin:22px 0 10px">${t.heading}</h1>
    <p style="font-size:15px;line-height:1.6;color:#6b655c;margin:0 0 24px">${t.body}</p>
    <a href="${link}" style="display:inline-block;background:#2a2723;color:#fbfaf7;text-decoration:none;font-size:15px;font-weight:600;padding:13px 26px;border-radius:9px">${t.cta}</a>
    <p style="font-size:12px;line-height:1.6;color:#a79f93;margin:26px 0 0">${t.ignore}</p>
  </div>
</div>`;
}

// ---------- base64 helpers (UTF-8 safe) ----------
function bytesToB64(bytes: Uint8Array): string { let s = ''; for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]); return btoa(s); }
function b64utf8(str: string): string { return bytesToB64(new TextEncoder().encode(str)); }
function b64wrap(str: string): string { const raw = b64utf8(str); const lines: string[] = []; for (let i = 0; i < raw.length; i += 76) lines.push(raw.slice(i, i + 76)); return lines.join('\r\n'); }
// RFC 2047 encoded-word for non-ASCII header values (e.g. accented subjects)
function encWord(s: string): string { return /^[\x00-\x7F]*$/.test(s) ? s : '=?UTF-8?B?' + b64utf8(s) + '?='; }

type SmtpMode = 'tls' | 'starttls' | 'none';
interface SmtpConfig { host: string; port: number; user: string; pass: string; from: string; mode: SmtpMode; }
function smtpConfig(env: Env): SmtpConfig | null {
  const s = secrets(env);
  if (!s.SMTP_HOST || !s.SMTP_USER || !s.SMTP_PASSWORD) return null;
  const port = parseInt(s.SMTP_PORT || '587', 10);
  const sec = (s.SMTP_SECURITY || '').trim().toLowerCase();
  let mode: SmtpMode;
  if (sec === 'tls' || sec === 'ssl') mode = 'tls';
  else if (sec === 'none' || sec === 'off' || sec === 'plain') mode = 'none';
  else if (sec === 'starttls') mode = 'starttls';
  else mode = port === 465 ? 'tls' : 'starttls'; // infer from port
  return {
    host: s.SMTP_HOST.trim(), port,
    user: s.SMTP_USER.trim(), pass: s.SMTP_PASSWORD, from: (s.SMTP_FROM || s.SMTP_USER).trim(), mode,
  };
}

// Minimal line-oriented SMTP reader over a socket's byte stream.
class SmtpConn {
  private reader: ReadableStreamDefaultReader<Uint8Array>;
  private writer: WritableStreamDefaultWriter<Uint8Array>;
  private buf = '';
  private dec = new TextDecoder();
  private enc = new TextEncoder();
  constructor(private stream: { readable: ReadableStream<Uint8Array>; writable: WritableStream<Uint8Array> }) {
    this.reader = stream.readable.getReader();
    this.writer = stream.writable.getWriter();
  }
  // Reads one complete SMTP reply (handles 250-multiline → final "250 ").
  async reply(): Promise<{ code: number; text: string }> {
    for (;;) {
      const lines = this.buf.split('\r\n');
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^(\d{3}) /);
        if (m) { const text = lines.slice(0, i + 1).join('\n'); this.buf = lines.slice(i + 1).join('\r\n'); return { code: parseInt(m[1], 10), text }; }
      }
      const { value, done } = await this.reader.read();
      if (done) throw new Error('SMTP connection closed early');
      this.buf += this.dec.decode(value, { stream: true });
    }
  }
  async write(data: string): Promise<void> { await this.writer.write(this.enc.encode(data)); }
  release(): void { try { this.reader.releaseLock(); } catch { /* */ } try { this.writer.releaseLock(); } catch { /* */ } }
}

function withTimeout<X>(p: Promise<X>, ms: number, label: string): Promise<X> {
  return Promise.race([p, new Promise<X>((_, rej) => setTimeout(() => rej(new Error('timeout: ' + label)), ms))]);
}

async function smtpSend(cfg: SmtpConfig, msg: { to: string; subject: string; html: string }): Promise<void> {
  const domain = cfg.from.split('@')[1] || 'emptywine.com';
  const secureTransport = cfg.mode === 'tls' ? 'on' : cfg.mode === 'starttls' ? 'starttls' : 'off';
  const socket = connect({ hostname: cfg.host, port: cfg.port }, { secureTransport, allowHalfOpen: false });
  let conn = new SmtpConn(socket);
  const expect = async (want: number, step: string) => {
    const r = await withTimeout(conn.reply(), 15000, step);
    if (r.code !== want) throw new Error(`SMTP ${step} → ${r.code}: ${r.text}`);
    return r;
  };
  try {
    await expect(220, 'greeting');
    await conn.write(`EHLO ${domain}\r\n`); await expect(250, 'ehlo');
    if (cfg.mode === 'starttls') {
      await conn.write('STARTTLS\r\n'); await expect(220, 'starttls');
      conn.release();
      conn = new SmtpConn(socket.startTls());
      await conn.write(`EHLO ${domain}\r\n`); await expect(250, 'ehlo-tls');
    }
    await conn.write('AUTH LOGIN\r\n'); await expect(334, 'auth');
    await conn.write(b64utf8(cfg.user) + '\r\n'); await expect(334, 'auth-user');
    await conn.write(b64utf8(cfg.pass) + '\r\n'); await expect(235, 'auth-pass');
    await conn.write(`MAIL FROM:<${cfg.from}>\r\n`); await expect(250, 'mail-from');
    await conn.write(`RCPT TO:<${msg.to}>\r\n`); await expect(250, 'rcpt-to');
    await conn.write('DATA\r\n'); await expect(354, 'data');
    const headers = [
      `From: emptywine <${cfg.from}>`,
      `To: <${msg.to}>`,
      `Subject: ${encWord(msg.subject)}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${crypto.randomUUID()}@${domain}>`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
    ];
    await conn.write(headers.join('\r\n') + '\r\n\r\n' + b64wrap(msg.html) + '\r\n.\r\n');
    await expect(250, 'body');
    await conn.write('QUIT\r\n');
  } finally {
    conn.release();
    try { await socket.close(); } catch { /* already closing */ }
  }
}

async function deliver(env: Env, to: string, subject: string, html: string, devLink: string): Promise<void> {
  const cfg = smtpConfig(env);
  if (!cfg) {
    console.log(`[email:dev] to=${to} · ${subject}\n[email:dev] link → ${devLink}`);
    return;
  }
  try {
    await withTimeout(smtpSend(cfg, { to, subject, html }), 20000, 'smtp-send');
    console.log(`[email] sent ok → ${to} (${cfg.mode})`);
  } catch (e) {
    // swallow — auth/order flow already succeeded; log for diagnosis
    console.log('[email] send failed:', (e as Error).message);
  }
}

export async function sendVerifyEmail(env: Env, origin: string, to: string, lang: Lang, token: string): Promise<void> {
  const link = `${origin}${lang === 'fr' ? '/fr' : ''}/verify?token=${token}`;
  const t = EMAIL[lang].verify;
  await deliver(env, to, t.subject, template(t, link), link);
}
export async function sendResetEmail(env: Env, origin: string, to: string, lang: Lang, token: string): Promise<void> {
  const link = `${origin}${lang === 'fr' ? '/fr' : ''}/reset?token=${token}`;
  const t = EMAIL[lang].reset;
  await deliver(env, to, t.subject, template(t, link), link);
}
