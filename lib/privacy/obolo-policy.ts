import type { Locale } from "../i18n";
import type { PrivacyPolicy } from "./paguro-policy";

export const oboloPrivacyUpdated = "2026-11-27";
export const oboloPrivacySections = [
  "on-your-mac",
  "icloud-sync",
  "network-requests",
  "retention-and-deletion",
  "contact",
] as const;

export type OboloPrivacyPolicy = PrivacyPolicy<(typeof oboloPrivacySections)[number]>;

const policies: Record<Locale, () => Promise<{ policy: OboloPrivacyPolicy }>> = {
  en: () => import("./obolo/en"),
  it: () => import("./obolo/it"),
  fr: () => import("./obolo/fr"),
  es: () => import("./obolo/es"),
};

export async function getOboloPrivacyPolicy(locale: Locale): Promise<OboloPrivacyPolicy> {
  return (await policies[locale]()).policy;
}
