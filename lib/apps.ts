/**
 * Non-translatable data about each app: URLs and versions. The icon artwork
 * lives in components/app-icon.tsx.
 * All user-facing copy (name, tagline, description, features) lives in the
 * dictionaries so it can be translated — see lib/dictionaries/en.ts.
 */
export const appSlugs = ["obolo", "scolo", "paguro"] as const;
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
  /** App Store product page. Optional: an app that has not shipped yet has no
   *  listing. Setting this field replaces Paguro’s direct download action. */
  appStore?: string;
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
  paguro: {
    slug: "paguro",
    github: "https://github.com/anguria-studio/Paguro",
    // The release asset includes its version; update this URL with each release.
    download: "https://github.com/anguria-studio/Paguro/releases/download/v1.0.2/Paguro-1.0.2-7.dmg",
    minMacOS: "15.0",
    shot: "atoll",
  },
};

export const appList = appSlugs.map((slug) => apps[slug]);
export const dockAppList = [apps.paguro, apps.obolo, apps.scolo];

/** Locale-relative path of Paguro's privacy policy; nested under the app page it describes. */
export const paguroPrivacyPath = "paguro/privacy" as const;
export const paguroNotificationTestPath = "paguro/test-notifications" as const;

/**
 * Every page below the home page, as a locale-relative path with no leading
 * slash. Hrefs, canonical, hreflang and the sitemap are all typed against this,
 * so a page cannot be linked to without also being exported.
 */
export const pagePaths = [...appSlugs, paguroPrivacyPath, paguroNotificationTestPath] as const;
export type PagePath = (typeof pagePaths)[number];

export const site = {
  name: "Anguria Studio",
  domain: "anguria.studio",
  url: "https://anguria.studio",
  github: "https://github.com/anguria-studio",
  email: "hello@anguria.studio",
};
