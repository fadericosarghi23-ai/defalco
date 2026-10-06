/**
 * IDENTITÀ — De Falco Geom. Giovanni, Mortara (PV).
 *
 * VERI (scheda Google Business, 2026-10-06): nome, attività "Geometra a Mortara",
 * indirizzo Via Cesare Bressa 11 27036 Mortara PV, telefono 0384 90348.
 * Coordinate: OpenStreetMap, livello via (Via Cesare Bressa).
 * TUTTO IL RESTO è inventato su richiesta (il cliente non ha un sito): va confermato.
 * Email, P.IVA e PEC NON sono inventati: restano "da comunicare".
 */

export const site = {
  nome: 'Studio Tecnico De Falco',
  ragioneSociale: 'De Falco Geom. Giovanni',
  nomiAlternativi: ['De Falco Geom. Giovanni', 'Geometra De Falco Mortara'],
  logoAlt: 'Studio Tecnico De Falco — geometra Giovanni De Falco, Mortara',
  attivita: 'Geometra',
  slogan: 'Misura, progetto, cantiere.',
  descrizione:
    'Studio tecnico del geometra Giovanni De Falco a Mortara: progetti e ristrutturazioni, pratiche edilizie e catastali, rilievi topografici, sicurezza e perizie in Lomellina.',
  footerClaim: 'Studio tecnico di geometra a Mortara, al servizio di famiglie, imprese e professionisti della Lomellina.',

  // ── Dominio e tecnici ───────────────────────────────────────────────
  /** Dominio canonico: arriva da astro.config.mjs (variabile URL di Netlify in build) */
  dominio: String(import.meta.env.SITE || 'https://esempio.it').replace(/\/$/, ''),
  themeColor: '#a51d24',
  geoRegion: 'IT-PV',

  // ── Contatti ────────────────────────────────────────────────────────
  /** vuota = i link email spariscono (nessun indirizzo inventato) */
  email: '', // [[DA COMPILARE: email dello studio]]
  telefono: '0384 90348',
  telefonoE164: '+39038490348',
  pec: 'da comunicare',
  piva: 'da comunicare',

  indirizzo: {
    via: 'Via Cesare Bressa 11',
    cap: '27036',
    citta: 'Mortara',
    provincia: 'PV',
    paese: 'IT',
  },
  zona: 'centro di Mortara',
  geo: { lat: 45.25335, lng: 8.73671 } as null | { lat: number; lng: number },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=De%20Falco%20Geom.%20Giovanni%2C%20Via%20Cesare%20Bressa%2011%2C%2027036%20Mortara%20PV',
  /** VERO: scheda Google al 2026-10-06 */
  recensioni: { voto: '5,0', numero: 2 },
  ricevimento: 'Su appuntamento, in studio o direttamente sull’immobile.',

  /** nessun profilo social noto: blocco nascosto */
  social: [] as { nome: string; url: string; icona: 'facebook' | 'instagram' | 'linkedin' }[],

  areeServite: [
    { tipo: 'City', nome: 'Mortara' },
    { tipo: 'AdministrativeArea', nome: 'Lomellina' },
    { tipo: 'AdministrativeArea', nome: 'Provincia di Pavia' },
    { tipo: 'State', nome: 'Lombardia' },
  ],
  competenze: [
    'pratiche edilizie',
    'pratiche catastali',
    'rilievi topografici',
    'progettazione di ristrutturazioni',
    'direzione lavori',
    'coordinamento della sicurezza nei cantieri',
    'attestati di prestazione energetica',
    'stime e perizie immobiliari',
    'successioni',
    'confinazioni',
  ],

  /** Netlify Forms: le richieste arrivano nel pannello Netlify del sito dopo il deploy */
  form: {
    netlify: true,
    endpoint: '',
  },

  analytics: null as null | string,
  anno: new Date().getFullYear(),
};

export const indirizzoRiga = `${site.indirizzo.via}, ${site.indirizzo.cap} ${site.indirizzo.citta}`;
export const abs = (p: string) => site.dominio + p;
