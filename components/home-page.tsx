import { AppDock } from "@/components/apps/app-dock";
import { AppShowcase } from "@/components/apps/app-showcase";
import { ContactLine } from "@/components/layout/contact-line";
import { FeatureGrid } from "@/components/home/feature-grid";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ShowcaseHero } from "@/components/home/showcase-hero";
import { Statement } from "@/components/home/statement";
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
