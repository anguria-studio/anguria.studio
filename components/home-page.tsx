import { AppDock } from "./app-dock";
import { AppShowcase } from "./app-showcase";
import { ContactLine } from "./contact-line";
import { FeatureGrid } from "./feature-grid";
import { Footer } from "./footer";
import { Header } from "./header";
import { ShowcaseHero } from "./showcase-hero";
import { Statement } from "./statement";
import { getDictionary, type Locale } from "@/lib/i18n";

/** The whole homepage, so both locale groups' page files stay one-liners. */
export async function HomePage({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <ShowcaseHero dict={dict} />
        <AppShowcase locale={locale} dict={dict} />
        <Statement dict={dict} />
        <FeatureGrid dict={dict} />
        <AppDock locale={locale} dict={dict} />
        <ContactLine dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
