import { PaguroDetail, PaguroFooterNote, PaguroHeader } from "@/components/apps/paguro-detail";
import { AppDetail } from "@/components/apps/app-detail";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import footerStyles from "@/components/apps/paguro-footer.module.css";
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
      {slug === "paguro" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": absoluteUrl(locale, slug),
        url: absoluteUrl(locale, slug),
        name: dict.paguroPage.seoTitle,
        description: dict.apps.paguro.description,
        inLanguage: locale,
        image: `${site.url}/paguro/og-image.jpg`,
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        mainEntity: {
          "@type": "SoftwareApplication",
          name: "Paguro",
          operatingSystem: `macOS ${apps.paguro.minMacOS} or later`,
          applicationCategory: "BusinessApplication",
          isAccessibleForFree: true,
          downloadUrl: apps.paguro.download,
          offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        },
      }).replace(/</g, "\\u003c") }} />}
      {slug === "paguro" ? <PaguroHeader locale={locale} dict={dict} /> : <Header locale={locale} dict={dict} />}
      <main>
        {slug === "paguro" ? (
          <PaguroDetail dict={dict} locale={locale} />
        ) : (
          <AppDetail
            locale={locale}
            meta={apps[slug]}
            copy={dict.apps[slug]}
            dict={dict}
          />
        )}
      </main>
      <Footer
        className={slug === "paguro" ? footerStyles.art : undefined}
        locale={locale}
        dict={dict}
        path={slug}
        note={slug === "paguro" ? <PaguroFooterNote dict={dict} locale={locale} /> : undefined}
      />
    </>
  );
}
