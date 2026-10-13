import type { PaguroTerms } from "../paguro-terms";

export const terms: PaguroTerms = {
  title: "Condiciones de uso de Paguro",
  description: "Condiciones de uso de Paguro, la app gratuita y open source para macOS de Anguria Studio. Licencia MIT, garantía, servicios de terceros y datos.",
  sections: {
    software: {
      heading: "El software",
      paragraph: [
        "Paguro es software gratuito y open source de Anguria Studio, publicado bajo la ",
        { kind: "license", text: "licencia MIT" },
        ". La licencia completa está en el repositorio de GitHub y rige el uso, la copia y la modificación del código.",
      ],
    },
    warranty: {
      heading: "Sin garantía",
      paragraph: ["Paguro se proporciona «tal cual», sin garantía de ningún tipo. No somos responsables de daños, pérdida de datos o problemas con las cuentas derivados de su uso."],
    },
    "third-party": {
      heading: "Servicios de terceros",
      paragraph: ["Paguro muestra sitios web como WhatsApp, Gmail y Slack. El uso de estos servicios se rige por sus propias condiciones y políticas de privacidad, no por las nuestras. Paguro no está afiliado a ellos ni cuenta con su respaldo."],
    },
    data: {
      heading: "Tus datos",
      paragraph: [
        "Paguro no tiene cuentas propias ni telemetría de la app. Las sesiones y los ajustes permanecen en tu Mac. Consulta nuestra ",
        { kind: "privacy", text: "Política de privacidad" },
        " para más información.",
      ],
    },
    changes: {
      heading: "Cambios",
      paragraph: ["Podemos actualizar estas condiciones; los cambios se publican en esta página."],
    },
    contact: {
      heading: "Contacto",
      paragraph: ["Preguntas: ", { kind: "email" }],
    },
  },
};
