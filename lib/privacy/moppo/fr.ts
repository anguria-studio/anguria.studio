import type { MoppoPrivacyPolicy } from "../moppo-policy";

export const policy: MoppoPrivacyPolicy = {
  title: "Politique de confidentialité de Moppo",
  description: "Comment Moppo traite les fichiers, photos, historiques locaux, usages en ligne de commande et par des agents d’IA, autorisations, vérifications facultatives des mises à jour et demandes d’aide.",
  intro: ["Moppo est une app macOS gratuite et open source d’Anguria Studio. Elle vous aide à examiner l’espace disque, les éléments à nettoyer, les doublons et la suppression d’applications. Cette politique concerne l’app Moppo et son outil en ligne de commande moppo."],
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
    cli: {
      heading: "Ligne de commande et agents d’IA",
      blocks: [
        "Vous ou un agent d’IA pouvez utiliser l’outil en ligne de commande moppo pour analyser le stockage, préparer des plans de nettoyage et supprimer les éléments prévus. L’outil enregistre trois types de données dans des dossiers privés sous ~/Library/Application Support/Moppo. Les autorisations de ces dossiers et fichiers limitent leur accès à votre compte utilisateur macOS.",
        {
          kind: "ul",
          items: [
            "Les rapports d’analyse contiennent les noms de fichiers, chemins, mesures, explications d’analyse et vérifications d’identité des fichiers pour la validation des plans. Ils restent dans ~/Library/Application Support/Moppo/cli-scans et expirent après sept jours. Moppo conserve les dix rapports les plus récents et ceux qu’utilisent les plans enregistrés.",
            "Les plans de nettoyage enregistrés contiennent des identifiants. Un plan expire après un jour, ou plus tôt si son rapport d’analyse expire. Moppo conserve au plus vingt plans.",
            "Les enregistrements des résultats de suppression contiennent des identifiants, codes d’état et décomptes, sans noms de fichiers ni chemins. Ils expirent après sept jours. Moppo conserve au plus 100 enregistrements.",
          ],
        },
        "Moppo n’utilise pas les données expirées. Leurs fichiers peuvent rester jusqu’à un nettoyage ultérieur du dossier. Les fichiers non valides et les sauvegardes peuvent rester au-delà de ces limites.",
        { kind: "p", runs: ["La sortie normale des commandes omet les noms de fichiers, chemins et explications détaillées. L’option ", { kind: "nowrap", text: "--include-paths" }, " les ajoute à la sortie d’une seule commande. La sortie réduite contient tout de même des métadonnées de stockage, comme les catégories, tailles et classifications de stockage. L’interface en ligne de commande prise en charge ne renvoie jamais le contenu des fichiers."] },
        { kind: "p", runs: ["Un agent d’IA qui exécute l’outil peut envoyer sa sortie à un fournisseur de modèles externe. Les réglages et politiques propres à ce fournisseur s’appliquent à cette sortie. Moppo ne contrôle pas la conservation, les sauvegardes ou la divulgation ultérieure par le fournisseur. Moppo ne peut pas garantir que l’agent traite la sortie uniquement sur votre Mac. N’utilisez ", { kind: "nowrap", text: "--include-paths" }, " avec un agent que si vous acceptez que son fournisseur reçoive ces noms et chemins."] },
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
