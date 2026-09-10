# anguria.studio

Homepage for three free, open-source macOS utilities: **Obolo**, **Scolo** and **Paguro**.

Next.js 16 (App Router) + Tailwind CSS v4, fully statically exported. Most markup
uses server components. The theme selector and Paguro's notification and layout
preview use small client components.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static site in ./out
pnpm lint
```

## Languages

English (default), Italian, French, and Spanish.

- English is served **unprefixed**: `/`, `/obolo`, `/scolo`, `/paguro`
- The others are **prefixed**: `/it`, `/it/obolo`, `/fr/paguro`, …

Every internal link goes through `localePath(locale, path?)` in `lib/i18n.ts`, which is
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
| `components/layout/theme-toggle.tsx` | The client component for selecting the theme. |

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
| `lib/dictionaries/{it,fr,es}.ts` | Translations, typed against `en.ts` — a missing key is a compile error. |
| `lib/apps.ts` | Per-app non-translatable data: GitHub/download URLs, icon gradient, minimum macOS. Also `pagePaths` / `PagePath`, the typed list of every non-home page. |
| `lib/i18n.ts` | Locale list, `localePath()`, dictionary loading. |
| `lib/metadata.ts` | Titles, descriptions, canonical + hreflang, Open Graph. |
| `lib/privacy/paguro-policy.ts` | Policy schema, section ids, `paguroPrivacyEffective`, the date formatter and the per-locale loader. |
| `lib/privacy/paguro/{en,it,fr,es}.ts` | The policy text itself, one `policy` export per locale, typed against the schema — a missing section is a compile error. |
| `components/` | All markup. Components never contain copy — they read it from the dictionary. |

To change what an app says, edit its entry in `lib/dictionaries/en.ts` and mirror it in
`it.ts` / `fr.ts` / `es.ts`. Nothing else contains app copy.

Unwritten copy is marked in the source: `grep -rn "TODO(copy)" lib/dictionaries`

## Paguro landing page

`components/apps/paguro-detail.tsx` renders the product navigation, feature copy,
questions, and contact line in all four languages. Other app pages retain their
shared header and detail layout.

The three feature blocks cover accounts and workspaces, app lock, and local setup
without Paguro accounts or app telemetry. The privacy copy distinguishes Paguro
from the websites it loads. The FAQ explains the notification tradeoff of full
hibernation.
Comparative speed, memory, and battery claims require measured results.

`components/apps/paguro-hero.tsx` is a client component. On desktop, its three service buttons
add sample notifications to a local island preview with no history cap.
`paguro-island.tsx` renders three full cards and a folded pile. Scroll to read the
rest. It uses the native app's 68-point cards, 8-point gaps, corner dismiss controls,
and stop-line geometry, ported in `lib/paguro-island.ts`. Covered cards are masked
before drawing the front glass, so their text does not bleed through it.

New samples show only the latest message and total count in a 360 × 120-point
compact preview for four seconds. The preview uses the native 34-point service
icon, 12-point gap, and 16-point horizontal padding below the camera housing.
Another arrival replaces the preview and restarts its timer. It does not open
the stack unless the visitor is already hovering or using the island keyboard controls.
Hover, or Enter on the preview/notch button, opens the full stack. Leaving it
collapses it after 180 ms; an active drag or keyboard focus holds it open.
Leaving the stack returns to the collapsed notch without replaying the preview.
Each arrival cancels any pending collapse from an earlier hover or focus exit.
The closed notch does not queue collapse timers. The reducer in
`lib/paguro-island.ts` also ignores timers from older arrivals and prevents the
preview timer from closing the expanded stack.
Drag a card right to dismiss it (25% of its width, or 400 points/second after the
8-point gesture threshold). A short or leftward drag springs back. Vertical touch
gestures and trackpad wheels scroll. Dismissal slides and fades the card out, then
the remaining cards move into place. Clear All uses the same exit animation.

Tab and arrow keys reveal the focused card above the fold. Delete dismisses it and
focus moves to the next card, or the previous card at the end. Escape collapses
the island. Keyboard interaction keeps it open until focus leaves or Escape is
pressed. An empty list collapses. Sample messages are announced politely.
The preview does not request system notification permissions or contact any service.
Reloading the page resets it.

The dark desktop preview now tries a local service-overlay experiment using two
full-screen captures with an empty sidebar. Service icons, workspace labels, and
the sidebar toggle are placed in the capture's original coordinates and scale
with it. The collapsed rail starts at the top, magnifies downward on hover, and
reveals service names. Clicking an icon does not hold magnification after hover
ends. Tab and arrow keys also reveal names. WhatsApp remains the photographed service;
service-content switching is not part of this first pass. The sidebar toggle inside
the preview switches layouts; there are no separate layout tabs below the image.

Unused controls offer hints after four visible, idle seconds: the sidebar
toggle grows to 1.75×, holds while it shakes, then settles back over 1.7 seconds;
the compact rail instead demonstrates a top-to-bottom magnification sweep.
After each animation, another four quiet seconds starts the next cue. Interaction
cancels the hint; controls already explored are not prompted again.
Hints stop offscreen or in a hidden tab and respect Reduce Motion. Their history
survives preview theme changes and resets on a fresh page visit.

The four captures show mock chat content composited in Figma and ship as WebP
from `public/shots/paguro-overlay/`; their lossless PNG sources sit beside them,
ignored by git. If a capture fails to load, the preview falls back to the earlier
signed-out captures in `public/paguro/`, which mobile uses regardless. See
[asset notes](content/paguro-assets.md) for the encoder settings, file mapping
and geometry. Run the dock geometry checks with
`node --test tests/paguro-service-preview.test.mjs`.

Copy lives in the `paguroHero` and `paguroPage` dictionary sections. The page uses
the homepage's existing type scale, colours, spacing, and surface tokens.
`paguro-hero.module.css` adds scoped entrance motion. `paguro-island.module.css`
contains the native preview's geometry and type sizes, using the site's neutral
theme colours for its glass surfaces. Reduce Motion removes spring and scale
effects; Reduce Transparency uses solid surfaces. There are no new fonts or
animation dependencies. Run the presentation, layout, and gesture regression checks
with `node --test tests/paguro-island.test.mjs`.

The collapsed notch is a solid black housing with concave top corners and a
small count badge on the left. It has no bell or app label in this state; an
empty history leaves a smaller, blank 164-point housing. A count widens it to
240 points; the expanded stack keeps its 420-point width.

The white sun/moon control sits in the menu bar, immediately before the date,
and changes only the preview. Its active icon has a small underline.
Its local state defaults to dark and does not read or write the page theme or
local storage. The island palette and full/compact app captures change together.
`paguro-desktop.module.css` scopes the existing site palette to this preview.
The footer's page theme control is still separate.

`paguro-menu-bar.tsx` has no background or blur. It uses white, heavier text,
with the Apple mark and Paguro on the left and the theme control and clock on
the right. Its
clock uses the viewer's current date and local timezone, formats it for the page
language, and refreshes at each minute boundary and on return to the tab. Static
HTML does not contain a build-time date. Narrow desktops use a short numeric date to
keep the controls clear of the expanded island.

Below the existing `desk` breakpoint (48rem, hover, and a fine pointer), the hero
shows a static app screenshot. Service buttons, the island, theme control, menu
bar, and sidebar toggle are hidden. Touch devices also use the still image.

The release section says that the first public release is coming soon. Replace
that message with verified download and App Store links when releases are live.

## Paguro privacy policy

Published at `/paguro/privacy/`, `/it/paguro/privacy/`, `/fr/paguro/privacy/` and
`/es/paguro/privacy/` — each canonical, with hreflang across all four plus
`x-default`. It is deliberately **indexable**: this is the URL that goes into
App Store Connect and the app's settings.

- The text is data, not markup: `lib/privacy/paguro/en.ts` is the source of truth,
  `it.ts` / `fr.ts` / `es.ts` are translations. `components/privacy/policy-article.tsx`
  renders it into real headings, paragraphs and links — no markdown, no
  `dangerouslySetInnerHTML`.
- Sections are keyed by id (`local`, `network`, `permissions`, `export`, `updates`,
  `contact`) and those ids are the `<h2>` anchors, so `#contact` is the same deep
  link in every language.
- **Change the effective date in one place:** `paguroPrivacyEffective` in
  `lib/privacy/paguro-policy.ts`. Every locale formats it itself, and the sitemap
  uses it as the policy's `lastmod`.
- The contact address comes from `site.email` via a `{ kind: "email" }` run; the
  policy text never spells it out.
- Linked from the Paguro page twice: under the three features, and in the footer,
  on the copyright row. Not from the home or other app footers — there is
  no site-wide policy yet, and a global link to a Paguro-only document would
  misstate its scope.
- Wears Paguro's header and footer (`PaguroHeader subpage`, `PaguroFooterNote
  privacyLink={false}`): the header is the app page's, download pills included,
  except that the wordmark links up to the app page; the footer keeps the Chorus
  credit and the copyright without linking the policy to itself.

Run the structural checks (block parity across locales, URLs, date formatting) with
`node --test tests/paguro-privacy.test.mjs`.

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
2. Add its copy to all four dictionaries.
3. Create `app/(en)/<slug>/page.tsx` (copy an existing one — it is 8 lines).

`/it/<slug>`, `/fr/<slug>`, and `/es/<slug>`, the sitemap and the hreflang tags all follow automatically.

## Deploying

Static export, so any static host works. Cloudflare Pages is the easy default:

- Build command: `pnpm build`
- Output directory: `out`

`trailingSlash: true` means the export emits `obolo/index.html`, which every static host
serves at `/obolo/` without rewrite rules, and `404.html` is picked up automatically.

Set the real domain in `site.url` (`lib/apps.ts`) — it is what canonical, hreflang and
`sitemap.xml` are built from.

### Vercel and the temporary Paguro-only launch

`vercel.json` holds host-level redirects (Next's `redirects` are unsupported under
`output: "export"`): `/`, `/obolo` and `/scolo` — and their `/it`, `/fr`, `/es`
variants, with and without trailing slash — answer 307 to the locale's Paguro page
while Paguro is the only shipped app. They are temporary on purpose: browsers and
search engines do not cache a 307, so restoring the routes is deleting the rules.
`app/sitemap.ts` lists only the served pages for the same reason; the 404 page and
the Paguro header link straight to `/paguro/` instead of `/`. All four are
reverted together.
