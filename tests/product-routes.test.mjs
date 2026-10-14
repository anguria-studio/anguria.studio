import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { registerHooks } from "node:module";
import test from "node:test";

registerHooks({
  resolve: (specifier, context, nextResolve) =>
    specifier.startsWith(".") && !/\.[a-z]+$/.test(specifier)
      ? nextResolve(`${specifier}.ts`, context)
      : nextResolve(specifier, context),
});
const { apps, appSlugs, pagePaths } = await import("../lib/apps.ts");
const { locales, getDictionary, localePath } = await import("../lib/i18n.ts");
const { appMetadata } = await import("../lib/metadata.ts");

test("only Moppo and Paguro are registered and translated", async () => {
  assert.deepEqual(appSlugs, ["moppo", "paguro"]);
  assert.deepEqual(Object.keys(apps).sort(), ["moppo", "paguro"]);
  assert.ok(pagePaths.includes("moppo"));
  assert.ok(!pagePaths.includes("scolo"));
  assert.equal(apps.moppo.github, "https://github.com/anguria-studio/Moppo");
  assert.equal(apps.moppo.download, "https://github.com/anguria-studio/Moppo/releases/latest/download/Moppo.dmg");
  assert.equal(apps.paguro.github, "https://github.com/anguria-studio/Paguro");
  for (const locale of locales) {
    const dictionary = await getDictionary(locale);
    assert.equal(dictionary.apps.moppo.name, "Moppo");
    assert.equal(dictionary.apps.paguro.name, "Paguro");
    assert.deepEqual(Object.keys(dictionary.apps).sort(), ["moppo", "paguro"]);
    assert.ok(!JSON.stringify(dictionary).includes("Scolo"));
  }
});

test("every language publishes canonical, alternate, and social metadata for both apps", async () => {
  for (const locale of locales) {
    const dictionary = await getDictionary(locale);
    for (const slug of ["moppo", "paguro"]) {
      const metadata = await appMetadata(locale, slug);
      assert.ok(metadata.title.startsWith(`${dictionary.apps[slug].name} — `));
      assert.equal(metadata.alternates.canonical, `https://anguria.studio${localePath(locale, slug)}/`);
      for (const language of locales) {
        assert.equal(metadata.alternates.languages[language], `https://anguria.studio${localePath(language, slug)}/`);
      }
      assert.equal(metadata.alternates.languages["x-default"], `https://anguria.studio/${slug}/`);
      assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
      assert.equal(metadata.openGraph.images[0].url, `https://anguria.studio/${slug}/og-image.jpg`);
      assert.equal(metadata.twitter.card, "summary_large_image");
      assert.equal(metadata.twitter.images[0].url, metadata.openGraph.images[0].url);
    }
  }
});

test("old Scolo URLs permanently redirect to Moppo in the same language", async () => {
  const { redirects } = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  assert.equal(new Set(redirects.map(({ source }) => source)).size, redirects.length);
  for (const locale of locales) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    for (const slash of ["", "/"]) {
      assert.equal(redirects.find(({ source }) => source === `${prefix}/moppo${slash}`), undefined, "Moppo must serve its own landing page");
      assert.deepEqual(redirects.find(({ source }) => source === `${prefix}/scolo${slash}`), {
        source: `${prefix}/scolo${slash}`, destination: `${prefix}/moppo/`, permanent: true,
      });
    }
  }
  for (const { source } of redirects) {
    const seen = new Set();
    let path = source;
    let redirect;
    while ((redirect = redirects.find((entry) => entry.source === path))) {
      assert.ok(!seen.has(path), `Redirect loop at ${path}`);
      seen.add(path);
      path = redirect.destination;
    }
  }
});
