/** Every redirect target must return 200 and appear in the sitemap. */
const { redirectPairs } = await import("../data/redirects.ts");
const { SITE_URL } = await import("../data/businessInfo.ts");

const sitemapXml = await (await fetch(`${SITE_URL}/sitemap.xml`)).text();
const inSitemap = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1].replace(SITE_URL, "") || "/",
  ),
);

const targets = [...new Set(redirectPairs.map(([, to]) => to))].sort();
let failing = 0;
for (const target of targets) {
  const res = await fetch(`${SITE_URL}${target}`, { redirect: "manual" });
  const listed = inSitemap.has(target);
  if (res.status !== 200 || !listed) {
    failing++;
    console.log(
      `  BAD ${String(res.status).padEnd(4)} ${target}  inSitemap=${listed} ${res.headers.get("location") ?? ""}`,
    );
  }
}
console.log(`targets checked: ${targets.length} | failing: ${failing}`);
if (failing > 0) process.exit(1);
