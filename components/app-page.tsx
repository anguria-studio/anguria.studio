import { AppDetail } from "@/components/apps/app-detail";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { apps, type AppSlug } from "@/lib/apps";
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
      <Header locale={locale} dict={dict} />
      <main>
        <AppDetail
          locale={locale}
          meta={apps[slug]}
          copy={dict.apps[slug]}
          dict={dict}
        />
      </main>
      <Footer locale={locale} dict={dict} slug={slug} />
    </>
  );
}
