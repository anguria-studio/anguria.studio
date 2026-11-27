import { OboloPrivacyPage } from "@/components/obolo-privacy-page";
import { oboloPrivacyMetadata } from "@/lib/metadata";

export const generateMetadata = () => oboloPrivacyMetadata("en");

export default function Page() {
  return <OboloPrivacyPage locale="en" />;
}
