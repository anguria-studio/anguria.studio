import type { OboloPrivacyPolicy } from "../obolo-policy";

export const policy: OboloPrivacyPolicy = {
  title: "Informativa sulla privacy di Obolo",
  description: "Come Obolo conserva i dati degli abbonamenti, usa la sincronizzazione facoltativa con iCloud e con il calendario e richiede loghi, tassi di cambio e aggiornamenti.",
  intro: [
    "Obolo è un’app di Anguria Studio per tenere traccia degli abbonamenti su macOS. La tua libreria viene creata sul tuo Mac. Obolo non richiede un account Obolo e non invia ad Anguria Studio dati di analisi né rapporti sugli arresti anomali. Anguria Studio non usa i dati di Obolo per pubblicità o tracciamento e non li vende.",
  ],
  sections: {
    "on-your-mac": {
      heading: "Sul tuo Mac",
      blocks: [
        "Obolo conserva gli abbonamenti e le categorie che inserisci o importi, insieme a prezzi, date di rinnovo, note, link ed etichette dei metodi di pagamento. Conserva anche le immagini dei loghi, i tassi di cambio e le preferenze. Tiene traccia delle informazioni che inserisci senza collegarsi a conti di pagamento né elaborare pagamenti.",
        { kind: "p", runs: [
          "Obolo programma sul tuo Mac notifiche per i rinnovi. Le notifiche possono mostrare il nome dell’abbonamento e l’importo. Quando esegui ",
          { kind: "strong", text: "Show Next Renewal" },
          " in Comandi Rapidi, Obolo restituisce al tuo comando rapido il nome, la data di rinnovo e l’importo.",
        ] },
        { kind: "p", runs: [
          "Attiva ",
          { kind: "strong", text: "Add payments to a calendar" },
          " in ",
          { kind: "strong", text: "Settings → Reminders" },
          " per aggiungere gli eventi di rinnovo al calendario che hai scelto. Obolo richiede l’accesso completo a Calendario per poter aggiornare e rimuovere in seguito gli eventi che ha creato. Gli eventi includono il nome dell’abbonamento, l’importo e la valuta, le date, la frequenza di ripetizione, le note e gli eventuali avvisi che hai impostato. Il fornitore del servizio di calendario e le persone con cui condividi il calendario possono vedere questi dettagli anche se la sincronizzazione di Obolo con iCloud è disattivata. Usa ",
          { kind: "strong", text: "Remove calendar reminders" },
          " nello stesso pannello per rimuovere gli eventi di Obolo e disattivare la sincronizzazione con il calendario. Puoi anche gestire le autorizzazioni del calendario e delle notifiche nelle Impostazioni di Sistema di macOS.",
        ] },
        { kind: "p", runs: [
          "Obolo legge i file CSV e i backup che scegli sul tuo Mac. In ",
          { kind: "strong", text: "Settings → Data" },
          " puoi esportare un CSV o salvare un backup JSON nella posizione che preferisci. Il backup JSON non include le immagini dei loghi. Le esportazioni e i backup sono copie separate che puoi gestire nel Finder.",
        ] },
      ],
    },
    "icloud-sync": {
      heading: "Sincronizzazione facoltativa con iCloud",
      blocks: [
        { kind: "p", runs: [
          { kind: "strong", text: "Sync with iCloud" },
          " è inizialmente disattivata su ogni Mac. Attivala in ",
          { kind: "strong", text: "Settings → Data" },
          " per sincronizzare la libreria tra Mac che usano lo stesso Apple Account. Prima della prima unione dei dati, Obolo crea una copia di sicurezza locale.",
        ] },
        "Obolo usa CloudKit di Apple per conservare questi dati nel tuo database privato di iCloud:",
        { kind: "ul", items: [
          "Dettagli degli abbonamenti, tra cui prezzi e storico dei prezzi, informazioni su rinnovi e promemoria, etichette dei metodi di pagamento, note e link",
          "Categorie e immagini dei loghi degli abbonamenti, comprese le immagini che scegli tu",
          "Tassi di cambio inseriti manualmente, valuta di base e anticipo predefinito dei promemoria",
        ] },
        { kind: "p", runs: [
          "Obolo usa anche un identificativo dell’account iCloud sul tuo Mac per rilevare i cambi di account. La sincronizzazione di Obolo con iCloud non include l’aspetto, le impostazioni di avvio, l’orario delle notifiche, la scelta del calendario, i tassi di cambio automatici, le varianti scure dei loghi e i file di backup. Anguria Studio non può vedere i dati nel tuo database privato. Apple gestisce l’archiviazione su iCloud secondo la propria ",
          { kind: "link", text: "informativa sulla privacy", href: "https://www.apple.com/legal/privacy/" },
          ".",
        ] },
        { kind: "p", runs: [
          "Disattivando ",
          { kind: "strong", text: "Sync with iCloud" },
          ", interrompi la sincronizzazione di Obolo su quel Mac. La libreria locale e i dati già presenti su iCloud restano disponibili. Gli altri Mac su cui la sincronizzazione è attiva possono continuare a sincronizzarsi. Se la riattivi, Obolo può unire i dati conservati su iCloud a quelli della libreria locale.",
        ] },
      ],
    },
    "network-requests": {
      heading: "Richieste di loghi e tassi di cambio",
      blocks: [
        { kind: "p", runs: [
          { kind: "strong", text: "Icone dei siti web in entrambe le edizioni." },
          " Obolo parte dalla pagina iniziale del dominio indicato nel campo Website dell’abbonamento. Se il campo è vuoto, usa il nome host del link di gestione. Segue i reindirizzamenti, cerca nella pagina i link alle icone e prova percorsi comuni come ",
          { kind: "code", text: "/favicon.ico" },
          ". Il sito può indirizzare Obolo a un altro host, per esempio a una rete di distribuzione dei contenuti. Questi host possono vedere il tuo indirizzo IP, l’indirizzo richiesto e le intestazioni standard della richiesta. Obolo invia le richieste direttamente dal tuo Mac senza usare cookie. Anguria Studio non ne riceve una copia. Obolo legge la pagina e i file delle icone senza eseguire gli script del sito.",
        ] },
        { kind: "p", runs: [
          "Obolo può recuperare un logo quando salvi un abbonamento in modalità logo, usi ",
          { kind: "strong", text: "Fetch logos" },
          " o lasci selezionata l’opzione ",
          { kind: "strong", text: "Fetch logos after import" },
          ". Per un logo già presente o appena sincronizzato, può anche cercare sul sito una variante scura. Il nome host può contenere un sottodominio specifico della tua organizzazione. I siti che ricevono queste richieste applicano le proprie informative sulla privacy e possono conservare registri del server. Per evitare richieste di icone per un abbonamento, lascia vuoti il campo del sito web e il link di gestione.",
        ] },
        { kind: "p", runs: [
          { kind: "strong", text: "Ricerca di icone con Google nell’edizione scaricata direttamente." },
          " Se l’icona del sito manca o è piccola, l’edizione scaricata direttamente può inviare a Google anche il dominio del servizio e le dimensioni dell’icona richiesta. Google riceve le normali informazioni di connessione, compreso il tuo indirizzo IP. Questa ricerca alternativa è attiva per impostazione predefinita. Disattivala in ",
          { kind: "strong", text: "Settings → General → Look up missing logos with Google" },
          " per usare soltanto le icone dei siti web. L’edizione del Mac App Store usa la ricerca diretta sul sito descritta sopra e non ricorre a Google. ",
          { kind: "link", text: "Informativa sulla privacy di Google", href: "https://policies.google.com/privacy" },
        ] },
        { kind: "p", runs: [
          { kind: "strong", text: "Tassi di cambio." },
          " Gli aggiornamenti automatici dei tassi sono attivi per impostazione predefinita. Quando serve un tasso di cambio, Obolo invia a Frankfurter i codici della valuta di base e della valuta di destinazione. Il servizio dichiara di non conservare registri degli indirizzi IP o degli URL richiesti. Disattiva ",
          { kind: "strong", text: "Update rates automatically" },
          " in ",
          { kind: "strong", text: "Settings → Currencies" },
          " per interrompere le richieste. Puoi inserire i tassi manualmente. ",
          { kind: "link", text: "Informazioni di Frankfurter sulla privacy", href: "https://frankfurter.dev/#faq" },
        ] },
      ],
    },
    "retention-and-deletion": {
      heading: "Conservazione ed eliminazione",
      blocks: [
        { kind: "p", runs: [
          "Puoi eliminare singoli abbonamenti in Obolo. Se la sincronizzazione con iCloud è attiva, le modifiche e le eliminazioni vengono sincronizzate quando il Mac si connette. Per trovare la libreria locale e i relativi file, usa ",
          { kind: "strong", text: "Settings → Data → Stored at" },
          " per mostrarne la posizione nel Finder. Chiudi Obolo prima di eliminare questi dati locali. Le copie di sicurezza e le copie che hai esportato o salvato separatamente restano finché non le rimuovi.",
        ] },
        { kind: "p", runs: [
          "Se elimini l’app o disattivi la sincronizzazione, la copia su iCloud rimane. Per verificare se macOS consente di rimuovere i dati di Obolo da iCloud, apri ",
          { kind: "strong", text: "Impostazioni di Sistema" },
          ", fai clic sul tuo nome, poi su ",
          { kind: "strong", text: "iCloud → Gestisci" },
          ". Salva le copie che vuoi tenere e disattiva la sincronizzazione sui tuoi Mac prima di rimuovere i dati da iCloud. Apple illustra le opzioni in ",
          { kind: "link", text: "Gestire lo spazio di archiviazione su iCloud sul Mac", href: "https://support.apple.com/guide/mac-help/manage-icloud-storage-mh36833/mac" },
          ".",
        ] },
      ],
    },
    "contact": {
      heading: "Aggiornamenti dell’app e contatti",
      blocks: [
        { kind: "p", runs: [
          "Apple gestisce gli aggiornamenti dell’edizione del Mac App Store. L’edizione scaricata direttamente contatta GitHub per verificare la disponibilità di aggiornamenti e scaricarli. GitHub riceve le normali informazioni della richiesta, come l’indirizzo IP. Puoi disattivare la verifica automatica degli aggiornamenti in ",
          { kind: "strong", text: "Settings → Updates" },
          ". ",
          { kind: "link", text: "Informativa sulla privacy di GitHub", href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" },
        ] },
        { kind: "p", runs: [
          "Per richieste relative alla privacy o all’eliminazione dei dati, scrivi ad Anguria Studio all’indirizzo ",
          { kind: "email" },
          ". Usiamo le informazioni che scegli di inviarci per gestire la tua richiesta.",
        ] },
      ],
    },
  },
};
