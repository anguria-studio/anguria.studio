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
      category: "Espace pour apps web",
      shotAlt: "La fenêtre de Paguro sur un bureau Mac, avec les applis web regroupées dans une barre latérale.",
      tagline: "Un espace natif pour vos apps web",
      description: "Réunissez messages, courrier et outils web du quotidien dans un espace natif pour Mac.",
      features: [
        {
          title: "Espaces de travail",
          body: "Organisez vos services professionnels et personnels dans une seule fenêtre."
        },
        {
          title: "Comptes séparés",
          body: "Chaque compte conserve sa propre session de connexion sur votre Mac."
        },
        {
          title: "Notifications",
          body: "Choisissez les notifications de macOS ou l’îlot de notifications facultatif."
        }
      ]
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
  paguroHero: {
    previewTheme: "Apparence de l’aperçu",
    previewLight: "Aperçu clair",
    previewDark: "Aperçu sombre",

    title: "Offrez à vos apps",
    accent: "un chez-soi.",
    intro: "Un espace natif pour vos apps web.",
    eyebrow: "Paguro pour macOS",
    tryLabel: "Allez, envoyez-vous quelque chose.",
    tryHint: "Choisissez une app. Regardez l’encoche.",
    demoLabel: "Essai des notifications",
    open: "Ouvrir les notifications",
    collapse: "Réduire les notifications",
    clear: "Tout effacer",
    dismiss: "Fermer la notification",
    empty: "Tout est à jour.",
    emptyHint: "Un petit moment de tranquillité.",
    now: "maintenant",
    notificationCount: "{count} notifications",
    sent: "Nouvelle notification {service} : {message}",
    cleared: "Toutes les notifications ont été effacées.",
    removed: "Notification fermée.",
    sidebar: "De la place pour organiser",
    compact: "De la place pour se concentrer",
    layoutLabel: "Comparer les dispositions",
    captureAlt: "Paguro avec les espaces Personal et Work et ChatGPT ouvert, sans connexion.",
    compactAlt: "Paguro avec sa barre de services compacte et ChatGPT ouvert, sans connexion.",
    captureNote: "Une seule app. Un peu plus de place pour tout.",
    demoNote: "Envoyez-en quelques-unes. Survolez l’encoche pour toutes les voir.",
    slackTitle: "Studio",
    slackMessage: "Les maquettes sont prêtes.",
    whatsappTitle: "La bande du dîner",
    whatsappMessage: "Pizza à vingt heures ?",
    gmailTitle: "Une petite escapade",
    gmailMessage: "Vos projets du week-end sont arrivés.",
    back: "Toutes les apps"
  },
  paguroPage: {
    nav: "Découvrir Paguro",
    faqLabel: "Questions",
    get: "Obtenir Paguro",
    faqTitle: "Quelques réponses utiles.",
    faq: [
      {
        question: "Paguro est-il vraiment gratuit ?",
        answer: "Oui. Paguro est gratuit et open source, sans fonctions payantes. Les sites utilisés peuvent demander leurs propres comptes ou abonnements."
      },
      {
        question: "Quels services puis-je utiliser ?",
        answer: "Choisissez dans le catalogue ou ajoutez une URL. La plupart des services fonctionnent comme dans un navigateur, mais certains limitent les navigateurs intégrés. Les clés d’accès ne sont pas encore prises en charge : utilisez une autre méthode disponible."
      },
      {
        question: "Faut-il un Mac avec encoche ?",
        answer: "Non. Espaces, services et notifications macOS fonctionnent sans encoche. L’îlot est une option pour les écrans compatibles avec encoche."
      },
      {
        question: "Les connexions sont-elles synchronisées ?",
        answer: "Non. Chaque compte a sa session locale. L’export transfère la configuration, sans cookies ni sessions : connectez-vous sur chaque Mac."
      },
      {
        question: "Que se passe-t-il si je ferme la fenêtre ?",
        answer: "Paguro reste dans la barre des menus. Les services peuvent continuer à fonctionner et à envoyer des notifications. Commande-Q quitte l’app et arrête son activité."
      }
    ],
    releaseTitle: "Faites comme chez vous.",
    releaseBody: "Gratuit et open source. Pour votre Mac.",
    releaseStatus: "La première version publique arrive bientôt.",
    contact: "Poser une question",
    source: "Voir sur GitHub",
    credits: "Un fork gratuit et open source de Chorus, créé par Nico Jan.",
    requirements: "macOS 15 ou ultérieur · Apple silicon et Intel",
    requirementsQuestion: "Quels Mac sont compatibles ?",
    story: {
      title: "Travail. Vie perso. Et tout le reste.",
      body: "Offrez à chaque partie de votre journée son propre espace. Gardez tous vos comptes connectés, chacun avec sa propre session.",
      services: "Des visages familiers. Tous bienvenus.",
      serviceNote: "Choisissez dans le catalogue, ou ajoutez le site de votre choix.",
      features: [
        {
          title: "Une place pour chaque compte.",
          body: "Gmail pro. Gmail perso. Gardez les deux ouverts sans vous déconnecter. Regroupez vos services dans des espaces qui vous ressemblent."
        },
        {
          title: "Vous partez ? Fermez la porte.",
          body: "Verrouillez Paguro avec Touch ID ou le mot de passe du Mac. Vos services et nouvelles notifications restent masqués jusqu’à votre retour."
        },
        {
          title: "Nouveau Mac. Même chez-soi.",
          body: "Emportez vos espaces, services et préférences. Exportez votre configuration vers un autre Mac, puis reconnectez-vous à vos services."
        }
      ],
      trademarks: "Les noms et logos des services appartiennent à leurs propriétaires respectifs."
    }
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
