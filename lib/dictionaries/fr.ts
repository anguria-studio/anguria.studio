import type { Dictionary } from "./en";

/**
 * Traduit depuis les textes provisoires anglais. À retraduire une fois les
 * `TODO(copy)` de en.ts résolus.
 */
export const dictionary: Dictionary = {
  meta: {
    title: "Anguria Studio — Des apps macOS gratuites et open source",
    description:
      "Trois petits utilitaires gratuits et open source pour votre Mac : Obolo, Scolo et Paguro.",
  },
  nav: {
    home: "Anguria Studio",
    github: "Voir sur GitHub",
  },
  themeToggle: {
    label: "Thème",
    system: "Système",
    light: "Clair",
    dark: "Sombre",
  },
  hero: {
    title: "De petites apps Mac, faites avec soin.",
    titleAccent: "soin",
    subtitle:
      "Trois utilitaires qui font une seule chose, se font oublier et ne coûtent rien. Pas de compte, pas de télémétrie, pas d'abonnement — juste de l'open source.",
  },
  apps: {
    obolo: {
      name: "Obolo",
      category: "Suivi des abonnements",
      shotAlt:
        "La fenêtre d'Obolo sur un bureau Mac, avec le récapitulatif mensuel des abonnements.",
      tagline: "Un petit utilitaire pour votre Mac.",
      description:
        "Obolo est une app minimaliste qui vit discrètement dans votre barre de menus.",
      features: [
        // TODO(copy): three real features.
        {
          title: "Native",
          body: "Écrite en Swift. Rapide, légère et douce pour la batterie.",
        },
        {
          title: "Privée",
          body: "Rien ne quitte votre Mac. Pas de compte, pas de statistiques, aucun appel au serveur.",
        },
        {
          title: "Open source",
          body: "Tout le code est sur GitHub. Lisez-le, forkez-le, proposez un patch.",
        },
      ],
    },
    scolo: {
      name: "Scolo",
      category: "Nettoyage du Mac",
      shotAlt:
        "La fenêtre de Scolo sur un bureau Mac, avec l'espace disque récupérable.",
      // TODO(copy): confirm against the shipping feature set.
      tagline: "Évacue ce que votre Mac accumule.",
      // TODO(copy)
      description:
        "Scolo repère les caches, les restes et les téléchargements oubliés qui encombrent votre disque en silence, vous montre exactement ce que c'est, et les évacue en un clic.",
      features: [
        // TODO(copy)
        {
          title: "Native",
          body: "Écrite en Swift. Rapide, légère et douce pour la batterie.",
        },
        {
          title: "Privée",
          body: "Rien ne quitte votre Mac. Pas de compte, pas de statistiques, aucun appel au serveur.",
        },
        {
          title: "Open source",
          body: "Tout le code est sur GitHub. Lisez-le, forkez-le, proposez un patch.",
        },
      ],
    },
    paguro: {
      name: "Paguro",
      category: "Wrapper web",
      shotAlt:
        "La fenêtre de Paguro sur un bureau Mac, avec les applis web regroupées dans une barre latérale.",
      // TODO(copy): confirm against the shipping feature set.
      tagline: "Transforme n'importe quel site en app Mac.",
      // TODO(copy)
      description:
        "Paguro enferme les sites où vous vivez — mail, chat, musique — dans de vraies fenêtres Mac, chacune avec son icône, ses notifications et sa place dans le Dock.",
      features: [
        // TODO(copy)
        {
          title: "Native",
          body: "Écrite en Swift. Rapide, légère et douce pour la batterie.",
        },
        {
          title: "Privée",
          body: "Rien ne quitte votre Mac. Pas de compte, pas de statistiques, aucun appel au serveur.",
        },
        {
          title: "Open source",
          body: "Tout le code est sur GitHub. Lisez-le, forkez-le, proposez un patch.",
        },
      ],
    },
  },
  home: {
    hero: {
      title: "Des apps libres et gratuites pour votre Mac",
      /** Rendered in the accent colour, with the Apple glyph in front of it. */
      titleAccent: "Mac",
    },
    statement: {
      line1: "Trois utilitaires qui font chacun une seule chose.",
      line2: "Sans abonnement, sans compte, à vous pour toujours.",
      accent: "Sans abonnement",
    },
    features: {
      swift: "Conçues pour macOS",
      glass: "Esthétique Liquid Glass",
      privacy: "Privées par défaut",
      custom: "Personnalisables",
      speed: "Performantes",
      source: "Open source",
    },
    /** Accessible name for the Dock-style row of app icons; never shown. */
    dockLabel: "Nos applications",
  },
  appPage: {
    download: "Télécharger pour macOS",
    requirements:
      "Nécessite macOS {version} ou version ultérieure. Gratuit et open source.",
    viewSource: "Voir le code sur GitHub",
    back: "Toutes les apps",
    featuresHeading: "Ce qu'elle fait",
  },
  contact: {
    issues: "Un bug ? Ouvrez une issue sur GitHub.",
    issuesLink: "Ouvrez une issue sur GitHub",
    email: "Pour tout le reste: {email}.",
  },
  footer: {
    rights: "Gratuit et open source, pour toujours.",
  },
};
