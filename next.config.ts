import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Fully static site: `pnpm build` emits `out/`, deployable to any static host. */
  output: "export",
  /** Emits `moppo/index.html` rather than `moppo.html`, which static hosts serve at `/moppo/` without rewrite rules. */
  trailingSlash: true,
  images: { unoptimized: true },
  /** There is no `app/layout.tsx` (two root layouts, one per locale group), so the 404 has to bring its own document. */
  experimental: { globalNotFound: true },
};

export default nextConfig;
