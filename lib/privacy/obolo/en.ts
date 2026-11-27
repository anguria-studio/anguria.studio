import type { OboloPrivacyPolicy } from "../obolo-policy";

export const policy: OboloPrivacyPolicy = {
  title: "Obolo privacy policy",
  description: "How Obolo stores your subscription data, uses optional iCloud and calendar sync, and requests website logos, exchange rates and app updates.",
  intro: [
    "Obolo is a macOS subscription tracker from Anguria Studio. Your library starts on your Mac. Obolo requires no Obolo account and sends no analytics or crash reports to Anguria Studio. Anguria Studio does not use Obolo data for advertising, tracking or sale.",
  ],
  sections: {
    "on-your-mac": {
      heading: "On your Mac",
      blocks: [
        "Obolo stores the subscriptions and categories you enter or import, along with their prices, renewal dates, notes, links and payment method labels. It also stores logo images, exchange rates and preferences. It tracks the information you enter without connecting to payment accounts or processing payments.",
        { kind: "p", runs: [
          "Obolo schedules renewal notifications on your Mac. They can show the subscription name and amount. When you run ",
          { kind: "strong", text: "Show Next Renewal" },
          " in Shortcuts, it returns the name, renewal date and amount to your shortcut.",
        ] },
        { kind: "p", runs: [
          "Turn on ",
          { kind: "strong", text: "Add payments to a calendar" },
          " in ",
          { kind: "strong", text: "Settings → Reminders" },
          " to write renewal events to your chosen calendar. Obolo requests full Calendar access so it can update and remove its events later. The events include the subscription name, amount and currency, dates, recurrence, notes and any alerts you set. Your calendar provider and people who share that calendar may see those details even if Obolo’s iCloud sync is off. Use ",
          { kind: "strong", text: "Remove calendar reminders" },
          " in the same pane to remove Obolo’s events and turn calendar sync off. You can also manage calendar and notification permissions in macOS System Settings.",
        ] },
        { kind: "p", runs: [
          "Obolo reads CSVs and backup files you choose on your Mac. In ",
          { kind: "strong", text: "Settings → Data" },
          ", you can export a CSV or save a JSON backup to a location you choose. A JSON backup excludes logo images. Your exports and backups are separate copies that you can manage in Finder.",
        ] },
      ],
    },
    "icloud-sync": {
      heading: "Optional iCloud sync",
      blocks: [
        { kind: "p", runs: [
          { kind: "strong", text: "Sync with iCloud" },
          " starts off on each Mac. Turn it on in ",
          { kind: "strong", text: "Settings → Data" },
          " to sync your library between Macs using the same Apple Account. Before the first merge, Obolo makes a local safety backup.",
        ] },
        "Obolo uses Apple’s CloudKit to store this data in your private iCloud database:",
        { kind: "ul", items: [
          "Subscription details, including prices and price history, renewal and reminder details, payment method labels, notes and links",
          "Categories and subscription logo images, including images you choose yourself",
          "Manual exchange rates, your base currency and your default reminder lead time",
        ] },
        { kind: "p", runs: [
          "Obolo also uses an iCloud account identifier on your Mac to detect account changes. Appearance, launch settings, notification time, calendar selection, automatic exchange rates, dark logo variants and backup files stay outside Obolo’s iCloud sync. Anguria Studio cannot view the records in your private database. Apple handles iCloud storage under its ",
          { kind: "link", text: "privacy policy", href: "https://www.apple.com/legal/privacy/" },
          ".",
        ] },
        { kind: "p", runs: [
          "Turning ",
          { kind: "strong", text: "Sync with iCloud" },
          " off stops Obolo’s sync on that Mac. Your local library and the records already in iCloud remain. Other Macs with sync on can continue syncing. If you turn sync back on, Obolo can merge the retained iCloud records with your local library.",
        ] },
      ],
    },
    "network-requests": {
      heading: "Logo and exchange-rate requests",
      blocks: [
        { kind: "p", runs: [
          { kind: "strong", text: "Website icons in both editions." },
          " Obolo starts at the home page of the domain in the subscription’s Website field. If that field is empty, it uses the host from the management link. It follows redirects, looks for icon links in the page, and tries common icon paths such as ",
          { kind: "code", text: "/favicon.ico" },
          ". The website can direct Obolo to another host, such as its content delivery network. Those hosts can see your IP address, the requested address and standard request headers. Obolo makes cookie-free requests directly from your Mac. Anguria Studio receives no copy of your icon requests. Obolo reads the page and icon files without running the site’s scripts.",
        ] },
        { kind: "p", runs: [
          "Obolo can fetch a logo when you save a subscription in logo mode, use ",
          { kind: "strong", text: "Fetch logos" },
          ", or leave ",
          { kind: "strong", text: "Fetch logos after import" },
          " selected. For an existing or newly synced logo, it may also check the site for a dark version. A host name can include a subdomain specific to your organization. The sites that receive these requests apply their own privacy policies and may keep server logs. To avoid website icon requests for a subscription, leave its website and management link empty.",
        ] },
        { kind: "p", runs: [
          { kind: "strong", text: "Google icon lookup in the direct-download edition." },
          " If the site’s icon is missing or small, the direct edition can also send Google the service domain and requested icon size. Google receives normal connection information, including your IP address. This fallback starts on. Turn it off in ",
          { kind: "strong", text: "Settings → General → Look up missing logos with Google" },
          " to use website icons alone. The Mac App Store edition uses the website lookup described above and has no Google fallback. ",
          { kind: "link", text: "Google’s privacy policy", href: "https://policies.google.com/privacy" },
        ] },
        { kind: "p", runs: [
          { kind: "strong", text: "Exchange rates." },
          " Automatic rate updates are on by default. When Obolo needs an exchange rate, it sends the base and target currency codes to Frankfurter. The service says it keeps no IP address or request URL logs. Turn off ",
          { kind: "strong", text: "Update rates automatically" },
          " in ",
          { kind: "strong", text: "Settings → Currencies" },
          " to stop requests. You can enter rates by hand. ",
          { kind: "link", text: "Frankfurter’s privacy information", href: "https://frankfurter.dev/#faq" },
        ] },
      ],
    },
    "retention-and-deletion": {
      heading: "Retention and deletion",
      blocks: [
        { kind: "p", runs: [
          "You can delete individual subscriptions in Obolo. With iCloud sync on, changes and deletions sync when your Mac connects. For the local library and its supporting files, ",
          { kind: "strong", text: "Settings → Data → Stored at" },
          " shows the file location in Finder. Quit Obolo before removing that local data. Safety backups and copies you exported or saved separately remain until you remove them.",
        ] },
        { kind: "p", runs: [
          "Deleting the app or turning off sync leaves the iCloud copy in place. To check whether macOS offers to remove Obolo’s iCloud data, open ",
          { kind: "strong", text: "System Settings" },
          ", click your name, then ",
          { kind: "strong", text: "iCloud → Manage" },
          ". Save any copy you want to keep and turn off sync on your Macs before removing the iCloud data. Apple explains the options in ",
          { kind: "link", text: "Manage iCloud storage on Mac", href: "https://support.apple.com/guide/mac-help/manage-icloud-storage-mh36833/mac" },
          ".",
        ] },
      ],
    },
    "contact": {
      heading: "App updates and contact",
      blocks: [
        { kind: "p", runs: [
          "Apple handles app updates for the Mac App Store edition. The direct-download edition contacts GitHub to check for updates and download them. GitHub receives normal request information such as the IP address. You can turn off automatic update checks in ",
          { kind: "strong", text: "Settings → Updates" },
          ". ",
          { kind: "link", text: "GitHub Privacy Statement", href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" },
        ] },
        { kind: "p", runs: [
          "For privacy or deletion requests, email Anguria Studio at ",
          { kind: "email" },
          ". We use the information you choose to send to handle your request.",
        ] },
      ],
    },
  },
};
