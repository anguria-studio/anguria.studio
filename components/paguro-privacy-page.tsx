import { PaguroFooterNote, PaguroHeader } from "@/components/apps/paguro-detail";
import { Footer } from "@/components/layout/footer";
import { PolicyArticle } from "@/components/privacy/policy-article";
import { paguroPrivacyPath } from "@/lib/apps";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getPaguroPrivacyPolicy } from "@/lib/privacy/paguro-policy";

/**
 * The whole policy page, so both locale groups' page files stay one-liners.
 *
 * Paguro's header and footer, not the site's: this is a Paguro page. `subpage`
 * points the wordmark up to the app page instead of a hero that is not here;
 * the download pills stay, as on the app page. `privacyLink={false}` keeps the
 * footer from linking the policy to itself. The footer gets `path` so the
 * language switcher stays on the policy.
 */
export async function PaguroPrivacyPage({ locale }: { locale: Locale }) {
  const [dict, policy] = await Promise.all([
    getDictionary(locale),
    getPaguroPrivacyPolicy(locale),
  ]);

  return (
    <>
      <PaguroHeader locale={locale} dict={dict} subpage />
      <main>
        <PolicyArticle locale={locale} dict={dict} policy={policy} />
      </main>
      <Footer
        locale={locale}
        dict={dict}
        path={paguroPrivacyPath}
        note={<PaguroFooterNote dict={dict} locale={locale} privacyLink={false} />}
      />
    </>
  );
}
