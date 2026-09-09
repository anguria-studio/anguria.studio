import type { Dictionary } from "./en";

/**
 * Traducido de los textos provisionales en inglés. Volver a traducir cuando se
 * resuelvan los `TODO(copy)` de en.ts.
 *
 * Tuteo, como en it.ts — el tono de la marca es informal.
 */
export const dictionary: Dictionary = {
  meta: {
    title: "Anguria Studio — Apps gratuitas y open source para macOS",
    description:
      "Tres pequeñas utilidades gratuitas y open source para tu Mac: Obolo, Scolo y Paguro.",
  },
  nav: {
    home: "Anguria Studio",
    github: "Ver en GitHub",
  },
  themeToggle: {
    label: "Tema",
    system: "Sistema",
    light: "Claro",
    dark: "Oscuro",
  },
  hero: {
    title: "Pequeñas apps para Mac, hechas con cuidado.",
    titleAccent: "cuidado",
    subtitle:
      "Tres utilidades que hacen una sola cosa, no se te ponen por delante y no cuestan nada. Sin cuentas, sin telemetría, sin suscripciones — solo open source.",
  },
  apps: {
    obolo: {
      name: "Obolo",
      category: "Control de suscripciones",
      shotAlt:
        "La ventana de Obolo en el escritorio de un Mac, con un mes de suscripciones y lo que cuestan.",
      tagline: "Control de suscripciones",
      // TODO(copy)
      description:
        "Una forma simple e intuitiva de vigilar tus gastos recurrentes",
      features: [
        // TODO(copy): three real features.
        {
          title: "Nativa",
          body: "Escrita en Swift. Rápida, ligera y amable con la batería.",
        },
        {
          title: "Privada",
          body: "Nada sale de tu Mac. Sin cuentas, sin analíticas, sin llamadas a casa.",
        },
        {
          title: "Open source",
          body: "Cada línea está en GitHub. Léela, haz un fork, mándanos un parche.",
        },
      ],
    },
    scolo: {
      name: "Scolo",
      category: "Limpieza del Mac",
      shotAlt:
        "La ventana de Scolo en el escritorio de un Mac, con el espacio en disco que se puede recuperar.",
      tagline: "Limpieza del Mac",
      description:
        "Elimina archivos sin riesgo. Distingue con claridad lo útil de lo inútil",
      features: [
        // TODO(copy)
        {
          title: "Nativa",
          body: "Escrita en Swift. Rápida, ligera y amable con la batería.",
        },
        {
          title: "Privada",
          body: "Nada sale de tu Mac. Sin cuentas, sin analíticas, sin llamadas a casa.",
        },
        {
          title: "Open source",
          body: "Cada línea está en GitHub. Léela, haz un fork, mándanos un parche.",
        },
      ],
    },
    paguro: {
      name: "Paguro",
      category: "Envoltorio web",
      shotAlt:
        "La ventana de Paguro en el escritorio de un Mac, con las apps web agrupadas en una barra lateral.",
      tagline: "Espacio nativo para tus apps web",
      // TODO(copy)
      description:
        "Tus apps web en un único espacio nativo, cuidado y sin distracciones",
      features: [
        // TODO(copy)
        {
          title: "Nativa",
          body: "Escrita en Swift. Rápida, ligera y amable con la batería.",
        },
        {
          title: "Privada",
          body: "Nada sale de tu Mac. Sin cuentas, sin analíticas, sin llamadas a casa.",
        },
        {
          title: "Open source",
          body: "Cada línea está en GitHub. Léela, haz un fork, mándanos un parche.",
        },
      ],
    },
  },
  home: {
    hero: {
      title: "Apps gratuitas y open source para tu Mac",
      /** Rendered in the accent colour, with the Apple glyph in front of it. */
      titleAccent: "Mac",
    },
    statement: {
      line1: "Tres utilidades que hacen una sola cosa cada una.",
      line2: "Sin suscripciones, sin cuentas, tuyas para siempre.",
      accent: "Sin suscripciones",
    },
    features: {
      swift: "Hechas para macOS",
      glass: "Estética Liquid Glass",
      privacy: "Privadas por defecto",
      custom: "Personalizables",
      speed: "Rápidas",
      source: "Open source",
    },
    /** Accessible name for the Dock-style row of app icons; never shown. */
    dockLabel: "Nuestras apps",
  },
  appPage: {
    download: "Descargar para macOS",
    requirements:
      "Requiere macOS {version} o posterior. Gratis y open source.",
    viewSource: "Ver el código en GitHub",
    back: "Todas las apps",
    featuresHeading: "Qué hace",
  },
  contact: {
    issues: "¿Has encontrado un bug? Abre una issue en GitHub.",
    issuesLink: "Abre una issue en GitHub",
    email: "Para todo lo demás: {email}.",
  },
  footer: {
    rights: "Gratis y open source, para siempre.",
  },
};
