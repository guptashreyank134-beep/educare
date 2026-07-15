/**
 * Replace "our Burnaby centre" language in Sanity content.
 *
 * In-person sessions happen at the founder's home, not a facility. "Centre"
 * tells a parent to expect reception and classrooms, and they arrive at a flat
 * — an expectation gap at the worst possible moment, and closer to misleading
 * than the business deserves.
 *
 * The address stays: students genuinely do visit, so it is accurate. Only the
 * word that implies a facility changes.
 *
 * Idempotent — re-running finds nothing to change.
 *
 *   Preview:  node --env-file=.env.local scripts/fix-centre-language.mjs
 *   Apply:    node --env-file=.env.local scripts/fix-centre-language.mjs --commit
 */
import { createClient } from "@sanity/client";

const commit = process.argv.includes("--commit");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-12";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) { console.error("✗ Missing Sanity env vars."); process.exit(1); }
const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });

const SUBS = [
  [/in person at our Burnaby centre/gi, "in person in Burnaby"],
  [/in-person sessions at our Burnaby centre/gi, "in-person sessions in Burnaby"],
  [/at our nearby Burnaby centre/gi, "in person nearby in Burnaby"],
  [/at our Burnaby centre/gi, "in person in Burnaby"],
  [/our Burnaby centre/gi, "our Burnaby location"],
  [/the Burnaby centre/gi, "our Burnaby location"],
  [/Our tutoring centre is located in Burnaby/gi, "We teach in person in Burnaby"],
  [/a Burnaby-based tutoring centre/gi, "a Burnaby-based tutoring service"],
  [/our tutoring centre/gi, "our Burnaby location"],
  [/tutoring centre/gi, "tutoring service"],
  [/Burnaby centre/gi, "Burnaby location"],
  [/our centre/gi, "our Burnaby location"],
];

const fix = (s) => SUBS.reduce((acc, [re, to]) => acc.replace(re, to), s);

/** Walk any value, rewriting strings. Returns [newValue, changedCount]. */
function walk(v) {
  if (typeof v === "string") {
    const next = fix(v);
    return [next, next === v ? 0 : 1];
  }
  if (Array.isArray(v)) {
    let n = 0;
    const out = v.map((x) => { const [nv, c] = walk(x); n += c; return nv; });
    return [out, n];
  }
  if (v && typeof v === "object") {
    let n = 0;
    const out = {};
    for (const [k, val] of Object.entries(v)) { const [nv, c] = walk(val); out[k] = nv; n += c; }
    return [out, n];
  }
  return [v, 0];
}

const SYSTEM = new Set(["_id", "_type", "_rev", "_createdAt", "_updatedAt", "_system"]);

async function run() {
  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  const docs = await client.fetch(
    `*[_type in ["page","programPage","pageFaq","post","vancouverPage","resourcePage"]]`
  );

  let docsChanged = 0, stringsChanged = 0;
  for (const d of docs) {
    const set = {};
    let n = 0;
    for (const [k, v] of Object.entries(d)) {
      if (SYSTEM.has(k)) continue;
      const [nv, c] = walk(v);
      if (c) { set[k] = nv; n += c; }
    }
    if (!n) continue;
    docsChanged++; stringsChanged += n;
    if (docsChanged <= 5) console.log(`  ${d._type.padEnd(14)} ${(d.slug?.current || d.pageSlug || d.title || d._id).slice(0, 44)}  (${n} string${n > 1 ? "s" : ""})`);
    if (commit) await client.patch(d._id).set(set).commit();
  }
  if (docsChanged > 5) console.log(`  … and ${docsChanged - 5} more`);

  console.log(
    `\nDone. ${stringsChanged} string(s) across ${docsChanged} doc(s) ${commit ? "updated" : "would change"} (of ${docs.length}).` +
      (commit ? "" : "\nRe-run with --commit to apply.")
  );
}

run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
