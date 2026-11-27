export const oboloCopy = {
  name: "Obolo",
  category: "Subscription Tracker",
  tagline: "See what you spend each month and which payment comes next.",
  seoTitle: "Obolo — Subscription Tracker for macOS",
  description: "Obolo is an open-source subscription tracker for Mac. See monthly and yearly spending, plan for upcoming renewals, and keep a history of price changes.",
  nav: "Explore Obolo",
  privacy: {
    link: "Privacy policy",
    back: "Back to Obolo",
    effective: "Last updated {date}.",
  },
  terms: {
    link: "Terms of use",
    updated: "Last updated: {date}",
  },
  download: "Download",
  requirements: "macOS {version}+ · Apple silicon and Intel",
  hero: {
    shotsLabel: "Obolo screenshots",
    shots: {
      dashboard: { label: "Overview", alt: "Obolo’s dashboard with sample subscriptions, showing €129.41 in monthly spending, a category breakdown, and €23.40 left to pay in August." },
      months: { label: "Months", alt: "Obolo’s month-by-month spending chart, with August 2026 selected and €35.39 in charges." },
      subscriptions: { label: "Subscriptions", alt: "A ring chart and spending breakdown for nine active subscriptions in Obolo." },
      calendar: { label: "Calendar", alt: "Obolo’s August 2026 calendar showing renewal dates for Dropbox, Netflix, and Spotify." },
      list: { label: "List", alt: "Obolo’s list of nine active subscriptions with renewal dates, billing amounts, and monthly costs." },
      detail: { label: "Detail", alt: "A subscription in Obolo showing the next payment, total spent, and a chart of payments and price changes." },
    },
    title: "Subscriptions,",
    accent: "stacked and sorted.",
    download: "Download for Mac",
    body: "Obolo is a simple subscription tracker for Mac with pretty charts. See where your money goes and how prices change over time.",
  },
  story: {
    title: "See where your money goes",
    body: "Compare recurring costs across months, categories, and individual subscriptions. The monthly view shows when annual renewals make a month more expensive.",
  },
  features: [
    { id: "spending", title: "Monthly and yearly totals", body: "See how much goes to software, streaming, or any category you track. Switch to Subscriptions to see what each service contributes." },
    { id: "calendar", title: "Renewals on your calendar", body: "Pick a day to see what’s due, set a reminder, or add payments to Apple Calendar. Keep the next payment in your Mac’s menu bar." },
    { id: "history", title: "A record of price changes", body: "Log a price change when it takes effect. Your payment history keeps the original amount and currency." },
    { id: "currencies", title: "Multiple currencies, one total", body: "Keep each subscription in its original currency and compare spending in the currency you choose. Obolo shows you when an exchange rate is missing." },
  ],
  faqTitle: "A few things to know",
  faq: [
    { id: "availability", question: "How do I install Obolo?", answer: "Download Obolo using the button above, open the disk image, and drag Obolo into Applications. It runs on Apple silicon and Intel Macs with macOS 15 Sequoia or later." },
    { id: "open-source", question: "Is Obolo open source?", answer: "Yes. The source is available on GitHub under the MIT license." },
    { id: "data-and-sync", question: "Where does Obolo keep my subscription data?", answer: "Obolo saves your library on your Mac. You can turn on iCloud sync to use the same library across your Macs. Obolo requires no account of its own and collects no telemetry." },
    { id: "import-export", question: "Can I bring in my existing subscriptions?", answer: "Yes. Drop a CSV onto the Obolo window and review the import preview before adding anything. You can also export a CSV or save a JSON backup of your library and settings." },
    { id: "shortcuts", question: "Does Obolo work with Apple Shortcuts?", answer: "Yes. Use Shortcuts to show your next renewal, open upcoming subscriptions, or add a subscription." },
  ],
  related: {
    label: "Also from Anguria Studio",
    paguro: "A native home for your web apps.",
    moppo: "A Mac cleaner built for developers.",
  },
};

export type OboloCopy = typeof oboloCopy;
