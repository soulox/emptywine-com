// Customer-facing account area: signup, login, email verification, password
// reset, the "My Orders" dashboard, a single order page, and order submission.
// Exposed as one router (accountRouter) that index.ts calls before its 404.
// User-facing copy lives in the shared i18n dictionary (COPY[lang].account).
import { COPY as I18N, type Lang } from './i18n';
import {
  currentUser, createUser, findLogin, getUserByEmail, hashPassword, verifyPassword,
  createSession, destroySession, sessionCookie, clearSessionCookie,
  issueToken, consumeToken, setEmailVerified, setPassword,
  createOrder, listOrdersByUser, getOrderByNo, parseLabelConfig, secrets,
  type User, type OrderRow, type OrderStatus,
} from './auth';
import { sendVerifyEmail, sendResetEmail } from './email';
import { labelStyles, labelMarkup } from './label';
import { renderLabelPdf } from './labelpdf';

// ---------- copy ----------
// Account/order copy lives in the shared i18n dictionary (src/i18n.ts) under
// I18N[lang].account, so all user-facing strings have one source of truth.
const AC = (l: Lang) => I18N[l].account;

// ---------- small helpers ----------
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function esc(s: string): string { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function pfx(lang: Lang): string { return lang === 'fr' ? '/fr' : ''; }
function redirect(location: string, cookie?: string): Response {
  const h = new Headers({ Location: location });
  if (cookie) h.append('Set-Cookie', cookie);
  return new Response(null, { status: 302, headers: h });
}
function html(body: string, status = 200): Response {
  return new Response(body, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });
}
// CSRF: state-changing POSTs must come from our own origin.
function sameOrigin(request: Request, url: URL): boolean {
  const o = request.headers.get('Origin');
  if (o) return o === url.origin;
  const r = request.headers.get('Referer');
  if (r) { try { return new URL(r).origin === url.origin; } catch { return false; } }
  return false; // no Origin/Referer on a POST → reject
}
async function rateLimit(env: Env, key: string, max: number): Promise<boolean> {
  const n = parseInt((await env.CONTACTS.get(key)) || '0', 10);
  if (n >= max) return false;
  await env.CONTACTS.put(key, String(n + 1), { expirationTtl: 3600 });
  return true;
}

// ---------- page shell ----------
function shell(o: { lang: Lang; title: string; body: string; extraCss?: string }): string {
  const other = o.lang === 'fr' ? '/en-placeholder' : '';
  void other;
  return `<!doctype html><html lang="${o.lang}"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>${esc(o.title)} · emptywine</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0 0 40 40'%3E%3Ccircle%20cx='20'%20cy='20'%20r='20'%20fill='%238a6a3c'/%3E%3Cpath%20fill='%23fbfaf7'%20d='M18.4%207h3.2v4.4q0%201.1%20.75%201.95l.7%20.8q1.45%201.6%201.45%203.9V30q0%201.5-1.5%201.5h-6.4q-1.5%200-1.5-1.5V18.05q0-2.3%201.45-3.9l.7-.8Q18.4%2012.5%2018.4%2011.4z'/%3E%3Crect%20x='15.4'%20y='22.2'%20width='9.2'%20height='4.4'%20fill='%238a6a3c'/%3E%3C/svg%3E" />
<style>
:root{--bg:#fbfaf7;--bg-2:#f4f1ea;--ink:#2a2723;--text:#47423b;--muted:#6b655c;--faint:#787061;--bronze:#836237;--border:rgba(42,39,35,0.12);}
*{box-sizing:border-box;}
body{margin:0;font-family:'Manrope',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--ink);line-height:1.5;-webkit-font-smoothing:antialiased;}
a{color:var(--bronze);}
.wrap{max-width:960px;margin:0 auto;padding:28px 20px 80px;}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--border);}
.brand{font-weight:700;letter-spacing:.02em;color:var(--ink);text-decoration:none;font-size:18px;}
.topbar .r{display:flex;gap:18px;align-items:center;font-size:14px;}
.topbar a{color:var(--muted);text-decoration:none;}
.card{max-width:420px;margin:40px auto;background:#fff;border:1px solid var(--border);border-radius:16px;padding:34px 30px;}
.card h1{font-size:24px;font-weight:600;margin:0 0 6px;}
.card .lede{color:var(--muted);font-size:14px;margin:0 0 22px;}
.field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
.field label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--faint);}
.field .hint{font-weight:400;text-transform:none;letter-spacing:0;color:var(--muted);}
input,textarea,select{font:inherit;color:var(--ink);background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px 12px;width:100%;}
input:focus,textarea:focus,select:focus{outline:2px solid var(--bronze);outline-offset:1px;border-color:var(--bronze);}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--ink);color:var(--bg);border:none;border-radius:10px;padding:13px 20px;font-size:15px;font-weight:600;cursor:pointer;width:100%;text-decoration:none;transition:transform .12s ease;}
.btn:active{transform:translateY(1px);}
.btn.secondary{background:transparent;color:var(--ink);border:1px solid var(--border);}
.alt{text-align:center;font-size:14px;color:var(--muted);margin-top:18px;}
.banner{border-radius:11px;padding:13px 16px;font-size:14px;margin:0 0 20px;}
.banner.info{background:#f3efe4;color:#6b5a34;border:1px solid rgba(131,98,55,.25);}
.banner.error{background:#fbecea;color:#a3352a;border:1px solid rgba(163,53,42,.3);}
.banner.ok{background:#eaf4ec;color:#2f6b3f;border:1px solid rgba(47,107,63,.28);}
h1.page{font-size:30px;font-weight:300;letter-spacing:-.01em;margin:8px 0 4px;}
.sub{color:var(--muted);margin:0 0 28px;}
.orders{display:flex;flex-direction:column;gap:14px;}
.order-row{display:flex;align-items:center;gap:18px;background:#fff;border:1px solid var(--border);border-radius:14px;padding:16px 18px;text-decoration:none;color:inherit;transition:border-color .15s ease;}
.order-row:hover{border-color:var(--bronze);}
.order-row .mini{width:52px;height:62px;border-radius:5px;flex:0 0 auto;box-shadow:0 2px 8px rgba(58,44,26,.14);overflow:hidden;}
.order-row .meta{flex:1;min-width:0;}
.order-row .on{font-weight:700;letter-spacing:.02em;}
.order-row .om{color:var(--muted);font-size:13px;}
.pill{font-size:12px;font-weight:700;padding:5px 11px;border-radius:999px;white-space:nowrap;}
.pill.received{background:#f3efe4;color:#6b5a34;}
.pill.in_production{background:#eef1f6;color:#3a4a6b;}
.pill.shipped{background:#eaf4ec;color:#2f6b3f;}
.pill.cancelled{background:#f0eeec;color:#807a72;}
.proof-box{width:280px;height:336px;border-radius:8px;box-shadow:0 10px 34px rgba(58,44,26,.18);overflow:hidden;flex:0 0 auto;}
.order-detail{display:flex;gap:36px;flex-wrap:wrap;align-items:flex-start;}
.order-actions{display:flex;flex-direction:column;gap:12px;max-width:300px;flex:1;min-width:240px;}
.kv{margin:0 0 14px;}
.kv .k{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--faint);}
.kv .v{font-size:16px;}
.muted{color:var(--muted);}
${o.extraCss || ''}
</style></head>
<body>
<div class="topbar">
  <a class="brand" href="/${o.lang === 'fr' ? 'fr' : ''}">emptywine</a>
  <div class="r"><a href="${pfx(o.lang)}/account">${AC(o.lang).myOrders}</a></div>
</div>
${o.body}
</body></html>`;
}

// ---------- form renderers ----------
function loginPage(lang: Lang, banner?: string, bannerKind = 'info', next = ''): string {
  const t = AC(lang);
  const nx = next ? `?next=${encodeURIComponent(next)}` : '';
  const body = `<div class="wrap"><div class="card">
${banner ? `<div class="banner ${bannerKind}">${esc(banner)}</div>` : ''}
<h1>${t.loginTitle}</h1>
<form method="post" action="/api/login${nx}">
  <div class="field"><label for="email">${t.email}</label><input id="email" name="email" type="email" autocomplete="email" required /></div>
  <div class="field"><label for="password">${t.password}</label><input id="password" name="password" type="password" autocomplete="current-password" required /></div>
  <input type="hidden" name="lang" value="${lang}" />
  <button class="btn" type="submit">${t.signIn}</button>
</form>
<p class="alt"><a href="${pfx(lang)}/forgot">${t.forgotLink}</a></p>
<p class="alt">${t.noAccount} <a href="${pfx(lang)}/signup${nx}">${t.signUp}</a></p>
</div></div>`;
  return shell({ lang, title: t.loginTitle, body });
}
function signupPage(lang: Lang, banner?: string, bannerKind = 'error', next = ''): string {
  const t = AC(lang);
  const nx = next ? `?next=${encodeURIComponent(next)}` : '';
  const body = `<div class="wrap"><div class="card">
${banner ? `<div class="banner ${bannerKind}">${esc(banner)}</div>` : ''}
<h1>${t.signupTitle}</h1>
<form method="post" action="/api/signup${nx}">
  <div class="field"><label for="name">${t.name}</label><input id="name" name="name" type="text" autocomplete="name" required /></div>
  <div class="field"><label for="company">${t.company}</label><input id="company" name="company" type="text" autocomplete="organization" required /></div>
  <div class="field"><label for="email">${t.email}</label><input id="email" name="email" type="email" autocomplete="email" required /></div>
  <div class="field"><label for="phone">${t.phone} <span class="hint">(${t.optional})</span></label><input id="phone" name="phone" type="tel" autocomplete="tel" /></div>
  <div class="field"><label for="password">${t.password}</label><input id="password" name="password" type="password" autocomplete="new-password" minlength="8" required /></div>
  <input type="hidden" name="lang" value="${lang}" />
  <button class="btn" type="submit">${t.createAccount}</button>
</form>
<p class="alt">${t.haveAccount} <a href="${pfx(lang)}/login${nx}">${t.signIn}</a></p>
</div></div>`;
  return shell({ lang, title: t.signupTitle, body });
}
function forgotPage(lang: Lang, banner?: string, bannerKind = 'info'): string {
  const t = AC(lang);
  const body = `<div class="wrap"><div class="card">
${banner ? `<div class="banner ${bannerKind}">${esc(banner)}</div>` : ''}
<h1>${t.forgotTitle}</h1><p class="lede">${t.forgotIntro}</p>
<form method="post" action="/api/forgot">
  <div class="field"><label for="email">${t.email}</label><input id="email" name="email" type="email" autocomplete="email" required /></div>
  <input type="hidden" name="lang" value="${lang}" />
  <button class="btn" type="submit">${t.sendReset}</button>
</form>
<p class="alt"><a href="${pfx(lang)}/login">${t.signIn}</a></p>
</div></div>`;
  return shell({ lang, title: t.forgotTitle, body });
}
function resetPage(lang: Lang, token: string, banner?: string, bannerKind = 'error'): string {
  const t = AC(lang);
  const body = `<div class="wrap"><div class="card">
${banner ? `<div class="banner ${bannerKind}">${esc(banner)}</div>` : ''}
<h1>${t.resetTitle}</h1><p class="lede">${t.resetIntro}</p>
<form method="post" action="/api/reset">
  <input type="hidden" name="token" value="${esc(token)}" />
  <input type="hidden" name="lang" value="${lang}" />
  <div class="field"><label for="password">${t.newPassword}</label><input id="password" name="password" type="password" autocomplete="new-password" minlength="8" required /></div>
  <button class="btn" type="submit">${t.updatePassword}</button>
</form>
</div></div>`;
  return shell({ lang, title: t.resetTitle, body });
}

function statusPill(lang: Lang, s: OrderStatus): string {
  return `<span class="pill ${s}">${AC(lang).statusLabels[s]}</span>`;
}
function dashboardPage(lang: Lang, user: User, orders: OrderRow[], banner?: string, bannerKind = 'info'): string {
  const t = AC(lang);
  const rows = orders.map((o) => `<a class="order-row" href="${pfx(lang)}/account/order/${o.orderNo}">
  <div class="mini">${labelMarkup(o.design, { inlineScales: true })}</div>
  <div class="meta"><div class="on">${esc(o.orderNo)}</div><div class="om">${esc(o.design.brand)} · ${new Date(o.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB')}</div></div>
  ${statusPill(lang, o.status)}
</a>`).join('\n');
  const list = orders.length
    ? `<div class="orders">${rows}</div>`
    : `<p class="muted">${t.noOrders}</p><p><a class="btn" style="max-width:260px" href="${pfx(lang)}/design">${t.startDesign}</a></p>`;
  const body = `<div class="wrap">
${banner ? `<div class="banner ${bannerKind}">${esc(banner)}</div>` : ''}
${!user.emailVerified ? `<div class="banner info">${t.verifyBanner}</div>` : ''}
<h1 class="page">${t.myOrders}</h1>
<p class="sub">${esc(user.company || user.name || user.email)} · <a href="/api/logout" onclick="event.preventDefault();document.getElementById('lo').submit();">${t.signOut}</a></p>
<form id="lo" method="post" action="/api/logout" hidden><input type="hidden" name="lang" value="${lang}" /></form>
${list}
</div>`;
  // scale the label down inside the tiny 52x62 thumbnail
  const extraCss = labelStyles() + '\n.order-row .mini .label-paper{border-radius:4px;}';
  return shell({ lang, title: t.accountTitle, body, extraCss });
}
function orderPage(lang: Lang, user: User, order: OrderRow, justPlaced: boolean): string {
  const t = AC(lang);
  void user;
  const d = order.design;
  const body = `<div class="wrap">
<p><a class="muted" href="${pfx(lang)}/account" style="text-decoration:none">← ${t.backToOrders}</a></p>
${justPlaced ? `<div class="banner ok"><strong>${t.orderPlaced}.</strong> ${t.orderThanks}</div>` : ''}
<h1 class="page">${esc(order.orderNo)}</h1>
<p class="sub">${statusPill(lang, order.status)} &nbsp; ${t.placed} ${new Date(order.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB')}</p>
<div class="order-detail">
  <div class="proof-box">${labelMarkup(d, { inlineScales: true })}</div>
  <div class="order-actions">
    <div class="kv"><div class="k">${t.quantity}</div><div class="v">${order.quantity ? esc(String(order.quantity)) + ' ' + t.bottles : '—'}</div></div>
    ${order.notes ? `<div class="kv"><div class="k">${t.orderNotes}</div><div class="v muted">${esc(order.notes)}</div></div>` : ''}
    <a class="btn" href="${pfx(lang)}/account/order/${order.orderNo}/proof.pdf">${t.downloadPdf}</a>
    <a class="btn secondary" href="${pfx(lang)}/design?order=${order.orderNo}">${t.reopenEdit}</a>
  </div>
</div>
</div>`;
  return shell({ lang, title: order.orderNo, body, extraCss: labelStyles() });
}

// ---------- Slack ping for a new order ----------
async function notifyOrder(env: Env, o: OrderRow, user: User): Promise<void> {
  const webhook = secrets(env).SLACK_WEBHOOK_URL;
  if (!webhook) return;
  try {
    const text = `:package: *New emptywine order ${o.orderNo}*\n*Company:* ${user.company || '—'}\n*Contact:* ${user.name || '—'} · ${user.email}\n*Brand:* ${o.design.brand} · *Style:* ${o.design.style}\n*Quantity:* ${o.quantity || '—'}\n${o.notes ? '*Notes:* ' + o.notes : ''}`;
    await fetch(webhook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text }) });
  } catch { /* best-effort */ }
}

// ---------- router ----------
export async function accountRouter(request: Request, env: Env, ctx: ExecutionContext): Promise<Response | null> {
  const url = new URL(request.url);
  const method = request.method;
  const isFr = url.pathname === '/fr' || url.pathname.startsWith('/fr/');
  const p = isFr ? (url.pathname.slice(3) || '/') : url.pathname;
  const lang: Lang = isFr ? 'fr' : 'en';
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  // ----- GET pages -----
  if (method === 'GET' && p === '/login') {
    if (await currentUser(request, env)) return redirect(`${pfx(lang)}/account`);
    return html(loginPage(lang, undefined, 'info', url.searchParams.get('next') || ''));
  }
  if (method === 'GET' && p === '/signup') {
    if (await currentUser(request, env)) return redirect(`${pfx(lang)}/account`);
    return html(signupPage(lang, undefined, 'error', url.searchParams.get('next') || ''));
  }
  if (method === 'GET' && p === '/forgot') return html(forgotPage(lang));
  if (method === 'GET' && p === '/reset') {
    const token = url.searchParams.get('token') || '';
    if (!token) return html(forgotPage(lang, AC(lang).resetExpired, 'error'));
    return html(resetPage(lang, token));
  }
  if (method === 'GET' && p === '/verify') {
    const token = url.searchParams.get('token') || '';
    const userId = token ? await consumeToken(env, 'verify', token) : null;
    if (!userId) {
      const u = await currentUser(request, env);
      if (u) return html(dashboardPage(lang, u, await listOrdersByUser(env, u.id), AC(lang).verifyExpired, 'error'));
      return redirect(`${pfx(lang)}/login`);
    }
    await setEmailVerified(env, userId);
    const u = await currentUser(request, env);
    if (u) return html(dashboardPage(lang, { ...u, emailVerified: true }, await listOrdersByUser(env, u.id), AC(lang).verifiedOk, 'ok'));
    return redirect(`${pfx(lang)}/login`);
  }
  if (method === 'GET' && p === '/account') {
    const u = await currentUser(request, env);
    if (!u) return redirect(`${pfx(lang)}/login?next=${encodeURIComponent(pfx(lang) + '/account')}`);
    return html(dashboardPage(lang, u, await listOrdersByUser(env, u.id)));
  }
  // /account/order/{no}  and  /account/order/{no}/proof.pdf
  const om = p.match(/^\/account\/order\/([A-Za-z0-9-]+)(\/proof\.pdf)?$/);
  if (method === 'GET' && om) {
    const u = await currentUser(request, env);
    if (!u) return redirect(`${pfx(lang)}/login`);
    const order = await getOrderByNo(env, om[1]);
    if (!order || order.userId !== u.id) return html(shell({ lang, title: '404', body: '<div class="wrap"><h1 class="page">Not found</h1></div>' }), 404);
    if (om[2]) {
      const pdf = await renderLabelPdf(order.design);
      const fname = order.orderNo + '-label-proof.pdf';
      return new Response(pdf, { headers: { 'content-type': 'application/pdf', 'content-disposition': `attachment; filename="${fname}"` } });
    }
    return html(orderPage(lang, u, order, url.searchParams.get('placed') === '1'));
  }

  // ----- POST APIs (non-prefixed) -----
  if (method === 'POST' && url.pathname === '/api/signup') {
    if (!sameOrigin(request, url)) return new Response('bad origin', { status: 403 });
    if (!(await rateLimit(env, `rl:signup:${ip}`, 8))) return html(signupPage(lang, AC(lang).rateLimited, 'error'), 429);
    const f = await request.formData();
    const lg: Lang = String(f.get('lang')) === 'fr' ? 'fr' : 'en';
    const email = String(f.get('email') || '').trim().toLowerCase();
    const password = String(f.get('password') || '');
    const name = String(f.get('name') || '').trim().slice(0, 120);
    const company = String(f.get('company') || '').trim().slice(0, 120);
    const phone = String(f.get('phone') || '').trim().slice(0, 40);
    const next = url.searchParams.get('next') || `${pfx(lg)}/account`;
    if (!emailRe.test(email) || email.length > 254 || !name || !company) return html(signupPage(lg, AC(lg).invalid, 'error'), 400);
    if (password.length < 8 || password.length > 200) return html(signupPage(lg, AC(lg).weakPassword, 'error'), 400);
    if (await getUserByEmail(env, email)) return html(signupPage(lg, AC(lg).emailTaken, 'error'), 409);
    let user: User;
    try { user = await createUser(env, { email, passwordHash: await hashPassword(password), name, company, phone }); }
    catch { return html(signupPage(lg, AC(lg).emailTaken, 'error'), 409); }
    const vtoken = await issueToken(env, 'verify', user.id);
    ctx.waitUntil(sendVerifyEmail(env, url.origin, email, lg, vtoken));
    const token = await createSession(env, user.id);
    return redirect(next, sessionCookie(token));
  }
  if (method === 'POST' && url.pathname === '/api/login') {
    if (!sameOrigin(request, url)) return new Response('bad origin', { status: 403 });
    if (!(await rateLimit(env, `rl:login:${ip}`, 12))) return html(loginPage(lang, AC(lang).rateLimited, 'error'), 429);
    const f = await request.formData();
    const lg: Lang = String(f.get('lang')) === 'fr' ? 'fr' : 'en';
    const email = String(f.get('email') || '').trim().toLowerCase();
    const password = String(f.get('password') || '');
    const next = url.searchParams.get('next') || `${pfx(lg)}/account`;
    const login = await findLogin(env, email);
    if (!login || !(await verifyPassword(password, login.passwordHash))) return html(loginPage(lg, AC(lg).badLogin, 'error', url.searchParams.get('next') || ''), 401);
    const token = await createSession(env, login.id);
    return redirect(next, sessionCookie(token));
  }
  if (method === 'POST' && url.pathname === '/api/logout') {
    await destroySession(request, env);
    return redirect(`${pfx(lang)}/login`, clearSessionCookie());
  }
  if (method === 'POST' && url.pathname === '/api/forgot') {
    if (!sameOrigin(request, url)) return new Response('bad origin', { status: 403 });
    if (!(await rateLimit(env, `rl:forgot:${ip}`, 6))) return html(forgotPage(lang, AC(lang).rateLimited, 'error'), 429);
    const f = await request.formData();
    const lg: Lang = String(f.get('lang')) === 'fr' ? 'fr' : 'en';
    const email = String(f.get('email') || '').trim().toLowerCase();
    const user = emailRe.test(email) ? await getUserByEmail(env, email) : null;
    if (user) { const rtoken = await issueToken(env, 'reset', user.id); ctx.waitUntil(sendResetEmail(env, url.origin, email, lg, rtoken)); }
    return html(forgotPage(lg, AC(lg).resetSent, 'ok')); // never reveal existence
  }
  if (method === 'POST' && url.pathname === '/api/reset') {
    if (!sameOrigin(request, url)) return new Response('bad origin', { status: 403 });
    const f = await request.formData();
    const lg: Lang = String(f.get('lang')) === 'fr' ? 'fr' : 'en';
    const token = String(f.get('token') || '');
    const password = String(f.get('password') || '');
    if (password.length < 8 || password.length > 200) return html(resetPage(lg, token, AC(lg).weakPassword, 'error'), 400);
    const userId = await consumeToken(env, 'reset', token);
    if (!userId) return html(forgotPage(lg, AC(lg).resetExpired, 'error'), 400);
    await setPassword(env, userId, await hashPassword(password));
    return html(loginPage(lg, AC(lg).resetDone, 'ok'));
  }
  if (method === 'POST' && url.pathname === '/api/order') {
    if (!sameOrigin(request, url)) return new Response(JSON.stringify({ error: 'bad_origin' }), { status: 403, headers: { 'content-type': 'application/json' } });
    const u = await currentUser(request, env);
    if (!u) return new Response(JSON.stringify({ error: 'auth', login: `${pfx(lang)}/login?next=${encodeURIComponent(pfx(lang) + '/design')}` }), { status: 401, headers: { 'content-type': 'application/json' } });
    if (!u.emailVerified) return new Response(JSON.stringify({ error: 'unverified', message: AC(lang).verifyBanner }), { status: 403, headers: { 'content-type': 'application/json' } });
    if (!(await rateLimit(env, `rl:order:${ip}`, 20))) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: { 'content-type': 'application/json' } });
    let body: Record<string, unknown>;
    try { body = await request.json(); } catch { return new Response(JSON.stringify({ error: 'invalid' }), { status: 400, headers: { 'content-type': 'application/json' } }); }
    const design = parseLabelConfig((body.design ?? body) as Record<string, unknown>);
    const quantity = Math.min(1000000, Math.max(0, Math.floor(Number(body.quantity) || 0)));
    const notes = String(body.notes ?? '').replace(/\s+/g, ' ').trim().slice(0, 2000);
    const order = await createOrder(env, { userId: u.id, design, quantity, notes, lang: design.lang });
    ctx.waitUntil(notifyOrder(env, order, u));
    return new Response(JSON.stringify({ ok: true, orderNo: order.orderNo, redirect: `${pfx(lang)}/account/order/${order.orderNo}?placed=1` }), { headers: { 'content-type': 'application/json' } });
  }

  return null; // not an account route
}

// Loads a user's saved design for the builder prefill (?order=). Ownership-checked.
export async function loadOrderDesign(request: Request, env: Env, orderNo: string): Promise<OrderRow | null> {
  const u = await currentUser(request, env);
  if (!u) return null;
  const order = await getOrderByNo(env, orderNo);
  if (!order || order.userId !== u.id) return null;
  return order;
}
