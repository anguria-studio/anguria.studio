import type { MoppoPrivacyPolicy } from "../moppo-policy";

export const policy: MoppoPrivacyPolicy = {
  title: "Política de privacidad de Moppo",
  description: "Cómo Moppo trata archivos, fotos, historial local, uso desde la línea de comandos y por agentes de IA, permisos, comprobaciones opcionales de actualizaciones y solicitudes de ayuda.",
  intro: ["Moppo es una app gratuita y de código abierto para macOS de Anguria Studio. Te ayuda a revisar el uso del disco, los elementos para limpiar, los duplicados y la eliminación de aplicaciones. Esta política describe la app Moppo y su herramienta de línea de comandos moppo."],
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
    cli: {
      heading: "Línea de comandos y agentes de IA",
      blocks: [
        "Puedes usar la herramienta de línea de comandos moppo, o dejar que la use un agente de IA, para analizar el almacenamiento, preparar planes de limpieza y eliminar los elementos planificados. La herramienta guarda tres tipos de registros en carpetas privadas dentro de ~/Library/Application Support/Moppo. Los permisos de estas carpetas y archivos limitan el acceso a tu cuenta de usuario de macOS.",
        {
          kind: "ul",
          items: [
            "Los informes de análisis contienen nombres de archivo, rutas, mediciones, explicaciones del análisis y comprobaciones de identidad de los archivos para validar los planes. Los informes se guardan en ~/Library/Application Support/Moppo/cli-scans y caducan a los siete días. Moppo conserva los diez informes más recientes y los que usan los planes guardados.",
            "Los planes de limpieza guardados contienen identificadores. Un plan caduca al cabo de un día, o antes si caduca su informe de análisis. Moppo conserva como máximo veinte planes.",
            "Los registros de resultados de eliminación contienen identificadores, códigos de estado y recuentos, sin nombres de archivo ni rutas. Caducan a los siete días. Moppo conserva como máximo 100 registros.",
          ],
        },
        "Moppo no usa los registros caducados. Sus archivos pueden permanecer hasta una limpieza posterior de la carpeta. Los archivos no válidos y las copias de seguridad pueden permanecer más allá de estos límites.",
        { kind: "p", runs: ["La salida normal de los comandos omite nombres de archivo, rutas y explicaciones detalladas. La opción ", { kind: "nowrap", text: "--include-paths" }, " los añade a la salida de un solo comando. La salida reducida sigue conteniendo metadatos de almacenamiento, como categorías, tamaños y clasificaciones de almacenamiento. La interfaz de línea de comandos compatible nunca devuelve el contenido de los archivos."] },
        { kind: "p", runs: ["Un agente de IA que ejecuta la herramienta puede enviar su salida a un proveedor de modelos externo. A esa salida se aplican los ajustes y las políticas propios del proveedor. Moppo no controla la conservación, las copias de seguridad ni la divulgación posterior por parte del proveedor. Moppo no puede garantizar que el agente procese la salida solo en tu Mac. Usa ", { kind: "nowrap", text: "--include-paths" }, " con un agente solo si aceptas que su proveedor pueda recibir esos nombres y rutas."] },
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
