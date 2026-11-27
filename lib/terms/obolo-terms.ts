import type { Locale } from "../i18n";
import type { TermsDocument } from "./paguro-terms";

export const oboloTermsUpdated = "2026-11-27";
export const oboloTermsSections = ["software", "tracking", "third-party", "data", "contact"] as const;
export type OboloTerms = TermsDocument<(typeof oboloTermsSections)[number]>;

const documents: Record<Locale, () => Promise<{ terms: OboloTerms }>> = {
  en: () => import("./obolo/en"),
  it: () => import("./obolo/it"),
  fr: () => import("./obolo/fr"),
  es: () => import("./obolo/es"),
};

export async function getOboloTerms(locale: Locale): Promise<OboloTerms> {
  return (await documents[locale]()).terms;
}
