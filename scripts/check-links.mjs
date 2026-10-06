/**
 * Controllo post-build di dist/ prima del deploy:
 *  - href/src/srcset vuoti, "#", segnaposto [[...]] o URL malformati
 *  - link interni verso file che la build non ha prodotto
 *  - ancore (#id) inesistenti, anche verso altre pagine (/servizi/#id)
 *  - marker [[DA COMPILARE]] rimasti nel testo
 *
 *   npm run build && node scripts/check-links.mjs
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
if (!existsSync(DIST)) { console.error('manca dist/: esegui npm run build'); process.exit(1); }

const html = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) html.push(p);
  }
})(DIST);

const idsDi = new Map();
const fileDi = (rotta) => (rotta.endsWith('/') ? path.join(DIST, rotta, 'index.html') : path.join(DIST, rotta));
const ids = (file) => {
  if (!idsDi.has(file)) idsDi.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idsDi.get(file);
};

const errori = [];
let link = 0;
for (const file of html) {
  const t = readFileSync(file, 'utf8');
  const pagina = '/' + path.relative(DIST, file).replace(/\\/g, '/');
  const valori = [];
  for (const m of t.matchAll(/\s(href|src|data-full|data-href)="([^"]*)"/g)) valori.push([m[1], m[2].trim()]);
  for (const m of t.matchAll(/\ssrcset="([^"]*)"/g)) for (const p of m[1].split(',')) valori.push(['srcset', p.trim().split(/\s+/)[0]]);

  for (const [attr, v] of valori) {
    link++;
    if (v === '' || v === '#') { errori.push(`${pagina}: ${attr} vuoto o "#"`); continue; }
    if (/\[\[|esempio\.it/.test(v)) { errori.push(`${pagina}: ${attr} con segnaposto -> ${v}`); continue; }
    if (/.+https?:\/\//.test(v) && !/^https?:/.test(v)) { errori.push(`${pagina}: ${attr} malformato -> ${v}`); continue; }
    if (/^(https?:|mailto:|tel:|data:)/.test(v)) continue;
    if (v.startsWith('#')) { if (!ids(file).has(v.slice(1))) errori.push(`${pagina}: ancora inesistente -> ${v}`); continue; }
    if (!v.startsWith('/')) continue;
    const [rotta, hash] = v.split('#');
    const dest = fileDi(rotta);
    if (!existsSync(dest)) { errori.push(`${pagina}: link interno rotto -> ${v}`); continue; }
    if (hash && dest.endsWith('.html') && !ids(dest).has(hash)) errori.push(`${pagina}: ancora inesistente -> ${v}`);
  }
  const testo = t.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  if (/\[\[[^\]]+\]\]/.test(testo)) errori.push(`${pagina}: segnaposto [[...]] nel testo`);
}

if (errori.length) {
  console.error(`check-links: ${errori.length} problemi su ${html.length} pagine`);
  for (const e of errori) console.error('  ' + e);
  process.exit(1);
}
console.log(`check-links: ${html.length} pagine, ${link} link/sorgenti controllati — nessun problema.`);
