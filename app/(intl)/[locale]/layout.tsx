import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../../globals.css";
import { ThemeScript } from "@/components/layout/theme-script";
import { isLocale, prefixedLocales } from "@/lib/i18n";

/** Static export cannot fall back to on-demand rendering. */
export const dynamicParams = false;

/**
 * Only the prefixed locales. `en` is served unprefixed by the (en) group, so
 * emitting `/en` here would duplicate every page under a second URL.
 */
export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

/**
 * Root layout #2 of 2. Serves `/it`, `/fr` and everything beneath them.
 */
export default async function IntlRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
