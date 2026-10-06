import type { APIRoute } from 'astro';
import { site } from '../data/site';

const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot'];

export const GET: APIRoute = () =>
  new Response(
    `# ${site.nome} — ${site.dominio.replace(/^https?:\/\//, '')}
User-agent: *
Allow: /
Disallow: /grazie/

# Motori generativi e assistenti AI: accesso consentito (GEO)
${bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n')}
Sitemap: ${site.dominio}/sitemap-index.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
