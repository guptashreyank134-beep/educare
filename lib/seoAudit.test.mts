import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createServer } from "node:http";
import test from "node:test";

/** Exercise the crawl command against HTTP responses, including headers which
 * cannot be inferred from source files or HTML-only checks. */
async function auditFixture(blockIndexing: boolean, orphan: boolean) {
  let base = "";
  const paths = ["/", "/linked", "/guide"];
  const server = createServer((request, response) => {
    const path = request.url ?? "/";
    if (path === "/sitemap.xml") {
      response.setHeader("Content-Type", "application/xml");
      response.end(`<urlset>${paths.map((entry) => `<url><loc>${base}${entry}</loc></url>`).join("")}</urlset>`);
      return;
    }
    if (path === "/linked" && blockIndexing) response.setHeader("X-Robots-Tag", "googlebot: noindex");
    response.setHeader("Content-Type", "text/html");
    const guideLink = orphan ? "" : '<a href="/guide">Course guide</a>';
    response.end(`<html lang="en"><head><title>Page ${path}</title><meta name="description" content="Description for ${path}"><link rel="canonical" href="${base}${path}"></head><body><h1>Page ${path}</h1>${path === "/" ? `<a href="/linked">Tutoring</a>${guideLink}` : '<a href="/">Home</a>'}</body></html>`);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  base = `http://127.0.0.1:${address.port}`;
  try {
    return await new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
      execFile(process.execPath, ["scripts/seo-audit.mjs"], {
        env: { ...process.env, SEO_AUDIT_BASE: base }, timeout: 30_000,
      }, (error, stdout, stderr) => resolve({ code: Number(error?.code ?? 0), stdout, stderr }));
    });
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test("SEO crawl detects HTTP noindex and orphaned sitemap pages", async () => {
  const result = await auditFixture(true, true);
  assert.equal(result.code, 1, result.stderr);
  assert.match(result.stdout, /indexing blocked by X-Robots-Tag: googlebot: noindex/);
  assert.match(result.stdout, /orphaned sitemap URL/);
});

test("SEO crawl accepts indexable pages with real incoming links", async () => {
  const result = await auditFixture(false, false);
  assert.equal(result.code, 0, result.stderr);
  assert.match(result.stdout, /3 pages, 0 errors, 0 warnings/);
});
