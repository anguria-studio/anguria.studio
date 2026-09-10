# anguria.studio

Source of [anguria.studio](https://anguria.studio), the website for Anguria
Studio's macOS apps: **Obolo**, **Scolo** and **Paguro**.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- Static export: `pnpm build` writes the whole site to `out/`; there is no server
- pnpm (version pinned in `package.json`) and Node 22.18 or newer

## Run it

```sh
pnpm install
pnpm dev                      # http://localhost:3000
pnpm build                    # static site in ./out
pnpm lint
pnpm exec tsc --noEmit
node --test tests/*.test.mjs  # plain node:test, no runner to install
```

## Layout

Four languages: English, Italian, French and Spanish. English is served
unprefixed (`/paguro`), the others prefixed (`/it/paguro`). `localePath()` in
`lib/i18n.ts` is the only place that knows this rule; every internal link goes
through it.

- `app/` — routes. There is deliberately no `app/layout.tsx`: `(en)` and
  `(intl)/[locale]` are two root layouts, so each language ships its own
  `<html lang>` in static HTML. The 404 is `app/global-not-found.tsx`.
- `lib/dictionaries/` — all user-facing copy. `en.ts` is the source and the
  type; the other three are checked against it, so a missing translation is a
  compile error. Components contain no copy of their own.
- `lib/privacy/` — Paguro's privacy policy as data, one file per language.
- `lib/apps.ts` — per-app URLs and the `site` constants (domain, email).
- `components/` — markup, grouped by layer.
- `tests/` — logic tests for the Paguro page's interactive pieces.
- `vercel.json` — temporary redirects sending `/`, `/obolo` and `/scolo` to the
  Paguro page while it is the only released app.

## Contact

hello@anguria.studio

## Licence

MIT; see [LICENSE](LICENSE).
