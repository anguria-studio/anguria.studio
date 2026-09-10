import type { PaguroPrivacyPolicy } from "../paguro-policy";

/**
 * Traducción del texto original en inglés (en.ts), que es la fuente de verdad.
 * La estructura tiene que coincidir con la inglesa: las mismas secciones, el
 * mismo número de bloques y el mismo tipo en cada posición
 * (tests/paguro-privacy.test.mjs lo comprueba).
 *
 * Es un texto legal, así que la redacción es deliberada: cada matiz ("no es una
 * garantía", "puede reintentarse", "no garantizan") es intencionado y tiene que
 * sobrevivir a las ediciones.
 */
export const policy: PaguroPrivacyPolicy = {
  title: "Política de privacidad de Paguro",
  description:
    "Cómo trata Paguro tus datos. Espacios, sesiones y ajustes se quedan en tu Mac; no hay cuenta de Paguro, sincronización en la nube ni telemetría.",
  intro: [
    "Paguro es una app de macOS gratuita y open source de Anguria Studio. Reúne sitios web y servicios web en espacios de trabajo en tu Mac. Esta política describe la app Paguro. Los sitios web que abres tienen sus propias políticas de privacidad.",
  ],
  sections: {
    local: {
      heading: "Datos en tu Mac",
      blocks: [
        "Paguro guarda localmente los nombres de los espacios de trabajo, las direcciones de los servicios, las etiquetas de las cuentas, las preferencias y los iconos en caché. Cada cuenta de servicio tiene un almacén de datos de WebKit separado para las cookies, el almacenamiento de los sitios web y los datos de sesión. Paguro no gestiona ningún servicio de cuenta ni de sincronización en la nube para esta información, y no envía telemetría de la app a Anguria Studio.",
        "Inicias sesión directamente en cada sitio web. Paguro no mantiene su propia base de datos con las contraseñas de tus cuentas. Las cookies y los tokens de sesión de los sitios web pueden mantener tu sesión iniciada, así que los datos de sesión locales deben seguir tratándose como información sensible.",
      ],
    },
    network: {
      heading: "Sitios web y solicitudes de red",
      blocks: [
        "Los sitios web que abres se conectan con sus proveedores. Esos proveedores reciben información de red, como tu dirección IP, y la información que envías o compartes a través de sus servicios. Pueden usar cookies, analíticas u otros sistemas de seguimiento conforme a sus propias políticas. Las opciones de bloqueo de contenido de Paguro no garantizan que se bloquee todo el seguimiento.",
        "Paguro descarga los iconos de los servicios desde los sitios web y los guarda en caché en tu Mac. Estas solicitudes pueden revelar tu dirección IP y la dirección solicitada al sitio web o a quien aloje su icono.",
        "La versión de la Mac App Store no incluye la búsqueda de iconos de Google.",
        "En la versión de descarga directa, la búsqueda opcional de iconos de Google está desactivada por defecto. Si la activas y Paguro no encuentra un icono directamente, puede enviar el nombre de host del servicio al servicio de favicons de Google. Google también recibe la solicitud de red, incluida tu dirección IP. Paguro filtra los nombres de host que probablemente sean privados antes de recurrir a esta alternativa; el filtro no es una garantía de que se pueda reconocer toda dirección privada. Puedes desactivar esta opción en Ajustes → Privacidad.",
      ],
    },
    permissions: {
      heading: "Notificaciones y permisos",
      blocks: [
        "Paguro puede leer las señales de notificación de un servicio y mostrar el texto de la notificación en las notificaciones de macOS o en la isla opcional. Paguro no envía ese texto a Anguria Studio. La isla mantiene su lista de notificaciones en memoria; macOS gestiona las notificaciones que se entregan al Centro de notificaciones.",
        "Bloquear Paguro impide que se presenten notificaciones nuevas. No cierra tu sesión en los sitios web ni detiene toda la actividad web en segundo plano. Cierra Paguro para detener sus sesiones web y el sondeo de notificaciones.",
        "El acceso a la cámara y al micrófono se usa cuando permites que un sitio web utilice esos dispositivos. El sitio web gestiona el contenido multimedia que compartas. Paguro usa la autenticación de macOS para el bloqueo de la app; no recibe tu huella dactilar ni la contraseña de inicio de sesión de tu Mac.",
        "Los archivos que eliges subir se comparten con el sitio web seleccionado. Las descargas se guardan en tu Mac. Estos archivos siguen sujetos a las prácticas de datos del propio sitio web.",
      ],
    },
    export: {
      heading: "Exportación y eliminación de la configuración",
      blocks: [
        "La exportación de la configuración guarda los espacios de trabajo, los servicios y las preferencias portables en un archivo que eliges tú. No incluye las sesiones de inicio. Una exportación puede contener igualmente direcciones de servicios privadas y etiquetas de cuentas; compártela solo con las personas a las que quieras dar esa información. Paguro no sube ese archivo por ti.",
        "Eliminar una cuenta de servicio de Paguro programa la eliminación de sus datos de sesión locales de WebKit. Quitar solo el vínculo con un espacio de trabajo no elimina una cuenta que se siga usando en otro sitio. La limpieza local puede reintentarse si WebKit está ocupado. Eliminar una cuenta en Paguro no elimina tu cuenta ni la información que conserva el proveedor del sitio web. Usa los controles del proveedor para eso.",
        "Los archivos de configuración exportados, los archivos descargados, las notificaciones de macOS y las copias de seguridad del sistema son independientes del almacén de datos del servicio. Gestiona esas copias con la app correspondiente o con los controles de macOS.",
      ],
    },
    updates: {
      heading: "Actualizaciones de la app",
      blocks: [
        "La versión de la Mac App Store usa el sistema de actualizaciones de Apple y no incluye Sparkle ni contacta con el feed de actualizaciones de la versión de descarga directa de Paguro.",
        "La versión de descarga directa usa Sparkle para buscar actualizaciones alojadas en GitHub. Las comprobaciones de actualizaciones y las descargas hacen solicitudes de red a GitHub y a su infraestructura de distribución. Paguro desactiva el envío opcional del perfil del sistema de Sparkle. La búsqueda automática de actualizaciones se puede controlar en los ajustes de «Acerca de» de la app.",
      ],
    },
    contact: {
      heading: "Contacto y cambios",
      blocks: [
        {
          kind: "p",
          runs: [
            "Para preguntas sobre privacidad, escribe a ",
            { kind: "email" },
            ". Si nos escribes, tú decides qué información incluir. No envíes contraseñas, tokens de inicio de sesión ni contenido privado de notificaciones. Los informes de incidencias públicos en GitHub pueden ser leídos por otras personas.",
          ],
        },
        "Actualizaremos esta página cuando cambie el tratamiento de datos de la app y mostraremos aquí la fecha de entrada en vigor actual.",
      ],
    },
  },
};
