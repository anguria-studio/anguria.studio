import type { Dictionary } from "./en";

/**
 * Tradotto dalle stringhe provvisorie inglesi. Da ritradurre quando i
 * `TODO(copy)` in en.ts saranno risolti.
 */
export const dictionary: Dictionary = {
  moppoPage: {
    seoTitle: "Moppo — Pulizia del Mac gratuita e open source",
    nav: "Esplora Moppo",
    github: "Vedi su GitHub",
    download: "Scarica",
    requirements: "macOS {version}+ · Apple silicon e Intel",
    hero: {
      title: "Mac pulito.",
      accent: "Niente di perso.",
      body: "Un’app gratuita e open source per pulire il Mac da cache, file duplicati e residui delle app. Decidi tu cosa rimuovere.",
      download: "Scarica per Mac",
      shotAlt: "La finestra Pulizia di Moppo su un desktop Mac, con le categorie di elementi sicuri da rimuovere e da controllare.",
    },
    story: {
      title: "Libera spazio. Decidi tu cosa eliminare.",
      body: "Moppo trova ciò che occupa spazio e ti indica cosa puoi rimuovere con sicurezza. Decidi tu cosa eliminare, con la possibilità di ripristinare i file.",
      features: [
        { title: "Da rimuovere, o da controllare.", body: "Ogni elemento viene diviso tra ciò che Moppo può suggerire e ciò che merita un controllo: documenti, worktree con modifiche locali, app ancora in uso." },
        { title: "I file vanno nel Cestino.", body: "I file rimossi vanno nel Cestino, con una registrazione nella Cronologia. Hai cambiato idea? Ripristinali finché sono ancora lì." },
        { title: "Doppioni, verificati.", body: "I file vengono confrontati per contenuto, non solo per nome. Controlla le foto identiche e simili, poi scegli quale copia tenere." },
        { title: "Nessun account. Nessuna telemetria.", body: "Le scansioni restano sul tuo Mac. Nessun accesso, nessun tracciamento, nessun caricamento dei tuoi file. Il codice è su GitHub, se vuoi controllare." },
      ],
    },
    review: {
      title: "Sa cosa non toccare.",
      body: "I worktree Git con modifiche non incluse in un commit, i file usati da app in esecuzione e i tuoi documenti personali meritano un controllo. Moppo li segnala per una verifica prima che tu elimini qualcosa.",
      shotAlt: "Il dialogo di controllo dei worktree di Moppo segnala file locali, modifiche non salvate in commit, commit non inviati, blocchi Git e worktree in uso.",
      points: [
        { title: "Conosce Git.", body: "I worktree con modifiche non salvate in commit, commit non inviati o file locali ignorati vengono segnalati per un controllo." },
        { title: "In uso? Non si tocca.", body: "I file e i worktree usati da un’app o un processo attivo vengono segnalati, così puoi prima chiuderli." },
        { title: "Una cronologia completa.", body: "Controlla cosa è stato rimosso, quando e le dimensioni registrate. Ripristina i file idonei dallo stesso posto." },
      ],
    },
    tools: {
      title: "Quattro strumenti. Una sola app.",
      items: [
        { title: "Pulizia", body: "Cache, log, file residui" },
        { title: "Esplora spazio", body: "Cosa occupa il tuo disco" },
        { title: "Disinstalla app", body: "App e ciò che lasciano" },
        { title: "Duplicati", body: "File e foto duplicati" },
      ],
    },
    faqTitle: "Qualche cosa da sapere.",
    faq: [
      { id: "pricing", question: "Moppo è davvero gratis?", answer: "Sì. Moppo è gratuito e open source, con licenza MIT. Nessun abbonamento, funzione a pagamento o account obbligatorio." },
      { id: "automatic-removal", question: "Moppo elimina qualcosa da solo?", answer: "No. Le scansioni programmate possono trovare elementi da controllare, ma decidi tu cosa rimuovere. La categoria sicura da rimuovere è un suggerimento, non un’autorizzazione alla pulizia automatica. Svuotare il Cestino è un’azione separata che richiede conferma." },
      { id: "undo", question: "Posso annullare una pulizia?", answer: "Usa il ripristino nella Cronologia per recuperare i file idonei finché sono ancora nel Cestino. Una volta svuotato il Cestino, Moppo non può più recuperarli. I pacchetti rimossi con Homebrew e le immagini Docker sono eccezioni: i loro strumenti di rimozione non supportano il ripristino." },
      { id: "full-disk-access", question: "Perché Moppo chiede l’accesso completo al disco?", answer: "macOS protegge alcune cartelle dalle app. L’accesso completo al disco permette a Moppo di esaminare queste posizioni per una scansione più completa. Puoi continuare con accesso limitato: Moppo segnala ciò che non può leggere. Le scansioni programmate e le misurazioni automatiche richiedono l’accesso completo. Gestisci il permesso nelle Impostazioni di Sistema." },
      { id: "app-store", question: "Perché non è sull’App Store?", answer: "Il Mac App Store richiede la sandbox di Apple, che limita l’accesso ai file esterni al contenitore dell’app. Moppo ha bisogno di un accesso più ampio per esaminare cache, file residui delle app e cartelle di sviluppo sul Mac, quindi viene distribuito come download diretto." },
      { id: "privacy", question: "Raccoglie dati?", answer: "Moppo non raccoglie telemetria e non carica file, percorsi o foto delle scansioni. Impostazioni, misurazioni e cronologia restano sul Mac. I controlli facoltativi degli aggiornamenti contattano il server; le funzioni che usano Foto, iCloud o Homebrew seguono le impostazioni di quei servizi." },
      { id: "system-requirements", question: "Quali Mac sono supportati?", answer: "Moppo funziona su macOS 15 o successivo, sia su Mac con Apple silicon sia su Mac Intel." },
    ],
    also: { label: "Sempre da Anguria Studio", body: "Una casa nativa per le tue app web." },
    footerNote: "Un’app gratuita e open source per pulire il Mac.",
  },
  paguroNotificationTest: {
    download: {
      heading: "Scarica un piccolo esempio.",
      description: "Scarica un piccolo file di testo per verificare che Paguro possa salvare i file delle tue app web.",
      action: "Scarica il file di esempio",
      check: "In Paguro, cerca paguro-download-test.txt nella cartella Download e nell’indicatore dei download in alto nell’app. Apri il file per verificarne il contenuto. Scaricalo di nuovo per controllare che la prima copia venga conservata. Altri browser potrebbero chiederti dove salvarlo.",
    },
    camera: {
      heading: "Prova la fotocamera.",
      description: "Avvia un’anteprima dal vivo e consenti l’accesso alla fotocamera quando richiesto. Usa lo stesso permesso di una videochiamata in una delle tue app web.",
      start: "Prova la fotocamera",
      stop: "Ferma la fotocamera",
      cancel: "Annulla l’anteprima",
      previewLabel: "Anteprima dal vivo della fotocamera",
      noJavaScript: "Abilita JavaScript per provare la fotocamera.",
      privacy: "L’anteprima resta sul tuo dispositivo. Nulla viene registrato o caricato online e il microfono non viene richiesto. Ferma la fotocamera con il pulsante; si ferma anche quando lasci o nascondi questa pagina. Tornare alla pagina non la riavvia.",
      status: {
        idle: "La fotocamera è spenta. Si avvia solo quando scegli Prova la fotocamera.",
        requesting: "In attesa dell’accesso alla fotocamera e dell’anteprima. Puoi annullare mentre il permesso è in attesa.",
        active: "L’anteprima è attiva. Scegli Ferma la fotocamera quando hai finito.",
        stopped: "Fotocamera fermata. Scegli Prova la fotocamera per avviare una nuova anteprima.",
        unsupported: "L’accesso alla fotocamera non è disponibile. Apri questa pagina tramite HTTPS o su localhost in un browser che supporta la fotocamera.",
        denied: "Accesso alla fotocamera non consentito. Controlla l’impostazione della fotocamera per questo servizio in Paguro e l’accesso alla fotocamera per Paguro nelle Impostazioni di Sistema di macOS, poi riprova.",
        unavailable: "Nessuna fotocamera disponibile o impossibile avviarla. Controlla che sia collegata e disponibile, poi riprova.",
        error: "Impossibile avviare l’anteprima. La fotocamera è stata fermata. Riprova.",
      },
    },
    title: "Prova Paguro.",
    intro: "Invia notifiche di esempio, scarica un file e visualizza l’anteprima della fotocamera. Prova le funzioni di Paguro senza un account.",
    setup: [
      "Consenti le notifiche per Paguro nelle Impostazioni di Sistema di macOS. Mantieni il servizio attivo e non silenziato e disattiva Non disturbare o Full immersion durante la prova.",
      "Scegli una prova qui sotto. Puoi restare qui o passare a un altro servizio o a un’altra app. Lascia Paguro aperto e questa pagina caricata fino alla fine della prova.",
    ],
    sendHeading: "Un piccolo saluto.",
    timing: "La prima notifica viene inviata subito dopo aver concesso il permesso. La sequenza invia sei notifiche diverse, a 3 secondi di distanza.",
    single: "Invia una notifica",
    sequence: "Invia sei notifiche",
    cancel: "Annulla quelle in attesa",
    noJavaScript: "Abilita JavaScript per provare le notifiche.",
    status: {
      idle: "Tutto pronto. Non viene inviato nulla finché non scegli una prova.",
      requesting: "In attesa del permesso per le notifiche…",
      scheduled: "Prova in corso. Ora puoi passare a un altro servizio o a un’altra app.",
      complete: "Tutte le richieste sono state completate. Puoi ripetere la prova.",
      cancelled: "Richieste in attesa annullate. Le notifiche già mostrate restano finché non le elimini.",
      unsupported: "Le notifiche non sono disponibili in questo browser. Apri questa pagina come servizio in Paguro sul Mac.",
      denied: "Il permesso per le notifiche non è stato concesso. Consenti le notifiche nelle impostazioni del browser e riprova. In Paguro, controlla anche le impostazioni delle notifiche di macOS.",
      error: "La pagina non ha potuto completare una richiesta di notifica. Controlla i permessi e riprova.",
    },
    progress: "Richieste {count} notifiche su {total}.",
    history: "Richieste di notifica di questa prova",
    unread: "{count} non lette",
    markRead: "Segna tutte come lette",
    badgeNote: "Il titolo della pagina contiene il conteggio per i badge del servizio e del Dock di Paguro. Abilita i badge per questo servizio. In background, l’aggiornamento può richiedere fino a 30 secondi. Segna tutte come lette azzera il conteggio; eliminare un avviso non segna il messaggio come letto. Ricaricare azzera questa casella di esempio.",
    deliveryNote: "Questo elenco conferma le richieste della pagina, non la consegna da parte di macOS. Le impostazioni di Paguro, Full immersion e il blocco dell’app possono impedire gli avvisi. Annulla ferma le richieste in attesa; anche ricaricare o lasciare questa pagina interrompe la prova.",
    tryHeading: "Due modi per restare aggiornato.",
    checks: [
      { title: "Notifiche di macOS", body: "In Paguro Settings → Notifications, abilita Show macOS notifications e disabilita Show island alerts on notched displays. Abilita le notifiche macOS anche per questo servizio. Avvia la prova con sei notifiche e passa a un’altra app per controllare i banner successivi." },
      { title: "Isola delle notifiche", body: "Su uno schermo compatibile con notch, abilita Show island alerts on notched displays e disabilita Show macOS notifications. Avvia la prova con sei notifiche. Passa il puntatore sull’isola per espanderla, scorri la pila, elimina una scheda e fai clic su una notifica per tornare a questo servizio." },
      { title: "Blocco dell’app", body: "Avvia la prova con sei notifiche e blocca Paguro dopo la prima notifica. Gli avvisi rimanenti dovrebbero essere soppressi durante il blocco. Sblocca esplicitamente per tornare all’app; le notifiche soppresse non vengono riproposte." },
    ],
    scope: "Queste prove usano funzioni standard del browser per notifiche, download e accesso alla fotocamera. Non serve un account. Verificano la gestione di queste funzioni da parte di Paguro, non l’accesso, la consegna dei messaggi o le videochiamate di un servizio di terze parti.",
    samples: [
      { title: "Test Paguro · Un piccolo saluto", body: "La tua prima notifica di esempio. Tutto comincia qui." },
      { title: "Test Paguro · Pausa caffè", body: "Alex: Un caffè tra dieci minuti? Prendo un tavolo." },
      { title: "Test Paguro · Novità sul progetto", body: "Le nuove bozze sono pronte da vedere." },
      { title: "Test Paguro · Programmi del weekend", body: "Sam: Sabato al mare? Porto qualcosa da mangiare." },
      { title: "Test Paguro · Letture", body: "Le proposte della settimana: un po’ di ispirazione." },
      { title: "Test Paguro · Tutto aggiornato", body: "Sei esempi, un solo posto. Prova a scorrerli ed eliminarli." },
    ],
  },
  meta: {
    title: "Anguria Studio — App gratuite e open source per macOS",
    description:
      "Due piccole utility gratuite e open source per il tuo Mac: Moppo e Paguro.",
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
    moppo: {
      name: "Moppo",
      category: "Pulizia del Mac",
      shotAlt:
        "La finestra di Moppo sulla scrivania di un Mac, con lo spazio su disco recuperabile.",
      // TODO(copy): confirm against the shipping feature set.
      tagline: "Butta via quello che il tuo Mac accumula.",
      // TODO(copy)
      description:
        "Moppo trova cache, avanzi e download dimenticati che riempiono il disco in silenzio, ti mostra esattamente cosa sono e li fa scorrere via in un clic.",
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
      title: "App gratuite e open source per il tuo Mac.",
      /** Rendered in the accent colour. */
      titleAccent: "Mac.",
    },
    bento: {
      paguro: "Dai alle tue app web una casa. Ogni account connesso, uno accanto all’altro, in un’unica finestra nativa.",
      moppo: "Un Mac in ordine, senza perdere nulla. Trova cosa occupa spazio e controlla prima di rimuovere qualcosa.",
      promisesTitle: "Ogni app, le stesse promesse.",
      studioIntro: "Ciao, sono Tommaso, un ingegnere software che crea le piccole app per Mac che vorrebbe usare. Scrivimi per un saluto o per segnalare un problema.",
      free: { title: "Gratis", forever: "per sempre", body: "nessun abbonamento, mai", mobileBody: "nessun abbonamento" },
      private: { title: "Private", off: "analisi · account · tracciamento", body: "nulla lascia il tuo Mac", mobileBody: "tutto resta sul Mac" },
      native: { title: "Native", body: "scritte in Swift per macOS", mobileBody: "scritte in Swift" },
      source: { title: "Open source", body: "leggi ogni riga su GitHub", mobileBody: "su GitHub" },
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
    mobileCaptureAlt: "Paguro sulla scrivania del Mac, con Claude aperto e le app web organizzate negli spazi Personal e Work.",
    serviceOverlay: {
      services: "Servizi in anteprima",
      personal: "Personale",
      work: "Lavoro",
      expand: "Espandi la barra laterale",
      collapse: "Comprimi la barra laterale",
      captureAlt: "Paguro con WhatsApp aperto e la finestra traslucida originale sulla scrivania.",
    },
    previewTheme: "Aspetto dell’anteprima",
    previewSystem: "Anteprima di sistema",
    previewLight: "Anteprima chiara",
    previewDark: "Anteprima scura",

    title: "Dai alle tue app",
    accent: "una casa.",
    intro: "Gmail, Slack, WhatsApp e altre app in un unico spazio di lavoro nativo per Mac. Tieni gli account di lavoro e personali fianco a fianco.",
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
    captureAlt: "Paguro con spazi Personal e Work e ChatGPT aperto.",
    compactAlt: "Paguro con barra compatta dei servizi e ChatGPT aperto.",
    samples: {
      slack: [
        { title: "Studio", message: "I design sono pronti." },
        { title: "#general", message: "Caffè di nuovo funzionante. Evviva." },
        { title: "Marta", message: "Puoi dare un’occhiata alla PR?" },
        { title: "#design", message: "Nuove icone su Figma." },
        { title: "Luca", message: "Standup spostato alle 10:15." },
        { title: "#random", message: "Chi ha finito gli snack buoni?" },
        { title: "Studio", message: "Il cliente ha adorato la presentazione." },
        { title: "Giulia", message: "Fix pushato, i test sono verdi." },
        { title: "#releases", message: "La 2.4 è online." },
        { title: "Marta", message: "Pranzo?" },
        { title: "#design", message: "Domani esce la nuova palette." },
        { title: "Luca", message: "Grazie della revisione!" },
      ],
      whatsapp: [
        { title: "La compagnia della pizza", message: "Pizza alle otto?" },
        { title: "Mamma", message: "Chiamami quando puoi." },
        { title: "Sara", message: "Arrivo con cinque minuti di ritardo." },
        { title: "La compagnia della pizza", message: "Porto io il dolce." },
        { title: "Andrea", message: "Hai visto la partita ieri sera?" },
        { title: "Famiglia", message: "Domenica pranzo dalla nonna." },
        { title: "Sara", message: "Ti ho mandato le foto." },
        { title: "Gruppo trekking", message: "Sabato si fa sempre?" },
        { title: "Andrea", message: "Atterrato, tutto bene!" },
        { title: "Mamma", message: "Non dimenticare l’ombrello." },
        { title: "La compagnia della pizza", message: "Tavolo prenotato." },
        { title: "Sara", message: "Buon compleanno!" },
      ],
      gmail: [
        { title: "Una piccola fuga", message: "I programmi per il weekend sono arrivati." },
        { title: "La tua libreria", message: "Il tuo ordine è in viaggio." },
        { title: "Domenica lenta", message: "Cinque idee per rallentare." },
        { title: "La tua banca", message: "L’estratto conto è pronto." },
        { title: "Biglietti concerto", message: "Porte aperte alle 19." },
        { title: "Una piccola fuga", message: "Domani apre il check-in." },
        { title: "La biblioteca", message: "Il tuo libro ti aspetta." },
        { title: "Ricette della settimana", message: "Stasera pasta al limone." },
        { title: "Calendario del team", message: "Invito: design review." },
        { title: "La tua libreria", message: "Nuovo titolo di un autore che segui." },
        { title: "Meteo", message: "Weekend di sole in arrivo." },
        { title: "Una piccola fuga", message: "Bagaglio leggero. Là fa caldo." },
      ],
    },
  },
  paguroPage: {
    seoTitle: "Paguro — Spazio di lavoro gratuito per app web su Mac",
    nav: "Esplora Paguro",
    faqLabel: "Domande",
    appStore: "Scarica su App Store",
    appStoreMobile: "Vedi sul Mac App Store",
    faqTitle: "Qualche cosa da sapere.",
    faq: [
      {
        id: "pricing",
        question: "Paguro è davvero gratuito?",
        answer: "Sì. Paguro è gratuito e open source, senza funzioni a pagamento. I siti che usi possono richiedere account o abbonamenti propri."
      },
      {
        id: "supported-services",
        question: "Quali servizi posso usare?",
        answer: "Scegli dal catalogo o aggiungi un sito tramite URL. La maggior parte funziona come in un browser, ma alcuni fornitori limitano i browser integrati. Le passkey non sono ancora supportate: usa un altro metodo di accesso, se disponibile."
      },
      {
        id: "notch",
        question: "Serve un Mac con il notch?",
        answer: "No. Spazi di lavoro, servizi e notifiche di macOS funzionano anche senza. L’isola è una funzione opzionale per gli schermi compatibili con notch."
      },
      {
        id: "login-sync",
        question: "Sincronizza gli accessi tra Mac?",
        answer: "No. Ogni account ha una sessione locale. L’esportazione trasferisce la configurazione, non cookie o sessioni: accedi separatamente su ogni Mac."
      },
      {
        id: "hibernation-notifications",
        question: "I servizi ibernati inviano ancora notifiche?",
        answer: "I servizi completamente ibernati interrompono l’attività web in tempo reale, quindi le nuove notifiche potrebbero non arrivare finché non li riapri. Tieni attivi messaggistica ed email se ti servono notifiche in tempo reale. Puoi configurare l’ibernazione per ogni servizio."
      },
      {
        id: "close-window",
        question: "Cosa succede se chiudo la finestra?",
        answer: "Paguro resta nella barra dei menu. I servizi possono continuare a funzionare e mostrare notifiche. Comando-Q chiude l’app e interrompe ogni attività."
      }
    ],
    releaseTitle: "Fai come se fossi a casa tua.",
    releaseBody: "Gratuito e open source.",
    releaseStatus: "La prima versione pubblica è in arrivo.",
    contact: "Fai una domanda",
    github: "Vedi su GitHub",
    download: "Scarica l’app",
    credits: "Un fork gratuito e open source di Chorus, creato da Nico Jan.",
    requirements: "macOS 15 o successivo · Apple silicon e Intel",
    downloadRequirements: "macOS {version}+ · Apple silicon e Intel",
    requirementsQuestion: "Quali Mac sono supportati?",
    story: {
      title: "Tieni separati gli account di lavoro e personali.",
      body: "Dai a ogni parte della giornata il suo spazio. Mantieni tutti gli account connessi, ciascuno con una sessione separata.",
      services: "Volti familiari. Tutti benvenuti.",
      serviceNote: "Scegli dal catalogo, oppure aggiungi un sito tutto tuo.",
      features: [
        {
          title: "Silenzio quando serve.",
          body: "Silenzia un’app, uno spazio di lavoro o tutto insieme. Imposta orari silenziosi per i momenti che richiedono la tua attenzione."
        },
        {
          title: "Un posto per ogni account.",
          body: "Tieni connessi gli account personali e di lavoro, ciascuno con la propria sessione. Raggruppa le app nei tuoi spazi di lavoro."
        },
        {
          title: "Ti allontani? Chiudi la porta.",
          body: "Blocca Paguro con Touch ID o la password del Mac. Servizi e notifiche restano nascosti fino al tuo ritorno."
        },
        {
          title: "Nessun account in più. Nessuna telemetria.",
          body: "Le sessioni restano sul Mac, senza account Paguro né telemetria dell’app. Il blocco integrato aiuta a fermare le richieste a domini noti per pubblicità e tracciamento."
        }
      ]
    }
  },

  moppoPrivacy: {
    link: "Informativa sulla privacy",
    back: "Torna a Moppo",
    effective: "In vigore dal {date}",
  },
  moppoTerms: {
    link: "Condizioni d’uso",
    updated: "Ultimo aggiornamento: {date}",
  },

  paguroPrivacy: {
    link: "Informativa sulla privacy",
    read: "Leggi l’informativa sulla privacy di Paguro",
    back: "Torna a Paguro",
    effective: "In vigore dal {date}",
  },

  paguroTerms: {
    link: "Condizioni d’uso",
    updated: "Ultimo aggiornamento: {date}",
  },

  contact: {
    issues: "Trovato un bug? Apri una issue su GitHub.",
    issuesLink: "Apri una issue su GitHub",
    email: "Per tutto il resto: {email}.",
  },
  footer: {
    rights: "Gratis e open source, per sempre.",
    copyright: "© 2026 Anguria Studio",
  },
};
