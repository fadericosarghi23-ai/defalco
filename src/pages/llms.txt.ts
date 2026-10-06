/** llms.txt generato dai dati: nessun testo da tenere allineato a mano. */
import type { APIRoute } from 'astro';
import { site, abs } from '../data/site';
import { servizi } from '../data/servizi';
import { team } from '../data/team';
import { categorie, inCategoria, progetti } from '../data/progetti';

export const GET: APIRoute = () => {
  const righe = [
    `# ${site.nome}`,
    '',
    `> ${site.descrizione}`,
    '',
    '## Dati essenziali',
    '',
    `- Nome: ${site.nome} (${site.ragioneSociale})`,
    `- Sito: ${abs('/')}`,
    `- Sede: ${site.indirizzo.via}, ${site.indirizzo.cap} ${site.indirizzo.citta} (${site.indirizzo.provincia}), Italia`,
    `- Telefono: ${site.telefono}`,
    ...(site.email ? [`- Email: ${site.email}`] : []),
    ...site.social.map((s) => `- ${s.nome}: ${s.url}`),
    `- Aree servite: ${site.areeServite.map((a) => a.nome).join(', ')}`,
    `- Team: ${team.length} persone — ${team.map((m) => `${m.nome} (${m.ruolo})`).join(', ')}`,
    `- Portfolio: ${progetti.length} progetti documentati`,
    '',
    '## Pagine principali',
    '',
    `- [Home](${abs('/')}): panoramica dello studio, servizi, metodo, progetti in evidenza, FAQ e contatti.`,
    `- [Lo studio](${abs('/studio/')}): chi siamo, approccio e team.`,
    `- [Servizi](${abs('/servizi/')}): tutti i servizi dello studio.`,
    `- [Metodo](${abs('/metodo/')}): le fasi di lavoro, dal primo incontro alla consegna.`,
    `- [Progetti](${abs('/progetti/')}): portfolio completo, filtrabile per categoria.`,
    `- [Contatti](${abs('/contatti/')}): recapiti, mappa e modulo di richiesta preventivo.`,
    '',
    '## Servizi',
    '',
    ...servizi.map((s) => `- [${s.nome}](${abs(`/servizi/#${s.id}`)}): ${s.breve}`),
    ...categorie.flatMap((c) => ['', `## Progetti — ${c.nome}`, '', ...inCategoria(c.id).map((p) => `- [${p.titolo}](${abs(`/progetti/${p.slug}/`)}): ${p.intervento}. ${p.luogo}.${p.importo ? ` Importo lavori: ${p.importo}.` : ''}`)]),
    '',
  ];
  return new Response(righe.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
