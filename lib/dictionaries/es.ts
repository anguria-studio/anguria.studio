import type { Dictionary } from "./en";

/**
 * Traducido de los textos provisionales en inglés. Volver a traducir cuando se
 * resuelvan los `TODO(copy)` de en.ts.
 *
 * Tuteo, como en it.ts — el tono de la marca es informal.
 */
export const dictionary: Dictionary = {
  paguroNotificationTest: {
    title: "Prueba tus notificaciones.",
    intro: "Envía notificaciones de ejemplo a través de Paguro. Prueba los banners de macOS o la isla de notificaciones, sin una cuenta de mensajería.",
    setup: [
      "Permite las notificaciones de Paguro en los Ajustes del Sistema de macOS. Mantén este servicio activo y sin silenciar, y desactiva No molestar o Concentración durante la prueba.",
      "Elige una prueba abajo. Puedes quedarte aquí o cambiar a otro servicio u otra app. Mantén Paguro abierto y esta página cargada hasta que termine la prueba.",
    ],
    sendHeading: "Un pequeño saludo.",
    timing: "La primera notificación se envía en cuanto se concede el permiso. La secuencia envía seis notificaciones diferentes, con 3 segundos entre ellas.",
    single: "Enviar una notificación",
    sequence: "Enviar seis notificaciones",
    cancel: "Cancelar pendientes",
    noJavaScript: "Activa JavaScript para probar las notificaciones.",
    status: {
      idle: "Todo listo. No se envía nada hasta que elijas una prueba.",
      requesting: "Esperando permiso para las notificaciones…",
      scheduled: "Prueba en curso. Ya puedes cambiar a otro servicio u otra app.",
      complete: "Todas las solicitudes han terminado. Puedes repetir la prueba.",
      cancelled: "Solicitudes pendientes canceladas. Las notificaciones ya mostradas permanecen hasta que las descartes.",
      unsupported: "Las notificaciones no están disponibles en este navegador. Abre esta página como servicio en Paguro en tu Mac.",
      denied: "No se ha concedido permiso para las notificaciones. Permítelas en los ajustes del navegador y vuelve a intentarlo. En Paguro, comprueba también los ajustes de notificaciones de macOS.",
      error: "La página no ha podido completar una solicitud de notificación. Comprueba los permisos y vuelve a intentarlo.",
    },
    progress: "Solicitadas {count} de {total} notificaciones.",
    history: "Solicitudes de notificación de esta prueba",
    unread: "{count} sin leer",
    markRead: "Marcar todas como leídas",
    badgeNote: "El título de la página contiene el contador para los indicadores del servicio y del Dock de Paguro. Activa los indicadores para este servicio. En segundo plano, la actualización puede tardar hasta 30 segundos. Marcar todas como leídas reinicia el contador; descartar un aviso no marca su mensaje como leído. Recargar reinicia esta bandeja de ejemplo.",
    deliveryNote: "Esta lista confirma las solicitudes de la página, no su entrega por macOS. Los ajustes de Paguro, Concentración y el bloqueo de la app pueden impedir los avisos. Cancelar detiene las solicitudes pendientes; recargar o salir de esta página también detiene la prueba.",
    tryHeading: "Dos formas de estar al día.",
    checks: [
      { title: "Notificaciones de macOS", body: "En Paguro Settings → Notifications, activa Show macOS notifications y desactiva Show island alerts on notched displays. Activa también las notificaciones macOS para este servicio. Inicia la prueba de seis notificaciones y cambia a otra app para comprobar los siguientes banners." },
      { title: "Isla de notificaciones", body: "En una pantalla compatible con notch, activa Show island alerts on notched displays y desactiva Show macOS notifications. Ejecuta la prueba de seis notificaciones. Pasa el cursor sobre la isla para expandirla, desplázate por la pila, descarta una tarjeta y haz clic en una notificación para volver a este servicio." },
      { title: "Bloqueo de la app", body: "Inicia la prueba de seis notificaciones y bloquea Paguro después de la primera notificación. Los avisos restantes deberían suprimirse durante el bloqueo. Desbloquea explícitamente para volver a la app; las notificaciones suprimidas no se reproducen después." },
    ],
    scope: "Estos mensajes de ejemplo se crean en esta página mediante la API web estándar Notification. No se necesita ninguna cuenta, remitente ni servicio de mensajería. La prueba comprueba la gestión de notificaciones, no el inicio de sesión ni la entrega de mensajes de un servicio de terceros.",
    samples: [
      { title: "Prueba Paguro · Un pequeño saludo", body: "Tu primera notificación de ejemplo. Todo empieza aquí." },
      { title: "Prueba Paguro · Pausa para un café", body: "Alex: ¿Un café en diez minutos? Busco una mesa." },
      { title: "Prueba Paguro · Novedades del proyecto", body: "Las nuevas maquetas están listas para revisar." },
      { title: "Prueba Paguro · Planes del fin de semana", body: "Sam: ¿El sábado junto al mar? Llevaré algo para picar." },
      { title: "Prueba Paguro · Lecturas", body: "La selección de la semana: un poco de inspiración." },
      { title: "Prueba Paguro · Todo al día", body: "Seis ejemplos, un solo lugar. Prueba a desplazarte y descartarlos." },
    ],
  },
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
    mobileCaptureAlt: "Paguro en el escritorio del Mac, con Claude abierto y las apps web agrupadas en los espacios Personal y Work.",
    serviceOverlay: {
      services: "Servicios de vista previa",
      personal: "Personal",
      work: "Trabajo",
      expand: "Expandir la barra lateral",
      collapse: "Contraer la barra lateral",
      captureAlt: "Paguro con WhatsApp abierto y su ventana translúcida original sobre el escritorio.",
    },
    previewTheme: "Apariencia de la vista previa",
    previewSystem: "Vista previa del sistema",
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
  },
  paguroPage: {
    seoTitle: "Paguro — Espacio de trabajo gratuito para apps web en Mac",
    nav: "Descubre Paguro",
    faqLabel: "Preguntas",
    appStore: "Descárgalo en el App Store",
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
    releaseBody: "Gratis y de código abierto.",
    releaseStatus: "La primera versión pública llegará pronto.",
    contact: "Haz una pregunta",
    github: "Ver en GitHub",
    download: "Consigue la app",
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
      ]
    }
  },

  paguroPrivacy: {
    link: "Política de privacidad",
    read: "Lee la política de privacidad de Paguro",
    back: "Volver a Paguro",
    effective: "En vigor desde el {date}",
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
    copyright: "© 2026 Anguria Studio",
  },
};
