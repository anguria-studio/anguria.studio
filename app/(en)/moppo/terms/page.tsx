import { MoppoTermsPage } from "@/components/moppo-legal-page";
import { moppoTermsMetadata } from "@/lib/metadata";

export const generateMetadata = () => moppoTermsMetadata("en");

export default function Page() {
  return <MoppoTermsPage locale="en" />;
}
