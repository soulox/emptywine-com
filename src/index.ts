import { renderLanding } from './landing';
import { renderPreview } from './preview';
import { OG_IMAGE_B64 } from './og';
import { renderLabelPdf, LabelConfig } from './labelpdf';

let ogImageBytes: Uint8Array | null = null;
function getOgImage(): Uint8Array {
  if (!ogImageBytes) {
    const bin = atob(OG_IMAGE_B64);
    ogImageBytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) ogImageBytes[i] = bin.charCodeAt(i);
  }
  return ogImageBytes;
}

const PROMPTS: Record<string, string> = {
  hero: 'single luxury wine bottle, dark emerald green glass, elegant ivory rectangular label with thin bronze border, isolated on a pure white background, product cutout on plain white, high-key studio lighting, pure white seamless backdrop, no grey, faint soft shadow directly beneath bottle, commercial product photography, 85mm prime lens, 8k',
  cream: 'a single one wine bottle, centered upright composition, only one bottle, dark green glass, cream ivory rectangular label with a fine bronze rule border, isolated on a pure white background, high-key studio lighting, pure white seamless backdrop, no grey, faint shadow beneath, product photography, 8k photorealistic',
  noir: 'a single dark near-black wine bottle standing upright, one bottle only, matte black rectangular label with a thin gold rule border, centered on a plain soft warm neutral seamless studio background, generous empty negative space, minimalist calm composition, no props, no patterns, no ornate background, soft high-key studio lighting, gentle soft shadow beneath, commercial product photography, 85mm prime lens, 8k',
  blanc: 'a single one wine bottle, centered upright composition, only one bottle, dark glass, clean pure white minimalist rectangular label with a thin border and a small red wax seal, isolated on a pure white background, high-key studio lighting, pure white seamless backdrop, no grey, faint shadow beneath, editorial product photography, 8k',
  banner: 'a wine bottle and a pair of two wine glasses filled with red wine, both glasses side by side next to the bottle on a rustic wooden table outdoors, sunlit Tuscany countryside in the background with rolling hills, rows of vineyards and tall cypress trees, warm golden hour light, soft cinematic depth of field, Mediterranean summer atmosphere, luxurious lifestyle photography, 85mm lens, 8k',
  previewBottle: 'a single empty wine bottle standing perfectly upright and centered, one bottle only, dark emerald green glass, gold bronze foil capsule on the neck, absolutely no label, plain smooth blank glass surface, straight-on front view, isolated on a pure white seamless background, high-key studio lighting, pure white backdrop, no grey, soft realistic glass reflections and highlights, faint soft shadow directly beneath, commercial product photography, 85mm prime lens, 8k photorealistic',
};

async function serveBottleImage(key: string, env: Env): Promise<Response> {
  const kvKey = `bottle:img:${key}:v5`;
  const cached = await env.CONTACTS.get(kvKey, 'arrayBuffer');
  if (cached) {
    return new Response(cached, {
      headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=604800' },
    });
  }
  const prompt = PROMPTS[key] ?? PROMPTS.hero;
  const inputs: Record<string, unknown> = { prompt };
  if (key === 'banner') { inputs.width = 1024; inputs.height = 640; }
  const stream = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs as never);
  const buffer = await new Response(stream).arrayBuffer();
  await env.CONTACTS.put(kvKey, buffer, { expirationTtl: 604800 });
  return new Response(buffer, {
    headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=604800' },
  });
}

// Post a formatted inquiry notification to a Slack Incoming Webhook.
// The URL is a Worker secret (SLACK_WEBHOOK_URL); if unset, this is a no-op.
// Never throws — notification failure must not affect the stored inquiry.
async function notifySlack(
  env: Env,
  inquiry: { name: string; company: string; email: string; phone: string; message: string; lang: string },
): Promise<void> {
  const webhook = (env as unknown as { SLACK_WEBHOOK_URL?: string }).SLACK_WEBHOOK_URL;
  if (!webhook) return;
  try {
    const fields = [
      `*Name:* ${inquiry.name}`,
      `*Company:* ${inquiry.company}`,
      `*Email:* ${inquiry.email}`,
      inquiry.phone ? `*Phone:* ${inquiry.phone}` : null,
      `*Language:* ${inquiry.lang === 'fr' ? 'French (/fr)' : 'English'}`,
    ].filter(Boolean).join('\n');
    const text = `:wine_glass: *New emptywine inquiry*\n${fields}\n\n*Details:*\n${inquiry.message || '_(none)_'}`;
    await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  } catch {
    // swallow — the inquiry is already safely stored in KV
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { method, pathname } = { method: request.method, pathname: url.pathname };

    if (method === 'GET' && pathname === '/') {
      return new Response(renderLanding('en'), {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    // GET /fr → French landing page
    if (method === 'GET' && (pathname === '/fr' || pathname === '/fr/')) {
      return new Response(renderLanding('fr'), {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    // GET /og.jpg → social share image (Open Graph / Twitter card)
    if (method === 'GET' && pathname === '/og.jpg') {
      return new Response(getOgImage(), {
        headers: {
          'content-type': 'image/jpeg',
          'cache-control': 'public, max-age=604800',
        },
      });
    }

    // GET /design → label builder (English); /fr/design → French
    if (method === 'GET' && pathname === '/design') {
      return new Response(renderPreview('en'), {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }
    if (method === 'GET' && pathname === '/fr/design') {
      return new Response(renderPreview('fr'), {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    // GET /robots.txt
    if (method === 'GET' && pathname === '/robots.txt') {
      const body = 'User-agent: *\nAllow: /\n\nSitemap: https://emptywine.com/sitemap.xml\n';
      return new Response(body, {
        headers: { 'content-type': 'text/plain;charset=UTF-8', 'cache-control': 'public, max-age=86400' },
      });
    }

    // GET /sitemap.xml — multilingual (en/fr) with reciprocal alternates
    if (method === 'GET' && pathname === '/sitemap.xml') {
      const loc = (p: string) => 'https://emptywine.com' + p;
      const alts = (en: string, fr: string) =>
        `<xhtml:link rel="alternate" hreflang="en" href="${loc(en)}"/>` +
        `<xhtml:link rel="alternate" hreflang="fr" href="${loc(fr)}"/>` +
        `<xhtml:link rel="alternate" hreflang="x-default" href="${loc(en)}"/>`;
      const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${loc('/')}</loc>${alts('/', '/fr')}<priority>1.0</priority></url>
  <url><loc>${loc('/fr')}</loc>${alts('/', '/fr')}<priority>1.0</priority></url>
  <url><loc>${loc('/design')}</loc>${alts('/design', '/fr/design')}<priority>0.8</priority></url>
  <url><loc>${loc('/fr/design')}</loc>${alts('/design', '/fr/design')}<priority>0.8</priority></url>
</urlset>
`;
      return new Response(body, {
        headers: { 'content-type': 'application/xml;charset=UTF-8', 'cache-control': 'public, max-age=86400' },
      });
    }

    // Legacy /preview → 301 to the renamed /design paths
    if (method === 'GET' && pathname === '/preview') return Response.redirect('https://emptywine.com/design', 301);
    if (method === 'GET' && pathname === '/fr/preview') return Response.redirect('https://emptywine.com/fr/design', 301);

    // GET /assets/* → serve from R2
    if (method === 'GET' && pathname.startsWith('/assets/')) {
      const key = decodeURIComponent(pathname.slice('/assets/'.length));
      if (!key) return new Response('Not Found', { status: 404 });
      const obj = await env.ASSETS.get(key);
      if (!obj) return new Response('Not Found', { status: 404 });
      const ct = obj.httpMetadata?.contentType ?? 'application/octet-stream';
      return new Response(obj.body, {
        headers: {
          'content-type': ct,
          'cache-control': 'public, max-age=86400',
          'etag': obj.etag,
        },
      });
    }

    // Bottle images — /api/bottle/hero  /api/bottle/cream  /api/bottle/noir  /api/bottle/blanc
    if (method === 'GET' && pathname.startsWith('/api/bottle/')) {
      const key = pathname.replace('/api/bottle/', '') || 'hero';
      return serveBottleImage(key, env);
    }

    // POST /api/generate → custom AI label
    if (method === 'POST' && pathname === '/api/generate') {
      let company = 'your company';
      let style = 'elegant';
      try {
        const body = await request.json() as { company?: string; style?: string };
        if (body.company) company = body.company;
        if (body.style) style = body.style;
      } catch {
        return new Response(JSON.stringify({ error: 'invalid JSON' }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }
      const prompt = `luxury wine label for ${company}, ${style} style, dark elegant design, gold foil typography, product photography`;
      const image = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', { prompt });
      return new Response(image, { headers: { 'content-type': 'image/png' } });
    }

    // POST /api/contact → store in KV (with spam protection)
    if (method === 'POST' && pathname === '/api/contact') {
      const json = (data: unknown, status = 200) =>
        new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });
      // A silent "success" for spam: don't tip off bots, don't store.
      const decoy = () => json({ success: true });

      // Reject oversized payloads outright.
      const len = Number(request.headers.get('content-length') || '0');
      if (len > 20000) return json({ error: 'too_large' }, 413);

      // Per-IP rate limit: max 5 submissions/hour (best-effort via KV).
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const rlKey = `rl:contact:${ip}`;
      const count = parseInt((await env.CONTACTS.get(rlKey)) || '0', 10);
      if (count >= 5) return json({ error: 'rate_limited' }, 429);
      await env.CONTACTS.put(rlKey, String(count + 1), { expirationTtl: 3600 });

      let body: {
        name?: string; company?: string; email?: string; phone?: string;
        message?: string; website?: string; elapsed?: unknown;
      };
      try {
        body = await request.json();
      } catch {
        return json({ error: 'invalid JSON' }, 400);
      }

      // Honeypot: real users never fill the hidden "website" field.
      if (typeof body.website === 'string' && body.website.trim() !== '') return decoy();

      // Timing: humans take a few seconds; near-instant submits are bots.
      const elapsed = Number(body.elapsed);
      if (!Number.isFinite(elapsed) || elapsed < 2500) return decoy();

      // Validation.
      const name = String(body.name ?? '').trim();
      const company = String(body.company ?? '').trim();
      const email = String(body.email ?? '').trim();
      const phone = String(body.phone ?? '').trim();
      const message = String(body.message ?? '').trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        !name || name.length > 120 ||
        !company || company.length > 120 ||
        !emailRe.test(email) || email.length > 254 ||
        phone.length > 40 || message.length > 5000
      ) {
        return json({ error: 'invalid' }, 400);
      }

      // Link-spam heuristic: legitimate inquiries rarely contain many URLs.
      if ((message.match(/https?:\/\//gi) || []).length > 3) return decoy();

      // Which site the inquiry came from (untrusted — coerce to en/fr).
      const lang = String((body as { lang?: unknown }).lang ?? 'en') === 'fr' ? 'fr' : 'en';

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await env.CONTACTS.put(`contact:${id}`, JSON.stringify({
        id, name, company, email, phone, message,
        lang, ip,
        receivedAt: new Date().toISOString(),
      }));
      // Notify out-of-band so a slow/failed webhook never delays or breaks the response.
      ctx.waitUntil(notifySlack(env, { name, company, email, phone, message, lang }));
      return json({ success: true });
    }

    // POST /api/label.pdf → production label PDF (vector, CMYK, embedded fonts)
    if (method === 'POST' && pathname === '/api/label.pdf') {
      let body: Record<string, unknown>;
      try { body = await request.json(); } catch { return new Response('invalid JSON', { status: 400 }); }
      const str = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n]+/g, ' ').slice(0, max).trim();
      const clamp = (v: unknown) => { const n = Number(v); return Number.isFinite(n) ? Math.min(2, Math.max(0.4, n)) : 1; };
      const style = (['cream', 'noir', 'blanc'] as const).find((s) => s === body.style) ?? 'cream';
      const lang: 'en' | 'fr' = body.lang === 'fr' ? 'fr' : 'en';
      const sc = (body.scales ?? {}) as Record<string, unknown>;
      const cfg: LabelConfig = {
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
      const pdf = await renderLabelPdf(cfg);
      const fname = (cfg.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'label') + '-label-proof.pdf';
      return new Response(pdf, {
        headers: { 'content-type': 'application/pdf', 'content-disposition': `attachment; filename="${fname}"` },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
