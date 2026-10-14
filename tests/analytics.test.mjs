import assert from "node:assert/strict";
import test from "node:test";
import { registerHooks } from "node:module";

registerHooks({
  resolve: (specifier, context, nextResolve) =>
    specifier.startsWith(".") && !/\.[a-z]+$/.test(specifier)
      ? nextResolve(`${specifier}.ts`, context)
      : nextResolve(specifier, context),
});
const { analyticsContext, beforeAnalyticsSend, isAnalyticsHost, trackEvent } = await import("../lib/analytics.ts");

test("product routes group across languages without merging their subpages", () => {
  for (const locale of ["en", "it", "fr", "es"]) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    for (const product of ["paguro", "moppo"]) {
      assert.deepEqual(analyticsContext(`${prefix}/${product}/?utm_source=test#questions`), {
        product, locale, route: `/${product}`, page: "product",
      });
    }
    assert.deepEqual(analyticsContext(`https://anguria.studio${prefix}/paguro/privacy/`), {
      product: "paguro", locale, route: "/paguro/privacy", page: "privacy",
    });
    assert.deepEqual(analyticsContext(`${prefix}/paguro/test-notifications/`), {
      product: "paguro", locale, route: "/paguro/test-notifications", page: "test-notifications",
    });
    assert.deepEqual(analyticsContext(`${prefix}/`), { product: "studio", locale, route: "/", page: "home" });
  }
  assert.equal(analyticsContext("/missing/").page, "not-found");
});

test("pageviews get product tags while preserving Umami URLs, referrers and campaign data", () => {
  const payload = { url: "https://anguria.studio/it/paguro/?utm_source=newsletter", referrer: "https://example.com", title: "Paguro" };
  assert.deepEqual(beforeAnalyticsSend("event", payload), { ...payload, tag: "paguro" });
  assert.deepEqual(beforeAnalyticsSend("event", { url: "/" }), { url: "/", tag: "studio" });
  assert.equal(beforeAnalyticsSend("identify", payload), payload);
});

test("events retain action properties and use their source route, not an overriding target product", () => {
  const event = { url: "/fr/paguro/", name: "faq-expand", data: { question: "pricing", product: "wrong", location: "faq" } };
  assert.deepEqual(beforeAnalyticsSend("event", event), {
    ...event, tag: "paguro",
    data: { question: "pricing", location: "faq", product: "paguro", locale: "fr", route: "/paguro", page: "product" },
  });
  assert.equal(event.data.product, "wrong");
});

test("only the exact production hosts are tracked", () => {
  assert.ok(isAnalyticsHost("anguria.studio"));
  assert.ok(isAnalyticsHost("www.anguria.studio"));
  for (const host of ["localhost", "127.0.0.1", "preview.vercel.app", "anguria.studio.example.com", "preview.anguria.studio"]) {
    assert.equal(isAnalyticsHost(host), false);
  }
});

test("tracking safely handles server rendering, previews, blocked scripts and failures", async () => {
  const previousWindow = globalThis.window;
  try {
    delete globalThis.window;
    assert.doesNotThrow(() => trackEvent("faq-expand"));
    const calls = [];
    globalThis.window = { location: { hostname: "localhost" }, umami: { track: (...args) => calls.push(args) } };
    trackEvent("faq-expand");
    assert.equal(calls.length, 0);
    window.location.hostname = "anguria.studio";
    trackEvent("faq-expand", { question: "pricing" });
    assert.deepEqual(calls, [["faq-expand", { question: "pricing" }]]);
    delete window.umami;
    assert.doesNotThrow(() => trackEvent("faq-expand"));
    window.umami = { track: () => { throw new Error("blocked"); } };
    assert.doesNotThrow(() => trackEvent("faq-expand"));
    window.umami = { track: () => Promise.reject(new Error("offline")) };
    trackEvent("faq-expand");
    await new Promise((resolve) => setImmediate(resolve));
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("FAQ topic IDs remain identical and unique in every translation", async () => {
  const dictionaries = await Promise.all(["en", "it", "fr", "es"].map((locale) => import(`../lib/dictionaries/${locale}.ts`)));
  const ids = dictionaries[0].dictionary.paguroPage.faq.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
  for (const { dictionary } of dictionaries) assert.deepEqual(dictionary.paguroPage.faq.map(({ id }) => id), ids);
});
