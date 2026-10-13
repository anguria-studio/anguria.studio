import type { ReactNode } from "react";
import { MoppoFooterNote, MoppoHeader } from "@/components/apps/moppo-detail";
import styles from "@/components/apps/moppo-detail.module.css";
import { Footer } from "@/components/layout/footer";
import { PolicyArticle } from "@/components/privacy/policy-article";
import { TermsArticle } from "@/components/terms/terms-article";
import { moppoPrivacyPath, moppoTermsPath } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getMoppoPrivacyPolicy, moppoPrivacyEffective, moppoPrivacySections } from "@/lib/privacy/moppo-policy";
import { getMoppoTerms, moppoTermsSections, moppoTermsUpdated } from "@/lib/terms/moppo-terms";

function MoppoLegalLayout({ locale, dict, document, children }: {
  locale: Locale;
  dict: Dictionary;
  document: "privacy" | "terms";
  children: ReactNode;
}) {
  return <div className={styles.page}>
    <MoppoHeader locale={locale} dict={dict} subpage />
    <main>{children}</main>
    <Footer locale={locale} dict={dict}
      path={document === "privacy" ? moppoPrivacyPath : moppoTermsPath}
      note={<MoppoFooterNote locale={locale} dict={dict} privacyLink={document !== "privacy"} termsLink={document !== "terms"} />} />
  </div>;
}

export async function MoppoPrivacyPage({ locale }: { locale: Locale }) {
  const [dict, policy] = await Promise.all([getDictionary(locale), getMoppoPrivacyPolicy(locale)]);
  return <MoppoLegalLayout locale={locale} dict={dict} document="privacy">
    <PolicyArticle locale={locale} dict={dict} policy={policy} app="moppo" effectiveDate={moppoPrivacyEffective} sectionIds={moppoPrivacySections} />
  </MoppoLegalLayout>;
}

export async function MoppoTermsPage({ locale }: { locale: Locale }) {
  const [dict, terms] = await Promise.all([getDictionary(locale), getMoppoTerms(locale)]);
  return <MoppoLegalLayout locale={locale} dict={dict} document="terms">
    <TermsArticle locale={locale} dict={dict} terms={terms} app="moppo" updatedDate={moppoTermsUpdated} sectionIds={moppoTermsSections} />
  </MoppoLegalLayout>;
}
