import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio canonico: su Netlify la build riceve URL (dominio principale del sito, anche quello
// personalizzato una volta collegato). In locale resta il segnaposto.
// Per fissarlo a mano: SITE_URL = 'https://www.dominio-del-cliente.it'.
export const SITE_URL = (process.env.URL || 'https://esempio.it').replace(/\/$/, '');

export default defineConfig({
  site: SITE_URL,
  // 'ignore': i link restano con lo slash finale (build a cartelle), ma il dev serve anche
  // le rotte con estensione (src/pages/img/placeholder/[id].svg.ts) senza slash.
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/grazie/') && !page.includes('/404'),
    }),
  ],
});
