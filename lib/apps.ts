/**
 * Non-translatable data about each app: URLs and versions. The icon artwork
 * lives in components/app-icon.tsx.
 * All user-facing copy (name, tagline, description, features) lives in the
 * dictionaries so it can be translated — see lib/dictionaries/en.ts.
 */
export const appSlugs = ["obolo", "scolo", "blatta"] as const;
export type AppSlug = (typeof appSlugs)[number];

export type AppMeta = {
  slug: AppSlug;
  github: string;
  download: string;
  /** Minimum macOS version, shown on the app page. */
  minMacOS: string;
  /** Basename in public/shots/. Named after the macOS app captured (Obolo,
   *  MacCleaner, Atoll), which is not the product name — see tools/shot.sh. */
  shot: string;
};

export const apps: Record<AppSlug, AppMeta> = {
  obolo: {
    slug: "obolo",
    github: "https://github.com/anguria-studio/obolo",
    download: "https://github.com/anguria-studio/obolo/releases/latest",
    minMacOS: "14.0",
    shot: "obolo",
  },
  scolo: {
    slug: "scolo",
    github: "https://github.com/anguria-studio/scolo",
    download: "https://github.com/anguria-studio/scolo/releases/latest",
    minMacOS: "14.0",
    shot: "cleaner",
  },
  blatta: {
    slug: "blatta",
    github: "https://github.com/anguria-studio/blatta",
    download: "https://github.com/anguria-studio/blatta/releases/latest",
    minMacOS: "14.0",
    shot: "atoll",
  },
};

export const appList = appSlugs.map((slug) => apps[slug]);

export const site = {
  name: "Anguria Studio",
  domain: "anguria.studio",
  url: "https://anguria.studio",
  github: "https://github.com/anguria-studio",
  email: "hello@anguria.studio",
};
