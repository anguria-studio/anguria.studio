import { PaguroPrivacyPage } from "@/components/paguro-privacy-page";
import { paguroPrivacyMetadata } from "@/lib/metadata";

/** Nested under the literal paguro/ folder for the reason given in ../page.tsx. */
export const generateMetadata = () => paguroPrivacyMetadata("en");

export default function Page() {
  return <PaguroPrivacyPage locale="en" />;
}
