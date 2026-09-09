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
      category: "Web wrapper",
      shotAlt:
        "The Paguro window on a Mac desktop, showing web apps grouped in a sidebar.",
      tagline: "Native workspace for web apps",
      // TODO(copy)
      description:
        "Your web apps into one focused, beautifully native workspace",
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
