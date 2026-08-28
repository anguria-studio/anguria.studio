import type { Dictionary } from "./dictionaries/en";

export const locales = ["en", "it", "fr", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Locales that live behind a `/xx` path prefix (everything but the default). */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale);

export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  fr: "Français",
  es: "Español",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * The default locale is served unprefixed (`/`, `/obolo`); the others are
 * prefixed (`/it`, `/it/obolo`). Keep every href in the site going through here.
 */
export function localePath(locale: Locale, slug?: string): string {
  const base = locale === defaultLocale ? "" : `/${locale}`;
  return slug ? `${base}/${slug}` : base || "/";
}

const dictionaries: Record<Locale, () => Promise<{ dictionary: Dictionary }>> = {
  en: () => import("./dictionaries/en"),
  it: () => import("./dictionaries/it"),
  fr: () => import("./dictionaries/fr"),
  es: () => import("./dictionaries/es"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await dictionaries[locale]();
  return mod.dictionary;
}
