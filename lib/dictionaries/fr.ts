import type { Dictionary } from "./en";

/**
 * Traduit depuis les textes provisoires anglais. À retraduire une fois les
 * `TODO(copy)` de en.ts résolus.
 */
export const dictionary: Dictionary = {
  moppoPage: {
    seoTitle: "Moppo — Nettoyeur Mac gratuit et open source",
    nav: "Découvrir Moppo",
    github: "Voir sur GitHub",
    download: "Télécharger",
    requirements: "macOS {version}+ · Apple silicon et Intel",
    hero: {
      title: "Un Mac bien rangé.",
      accent: "Rien de perdu.",
      body: "Un nettoyeur Mac gratuit et open source pour les caches, les fichiers en double et les résidus d’apps. Vous choisissez ce qui est supprimé.",
      download: "Télécharger pour Mac",
      shotAlt: "La fenêtre de nettoyage de Moppo sur un bureau Mac, avec les catégories des éléments à supprimer et à vérifier.",
      shotsLabel: "Écrans de l’app",
      shots: {
        cleanup: { label: "Nettoyage", alt: "La fenêtre de nettoyage de Moppo, qui classe outils d’IA, caches système, caches des gestionnaires de paquets et données Xcode en groupes sélectionnables." },
        storage: { label: "Explorateur de stockage", alt: "L’explorateur de stockage de Moppo, qui affiche les dossiers du dossier personnel sous forme de carte selon leur taille." },
        uninstaller: { label: "Désinstallation", alt: "L’outil de désinstallation de Moppo, avec les apps installées en grille et la taille de chacune." },
        duplicates: { label: "Doublons", alt: "La vue des doublons de Moppo, qui regroupe les photos identiques et garde l’original pendant que les copies sont sélectionnées." },
        dashboard: { label: "Tableau de bord", alt: "Le tableau de bord de Moppo, avec l’utilisation du disque par catégorie et les changements récents de stockage." },
      },
    },
    story: {
      title: "Libérez de l’espace. Décidez quoi supprimer.",
      body: "Moppo repère ce qui prend de la place et vous indique ce qui peut être supprimé sans risque. Vous choisissez, avec la possibilité de remettre les fichiers en place.",
      features: [
        { title: "À supprimer, ou à vérifier.", body: "Chaque élément est classé selon ce que Moppo peut suggérer et ce qui mérite un regard : documents, worktrees avec des modifications locales, apps encore utilisées." },
        { title: "Les fichiers vont à la Corbeille.", body: "Les fichiers supprimés vont à la Corbeille, avec une trace dans l’historique. Vous changez d’avis ? Restaurez-les tant qu’ils y sont encore." },
        { title: "Des doublons, vérifiés.", body: "Les fichiers sont comparés par leur contenu, pas seulement leur nom. Examinez les photos identiques ou similaires, puis choisissez la copie à conserver." },
        { title: "Sans compte. Sans télémétrie.", body: "Vos analyses restent sur votre Mac. Aucune connexion, aucun suivi, aucun envoi de vos fichiers. Le code est sur GitHub pour le vérifier." },
      ],
    },
    review: {
      title: "Sait ce qu’il ne faut pas toucher.",
      body: "Les worktrees Git avec des modifications non commitées, les fichiers utilisés par des apps en cours d’exécution et vos documents personnels méritent un examen attentif. Moppo les signale pour vérification avant toute suppression.",
      shotAlt: "Le dialogue de vérification des worktrees de Moppo signale les fichiers locaux et vérifie les modifications, les commits non envoyés, les verrous Git et les worktrees utilisés.",
      points: [
        { title: "Comprend Git.", body: "Les worktrees avec des modifications non commitées, des commits non envoyés ou des fichiers locaux ignorés sont signalés pour vérification." },
        { title: "En cours d’utilisation ? On attend.", body: "Les fichiers et worktrees utilisés par une app ou un processus actif sont signalés, pour que vous puissiez d’abord le quitter." },
        { title: "Un historique complet.", body: "Vérifiez ce qui a été supprimé, quand et la taille enregistrée. Remettez les fichiers éligibles en place depuis le même endroit." },
      ],
    },
    tools: {
      title: "Quatre outils. Une seule app.",
      items: [
        { title: "Nettoyage", body: "Caches, journaux, résidus" },
        { title: "Explorateur de stockage", body: "Ce qui remplit votre disque" },
        { title: "Désinstallation", body: "Les apps et leurs résidus" },
        { title: "Doublons", body: "Fichiers et photos en double" },
      ],
    },
    faqTitle: "Quelques détails à connaître.",
    faq: [
      { id: "pricing", question: "Moppo est vraiment gratuit ?", answer: "Oui. Moppo est gratuit et open source sous licence MIT. Aucun abonnement, aucune fonction payante et aucun compte obligatoire." },
      { id: "automatic-removal", question: "Moppo supprime des fichiers tout seul ?", answer: "Non. Les analyses programmées peuvent trouver des éléments à examiner, mais vous choisissez ce qui est supprimé. La catégorie sûre à supprimer est une suggestion, pas une autorisation de nettoyage automatique. Vider la Corbeille est une action séparée qui demande confirmation." },
      { id: "undo", question: "Peut-on annuler un nettoyage ?", answer: "Utilisez la restauration dans l’historique pour récupérer les fichiers éligibles tant qu’ils sont encore dans la Corbeille. Une fois celle-ci vidée, Moppo ne peut plus les restaurer. Les paquets supprimés par Homebrew et les images Docker font exception : leurs outils de suppression ne permettent pas la restauration." },
      { id: "full-disk-access", question: "Pourquoi demander l’accès complet au disque ?", answer: "macOS protège certains dossiers des apps. L’accès complet au disque permet à Moppo de les examiner pour une analyse plus complète. Vous pouvez continuer avec un accès limité ; Moppo signale ce qu’il ne peut pas lire. Les analyses programmées et les mesures automatiques nécessitent l’accès complet. Vous gérez cette autorisation dans Réglages Système." },
      { id: "app-store", question: "Pourquoi pas sur l’App Store ?", answer: "Le Mac App Store impose la sandbox d’Apple, qui limite l’accès aux fichiers hors du conteneur de l’app. Moppo a besoin d’un accès plus large pour examiner les caches, les résidus d’apps et les dossiers de développement sur votre Mac. Il est donc proposé en téléchargement direct." },
      { id: "privacy", question: "Est-ce que Moppo collecte des données ?", answer: "Moppo ne collecte pas de télémétrie et n’envoie pas les fichiers, chemins ou photos analysés. Réglages, mesures et historique restent sur votre Mac. Les vérifications facultatives des mises à jour contactent le serveur. Les fonctions utilisant Photos, iCloud ou Homebrew suivent les réglages de ces services." },
      { id: "system-requirements", question: "Quels Mac sont compatibles ?", answer: "Moppo fonctionne sous macOS 15 ou version ultérieure, sur les Mac Apple silicon et Intel." },
    ],
    also: { label: "Également par Anguria Studio", body: "Un espace natif pour vos apps web." },
    footerNote: "Un nettoyeur Mac gratuit et open source.",
  },
  paguroNotificationTest: {
    download: {
      heading: "Téléchargez un petit exemple.",
      description: "Téléchargez un petit fichier texte pour vérifier que Paguro peut enregistrer les fichiers de vos apps web.",
      action: "Télécharger le fichier d’exemple",
      check: "Dans Paguro, cherchez paguro-download-test.txt dans Téléchargements et dans l’indicateur de téléchargement en haut de l’app. Ouvrez le fichier pour vérifier son contenu. Téléchargez-le à nouveau pour vérifier que la première copie est conservée. D’autres navigateurs peuvent vous demander où l’enregistrer.",
    },
    camera: {
      heading: "Testez votre caméra.",
      description: "Lancez un aperçu en direct, puis autorisez l’accès à la caméra lorsque cela vous est demandé. Il utilise la même autorisation qu’un appel vidéo dans l’une de vos apps web.",
      start: "Tester la caméra",
      stop: "Arrêter la caméra",
      cancel: "Annuler l’aperçu",
      previewLabel: "Aperçu de la caméra en direct",
      noJavaScript: "Activez JavaScript pour tester la caméra.",
      privacy: "L’aperçu reste sur votre appareil. Rien n’est enregistré ni envoyé en ligne, et le microphone n’est pas demandé. Arrêtez la caméra avec le bouton ; elle s’arrête aussi quand vous quittez ou masquez cette page. Revenir à la page ne la redémarre pas.",
      status: {
        idle: "Votre caméra est éteinte. Elle démarre uniquement lorsque vous choisissez Tester la caméra.",
        requesting: "En attente de l’accès à la caméra et de l’aperçu. Vous pouvez annuler pendant l’attente de l’autorisation.",
        active: "L’aperçu est en direct. Choisissez Arrêter la caméra lorsque vous avez terminé.",
        stopped: "Caméra arrêtée. Choisissez Tester la caméra pour lancer un nouvel aperçu.",
        unsupported: "L’accès à la caméra est indisponible ici. Ouvrez cette page en HTTPS ou sur localhost dans un navigateur prenant en charge la caméra.",
        denied: "L’accès à la caméra n’a pas été autorisé. Vérifiez le réglage de caméra de ce service dans Paguro et l’accès à la caméra pour Paguro dans les Réglages Système de macOS, puis réessayez.",
        unavailable: "Aucune caméra n’est disponible ou elle n’a pas pu démarrer. Vérifiez qu’elle est connectée et disponible, puis réessayez.",
        error: "L’aperçu n’a pas pu démarrer. La caméra a été arrêtée. Réessayez.",
      },
    },
    title: "Essayez Paguro.",
    intro: "Envoyez des notifications d’exemple, téléchargez un fichier et testez votre caméra. Découvrez les fonctions de Paguro sans compte.",
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
    scope: "Ces tests utilisent les fonctions standard du navigateur pour les notifications, les téléchargements et l’accès à la caméra. Aucun compte n’est nécessaire. Ils vérifient la gestion de ces fonctions par Paguro, pas la connexion, la livraison des messages ou les appels vidéo d’un service tiers.",
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
      "Deux petits utilitaires gratuits et open source pour votre Mac : Moppo et Paguro.",
  },
  nav: {
    home: "Anguria Studio",
    allApps: "Toutes les apps",
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
    moppo: {
      name: "Moppo",
      category: "Nettoyage du Mac",
      shotAlt:
        "La fenêtre de Moppo sur un bureau Mac, avec l'espace disque récupérable.",
      // TODO(copy): confirm against the shipping feature set.
      tagline: "Évacue ce que votre Mac accumule.",
      // TODO(copy)
      description:
        "Moppo repère les caches, les restes et les téléchargements oubliés qui encombrent votre disque en silence, vous montre exactement ce que c'est, et les évacue en un clic.",
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
      title: "Des apps libres et gratuites pour votre Mac.",
      /** Rendered in the accent colour. */
      titleAccent: "Mac.",
    },
    bento: {
      paguro: "Offrez un chez-soi à vos apps web. Chaque compte connecté, côte à côte, dans une seule fenêtre native.",
      moppo: "Un Mac en ordre, sans rien perdre. Repère ce qui prend de la place et vérifie avant toute suppression.",
      promisesTitle: "Chaque app, les mêmes promesses.",
      studioIntro: "Salut, moi c’est Tommaso, ingénieur logiciel. Je crée les petites apps Mac que j’ai envie d’utiliser. Dites bonjour ou signalez un problème.",
      free: { title: "Gratuit", forever: "pour toujours", body: "sans abonnement, pour toujours", mobileBody: "sans abonnement" },
      private: { title: "Privé", off: "analyses · comptes · suivi", body: "rien ne quitte votre Mac", mobileBody: "tout reste sur votre Mac" },
      native: { title: "Natif", body: "écrit en Swift pour macOS", mobileBody: "écrit en Swift" },
      source: { title: "Open source", body: "lisez chaque ligne sur GitHub", mobileBody: "sur GitHub" },
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
    intro: "Gmail, Slack, WhatsApp et bien d’autres apps dans un espace de travail natif sur Mac. Gardez vos comptes professionnels et personnels côte à côte.",
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
    captureAlt: "Paguro avec les espaces Personal et Work et ChatGPT ouvert.",
    compactAlt: "Paguro avec sa barre de services compacte et ChatGPT ouvert.",
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
    also: { label: "Également par Anguria Studio", body: "Un Mac bien rangé. Vous choisissez quoi supprimer." },
    seoTitle: "Paguro — Espace de travail gratuit pour apps web sur Mac",
    nav: "Découvrir Paguro",
    faqLabel: "Questions",
    appStore: "Télécharger dans l’App Store",
    appStoreMobile: "Voir sur le Mac App Store",
    faqTitle: "Quelques réponses utiles.",
    faq: [
      {
        id: "pricing",
        question: "Paguro est-il vraiment gratuit ?",
        answer: "Oui. Paguro est gratuit et open source, sans fonctions payantes. Les sites utilisés peuvent demander leurs propres comptes ou abonnements."
      },
      {
        id: "supported-services",
        question: "Quels services puis-je utiliser ?",
        answer: "Choisissez dans le catalogue ou ajoutez une URL. La plupart des services fonctionnent comme dans un navigateur, mais certains limitent les navigateurs intégrés. Les clés d’accès ne sont pas encore prises en charge : utilisez une autre méthode disponible."
      },
      {
        id: "notch",
        question: "Faut-il un Mac avec encoche ?",
        answer: "Non. Espaces, services et notifications macOS fonctionnent sans encoche. L’îlot est une option pour les écrans compatibles avec encoche."
      },
      {
        id: "login-sync",
        question: "Les connexions sont-elles synchronisées ?",
        answer: "Non. Chaque compte a sa session locale. L’export transfère la configuration, sans cookies ni sessions : connectez-vous sur chaque Mac."
      },
      {
        id: "hibernation-notifications",
        question: "Les services en veille envoient-ils encore des notifications ?",
        answer: "Les services entièrement mis en veille arrêtent leur activité web en direct. Les nouvelles notifications peuvent donc attendre leur réouverture. Gardez vos messageries et e-mails actifs si vous avez besoin de notifications en temps réel. La mise en veille se règle pour chaque service."
      },
      {
        id: "close-window",
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
    downloadRequirements: "macOS {version}+ · Apple silicon et Intel",
    requirementsQuestion: "Quels Mac sont compatibles ?",
    story: {
      title: "Séparez vos comptes professionnels et personnels.",
      body: "Offrez à chaque partie de votre journée son propre espace. Gardez tous vos comptes connectés, chacun avec sa propre session.",
      services: "Des visages familiers. Tous bienvenus.",
      serviceNote: "Choisissez dans le catalogue, ou ajoutez le site de votre choix.",
      features: [
        {
          title: "Du calme quand il le faut.",
          body: "Coupez les notifications d’une app, d’un espace ou de tous les services. Programmez des heures de tranquillité pour les moments qui demandent votre attention."
        },
        {
          title: "Une place pour chaque compte.",
          body: "Gardez vos comptes pro et perso connectés, chacun avec sa propre session. Regroupez vos apps dans vos espaces de travail."
        },
        {
          title: "Vous partez ? Fermez la porte.",
          body: "Verrouillez Paguro avec Touch ID ou le mot de passe du Mac. Services et notifications restent masqués jusqu’à votre retour."
        },
        {
          title: "Aucun compte en plus. Aucune télémétrie.",
          body: "Vos sessions restent sur votre Mac, sans compte Paguro ni télémétrie de l’app. Le blocage intégré aide à arrêter les requêtes vers les domaines publicitaires et de suivi connus."
        }
      ]
    }
  },

  moppoPrivacy: {
    link: "Politique de confidentialité",
    back: "Retour à Moppo",
    effective: "En vigueur depuis le {date}",
  },
  moppoTerms: {
    link: "Conditions d’utilisation",
    updated: "Dernière mise à jour : {date}",
  },

  paguroPrivacy: {
    link: "Politique de confidentialité",
    read: "Lire la politique de confidentialité de Paguro",
    back: "Retour à Paguro",
    effective: "En vigueur depuis le {date}",
  },

  paguroTerms: {
    link: "Conditions d’utilisation",
    updated: "Dernière mise à jour : {date}",
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
