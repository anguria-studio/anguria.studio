import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PolicyArticle } from "@/components/privacy/policy-article";
import { paguroPrivacyPath } from "@/lib/apps";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getPaguroPrivacyPolicy } from "@/lib/privacy/paguro-policy";

/**
 * The whole policy page, so both locale groups' page files stay one-liners.
 * The footer gets `path` so the language switcher stays on the policy.
 */
export async function PaguroPrivacyPage({ locale }: { locale: Locale }) {
  const [dict, policy] = await Promise.all([
    getDictionary(locale),
    getPaguroPrivacyPolicy(locale),
  ]);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <PolicyArticle locale={locale} dict={dict} policy={policy} />
      </main>
      <Footer locale={locale} dict={dict} path={paguroPrivacyPath} />
    </>
  );
}
