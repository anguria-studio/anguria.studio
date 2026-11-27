import type { OboloPrivacyPolicy } from "../obolo-policy";

export const policy: OboloPrivacyPolicy = {
  title: "Política de privacidad de Obolo",
  description: "Cómo guarda Obolo los datos de tus suscripciones, usa la sincronización opcional con iCloud y el calendario y solicita logotipos, tipos de cambio y actualizaciones.",
  intro: [
    "Obolo es una app de Anguria Studio para gestionar suscripciones en macOS. Tu biblioteca se crea en tu Mac. Obolo no requiere una cuenta de Obolo ni envía datos de análisis o informes de fallos a Anguria Studio. Anguria Studio no usa los datos de Obolo para publicidad ni seguimiento y no los vende.",
  ],
  sections: {
    "on-your-mac": {
      heading: "En tu Mac",
      blocks: [
        "Obolo guarda las suscripciones y categorías que introduces o importas, junto con sus precios, fechas de renovación, notas, enlaces y etiquetas de los métodos de pago. También guarda las imágenes de los logotipos, los tipos de cambio y las preferencias. Lleva un registro de la información que introduces sin conectarse a cuentas de pago ni procesar pagos.",
        { kind: "p", runs: [
          "Obolo programa notificaciones de renovación en tu Mac. Pueden mostrar el nombre de la suscripción y el importe. Cuando ejecutas ",
          { kind: "strong", text: "Show Next Renewal" },
          " en Atajos, Obolo devuelve a tu atajo el nombre, la fecha de renovación y el importe.",
        ] },
        { kind: "p", runs: [
          "Activa ",
          { kind: "strong", text: "Add payments to a calendar" },
          " en ",
          { kind: "strong", text: "Settings → Reminders" },
          " para añadir los eventos de renovación al calendario que elijas. Obolo solicita acceso total a Calendario para poder actualizar y eliminar más adelante los eventos que ha creado. Los eventos incluyen el nombre de la suscripción, el importe y la moneda, las fechas, la frecuencia de repetición, las notas y los avisos que configures. Tu proveedor de calendario y las personas con las que lo compartes pueden ver esos detalles aunque la sincronización de Obolo con iCloud esté desactivada. Usa ",
          { kind: "strong", text: "Remove calendar reminders" },
          " en el mismo panel para eliminar los eventos de Obolo y desactivar la sincronización con el calendario. También puedes gestionar los permisos del calendario y de las notificaciones en Ajustes del Sistema de macOS.",
        ] },
        { kind: "p", runs: [
          "Obolo lee los archivos CSV y las copias de seguridad que eliges en tu Mac. En ",
          { kind: "strong", text: "Settings → Data" },
          " puedes exportar un CSV o guardar una copia de seguridad en formato JSON en la ubicación que elijas. La copia de seguridad en JSON no incluye las imágenes de los logotipos. Las exportaciones y copias de seguridad son copias independientes que puedes gestionar en el Finder.",
        ] },
      ],
    },
    "icloud-sync": {
      heading: "Sincronización opcional con iCloud",
      blocks: [
        { kind: "p", runs: [
          { kind: "strong", text: "Sync with iCloud" },
          " está desactivada inicialmente en cada Mac. Actívala en ",
          { kind: "strong", text: "Settings → Data" },
          " para sincronizar tu biblioteca entre los Mac que usen la misma cuenta de Apple. Antes de la primera fusión de datos, Obolo crea una copia de seguridad local.",
        ] },
        "Obolo usa CloudKit de Apple para guardar estos datos en tu base de datos privada de iCloud:",
        { kind: "ul", items: [
          "Datos de las suscripciones, incluidos los precios y su historial, los detalles de las renovaciones y los recordatorios, las etiquetas de los métodos de pago, las notas y los enlaces",
          "Categorías e imágenes de los logotipos de las suscripciones, incluidas las que elijas",
          "Tipos de cambio introducidos manualmente, moneda base y antelación predeterminada de los recordatorios",
        ] },
        { kind: "p", runs: [
          "Obolo también usa un identificador de la cuenta de iCloud en tu Mac para detectar cambios de cuenta. La sincronización de Obolo con iCloud no incluye la apariencia, los ajustes de inicio, la hora de las notificaciones, el calendario elegido, los tipos de cambio automáticos, las variantes oscuras de los logotipos ni los archivos de copia de seguridad. Anguria Studio no puede ver los registros de tu base de datos privada. Apple gestiona el almacenamiento de iCloud de acuerdo con su ",
          { kind: "link", text: "política de privacidad", href: "https://www.apple.com/legal/privacy/" },
          ".",
        ] },
        { kind: "p", runs: [
          "Al desactivar ",
          { kind: "strong", text: "Sync with iCloud" },
          ", Obolo deja de sincronizarse en ese Mac. Tu biblioteca local y los registros que ya estén en iCloud se conservan. Los demás Mac con la sincronización activada pueden seguir sincronizándose. Si vuelves a activarla, Obolo puede combinar los registros conservados en iCloud con tu biblioteca local.",
        ] },
      ],
    },
    "network-requests": {
      heading: "Solicitudes de logotipos y tipos de cambio",
      blocks: [
        { kind: "p", runs: [
          { kind: "strong", text: "Iconos de sitios web en ambas ediciones." },
          " Obolo parte de la página de inicio del dominio indicado en el campo Website de la suscripción. Si ese campo está vacío, usa el nombre de host del enlace de gestión. Sigue las redirecciones, busca enlaces a iconos en la página y prueba rutas habituales como ",
          { kind: "code", text: "/favicon.ico" },
          ". El sitio web puede dirigir a Obolo a otro host, como su red de distribución de contenidos. Esos hosts pueden ver tu dirección IP, la dirección solicitada y las cabeceras estándar de la solicitud. Obolo envía las solicitudes directamente desde tu Mac y sin cookies. Anguria Studio no recibe ninguna copia de tus solicitudes de iconos. Obolo lee la página y los archivos de iconos sin ejecutar los scripts del sitio.",
        ] },
        { kind: "p", runs: [
          "Obolo puede obtener un logotipo al guardar una suscripción en modo logotipo, usar ",
          { kind: "strong", text: "Fetch logos" },
          " o dejar seleccionada la opción ",
          { kind: "strong", text: "Fetch logos after import" },
          ". Si el logotipo ya existe o acaba de sincronizarse, Obolo también puede buscar una variante oscura en el sitio. Un nombre de host puede incluir un subdominio específico de tu organización. Los sitios que reciben estas solicitudes aplican sus propias políticas de privacidad y pueden conservar registros del servidor. Para evitar solicitudes de iconos para una suscripción, deja vacíos el campo del sitio web y el enlace de gestión.",
        ] },
        { kind: "p", runs: [
          { kind: "strong", text: "Búsqueda de iconos con Google en la edición de descarga directa." },
          " Si el icono del sitio no existe o es pequeño, la edición de descarga directa también puede enviar a Google el dominio del servicio y el tamaño de icono solicitado. Google recibe los datos habituales de conexión, incluida tu dirección IP. Esta opción de búsqueda alternativa está activada de forma predeterminada. Desactívala en ",
          { kind: "strong", text: "Settings → General → Look up missing logos with Google" },
          " para usar solo los iconos de los sitios web. La edición del Mac App Store usa la búsqueda en sitios web descrita anteriormente y no recurre a Google. ",
          { kind: "link", text: "Política de privacidad de Google", href: "https://policies.google.com/privacy" },
        ] },
        { kind: "p", runs: [
          { kind: "strong", text: "Tipos de cambio." },
          " Las actualizaciones automáticas de los tipos de cambio están activadas de forma predeterminada. Cuando Obolo necesita un tipo de cambio, envía a Frankfurter los códigos de la moneda base y de la moneda de destino. El servicio afirma que no conserva registros de direcciones IP ni de URL solicitadas. Desactiva ",
          { kind: "strong", text: "Update rates automatically" },
          " en ",
          { kind: "strong", text: "Settings → Currencies" },
          " para detener las solicitudes. Puedes introducir los tipos de cambio manualmente. ",
          { kind: "link", text: "Información de privacidad de Frankfurter", href: "https://frankfurter.dev/#faq" },
        ] },
      ],
    },
    "retention-and-deletion": {
      heading: "Conservación y eliminación",
      blocks: [
        { kind: "p", runs: [
          "Puedes eliminar suscripciones individuales en Obolo. Con la sincronización con iCloud activada, los cambios y las eliminaciones se sincronizan cuando tu Mac se conecta. La opción ",
          { kind: "strong", text: "Settings → Data → Stored at" },
          " muestra en el Finder la ubicación de la biblioteca local y de sus archivos asociados. Cierra Obolo antes de eliminar esos datos locales. Las copias de seguridad y las copias que hayas exportado o guardado por separado se conservan hasta que las elimines.",
        ] },
        { kind: "p", runs: [
          "Eliminar la app o desactivar la sincronización conserva la copia de iCloud. Para comprobar si macOS permite eliminar los datos de Obolo de iCloud, abre ",
          { kind: "strong", text: "Ajustes del Sistema" },
          ", haz clic en tu nombre y después en ",
          { kind: "strong", text: "iCloud → Gestionar" },
          ". Guarda las copias que quieras conservar y desactiva la sincronización en tus Mac antes de eliminar los datos de iCloud. Apple explica las opciones en ",
          { kind: "link", text: "Gestionar el almacenamiento de iCloud en el Mac", href: "https://support.apple.com/guide/mac-help/manage-icloud-storage-mh36833/mac" },
          ".",
        ] },
      ],
    },
    "contact": {
      heading: "Actualizaciones de la app y contacto",
      blocks: [
        { kind: "p", runs: [
          "Apple gestiona las actualizaciones de la edición del Mac App Store. La edición de descarga directa contacta con GitHub para buscar y descargar actualizaciones. GitHub recibe los datos habituales de la solicitud, como la dirección IP. Puedes desactivar la búsqueda automática de actualizaciones en ",
          { kind: "strong", text: "Settings → Updates" },
          ". ",
          { kind: "link", text: "Declaración de privacidad de GitHub", href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" },
        ] },
        { kind: "p", runs: [
          "Para solicitudes relacionadas con la privacidad o la eliminación de datos, escribe a Anguria Studio a ",
          { kind: "email" },
          ". Usamos la información que decidas enviarnos para gestionar tu solicitud.",
        ] },
      ],
    },
  },
};
