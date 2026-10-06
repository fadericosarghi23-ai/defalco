/**
 * SERVIZI (6) — inventati sul profilo tipico di uno studio di geometra (il cliente non
 * ha un sito): da confermare con il geom. De Falco.
 */
import type { Icona } from './icone';
import type { CategoriaId } from './progetti';

export type Servizio = {
  id: string;
  nome: string;
  breve: string;
  icona: Icona;
  paragrafi: [string, string];
  punti: string[];
  foto: string;
  correlati: string[];
  categoria: CategoriaId;
};

export const servizi: Servizio[] = [
  {
    id: 'progetti-ristrutturazioni',
    nome: 'Progetti e ristrutturazioni',
    breve: 'Ristrutturazioni, ampliamenti e piccole nuove costruzioni: dal rilievo dell’esistente al progetto, fino alla fine dei lavori.',
    icona: 'casa',
    paragrafi: [
      'Progettiamo ristrutturazioni di case e appartamenti, recuperi di sottotetti e case a corte, ampliamenti di capannoni e piccole nuove costruzioni residenziali. Ogni progetto parte da un rilievo accurato dell’esistente e da una verifica di cosa si può fare secondo le regole del comune.',
      'Seguiamo il cliente nella scelta delle soluzioni e dei costi, prepariamo computi e capitolati e restiamo il riferimento unico anche quando entrano in gioco imprese e artigiani.',
    ],
    punti: [
      'Rilievo dello stato di fatto',
      'Studio di fattibilità e prime stime dei costi',
      'Progetto architettonico e titoli edilizi',
      'Computi metrici e capitolati',
      'Direzione dei lavori e contabilità',
      'Fine lavori e agibilità',
    ],
    foto: 'casa-a-corte-mortara',
    correlati: ['casa-a-corte-mortara', 'villetta-classe-a-gambolo', 'sottotetto-mede'],
    categoria: 'cat-1',
  },
  {
    id: 'pratiche-edilizie',
    nome: 'Pratiche edilizie e sanatorie',
    breve: 'CILA, SCIA, permessi di costruire, sanatorie e verifiche di conformità prima di comprare o vendere casa.',
    icona: 'documento',
    paragrafi: [
      'Prepariamo e presentiamo le pratiche edilizie necessarie a ogni intervento: CILA, SCIA, permesso di costruire, agibilità, autorizzazioni paesaggistiche e pratiche per le detrazioni fiscali.',
      'Prima di un acquisto o di un rogito verifichiamo la conformità urbanistica e catastale dell’immobile e, se serve, regolarizziamo le difformità con la sanatoria.',
    ],
    punti: [
      'CILA, SCIA e permesso di costruire',
      'Sanatorie e accertamenti di conformità',
      'Verifiche di conformità per compravendite',
      'Accesso agli atti in comune',
      'Pratiche per bonus e detrazioni',
    ],
    foto: 'appartamento-vigevano',
    correlati: ['appartamento-vigevano', 'sanatoria-villetta-mortara', 'facciate-condominio-mortara'],
    categoria: 'cat-1',
  },
  {
    id: 'catasto-successioni',
    nome: 'Catasto e successioni',
    breve: 'Accatastamenti, variazioni, frazionamenti e tipi mappali, volture e dichiarazioni di successione.',
    icona: 'catasto',
    paragrafi: [
      'Curiamo tutte le pratiche catastali: accatastamento di nuove costruzioni, variazioni dopo una ristrutturazione, frazionamenti e tipi mappali con Pregeo, planimetrie e denunce con Docfa.',
      'Seguiamo anche volture e dichiarazioni di successione, coordinando i documenti con notai, banche ed eredi.',
    ],
    punti: [
      'Accatastamenti e variazioni Docfa',
      'Frazionamenti e tipi mappali Pregeo',
      'Visure, planimetrie ed estratti di mappa',
      'Volture catastali',
      'Dichiarazioni di successione',
      'Regolarizzazione di fabbricati rurali',
    ],
    foto: 'frazionamento-lotto-mortara',
    correlati: ['frazionamento-lotto-mortara', 'sanatoria-villetta-mortara', 'rilievo-cascina-robbio'],
    categoria: 'cat-2',
  },
  {
    id: 'rilievi-topografici',
    nome: 'Rilievi topografici e confini',
    breve: 'Rilievi con GPS e stazione totale, piani quotati, tracciamenti e riconfinamenti di terreni e fabbricati.',
    icona: 'treppiede',
    paragrafi: [
      'Eseguiamo rilievi topografici con GPS e stazione totale per progetti, frazionamenti e verifiche: piani quotati, profili, tracciamenti di nuove costruzioni e rilievi di fabbricati.',
      'Quando i confini sono incerti li ricostruiamo partendo dalle mappe storiche e li materializziamo sul terreno, anche in contraddittorio con i tecnici dei vicini.',
    ],
    punti: [
      'Rilievi plano-altimetrici',
      'Tracciamenti e picchettamenti',
      'Riconfinamenti e ricostruzione dei termini',
      'Rilievi di fabbricati',
      'Verifiche di distanze e superfici',
    ],
    foto: 'rilievo-cascina-robbio',
    correlati: ['rilievo-cascina-robbio', 'confini-fondo-garlasco', 'frazionamento-lotto-mortara'],
    categoria: 'cat-2',
  },
  {
    id: 'sicurezza-cantieri',
    nome: 'Sicurezza e direzione lavori',
    breve: 'Coordinamento della sicurezza in progettazione ed esecuzione, direzione lavori e responsabile dei lavori.',
    icona: 'casco',
    paragrafi: [
      'Svolgiamo il ruolo di coordinatore della sicurezza in fase di progettazione (CSP) e di esecuzione (CSE): piani di sicurezza e coordinamento, fascicolo dell’opera, verifiche in cantiere e riunioni con le imprese.',
      'Come direttori dei lavori controlliamo qualità, tempi e costi, tenendo la contabilità fino al collaudo e alla consegna.',
    ],
    punti: [
      'Piano di sicurezza e coordinamento (PSC)',
      'Coordinatore in esecuzione (CSE)',
      'Notifiche preliminari e fascicolo dell’opera',
      'Direzione lavori e contabilità',
      'Pratiche per bonifiche e linee vita',
    ],
    foto: 'cantiere-palazzina-novara',
    correlati: ['cantiere-palazzina-novara', 'copertura-amianto-palestro', 'ampliamento-capannone-cilavegna'],
    categoria: 'cat-3',
  },
  {
    id: 'stime-perizie',
    nome: 'Stime, perizie e APE',
    breve: 'Stime di valore, perizie tecniche, consulenze di parte e attestati di prestazione energetica.',
    icona: 'stima',
    paragrafi: [
      'Valutiamo il valore di case, terreni e fabbricati per compravendite, divisioni ereditarie e finanziamenti, e redigiamo perizie tecniche e consulenze di parte.',
      'Rilasciamo l’attestato di prestazione energetica (APE) necessario per vendere o affittare e indichiamo gli interventi che migliorano la classe dell’immobile.',
    ],
    punti: [
      'Stime di immobili e terreni',
      'Perizie tecniche e asseverate',
      'Consulenze tecniche di parte',
      'Attestati di prestazione energetica (APE)',
      'Divisioni ereditarie',
    ],
    foto: 'sottotetto-mede',
    correlati: ['sottotetto-mede', 'appartamento-vigevano', 'facciate-condominio-mortara'],
    categoria: 'cat-1',
  },
];
