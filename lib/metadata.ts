import type { Metadata } from "next";
import { site, type AppSlug } from "./apps";
import {
  defaultLocale,
  getDictionary,
  localePath,
  locales,
  type Locale,
} from "./i18n";

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
function abs(locale: Locale, slug?: AppSlug): string {
  const path = localePath(locale, slug);
  return `${site.url}${path.endsWith("/") ? path : `${path}/`}`;
}

function alternates(locale: Locale, slug?: AppSlug): Metadata["alternates"] {
  return {
    canonical: abs(locale, slug),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, abs(l, slug)])),
      "x-default": abs(defaultLocale, slug),
    },
  };
}

function openGraph(
  locale: Locale,
  title: string,
  description: string,
  slug?: AppSlug,
): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: site.name,
    url: abs(locale, slug),
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

export { abs as absoluteUrl };
