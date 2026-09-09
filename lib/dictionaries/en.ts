import type { AppSlug } from "../apps";
import type { FeatureId } from "../features";

export type AppCopy = {
  name: string;
  /** Two or three words. The line under the app name on the home showcase. */
  category: string;
  /** Alt text for the home-page screenshot. */
  shotAlt: string;
  /** One short line. Used on the home card and as the app-page subtitle. */
  tagline: string;
  /** One paragraph. App page only. */
  description: string;
  /** Exactly three, for layout balance. */
  features: { title: string; body: string }[];
};

/**
 * English is the source language and the single source of truth for the
 * `Dictionary` type — every other locale file is typed against it, so a
 * missing translation is a compile error.
 *
 * Every provisional string is marked `TODO(copy)`. To see what is still
 * unwritten: `grep -rn "TODO(copy)" lib/dictionaries`
 */
export const dictionary = {
  meta: {
    title: "Anguria Studio — Free, open-source apps for macOS",
    description:
      "Three small, free, open-source utilities for your Mac: Obolo, Scolo and Paguro.",
  },
  nav: {
    home: "Anguria Studio",
    github: "View on GitHub",
  },
  themeToggle: {
    /** Prefix for the button's accessible label, e.g. "Theme: System". */
    label: "Theme",
    system: "System",
    light: "Light",
    dark: "Dark",
  },
  hero: {
    // TODO(copy): the one line that sells the whole studio.
    title: "Small Mac apps, made with care.",
    // TODO(copy)
    titleAccent: "care",
    // TODO(copy)
    subtitle:
      "Three utilities that do one thing each, stay out of your way, and cost nothing. No accounts, no telemetry, no subscriptions — just open source.",
  },
  apps: {
    obolo: {
      name: "Obolo",
      category: "Subscription tracker",
      shotAlt:
        "The Obolo window on a Mac desktop, showing a month of subscriptions and what they cost.",
      tagline: "Subscription Tracking",
      // TODO(copy)
      description:
        "Simple and intuitive way to keep an eye on your recurring expanses",
      features: [
        // TODO(copy): three real features.
        {
          title: "Native",
          body: "Written in Swift. Fast, tiny, and gentle on your battery.",
        },
        {
          title: "Private",
          body: "Nothing leaves your Mac. No accounts, no analytics, no phoning home.",
        },
        {
          title: "Open source",
          body: "Every line is on GitHub. Read it, fork it, send a patch.",
        },
      ],
    },
    scolo: {
      name: "Scolo",
      category: "Mac cleaner",
      shotAlt:
        "The Scolo window on a Mac desktop, showing how much disk space can be reclaimed.",
      tagline: "Mac Cleaner",
      description: "Remove files safely. Clearly tell useful and useless apart",
      features: [
        // TODO(copy)
        {
          title: "Native",
          body: "Written in Swift. Fast, tiny, and gentle on your battery.",
        },
        {
          title: "Private",
          body: "Nothing leaves your Mac. No accounts, no analytics, no phoning home.",
        },
        {
          title: "Open source",
          body: "Every line is on GitHub. Read it, fork it, send a patch.",
        },
      ],
    },
    paguro: {
      name: "Paguro",
      category: "Web app workspace",
      shotAlt: "The Paguro window on a Mac desktop, showing web apps grouped in a sidebar.",
      tagline: "Native workspace for web apps",
      description: "Bring your messages, mail, and everyday web tools together in one native Mac workspace.",
      features: [
        {
          title: "Workspaces",
          body: "Organise services for work and personal use in one window."
        },
        {
          title: "Separate accounts",
          body: "Keep each account’s login session separate and stored on your Mac."
        },
        {
          title: "Notifications",
          body: "Choose macOS notifications or the optional notification island."
        }
      ]
    },
  } satisfies Record<AppSlug, AppCopy>,
  home: {
    hero: {
      title: "Free open source apps for your Mac",
      /** Rendered in the accent colour, with the Apple glyph in front of it. */
      titleAccent: "Mac",
    },
    statement: {
      line1: "Three utilities that do one thing each.",
      line2: "No subscriptions, no accounts, yours to keep.",
      accent: "No subscriptions",
    },
    /**
     * Keyed by FeatureId, not an array: the Record makes a missing or misspelt
     * feature a compile error in every translation, and keeps the grid's order
     * out of the dictionaries (that lives in lib/features.ts). Short labels
     * only — the grid is icon + label, with no body text.
     */
    features: {
      swift: "Crafted for macOS",
      glass: "Liquid Glass look",
      privacy: "Private by default",
      custom: "Customisable",
      speed: "Performant",
      source: "Open source",
    } satisfies Record<FeatureId, string>,
    /** Accessible name for the Dock-style row of app icons; never shown. */
    dockLabel: "Our apps",
  },
  paguroHero: {
    previewTheme: "Preview appearance",
    previewLight: "Light preview",
    previewDark: "Dark preview",

    title: "Give your apps",
    accent: "a home.",
    intro: "A native workspace for your web apps.",
    eyebrow: "Paguro for macOS",
    tryLabel: "Go on. Send yourself something.",
    tryHint: "Pick an app. Watch the notch.",
    demoLabel: "Notification playground",
    open: "Open notifications",
    collapse: "Collapse notifications",
    clear: "Clear all",
    dismiss: "Dismiss notification",
    empty: "All caught up.",
    emptyHint: "A little peace and quiet.",
    now: "now",
    notificationCount: "{count} notifications",
    sent: "New {service} notification: {message}",
    cleared: "All notifications cleared.",
    removed: "Notification dismissed.",
    sidebar: "Room to organise",
    compact: "Room to focus",
    layoutLabel: "Compare app layouts",
    captureAlt: "Paguro with Personal and Work workspaces and ChatGPT open, signed out.",
    compactAlt: "Paguro with its compact service rail and ChatGPT open, signed out.",
    captureNote: "One app. A little more room for everything.",
    demoNote: "Send a few. Hover the notch to see them all.",
    slackTitle: "Studio",
    slackMessage: "The designs are ready.",
    whatsappTitle: "The dinner crew",
    whatsappMessage: "Pizza at eight?",
    gmailTitle: "A little getaway",
    gmailMessage: "Your weekend plans have arrived.",
    back: "All apps"
  },
  paguroPage: {
    nav: "Explore Paguro",
    faqLabel: "Questions",
    get: "Get Paguro",
    faqTitle: "A few things to know.",
    faq: [
      {
        question: "Is Paguro really free?",
        answer: "Yes. Paguro is free and open source, with no paid feature tiers. The websites you use may require their own accounts or subscriptions."
      },
      {
        question: "Which services can I use?",
        answer: "Choose from the service catalog or add a website by URL. Most web services work as they do in a browser, but some providers restrict embedded browsers. Passkey sign-in is not currently supported; use another sign-in method where available."
      },
      {
        question: "Do I need a Mac with a notch?",
        answer: "No. Workspaces, services, and macOS notifications work without one. The notification island is an optional feature for compatible notched displays."
      },
      {
        question: "Does it sync my logins between Macs?",
        answer: "No. Each account has its own local session. Configuration export moves your setup, not cookies or login sessions, so you sign in separately on each Mac."
      },
      {
        question: "What happens when I close the window?",
        answer: "Closing the window keeps Paguro available in the menu bar. Services can continue running and showing notifications. Command-Q quits the app and stops its activity."
      }
    ],
    releaseTitle: "Make yourself at home.",
    releaseBody: "Free and open source. Made for your Mac.",
    releaseStatus: "The first public release is coming soon.",
    contact: "Ask a question",
    source: "View on GitHub",
    credits: "A free, open-source fork of Chorus by Nico Jan.",
    requirements: "macOS 15 or later · Apple silicon and Intel",
    requirementsQuestion: "Which Macs are supported?",
    story: {
      title: "Work. Life. Everything in between.",
      body: "Give each part of your day its own workspace. Keep all your accounts signed in, with a separate session for each one.",
      services: "Familiar faces. All welcome.",
      serviceNote: "Pick from the catalog, or bring a website of your own.",
      features: [
        {
          title: "A place for every account.",
          body: "Work Gmail. Personal Gmail. Keep both open without signing in and out. Group your services into workspaces that make sense to you."
        },
        {
          title: "Step away. Close the door.",
          body: "Lock Paguro with Touch ID or your Mac password. Your services and new notifications stay out of view until you return."
        },
        {
          title: "New Mac. Same home.",
          body: "Take your workspaces, services, and preferences with you. Export your setup and import it on another Mac; sign in separately there."
        }
      ],
      trademarks: "Service names and logos belong to their respective owners."
    }
  },

  appPage: {
    download: "Download for macOS",
    /** `{version}` is replaced with the app's `minMacOS` at render time. */
    requirements: "Requires macOS {version} or later. Free and open source.",
    viewSource: "View source on GitHub",
    back: "All apps",
    featuresHeading: "What it does",
  },
  contact: {
    issues: "Found a bug? Open an issue on GitHub.",
    /** Exact substring of `issues`, rendered as the link. */
    issuesLink: "Open an issue on GitHub",
    /** `{email}` is replaced with the linked address at render time. */
    email: "Anything else: {email}.",
  },
  footer: {
    rights: "Free and open source, forever.",
  },
};

export type Dictionary = typeof dictionary;
