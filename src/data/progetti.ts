/**
 * PORTFOLIO — 3 categorie e 12 lavori. TUTTI INVENTATI (il cliente non ha un sito):
 * titoli, luoghi, importi e descrizioni sono esempi plausibili da sostituire con i
 * lavori veri dello studio prima della pubblicazione.
 *
 * Immagini: tavole grafiche illustrative generate (src/lib/tavole.ts), non foto di
 * lavori reali. Le misure sono quelle dello stampo della base: la gallery a colonne
 * resta identica. Sostituire con foto vere mantenendo width/height intrinseci.
 */
import { tav, type Stile, type Tipo } from '../lib/tavole';
import type { Img } from '../lib/media';

export type CategoriaId = 'cat-1' | 'cat-2' | 'cat-3';

export type Categoria = {
  id: CategoriaId;
  slug: string;
  nome: string;
  etichetta: string;
  intro: string;
  title: string;
  description: string;
};

export const categorie: Categoria[] = [
  {
    id: 'cat-1',
    slug: 'edilizia',
    nome: 'Progetti e ristrutturazioni',
    etichetta: 'Edilizia',
    intro: 'Ristrutturazioni di case a corte, appartamenti e sottotetti, nuove villette, ampliamenti artigianali e rifacimento di facciate con i bonus edilizi.',
    title: 'Progetti e ristrutturazioni a Mortara | Studio Tecnico De Falco',
    description: 'Ristrutturazioni, nuove costruzioni, ampliamenti e facciate seguiti dal geometra Giovanni De Falco a Mortara e in Lomellina.',
  },
  {
    id: 'cat-2',
    slug: 'rilievi-catasto',
    nome: 'Rilievi e catasto',
    etichetta: 'Rilievi',
    intro: 'Rilievi topografici, frazionamenti, riconfinamenti, accatastamenti e sanatorie per privati, aziende agricole e imprese della Lomellina.',
    title: 'Rilievi topografici e catasto a Mortara | Studio Tecnico De Falco',
    description: 'Frazionamenti, tipi mappali, confini e accatastamenti curati dal geometra Giovanni De Falco tra Mortara, Robbio e Garlasco.',
  },
  {
    id: 'cat-3',
    slug: 'cantieri-sicurezza',
    nome: 'Cantieri e sicurezza',
    etichetta: 'Cantiere',
    intro: 'Coordinamento della sicurezza in progettazione ed esecuzione, direzione lavori e piani di lavoro per bonifiche e cantieri residenziali.',
    title: 'Sicurezza nei cantieri e direzione lavori | Studio Tecnico De Falco',
    description: 'Coordinamento sicurezza CSP/CSE, direzione lavori e bonifiche di coperture seguiti dallo Studio Tecnico De Falco di Mortara.',
  },
];

export const categoria = (id: CategoriaId) => categorie.find((c) => c.id === id)!;

export type Progetto = {
  slug: string;
  titolo: string;
  luogo: string;
  categoria: CategoriaId;
  categorie: CategoriaId[];
  intervento: string;
  progettisti?: string[];
  importo?: string;
  temi: string[];
  referente: string;
  paragrafi: string[];
  immagini: Img[];
};

type Foto = [w: number, h: number, tipo: Tipo, alt: string, disegno?: boolean];

const p = (
  slug: string,
  base: Omit<Progetto, 'slug' | 'immagini' | 'referente'>,
  foto: Foto[],
): Progetto => ({
  slug,
  ...base,
  referente: 'giovanni-de-falco',
  immagini: foto.map(([w, h, tipo, alt, disegno], i) => {
    const stile: Stile = disegno ? 'carta' : 'blu';
    return tav(`${slug}-${String(i + 1).padStart(2, '0')}`, w, h, tipo, stile, alt, { drawing: disegno, seme: slug.length * 31 + i * 7 });
  }),
});

const GDF = 'geom. Giovanni De Falco';

export const progetti: Progetto[] = [
  p('casa-a-corte-mortara', {
    titolo: 'Casa a corte in centro',
    luogo: 'Mortara (PV)',
    categoria: 'cat-1', categorie: ['cat-1'],
    intervento: 'Ristrutturazione e risanamento di una casa a corte lomellina',
    progettisti: [`Progetto e direzione lavori: ${GDF}`, `Pratiche edilizie e catastali: ${GDF}`],
    importo: '180.000 €',
    temi: ['Residenziale', 'Casa a corte', 'Ristrutturazione'],
    paragrafi: [
      'Una casa a corte degli anni Venti, rimasta disabitata a lungo, ripensata per una famiglia: consolidamento dei solai in legno, nuovo tetto ventilato, impianti rifatti e ridistribuzione degli spazi attorno al cortile. Le murature in mattoni sono state recuperate e lasciate a vista dove possibile, i serramenti sostituiti con modelli a taglio termico nel rispetto delle aperture originali. Lo studio ha seguito la pratica edilizia, la direzione dei lavori e l’aggiornamento catastale finale.',
    ],
  }, [
    [2400, 1577, 'prospetto', 'Tavola illustrativa: prospetto sul cortile della casa a corte'],
    [1537, 2049, 'sezione', 'Tavola illustrativa: sezione con il nuovo tetto ventilato'],
    [2400, 2571, 'pianta', 'Tavola illustrativa: pianta del piano terra ridistribuito'],
    [2400, 3682, 'sezione', 'Tavola illustrativa: dettaglio del consolidamento dei solai'],
    [2400, 1189, 'prospetto', 'Tavola illustrativa: fronte su strada della casa a corte'],
  ]),
  p('villetta-classe-a-gambolo', {
    titolo: 'Villetta in classe A',
    luogo: 'Gambolò (PV)',
    categoria: 'cat-1', categorie: ['cat-1'],
    intervento: 'Nuova costruzione di una villetta unifamiliare ad alta efficienza',
    progettisti: [`Progetto architettonico e permesso di costruire: ${GDF}`, `Direzione lavori e APE: ${GDF}`],
    importo: '320.000 €',
    temi: ['Nuova costruzione', 'Residenziale', 'Efficienza energetica'],
    paragrafi: [
      'Una villetta su due livelli in un lotto di nuova lottizzazione, progettata attorno all’orientamento: zona giorno aperta a sud sul giardino, camere al piano superiore, portico profondo che protegge le vetrate d’estate. Struttura in muratura portante con cappotto, pompa di calore, fotovoltaico e ventilazione meccanica.',
      'Lo studio ha curato il progetto, il permesso di costruire, i rapporti con l’impresa e i fornitori, la direzione dei lavori fino all’agibilità e l’attestato di prestazione energetica in classe A4.',
    ],
  }, [
    [2000, 2667, 'prospetto', 'Tavola illustrativa: prospetto sud della villetta'],
    [2000, 2667, 'pianta', 'Tavola illustrativa: pianta del piano terra'],
    [2000, 2667, 'pianta', 'Tavola illustrativa: pianta del primo piano'],
    [2000, 2667, 'sezione', 'Tavola illustrativa: sezione trasversale con il portico'],
    [2000, 2667, 'prospetto', 'Tavola illustrativa: prospetto nord'],
    [2000, 3000, 'sezione', 'Tavola illustrativa: dettaglio del cappotto e del nodo a terra'],
    [2000, 2667, 'catasto', 'Tavola illustrativa: inquadramento del lotto'],
  ]),
  p('rilievo-cascina-robbio', {
    titolo: 'Rilievo di una cascina',
    luogo: 'Robbio (PV)',
    categoria: 'cat-2', categorie: ['cat-2'],
    intervento: 'Rilievo topografico e aggiornamento catastale di una cascina con i terreni',
    progettisti: [`Rilievo topografico con GPS e stazione totale: ${GDF}`, `Pratiche catastali Pregeo e Docfa: ${GDF}`],
    temi: ['Rilievo topografico', 'Catasto', 'Agricolo'],
    paragrafi: [
      'Una cascina con fienili, porticati e circa venti ettari di risaie da regolarizzare prima di un passaggio generazionale. Abbiamo eseguito il rilievo plano-altimetrico dell’intero complesso, confrontato lo stato dei luoghi con le mappe catastali e individuato i fabbricati da inserire in mappa.',
      'Con i tipi mappali e le denunce Docfa il catasto oggi corrisponde a quello che c’è davvero: un passaggio indispensabile per la successione e per i futuri interventi sui fabbricati rurali.',
    ],
  }, [
    [2400, 1800, 'rilievo', 'Tavola illustrativa: piano quotato del complesso rurale'],
    [2400, 1280, 'catasto', 'Tavola illustrativa: estratto di mappa con i fabbricati da inserire', true],
    [2400, 3200, 'rilievo', 'Tavola illustrativa: punti di rilievo attorno ai fienili'],
    [2400, 1215, 'prospetto', 'Tavola illustrativa: prospetto del porticato', true],
    [2400, 1800, 'catasto', 'Tavola illustrativa: particelle agricole aggiornate'],
    [2400, 3200, 'rilievo', 'Tavola illustrativa: curve di livello delle risaie'],
    [2400, 1800, 'pianta', 'Tavola illustrativa: pianta dei fabbricati rurali'],
  ]),
  p('appartamento-vigevano', {
    titolo: 'Appartamento al secondo piano',
    luogo: 'Vigevano (PV)',
    categoria: 'cat-1', categorie: ['cat-1'],
    intervento: 'Ristrutturazione interna di un appartamento con detrazioni fiscali',
    progettisti: [`Progetto e CILA: ${GDF}`, `Direzione lavori e pratiche ENEA: ${GDF}`],
    importo: '95.000 €',
    temi: ['Residenziale', 'Ristrutturazione', 'Bonus edilizi'],
    paragrafi: [
      'Un appartamento degli anni Sessanta in un condominio vicino al centro, con stanze piccole e un lungo corridoio. Il progetto ha aperto la zona giorno verso la cucina, ricavato un secondo bagno e una lavanderia, e ridisegnato gli spazi notte senza toccare le parti strutturali.',
      'Sono stati rifatti impianto elettrico e idraulico, sostituiti i serramenti e installato un sistema di riscaldamento a pavimento. La pratica è stata impostata fin dall’inizio per accedere alle detrazioni fiscali previste per le ristrutturazioni.',
      'Lo studio ha coordinato le imprese, verificato i tempi e la contabilità e chiuso l’intervento con la fine lavori e la variazione catastale.',
    ],
  }, [
    [2400, 2107, 'pianta', 'Tavola illustrativa: pianta dello stato di progetto'],
    [2400, 1818, 'pianta', 'Tavola illustrativa: pianta dello stato di fatto'],
    [2400, 3200, 'sezione', 'Tavola illustrativa: sezione con il nuovo bagno'],
    [2400, 3409, 'sezione', 'Tavola illustrativa: dettaglio del massetto radiante'],
    [2400, 3200, 'pianta', 'Tavola illustrativa: schema dell’impianto elettrico'],
    [2400, 3268, 'prospetto', 'Tavola illustrativa: vista della parete attrezzata'],
    [2400, 2149, 'pianta', 'Tavola illustrativa: arredo della zona giorno'],
  ]),
  p('ampliamento-capannone-cilavegna', {
    titolo: 'Ampliamento di un capannone',
    luogo: 'Cilavegna (PV)',
    categoria: 'cat-1', categorie: ['cat-1'],
    intervento: 'Ampliamento di un capannone artigianale con nuovi uffici',
    progettisti: [`Progetto e permesso di costruire: ${GDF}`, `Coordinamento sicurezza e direzione lavori: ${GDF}`],
    importo: '410.000 €',
    temi: ['Produttivo', 'Ampliamento', 'Uffici'],
    paragrafi: [
      'Un’azienda artigiana aveva bisogno di più spazio senza fermare la produzione. Il nuovo volume prefabbricato si affianca al capannone esistente e ospita magazzino, spogliatoi e una palazzina uffici su due piani con ingresso indipendente.',
      'Il cantiere è stato organizzato per fasi, con percorsi separati per mezzi e personale, così da lavorare accanto a un’attività sempre aperta.',
    ],
  }, [
    [2400, 3200, 'prospetto', 'Tavola illustrativa: prospetto della palazzina uffici'],
    [2400, 3200, 'pianta', 'Tavola illustrativa: pianta dell’ampliamento'],
    [2400, 3200, 'sezione', 'Tavola illustrativa: sezione del nuovo volume'],
    [2400, 3200, 'cantiere', 'Tavola illustrativa: fasi di cantiere'],
    [2400, 3200, 'prospetto', 'Tavola illustrativa: fronte del magazzino'],
    [2400, 3200, 'catasto', 'Tavola illustrativa: planimetria del lotto produttivo'],
  ]),
  p('facciate-condominio-mortara', {
    titolo: 'Facciate di un condominio',
    luogo: 'Mortara (PV)',
    categoria: 'cat-1', categorie: ['cat-1'],
    intervento: 'Rifacimento delle facciate e dei balconi di un condominio di 18 alloggi',
    progettisti: [`Progetto e pratica edilizia: ${GDF}`, `Direzione lavori e sicurezza: ${GDF}`],
    importo: '260.000 €',
    temi: ['Condominio', 'Facciate', 'Bonus edilizi'],
    paragrafi: [
      'Facciate ammalorate, frontalini dei balconi in calcestruzzo da ripristinare e parapetti non più a norma: l’intervento ha messo in sicurezza l’edificio e gli ha dato un aspetto nuovo, con tinteggiature ai silicati e nuovi parapetti in acciaio. Lo studio ha seguito le assemblee condominiali, la pratica, il cantiere e la contabilità per le detrazioni.',
    ],
  }, [
    [2400, 3200, 'prospetto', 'Tavola illustrativa: prospetto principale del condominio'],
    [2400, 2433, 'prospetto', 'Tavola illustrativa: abaco dei colori di facciata'],
    [2400, 3200, 'sezione', 'Tavola illustrativa: sezione del balcone ripristinato'],
    [2400, 2792, 'prospetto', 'Tavola illustrativa: prospetto laterale'],
    [2400, 2496, 'cantiere', 'Tavola illustrativa: ponteggio di facciata'],
    [2400, 3200, 'prospetto', 'Tavola illustrativa: fronte interno'],
    [2400, 3200, 'sezione', 'Tavola illustrativa: dettaglio del frontalino'],
    [2400, 3200, 'prospetto', 'Tavola illustrativa: nuovo parapetto in acciaio'],
    [1401, 1107, 'pianta', 'Tavola illustrativa: pianta tipo con i balconi', true],
  ]),
  p('frazionamento-lotto-mortara', {
    titolo: 'Frazionamento di un lotto',
    luogo: 'Mortara (PV)',
    categoria: 'cat-2', categorie: ['cat-2'],
    intervento: 'Frazionamento di un’area edificabile in quattro lotti',
    progettisti: [`Rilievo e tipo di frazionamento: ${GDF}`, `Picchettamento dei lotti: ${GDF}`],
    importo: '12.000 €',
    temi: ['Frazionamento', 'Catasto', 'Lotti edificabili'],
    paragrafi: [
      'Un terreno ai margini dell’abitato, destinato dal piano di governo del territorio a nuove residenze, da dividere in quattro lotti da vendere separatamente.',
      'Abbiamo eseguito il rilievo dell’area con GPS, verificato i confini con i vicini e le distanze dalla strada, e studiato la divisione più equilibrata tra superfici, accessi e servitù.',
      'Il tipo di frazionamento è stato presentato con Pregeo e approvato dall’Agenzia delle Entrate–Territorio; a seguire, il picchettamento dei nuovi vertici sul terreno.',
      'I proprietari hanno potuto stipulare i rogiti con lotti già identificati in mappa e materializzati sul posto.',
    ],
  }, [
    [2400, 1800, 'catasto', 'Tavola illustrativa: proposta di frazionamento in quattro lotti'],
    [2400, 3200, 'rilievo', 'Tavola illustrativa: rilievo GPS dei vertici'],
    [2400, 1800, 'catasto', 'Tavola illustrativa: estratto di mappa aggiornato'],
    [2400, 3066, 'rilievo', 'Tavola illustrativa: libretto delle misure', true],
    [2400, 3200, 'rilievo', 'Tavola illustrativa: picchettamento sul terreno'],
  ]),
  p('sottotetto-mede', {
    titolo: 'Recupero di un sottotetto',
    luogo: 'Mede (PV)',
    categoria: 'cat-1', categorie: ['cat-1'],
    intervento: 'Recupero abitativo di un sottotetto con nuove aperture in copertura',
    progettisti: [`Progetto e pratica edilizia: ${GDF}`, `Direzione lavori e aggiornamento catastale: ${GDF}`],
    importo: '70.000 €',
    temi: ['Residenziale', 'Sottotetto', 'Recupero'],
    paragrafi: [
      'Un sottotetto usato come deposito trasformato in una camera con bagno e studio, collegato all’alloggio sottostante da una nuova scala. Il progetto ha verificato altezze e rapporti aeroilluminanti richiesti dalla legge regionale sul recupero dei sottotetti.',
      'La copertura è stata isolata dall’interno e dotata di finestre a tetto; a fine lavori lo studio ha presentato la variazione catastale e la segnalazione di agibilità.',
    ],
  }, [
    [2400, 1800, 'sezione', 'Tavola illustrativa: sezione del sottotetto recuperato'],
    [1600, 2127, 'pianta', 'Tavola illustrativa: pianta del nuovo piano mansardato'],
    [1600, 2067, 'sezione', 'Tavola illustrativa: verifica delle altezze medie'],
    [2400, 3200, 'prospetto', 'Tavola illustrativa: falda con le finestre a tetto'],
    [1600, 2062, 'pianta', 'Tavola illustrativa: nuova scala di collegamento'],
  ]),
  p('confini-fondo-garlasco', {
    titolo: 'Confini di un fondo agricolo',
    luogo: 'Garlasco (PV)',
    categoria: 'cat-2', categorie: ['cat-2'],
    intervento: 'Riconfinamento di un fondo agricolo e ricostruzione dei termini',
    progettisti: [`Ricerca dei documenti e rilievo: ${GDF}`, `Riconfinamento in contraddittorio: ${GDF}`],
    importo: '6.500 €',
    temi: ['Confini', 'Rilievo topografico', 'Agricolo'],
    paragrafi: [
      'Due proprietari confinanti non erano d’accordo su dove passasse il confine tra i loro campi. Partendo dalle mappe d’impianto e dai frazionamenti storici abbiamo ricostruito la linea di confine, rilevato i punti fiduciali e materializzato i termini in contraddittorio con il tecnico della controparte, chiudendo la questione con un verbale firmato da entrambi.',
    ],
  }, [
    [2400, 1802, 'catasto', 'Tavola illustrativa: sovrapposizione tra mappa e rilievo'],
    [1004, 708, 'catasto', 'Tavola illustrativa: estratto della mappa d’impianto', true],
    [2400, 1109, 'rilievo', 'Tavola illustrativa: linea di confine ricostruita'],
    [800, 1304, 'rilievo', 'Tavola illustrativa: monografia di un punto fiduciale', true],
    [1504, 3264, 'rilievo', 'Tavola illustrativa: termini lungo il fosso'],
    [2136, 4624, 'catasto', 'Tavola illustrativa: particelle confinanti'],
  ]),
  p('cantiere-palazzina-novara', {
    titolo: 'Cantiere di una palazzina',
    luogo: 'Novara',
    categoria: 'cat-3', categorie: ['cat-3'],
    intervento: 'Coordinamento della sicurezza per una palazzina di 8 alloggi',
    progettisti: [`Coordinatore sicurezza in progettazione ed esecuzione: ${GDF}`, `Responsabile dei lavori: committenza`],
    temi: ['Sicurezza', 'Nuova costruzione', 'Residenziale'],
    paragrafi: [
      'Nuova palazzina in un lotto stretto tra due edifici abitati: piano di sicurezza e coordinamento con layout di cantiere, gru, aree di stoccaggio e accessi; in esecuzione, sopralluoghi periodici, riunioni di coordinamento con le imprese e verifica dei piani operativi fino alla consegna.',
    ],
  }, [
    [2400, 1800, 'cantiere', 'Tavola illustrativa: layout del cantiere con la gru'],
    [2400, 1800, 'cantiere', 'Tavola illustrativa: area di stoccaggio e accessi'],
    [2160, 2880, 'prospetto', 'Tavola illustrativa: prospetto della palazzina'],
    [2400, 1800, 'cantiere', 'Tavola illustrativa: ponteggi e protezioni'],
    [2400, 1800, 'sezione', 'Tavola illustrativa: sezione con gli scavi'],
    [2400, 1800, 'pianta', 'Tavola illustrativa: pianta tipo degli alloggi'],
    [2400, 1800, 'cantiere', 'Tavola illustrativa: fasi di lavoro'],
    [2400, 1800, 'catasto', 'Tavola illustrativa: inquadramento del lotto'],
    [1200, 886, 'cantiere', 'Tavola illustrativa: segnaletica di cantiere'],
  ]),
  p('copertura-amianto-palestro', {
    titolo: 'Rimozione di una copertura in amianto',
    luogo: 'Palestro (PV)',
    categoria: 'cat-3', categorie: ['cat-1', 'cat-3'],
    intervento: 'Bonifica e rifacimento della copertura di un ricovero agricolo',
    temi: ['Bonifica', 'Copertura', 'Sicurezza'],
    paragrafi: [
      'Una tettoia agricola con lastre in cemento-amianto: pratica di bonifica con l’impresa specializzata, coordinamento della sicurezza per i lavori in quota e nuova copertura in pannelli coibentati, con le linee vita previste dalla normativa regionale.',
    ],
  }, [
    [2400, 1800, 'cantiere', 'Tavola illustrativa: linee vita sulla nuova copertura'],
    [2400, 1800, 'sezione', 'Tavola illustrativa: sezione della tettoia'],
    [2400, 1600, 'cantiere', 'Tavola illustrativa: area di confinamento'],
    [2400, 1800, 'prospetto', 'Tavola illustrativa: prospetto del ricovero agricolo'],
  ]),
  p('sanatoria-villetta-mortara', {
    titolo: 'Sanatoria di una villetta',
    luogo: 'Mortara (PV)',
    categoria: 'cat-2', categorie: ['cat-2'],
    intervento: 'Accertamento di conformità e aggiornamento catastale prima della vendita',
    progettisti: [`Verifica di conformità urbanistica: ${GDF}`, `Sanatoria e Docfa: ${GDF}`],
    importo: '4.800 €',
    temi: ['Sanatoria', 'Catasto', 'Compravendita'],
    paragrafi: [
      'Prima del rogito, la verifica di conformità ha trovato una veranda chiusa e una tramezza spostata rispetto all’ultimo titolo edilizio. Con la pratica di sanatoria e la nuova planimetria catastale l’immobile è stato venduto nei tempi previsti, senza sorprese per acquirente e notaio.',
    ],
  }, [
    [800, 317, 'prospetto', 'Tavola illustrativa: prospetto della villetta con la veranda', true],
    [800, 333, 'sezione', 'Tavola illustrativa: sezione della veranda sanata', true],
    [800, 1048, 'pianta', 'Tavola illustrativa: planimetria catastale aggiornata'],
    [800, 447, 'pianta', 'Tavola illustrativa: confronto tra stato legittimo e stato di fatto', true],
  ]),
];

export const progetto = (slug: string) => progetti.find((x) => x.slug === slug)!;
export const copertina = (x: Progetto) => x.immagini[0];
export const inCategoria = (id: CategoriaId) => progetti.filter((x) => x.categorie.includes(id));
