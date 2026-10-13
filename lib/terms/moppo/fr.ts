import type { MoppoTerms } from "../moppo-terms";

export const terms: MoppoTerms = {
  title: "Conditions d’utilisation de Moppo",
  description: "Conditions d’utilisation de Moppo, l’app gratuite et open source de nettoyage du Mac. Licence MIT, nettoyage, restauration, garantie et données.",
  sections: {
    software: {
      heading: "Le logiciel",
      paragraph: ["Moppo est un logiciel gratuit et open source d’Anguria Studio, distribué sous ", { kind: "license", text: "licence MIT" }, ". La licence complète figure dans le dépôt GitHub et régit l’utilisation, la copie et la modification du code."],
    },
    cleanup: {
      heading: "Nettoyage et restauration",
      paragraph: ["Examinez les éléments sélectionnés pour suppression et conservez des sauvegardes de vos données importantes. Le nettoyage ordinaire des fichiers déplace les éléments dans la Corbeille. Put Back nécessite un reçu de suppression enregistré et la présence de l’élément dans la Corbeille ; cette fonction ne peut pas restaurer les paquets désinstallés par Homebrew ni les images Docker. Vider la Corbeille efface définitivement son contenu. La suppression de photos passe par Photos et peut affecter d’autres appareils via Photos iCloud ; la restauration se gère dans Photos. Les tailles de nettoyage affichées sont des estimations et ne garantissent pas l’espace qui sera récupéré."],
    },
    warranty: {
      heading: "Absence de garantie",
      paragraph: ["Moppo est fourni « en l’état », sans garantie d’aucune sorte. Les exclusions de garantie et limitations de responsabilité de la licence MIT s’appliquent. Les vérifications de nettoyage et les fonctions de restauration ne garantissent pas l’absence de perte de données."],
    },
    "third-party": {
      heading: "Services externes",
      paragraph: ["Les fonctions utilisant Photos, iCloud, Homebrew, Docker ou le service de mises à jour sont soumises aux conditions et réglages propres à ces services. Moppo n’est ni affilié à ces fournisseurs ni approuvé par eux."],
    },
    data: {
      heading: "Vos données",
      paragraph: ["Moppo n’a pas de service de comptes ni de télémétrie de l’app. Les données d’analyse, réglages et historiques de nettoyage restent sur votre Mac. Les vérifications facultatives des mises à jour et les services externes peuvent effectuer des requêtes réseau. Consultez notre ", { kind: "privacy", text: "Politique de confidentialité" }, " pour les détails."],
    },
    changes: {
      heading: "Modifications",
      paragraph: ["Nous pouvons mettre à jour ces conditions ; les modifications sont publiées sur cette page."],
    },
    contact: {
      heading: "Contact",
      paragraph: ["Questions : ", { kind: "email" }],
    },
  },
};
