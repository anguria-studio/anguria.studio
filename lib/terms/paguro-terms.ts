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

export type PaguroTerms = {
  title: string;
  description: string;
  sections: Record<
    (typeof paguroTermsSections)[number],
    { heading: string; paragraph: readonly TermsRun[] }
  >;
};

/** Show the requested month and year, without depending on the build timezone. */
export function formatTermsUpdated(locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(paguroTermsUpdated));
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
