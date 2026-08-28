import type { Dictionary } from "./en";

/**
 * Tradotto dalle stringhe provvisorie inglesi. Da ritradurre quando i
 * `TODO(copy)` in en.ts saranno risolti.
 */
export const dictionary: Dictionary = {
  meta: {
    title: "Anguria Studio — App gratuite e open source per macOS",
    description:
      "Tre piccole utility gratuite e open source per il tuo Mac: Obolo, Scolo e Blatta.",
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
    blatta: {
      name: "Blatta",
      category: "Wrapper web",
      shotAlt:
        "La finestra di Blatta sulla scrivania di un Mac, con le app web raccolte in una barra laterale.",
      // TODO(copy): confirm against the shipping feature set.
      tagline: "Trasforma qualsiasi sito in un'app per Mac.",
      // TODO(copy)
      description:
        "Blatta racchiude i siti in cui vivi — posta, chat, musica — in vere finestre Mac, ognuna con la sua icona, le sue notifiche e il suo posto nel Dock.",
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
