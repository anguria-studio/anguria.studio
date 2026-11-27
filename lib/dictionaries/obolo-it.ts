import type { OboloCopy } from "./obolo-en";

export const oboloCopy: OboloCopy = {
  name: "Obolo",
  category: "Gestione abbonamenti",
  tagline: "Scopri quanto spendi ogni mese e quando scade il prossimo pagamento.",
  seoTitle: "Obolo — Gestione abbonamenti per macOS",
  description: "Obolo è un’app open source per tenere traccia degli abbonamenti su Mac. Controlla le spese mensili e annuali, preparati ai prossimi rinnovi e consulta lo storico dei prezzi.",
  nav: "Esplora Obolo",
  privacy: {
    link: "Informativa sulla privacy",
    back: "Torna a Obolo",
    effective: "Ultimo aggiornamento il {date}.",
  },
  terms: {
    link: "Condizioni d’uso",
    updated: "Ultimo aggiornamento: {date}",
  },
  download: "Scarica",
  requirements: "macOS {version}+ · Apple silicon e Intel",
  hero: {
    shotsLabel: "Schermate di Obolo",
    shots: {
      dashboard: { label: "Panoramica", alt: "Il riepilogo di Obolo con abbonamenti di esempio mostra 129,41 € di spesa mensile, il dettaglio per categoria e 23,40 € ancora da pagare ad agosto." },
      months: { label: "Mesi", alt: "Grafico delle spese mese per mese in Obolo, con agosto 2026 selezionato e 35,39 € di addebiti." },
      subscriptions: { label: "Abbonamenti", alt: "Grafico ad anello e dettaglio della spesa per nove abbonamenti attivi in Obolo." },
      calendar: { label: "Calendario", alt: "Calendario di agosto 2026 in Obolo con le date di rinnovo di Dropbox, Netflix e Spotify." },
      list: { label: "Elenco", alt: "Elenco di nove abbonamenti attivi in Obolo con date di rinnovo, importi degli addebiti e costi mensili." },
      detail: { label: "Dettaglio", alt: "Dettaglio di un abbonamento in Obolo con il prossimo pagamento, la spesa totale e un grafico dei pagamenti e delle variazioni di prezzo." },
    },
    title: "Abbonamenti,",
    accent: "tracciati e impilati",
    download: "Scarica per Mac",
    body: "Obolo è una semplice app per Mac che ti aiuta a tenere traccia degli abbonamenti, con grafici curati. Scopri dove vanno i tuoi soldi e come cambiano i prezzi nel tempo.",
  },
  story: {
    title: "Scopri dove vanno i tuoi soldi",
    body: "Confronta le spese ricorrenti per mese, categoria e abbonamento. La vista mensile mostra quando i rinnovi annuali fanno salire la spesa.",
  },
  features: [
    { id: "spending", title: "Totali mensili e annuali", body: "Scopri quanto spendi per software, streaming o qualsiasi altra categoria. Passa alla vista degli abbonamenti per vedere quanto pesa ogni servizio sul totale." },
    { id: "calendar", title: "I rinnovi sul calendario", body: "Scegli un giorno per vedere cosa scade, imposta un promemoria o aggiungi i pagamenti al Calendario di Apple. Puoi vedere il prossimo pagamento anche nella barra dei menu del Mac." },
    { id: "history", title: "Lo storico dei prezzi", body: "Registra ogni variazione di prezzo dalla data in cui entra in vigore. Lo storico dei pagamenti conserva gli importi e le valute originali." },
    { id: "currencies", title: "Più valute, un solo totale", body: "Conserva la valuta originale di ogni abbonamento e confronta le spese nella valuta che preferisci. Obolo ti segnala eventuali tassi di cambio mancanti." },
  ],
  faqTitle: "Qualche cosa da sapere",
  faq: [
    { id: "availability", question: "Come si installa Obolo?", answer: "Scarica Obolo con il pulsante qui sopra, apri l’immagine disco e trascina Obolo nella cartella Applicazioni. Funziona sui Mac con Apple silicon o Intel da macOS 15 Sequoia in poi." },
    { id: "open-source", question: "Obolo è open source?", answer: "Sì. Il codice sorgente è disponibile su GitHub con licenza MIT." },
    { id: "data-and-sync", question: "Dove conserva Obolo i dati dei miei abbonamenti?", answer: "Obolo salva la tua raccolta sul Mac. Puoi attivare la sincronizzazione con iCloud per ritrovarla su tutti i tuoi Mac. Obolo non richiede un account dedicato e non raccoglie dati di telemetria." },
    { id: "import-export", question: "Posso importare i miei abbonamenti?", answer: "Sì. Trascina un file CSV nella finestra di Obolo e controlla l’anteprima prima di importarlo. Puoi anche esportare un CSV o salvare una copia di backup in formato JSON con i tuoi abbonamenti e le impostazioni." },
    { id: "shortcuts", question: "Obolo funziona con Comandi Rapidi?", answer: "Sì. Con Comandi Rapidi puoi vedere il prossimo rinnovo, aprire l’elenco degli abbonamenti in scadenza o aggiungerne uno." },
  ],
  related: {
    label: "Sempre da Anguria Studio",
    paguro: "Una casa nativa per le tue app web.",
    moppo: "Un’app per pulire il Mac pensata per chi sviluppa.",
  },
};
