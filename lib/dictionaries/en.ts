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
    mobileCaptureAlt: "Paguro on a Mac desktop, with Claude open and web apps grouped into Personal and Work workspaces.",
    serviceOverlay: {
      services: "Preview services",
      personal: "Personal",
      work: "Work",
      expand: "Expand sidebar",
      collapse: "Collapse sidebar",
      captureAlt: "Paguro with WhatsApp open and its original translucent window over the desktop.",
    },
    previewTheme: "Preview appearance",
    previewSystem: "System preview",
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
    /** Twelve per service; the hero deals them from a shuffle bag, one per click. */
    samples: {
      slack: [
        { title: "Studio", message: "The designs are ready." },
        { title: "#general", message: "Coffee machine is fixed. Rejoice." },
        { title: "Marta", message: "Can you look at the PR?" },
        { title: "#design", message: "New icon set is in Figma." },
        { title: "Luca", message: "Standup moved to 10:15." },
        { title: "#random", message: "Who left the good snacks out?" },
        { title: "Studio", message: "Client loved the deck." },
        { title: "Giulia", message: "Pushed the fix, tests are green." },
        { title: "#releases", message: "v2.4 is out." },
        { title: "Marta", message: "Lunch?" },
        { title: "#design", message: "Shipping the new palette tomorrow." },
        { title: "Luca", message: "Thanks for the review!" },
      ],
      whatsapp: [
        { title: "The dinner crew", message: "Pizza at eight?" },
        { title: "Mum", message: "Call me when you’re free." },
        { title: "Sara", message: "Running five minutes late." },
        { title: "The dinner crew", message: "I’ll bring dessert." },
        { title: "Andrea", message: "Did you see the game last night?" },
        { title: "Family", message: "Sunday lunch at grandma’s." },
        { title: "Sara", message: "Sent you the photos." },
        { title: "Hiking group", message: "Saturday still on?" },
        { title: "Andrea", message: "Landed safe!" },
        { title: "Mum", message: "Don’t forget your umbrella." },
        { title: "The dinner crew", message: "Table’s booked." },
        { title: "Sara", message: "Happy birthday!" },
      ],
      gmail: [
        { title: "A little getaway", message: "Your weekend plans have arrived." },
        { title: "Your bookshop", message: "Your order has shipped." },
        { title: "Slow Sunday", message: "Five ideas for a slower week." },
        { title: "Your bank", message: "Your statement is ready." },
        { title: "Concert tickets", message: "Doors open at 7." },
        { title: "A little getaway", message: "Check-in opens tomorrow." },
        { title: "The library", message: "Your hold is ready for pickup." },
        { title: "Recipes weekly", message: "Lemon pasta for tonight." },
        { title: "Team calendar", message: "Invitation: design review." },
        { title: "Your bookshop", message: "A new title from an author you follow." },
        { title: "Weather", message: "Sunny weekend ahead." },
        { title: "A little getaway", message: "Pack light. It’s warm there." },
      ],
    },
  },
  paguroPage: {
    seoTitle: "Paguro — Free Web App Workspace for Mac",
    nav: "Explore Paguro",
    faqLabel: "Questions",
    appStore: "Get from App Store",
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
        question: "Do sleeping services still send notifications?",
        answer: "Fully hibernated services stop their live web activity, so new notifications may not arrive until you open them again. Keep messaging and email services awake if you need live notifications. You can set hibernation separately for each service."
      },
      {
        question: "What happens when I close the window?",
        answer: "Closing the window keeps Paguro available in the menu bar. Services can continue running and showing notifications. Command-Q quits the app and stops its activity."
      }
    ],
    releaseTitle: "Make yourself at home.",
    releaseBody: "Free and open source.",
    releaseStatus: "The first public release is coming soon.",
    contact: "Ask a question",
    github: "View on GitHub",
    download: "Download for macOS",
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
          title: "No extra account. No telemetry.",
          body: "Your setup and login sessions stay on your Mac. No Paguro account, cloud sync, or app telemetry. The services you use connect directly to their providers."
        }
      ]
    }
  },

  paguroPrivacy: {
    /** Link label wherever the policy is linked from: the Paguro page footer. */
    link: "Privacy policy",
    /** The line under the Paguro page's three features; the third is the privacy claim, this is its receipt. */
    read: "Read the Paguro privacy policy",
    /** The back link at the top of the policy. */
    back: "Back to Paguro",
    /** `{date}` is replaced with the localized effective date at render time. */
    effective: "Effective {date}",
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
    /** Year of first publication, hardcoded on purpose: a copyright year names
     *  when the work was published and does not tick — and a static export would
     *  only bake in the last build's year anyway. Widen to a range by hand. */
    copyright: "© 2026 Anguria Studio",
  },
};

export type Dictionary = typeof dictionary;
