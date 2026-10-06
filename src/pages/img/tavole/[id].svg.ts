/** Tavole illustrative generate in build (vedi src/lib/tavole.ts). */
import type { APIRoute } from 'astro';
import { tavole, disegna } from '../../../lib/tavole';
import '../../../data/progetti';
import '../../../data/team';
import '../../../data/contenuti';

export function getStaticPaths() {
  return [...tavole.keys()].map((id) => ({ params: { id } }));
}

export const GET: APIRoute = ({ params }) =>
  new Response(disegna(tavole.get(params.id!)!), { headers: { 'Content-Type': 'image/svg+xml' } });
