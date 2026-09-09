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
      category: "Espacio para apps web",
      shotAlt: "La ventana de Paguro en el escritorio de un Mac, con las apps web agrupadas en una barra lateral.",
      tagline: "Espacio nativo para tus apps web",
      description: "Reúne mensajes, correo y herramientas web del día a día en un espacio nativo para Mac.",
      features: [
        {
          title: "Espacios de trabajo",
          body: "Organiza tus servicios de trabajo y personales en una sola ventana."
        },
        {
          title: "Cuentas separadas",
          body: "Cada cuenta conserva su propia sesión de inicio en tu Mac."
        },
        {
          title: "Notificaciones",
          body: "Elige las notificaciones de macOS o la isla de notificaciones opcional."
        }
      ]
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
  paguroHero: {
    previewTheme: "Apariencia de la vista previa",
    previewLight: "Vista previa clara",
    previewDark: "Vista previa oscura",

    title: "Dale a tus apps",
    accent: "un hogar.",
    intro: "Un espacio nativo para tus apps web.",
    eyebrow: "Paguro para macOS",
    tryLabel: "Vamos, mándate algo.",
    tryHint: "Elige una app. Mira el notch.",
    demoLabel: "Prueba de notificaciones",
    open: "Abrir notificaciones",
    collapse: "Contraer notificaciones",
    clear: "Borrar todas",
    dismiss: "Descartar notificación",
    empty: "Todo al día.",
    emptyHint: "Un poco de paz y tranquilidad.",
    now: "ahora",
    notificationCount: "{count} notificaciones",
    sent: "Nueva notificación de {service}: {message}",
    cleared: "Todas las notificaciones borradas.",
    removed: "Notificación descartada.",
    sidebar: "Espacio para organizar",
    compact: "Espacio para concentrarte",
    layoutLabel: "Comparar diseños",
    captureAlt: "Paguro con espacios Personal y Work y ChatGPT abierto, sin iniciar sesión.",
    compactAlt: "Paguro con su barra de servicios compacta y ChatGPT abierto, sin iniciar sesión.",
    captureNote: "Una sola app. Un poco más de espacio para todo.",
    demoNote: "Envía unas cuantas. Pasa el cursor por el notch para verlas todas.",
    slackTitle: "Estudio",
    slackMessage: "Los diseños están listos.",
    whatsappTitle: "El grupo de la cena",
    whatsappMessage: "¿Pizza a las ocho?",
    gmailTitle: "Una pequeña escapada",
    gmailMessage: "Tus planes del fin de semana han llegado.",
    back: "Todas las apps"
  },
  paguroPage: {
    nav: "Descubre Paguro",
    faqLabel: "Preguntas",
    get: "Obtener Paguro",
    faqTitle: "Algunas cosas que conviene saber.",
    faq: [
      {
        question: "¿Paguro es realmente gratis?",
        answer: "Sí. Paguro es gratis y de código abierto, sin funciones de pago. Los sitios que utilices pueden requerir sus propias cuentas o suscripciones."
      },
      {
        question: "¿Qué servicios puedo usar?",
        answer: "Elige del catálogo o añade una URL. La mayoría funciona como en un navegador, pero algunos proveedores limitan los navegadores integrados. Las claves de acceso aún no están disponibles: usa otro método cuando sea posible."
      },
      {
        question: "¿Necesito un Mac con notch?",
        answer: "No. Los espacios, servicios y notificaciones de macOS funcionan sin él. La isla es opcional para pantallas compatibles con notch."
      },
      {
        question: "¿Sincroniza las sesiones entre Macs?",
        answer: "No. Cada cuenta tiene su sesión local. La exportación transfiere la configuración, no las cookies ni las sesiones: inicia sesión en cada Mac."
      },
      {
        question: "¿Qué pasa al cerrar la ventana?",
        answer: "Paguro sigue en la barra de menús. Los servicios pueden continuar activos y mostrar notificaciones. Comando-Q cierra la app y detiene su actividad."
      }
    ],
    releaseTitle: "Siéntete como en casa.",
    releaseBody: "Gratis y de código abierto. Para tu Mac.",
    releaseStatus: "La primera versión pública llegará pronto.",
    contact: "Haz una pregunta",
    source: "Ver en GitHub",
    credits: "Un fork gratuito y open source de Chorus, creado por Nico Jan.",
    requirements: "macOS 15 o posterior · Apple silicon e Intel",
    requirementsQuestion: "¿Qué Macs son compatibles?",
    story: {
      title: "Trabajo. Vida. Y todo lo demás.",
      body: "Dale a cada parte del día su propio espacio. Mantén todas tus cuentas conectadas, cada una con su propia sesión.",
      services: "Caras conocidas. Todas bienvenidas.",
      serviceNote: "Elige del catálogo, o añade tu propio sitio web.",
      features: [
        {
          title: "Un lugar para cada cuenta.",
          body: "Gmail del trabajo. Gmail personal. Mantén los dos abiertos sin entrar y salir de tus cuentas. Agrupa tus servicios como prefieras."
        },
        {
          title: "¿Te vas? Cierra la puerta.",
          body: "Bloquea Paguro con Touch ID o la contraseña de tu Mac. Tus servicios y nuevas notificaciones permanecen ocultos hasta que vuelvas."
        },
        {
          title: "Mac nuevo. Mismo hogar.",
          body: "Llévate tus espacios, servicios y preferencias. Exporta tu configuración a otro Mac y vuelve a iniciar sesión en tus servicios."
        }
      ],
      trademarks: "Los nombres y logotipos de los servicios pertenecen a sus respectivos propietarios."
    }
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
