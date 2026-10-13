import type { MoppoPrivacyPolicy } from "../moppo-policy";

export const policy: MoppoPrivacyPolicy = {
  title: "Informativa sulla privacy di Moppo",
  description: "Come Moppo gestisce file, foto, cronologia locale, permessi, controlli facoltativi degli aggiornamenti e richieste di assistenza.",
  intro: ["Moppo è un’app gratuita e open source per macOS di Anguria Studio. Ti aiuta a esaminare l’uso del disco, gli elementi da pulire, i duplicati e la rimozione delle applicazioni. Questa informativa riguarda l’app Moppo."],
  sections: {
    files: {
      heading: "File e foto",
      blocks: ["Moppo analizza i file sul tuo Mac per trovare elementi da pulire e misurare lo spazio occupato. Legge la libreria fotografica quando usi la ricerca di foto duplicate. Le scansioni avvengono in locale. Moppo non carica su Anguria Studio i file analizzati, i percorsi, le foto o i contenuti della libreria fotografica."],
    },
    local: {
      heading: "Dati sul tuo Mac",
      blocks: [
        "Moppo conserva sul Mac impostazioni, cache delle scansioni, misurazioni dello spazio e registri delle rimozioni. Questi registri possono contenere i percorsi originali dei file e le posizioni nel Cestino. Moppo li usa per la Cronologia e la funzione Put Back.",
        "Moppo non ha un servizio di account né telemetria dell’app. I dati locali possono contenere informazioni private; trattali come dati sensibili se decidi di condividerli o includerli in un backup.",
      ],
    },
    permissions: {
      heading: "Accesso ai file e a Foto",
      blocks: ["macOS controlla l’accesso ai file e alla libreria fotografica. L’Accesso completo al disco permette a Moppo di analizzare le cartelle protette; puoi continuare con accesso limitato, che può lasciare alcune cartelle illeggibili. Le scansioni programmate e le misurazioni automatiche richiedono l’Accesso completo al disco. Aprire la ricerca di foto duplicate richiede l’accesso a Foto. Puoi gestire questi permessi nelle Impostazioni di Sistema di macOS."],
    },
    updates: {
      heading: "Aggiornamenti facoltativi",
      blocks: ["I controlli automatici degli aggiornamenti sono facoltativi. Quando cerchi aggiornamenti, Moppo contatta il sito degli aggiornamenti tramite HTTPS. Il sito riceve il tuo indirizzo IP e le normali informazioni di connessione. Sparkle confronta la versione installata di Moppo con il feed degli aggiornamenti. Moppo disabilita l’invio del profilo di sistema di Sparkle e chiede conferma prima di installare un aggiornamento."],
    },
    services: {
      heading: "Servizi esterni",
      blocks: [
        "Le richieste di Foto e iCloud usano i servizi Apple e il tuo account Apple esistente. Se il download delle foto è attivo, le scansioni e la griglia delle foto possono scaricare da iCloud le anteprime mancanti; aprire un’anteprima può scaricare l’originale. Puoi disattivare i download in Impostazioni → Avanzate. L’impostazione si applica alle nuove richieste; quelle già in corso possono terminare.",
        "La rimozione tramite Homebrew usa gli strumenti Homebrew installati sul Mac. Homebrew può contattare le fonti dei pacchetti secondo le proprie impostazioni. Se Homebrew richiede la tua password, Moppo la invia direttamente a sudo e non la salva. Questi servizi gestiscono le proprie richieste di rete secondo le proprie informative.",
      ],
    },
    support: {
      heading: "Richieste di assistenza",
      blocks: ["Moppo può preparare una segnalazione con le versioni di Moppo e macOS. La segnalazione generata non include percorsi dei file, foto, registri delle rimozioni o misurazioni salvate. Puoi leggerla prima di inviarla. Il tuo provider email e Anguria Studio ricevono le informazioni che scegli di inviare. Le segnalazioni pubbliche su GitHub possono essere lette da altri."],
    },
    contact: {
      heading: "Contatti e modifiche",
      blocks: [
        { kind: "p", runs: ["Per domande sulla privacy, scrivi a ", { kind: "email" }, "."] },
        "Aggiorneremo questa pagina quando cambierà il trattamento dei dati nell’app, indicando qui la data di entrata in vigore attuale.",
      ],
    },
  },
};
