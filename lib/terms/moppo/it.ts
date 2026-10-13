import type { MoppoTerms } from "../moppo-terms";

export const terms: MoppoTerms = {
  title: "Condizioni d’uso di Moppo",
  description: "Condizioni d’uso di Moppo, l’app gratuita e open source per pulire il Mac. Licenza MIT, pulizia e recupero, garanzia, servizi esterni e dati.",
  sections: {
    software: {
      heading: "Il software",
      paragraph: ["Moppo è un software gratuito e open source di Anguria Studio, distribuito con ", { kind: "license", text: "Licenza MIT" }, ". La licenza completa è nel repository GitHub e disciplina l’uso, la copia e la modifica del codice."],
    },
    cleanup: {
      heading: "Pulizia e recupero",
      paragraph: ["Esamina gli elementi selezionati per la rimozione e conserva backup dei dati importanti. La normale pulizia dei file sposta gli elementi nel Cestino. Put Back richiede un registro della rimozione salvato e che l’elemento sia ancora nel Cestino; non può ripristinare pacchetti rimossi da Homebrew o immagini Docker. Svuotare il Cestino ne elimina definitivamente il contenuto. La rimozione delle foto avviene tramite Foto e può interessare altri dispositivi attraverso Foto di iCloud; il recupero si gestisce in Foto. Le dimensioni indicate per la pulizia sono stime e non garantiscono quanto spazio verrà recuperato."],
    },
    warranty: {
      heading: "Nessuna garanzia",
      paragraph: ["Moppo è fornito «così com’è», senza garanzie di alcun tipo. Si applicano le esclusioni di garanzia e le limitazioni di responsabilità della Licenza MIT. I controlli di pulizia e le funzioni di recupero non garantiscono che non possa verificarsi una perdita di dati."],
    },
    "third-party": {
      heading: "Servizi esterni",
      paragraph: ["Le funzioni che usano Foto, iCloud, Homebrew, Docker o il servizio di aggiornamento sono soggette alle condizioni e impostazioni di questi servizi. Moppo non è affiliato a tali fornitori né da essi approvato."],
    },
    data: {
      heading: "I tuoi dati",
      paragraph: ["Moppo non ha un servizio di account né telemetria dell’app. Registri delle scansioni, impostazioni e cronologia della pulizia restano sul Mac. I controlli facoltativi degli aggiornamenti e i servizi esterni possono effettuare richieste di rete. Consulta la nostra ", { kind: "privacy", text: "Informativa sulla privacy" }, " per i dettagli."],
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
