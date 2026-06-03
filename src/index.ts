import { LANDING_PAGE } from './landing';

const PROMPTS: Record<string, string> = {
  hero: 'single luxury wine bottle, dark emerald green glass, elegant ivory rectangular label with thin gold border, pure gloss black background, dramatic key light from upper left casting long shadow, shallow depth of field, commercial product photography, 85mm prime lens, 8k',
  cream: 'luxury wine bottle, dark bottle glass, cream ivory rectangular label with fine gold rule border, serif typography, black background, beauty dish studio lighting, product photography, 8k photorealistic',
  noir: 'luxury wine bottle, very dark glass, dark black label with gold foil text, ornate border, deep black background, single spotlight from above, mysterious dramatic lighting, product photography, 8k',
  blanc: 'luxury wine bottle, dark glass, clean white minimalist rectangular label, simple thin border, pure white label, matte black background, soft even studio lighting, editorial product photography, 8k',
};

async function serveBottleImage(key: string, env: Env): Promise<Response> {
  const kvKey = `bottle:img:${key}:v1`;
  const cached = await env.CONTACTS.get(kvKey, 'arrayBuffer');
  if (cached) {
    return new Response(cached, {
      headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=604800' },
    });
  }
  const prompt = PROMPTS[key] ?? PROMPTS.hero;
  const stream = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', { prompt });
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
