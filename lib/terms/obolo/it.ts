import type { OboloTerms } from "../obolo-terms";

export const terms: OboloTerms = {
  title: "Condizioni d’uso di Obolo",
  description: "Condizioni d’uso di Obolo, l’app per macOS di Anguria Studio per tenere traccia degli abbonamenti. Licenza MIT, stime di spesa, servizi esterni e dati.",
  sections: {
    software: {
      heading: "Licenza del software",
      paragraph: [
        "Obolo è un software gratuito e open source di Anguria Studio. Il codice sorgente è disponibile con la ",
        { kind: "license", text: "licenza MIT" },
        ". La licenza spiega quali diritti hai di usare, copiare, modificare e distribuire il software e stabilisce le esclusioni di garanzia e i limiti di responsabilità.",
      ],
    },
    tracking: {
      heading: "Monitoraggio degli abbonamenti",
      paragraph: ["Obolo tiene traccia degli abbonamenti che inserisci o importi. Stima la spesa e i prossimi rinnovi in base ai tuoi dati e ai tassi di cambio. I fornitori dei tuoi abbonamenti gestiscono gli addebiti e le disdette. Verifica con ciascun fornitore gli importi effettivamente addebitati, le date di rinnovo e lo stato delle disdette."],
    },
    "third-party": {
      heading: "Servizi esterni",
      paragraph: ["Funzioni come la sincronizzazione con iCloud, l’integrazione con il calendario, la ricerca dei loghi e l’aggiornamento dei tassi di cambio possono usare servizi di terze parti. A questi servizi si applicano le rispettive condizioni e informative sulla privacy."],
    },
    data: {
      heading: "I tuoi dati",
      paragraph: ["La libreria degli abbonamenti viene salvata sul tuo Mac. Consulta l’", { kind: "privacy", text: "informativa sulla privacy" }, " per i dettagli sulla sincronizzazione facoltativa, le richieste a servizi esterni, i backup e l’eliminazione dei dati."],
    },
    contact: {
      heading: "Modifiche e contatti",
      paragraph: ["Pubblichiamo su questa pagina gli aggiornamenti a queste condizioni. Per domande, scrivi a ", { kind: "email" }, "."],
    },
  },
};
