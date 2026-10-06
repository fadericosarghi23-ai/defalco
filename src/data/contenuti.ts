/**
 * Contenuti ripetuti o in lista (home, studio, metodo) — INVENTATI, da confermare.
 * I numeri sono coerenti con il resto del sito (6 servizi, 12 lavori, 1 titolare).
 */
import { tav } from '../lib/tavole';
import { progetto } from './progetti';

/** Carosello hero della home: 5 slide, ognuna punta a un lavoro */
export const heroSlides = [
  { progetto: 'casa-a-corte-mortara', foto: 0 },
  { progetto: 'rilievo-cascina-robbio', foto: 0 },
  { progetto: 'appartamento-vigevano', foto: 0 },
  { progetto: 'confini-fondo-garlasco', foto: 0 },
  { progetto: 'casa-a-corte-mortara', foto: 4 },
].map(({ progetto: slug, foto }) => {
  const p = progetto(slug);
  return { href: `/progetti/${p.slug}/`, titolo: p.titolo, luogo: p.luogo, img: p.immagini[foto] };
});

export const progettiHome = [
  'casa-a-corte-mortara',
  'villetta-classe-a-gambolo',
  'rilievo-cascina-robbio',
  'appartamento-vigevano',
  'frazionamento-lotto-mortara',
  'facciate-condominio-mortara',
];

export const numeriHome = [
  { n: '6', label: 'Servizi tecnici' },
  { n: '12', label: 'Lavori in portfolio' },
  { n: '1', label: 'Referente unico' },
  { n: '4', label: 'Province servite' },
];

export const numeriStudio = [
  { n: '1', label: 'Geometra titolare' },
  { n: '6', label: 'Servizi integrati' },
  { n: '12', label: 'Lavori documentati' },
  { n: '22', label: 'Comuni in zona' },
];

export const tappe = [
  { titolo: 'Ascolto e sopralluogo', testo: 'Ogni incarico parte da un incontro e da un sopralluogo: ascoltiamo esigenze, budget e tempi e verifichiamo documenti, vincoli e stato dell’immobile.', img: progetto('casa-a-corte-mortara').immagini[1] },
  { titolo: 'Progetto e verifiche', testo: 'Rilievo, progetto e verifiche urbanistiche e catastali vanno di pari passo: sappiamo subito cosa si può fare, con quali tempi e con quali costi.', img: progetto('sanatoria-villetta-mortara').immagini[0] },
  { titolo: 'Pratiche e autorizzazioni', testo: 'Prepariamo e presentiamo titoli edilizi, pratiche catastali e documenti per le detrazioni, seguendo l’iter con comune e Agenzia delle Entrate.', img: tav('metodo-03', 800, 444, 'catasto', 'scuro', 'Tavola illustrativa: estratto di mappa catastale') },
  { titolo: 'Cantiere e consegna', testo: 'Direzione dei lavori e coordinamento della sicurezza fino alla fine lavori, con l’aggiornamento catastale e i documenti finali dell’immobile.', img: progetto('confini-fondo-garlasco').immagini[2] },
];

export const fasi = [
  { titolo: 'Primo incontro', testo: 'Ci racconti l’immobile, cosa vorresti fare, il budget e i tempi. Capiamo insieme che tipo di intervento è possibile.' },
  { titolo: 'Sopralluogo e rilievo', testo: 'Rileviamo l’immobile o il terreno e raccogliamo titoli edilizi, planimetrie e visure per verificare la conformità.' },
  { titolo: 'Fattibilità e costi', testo: 'Valutiamo le alternative, le stime di costo e gli incentivi fiscali disponibili prima di investire nel progetto.' },
  { titolo: 'Progetto', testo: 'Sviluppiamo il progetto con piante, sezioni e prospetti, e prepariamo computi e capitolati per le imprese.' },
  { titolo: 'Pratiche', testo: 'Presentiamo CILA, SCIA o permesso di costruire, le pratiche catastali e quelle per le detrazioni fiscali.' },
  { titolo: 'Scelta delle imprese', testo: 'Confrontiamo i preventivi con te e ti aiutiamo a scegliere imprese e artigiani affidabili della zona.' },
  { titolo: 'Sicurezza', testo: 'Redigiamo il piano di sicurezza e coordinamento e, in cantiere, verifichiamo che le imprese lavorino in sicurezza.' },
  { titolo: 'Direzione lavori', testo: 'Seguiamo il cantiere con visite periodiche, controlliamo qualità, tempi e costi e teniamo la contabilità.' },
  { titolo: 'Fine lavori e catasto', testo: 'Chiudiamo con fine lavori, agibilità, aggiornamento catastale e APE: l’immobile è in regola e pronto da vivere.' },
];

/** Zone servite: i conteggi corrispondono ai 12 lavori del portfolio */
export const aree = [
  { conteggio: '4 lavori', nome: 'Mortara', comuni: 'Centro storico, quartieri e frazioni' },
  { conteggio: '3 lavori', nome: 'Lomellina nord', comuni: 'Vigevano, Gambolò, Cilavegna, Gravellona Lomellina, Parona' },
  { conteggio: '2 lavori', nome: 'Lomellina ovest', comuni: 'Robbio, Palestro, Castelnovetto, Nicorvo, Confienza' },
  { conteggio: '1 lavoro', nome: 'Lomellina sud', comuni: 'Mede, Sartirana Lomellina, Lomello, Valle Lomellina' },
  { conteggio: '1 lavoro', nome: 'Pavese', comuni: 'Garlasco, Tromello, Dorno, Gropello Cairoli' },
  { conteggio: '1 lavoro', nome: 'Novarese', comuni: 'Novara, Vespolate, Borgolavezzaro' },
];

export const approccio = [
  { titolo: 'Un solo referente', testo: 'Progetto, pratiche, catasto e cantiere fanno capo alla stessa persona: niente rimpalli tra tecnici diversi e un unico numero da chiamare.' },
  { titolo: 'Conoscenza del territorio', testo: 'Uffici tecnici, regolamenti comunali, cascine e risaie della Lomellina: conoscere il territorio fa risparmiare tempo e sorprese.' },
  { titolo: 'Carte in regola', testo: 'Ogni lavoro si chiude con documenti in ordine: titoli edilizi, catasto aggiornato, certificazioni. Così l’immobile resta facile da vendere.' },
];

export const competenzeStudio = [
  'Progetti di ristrutturazione e nuove costruzioni',
  'Pratiche edilizie, sanatorie e bonus',
  'Accatastamenti, frazionamenti e volture',
  'Rilievi topografici e riconfinamenti',
  'Coordinamento sicurezza e direzione lavori',
  'Stime, perizie e consulenze di parte',
  'Attestati di prestazione energetica',
];

export const faq = [
  { d: 'Di cosa si occupa lo Studio Tecnico De Falco?', r: 'È lo studio del geometra Giovanni De Falco a Mortara: progetti e ristrutturazioni, pratiche edilizie e sanatorie, catasto e successioni, rilievi topografici e confini, sicurezza nei cantieri, direzione lavori, stime, perizie e APE.' },
  { d: 'Dove si trova lo studio?', r: 'In Via Cesare Bressa 11, 27036 Mortara (PV). Per un appuntamento chiama lo 0384 90348.' },
  { d: 'In quali zone lavorate?', r: 'A Mortara e in tutta la Lomellina — Vigevano, Robbio, Mede, Garlasco e i comuni vicini — e, per incarichi specifici, anche nel Novarese e nel Pavese.' },
  { d: 'Devo vendere casa: cosa serve verificare?', r: 'Prima del rogito conviene controllare che l’immobile corrisponda all’ultimo titolo edilizio e alla planimetria catastale. Se ci sono differenze si regolarizzano con sanatoria e aggiornamento catastale, e serve l’APE.' },
  { d: 'Seguite le pratiche per i bonus edilizi?', r: 'Sì: impostiamo le pratiche edilizie in modo corretto per le detrazioni, prepariamo la documentazione tecnica e, dove richiesto, le comunicazioni ENEA.' },
  { d: 'Fate rilievi e riconfinamenti di terreni?', r: 'Sì, con GPS e stazione totale: rilievi plano-altimetrici, frazionamenti, tracciamenti e ricostruzione dei confini, anche in contraddittorio con i vicini.' },
  { d: 'Potete seguire tutto, dal progetto alla fine lavori?', r: 'Sì: rilievo, progetto, pratiche, sicurezza, direzione lavori, fine lavori e catasto, con un unico referente dall’inizio alla fine.' },
  { d: 'Vi occupate di successioni?', r: 'Sì: dichiarazioni di successione, volture catastali e, se serve, stima degli immobili per la divisione tra gli eredi.' },
  { d: 'Come posso chiedere un preventivo?', r: 'Compila il modulo nella pagina Contatti o chiama lo 0384 90348, descrivendo l’immobile e il tipo di lavoro: ti richiameremo per fissare un sopralluogo.' },
];
export const FAQ_COL1 = 5;

export const cta = {
  eyebrow: 'Contatti',
  titolo: 'Hai una casa o un terreno da sistemare?',
  testo: 'Raccontaci l’immobile e cosa vorresti fare: valutiamo insieme progetto, pratiche e costi, con un unico referente dal primo sopralluogo alla fine dei lavori.',
};
