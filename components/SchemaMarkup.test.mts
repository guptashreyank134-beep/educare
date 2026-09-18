import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

/**
 * Asserts against the real build output rather than the helper return values,
 * so a page that forgets to render its schema fails here too.
 *
 * Requires `next build` to have run. Skips with a clear message otherwise, so a
 * fresh clone reports "run the build" instead of a confusing assertion failure.
 */

const PAGES: Record<string, string> = {
  home: ".next/server/app/index.html",
  about: ".next/server/app/about.html",
  author: ".next/server/app/about/dr-shreyank-gupta.html",
  cityHub: ".next/server/app/math-tutor-burnaby.html",
  subject: ".next/server/app/programs/mathematics.html",
  guide: ".next/server/app/guides/how-to-choose-a-tutor-burnaby-vancouver.html",
};

const ORGANIZATION_ID = "https://www.drshreyankeducare.com/#organization";

function readJsonLd(file: string): Record<string, unknown>[] {
  const html = readFileSync(file, "utf8");
  const blocks = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  return blocks.map(([, body]) => {
    const decoded = body
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    return JSON.parse(decoded) as Record<string, unknown>;
  });
}

const missing = Object.entries(PAGES).filter(([, file]) => !existsSync(file));
const buildPresent = missing.length === 0;

function typesOf(blocks: Record<string, unknown>[]): string[] {
  return blocks.flatMap((block) => {
    const type = block["@type"];
    return Array.isArray(type) ? (type as string[]) : [type as string];
  });
}

test("build output is present for the schema tests", { skip: buildPresent ? false : true }, () => {
  assert.ok(buildPresent);
});

for (const [name, file] of Object.entries(PAGES)) {
  test(`${name}: JSON-LD parses`, { skip: !buildPresent }, () => {
    const blocks = readJsonLd(file);
    assert.ok(blocks.length > 0, `${file} renders no JSON-LD`);
  });
}

test("home carries the Organization entity", { skip: !buildPresent }, () => {
  const types = typesOf(readJsonLd(PAGES.home));
  assert.ok(
    types.includes("EducationalOrganization") && types.includes("LocalBusiness"),
    `expected EducationalOrganization + LocalBusiness, got ${types.join(", ")}`,
  );
});

test("author page carries a Person and a BreadcrumbList", { skip: !buildPresent }, () => {
  const types = typesOf(readJsonLd(PAGES.author));
  assert.ok(types.includes("Person"), `expected Person, got ${types.join(", ")}`);
  assert.ok(types.includes("BreadcrumbList"), `expected BreadcrumbList, got ${types.join(", ")}`);
});

test("guide carries an Article", { skip: !buildPresent }, () => {
  const types = typesOf(readJsonLd(PAGES.guide));
  assert.ok(types.includes("Article"), `expected Article, got ${types.join(", ")}`);
});

test("nested routes carry a BreadcrumbList", { skip: !buildPresent }, () => {
  for (const name of ["author", "cityHub", "subject", "guide"]) {
    const types = typesOf(readJsonLd(PAGES[name]));
    assert.ok(types.includes("BreadcrumbList"), `${name} has no BreadcrumbList`);
  }
});

/** Every `@id` anywhere in a parsed JSON-LD tree. */
function collectIds(node: unknown, found: Set<string>): Set<string> {
  if (Array.isArray(node)) {
    for (const item of node) collectIds(item, found);
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (key === "@id" && typeof value === "string") found.add(value);
      else collectIds(value, found);
    }
  }
  return found;
}

test("one Organization @id is used everywhere", { skip: !buildPresent }, () => {
  const organizationIds = new Set<string>();
  for (const file of Object.values(PAGES)) {
    for (const id of collectIds(readJsonLd(file), new Set<string>())) {
      if (id.endsWith("#organization")) organizationIds.add(id);
    }
  }
  // Guard against passing vacuously: the entity must actually be present.
  assert.ok(organizationIds.size > 0, "no Organization @id found in any rendered page");
  assert.equal(
    organizationIds.size,
    1,
    `multiple Organization @ids in use: ${[...organizationIds].join(", ")}`,
  );
  assert.equal([...organizationIds][0], ORGANIZATION_ID);
});

test("FAQPage answers appear in the server-rendered HTML", { skip: !buildPresent }, () => {
  const html = readFileSync(PAGES.cityHub, "utf8");
  const faq = readJsonLd(PAGES.cityHub).find((block) => block["@type"] === "FAQPage");
  assert.ok(faq, "city hub renders no FAQPage markup");

  const visible = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

  const questions = faq.mainEntity as { acceptedAnswer: { text: string } }[];
  assert.ok(questions.length > 0, "FAQPage has no questions");
  for (const question of questions) {
    // Markup that states an answer the visitor cannot see is the thing Google
    // penalises, so compare against the rendered text rather than the source.
    const answer = question.acceptedAnswer.text.replace(/\s+/g, " ").trim().slice(0, 60);
    assert.ok(visible.includes(answer), `FAQ answer is not visible on the page: "${answer}"`);
  }
});

test("no page claims an unverified alumniOf", { skip: !buildPresent }, () => {
  for (const [name, file] of Object.entries(PAGES)) {
    const html = readFileSync(file, "utf8");
    assert.ok(!/University of Quebec/i.test(html), `${name} still claims an unverified institution`);
  }
});
