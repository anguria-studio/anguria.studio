import type { Locale } from "../i18n";

/** ISO calendar date. The only place the effective date is written; the page formats it per locale. */
export const paguroPrivacyEffective = "2026-09-10";

/**
 * Section ids, in reading order. Keys rather than an array in each translation
 * for the same reason as lib/features.ts: a missing or misspelt section is a
 * compile error in every locale, and the order cannot be reshuffled by a
 * translator. They double as the <h2> ids, so #contact is stable across locales.
 */
export const paguroPrivacySections = [
  "local",
  "network",
  "permissions",
  "export",
  "updates",
  "contact",
] as const;

export type PaguroPrivacySectionId = (typeof paguroPrivacySections)[number];

/** A run of inline text. `email` renders site.email as a mailto link, so the address has one source. */
export type PolicyRun = string | { kind: "email" };

export type PolicyBlock =
  | string // a plain paragraph
  | { kind: "p"; runs: readonly PolicyRun[] } // a paragraph containing a link
  | { kind: "ul"; items: readonly string[] };

export type PolicySection = { heading: string; blocks: readonly PolicyBlock[] };

export type PaguroPrivacyPolicy = {
  /** The <h1>, and the first half of the <title>. */
  title: string;
  /** One sentence, ~150 characters: the meta description. */
  description: string;
  /** Paragraphs before the first heading. */
  intro: readonly PolicyBlock[];
  sections: Record<PaguroPrivacySectionId, PolicySection>;
};

const DATE_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  it: "it-IT",
  fr: "fr-FR",
  es: "es-ES",
};

/**
 * "10 September 2026" / "10 settembre 2026" / "10 septembre 2026" /
 * "10 de septiembre de 2026". UTC so the day never drifts with the build
 * machine's zone.
 */
export function formatEffectiveDate(
  locale: Locale,
  iso: string = paguroPrivacyEffective,
): string {
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** One dynamic import per locale, mirroring `dictionaries` in lib/i18n.ts, so a
 *  build only pulls in the policy it is rendering. */
const policies: Record<Locale, () => Promise<{ policy: PaguroPrivacyPolicy }>> = {
  en: () => import("./paguro/en"),
  it: () => import("./paguro/it"),
  fr: () => import("./paguro/fr"),
  es: () => import("./paguro/es"),
};

export async function getPaguroPrivacyPolicy(
  locale: Locale,
): Promise<PaguroPrivacyPolicy> {
  return (await policies[locale]()).policy;
}
