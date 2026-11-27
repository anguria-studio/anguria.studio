import type { OboloTerms } from "../obolo-terms";

export const terms: OboloTerms = {
  title: "Conditions d’utilisation d’Obolo",
  description: "Conditions d’utilisation d’Obolo, l’app de suivi des abonnements pour macOS d’Anguria Studio. Licence MIT, estimations, services tiers et données.",
  sections: {
    software: {
      heading: "Licence du logiciel",
      paragraph: [
        "Obolo est un logiciel gratuit et open source d’Anguria Studio. Son code source est disponible sous ",
        { kind: "license", text: "licence MIT" },
        ". La licence précise vos droits d’utiliser, de copier, de modifier et de distribuer le logiciel. Elle définit aussi l’exclusion de garantie et les limites de responsabilité.",
      ],
    },
    tracking: {
      heading: "Suivi des abonnements",
      paragraph: ["Obolo suit les abonnements que vous saisissez ou importez. L’app estime les dépenses et les prochains renouvellements à partir de vos données et des taux de change. Vos fournisseurs d’abonnements gèrent la facturation et les résiliations. Vérifiez les montants réellement facturés, les dates de renouvellement et l’état de vos résiliations auprès de chaque fournisseur."],
    },
    "third-party": {
      heading: "Services externes",
      paragraph: ["Des fonctions comme la synchronisation avec iCloud, l’intégration au calendrier, la recherche de logos et la mise à jour des taux de change peuvent faire appel à des services tiers. Ces services ont leurs propres conditions et politiques de confidentialité."],
    },
    data: {
      heading: "Vos données",
      paragraph: ["Votre bibliothèque d’abonnements est conservée sur votre Mac. Consultez la ", { kind: "privacy", text: "politique de confidentialité" }, " pour en savoir plus sur la synchronisation facultative, les requêtes externes, les sauvegardes et la suppression des données."],
    },
    contact: {
      heading: "Modifications et contact",
      paragraph: ["Nous publions les mises à jour de ces conditions sur cette page. Pour toute question, écrivez à ", { kind: "email" }, "."],
    },
  },
};
