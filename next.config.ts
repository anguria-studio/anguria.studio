import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Fully static site: `pnpm build` emits `out/`, deployable to any static host. */
  output: "export",
  /** Emits `obolo/index.html` rather than `obolo.html`, which every static host serves at `/obolo/` with no rewrite rules. */
  trailingSlash: true,
  images: { unoptimized: true },
  /** There is no `app/layout.tsx` (two root layouts, one per locale group), so the 404 has to bring its own document. */
  experimental: { globalNotFound: true },
};

export default nextConfig;
