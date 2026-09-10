import type { PaguroPrivacyPolicy } from "../paguro-policy";

/**
 * Traduzione dell’originale inglese (./en.ts), che resta il testo di
 * riferimento: stessa struttura, stesso numero di paragrafi per sezione.
 *
 * È un testo legale, quindi la fedeltà viene prima della scorrevolezza: ogni
 * negazione e ogni riserva ("non garantiscono", "può essere ritentata", "non
 * garantisce") è voluta e deve sopravvivere alle modifiche.
 */
export const policy: PaguroPrivacyPolicy = {
  title: "Informativa sulla privacy di Paguro",
  description:
    "Come Paguro tratta i tuoi dati. Spazi di lavoro, sessioni e impostazioni restano sul tuo Mac; nessun account Paguro, sincronizzazione cloud o telemetria.",
  intro: [
    "Paguro è un’app gratuita e open source per macOS di Anguria Studio. Riunisce siti e servizi web in spazi di lavoro sul tuo Mac. Questa informativa riguarda l’app Paguro. I siti che apri hanno le proprie informative sulla privacy.",
  ],
  sections: {
    local: {
      heading: "Dati sul tuo Mac",
      blocks: [
        "Paguro conserva in locale i nomi degli spazi di lavoro, gli indirizzi dei servizi, le etichette degli account, le preferenze e le icone nella cache. Ogni account di un servizio ha un archivio dati WebKit separato per cookie, dati dei siti e dati di sessione. Paguro non gestisce un servizio di account o di sincronizzazione cloud per queste informazioni e non invia telemetria dell’app ad Anguria Studio.",
        "Accedi direttamente a ciascun sito. Paguro non mantiene un proprio database delle password dei tuoi account. I cookie dei siti e i token di sessione possono tenerti connesso, quindi i dati di sessione locali vanno comunque trattati come sensibili.",
      ],
    },
    network: {
      heading: "Siti e richieste di rete",
      blocks: [
        "I siti che apri si collegano ai loro fornitori. Quei fornitori ricevono informazioni di rete, come il tuo indirizzo IP, e le informazioni che invii o condividi attraverso i loro servizi. Possono usare cookie, analitiche o altri sistemi di tracciamento secondo le proprie informative. Le opzioni di blocco dei contenuti di Paguro non garantiscono che ogni tracciamento venga bloccato.",
        "Paguro scarica dai siti le icone dei servizi e le mette in cache sul tuo Mac. Queste richieste possono rivelare il tuo indirizzo IP e l’indirizzo richiesto al sito o a chi ospita la sua icona.",
        "La versione Mac App Store non include la ricerca delle icone tramite Google.",
        "Nella versione a download diretto, una ricerca opzionale delle icone tramite Google è disattivata per impostazione predefinita. Se la attivi e Paguro non riesce a trovare un’icona direttamente, può inviare il nome host del servizio al servizio favicon di Google. Google riceve anche la richiesta di rete, incluso il tuo indirizzo IP. Paguro filtra i nomi host probabilmente privati prima di ricorrere a questo ripiego; il filtro non garantisce che ogni indirizzo privato possa essere riconosciuto. Puoi disattivare questa opzione in Impostazioni → Privacy.",
      ],
    },
    permissions: {
      heading: "Notifiche e permessi",
      blocks: [
        "Paguro può leggere i segnali di notifica di un servizio e mostrare il testo delle notifiche nelle notifiche di macOS o nell’isola opzionale. Paguro non invia questo testo ad Anguria Studio. L’isola tiene in memoria il proprio elenco di notifiche; macOS gestisce le notifiche consegnate al Centro Notifiche.",
        "Bloccare Paguro impedisce la presentazione di nuove notifiche. Non ti disconnette dai siti e non interrompe tutta l’attività dei siti in background. Chiudi Paguro per interrompere le sue sessioni web e il controllo delle notifiche.",
        "L’accesso a fotocamera e microfono viene usato quando consenti a un sito di usare quei dispositivi. È il sito a gestire i contenuti multimediali che condividi. Paguro usa l’autenticazione di macOS per il blocco dell’app; non riceve la tua impronta digitale né la password di accesso del tuo Mac.",
        "I file che scegli di caricare vengono condivisi con il sito selezionato. I download vengono salvati sul tuo Mac. Questi file restano soggetti alle pratiche sui dati del sito stesso.",
      ],
    },
    export: {
      heading: "Esportazione della configurazione ed eliminazione",
      blocks: [
        "L’esportazione della configurazione salva spazi di lavoro, servizi e preferenze trasferibili in un file che scegli tu. Esclude le sessioni di accesso. Un’esportazione può comunque contenere indirizzi di servizi privati ed etichette degli account; condividila solo con le persone a cui vuoi far arrivare quelle informazioni. Paguro non carica questo file per te.",
        "L’eliminazione da Paguro di un account di un servizio programma la rimozione dei suoi dati di sessione WebKit locali. Rimuovere solo il collegamento a uno spazio di lavoro non elimina un account ancora usato altrove. La pulizia locale può essere ritentata se WebKit è occupato. Eliminare un account in Paguro non elimina il tuo account o le informazioni conservate dal fornitore del sito. Per questo usa i controlli del fornitore.",
        "I file di configurazione esportati, i file scaricati, le notifiche di macOS e i backup di sistema sono separati dall’archivio dati del servizio. Gestisci quelle copie con l’app corrispondente o con i controlli di macOS.",
      ],
    },
    updates: {
      heading: "Aggiornamenti dell’app",
      blocks: [
        "La versione Mac App Store usa il sistema di aggiornamento di Apple e non include Sparkle né contatta il feed di aggiornamento a download diretto di Paguro.",
        "La versione a download diretto usa Sparkle per controllare gli aggiornamenti ospitati su GitHub. I controlli e i download degli aggiornamenti effettuano richieste di rete a GitHub e alla sua infrastruttura di distribuzione. Paguro disattiva l’invio opzionale del profilo di sistema di Sparkle. I controlli automatici degli aggiornamenti si possono gestire nelle impostazioni Informazioni dell’app.",
      ],
    },
    contact: {
      heading: "Contatti e modifiche",
      blocks: [
        {
          kind: "p",
          runs: [
            "Per domande sulla privacy, scrivi a ",
            { kind: "email" },
            ". Se ci contatti, scegli tu quali informazioni includere. Non inviare password, token di accesso o contenuti privati delle notifiche. Le issue pubbliche su GitHub possono essere lette da altri.",
          ],
        },
        "Aggiorneremo questa pagina quando cambierà il trattamento dei dati dell’app e indicheremo qui la data di entrata in vigore corrente.",
      ],
    },
  },
};
