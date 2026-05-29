import { LANDING_PAGE } from './landing';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { method, pathname } = { method: request.method, pathname: url.pathname };

    // GET / → landing page
    if (method === 'GET' && pathname === '/') {
      return new Response(LANDING_PAGE, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    // GET /api/hero-image → photorealistic wine bottle, KV-cached
    if (method === 'GET' && pathname === '/api/hero-image') {
      const cached = await env.CONTACTS.get('hero:bottle', 'arrayBuffer');
      if (cached) {
        return new Response(cached, {
          headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=604800' },
        });
      }
      const prompt = 'professional product photography of a single luxury wine bottle, elegant custom label with gold foil lettering, dark marble surface, dramatic studio lighting, pure black background, shallow depth of field, 8k, photorealistic, no text';
      const image = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', { prompt });
      await env.CONTACTS.put('hero:bottle', image, { expirationTtl: 604800 });
      return new Response(image, {
        headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=604800' },
      });
    }

    // POST /api/generate → AI image generation
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

      return new Response(image, {
        headers: { 'content-type': 'image/png' },
      });
    }

    // POST /api/contact → store submission in KV, return success
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

    // 404
    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
