import type { Metadata } from "next";
import { paguroPrivacyPath, site, type AppSlug, type PagePath } from "./apps";
import {
  defaultLocale,
  getDictionary,
  localePath,
  locales,
  type Locale,
} from "./i18n";
import { getPaguroPrivacyPolicy } from "./privacy/paguro-policy";

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
  const title = `${copy.name} — ${copy.tagline}`;
  const description = copy.description;

  return {
    title,
    description,
    alternates: alternates(locale, slug),
    openGraph: openGraph(locale, title, description, slug),
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

export { abs as absoluteUrl };
