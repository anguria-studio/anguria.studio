import { OboloPrivacyPage } from "@/components/obolo-legal-page";
import { oboloPrivacyMetadata } from "@/lib/metadata";

export const generateMetadata = () => oboloPrivacyMetadata("en");

export default function Page() {
  return <OboloPrivacyPage locale="en" />;
}
