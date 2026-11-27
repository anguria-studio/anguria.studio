import { AppPage } from "@/components/app-page";
import { appMetadata } from "@/lib/metadata";

export const generateMetadata = () => appMetadata("en", "obolo");

export default function Page() {
  return <AppPage locale="en" slug="obolo" />;
}
