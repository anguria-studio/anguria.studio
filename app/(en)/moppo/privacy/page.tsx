import { MoppoPrivacyPage } from "@/components/moppo-legal-page";
import { moppoPrivacyMetadata } from "@/lib/metadata";

export const generateMetadata = () => moppoPrivacyMetadata("en");

export default function Page() {
  return <MoppoPrivacyPage locale="en" />;
}
