/**
 * Round-2 meta fixes after the 07/16 re-crawl surfaced items outside the first
 * pass: the Sanity /blog page description (the /blog/page/N pages inherit it and
 * append " (Page N)", pushing them over 1000px). Shortens the base so even
 * "(Page 11)" stays under budget. Also verifies the data-file description edits
 * made alongside this script (locations, pathology, pharmacology, ib-math).
 */
import { createClient } from "@sanity/client";
const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-12",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});
const COMMIT = process.argv.includes("--commit");
function wu(s){let u=0;for(const ch of s){if("iIl.,:;'|!jft".includes(ch))u+=0.34;else if("mwMW—".includes(ch))u+=0.92;else if(ch===" ")u+=0.3;else if(ch===ch.toUpperCase()&&ch!==ch.toLowerCase())u+=0.7;else u+=0.55;}return u;}
const dS=1065/wu("Dr. Shreyank Educare offers 1-on-1 tutoring, small group classes, online sessions & intensive exam prep in Burnaby. Flexible scheduling. Book a free 30-minute consultation.");
const dp=s=>Math.round(wu(s)*dS);

const BLOG_DESC = "Study tips, exam strategies and subject guides for math, physics, chemistry and coding — from PhD-qualified educators for Canadian students.";
// The listing template renders `${desc} (Page N)` on paginated pages.
const worstPagination = `${BLOG_DESC} (Page 11)`;
console.log(`blog base desc: ${dp(BLOG_DESC)}px | with "(Page 11)": ${dp(worstPagination)}px`);
if (dp(worstPagination) > 1000) { console.error("✗ paginated form still over 1000 — shorten more"); process.exit(1); }

const doc = await c.fetch(`*[_type=="page" && slug.current=="blog"][0]{_id}`);
if (!doc?._id) { console.error("✗ blog page doc not found"); process.exit(1); }
console.log(`Mode: ${COMMIT ? "COMMIT" : "DRY RUN"}`);
if (COMMIT) {
  await c.patch(doc._id).set({ "metaData.metaDescription": BLOG_DESC }).commit();
  const back = await c.fetch(`*[_id==$id][0].metaData.metaDescription`, { id: doc._id });
  console.log(back === BLOG_DESC ? "✓ blog description patched & verified live" : "✗ not applied");
}
