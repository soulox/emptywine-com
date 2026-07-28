// Business-facing order management, behind a shared ADMIN_TOKEN. The token is
// submitted via POST (never a URL query, so it can't leak in logs/referrers) and
// exchanged for a short-lived KV-backed admin session cookie. Lists all orders
// with a proof thumbnail and a status control.
import {
  listAllOrders, updateOrderStatus, getCookie, randomToken, secrets,
  ORDER_STATUSES, type OrderStatus, type AdminOrder,
} from './auth';
import { labelStyles, labelMarkup } from './label';

function esc(s: string): string { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function html(body: string, status = 200, cookie?: string): Response {
  const h = new Headers({ 'content-type': 'text/html; charset=utf-8' });
  if (cookie) h.append('Set-Cookie', cookie);
  return new Response(body, { status, headers: h });
}
// constant-time string compare
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
async function isAdmin(request: Request, env: Env): Promise<boolean> {
  const token = getCookie(request, 'ew_admin');
  if (!token) return false;
  return (await env.CONTACTS.get(`asess:${token}`)) === '1';
}
function page(title: string, inner: string, extraCss = ''): string {
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" /><title>${esc(title)} · emptywine admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />
<style>
:root{--bg:#fbfaf7;--ink:#2a2723;--muted:#6b655c;--bronze:#836237;--border:rgba(42,39,35,.12);}
*{box-sizing:border-box;}body{margin:0;font-family:'Manrope',system-ui,sans-serif;background:var(--bg);color:var(--ink);}
.wrap{max-width:1100px;margin:0 auto;padding:30px 20px 80px;}
h1{font-size:26px;font-weight:600;margin:0 0 24px;}
.card{max-width:400px;margin:60px auto;background:#fff;border:1px solid var(--border);border-radius:16px;padding:32px;}
label{display:block;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:6px;}
input,select{font:inherit;border:1px solid var(--border);border-radius:9px;padding:11px 12px;width:100%;background:#fff;color:var(--ink);}
.btn{background:var(--ink);color:var(--bg);border:none;border-radius:10px;padding:12px 18px;font-weight:600;cursor:pointer;}
.err{background:#fbecea;color:#a3352a;border:1px solid rgba(163,53,42,.3);border-radius:10px;padding:12px 14px;margin-bottom:18px;font-size:14px;}
table{width:100%;border-collapse:collapse;}
th,td{text-align:left;padding:12px 10px;border-bottom:1px solid var(--border);vertical-align:middle;font-size:14px;}
th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);}
.mini{width:40px;height:48px;border-radius:4px;overflow:hidden;box-shadow:0 2px 6px rgba(58,44,26,.14);}
.on{font-weight:700;}
.stat{display:flex;gap:8px;align-items:center;}
${extraCss}
</style></head><body><div class="wrap">${inner}</div></body></html>`;
}
function loginForm(err = false): string {
  return page('Sign in', `<div class="card">
${err ? '<div class="err">Invalid token.</div>' : ''}
<h1 style="margin-bottom:8px">Admin</h1>
<form method="post" action="/api/admin/login">
  <label for="token">Access token</label>
  <input id="token" name="token" type="password" autocomplete="off" required />
  <div style="height:16px"></div>
  <button class="btn" type="submit">Enter</button>
</form></div>`);
}
function ordersTable(orders: AdminOrder[]): string {
  const rows = orders.map((o) => `<tr>
  <td><div class="mini">${labelMarkup(o.design, { inlineScales: true })}</div></td>
  <td><span class="on">${esc(o.orderNo)}</span></td>
  <td>${esc(o.design.brand)}<br><span style="color:var(--muted)">${esc(o.design.style)} · ${o.quantity || '—'}</span></td>
  <td>${esc(o.company || '—')}<br><span style="color:var(--muted)">${esc(o.email)}</span></td>
  <td>${new Date(o.createdAt).toLocaleDateString('en-GB')}</td>
  <td><form class="stat" method="post" action="/api/admin/order-status">
    <input type="hidden" name="order" value="${esc(o.orderNo)}" />
    <select name="status">${ORDER_STATUSES.map((s) => `<option value="${s}"${s === o.status ? ' selected' : ''}>${s.replace('_', ' ')}</option>`).join('')}</select>
    <button class="btn" type="submit">Save</button>
  </form></td>
</tr>`).join('\n');
  return page('Orders', `<h1>Orders <span style="color:var(--muted);font-weight:400">(${orders.length})</span></h1>
<table><thead><tr><th></th><th>Order</th><th>Design</th><th>Customer</th><th>Placed</th><th>Status</th></tr></thead>
<tbody>${rows || '<tr><td colspan="6" style="color:var(--muted);padding:30px 10px">No orders yet.</td></tr>'}</tbody></table>`,
    labelStyles());
}

export async function adminRouter(request: Request, env: Env, ctx: ExecutionContext): Promise<Response | null> {
  void ctx;
  const url = new URL(request.url);
  const method = request.method;
  const p = url.pathname;

  if (method === 'GET' && p === '/admin') {
    if (await isAdmin(request, env)) return html(ordersTable(await listAllOrders(env)));
    return html(loginForm());
  }
  if (method === 'POST' && p === '/api/admin/login') {
    if (request.headers.get('Origin') && request.headers.get('Origin') !== url.origin) return new Response('bad origin', { status: 403 });
    const configured = secrets(env).ADMIN_TOKEN;
    const f = await request.formData();
    const token = String(f.get('token') || '');
    if (!configured || !safeEqual(token, configured)) return html(loginForm(true), 401);
    const sess = randomToken(32);
    await env.CONTACTS.put(`asess:${sess}`, '1', { expirationTtl: 60 * 60 * 12 });
    return html(ordersTable(await listAllOrders(env)), 200, `ew_admin=${sess}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 12}`);
  }
  if (method === 'POST' && p === '/api/admin/order-status') {
    if (!(await isAdmin(request, env))) return new Response('unauthorized', { status: 401 });
    if (request.headers.get('Origin') && request.headers.get('Origin') !== url.origin) return new Response('bad origin', { status: 403 });
    const f = await request.formData();
    const orderNo = String(f.get('order') || '');
    const status = String(f.get('status') || '') as OrderStatus;
    if (!ORDER_STATUSES.includes(status)) return new Response('bad status', { status: 400 });
    await updateOrderStatus(env, orderNo, status);
    return html(ordersTable(await listAllOrders(env)));
  }

  return null;
}
