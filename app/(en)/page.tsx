import { HomePage } from "@/components/home-page";
import { homeMetadata } from "@/lib/metadata";

export const generateMetadata = () => homeMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}
