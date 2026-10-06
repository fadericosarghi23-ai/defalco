# Studio Tecnico De Falco — sito web

Sito statico (Astro 5) dello studio del geometra Giovanni De Falco, Via Cesare Bressa 11, Mortara (PV).

```bash
npm install
npm run dev           # http://localhost:4730
npm run build         # dist/ (26 pagine)
npm run check-links   # dopo la build: link, ancore e segnaposto
```

## Deploy su Netlify

Configurazione in `netlify.toml`: build `npm run build`, publish `dist`, Node 20, install senza lockfile.
Il dominio canonico (canonical, Open Graph, sitemap, robots, llms.txt) arriva dalla variabile `URL`
di Netlify: collegando un dominio personalizzato basta rifare il deploy.
Il modulo contatti usa Netlify Forms: le richieste arrivano in *Forms* nel pannello del sito.

## Dove si modifica

- `src/data/site.ts` — dati dello studio (contatti, indirizzo, email, P.IVA, PEC)
- `src/data/servizi.ts`, `progetti.ts`, `contenuti.ts`, `team.ts` — contenuti
- `src/styles/global.css` — palette nei token `:root`
- `src/lib/tavole.ts` — tavole illustrative generate; sostituibili con foto vere nei file dati
- `scripts/brand.mjs` — logo, favicon e icone provvisori
