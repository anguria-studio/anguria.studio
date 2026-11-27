import type { OboloCopy } from "./obolo-en";

export const oboloCopy: OboloCopy = {
  name: "Obolo",
  category: "Suivi des abonnements",
  tagline: "Voyez combien vous dépensez chaque mois et quand tombe le prochain paiement.",
  seoTitle: "Obolo — Suivi des abonnements pour macOS",
  description: "Obolo est une app open source pour suivre vos abonnements sur Mac. Consultez vos dépenses mensuelles et annuelles, anticipez les renouvellements et gardez un historique des tarifs.",
  shotAlt: "Le tableau de bord d’Obolo présente des abonnements d’exemple, avec 129,41 € de dépenses mensuelles, le détail par catégorie et 23,40 € restant à payer en août.",
  nav: "Découvrir Obolo",
  privacy: {
    link: "Politique de confidentialité",
    back: "Retour à Obolo",
    effective: "Dernière mise à jour le {date}.",
  },
  terms: {
    link: "Conditions d’utilisation",
    updated: "Dernière mise à jour : {date}",
  },
  download: "Télécharger",
  requirements: "macOS {version}+ · Apple silicon et Intel",
  hero: {
    title: "Abonnements,",
    accent: "suivis et empilés",
    download: "Télécharger pour Mac",
    body: "Obolo est une app simple pour suivre vos abonnements sur Mac, avec des graphiques soignés. Voyez où va votre argent et comment les tarifs évoluent au fil du temps.",
  },
  story: {
    title: "Voyez où va votre argent",
    body: "Comparez vos dépenses récurrentes par mois, par catégorie et par abonnement. La vue mensuelle montre quand les renouvellements annuels font grimper les dépenses.",
  },
  features: [
    { id: "spending", title: "Totaux mensuels et annuels", body: "Voyez combien vous consacrez aux logiciels, au streaming ou à toute autre catégorie. Passez à la vue des abonnements pour connaître la part de chaque service." },
    { id: "calendar", title: "Les renouvellements dans votre calendrier", body: "Choisissez un jour pour voir les paiements prévus, créez un rappel ou ajoutez-les à Calendrier d’Apple. Retrouvez aussi le prochain paiement dans la barre des menus de votre Mac." },
    { id: "history", title: "Un historique des tarifs", body: "Enregistrez chaque changement de tarif à sa date d’entrée en vigueur. L’historique conserve le montant et la devise d’origine de chaque paiement." },
    { id: "currencies", title: "Plusieurs devises, un seul total", body: "Gardez chaque abonnement dans sa devise d’origine et comparez vos dépenses dans la devise de votre choix. Obolo vous signale les taux de change manquants." },
  ],
  faqTitle: "Quelques réponses utiles",
  faq: [
    { id: "availability", question: "Comment installer Obolo ?", answer: "Téléchargez Obolo avec le bouton ci-dessus, ouvrez l’image disque et glissez Obolo dans le dossier Applications. L’app fonctionne sur les Mac Apple silicon et Intel à partir de macOS 15 Sequoia." },
    { id: "open-source", question: "Obolo est-elle open source ?", answer: "Oui. Le code source est disponible sur GitHub sous licence MIT." },
    { id: "data-and-sync", question: "Où Obolo conserve-t-elle les données de mes abonnements ?", answer: "Obolo enregistre votre bibliothèque sur votre Mac. Vous pouvez activer la synchronisation iCloud pour la retrouver sur vos autres Mac. Obolo ne demande aucun compte dédié et ne collecte aucune donnée de télémétrie." },
    { id: "import-export", question: "Puis-je importer mes abonnements existants ?", answer: "Oui. Glissez un fichier CSV dans la fenêtre d’Obolo, puis vérifiez l’aperçu avant de lancer l’importation. Vous pouvez aussi exporter un CSV ou enregistrer une sauvegarde JSON de votre bibliothèque et de vos réglages." },
    { id: "shortcuts", question: "Obolo fonctionne-t-elle avec Raccourcis ?", answer: "Oui. Raccourcis peut afficher le prochain renouvellement, ouvrir la liste des abonnements à renouveler ou ajouter un abonnement." },
  ],
  related: {
    label: "Également par Anguria Studio",
    paguro: "Un espace natif pour vos apps web.",
    moppo: "Une app de nettoyage du Mac conçue pour les développeurs.",
  },
};
