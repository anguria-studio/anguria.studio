import { PaguroDetail, PaguroFooterNote, PaguroHeader } from "@/components/apps/paguro-detail";
import { MoppoDetail, MoppoFooterNote, MoppoHeader } from "@/components/apps/moppo-detail";
import { OboloDetail, OboloHeader } from "@/components/apps/obolo-detail";
import { Footer } from "@/components/layout/footer";
import { apps, site, type AppSlug } from "@/lib/apps";
import { absoluteUrl, appSeoCopy } from "@/lib/metadata";
import { getDictionary, type Locale } from "@/lib/i18n";

const appPages = {
  moppo: { Header: MoppoHeader, Detail: MoppoDetail, applicationCategory: "UtilitiesApplication" },
  paguro: { Header: PaguroHeader, Detail: PaguroDetail, applicationCategory: "BusinessApplication" },
  obolo: { Header: OboloHeader, Detail: OboloDetail, applicationCategory: "FinanceApplication" },
};

export async function AppPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: AppSlug;
}) {
  const dict = await getDictionary(locale);
  const { Header, Detail, applicationCategory } = appPages[slug];
  const { title, description } = appSeoCopy(dict, slug);
  const app = apps[slug];
  const notes = {
    moppo: <MoppoFooterNote dict={dict} locale={locale} />,
    paguro: <PaguroFooterNote dict={dict} locale={locale} />,
    obolo: dict.footer.copyright,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": absoluteUrl(locale, slug),
        url: absoluteUrl(locale, slug),
        name: title,
        description,
        inLanguage: locale,
        image: `${site.url}/${slug}/og-image.jpg`,
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        mainEntity: {
          "@type": "SoftwareApplication",
          name: dict.apps[slug].name,
          operatingSystem: `macOS ${app.minMacOS} or later`,
          applicationCategory,
          isAccessibleForFree: true,
          downloadUrl: app.appStore ?? app.download,
          offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        },
      }).replace(/</g, "\\u003c") }} />
      <Header locale={locale} dict={dict} />
      <main>
        <Detail dict={dict} locale={locale} />
      </main>
      <Footer
        locale={locale}
        dict={dict}
        path={slug}
        note={notes[slug]}
      />
    </>
  );
}
