import { HomeBento } from "@/components/home/home-bento";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ShowcaseHero } from "@/components/home/showcase-hero";
import { site } from "@/lib/apps";
import { defaultLocale, getDictionary, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/metadata";

/** The whole homepage, so both locale groups' page files stay one-liners. */
export async function HomePage({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  // Every translation describes the same website and studio, using stable IDs.
  const homeUrl = absoluteUrl(defaultLocale);
  const organizationId = `${homeUrl}#organization`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        url: homeUrl,
        name: site.name,
        alternateName: site.domain,
        description: dict.meta.description,
        inLanguage: locales,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: homeUrl,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/mark.png`,
          width: 240,
          height: 240,
        },
        email: site.email,
        sameAs: [site.github],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Header locale={locale} dict={dict} />
      <main>
        <ShowcaseHero dict={dict} />
        <HomeBento locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} note={dict.footer.rights} />
    </>
  );
}
