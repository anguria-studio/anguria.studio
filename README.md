# anguria.studio

Source of [anguria.studio](https://anguria.studio), the website for Anguria
Studio's macOS apps: **Obolo**, **Moppo** and **Paguro**.

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
- `lib/privacy/` — Paguro and Moppo privacy policies as data, one file per language.
- `lib/terms/` — Paguro and Moppo terms of use as data, one file per language.
- `lib/apps.ts` — per-app URLs and the `site` constants (domain, email).
- `components/` — markup, grouped by layer.
- `tests/` — logic tests for the Paguro page's interactive pieces.
- `vercel.json` — temporary redirects sending `/` and `/obolo` to the
  Paguro page, plus permanent redirects from
  the old `/scolo` URLs to `/moppo` in every language.

## Moppo page

`/moppo/` uses the Paguro layout with an amber accent, theme-specific screenshots,
and a cropped worktree review dialog. Copy lives in `lib/dictionaries/` in
all four languages. The hero uses static screenshots; a recorded demo loop can
replace them when available. The mascot uses vector geometry from the app.

The direct download URL and `brew install --cask moppo` command are launch
placeholders. Replace or verify both when the release and cask are available.
The footer links to `/moppo/privacy/` and `/moppo/terms/`, with translations in
all four languages. Privacy content follows the app's `App/Resources/Privacy.md`
and documented permissions; terms follow its MIT License and recovery limits.

## Paguro test page

Open `/paguro/test-notifications/` as a Custom URL service in Paguro to test
real notification delivery without a messaging account. The first notification
starts immediately once permission is granted. The sequence requests six
notifications three seconds apart, starting immediately too.
Cancel, reload, or leave the page to stop pending requests. The test uses the
standard web Notification API, with no messaging backend or service worker.
It does not start automatically, and its request log is kept only in page memory.

On localhost, add `http://localhost:3000/paguro/test-notifications/` to Paguro.
Keep the service awake and unmuted. Allow macOS notifications for Paguro and
follow the page instructions to test macOS banners, the island, and app lock.
The same page is available in all four site languages. It checks notification
handling, not provider login or end-to-end message delivery.
It is a standalone utility page without the marketing header, footer, or back link.

The same page includes **Download sample file** and **Test camera** controls.
The download is a same-origin static text file with an HTML download attribute.
In Paguro it exercises the normal WebKit download path and saves to Downloads.
Open the file and download it again to verify contents and duplicate names;
the page does not claim that a download succeeded merely because it was clicked.

The camera test requests `getUserMedia({ video: true, audio: false })` only
after a click and displays a muted inline preview. It does not record, upload,
or request microphone access. Stop, page hiding, page exit, and component
cleanup release the tracks. A late permission reply after cancellation also
releases its stream. Returning to the page never starts capture automatically.
Camera access needs HTTPS or localhost, browser support, and the relevant
Paguro and macOS permissions. Denial and unavailable cameras have visible states.

These controls exercise Paguro's existing camera and Downloads capabilities
without a third-party account. They do not test an actual video-call connection.

Each request increments a page-title unread count, which Paguro reads for its
service and Dock badges. Mark all read resets it; cancelling a sequence keeps
the existing count. Reloading resets all test state. Background badge polling
can take 30 seconds. The page includes Paguro favicon metadata and a notification
icon. Native notifications use the service icon stored by Paguro. The page
does not ask users to configure an icon separately.

## Website analytics

See [Analytics](docs/analytics.md) for the Umami setup, tracked events, and
product/route breakdowns.

## Contact

hello@anguria.studio

## Licence

MIT; see [LICENSE](LICENSE).
