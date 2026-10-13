import type { MoppoTerms } from "../moppo-terms";

export const terms: MoppoTerms = {
  title: "Condiciones de uso de Moppo",
  description: "Condiciones de uso de Moppo, la app gratuita y de código abierto para limpiar el Mac. Licencia MIT, limpieza, recuperación, garantía y datos.",
  sections: {
    software: {
      heading: "El software",
      paragraph: ["Moppo es software gratuito y de código abierto de Anguria Studio, publicado bajo la ", { kind: "license", text: "Licencia MIT" }, ". La licencia completa está en el repositorio de GitHub y regula el uso, la copia y la modificación del código."],
    },
    cleanup: {
      heading: "Limpieza y recuperación",
      paragraph: ["Revisa los elementos que seleccionas para eliminar y conserva copias de seguridad de los datos importantes. La limpieza normal de archivos mueve los elementos a la Papelera. Put Back requiere un registro de eliminación guardado y que el elemento siga en la Papelera; no puede restaurar paquetes desinstalados por Homebrew ni imágenes de Docker. Vaciar la Papelera borra su contenido permanentemente. La eliminación de fotos usa Fotos y puede afectar a otros dispositivos mediante Fotos en iCloud; la recuperación se gestiona en Fotos. Los tamaños de limpieza indicados son estimaciones y no garantizan cuánto espacio se recuperará."],
    },
    warranty: {
      heading: "Sin garantía",
      paragraph: ["Moppo se proporciona «tal cual», sin garantía de ningún tipo. Se aplican las exclusiones de garantía y las limitaciones de responsabilidad de la Licencia MIT. Las comprobaciones de limpieza y las funciones de recuperación no garantizan que no pueda producirse una pérdida de datos."],
    },
    "third-party": {
      heading: "Servicios externos",
      paragraph: ["Las funciones que usan Fotos, iCloud, Homebrew, Docker o el servicio de actualizaciones están sujetas a las condiciones y ajustes de esos servicios. Moppo no está afiliado a estos proveedores ni cuenta con su respaldo."],
    },
    data: {
      heading: "Tus datos",
      paragraph: ["Moppo no tiene un servicio de cuentas ni telemetría de la app. Los registros de análisis, ajustes e historial de limpieza se quedan en tu Mac. Las comprobaciones opcionales de actualizaciones y los servicios externos pueden realizar solicitudes de red. Consulta nuestra ", { kind: "privacy", text: "Política de privacidad" }, " para más detalles."],
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
