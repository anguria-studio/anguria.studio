import { HomeBento } from "@/components/home/home-bento";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ShowcaseHero } from "@/components/home/showcase-hero";
import { getDictionary, type Locale } from "@/lib/i18n";

/** The whole homepage, so both locale groups' page files stay one-liners. */
export async function HomePage({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <ShowcaseHero dict={dict} />
        <HomeBento locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} note={dict.footer.rights} />
    </>
  );
}
