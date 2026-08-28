import { AppPage } from "@/components/app-page";
import { appMetadata } from "@/lib/metadata";

/**
 * Must stay a literal folder. Collapsing the three English app routes into
 * app/(en)/[app]/page.tsx would put two differently-named dynamic segments at
 * the same path position as (intl)/[locale], which Next rejects at build time.
 */
export const generateMetadata = () => appMetadata("en", "obolo");

export default function Page() {
  return <AppPage locale="en" slug="obolo" />;
}
