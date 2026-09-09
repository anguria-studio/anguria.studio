# anguria.studio

Homepage for three free, open-source macOS utilities: **Obolo**, **Scolo** and **Paguro**.

Next.js 16 (App Router) + Tailwind CSS v4, fully statically exported. No client-side
JavaScript beyond Next's runtime — every component is a server component.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static site in ./out
pnpm lint
```

## Languages

English (default), Italian, French.

- English is served **unprefixed**: `/`, `/obolo`, `/scolo`, `/paguro`
- The others are **prefixed**: `/it`, `/it/obolo`, `/fr/paguro`, …

Every internal link goes through `localePath(locale, slug?)` in `lib/i18n.ts`, which is
the only place that knows about the prefix rule.

## Theme

Three states, cycled by the button at the right of the header: **system** (default) → **light** → **dark**.

The DOM contract is that `data-theme` on `<html>` is *absent* for system, or `"light"` / `"dark"`
for an explicit choice. Two things fall out of that:

- The exported HTML is **theme-neutral** — the server never renders the attribute, so the same
  file is correct for every visitor.
- In system state the attribute is absent, so `@media (prefers-color-scheme: dark)` in
  `globals.css` tracks OS changes live. There is deliberately **no `matchMedia` listener**.

Pieces:

| Path | What |
|---|---|
| `app/globals.css` | The three token blocks. The dark media query is guarded with `:root:not([data-theme="light"])` so an explicit light choice wins on a dark Mac. |
| `components/theme-script.tsx` | ~200-byte inline script that stamps the attribute before first paint. Must be in `<head>` of **all three** root documents (both layouts and `global-not-found.tsx`) — there is no shared layout to put it in. |
| `components/theme-toggle.tsx` | The site's only client component. |

The toggle's first client render is always `"system"` so it matches the server exactly; the stored
value is read via `useSyncExternalStore`. The visible icon is *not* driven by that state — all three
icons are in the HTML and CSS picks one off `data-theme`, so the correct icon shows from first paint.
`suppressHydrationWarning` on `<html>` is required in all three documents, since the inline script
mutates the element before React hydrates.

When editing dark tokens, change **both** the `:root[data-theme="dark"]` block and the media-query
block — they are duplicated on purpose and must stay in sync.

## Where things live

| Path | What |
|---|---|
| `lib/dictionaries/en.ts` | **All English copy.** The source language, and the source of the `Dictionary` type. |
| `lib/dictionaries/{it,fr}.ts` | Translations, typed against `en.ts` — a missing key is a compile error. |
| `lib/apps.ts` | Per-app non-translatable data: GitHub/download URLs, icon gradient, minimum macOS. |
| `lib/i18n.ts` | Locale list, `localePath()`, dictionary loading. |
| `lib/metadata.ts` | Titles, descriptions, canonical + hreflang, Open Graph. |
| `components/` | All markup. Components never contain copy — they read it from the dictionary. |

To change what an app says, edit its entry in `lib/dictionaries/en.ts` and mirror it in
`it.ts` / `fr.ts`. Nothing else contains app copy.

Unwritten copy is marked in the source: `grep -rn "TODO(copy)" lib/dictionaries`

## Brand assets

All three are resized from the same 1024×1024 source icon:

| File | Size | Purpose |
|---|---|---|
| `app/icon.png` | 64×64 | Favicon. Next's metadata convention emits the `<link rel="icon">`; `sizes` comes from the real dimensions. |
| `app/apple-icon.jpg` | 180×180 | Apple touch icon. **JPEG on purpose** — iOS composites transparent corners onto black, so the alpha is flattened onto the artwork's own white field. |
| `public/mark.png` | 128×128 | The 20px header glyph (4× for retina). |

To regenerate from a new source, from the repo root:

```sh
sips -z 64 64   source.png --out app/icon.png
sips -z 180 180 -s format jpeg -s formatOptions best source.png --out app/apple-icon.jpg
sips -z 128 128 source.png --out public/mark.png
```

## Routing

There is deliberately **no `app/layout.tsx`**. Two root layouts —
`app/(en)/layout.tsx` and `app/(intl)/[locale]/layout.tsx` — is what lets each locale
ship a correct `<html lang>` in its static HTML while keeping English unprefixed.

Two consequences worth knowing:

- The three English app routes must stay **literal folders** (`app/(en)/obolo/`, …).
  Collapsing them into `app/(en)/[app]/page.tsx` puts two differently-named dynamic
  segments at the same path position as `(intl)/[locale]` and the build fails.
- Switching between English and it/fr crosses root layouts, so it is a full page load.
  That is intentional: it is how the browser gets a document with the right `lang`.

The 404 lives in `app/global-not-found.tsx` (Next 16, `experimental.globalNotFound`)
because with two root layouts there is no single layout for a plain `not-found.tsx` to
render inside. It is exported to `out/404.html`.

## Adding an app

1. Add the slug to `appSlugs` and an entry to `apps` in `lib/apps.ts`.
2. Add its copy to all three dictionaries.
3. Create `app/(en)/<slug>/page.tsx` (copy an existing one — it is 8 lines).

`/it/<slug>` and `/fr/<slug>`, the sitemap and the hreflang tags all follow automatically.

## Deploying

Static export, so any static host works. Cloudflare Pages is the easy default:

- Build command: `pnpm build`
- Output directory: `out`

`trailingSlash: true` means the export emits `obolo/index.html`, which every static host
serves at `/obolo/` without rewrite rules, and `404.html` is picked up automatically.

Set the real domain in `site.url` (`lib/apps.ts`) — it is what canonical, hreflang and
`sitemap.xml` are built from.
