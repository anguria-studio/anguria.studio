import type { OboloTerms } from "../obolo-terms";

export const terms: OboloTerms = {
  title: "Condiciones de uso de Obolo",
  description: "Condiciones de uso de Obolo, la app de Anguria Studio para gestionar suscripciones en macOS. Licencia MIT, estimaciones, servicios externos y datos.",
  sections: {
    software: {
      heading: "Licencia del software",
      paragraph: [
        "Obolo es software gratuito y de código abierto de Anguria Studio. Su código fuente está disponible bajo la ",
        { kind: "license", text: "licencia MIT" },
        ". La licencia explica tus derechos de uso, copia, modificación y distribución del software y establece la exclusión de garantías y los límites de responsabilidad.",
      ],
    },
    tracking: {
      heading: "Seguimiento de suscripciones",
      paragraph: ["Obolo lleva un registro de las suscripciones que introduces o importas. Estima los gastos y las próximas renovaciones a partir de tus datos y los tipos de cambio. Los proveedores de tus suscripciones gestionan la facturación y las cancelaciones. Comprueba con cada proveedor los importes que te han cobrado, las fechas de renovación y el estado de las cancelaciones."],
    },
    "third-party": {
      heading: "Servicios externos",
      paragraph: ["Funciones como la sincronización con iCloud, la integración con el calendario, la búsqueda de logotipos y la actualización de los tipos de cambio pueden usar servicios de terceros. Cada servicio tiene sus propias condiciones y políticas de privacidad."],
    },
    data: {
      heading: "Tus datos",
      paragraph: ["Tu biblioteca de suscripciones se guarda en tu Mac. Consulta la ", { kind: "privacy", text: "política de privacidad" }, " para conocer los detalles sobre la sincronización opcional, las solicitudes externas, las copias de seguridad y la eliminación de datos."],
    },
    contact: {
      heading: "Cambios y contacto",
      paragraph: ["Publicamos en esta página las actualizaciones de estas condiciones. Si tienes alguna pregunta, escribe a ", { kind: "email" }, "."],
    },
  },
};
