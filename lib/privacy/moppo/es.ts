import type { MoppoPrivacyPolicy } from "../moppo-policy";

export const policy: MoppoPrivacyPolicy = {
  title: "Política de privacidad de Moppo",
  description: "Cómo Moppo trata archivos, fotos, historial local, permisos, comprobaciones opcionales de actualizaciones y solicitudes de ayuda.",
  intro: ["Moppo es una app gratuita y de código abierto para macOS de Anguria Studio. Te ayuda a revisar el uso del disco, los elementos para limpiar, los duplicados y la eliminación de aplicaciones. Esta política describe la app Moppo."],
  sections: {
    files: {
      heading: "Archivos y fotos",
      blocks: ["Moppo analiza los archivos de tu Mac para encontrar elementos para limpiar y medir el almacenamiento. Lee tu fototeca cuando usas la detección de fotos duplicadas. Los análisis se realizan localmente. Moppo no sube a Anguria Studio los archivos analizados, sus rutas, las fotos ni el contenido de la fototeca."],
    },
    local: {
      heading: "Registros en tu Mac",
      blocks: [
        "Moppo guarda los ajustes, cachés de análisis, mediciones de almacenamiento y registros de eliminación en tu Mac. Estos registros pueden contener las rutas originales y las ubicaciones en la Papelera. Moppo los usa para el Historial y la función Put Back.",
        "Moppo no tiene un servicio de cuentas ni telemetría de la app. Los registros locales pueden contener información privada; trátalos como datos sensibles si decides compartirlos o incluirlos en una copia de seguridad.",
      ],
    },
    permissions: {
      heading: "Acceso a archivos y Fotos",
      blocks: ["macOS controla el acceso a los archivos y a tu fototeca. El Acceso total al disco permite a Moppo analizar carpetas protegidas; puedes continuar con acceso limitado, que puede dejar algunas carpetas ilegibles. Los análisis programados y las mediciones automáticas requieren Acceso total al disco. Abrir la detección de fotos duplicadas solicita acceso a Fotos. Puedes gestionar estos permisos en los Ajustes del Sistema de macOS."],
    },
    updates: {
      heading: "Actualizaciones opcionales",
      blocks: ["Las comprobaciones automáticas de actualizaciones son opcionales. Cuando buscas actualizaciones, Moppo contacta con el sitio de actualizaciones mediante HTTPS. El sitio recibe tu dirección IP y la información habitual de conexión. Sparkle compara la versión instalada de Moppo con el canal de actualizaciones. Moppo desactiva el envío del perfil del sistema de Sparkle y pide permiso antes de instalar una actualización."],
    },
    services: {
      heading: "Servicios externos",
      blocks: [
        "Las solicitudes de Fotos e iCloud usan los servicios de Apple y tu cuenta de Apple existente. Si las descargas de fotos están activadas, los análisis y la cuadrícula de fotos pueden descargar las vistas previas que faltan desde iCloud; abrir una vista previa puede descargar el original. Puedes desactivar las descargas en Ajustes → Avanzado. El ajuste se aplica a nuevas solicitudes; las que ya están activas pueden terminar.",
        "La desinstalación con Homebrew usa las herramientas Homebrew instaladas en tu Mac. Homebrew puede contactar con las fuentes de sus paquetes según sus propios ajustes. Si Homebrew necesita tu contraseña, Moppo la envía directamente a sudo y no la guarda. Estos servicios gestionan sus propias solicitudes de red conforme a sus propias políticas.",
      ],
    },
    support: {
      heading: "Solicitudes de ayuda",
      blocks: ["Moppo puede preparar un informe de asistencia con las versiones de Moppo y macOS. El informe generado no incluye rutas de archivos, fotos, registros de eliminación ni mediciones guardadas. Puedes revisarlo antes de enviarlo. Tu proveedor de correo y Anguria Studio reciben la información que decides enviar. Otras personas pueden leer los informes públicos de incidencias en GitHub."],
    },
    contact: {
      heading: "Contacto y cambios",
      blocks: [
        { kind: "p", runs: ["Para preguntas sobre privacidad, escribe a ", { kind: "email" }, "."] },
        "Actualizaremos esta página cuando cambie el tratamiento de datos de la app e indicaremos aquí la fecha de entrada en vigor actual.",
      ],
    },
  },
};
