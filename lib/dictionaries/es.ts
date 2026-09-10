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
    serviceOverlay: {
      services: "Servicios de vista previa",
      personal: "Personal",
      work: "Trabajo",
      expand: "Expandir la barra lateral",
      collapse: "Contraer la barra lateral",
      captureAlt: "Paguro con WhatsApp abierto y su ventana translúcida original sobre el escritorio.",
    },
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
    samples: {
      slack: [
        { title: "Estudio", message: "Los diseños están listos." },
        { title: "#general", message: "La cafetera ya funciona. ¡Alegría!" },
        { title: "Marta", message: "¿Puedes revisar la PR?" },
        { title: "#design", message: "Nuevos iconos en Figma." },
        { title: "Luca", message: "La daily pasa a las 10:15." },
        { title: "#random", message: "¿Quién se llevó los buenos snacks?" },
        { title: "Estudio", message: "Al cliente le encantó la presentación." },
        { title: "Giulia", message: "Arreglo subido, tests en verde." },
        { title: "#releases", message: "La 2.4 ya está fuera." },
        { title: "Marta", message: "¿Comemos?" },
        { title: "#design", message: "Mañana sale la nueva paleta." },
        { title: "Luca", message: "¡Gracias por la revisión!" },
      ],
      whatsapp: [
        { title: "El grupo de la cena", message: "¿Pizza a las ocho?" },
        { title: "Mamá", message: "Llámame cuando puedas." },
        { title: "Sara", message: "Llego cinco minutos tarde." },
        { title: "El grupo de la cena", message: "Yo llevo el postre." },
        { title: "Andrea", message: "¿Viste el partido de anoche?" },
        { title: "Familia", message: "El domingo comemos con la abuela." },
        { title: "Sara", message: "Te he mandado las fotos." },
        { title: "Grupo de senderismo", message: "¿Seguimos con el sábado?" },
        { title: "Andrea", message: "¡Ya he aterrizado!" },
        { title: "Mamá", message: "No olvides el paraguas." },
        { title: "El grupo de la cena", message: "Mesa reservada." },
        { title: "Sara", message: "¡Feliz cumpleaños!" },
      ],
      gmail: [
        { title: "Una pequeña escapada", message: "Tus planes del fin de semana han llegado." },
        { title: "Tu librería", message: "Tu pedido ya está en camino." },
        { title: "Domingo lento", message: "Cinco ideas para ir más despacio." },
        { title: "Tu banco", message: "Tu extracto ya está disponible." },
        { title: "Entradas de concierto", message: "Puertas a las 19:00." },
        { title: "Una pequeña escapada", message: "Mañana abre el check-in." },
        { title: "La biblioteca", message: "Tu reserva te espera." },
        { title: "Recetas semanales", message: "Pasta al limón para esta noche." },
        { title: "Calendario del equipo", message: "Invitación: design review." },
        { title: "Tu librería", message: "Novedad de un autor que sigues." },
        { title: "El tiempo", message: "Fin de semana soleado." },
        { title: "Una pequeña escapada", message: "Lleva poco. Allí hace calor." },
      ],
    },
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
        question: "¿Los servicios hibernados siguen enviando notificaciones?",
        answer: "Los servicios completamente hibernados detienen su actividad web en directo, así que las nuevas notificaciones pueden no llegar hasta que los abras de nuevo. Mantén activos el correo y la mensajería si necesitas notificaciones en tiempo real. Puedes configurar la hibernación para cada servicio."
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
          title: "Sin otra cuenta. Sin telemetría.",
          body: "Tu configuración y tus sesiones permanecen en tu Mac. Sin cuenta de Paguro, sincronización en la nube ni telemetría de la app. Los servicios que usas se conectan directamente con sus proveedores."
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
