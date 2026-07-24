import { LANDING_PAGE } from './landing';
import { PREVIEW_PAGE } from './preview';

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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { method, pathname } = { method: request.method, pathname: url.pathname };

    if (method === 'GET' && pathname === '/') {
      return new Response(LANDING_PAGE, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    // GET /preview → label preview builder
    if (method === 'GET' && pathname === '/preview') {
      return new Response(PREVIEW_PAGE, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

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

    // POST /api/contact → store in KV
    if (method === 'POST' && pathname === '/api/contact') {
      const body = await request.json() as {
        name?: string; company?: string; email?: string; phone?: string; message?: string;
      };
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await env.CONTACTS.put(`contact:${id}`, JSON.stringify({
        id,
        name: body.name ?? '',
        company: body.company ?? '',
        email: body.email ?? '',
        phone: body.phone ?? '',
        message: body.message ?? '',
        receivedAt: new Date().toISOString(),
      }));
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
