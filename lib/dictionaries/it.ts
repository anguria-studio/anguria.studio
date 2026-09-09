import type { Dictionary } from "./en";

/**
 * Tradotto dalle stringhe provvisorie inglesi. Da ritradurre quando i
 * `TODO(copy)` in en.ts saranno risolti.
 */
export const dictionary: Dictionary = {
  meta: {
    title: "Anguria Studio — App gratuite e open source per macOS",
    description:
      "Tre piccole utility gratuite e open source per il tuo Mac: Obolo, Scolo e Paguro.",
  },
  nav: {
    home: "Anguria Studio",
    github: "Vedi su GitHub",
  },
  themeToggle: {
    label: "Tema",
    system: "Sistema",
    light: "Chiaro",
    dark: "Scuro",
  },
  hero: {
    title: "Piccole app per Mac, fatte con cura.",
    titleAccent: "cura",
    subtitle:
      "Tre utility che fanno una cosa sola, restano fuori dai piedi e non costano nulla. Nessun account, nessuna telemetria, nessun abbonamento — solo open source.",
  },
  apps: {
    obolo: {
      name: "Obolo",
      category: "Gestione abbonamenti",
      shotAlt:
        "La finestra di Obolo sulla scrivania di un Mac, con il riepilogo mensile degli abbonamenti.",
      tagline: "Una piccola utility per il tuo Mac.",
      description:
        "Obolo è un'app essenziale che vive in silenzio nella barra dei menu.",
      features: [
        // TODO(copy): three real features.
        {
          title: "Nativa",
          body: "Scritta in Swift. Veloce, leggera e gentile con la batteria.",
        },
        {
          title: "Privata",
          body: "Niente esce dal tuo Mac. Nessun account, nessuna analitica, nessuna chiamata a casa.",
        },
        {
          title: "Open source",
          body: "Ogni riga è su GitHub. Leggila, forkala, mandaci una patch.",
        },
      ],
    },
    scolo: {
      name: "Scolo",
      category: "Pulizia del Mac",
      shotAlt:
        "La finestra di Scolo sulla scrivania di un Mac, con lo spazio su disco recuperabile.",
      // TODO(copy): confirm against the shipping feature set.
      tagline: "Butta via quello che il tuo Mac accumula.",
      // TODO(copy)
      description:
        "Scolo trova cache, avanzi e download dimenticati che riempiono il disco in silenzio, ti mostra esattamente cosa sono e li fa scorrere via in un clic.",
      features: [
        // TODO(copy)
        {
          title: "Nativa",
          body: "Scritta in Swift. Veloce, leggera e gentile con la batteria.",
        },
        {
          title: "Privata",
          body: "Niente esce dal tuo Mac. Nessun account, nessuna analitica, nessuna chiamata a casa.",
        },
        {
          title: "Open source",
          body: "Ogni riga è su GitHub. Leggila, forkala, mandaci una patch.",
        },
      ],
    },
    paguro: {
      name: "Paguro",
      category: "Spazio per app web",
      shotAlt: "La finestra di Paguro sulla scrivania di un Mac, con le app web raccolte in una barra laterale.",
      tagline: "Uno spazio nativo per le tue app web",
      description: "Riunisci messaggi, posta e strumenti web di ogni giorno in un unico spazio nativo per Mac.",
      features: [
        {
          title: "Spazi di lavoro",
          body: "Organizza servizi di lavoro e personali in una sola finestra."
        },
        {
          title: "Account separati",
          body: "Ogni account conserva una sessione di accesso separata sul tuo Mac."
        },
        {
          title: "Notifiche",
          body: "Scegli le notifiche di macOS o l’isola delle notifiche opzionale."
        }
      ]
    },
  },
  home: {
    hero: {
      title: "App gratuite e open source per il tuo Mac",
      /** Rendered in the accent colour, with the Apple glyph in front of it. */
      titleAccent: "Mac",
    },
    statement: {
      line1: "Tre utility che fanno una cosa ciascuna.",
      line2: "Nessun abbonamento, nessun account.",
      accent: "Nessun abbonamento",
    },
    features: {
      swift: "Fatte per macOS",
      glass: "Estetica Liquid Glass",
      privacy: "Private di default",
      custom: "Personalizzabili",
      speed: "Performanti",
      source: "Open source",
    },
    /** Accessible name for the Dock-style row of app icons; never shown. */
    dockLabel: "Le nostre app",
  },
  paguroHero: {
    previewTheme: "Aspetto dell’anteprima",
    previewLight: "Anteprima chiara",
    previewDark: "Anteprima scura",

    title: "Dai alle tue app",
    accent: "una casa.",
    intro: "Uno spazio nativo per le tue app web.",
    eyebrow: "Paguro per macOS",
    tryLabel: "Dai, mandati qualcosa.",
    tryHint: "Scegli un’app. Guarda il notch.",
    demoLabel: "Prova delle notifiche",
    open: "Apri le notifiche",
    collapse: "Riduci le notifiche",
    clear: "Cancella tutte",
    dismiss: "Chiudi notifica",
    empty: "Tutto in ordine.",
    emptyHint: "Un po’ di pace e tranquillità.",
    now: "ora",
    notificationCount: "{count} notifiche",
    sent: "Nuova notifica da {service}: {message}",
    cleared: "Tutte le notifiche cancellate.",
    removed: "Notifica chiusa.",
    sidebar: "Spazio per organizzare",
    compact: "Spazio per concentrarti",
    layoutLabel: "Confronta le disposizioni",
    captureAlt: "Paguro con spazi Personal e Work e ChatGPT aperto, senza accesso.",
    compactAlt: "Paguro con barra compatta dei servizi e ChatGPT aperto, senza accesso.",
    captureNote: "Una sola app. Più spazio per tutto.",
    demoNote: "Inviane qualcuna. Passa sul notch per vederle tutte.",
    slackTitle: "Studio",
    slackMessage: "I design sono pronti.",
    whatsappTitle: "La compagnia della pizza",
    whatsappMessage: "Pizza alle otto?",
    gmailTitle: "Una piccola fuga",
    gmailMessage: "I programmi per il weekend sono arrivati.",
    back: "Tutte le app"
  },
  paguroPage: {
    nav: "Esplora Paguro",
    faqLabel: "Domande",
    get: "Ottieni Paguro",
    faqTitle: "Qualche cosa da sapere.",
    faq: [
      {
        question: "Paguro è davvero gratuito?",
        answer: "Sì. Paguro è gratuito e open source, senza funzioni a pagamento. I siti che usi possono richiedere account o abbonamenti propri."
      },
      {
        question: "Quali servizi posso usare?",
        answer: "Scegli dal catalogo o aggiungi un sito tramite URL. La maggior parte funziona come in un browser, ma alcuni fornitori limitano i browser integrati. Le passkey non sono ancora supportate: usa un altro metodo di accesso, se disponibile."
      },
      {
        question: "Serve un Mac con il notch?",
        answer: "No. Spazi di lavoro, servizi e notifiche di macOS funzionano anche senza. L’isola è una funzione opzionale per gli schermi compatibili con notch."
      },
      {
        question: "Sincronizza gli accessi tra Mac?",
        answer: "No. Ogni account ha una sessione locale. L’esportazione trasferisce la configurazione, non cookie o sessioni: accedi separatamente su ogni Mac."
      },
      {
        question: "Cosa succede se chiudo la finestra?",
        answer: "Paguro resta nella barra dei menu. I servizi possono continuare a funzionare e mostrare notifiche. Comando-Q chiude l’app e interrompe ogni attività."
      }
    ],
    releaseTitle: "Fai come se fossi a casa tua.",
    releaseBody: "Gratuito e open source. Fatto per il tuo Mac.",
    releaseStatus: "La prima versione pubblica è in arrivo.",
    contact: "Fai una domanda",
    source: "Vedi su GitHub",
    credits: "Un fork gratuito e open source di Chorus, creato da Nico Jan.",
    requirements: "macOS 15 o successivo · Apple silicon e Intel",
    requirementsQuestion: "Quali Mac sono supportati?",
    story: {
      title: "Lavoro. Vita. Tutto il resto.",
      body: "Dai a ogni parte della giornata il suo spazio. Mantieni tutti gli account connessi, ciascuno con una sessione separata.",
      services: "Volti familiari. Tutti benvenuti.",
      serviceNote: "Scegli dal catalogo, oppure aggiungi un sito tutto tuo.",
      features: [
        {
          title: "Un posto per ogni account.",
          body: "Gmail di lavoro. Gmail personale. Tienili entrambi aperti senza entrare e uscire dagli account. Raggruppa i servizi come preferisci."
        },
        {
          title: "Ti allontani? Chiudi la porta.",
          body: "Blocca Paguro con Touch ID o la password del Mac. Servizi e nuove notifiche restano nascosti fino al tuo ritorno."
        },
        {
          title: "Nuovo Mac. Stessa casa.",
          body: "Porta con te spazi, servizi e preferenze. Esporta la configurazione e importala su un altro Mac; lì accedi di nuovo ai servizi."
        }
      ],
      trademarks: "Nomi e loghi dei servizi appartengono ai rispettivi proprietari."
    }
  },

  appPage: {
    download: "Scarica per macOS",
    requirements:
      "Richiede macOS {version} o successivo. Gratis e open source.",
    viewSource: "Guarda il codice su GitHub",
    back: "Tutte le app",
    featuresHeading: "Cosa fa",
  },
  contact: {
    issues: "Trovato un bug? Apri una issue su GitHub.",
    issuesLink: "Apri una issue su GitHub",
    email: "Per tutto il resto: {email}.",
  },
  footer: {
    rights: "Gratis e open source, per sempre.",
  },
};
