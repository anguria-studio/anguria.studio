import type { Metadata, Viewport } from "next";
import { paguroNotificationTestPath, paguroPrivacyPath, site, type AppSlug, type PagePath } from "./apps";
import {
  defaultLocale,
  getDictionary,
  localePath,
  locales,
  type Locale,
} from "./i18n";
import { getPaguroPrivacyPolicy } from "./privacy/paguro-policy";
import { notificationTestIconPath } from "./paguro-notification-test";

export const siteMetadata: Metadata = {
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: "/apple-icon.png",
  },
};

export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#171413" },
  ],
};

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  it: "it_IT",
  fr: "fr_FR",
  es: "es_ES",
};

/**
 * Absolute, trailing-slashed URL. `trailingSlash: true` means `/obolo/` is what
 * the host actually serves, so canonical and hreflang have to match it — and
 * absolute URLs here mean no `metadataBase` is needed in either root layout.
 */
function abs(locale: Locale, path?: PagePath): string {
  const href = localePath(locale, path);
  return `${site.url}${href.endsWith("/") ? href : `${href}/`}`;
}

function alternates(locale: Locale, path?: PagePath): Metadata["alternates"] {
  return {
    canonical: abs(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, abs(l, path)])),
      "x-default": abs(defaultLocale, path),
    },
  };
}

function openGraph(
  locale: Locale,
  title: string,
  description: string,
  path?: PagePath,
): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: site.name,
    url: abs(locale, path),
    locale: OG_LOCALE[locale],
    title,
    description,
  };
}

export async function homeMetadata(locale: Locale): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const { title, description } = dict.meta;

  return {
    title,
    description,
    alternates: alternates(locale),
    openGraph: openGraph(locale, title, description),
  };
}

export async function appMetadata(
  locale: Locale,
  slug: AppSlug,
): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const copy = dict.apps[slug];
  const title = slug === "paguro" ? dict.paguroPage.seoTitle : `${copy.name} — ${copy.tagline}`;
  const description = copy.description;
  const images = slug === "paguro" ? [{
    url: `${site.url}/paguro/og-image.jpg`,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: copy.shotAlt,
  }] : undefined;

  return {
    title,
    description,
    alternates: alternates(locale, slug),
    openGraph: { ...openGraph(locale, title, description, slug), ...(images ? { images } : {}) },
    ...(images ? { twitter: { card: "summary_large_image" as const, title, description, images: images.map(({ url, alt }) => ({ url, alt })) } } : {}),
  };
}

/**
 * No `robots` key on purpose: the policy is meant to be found. People and Apple
 * search for "<app> privacy policy", and each of the four URLs is canonical with
 * correct hreflang, so there is no duplicate-content reason to hide them.
 */
export async function paguroPrivacyMetadata(locale: Locale): Promise<Metadata> {
  const policy = await getPaguroPrivacyPolicy(locale);
  const title = `${policy.title} — ${site.name}`;
  const description = policy.description;

  return {
    title,
    description,
    alternates: alternates(locale, paguroPrivacyPath),
    openGraph: openGraph(locale, title, description, paguroPrivacyPath),
  };
}

export async function paguroNotificationTestMetadata(locale: Locale): Promise<Metadata> {
  const copy = (await getDictionary(locale)).paguroNotificationTest;
  const title = `${copy.title} — Paguro`;
  return {
    title,
    description: copy.intro,
    icons: {
      icon: [{ url: notificationTestIconPath, sizes: "256x256", type: "image/png" }],
      apple: notificationTestIconPath,
    },
    manifest: null,
    alternates: alternates(locale, paguroNotificationTestPath),
    openGraph: openGraph(locale, title, copy.intro, paguroNotificationTestPath),
  };
}

export { abs as absoluteUrl };
