import { OboloHeader } from "@/components/apps/obolo-detail";
import { Footer } from "@/components/layout/footer";
import { PolicyArticle } from "@/components/privacy/policy-article";
import { oboloPrivacyPath } from "@/lib/apps";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getOboloPrivacyPolicy, oboloPrivacySections, oboloPrivacyUpdated } from "@/lib/privacy/obolo-policy";

const englishDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(oboloPrivacyUpdated));

export async function OboloPrivacyPage({ locale }: { locale: Locale }) {
  const [dict, policy] = await Promise.all([
    getDictionary(locale),
    getOboloPrivacyPolicy(locale),
  ]);

  return (
    <>
      <OboloHeader locale={locale} dict={dict} subpage />
      <main>
        <PolicyArticle
          locale={locale}
          copy={dict.apps.obolo.privacy}
          policy={policy}
          app="obolo"
          effectiveDate={oboloPrivacyUpdated}
          displayDate={locale === "en" ? englishDate : undefined}
          sectionIds={oboloPrivacySections}
        />
      </main>
      <Footer locale={locale} dict={dict} path={oboloPrivacyPath} note={dict.footer.copyright} />
    </>
  );
}
