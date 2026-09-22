/**
 * Production SEO regression check.
 *
 * Starts the production server against the existing build, then asserts the
 * invariants each earlier fix established. Anything that fails here is a
 * regression, not a style preference.
 *
 * Run: npm run seo:check   (requires `next build` to have run first)
 *
 * Dependency-light on purpose: node built-ins plus tsx, both already present.
 * A headless browser would test the same HTML this reads from the server.
 */

import { execFileSync, spawn, type ChildProcess } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const { redirectPairs, redirectSources } = await import("../data/redirects.ts");
const { noindexPaths, retiredPaths } = await import("../content/page-policy.ts");
const { answerPages, answerPagePath } = await import("../content/answer-pages.ts");

const PORT = Number(process.env.SEO_CHECK_PORT ?? 3999);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const CONCURRENCY = 10;
/** Public origin as it appears in canonical tags and the sitemap. */
const PUBLIC_ORIGIN = "https://www.drshreyankeducare.com";

const failures: string[] = [];
const fail = (check: string, detail: string) => failures.push(`[${check}] ${detail}`);

function loadEnvLocal() {
  if (!existsSync(".env.local")) return;
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i <= 0 || line.trim().startsWith("#")) continue;
    process.env[line.slice(0, i).trim()] ??= line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
}

/**
 * Refuse to run against a server this script did not start. A leftover server
 * from an earlier run serves an earlier build, which silently turns this whole
 * check into a lie.
 */
async function assertPortFree(): Promise<void> {
  try {
    await fetch(`${ORIGIN}/robots.txt`, { redirect: "manual" });
  } catch {
    return; // Nothing listening, which is what we want.
  }
  throw new Error(
    `something is already listening on ${ORIGIN}. It would serve a stale build ` +
      `and make this check meaningless. Stop it, or set SEO_CHECK_PORT to a free port.`,
  );
}

/**
 * `kill()` on Windows leaves the real node child running under the npx shim, and
 * the kill must finish before process.exit or the server survives the run and
 * blocks the next one.
 */
function stopServer(child: ChildProcess | undefined): void {
  if (!child?.pid) return;
  if (process.platform === "win32") {
    try {
      execFileSync("taskkill", ["/F", "/T", "/PID", String(child.pid)], { stdio: "ignore" });
    } catch {
      // Already gone.
    }
  } else {
    child.kill("SIGTERM");
  }
}

async function waitForServer(timeoutMs = 90_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${ORIGIN}/robots.txt`, { redirect: "manual" });
      if (res.status > 0) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`server did not start on ${ORIGIN} within ${timeoutMs}ms`);
}

/** Runs `worker` over `items` with a bounded number of concurrent tasks. */
async function mapLimit<T>(items: T[], worker: (item: T) => Promise<void>): Promise<void> {
  let index = 0;
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (index < items.length) await worker(items[index++]);
  });
  await Promise.all(runners);
}

/**
 * Fetch, retrying only when the connection itself fails. A transient drop under
 * concurrency must not fail the build — but a response the server actually sent,
 * including a 404, is a real result and is never retried.
 */
async function fetchWithRetry(url: string, attempts = 3): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fetch(url, { redirect: "manual" });
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
    }
  }
  throw lastError;
}

const tagContent = (html: string, re: RegExp) => html.match(re)?.[1]?.trim();

function parseJsonLd(html: string): { ok: boolean; error?: string } {
  const blocks = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  for (const [, body] of blocks) {
    try {
      JSON.parse(body);
    } catch (error) {
      return { ok: false, error: (error as Error).message };
    }
  }
  return { ok: true };
}

/** Internal hrefs, excluding anchors, query-only links and non-page assets. */
function internalLinks(html: string): string[] {
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  return [...new Set(hrefs)].filter(
    (href) => !/\.(png|jpe?g|webp|svg|ico|css|js|xml|txt|pdf|webmanifest)$/i.test(href),
  );
}

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

let server: ChildProcess | undefined;

try {
  loadEnvLocal();

  if (!existsSync(".next/BUILD_ID")) {
    console.error("No production build found. Run `next build` first.");
    process.exit(1);
  }

  await assertPortFree();

  console.log(`starting production server on ${ORIGIN} ...`);
  server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "ignore",
    shell: process.platform === "win32",
  });
  await waitForServer();
  console.log("server up\n");

  // ── Sitemap: every URL 200, self-canonical, parseable JSON-LD ─────────────
  const sitemapXml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  const sitemapEntries = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    normalize(m[1].replace(PUBLIC_ORIGIN, "")),
  );
  const lastmods = [...sitemapXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  console.log(`sitemap URLs: ${sitemapEntries.length}`);

  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();
  const linkTargets = new Set<string>();

  await mapLimit(sitemapEntries, async (path) => {
    let res: Response;
    try {
      res = await fetchWithRetry(`${ORIGIN}${path}`);
    } catch (error) {
      fail("sitemap-200", `${path} could not be fetched: ${(error as Error).message}`);
      return;
    }
    if (res.status !== 200) {
      fail("sitemap-200", `${path} returned ${res.status}`);
      return;
    }

    const html = await res.text();

    const canonical = tagContent(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
    if (!canonical) {
      fail("canonical", `${path} has no canonical tag`);
    } else if (normalize(canonical.replace(PUBLIC_ORIGIN, "")) !== path) {
      fail("canonical", `${path} canonical points at ${canonical}`);
    }

    if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) {
      fail("noindex-in-sitemap", `${path} is noindex but listed in the sitemap`);
    }

    const jsonLd = parseJsonLd(html);
    if (!jsonLd.ok) fail("json-ld", `${path} has unparseable JSON-LD: ${jsonLd.error}`);

    const title = tagContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    if (title) titles.set(title, [...(titles.get(title) ?? []), path]);

    const description = tagContent(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
    if (description) {
      descriptions.set(description, [...(descriptions.get(description) ?? []), path]);
    }

    for (const href of internalLinks(html)) linkTargets.add(normalize(href));
  });

  // ── Duplicate titles / descriptions across indexable pages ────────────────
  for (const [title, paths] of titles) {
    if (paths.length > 1) {
      fail("duplicate-title", `${paths.length} pages share "${title}": ${paths.slice(0, 4).join(", ")}`);
    }
  }
  for (const paths of descriptions.values()) {
    if (paths.length > 1) {
      fail(
        "duplicate-description",
        `${paths.length} pages share a meta description: ${paths.slice(0, 4).join(", ")}`,
      );
    }
  }

  // ── Identical-lastmod condition from Task 4 ───────────────────────────────
  const lastmodCounts = new Map<string, number>();
  for (const value of lastmods) lastmodCounts.set(value, (lastmodCounts.get(value) ?? 0) + 1);
  const largest = Math.max(0, ...lastmodCounts.values());
  const share = sitemapEntries.length ? largest / sitemapEntries.length : 0;
  if (share > 0.2) {
    fail(
      "identical-lastmod",
      `${largest} of ${sitemapEntries.length} entries (${(share * 100).toFixed(1)}%) share one lastmod`,
    );
  }

  // ── Redirects: one hop, permanent ─────────────────────────────────────────
  await mapLimit(redirectPairs, async ([from, to]) => {
    let res: Response;
    try {
      res = await fetchWithRetry(`${ORIGIN}${from}`);
    } catch (error) {
      fail("redirect-status", `${from} could not be fetched: ${(error as Error).message}`);
      return;
    }
    if (res.status !== 301 && res.status !== 308) {
      fail("redirect-status", `${from} returned ${res.status}, expected 301/308`);
      return;
    }
    const location = normalize(res.headers.get("location") ?? "");
    if (location !== normalize(to)) {
      fail("redirect-target", `${from} went to ${location}, expected ${normalize(to)}`);
    }
    const hop = await fetchWithRetry(`${ORIGIN}${location}`);
    if (hop.status !== 200) {
      fail("redirect-target-status", `${from} -> ${location} returned ${hop.status}, expected 200`);
    }
    if (hop.status >= 300 && hop.status < 400) {
      fail("redirect-chain", `${from} -> ${location} -> ${hop.headers.get("location")}`);
    }
  });

  // ── Internal links must not point at a redirect or a 404 ──────────────────
  const sitemapSet = new Set(sitemapEntries);
  const toVerify = [...linkTargets].filter((href) => !sitemapSet.has(href));
  await mapLimit(toVerify, async (href) => {
    if (redirectSources.has(href)) {
      fail("internal-link-redirect", `a page links to ${href}, which permanently redirects`);
      return;
    }
    const res = await fetchWithRetry(`${ORIGIN}${href}`);
    if (res.status === 404) fail("internal-link-404", `a page links to ${href}, which 404s`);
    else if (res.status >= 300 && res.status < 400) {
      fail("internal-link-redirect", `a page links to ${href}, which redirects`);
    }
  });

  // ── Drafts and noindexed pages must not be advertised ─────────────────────
  const llms = await (await fetch(`${ORIGIN}/llms.txt`)).text();
  const draftPaths = answerPages
    .filter((page) => page.status === "draft")
    .map((page) => answerPagePath(page.slug));
  for (const path of [...draftPaths, ...noindexPaths, ...retiredPaths]) {
    if (sitemapSet.has(path)) fail("draft-in-sitemap", `${path} is not indexable but is in the sitemap`);
    if (llms.includes(`${PUBLIC_ORIGIN}${path})`)) {
      fail("draft-in-llms", `${path} is not indexable but is listed in llms.txt`);
    }
  }

  // ── Report ────────────────────────────────────────────────────────────────
  console.log("");
  if (failures.length === 0) {
    console.log(`PASS — ${sitemapEntries.length} URLs, ${redirectPairs.length} redirects, ${toVerify.length} off-sitemap link targets checked.`);
  } else {
    const grouped = new Map<string, number>();
    for (const failure of failures) {
      const key = failure.slice(1, failure.indexOf("]"));
      grouped.set(key, (grouped.get(key) ?? 0) + 1);
    }
    console.error(`FAIL — ${failures.length} problem(s):`);
    for (const [check, count] of [...grouped].sort((a, b) => b[1] - a[1])) {
      console.error(`  ${String(count).padStart(4)}  ${check}`);
    }
    console.error("");
    for (const failure of failures.slice(0, 40)) console.error(`  ${failure}`);
    if (failures.length > 40) console.error(`  ... and ${failures.length - 40} more`);
  }
} finally {
  stopServer(server);
}

process.exit(failures.length === 0 ? 0 : 1);
