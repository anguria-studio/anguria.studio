import { PaguroFooterNote, PaguroHeader } from "@/components/apps/paguro-detail";
import { Footer } from "@/components/layout/footer";
import { TermsArticle } from "@/components/terms/terms-article";
import { paguroTermsPath } from "@/lib/apps";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getPaguroTerms } from "@/lib/terms/paguro-terms";

export async function PaguroTermsPage({ locale }: { locale: Locale }) {
  const [dict, terms] = await Promise.all([
    getDictionary(locale),
    getPaguroTerms(locale),
  ]);

  return (
    <>
      <PaguroHeader locale={locale} dict={dict} subpage />
      <main>
        <TermsArticle locale={locale} dict={dict} terms={terms} />
      </main>
      <Footer
        locale={locale}
        dict={dict}
        path={paguroTermsPath}
        note={<PaguroFooterNote dict={dict} locale={locale} termsLink={false} />}
      />
    </>
  );
}
