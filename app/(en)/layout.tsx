import type { ReactNode } from "react";
import "../globals.css";
import { ThemeScript } from "@/components/layout/theme-script";

/**
 * Root layout #1 of 2. Serves the default locale, unprefixed: `/`, `/obolo`, …
 * Its twin is app/(intl)/[locale]/layout.tsx. There is deliberately no
 * app/layout.tsx — two root layouts is what lets each locale ship a correct
 * `<html lang>` in its static HTML.
 */
export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
