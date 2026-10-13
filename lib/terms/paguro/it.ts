import type { PaguroTerms } from "../paguro-terms";

export const terms: PaguroTerms = {
  title: "Condizioni d’uso di Paguro",
  description: "Condizioni d’uso di Paguro, l’app gratuita e open source per macOS di Anguria Studio. Licenza MIT, garanzia, servizi di terze parti e dati.",
  sections: {
    software: {
      heading: "Il software",
      paragraph: [
        "Paguro è un software gratuito e open source di Anguria Studio, distribuito con ",
        { kind: "license", text: "licenza MIT" },
        ". Il testo completo della licenza è nel repository GitHub e disciplina l’uso, la copia e la modifica del codice.",
      ],
    },
    warranty: {
      heading: "Nessuna garanzia",
      paragraph: ["Paguro è fornito «così com’è», senza garanzie di alcun tipo. Non siamo responsabili per danni, perdita di dati o problemi con gli account derivanti dal suo utilizzo."],
    },
    "third-party": {
      heading: "Servizi di terze parti",
      paragraph: ["Paguro mostra siti web come WhatsApp, Gmail e Slack. L’uso di questi servizi è regolato dalle loro condizioni e informative sulla privacy, non dalle nostre. Paguro non è affiliato a questi servizi né da essi approvato."],
    },
    data: {
      heading: "I tuoi dati",
      paragraph: [
        "Paguro non ha account propri né telemetria dell’app. Sessioni e impostazioni restano sul tuo Mac. Per i dettagli, consulta la nostra ",
        { kind: "privacy", text: "Informativa sulla privacy" },
        ".",
      ],
    },
    changes: {
      heading: "Modifiche",
      paragraph: ["Possiamo aggiornare queste condizioni; le modifiche vengono pubblicate su questa pagina."],
    },
    contact: {
      heading: "Contatti",
      paragraph: ["Domande: ", { kind: "email" }],
    },
  },
};
