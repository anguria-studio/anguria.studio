import type { Dictionary } from "./en";

/**
 * Traduit depuis les textes provisoires anglais. À retraduire une fois les
 * `TODO(copy)` de en.ts résolus.
 */
export const dictionary: Dictionary = {
  paguroNotificationTest: {
    title: "Essayez vos notifications.",
    intro: "Envoyez des notifications d’exemple via Paguro. Essayez les bannières macOS ou l’îlot de notifications, sans compte de messagerie.",
    setup: [
      "Autorisez les notifications de Paguro dans les Réglages Système de macOS. Gardez ce service actif et non silencieux, et désactivez Ne pas déranger ou Concentration pendant le test.",
      "Choisissez un test ci-dessous. Vous pouvez rester ici ou passer à un autre service ou une autre app. Laissez Paguro ouvert et cette page chargée jusqu’à la fin du test.",
    ],
    sendHeading: "Un petit bonjour.",
    timing: "La première notification est envoyée dès que l’autorisation est accordée. La séquence envoie six notifications différentes, espacées de 3 secondes.",
    single: "Envoyer une notification",
    sequence: "Envoyer six notifications",
    cancel: "Annuler les demandes en attente",
    noJavaScript: "Activez JavaScript pour tester les notifications.",
    status: {
      idle: "Tout est prêt. Rien n’est envoyé avant de choisir un test.",
      requesting: "En attente de l’autorisation des notifications…",
      scheduled: "Test en cours. Vous pouvez maintenant passer à un autre service ou une autre app.",
      complete: "Toutes les demandes sont terminées. Vous pouvez refaire un test.",
      cancelled: "Demandes en attente annulées. Les notifications déjà affichées restent jusqu’à ce que vous les supprimiez.",
      unsupported: "Les notifications ne sont pas disponibles dans ce navigateur. Ouvrez cette page comme service dans Paguro sur votre Mac.",
      denied: "L’autorisation des notifications n’a pas été accordée. Autorisez-les dans les réglages du navigateur, puis réessayez. Dans Paguro, vérifiez aussi les réglages de notifications de macOS.",
      error: "La page n’a pas pu terminer une demande de notification. Vérifiez les autorisations et réessayez.",
    },
    progress: "{count} notifications demandées sur {total}.",
    history: "Demandes de notification de ce test",
    unread: "{count} non lues",
    markRead: "Tout marquer comme lu",
    badgeNote: "Le titre de la page contient le compteur pour les pastilles du service et du Dock de Paguro. Activez les pastilles de ce service. En arrière-plan, la mise à jour peut prendre jusqu’à 30 secondes. Tout marquer comme lu remet le compteur à zéro ; supprimer une alerte ne marque pas son message comme lu. Recharger réinitialise cette boîte de réception d’exemple.",
    deliveryNote: "Cette liste confirme les demandes de la page, pas leur affichage par macOS. Les réglages de Paguro, Concentration et le verrouillage de l’app peuvent bloquer les alertes. Annuler arrête les demandes en attente ; recharger ou quitter cette page arrête aussi le test.",
    tryHeading: "Deux façons de rester au courant.",
    checks: [
      { title: "Notifications macOS", body: "Dans Paguro Settings → Notifications, activez Show macOS notifications et désactivez Show island alerts on notched displays. Activez aussi les notifications macOS pour ce service. Lancez le test de six notifications et passez à une autre app pour vérifier les bannières suivantes." },
      { title: "Îlot de notifications", body: "Sur un écran compatible avec encoche, activez Show island alerts on notched displays et désactivez Show macOS notifications. Lancez le test de six notifications. Survolez l’îlot pour le développer, faites défiler la pile, supprimez une carte et cliquez sur une notification pour revenir à ce service." },
      { title: "Verrouillage de l’app", body: "Lancez le test de six notifications, puis verrouillez Paguro après la première notification. Les alertes restantes devraient être bloquées pendant le verrouillage. Déverrouillez explicitement pour revenir à l’app ; les notifications bloquées ne sont pas rejouées." },
    ],
    scope: "Ces messages d’exemple sont créés par cette page avec l’API web standard Notification. Aucun compte, expéditeur ou service de messagerie n’est nécessaire. Le test vérifie la gestion des notifications, pas la connexion ni la livraison des messages d’un service tiers.",
    samples: [
      { title: "Test Paguro · Un petit bonjour", body: "Votre première notification d’exemple. Tout commence ici." },
      { title: "Test Paguro · Pause café", body: "Alex : Un café dans dix minutes ? Je prends une table." },
      { title: "Test Paguro · Avancée du projet", body: "Les nouvelles maquettes sont prêtes à être regardées." },
      { title: "Test Paguro · Le week-end", body: "Sam : Samedi au bord de la mer ? J’apporte de quoi grignoter." },
      { title: "Test Paguro · À lire", body: "La sélection de la semaine : un peu d’inspiration." },
      { title: "Test Paguro · Tout est à jour", body: "Six exemples, un seul endroit. Essayez de les faire défiler et de les supprimer." },
    ],
  },
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
    mobileCaptureAlt: "Paguro sur le bureau du Mac, avec Claude ouvert et les apps web regroupées dans les espaces Personal et Work.",
    serviceOverlay: {
      services: "Services en aperçu",
      personal: "Personnel",
      work: "Travail",
      expand: "Développer la barre latérale",
      collapse: "Réduire la barre latérale",
      captureAlt: "Paguro avec WhatsApp ouvert et sa fenêtre translucide originale sur le bureau.",
    },
    previewTheme: "Apparence de l’aperçu",
    previewSystem: "Aperçu système",
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
    samples: {
      slack: [
        { title: "Studio", message: "Les maquettes sont prêtes." },
        { title: "#general", message: "La machine à café remarche. Enfin." },
        { title: "Marta", message: "Tu peux relire la PR ?" },
        { title: "#design", message: "Nouvelles icônes sur Figma." },
        { title: "Luca", message: "Le point passe à 10 h 15." },
        { title: "#random", message: "Qui a pris les bons biscuits ?" },
        { title: "Studio", message: "Le client a adoré la présentation." },
        { title: "Giulia", message: "Correctif poussé, tests au vert." },
        { title: "#releases", message: "La 2.4 est en ligne." },
        { title: "Marta", message: "On déjeune ?" },
        { title: "#design", message: "La nouvelle palette sort demain." },
        { title: "Luca", message: "Merci pour la relecture !" },
      ],
      whatsapp: [
        { title: "La bande du dîner", message: "Pizza à vingt heures ?" },
        { title: "Maman", message: "Rappelle-moi quand tu peux." },
        { title: "Sara", message: "J’ai cinq minutes de retard." },
        { title: "La bande du dîner", message: "J’apporte le dessert." },
        { title: "Andrea", message: "Tu as vu le match hier soir ?" },
        { title: "Famille", message: "Dimanche, déjeuner chez mamie." },
        { title: "Sara", message: "Je t’ai envoyé les photos." },
        { title: "Groupe rando", message: "On maintient samedi ?" },
        { title: "Andrea", message: "Bien arrivé !" },
        { title: "Maman", message: "N’oublie pas ton parapluie." },
        { title: "La bande du dîner", message: "La table est réservée." },
        { title: "Sara", message: "Joyeux anniversaire !" },
      ],
      gmail: [
        { title: "Une petite escapade", message: "Vos projets du week-end sont arrivés." },
        { title: "Votre librairie", message: "Votre commande est expédiée." },
        { title: "Dimanche lent", message: "Cinq idées pour ralentir." },
        { title: "Votre banque", message: "Votre relevé est disponible." },
        { title: "Billets de concert", message: "Ouverture des portes à 19 h." },
        { title: "Une petite escapade", message: "L’enregistrement ouvre demain." },
        { title: "La bibliothèque", message: "Votre réservation vous attend." },
        { title: "Recettes de la semaine", message: "Pâtes au citron ce soir." },
        { title: "Agenda de l’équipe", message: "Invitation : revue de design." },
        { title: "Votre librairie", message: "Une nouveauté d’un auteur suivi." },
        { title: "Météo", message: "Un week-end ensoleillé." },
        { title: "Une petite escapade", message: "Voyagez léger. Il fait chaud." },
      ],
    },
  },
  paguroPage: {
    seoTitle: "Paguro — Espace de travail gratuit pour apps web sur Mac",
    nav: "Découvrir Paguro",
    faqLabel: "Questions",
    appStore: "Télécharger dans l’App Store",
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
        question: "Les services en veille envoient-ils encore des notifications ?",
        answer: "Les services entièrement mis en veille arrêtent leur activité web en direct. Les nouvelles notifications peuvent donc attendre leur réouverture. Gardez vos messageries et e-mails actifs si vous avez besoin de notifications en temps réel. La mise en veille se règle pour chaque service."
      },
      {
        question: "Que se passe-t-il si je ferme la fenêtre ?",
        answer: "Paguro reste dans la barre des menus. Les services peuvent continuer à fonctionner et à envoyer des notifications. Commande-Q quitte l’app et arrête son activité."
      }
    ],
    releaseTitle: "Faites comme chez vous.",
    releaseBody: "Gratuit et open source.",
    releaseStatus: "La première version publique arrive bientôt.",
    contact: "Poser une question",
    github: "Voir sur GitHub",
    download: "Télécharger l’app",
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
          title: "Aucun compte en plus. Aucune télémétrie.",
          body: "Votre configuration et vos sessions restent sur votre Mac. Aucun compte Paguro, aucune synchronisation cloud ni télémétrie de l’app. Vos services se connectent directement à leurs fournisseurs."
        }
      ]
    }
  },

  paguroPrivacy: {
    link: "Politique de confidentialité",
    read: "Lire la politique de confidentialité de Paguro",
    back: "Retour à Paguro",
    effective: "En vigueur depuis le {date}",
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
    copyright: "© 2026 Anguria Studio",
  },
};
