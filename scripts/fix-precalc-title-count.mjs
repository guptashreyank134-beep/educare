/**
 * The body of this post was rewritten from nine mistakes to ten; the title and
 * meta still said seven. Align them to what the article actually contains.
 *
 * Counts the mistakes from the live body rather than trusting my own memory.
 */
import { client, commit } from "./flagship-lib.mjs";
const SLUG = "common-pre-calculus-12-mistakes-burnaby";

const doc = await client.fetch(
  `*[_type=="post" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id, title, metaData, body}`, { s: SLUG });
if (!doc) { console.error("✗ not found"); process.exit(1); }

const text = doc.body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");
const claimed = (text.match(/the same (\w+), over and over/) || [])[1];
const W2N = { seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11 };
const n = W2N[claimed];
if (!n) { console.error(`✗ could not read the body's own count (got "${claimed}") — refusing to guess`); process.exit(1); }

const title = `${n} Common Pre-Calculus 12 Mistakes Burnaby Students Make`;
const metaTitle = `${n} Common Pre-Calculus 12 Mistakes | Burnaby Tutoring`;
const metaDescription = (doc.metaData?.metaDescription || "").replace(/\bseven\b/i, claimed);

console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
console.log(`  body claims        : "${claimed}" (${n})`);
console.log(`  title  was         : ${doc.title}`);
console.log(`  title  becomes     : ${title}`);
console.log(`  metaTitle becomes  : ${metaTitle}  (${metaTitle.length} chars)`);
console.log(`  metaDesc  was      : ${(doc.metaData?.metaDescription || "").slice(0, 90)}`);
console.log(`  metaDesc  becomes  : ${metaDescription.slice(0, 90)}`);

if (metaTitle.length > 60) { console.error("  ✗ metaTitle over 60 chars"); process.exit(1); }
if (/\bseven\b/i.test(metaDescription)) { console.error("  ✗ 'seven' still present in the description"); process.exit(1); }

if (commit) {
  await client.patch(doc._id).set({ title, "metaData.metaTitle": metaTitle, "metaData.metaDescription": metaDescription }).commit();
  console.log("  ✓ aligned (live)");
} else console.log("\nRe-run with --commit to apply.");
