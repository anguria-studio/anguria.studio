import type { Locale } from "../i18n";
import type { TermsDocument } from "./paguro-terms";

export const moppoTermsUpdated = "2026-10-13";
export const moppoTermsSections = ["software", "cleanup", "warranty", "third-party", "data", "changes", "contact"] as const;
export type MoppoTerms = TermsDocument<(typeof moppoTermsSections)[number]>;

const documents: Record<Locale, () => Promise<{ terms: MoppoTerms }>> = {
  en: () => import("./moppo/en"),
  it: () => import("./moppo/it"),
  fr: () => import("./moppo/fr"),
  es: () => import("./moppo/es"),
};

export async function getMoppoTerms(locale: Locale): Promise<MoppoTerms> {
  return (await documents[locale]()).terms;
}
