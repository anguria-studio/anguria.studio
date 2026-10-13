import { PaguroTermsPage } from "@/components/paguro-terms-page";
import { paguroTermsMetadata } from "@/lib/metadata";

export const generateMetadata = () => paguroTermsMetadata("en");

export default function Page() {
  return <PaguroTermsPage locale="en" />;
}
