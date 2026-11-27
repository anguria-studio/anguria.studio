import type { OboloCopy } from "./obolo-en";

export const oboloCopy: OboloCopy = {
  name: "Obolo",
  category: "Gestión de suscripciones",
  tagline: "Consulta cuánto gastas cada mes y cuándo toca el próximo pago.",
  seoTitle: "Obolo — Gestión de suscripciones para macOS",
  description: "Obolo es una app de código abierto para controlar tus suscripciones en el Mac. Consulta los gastos mensuales y anuales, anticípate a las renovaciones y guarda el historial de precios.",
  nav: "Explorar Obolo",
  privacy: {
    link: "Política de privacidad",
    back: "Volver a Obolo",
    effective: "Última actualización el {date}.",
  },
  terms: {
    link: "Condiciones de uso",
    updated: "Última actualización: {date}",
  },
  download: "Descargar",
  requirements: "macOS {version}+ · Apple silicon e Intel",
  hero: {
    shotsLabel: "Capturas de Obolo",
    shots: {
      dashboard: { label: "Resumen", alt: "El panel de Obolo muestra suscripciones de ejemplo, con 129,41 € de gasto mensual, un desglose por categorías y 23,40 € pendientes de pago en agosto." },
      months: { label: "Meses", alt: "Gráfico de gastos por mes en Obolo, con agosto de 2026 seleccionado y 35,39 € en cargos." },
      subscriptions: { label: "Suscripciones", alt: "Gráfico de anillo y desglose de gastos de nueve suscripciones activas en Obolo." },
      calendar: { label: "Calendario", alt: "Calendario de agosto de 2026 en Obolo con las fechas de renovación de Dropbox, Netflix y Spotify." },
      list: { label: "Lista", alt: "Lista de nueve suscripciones activas en Obolo con fechas de renovación, importes facturados y costes mensuales." },
      detail: { label: "Detalle", alt: "Detalle de una suscripción en Obolo con el próximo pago, el gasto total y un gráfico de los pagos y los cambios de precio." },
    },
    title: "Suscripciones,",
    accent: "registradas y apiladas",
    download: "Descargar para Mac",
    body: "Obolo es una app sencilla para controlar tus suscripciones en el Mac, con gráficos cuidados. Descubre adónde va tu dinero y cómo cambian los precios con el tiempo.",
  },
  story: {
    title: "Descubre adónde va tu dinero",
    body: "Compara los gastos recurrentes por mes, categoría y suscripción. La vista mensual muestra cuándo las renovaciones anuales hacen que aumente el gasto.",
  },
  features: [
    { id: "spending", title: "Totales mensuales y anuales", body: "Descubre cuánto gastas en software, streaming o cualquier otra categoría. Pasa a la vista de suscripciones para ver qué parte del total corresponde a cada servicio." },
    { id: "calendar", title: "Las renovaciones en tu calendario", body: "Elige un día para ver los próximos pagos, programa un recordatorio o añade los pagos a Calendario de Apple. También puedes ver el siguiente pago en la barra de menús del Mac." },
    { id: "history", title: "Un historial de precios", body: "Registra cada cambio de precio a partir de la fecha en que se aplica. El historial guarda el importe y la moneda originales de cada pago." },
    { id: "currencies", title: "Varias monedas, un solo total", body: "Conserva la moneda original de cada suscripción y compara los gastos en la moneda que elijas. Obolo te avisa si falta algún tipo de cambio." },
  ],
  faqTitle: "Algunas cosas que conviene saber",
  faq: [
    { id: "availability", question: "¿Cómo instalo Obolo?", answer: "Descarga Obolo con el botón de arriba, abre la imagen de disco y arrastra Obolo a la carpeta Aplicaciones. Funciona en Mac con Apple silicon o Intel a partir de macOS 15 Sequoia." },
    { id: "open-source", question: "¿Obolo es de código abierto?", answer: "Sí. El código fuente está disponible en GitHub con la licencia MIT." },
    { id: "data-and-sync", question: "¿Dónde guarda Obolo los datos de mis suscripciones?", answer: "Obolo guarda tu biblioteca en el Mac. Puedes activar la sincronización con iCloud para usarla en tus otros Mac. Obolo no requiere una cuenta propia ni recopila datos de telemetría." },
    { id: "import-export", question: "¿Puedo importar mis suscripciones actuales?", answer: "Sí. Arrastra un archivo CSV a la ventana de Obolo y revisa la vista previa antes de importarlo. También puedes exportar un CSV o guardar una copia de seguridad en JSON con tu biblioteca y tus ajustes." },
    { id: "shortcuts", question: "¿Obolo funciona con Atajos?", answer: "Sí. Puedes usar Atajos para ver la próxima renovación, abrir la lista de suscripciones que se van a renovar o añadir una suscripción." },
  ],
  related: {
    label: "También de Anguria Studio",
    paguro: "Un hogar nativo para tus apps web.",
    moppo: "Una app de limpieza para Mac pensada para desarrolladores.",
  },
};
