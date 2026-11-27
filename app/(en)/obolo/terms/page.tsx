import { OboloTermsPage } from "@/components/obolo-legal-page";
import { oboloTermsMetadata } from "@/lib/metadata";

export const generateMetadata = () => oboloTermsMetadata("en");

export default function Page() {
  return <OboloTermsPage locale="en" />;
}
