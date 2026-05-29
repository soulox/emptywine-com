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

    // POST /api/contact → accept form, return success
    if (method === 'POST' && pathname === '/api/contact') {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    // 404
    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
