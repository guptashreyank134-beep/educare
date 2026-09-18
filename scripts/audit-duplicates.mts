/**
 * Phase A of the programmatic-page audit: measure how much genuinely unique
 * content each indexable URL has, and how close it is to its nearest neighbour.
 *
 * Boilerplate is identified from the corpus rather than by hand-coded selectors:
 * any 5-gram that appears on more than BOILERPLATE_THRESHOLD of pages is shared
 * chrome (nav, footer, CTA, the repeated FAQ block), so it is subtracted before
 * anything is counted or compared. What is left is the page's own text.
 *
 * Writes reports/page-inventory.csv. Read-only — it proposes actions, it does
 * not apply them. Phase B reads the decisions from content/page-policy.ts.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const { SITE_URL } = await import("../data/businessInfo.ts");
const { cities } = await import("../data/cities.ts");
const { seoPages } = await import("../data/seoPages.ts");
const { verticalPages } = await import("../data/verticalPages.ts");

const SHINGLE_SIZE = 5;
const BOILERPLATE_THRESHOLD = 0.4;
const CONCURRENCY = 8;
const MERGE_SIMILARITY = 0.8;

/** City hubs to keep. Everything else merges into its nearest kept hub. */
const KEEP_CITIES = [
  "burnaby",
  "vancouver",
  "surrey",
  "richmond",
  "new-westminster",
  "coquitlam",
];

/** Nearest kept hub for each city hub being retired. */
const CITY_MERGE_TARGET: Record<string, string> = {
  "north-vancouver": "vancouver",
  "west-vancouver": "vancouver",
  "port-moody": "coquitlam",
  "port-coquitlam": "coquitlam",
  delta: "surrey",
};

/** Ranking modifiers that should not have their own URL. */
const MODIFIERS = [
  "best",
  "top",
  "private",
  "near-me",
  "affordable",
  "cheap",
  "expert",
  "local",
  "one-on-one",
];

const SUBJECTS = [
  "pre-calculus",
  "calculus",
  "mathematics",
  "math",
  "chemistry",
  "physics",
  "biology",
  "computer-science",
  "coding",
  "python",
  "javascript",
  "statistics",
  "economics",
  "finance",
  "french",
  "mandarin",
  "english",
  "science",
  "stem",
  "sat",
  "mcat",
  "gre",
  "gmat",
  "ib",
  "ap",
];

type RouteType = "city" | "seoPage" | "vertical" | "program" | "blog" | "guide" | "static";

interface PageRecord {
  url: string;
  routeType: RouteType;
  city: string;
  subject: string;
  modifier: string;
  totalWords: number;
  uniqueWords: number;
  maxSimilarity: number;
  mostSimilarUrl: string;
  action: string;
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function shingle(words: string[], size = SHINGLE_SIZE): string[] {
  const out: string[] = [];
  for (let i = 0; i + size <= words.length; i++) out.push(words.slice(i, i + size).join(" "));
  return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

/** Strip markup and the obvious chrome elements, leaving readable page text. */
function extractText(html: string): string {
  let body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ");
  const main = body.match(/<main[\s\S]*?<\/main>/i);
  if (main) body = main[0];
  return body
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function classify(path: string): { routeType: RouteType; city: string; subject: string; modifier: string } {
  const citySlugs = cities.map((c) => c.slug);
  const seoSlugs = new Set(seoPages.map((p) => p.slug));
  const verticalSlugs = new Set(verticalPages.map((p) => p.slug));
  const slug = path.replace(/^\//, "");

  let routeType: RouteType = "static";
  if (path.startsWith("/blog")) routeType = "blog";
  else if (path.startsWith("/programs")) routeType = "program";
  else if (path.startsWith("/guides")) routeType = "guide";
  else if (citySlugs.some((c) => slug === `math-tutor-${c}`)) routeType = "city";
  else if (seoSlugs.has(slug)) routeType = "seoPage";
  else if (verticalSlugs.has(slug)) routeType = "vertical";

  const city = citySlugs.find((c) => slug.includes(c)) ?? "";
  // Longest match first so "pre-calculus" is not reported as "calculus".
  const subject = [...SUBJECTS].sort((a, b) => b.length - a.length).find((s) => slug.includes(s)) ?? "";
  const modifier = MODIFIERS.find((m) => slug.includes(m)) ?? "";
  return { routeType, city, subject, modifier };
}

async function fetchAll(paths: string[]): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  let index = 0;
  async function worker() {
    while (index < paths.length) {
      const path = paths[index++];
      try {
        const res = await fetch(`${SITE_URL}${path}`, { redirect: "manual" });
        if (res.status === 200) results.set(path, extractText(await res.text()));
      } catch {
        // Unreachable URL: omitted from the corpus rather than scored as empty.
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return results;
}

const sitemapXml = await (await fetch(`${SITE_URL}/sitemap.xml`)).text();
const paths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1].replace(SITE_URL, "") || "/",
);
console.log(`sitemap URLs: ${paths.length}`);

const texts = await fetchAll(paths);
console.log(`fetched 200 OK: ${texts.size}`);

// Corpus-wide 5-gram frequency identifies the shared chrome.
const wordsByPath = new Map<string, string[]>();
const shinglesByPath = new Map<string, string[]>();
const documentFrequency = new Map<string, number>();
for (const [path, text] of texts) {
  const words = normalize(text).split(" ").filter(Boolean);
  const grams = shingle(words);
  wordsByPath.set(path, words);
  shinglesByPath.set(path, grams);
  for (const gram of new Set(grams)) {
    documentFrequency.set(gram, (documentFrequency.get(gram) ?? 0) + 1);
  }
}

const boilerplateCutoff = texts.size * BOILERPLATE_THRESHOLD;
const boilerplate = new Set(
  [...documentFrequency.entries()].filter(([, n]) => n > boilerplateCutoff).map(([gram]) => gram),
);
console.log(
  `boilerplate 5-grams (on >${Math.round(BOILERPLATE_THRESHOLD * 100)}% of pages): ${boilerplate.size}`,
);

/** Words not covered by any boilerplate 5-gram — the page's own prose. */
function uniqueWordCount(words: string[], grams: string[]): number {
  const covered = new Array(words.length).fill(false);
  for (let i = 0; i < grams.length; i++) {
    if (!boilerplate.has(grams[i])) continue;
    for (let j = i; j < i + SHINGLE_SIZE && j < words.length; j++) covered[j] = true;
  }
  return covered.filter((flag) => !flag).length;
}

const uniqueShingles = new Map<string, Set<string>>();
for (const [path, grams] of shinglesByPath) {
  uniqueShingles.set(path, new Set(grams.filter((g) => !boilerplate.has(g))));
}

const analysed = [...texts.keys()];
const records: PageRecord[] = [];
for (const path of analysed) {
  let maxSimilarity = 0;
  let mostSimilar = "";
  for (const other of analysed) {
    if (other === path) continue;
    const score = jaccard(uniqueShingles.get(path)!, uniqueShingles.get(other)!);
    if (score > maxSimilarity) {
      maxSimilarity = score;
      mostSimilar = other;
    }
  }
  const { routeType, city, subject, modifier } = classify(path);
  records.push({
    url: path,
    routeType,
    city,
    subject,
    modifier,
    totalWords: wordsByPath.get(path)!.length,
    uniqueWords: uniqueWordCount(wordsByPath.get(path)!, shinglesByPath.get(path)!),
    maxSimilarity: Number(maxSimilarity.toFixed(3)),
    mostSimilarUrl: mostSimilar,
    action: "",
  });
}

const byUrl = new Map(records.map((r) => [r.url, r]));

/** Subject hub for a subject keyword, where one exists. */
const SUBJECT_HUB: Record<string, string> = {
  chemistry: "/programs/chemistry",
  physics: "/programs/physics",
  biology: "/programs/biology",
  mathematics: "/programs/mathematics",
  math: "/programs/mathematics",
  "pre-calculus": "/programs/pre-calculus",
  calculus: "/programs/pre-calculus",
  "computer-science": "/programs/computer-science",
  python: "/programs/python",
  javascript: "/programs/javascript",
  french: "/programs/french",
  mandarin: "/programs/mandarin",
  finance: "/programs/finance",
  sat: "/programs/sat-prep",
  mcat: "/programs/mcat-prep",
  gre: "/programs/gre-prep",
  gmat: "/programs/gmat-prep",
};

/**
 * Where a modifier page should merge. Preference order: the same slug without
 * the modifier, then the subject's own hub, then the city hub. A chemistry page
 * must never land on the city maths hub just because it names a city.
 */
function baseUrlFor(record: PageRecord): string | null {
  if (!record.modifier) return null;
  const stripped = record.url.replace(`${record.modifier}-`, "").replace(`-${record.modifier}`, "");
  // "near me" is local intent, so it belongs on a city hub rather than the
  // nationwide subject hub.
  const cityHub = record.city ? `/math-tutor-${record.city}` : "/math-tutor-burnaby";
  const subjectHub = record.subject ? SUBJECT_HUB[record.subject] : "";
  const candidates =
    record.modifier === "near-me"
      ? [stripped, cityHub, subjectHub]
      : [stripped, subjectHub, cityHub, "/math-tutor-burnaby"];
  return candidates.filter(Boolean).find((c) => c !== record.url && byUrl.has(c)) ?? null;
}

for (const record of records) {
  if (record.routeType === "city") {
    const slug = record.url.replace("/math-tutor-", "");
    if (!KEEP_CITIES.includes(slug)) {
      record.action = `merge -> /math-tutor-${CITY_MERGE_TARGET[slug] ?? "burnaby"}`;
      continue;
    }
    record.action = "keep";
    continue;
  }

  if (record.routeType === "seoPage" && record.modifier) {
    const base = baseUrlFor(record);
    record.action = base ? `merge -> ${base}` : "noindex";
    continue;
  }

  if (record.maxSimilarity >= MERGE_SIMILARITY && record.mostSimilarUrl) {
    record.action = `merge -> ${record.mostSimilarUrl}`;
    continue;
  }

  record.action = "keep";
}

const header = [
  "url",
  "route_type",
  "city",
  "subject",
  "modifier",
  "unique_words",
  "total_words",
  "max_similarity",
  "most_similar_url",
  "proposed_action",
];
const csvCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
const csv = [
  header.join(","),
  ...records
    .sort((a, b) => b.maxSimilarity - a.maxSimilarity)
    .map((r) =>
      [
        r.url,
        r.routeType,
        r.city,
        r.subject,
        r.modifier,
        r.uniqueWords,
        r.totalWords,
        r.maxSimilarity,
        r.mostSimilarUrl,
        r.action,
      ]
        .map(csvCell)
        .join(","),
    ),
].join("\n");

const outPath = "reports/page-inventory.csv";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${csv}\n`, "utf8");

const counts = new Map<string, number>();
for (const r of records) {
  const key = r.action.startsWith("merge") ? "merge" : r.action;
  counts.set(key, (counts.get(key) ?? 0) + 1);
}
const thin = records.filter((r) => r.uniqueWords < 300).length;
const above = (n: number) => records.filter((r) => r.maxSimilarity >= n).length;

console.log(`\nwrote ${outPath}`);
console.log(`\nproposed actions: ${[...counts].map(([k, v]) => `${k}=${v}`).join("  ")}`);
console.log(`pages with <300 unique words: ${thin}`);
console.log(`pages >=0.8 similar: ${above(0.8)}   >=0.5: ${above(0.5)}   >=0.3: ${above(0.3)}`);
console.log("\nproposed merges:");
for (const r of records.filter((x) => x.action.startsWith("merge")).sort((a, b) => a.url.localeCompare(b.url))) {
  console.log(`  ${r.url.padEnd(44)} ${r.action}   (unique=${r.uniqueWords}, sim=${r.maxSimilarity})`);
}
