import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeScript } from "@/components/theme-script";
import { site } from "@/lib/apps";

/**
 * With two root layouts there is no single layout for a plain not-found.tsx to
 * render inside, so the 404 brings its own document. Under `output: "export"`
 * this is prerendered to out/404.html, which static hosts serve for unmatched
 * URLs. Deliberately English-only — it is reached by URLs with no known locale.
 */
export const metadata: Metadata = {
  title: `Page not found — ${site.name}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="text-[13px] font-medium tracking-widest text-muted uppercase">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          This page doesn&rsquo;t exist.
        </h1>
        <Link
          href="/"
          className="rounded-full bg-melon-500 px-6 py-2.5 text-[15px] font-medium text-white transition hover:bg-melon-600"
        >
          Back to {site.domain}
        </Link>
      </body>
    </html>
  );
}
