import type { Locale } from "../i18n";

export const paguroTermsUpdated = "2026-10-13";

/** Stable headings and reading order across translations. */
export const paguroTermsSections = [
  "software",
  "warranty",
  "third-party",
  "data",
  "changes",
  "contact",
] as const;

export type TermsRun =
  | string
  | { kind: "license" | "privacy"; text: string }
  | { kind: "email" };

export type TermsDocument<SectionId extends string = string> = {
  title: string;
  description: string;
  sections: Record<
    SectionId,
    { heading: string; paragraph: readonly TermsRun[] }
  >;
};

export type PaguroTerms = TermsDocument<(typeof paguroTermsSections)[number]>;

/** Show the requested month and year, without depending on the build timezone. */
export function formatTermsUpdated(locale: Locale, iso = paguroTermsUpdated): string {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

const terms: Record<Locale, () => Promise<{ terms: PaguroTerms }>> = {
  en: () => import("./paguro/en"),
  it: () => import("./paguro/it"),
  fr: () => import("./paguro/fr"),
  es: () => import("./paguro/es"),
};

export async function getPaguroTerms(locale: Locale): Promise<PaguroTerms> {
  return (await terms[locale]()).terms;
}
