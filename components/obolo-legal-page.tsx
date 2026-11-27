import type { ReactNode } from "react";
import { OboloFooterNote, OboloHeader } from "@/components/apps/obolo-detail";
import { Footer } from "@/components/layout/footer";
import { PolicyArticle } from "@/components/privacy/policy-article";
import { TermsArticle } from "@/components/terms/terms-article";
import { oboloPrivacyPath, oboloTermsPath } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getOboloPrivacyPolicy, oboloPrivacySections, oboloPrivacyUpdated } from "@/lib/privacy/obolo-policy";
import { getOboloTerms, oboloTermsSections, oboloTermsUpdated } from "@/lib/terms/obolo-terms";

const englishDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(oboloPrivacyUpdated));

function OboloLegalLayout({ locale, dict, document, children }: {
  locale: Locale;
  dict: Dictionary;
  document: "privacy" | "terms";
  children: ReactNode;
}) {
  return (
    <>
      <OboloHeader locale={locale} dict={dict} subpage />
      <main>{children}</main>
      <Footer
        locale={locale}
        dict={dict}
        path={document === "privacy" ? oboloPrivacyPath : oboloTermsPath}
        note={<OboloFooterNote dict={dict} locale={locale} privacyLink={document !== "privacy"} termsLink={document !== "terms"} />}
      />
    </>
  );
}

export async function OboloPrivacyPage({ locale }: { locale: Locale }) {
  const [dict, policy] = await Promise.all([
    getDictionary(locale),
    getOboloPrivacyPolicy(locale),
  ]);

  return (
    <OboloLegalLayout locale={locale} dict={dict} document="privacy">
      <PolicyArticle
        locale={locale}
        copy={dict.apps.obolo.privacy}
        policy={policy}
        app="obolo"
        effectiveDate={oboloPrivacyUpdated}
        displayDate={locale === "en" ? englishDate : undefined}
        sectionIds={oboloPrivacySections}
      />
    </OboloLegalLayout>
  );
}

export async function OboloTermsPage({ locale }: { locale: Locale }) {
  const [dict, terms] = await Promise.all([getDictionary(locale), getOboloTerms(locale)]);

  return (
    <OboloLegalLayout locale={locale} dict={dict} document="terms">
      <TermsArticle
        locale={locale}
        copy={{ back: dict.apps.obolo.privacy.back, updated: dict.apps.obolo.terms.updated }}
        terms={terms}
        app="obolo"
        updatedDate={oboloTermsUpdated}
        sectionIds={oboloTermsSections}
      />
    </OboloLegalLayout>
  );
}
