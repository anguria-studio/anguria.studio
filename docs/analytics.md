# Website analytics

Umami replaces the previous Cloudflare analytics script. The script URL and
website ID live in `lib/analytics.ts`; `WebAnalytics` is included in both locale
root layouts and the 404. Tracking runs only on `anguria.studio` and
`www.anguria.studio`, keeping localhost and deployment previews out of the data.

Umami automatically records the initial pageview and client navigations. Page
URLs retain their language prefixes and campaign parameters; hash links do not
create extra pageviews. Every pageview and event also gets a **tag** of `paguro`,
`obolo`, `moppo`, or `studio`, computed from its source route. Filter the traffic
dashboard by tag to compare a product across languages. Product tags include
their subpages, so filter **Pages** to the landing-page URL when comparing just
marketing traffic (e.g. `/paguro/` versus `/paguro/privacy/`).

Custom events carry `product`, `locale`, `route` (without the language prefix),
and `page` (`home`, `product`, `privacy`, `test-notifications`, or `not-found`).
Use Umami's Events/Properties view to break them down:

| Event | Details |
| --- | --- |
| `link-click` | All other links: destination, stable label, location, external status, and target product for internal links. Includes keyboard and middle-click activation. |
| `app-store-click` | App Store CTA; `location` separates header from hero. |
| `download-click` | Direct download/release CTA and links with a download attribute. Counts clicks, not completed downloads. |
| `source-click` | Product source and studio GitHub CTA. |
| `contact-click` | Email and GitHub support links. |
| `language-switch` | Source language plus `target_locale`. |
| `product-select` | Homepage showcase app selection with `target_product`. |
| `hero-interaction` | `action`: send/open/dismiss/clear notifications, toggle island, select service, change layout/theme, toggle mute/workspace. Relevant service, state, or count accompanies it. |
| `faq-expand` | Opening an answer, with a stable `question` topic ID shared by every translation. Closing does not count; reopening counts again. |

Link tracking is delegated centrally, so links on future pages are covered too.
Use `data-analytics-event` and `data-analytics-label` on a link for a specific
event and stable label, and `data-analytics-location` on its surrounding section
to distinguish placements. Interactive controls call `trackEvent()` from their
action handler. Keep IDs independent of translated copy. New products registered
in `appSlugs` automatically receive their own product tag. Tracking failures do
not block interactions or change link navigation.

The current `vercel.json` redirects `/`, `/obolo`, and `/moppo` (and translated
equivalents) to Paguro. Analytics records the page actually reached; separate
Obolo/Moppo page traffic begins when those existing redirects are removed.
Old `/scolo` URLs permanently redirect to `/moppo/` in the same language.
