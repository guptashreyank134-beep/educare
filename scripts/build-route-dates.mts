/**
 * Generates data/route-dates.json: the last time each file-based route actually
 * changed, taken from git history.
 *
 * Why a committed artifact rather than shelling out to git inside the sitemap:
 * most CI hosts clone shallow, so `git log` at build time reports one commit for
 * every file and every page would share a date — exactly the fake-uniform
 * lastmod this replaces. Generating here and committing the result keeps the
 * dates true and makes the build deterministic and host-independent.
 *
 * Routes backed by a shared data file (the 100+ seoPages all live in
 * data/seoPages.ts) are dated per entry, by finding the most recent commit whose
 * snapshot changed the entry's actual content. Dating them all by the file's
 * mtime would put one identical date on a third of the sitemap.
 *
 * Run: npm run seo:route-dates
 */

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { routeEntryFingerprints, routeDatesFromSnapshots, type RouteSnapshot } from "./route-date-history.mts";

const { cities, cityPath } = await import("../data/cities.ts");
const { seoPages, seoPagePath } = await import("../data/seoPages.ts");
const { vancouverSeoPages } = await import("../data/vancouverSeoPages.ts");
const { verticalPages, verticalPath } = await import("../data/verticalPages.ts");
const { retiredPaths } = await import("../content/page-policy.ts");

const { values } = parseArgs({ options: { output: { type: "string", default: "data/route-dates.json" } } });
const outputPath = values.output!;

const git = (args: string[]) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });

if (git(["rev-parse", "--is-shallow-repository"]).trim() === "true") {
  throw new Error("Complete Git history is required to generate truthful route dates. Fetch full history before running this script.");
}

/** Most recent commit date per tracked file, from a single history walk. */
function lastCommitDateByFile(): Map<string, string> {
  const out = new Map<string, string>();
  const log = git(["log", "--format=%cI", "--name-only", "--no-renames"]);
  let currentDate = "";
  for (const line of log.split("\n")) {
    const text = line.trim();
    if (!text) continue;
    if (/^\d{4}-\d{2}-\d{2}T/.test(text)) {
      currentDate = text;
    } else if (!out.has(text)) {
      out.set(text, currentDate);
    }
  }
  return out;
}

/**
 * Compare AST-normalized entry content across real Git snapshots. Looking only
 * for changed `slug:` lines misses normal heading/body edits, while whole-file
 * dates incorrectly change every neighbouring page's date.
 */
function lastCommitDateBySlug(file: string, arrayName: string, slugs: string[]): Map<string, string> {
  const commits = git(["log", "--first-parent", "--format=%H %cI", "--", file]).trim().split("\n").filter(Boolean);
  function* snapshots(): Generator<RouteSnapshot> {
    for (const line of commits) {
      const [commit, date] = line.trim().split(" ");
      const source = git(["show", `${commit}:${file}`]);
      yield { date, entries: routeEntryFingerprints(source, arrayName) };
    }
  }
  const dates = routeDatesFromSnapshots(snapshots(), slugs);
  for (const slug of slugs) {
    if (!dates.has(slug)) throw new Error(`No committed content history for ${file}: ${slug}. Commit content before generating dates.`);
  }
  return dates;
}

const fileDates = lastCommitDateByFile();
const routeDates: Record<string, string> = {};

/** Record a route's date, skipping routes that were merged away. */
function record(route: string, date: string | undefined) {
  if (!date || retiredPaths.has(route)) return;
  routeDates[route] = date;
}

// Routes that are their own file.
const FILE_ROUTES: [string, string][] = [
  ["/", "app/page.tsx"],
  ["/about", "app/about/page.tsx"],
  ["/about/dr-shreyank-gupta", "app/about/dr-shreyank-gupta/page.tsx"],
  ["/blog", "app/blog/page.tsx"],
  ["/book", "app/book/page.tsx"],
  ["/contact", "app/contact/page.tsx"],
  ["/homework-help-burnaby", "app/homework-help-burnaby/page.tsx"],
  ["/pricing", "app/pricing/page.tsx"],
  ["/privacy", "app/privacy/page.tsx"],
  ["/terms", "app/terms/page.tsx"],
  ["/resources", "app/resources/page.tsx"],
  ["/services", "app/services/page.tsx"],
  ["/locations", "app/locations/page.tsx"],
  ["/programs", "app/programs/page.tsx"],
  [
    "/guides/how-to-choose-a-tutor-burnaby-vancouver",
    "app/guides/how-to-choose-a-tutor-burnaby-vancouver/page.tsx",
  ],
];
for (const [route, file] of FILE_ROUTES) record(route, fileDates.get(file));

// Program hubs: one directory each.
for (const [file, date] of fileDates) {
  const match = file.match(/^app\/programs\/([^/]+)\/page\.tsx$/);
  if (match) record(`/programs/${match[1]}`, date);
}

// Data-file-backed routes, dated per entry.
const cityDates = lastCommitDateBySlug("data/cities.ts", "cities", cities.map((c) => c.slug));
for (const city of cities) {
  record(cityPath(city.slug), cityDates.get(city.slug));
}

// These reviewed entries replace (or extend) the base SEO array at runtime.
const vancouverSlugs = new Set(vancouverSeoPages.map((page) => page.slug));
const seoDates = lastCommitDateBySlug("data/seoPages.ts", "seoPages", seoPages.filter((page) => !vancouverSlugs.has(page.slug)).map((page) => page.slug));
const vancouverDates = lastCommitDateBySlug("data/vancouverSeoPages.ts", "vancouverSeoPages", [...vancouverSlugs]);
for (const page of seoPages) {
  record(seoPagePath(page.slug), vancouverDates.get(page.slug) ?? seoDates.get(page.slug));
}

const verticalDates = lastCommitDateBySlug(
  "data/verticalPages.ts",
  "verticalPages",
  verticalPages.map((p) => p.slug),
);
for (const page of verticalPages) {
  record(
    verticalPath(page.slug),
    verticalDates.get(page.slug),
  );
}

const sorted = Object.fromEntries(Object.entries(routeDates).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(outputPath, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");

const distinct = new Set(Object.values(sorted)).size;
const total = Object.keys(sorted).length;
const counts = new Map<string, number>();
for (const date of Object.values(sorted)) counts.set(date, (counts.get(date) ?? 0) + 1);
const largest = [...counts.values()].sort((a, b) => b - a)[0] ?? 0;

console.log(`wrote ${outputPath}`);
console.log(`routes dated:     ${total}`);
console.log(`distinct dates:   ${distinct}`);
console.log(`largest same-date group: ${largest} (${((largest / total) * 100).toFixed(1)}%)`);
