import type { PaguroTerms } from "../paguro-terms";

export const terms: PaguroTerms = {
  title: "Conditions d’utilisation de Paguro",
  description: "Conditions d’utilisation de Paguro, l’app macOS gratuite et open source d’Anguria Studio. Licence MIT, garantie, services tiers et données.",
  sections: {
    software: {
      heading: "Le logiciel",
      paragraph: [
        "Paguro est un logiciel gratuit et open source d’Anguria Studio, distribué sous ",
        { kind: "license", text: "licence MIT" },
        ". Le texte complet de la licence figure dans le dépôt GitHub et régit votre utilisation, la copie et la modification du code.",
      ],
    },
    warranty: {
      heading: "Absence de garantie",
      paragraph: ["Paguro est fourni « en l’état », sans garantie d’aucune sorte. Nous ne sommes pas responsables des dommages, pertes de données ou problèmes de compte résultant de son utilisation."],
    },
    "third-party": {
      heading: "Services tiers",
      paragraph: ["Paguro affiche des sites web tels que WhatsApp, Gmail et Slack. Votre utilisation de ces services est régie par leurs propres conditions et politiques de confidentialité, et non par les nôtres. Paguro n’est ni affilié à ces services ni approuvé par eux."],
    },
    data: {
      heading: "Vos données",
      paragraph: [
        "Paguro n’a pas de comptes propres et n’envoie aucune télémétrie de l’app. Les sessions et les réglages restent sur votre Mac. Consultez notre ",
        { kind: "privacy", text: "Politique de confidentialité" },
        " pour plus de détails.",
      ],
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
