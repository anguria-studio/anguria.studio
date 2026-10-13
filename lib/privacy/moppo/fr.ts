import type { MoppoPrivacyPolicy } from "../moppo-policy";

export const policy: MoppoPrivacyPolicy = {
  title: "Politique de confidentialité de Moppo",
  description: "Comment Moppo traite les fichiers, photos, historiques locaux, autorisations, vérifications facultatives des mises à jour et demandes d’aide.",
  intro: ["Moppo est une app macOS gratuite et open source d’Anguria Studio. Elle vous aide à examiner l’espace disque, les éléments à nettoyer, les doublons et la suppression d’applications. Cette politique concerne l’app Moppo."],
  sections: {
    files: {
      heading: "Fichiers et photos",
      blocks: ["Moppo analyse les fichiers de votre Mac pour trouver des éléments à nettoyer et mesurer l’espace occupé. Elle lit votre photothèque lorsque vous recherchez des photos en double. Les analyses sont locales. Moppo n’envoie pas à Anguria Studio les fichiers analysés, leurs chemins, les photos ou le contenu de la photothèque."],
    },
    local: {
      heading: "Données sur votre Mac",
      blocks: [
        "Moppo conserve les réglages, caches d’analyse, mesures de stockage et reçus de suppression sur votre Mac. Ces reçus peuvent contenir les chemins d’origine et les emplacements dans la Corbeille. Moppo les utilise pour l’Historique et la fonction Put Back.",
        "Moppo n’a pas de service de comptes ni de télémétrie de l’app. Les données locales peuvent contenir des informations privées ; traitez-les comme des données sensibles si vous choisissez de les partager ou de les inclure dans une sauvegarde.",
      ],
    },
    permissions: {
      heading: "Accès aux fichiers et à Photos",
      blocks: ["macOS contrôle l’accès aux fichiers et à votre photothèque. L’Accès complet au disque permet à Moppo d’analyser les dossiers protégés ; vous pouvez continuer avec un accès limité, qui peut laisser certains dossiers illisibles. Les analyses planifiées et les mesures automatiques nécessitent l’Accès complet au disque. Ouvrir la recherche de photos en double demande l’accès à Photos. Vous pouvez gérer ces autorisations dans les Réglages Système de macOS."],
    },
    updates: {
      heading: "Mises à jour facultatives",
      blocks: ["Les vérifications automatiques des mises à jour sont facultatives. Lorsque vous recherchez une mise à jour, Moppo contacte le site des mises à jour via HTTPS. Ce site reçoit votre adresse IP et les informations de connexion habituelles. Sparkle compare la version installée de Moppo au flux de mises à jour. Moppo désactive l’envoi du profil système de Sparkle et demande votre accord avant d’installer une mise à jour."],
    },
    services: {
      heading: "Services externes",
      blocks: [
        "Les requêtes de Photos et d’iCloud utilisent les services Apple et votre compte Apple existant. Si le téléchargement des photos est activé, les analyses et la grille de photos peuvent télécharger les aperçus manquants depuis iCloud ; ouvrir un aperçu peut télécharger l’original. Vous pouvez désactiver ces téléchargements dans Réglages → Avancé. Ce réglage s’applique aux nouvelles requêtes ; les requêtes en cours peuvent se terminer.",
        "La désinstallation via Homebrew utilise les outils Homebrew installés sur votre Mac. Homebrew peut contacter les sources de ses paquets selon ses propres réglages. Si Homebrew a besoin de votre mot de passe, Moppo l’envoie directement à sudo sans l’enregistrer. Ces services gèrent leurs propres requêtes réseau selon leurs propres politiques.",
      ],
    },
    support: {
      heading: "Demandes d’aide",
      blocks: ["Moppo peut préparer un rapport d’assistance contenant les versions de Moppo et de macOS. Le rapport généré ne contient pas de chemins de fichiers, photos, journaux de suppression ou mesures enregistrées. Vous pouvez le relire avant de l’envoyer. Votre fournisseur de messagerie et Anguria Studio reçoivent les informations que vous choisissez d’envoyer. Les signalements publics sur GitHub peuvent être lus par d’autres personnes."],
    },
    contact: {
      heading: "Contact et modifications",
      blocks: [
        { kind: "p", runs: ["Pour toute question sur la confidentialité, contactez ", { kind: "email" }, "."] },
        "Nous mettrons cette page à jour lorsque le traitement des données de l’app changera, en indiquant ici la date d’entrée en vigueur actuelle.",
      ],
    },
  },
};
