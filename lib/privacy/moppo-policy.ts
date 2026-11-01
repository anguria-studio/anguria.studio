import type { Locale } from "../i18n";
import type { PrivacyPolicy } from "./paguro-policy";

export const moppoPrivacyEffective = "2026-11-01";
export const moppoPrivacySections = ["files", "local", "cli", "permissions", "updates", "services", "support", "contact"] as const;
export type MoppoPrivacyPolicy = PrivacyPolicy<(typeof moppoPrivacySections)[number]>;

const policies: Record<Locale, () => Promise<{ policy: MoppoPrivacyPolicy }>> = {
  en: () => import("./moppo/en"),
  it: () => import("./moppo/it"),
  fr: () => import("./moppo/fr"),
  es: () => import("./moppo/es"),
};

export async function getMoppoPrivacyPolicy(locale: Locale): Promise<MoppoPrivacyPolicy> {
  return (await policies[locale]()).policy;
}
