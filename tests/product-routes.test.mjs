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

test("Moppo replaces Scolo while Obolo keeps its identity and links", async () => {
  assert.deepEqual(appSlugs, ["obolo", "moppo", "paguro"]);
  assert.ok(pagePaths.includes("moppo"));
  assert.ok(!pagePaths.includes("scolo"));
  assert.equal(apps.moppo.github, "https://github.com/anguria-studio/Moppo");
  assert.equal(apps.moppo.download, "https://github.com/anguria-studio/Moppo/releases/latest");
  assert.equal(apps.obolo.slug, "obolo");
  assert.equal(apps.obolo.github, "https://github.com/anguria-studio/obolo");
  for (const locale of locales) {
    const dictionary = await getDictionary(locale);
    assert.equal(dictionary.apps.moppo.name, "Moppo");
    assert.equal(dictionary.apps.obolo.name, "Obolo");
    assert.ok(!JSON.stringify(dictionary).includes("Scolo"));
  }
});

test("every language publishes Moppo canonical and alternate URLs", async () => {
  for (const locale of locales) {
    const metadata = await appMetadata(locale, "moppo");
    assert.match(metadata.title, /^Moppo — /);
    assert.equal(metadata.alternates.canonical, `https://anguria.studio${localePath(locale, "moppo")}/`);
    for (const language of locales) {
      assert.equal(metadata.alternates.languages[language], `https://anguria.studio${localePath(language, "moppo")}/`);
    }
    assert.equal(metadata.alternates.languages["x-default"], "https://anguria.studio/moppo/");
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
  }
});

test("old Scolo URLs permanently redirect to Moppo in the same language", async () => {
  const { redirects } = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  assert.equal(new Set(redirects.map(({ source }) => source)).size, redirects.length);
  for (const locale of locales) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    for (const slash of ["", "/"]) {
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
