import type { OboloPrivacyPolicy } from "../obolo-policy";

export const policy: OboloPrivacyPolicy = {
  title: "Politique de confidentialité d’Obolo",
  description: "Comment Obolo conserve vos données d’abonnement, utilise la synchronisation facultative avec iCloud et le calendrier, et récupère les logos, les taux de change et les mises à jour.",
  intro: [
    "Obolo est une app d’Anguria Studio qui permet de suivre vos abonnements sur macOS. Votre bibliothèque est créée sur votre Mac. Obolo ne demande aucun compte Obolo et n’envoie ni données d’analyse ni rapports de plantage à Anguria Studio. Anguria Studio n’utilise pas les données d’Obolo à des fins de publicité ou de suivi et ne les vend pas.",
  ],
  sections: {
    "on-your-mac": {
      heading: "Sur votre Mac",
      blocks: [
        "Obolo conserve les abonnements et les catégories que vous saisissez ou importez, ainsi que les prix, les dates de renouvellement, les notes, les liens et les libellés des moyens de paiement. L’app conserve également les images des logos, les taux de change et les préférences. Elle suit les informations que vous saisissez sans se connecter à des comptes de paiement ni traiter de paiements.",
        { kind: "p", runs: [
          "Obolo programme des notifications de renouvellement sur votre Mac. Elles peuvent afficher le nom de l’abonnement et son montant. Lorsque vous exécutez ",
          { kind: "strong", text: "Show Next Renewal" },
          " dans Raccourcis, Obolo transmet à votre raccourci le nom de l’abonnement, la date de renouvellement et le montant.",
        ] },
        { kind: "p", runs: [
          "Activez ",
          { kind: "strong", text: "Add payments to a calendar" },
          " dans ",
          { kind: "strong", text: "Settings → Reminders" },
          " pour ajouter les événements de renouvellement au calendrier de votre choix. Obolo demande un accès complet à Calendrier pour pouvoir mettre à jour et supprimer par la suite les événements qu’elle a créés. Ces événements comprennent le nom de l’abonnement, le montant et la devise, les dates, la récurrence, les notes et les alertes que vous avez définies. Votre fournisseur de calendrier et les personnes avec qui vous partagez ce calendrier peuvent voir ces informations même si la synchronisation d’Obolo avec iCloud est désactivée. Utilisez ",
          { kind: "strong", text: "Remove calendar reminders" },
          " dans le même panneau pour supprimer les événements d’Obolo et désactiver la synchronisation avec le calendrier. Vous pouvez également gérer les autorisations de calendrier et de notification dans les Réglages Système de macOS.",
        ] },
        { kind: "p", runs: [
          "Obolo lit les fichiers CSV et les sauvegardes que vous choisissez sur votre Mac. Dans ",
          { kind: "strong", text: "Settings → Data" },
          ", vous pouvez exporter un fichier CSV ou enregistrer une sauvegarde JSON à l’emplacement de votre choix. Les sauvegardes JSON ne contiennent pas les images des logos. Vos exports et sauvegardes sont des copies distinctes que vous pouvez gérer dans le Finder.",
        ] },
      ],
    },
    "icloud-sync": {
      heading: "Synchronisation facultative avec iCloud",
      blocks: [
        { kind: "p", runs: [
          { kind: "strong", text: "Sync with iCloud" },
          " est désactivée au départ sur chaque Mac. Activez-la dans ",
          { kind: "strong", text: "Settings → Data" },
          " pour synchroniser votre bibliothèque entre les Mac qui utilisent le même compte Apple. Avant la première fusion des données, Obolo crée une copie de sauvegarde locale.",
        ] },
        "Obolo utilise CloudKit d’Apple pour conserver les données suivantes dans votre base de données iCloud privée :",
        { kind: "ul", items: [
          "Détails des abonnements, notamment les prix et leur historique, les informations sur les renouvellements et les rappels, les libellés des moyens de paiement, les notes et les liens",
          "Catégories et images des logos d’abonnement, y compris les images que vous choisissez vous-même",
          "Taux de change saisis manuellement, devise de référence et délai de rappel par défaut",
        ] },
        { kind: "p", runs: [
          "Obolo utilise également un identifiant de compte iCloud sur votre Mac pour détecter les changements de compte. La synchronisation d’Obolo avec iCloud ne couvre ni l’apparence, ni les réglages de lancement, ni l’heure des notifications, ni le choix du calendrier, ni les taux de change automatiques, ni les variantes sombres des logos, ni les fichiers de sauvegarde. Anguria Studio ne peut pas consulter les données de votre base privée. Apple gère le stockage iCloud conformément à sa ",
          { kind: "link", text: "politique de confidentialité", href: "https://www.apple.com/legal/privacy/" },
          ".",
        ] },
        { kind: "p", runs: [
          "Lorsque vous désactivez ",
          { kind: "strong", text: "Sync with iCloud" },
          ", Obolo cesse de se synchroniser sur ce Mac. Votre bibliothèque locale et les données déjà présentes dans iCloud sont conservées. Les autres Mac sur lesquels la synchronisation est activée peuvent continuer à se synchroniser. Si vous réactivez la synchronisation, Obolo peut fusionner les données conservées dans iCloud avec votre bibliothèque locale.",
        ] },
      ],
    },
    "network-requests": {
      heading: "Requêtes de logos et de taux de change",
      blocks: [
        { kind: "p", runs: [
          { kind: "strong", text: "Icônes de sites web dans les deux éditions." },
          " Obolo commence par consulter la page d’accueil du domaine indiqué dans le champ Website de l’abonnement. Si ce champ est vide, Obolo utilise le nom d’hôte du lien de gestion. L’app suit les redirections, recherche les liens vers les icônes dans la page et essaie les chemins habituels, tels que ",
          { kind: "code", text: "/favicon.ico" },
          ". Le site peut orienter Obolo vers un autre hôte, par exemple son réseau de diffusion de contenu. Ces hôtes peuvent voir votre adresse IP, l’adresse demandée et les en-têtes standard de la requête. Obolo envoie les requêtes directement depuis votre Mac, sans cookies. Anguria Studio ne reçoit aucune copie de ces requêtes. Obolo lit la page et les fichiers d’icônes sans exécuter les scripts du site.",
        ] },
        { kind: "p", runs: [
          "Obolo peut récupérer un logo lorsque vous enregistrez un abonnement en mode logo, que vous utilisez ",
          { kind: "strong", text: "Fetch logos" },
          " ou que vous laissez ",
          { kind: "strong", text: "Fetch logos after import" },
          " activée. Pour un logo déjà présent ou récemment synchronisé, l’app peut également rechercher une variante sombre sur le site. Un nom d’hôte peut contenir un sous-domaine propre à votre organisation. Les sites qui reçoivent ces requêtes appliquent leurs propres politiques de confidentialité et peuvent conserver des journaux de serveur. Pour éviter les requêtes d’icônes pour un abonnement, laissez vides le champ du site web et le lien de gestion.",
        ] },
        { kind: "p", runs: [
          { kind: "strong", text: "Recherche d’icônes via Google dans l’édition en téléchargement direct." },
          " Si l’icône du site est manquante ou de petite taille, cette édition peut également envoyer à Google le domaine du service et la taille d’icône demandée. Google reçoit les informations de connexion habituelles, dont votre adresse IP. Cette recherche de secours est activée par défaut. Désactivez-la dans ",
          { kind: "strong", text: "Settings → General → Look up missing logos with Google" },
          " pour utiliser uniquement les icônes des sites web. L’édition du Mac App Store effectue la recherche sur les sites web décrite ci-dessus et ne passe pas par Google. ",
          { kind: "link", text: "Politique de confidentialité de Google", href: "https://policies.google.com/privacy" },
        ] },
        { kind: "p", runs: [
          { kind: "strong", text: "Taux de change." },
          " La mise à jour automatique des taux de change est activée par défaut. Lorsqu’Obolo a besoin d’un taux de change, l’app envoie à Frankfurter les codes de la devise de référence et de la devise cible. Le service indique qu’il ne conserve aucun journal des adresses IP ni des URL demandées. Désactivez ",
          { kind: "strong", text: "Update rates automatically" },
          " dans ",
          { kind: "strong", text: "Settings → Currencies" },
          " pour arrêter ces requêtes. Vous pouvez saisir les taux manuellement. ",
          { kind: "link", text: "Informations de Frankfurter sur la confidentialité", href: "https://frankfurter.dev/#faq" },
        ] },
      ],
    },
    "retention-and-deletion": {
      heading: "Conservation et suppression",
      blocks: [
        { kind: "p", runs: [
          "Vous pouvez supprimer des abonnements individuellement dans Obolo. Si la synchronisation avec iCloud est activée, les modifications et suppressions sont synchronisées lorsque votre Mac se connecte. Pour retrouver la bibliothèque locale et les fichiers associés, ",
          { kind: "strong", text: "Settings → Data → Stored at" },
          " affiche leur emplacement dans le Finder. Quittez Obolo avant de supprimer ces données locales. Les sauvegardes de sécurité et les copies que vous avez exportées ou enregistrées séparément restent en place jusqu’à ce que vous les supprimiez.",
        ] },
        { kind: "p", runs: [
          "La suppression de l’app ou la désactivation de la synchronisation laisse la copie iCloud en place. Pour vérifier si macOS permet de supprimer les données iCloud d’Obolo, ouvrez ",
          { kind: "strong", text: "Réglages Système" },
          ", cliquez sur votre nom, puis sur ",
          { kind: "strong", text: "iCloud → Gérer" },
          ". Enregistrez toute copie que vous souhaitez conserver et désactivez la synchronisation sur vos Mac avant de supprimer les données d’iCloud. Apple présente les options dans ",
          { kind: "link", text: "Gérer le stockage iCloud sur Mac", href: "https://support.apple.com/guide/mac-help/manage-icloud-storage-mh36833/mac" },
          ".",
        ] },
      ],
    },
    "contact": {
      heading: "Mises à jour de l’app et contact",
      blocks: [
        { kind: "p", runs: [
          "Apple gère les mises à jour de l’édition du Mac App Store. L’édition en téléchargement direct contacte GitHub pour rechercher et télécharger les mises à jour. GitHub reçoit les informations habituelles liées à la requête, comme l’adresse IP. Vous pouvez désactiver la recherche automatique de mises à jour dans ",
          { kind: "strong", text: "Settings → Updates" },
          ". ",
          { kind: "link", text: "Déclaration de confidentialité de GitHub", href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" },
        ] },
        { kind: "p", runs: [
          "Pour toute demande relative à la confidentialité ou à la suppression de données, écrivez à Anguria Studio à l’adresse ",
          { kind: "email" },
          ". Nous utilisons les informations que vous choisissez de nous envoyer pour traiter votre demande.",
        ] },
      ],
    },
  },
};
