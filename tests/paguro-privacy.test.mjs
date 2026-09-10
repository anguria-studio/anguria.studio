import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import {
  formatEffectiveDate,
  paguroPrivacyEffective,
  paguroPrivacySections,
} from "../lib/privacy/paguro-policy.ts";
import { policy as en } from "../lib/privacy/paguro/en.ts";
import { policy as it } from "../lib/privacy/paguro/it.ts";
import { policy as fr } from "../lib/privacy/paguro/fr.ts";
import { policy as es } from "../lib/privacy/paguro/es.ts";
import { localePath } from "../lib/i18n.ts";
import { pagePaths, paguroPrivacyPath } from "../lib/apps.ts";

/**
 * `lib/metadata.ts` imports its siblings the way TypeScript and Next resolve
 * them, without a file extension, which Node's type stripping does not follow.
 * Teaching the resolver that one rule is cheaper than importing the module's
 * URL logic twice — and the URL below is what gets typed into App Store Connect.
 */
registerHooks({
  resolve: (specifier, context, nextResolve) =>
    specifier.startsWith(".") && !/\.[a-z]+$/.test(specifier)
      ? nextResolve(`${specifier}.ts`, context)
      : nextResolve(specifier, context),
});
const { absoluteUrl } = await import("../lib/metadata.ts");

const policies = { en, it, fr, es };

/** `string` for a plain paragraph, otherwise the block's own `kind`. */
const kindOf = (block) => (typeof block === "string" ? "string" : block.kind);

/** Every block of a policy, tagged with where it lives, in reading order. */
function blocks(policy) {
  return [
    ...policy.intro.map((block, index) => [`intro[${index}]`, block]),
    ...paguroPrivacySections.flatMap((id) =>
      policy.sections[id].blocks.map((block, index) => [`${id}[${index}]`, block]),
    ),
  ];
}

/**
 * Every string a reader will see, tagged with its path. Runs are kept separate
 * from their paragraph so the content checks can see each one, but a `p` block
 * also yields its joined text: `contact[0].runs[0]` ends with a deliberate space
 * before the mailto link, so only the join can be trim-checked.
 */
function strings(policy) {
  const out = [
    ["title", policy.title, "trim"],
    ["description", policy.description, "trim"],
  ];
  for (const id of paguroPrivacySections) {
    out.push([`${id}.heading`, policy.sections[id].heading, "trim"]);
  }
  for (const [where, block] of blocks(policy)) {
    if (typeof block === "string") out.push([where, block, "trim"]);
    else if (block.kind === "ul") {
      block.items.forEach((item, i) => out.push([`${where}.items[${i}]`, item, "trim"]));
    } else {
      const runs = block.runs.filter((run) => typeof run === "string");
      runs.forEach((run, i) => out.push([`${where}.runs[${i}]`, run, "loose"]));
      out.push([`${where} (joined)`, runs.join(""), "trim"]);
    }
  }
  return out;
}

const emailRuns = (policy) =>
  blocks(policy).flatMap(([where, block]) =>
    typeof block === "string" || block.kind !== "p"
      ? []
      : block.runs.filter((run) => typeof run !== "string" && run.kind === "email").map(() => where),
  );

test("the effective date is one ISO constant, formatted per locale", () => {
  assert.match(paguroPrivacyEffective, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(formatEffectiveDate("en"), "10 September 2026");
  assert.equal(formatEffectiveDate("it"), "10 settembre 2026");
  assert.equal(formatEffectiveDate("fr"), "10 septembre 2026");
  assert.equal(formatEffectiveDate("es"), "10 de septiembre de 2026");
});

test("every translation has English's sections, blocks and block kinds", () => {
  for (const [locale, policy] of Object.entries(policies)) {
    assert.deepEqual(Object.keys(policy.sections), [...paguroPrivacySections], locale);
    const here = blocks(policy);
    const source = blocks(en);
    assert.deepEqual(
      here.map(([where, block]) => `${where}:${kindOf(block)}`),
      source.map(([where, block]) => `${where}:${kindOf(block)}`),
      locale,
    );
  }
});

test("the address is a single email run, and it lives in the contact section", () => {
  for (const [locale, policy] of Object.entries(policies)) {
    assert.deepEqual(emailRuns(policy), ["contact[0]"], locale);
  }
});

test("no policy string is empty, padded, a literal address, or markdown", () => {
  for (const [locale, policy] of Object.entries(policies)) {
    for (const [where, value, strictness] of strings(policy)) {
      const at = `${locale}.${where}`;
      assert.equal(typeof value, "string", at);
      assert.ok(value.trim().length > 0, `${at} is empty`);
      assert.ok(!value.includes("@"), `${at} contains a literal email address`);
      assert.ok(!value.includes("]("), `${at} contains a markdown link`);
      if (strictness === "trim") assert.equal(value, value.trim(), `${at} is padded`);
    }
  }
});

test("the policy is reachable at one path per locale", () => {
  assert.ok(pagePaths.includes(paguroPrivacyPath));
  assert.equal(localePath("en", paguroPrivacyPath), "/paguro/privacy");
  assert.equal(localePath("it", paguroPrivacyPath), "/it/paguro/privacy");
  assert.equal(absoluteUrl("fr", paguroPrivacyPath), "https://anguria.studio/fr/paguro/privacy/");
});
