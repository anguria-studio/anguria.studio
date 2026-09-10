import type { PaguroPrivacyPolicy } from "../paguro-policy";

/**
 * Traduction de lib/privacy/paguro/en.ts, qui reste le texte de référence.
 * La structure doit rester identique à l’anglais : mêmes sections, même
 * nombre de blocs, même type de bloc à chaque position
 * (tests/paguro-privacy.test.mjs). Texte juridique : chaque négation et
 * chaque réserve (« ne garantit pas », « peut faire l’objet de nouvelles
 * tentatives ») doit survivre à la traduction.
 */
export const policy: PaguroPrivacyPolicy = {
  title: "Politique de confidentialité de Paguro",
  description:
    "Comment Paguro traite vos données. Espaces, sessions et réglages restent sur votre Mac ; aucun compte Paguro, aucune synchronisation cloud ni télémétrie.",
  intro: [
    "Paguro est une app macOS gratuite et open source d’Anguria Studio. Elle réunit des sites web et des services web dans des espaces de travail sur votre Mac. Cette politique décrit l’app Paguro. Les sites que vous ouvrez ont leurs propres politiques de confidentialité.",
  ],
  sections: {
    local: {
      heading: "Données sur votre Mac",
      blocks: [
        "Paguro enregistre localement les noms des espaces de travail, les adresses des services, les libellés de comptes, les préférences et les icônes mises en cache. Chaque compte de service dispose d’un stockage de données WebKit distinct pour les cookies, le stockage des sites web et les données de session. Paguro n’exploite ni service de compte ni service de synchronisation cloud pour ces informations, et n’envoie aucune télémétrie de l’app à Anguria Studio.",
        "Vous vous connectez directement à chaque site web. Paguro ne tient pas sa propre base de données des mots de passe de vos comptes. Les cookies et les jetons de session des sites web peuvent vous garder connecté, c’est pourquoi les données de session locales doivent malgré tout être considérées comme sensibles.",
      ],
    },
    network: {
      heading: "Sites web et requêtes réseau",
      blocks: [
        "Les sites web que vous ouvrez se connectent à leurs fournisseurs. Ces fournisseurs reçoivent des informations réseau, telles que votre adresse IP, ainsi que les informations que vous envoyez ou partagez via leurs services. Ils peuvent utiliser des cookies, des statistiques ou d’autres formes de pistage, selon leurs propres politiques. Les options de blocage de contenu de Paguro ne garantissent pas que tout le pistage est bloqué.",
        "Paguro récupère les icônes des services depuis les sites web et les met en cache sur votre Mac. Ces requêtes peuvent révéler votre adresse IP et l’adresse demandée au site web ou à l’hébergeur de son icône.",
        "La version Mac App Store n’inclut pas la recherche d’icônes Google.",
        "Dans la version en téléchargement direct, une recherche d’icônes Google facultative est désactivée par défaut. Si vous l’activez et que Paguro ne trouve pas d’icône directement, il peut envoyer le nom d’hôte du service au service de favicons de Google. Google reçoit également la requête réseau, y compris votre adresse IP. Paguro filtre les noms d’hôte probablement privés avant de recourir à cette solution de repli ; le filtre ne garantit pas que toute adresse privée puisse être reconnue. Vous pouvez désactiver cette option dans Réglages → Confidentialité.",
      ],
    },
    permissions: {
      heading: "Notifications et autorisations",
      blocks: [
        "Paguro peut lire les signaux de notification d’un service et afficher le texte des notifications dans les notifications macOS ou dans l’îlot facultatif. Paguro n’envoie pas ce texte à Anguria Studio. L’îlot conserve sa liste de notifications en mémoire ; macOS gère les notifications remises au Centre de notifications.",
        "Verrouiller Paguro empêche l’affichage des nouvelles notifications. Cela ne vous déconnecte pas des sites web et n’arrête pas toute l’activité des sites en arrière-plan. Quittez Paguro pour arrêter ses sessions web et l’interrogation des notifications.",
        "L’accès à la caméra et au microphone est utilisé lorsque vous autorisez un site web à utiliser ces appareils. Le site web traite tout média que vous partagez. Paguro utilise l’authentification macOS pour le verrouillage de l’app ; il ne reçoit ni votre empreinte digitale ni le mot de passe de session de votre Mac.",
        "Les fichiers que vous choisissez d’envoyer sont partagés avec le site web sélectionné. Les téléchargements sont enregistrés sur votre Mac. Ces fichiers restent soumis aux pratiques du site web en matière de données.",
      ],
    },
    export: {
      heading: "Export de la configuration et suppression",
      blocks: [
        "L’export de la configuration enregistre les espaces de travail, les services et les préférences transférables dans un fichier de votre choix. Il exclut les sessions de connexion. Un export peut malgré tout contenir des adresses de services privées et des libellés de comptes ; ne le partagez qu’avec les personnes auxquelles vous destinez ces informations. Paguro n’envoie pas ce fichier en ligne à votre place.",
        "La suppression d’un compte de service dans Paguro programme l’effacement de ses données de session WebKit locales. Supprimer seulement un lien vers un espace de travail ne supprime pas un compte encore utilisé ailleurs. Le nettoyage local peut faire l’objet de nouvelles tentatives si WebKit est occupé. Supprimer un compte dans Paguro ne supprime pas votre compte ni les informations détenues par le fournisseur du site web. Utilisez pour cela les commandes du fournisseur.",
        "Les fichiers de configuration exportés, les fichiers téléchargés, les notifications macOS et les sauvegardes système sont distincts du stockage de données des services. Gérez ces copies avec l’app concernée ou les commandes de macOS.",
      ],
    },
    updates: {
      heading: "Mises à jour de l’app",
      blocks: [
        "La version Mac App Store utilise le système de mise à jour d’Apple, n’inclut pas Sparkle et ne contacte pas le flux de mises à jour en téléchargement direct de Paguro.",
        "La version en téléchargement direct utilise Sparkle pour rechercher les mises à jour hébergées sur GitHub. Les recherches de mises à jour et les téléchargements effectuent des requêtes réseau vers GitHub et son infrastructure de distribution. Paguro désactive l’envoi facultatif du profil système par Sparkle. La recherche automatique de mises à jour peut être réglée dans les réglages « À propos » de l’app.",
      ],
    },
    contact: {
      heading: "Contact et modifications",
      blocks: [
        {
          kind: "p",
          runs: [
            "Pour toute question relative à la confidentialité, écrivez à ",
            { kind: "email" },
            ". Si vous nous contactez, vous choisissez les informations à inclure. N’envoyez pas de mots de passe, de jetons de connexion ni de contenu de notification privé. Les rapports d’anomalie publics sur GitHub peuvent être lus par d’autres personnes.",
          ],
        },
        "Nous mettrons à jour cette page lorsque le traitement des données de l’app changera et nous y indiquerons la date d’entrée en vigueur actuelle.",
      ],
    },
  },
};
