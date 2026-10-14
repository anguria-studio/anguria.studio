import { PaguroDetail, PaguroFooterNote, PaguroHeader } from "@/components/apps/paguro-detail";
import { MoppoDetail, MoppoFooterNote, MoppoHeader } from "@/components/apps/moppo-detail";
import { Footer } from "@/components/layout/footer";
import { apps, site, type AppSlug } from "@/lib/apps";
import { absoluteUrl } from "@/lib/metadata";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function AppPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: AppSlug;
}) {
  const dict = await getDictionary(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": absoluteUrl(locale, slug),
        url: absoluteUrl(locale, slug),
        name: slug === "moppo" ? dict.moppoPage.seoTitle : dict.paguroPage.seoTitle,
        description: slug === "moppo" ? dict.moppoPage.story.body : dict.apps.paguro.description,
        inLanguage: locale,
        image: `${site.url}/${slug}/og-image.jpg`,
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        mainEntity: {
          "@type": "SoftwareApplication",
          name: dict.apps[slug].name,
          operatingSystem: `macOS ${apps[slug].minMacOS} or later`,
          applicationCategory: slug === "moppo" ? "UtilitiesApplication" : "BusinessApplication",
          isAccessibleForFree: true,
          downloadUrl: apps[slug].appStore ?? apps[slug].download,
          offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        },
      }).replace(/</g, "\\u003c") }} />
      {slug === "paguro" ? <PaguroHeader locale={locale} dict={dict} /> : <MoppoHeader locale={locale} dict={dict} />}
      <main>
        {slug === "paguro" ? (
          <PaguroDetail dict={dict} locale={locale} />
        ) : (
          <MoppoDetail dict={dict} locale={locale} />
        )}
      </main>
      <Footer
        locale={locale}
        dict={dict}
        path={slug}
        note={slug === "paguro" ? <PaguroFooterNote dict={dict} locale={locale} /> : <MoppoFooterNote dict={dict} locale={locale} />}
      />
    </>
  );
}
