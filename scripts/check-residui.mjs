/**
 * Cerca residui del cliente del sito sorgente (Graphite Studio, Reggio Emilia) in
 * src/, public/, config e dist/. Esce con errore se ne trova.
 *
 *   npm run check-residui        (dopo npm run build per controllare anche dist/)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Dati identificativi del vecchio cliente: nome, contatti, sede, persone, progetti, tecnici
const TERMINI = [
  'graphite', 'GRAPHITE', 'graphitestudio', 'GraphiteStudioRE', 'graphitesite',
  'Gandhi', '42123', '0522', '709660', '+390522', 'Reggio Emilia', 'Villaggio Architetti', 'IT-RE',
  '44.68048', '10.6146', '2520aaa4',
  'Castagnetti', 'Daniele Ferri', 'Ilaria Franchi', 'Messori', 'Paterlini', 'Lorenzo Villa', 'Luca Lotti', 'Bonacini', 'Silvia Merzi', 'Daria Medici', 'Magnanini', 'Bertoldi', 'Tacchini', 'Veronica Casali',
  'Stalla T', 'stalla-t', 'Beltrami', 'Casa BC', 'casa-bc', 'Canossa', 'Currada', 'Saluggia', 'Pascoli', 'Poviglio', 'Gabbiana', 'Quistello',
  'Fiorano', 'Casalgrande', 'Novellara', 'Guastalla', 'Gattatico', 'Mediopadana', 'Gelateria 90', 'La Sete', '3C Salute', 'ACER', 'Doberdò',
  'Herambiente', 'Brindani', 'Galimberti', 'Nocerino', 'Grassi', 'Palidano', 'Gonzaga', 'Crostolina', 'Ramiseto', 'Minozzo', 'Basilicanova',
  'Superbonus', 'Soprintendenza', 'Cor-ten',
];

const DIRS = ['src', 'public', 'dist', 'astro.config.mjs', 'netlify.toml', 'package.json', 'README.md'];
const SKIP = new Set(['check-residui.mjs']);
const EXT = /\.(astro|ts|js|mjs|json|md|css|html|txt|xml|svg|webmanifest|toml)$/;

const files = [];
for (const d of DIRS) {
  const full = path.join(ROOT, d);
  if (!fs.existsSync(full)) continue;
  if (fs.statSync(full).isFile()) { files.push(full); continue; }
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (EXT.test(e.name) && !SKIP.has(e.name)) files.push(p);
    }
  })(full);
}

let trovati = 0;
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  for (const term of TERMINI) {
    let i = t.indexOf(term);
    while (i !== -1) {
      trovati++;
      const riga = t.slice(0, i).split('\n').length;
      console.log(`${path.relative(ROOT, f)}:${riga}  «${term}»  …${t.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ')}…`);
      i = t.indexOf(term, i + term.length);
    }
  }
}
console.log(trovati ? `\n✗ ${trovati} residui trovati in ${files.length} file` : `✓ Nessun residuo del vecchio cliente in ${files.length} file`);
process.exitCode = trovati ? 1 : 0;
