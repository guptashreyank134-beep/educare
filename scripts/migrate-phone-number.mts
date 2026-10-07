/**
 * Replaces the old business phone number wherever it appears in Sanity content.
 *
 * The site itself reads the number from data/businessInfo.ts, so a code change
 * covers every template. Blog bodies are different: the number was typed into
 * the prose, so it has to be rewritten document by document.
 *
 * Dry run by default. Pass --apply to write, which also saves the original
 * documents to scripts/backups/ first so the change can be undone.
 *
 * Run: npx tsx scripts/migrate-phone-number.mts [--apply]
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OLD_DIGITS = "6725147587";
const NEW_DIGITS = "6728558577";

/** Every spelling of the old number seen in the content, with its replacement. */
const REPLACEMENTS: [RegExp, string][] = [
  [/\+1[\s-]?\(?672\)?[\s-]?514[\s-]?7587/g, "+1-672-855-8577"],
  [/\(672\)\s*514[\s-]?7587/g, "(672) 855-8577"],
  [/\b672[\s-]514[\s-]7587\b/g, "672-855-8577"],
  [new RegExp(OLD_DIGITS, "g"), NEW_DIGITS],
];

const apply = process.argv.includes("--apply");

const local: Record<string, string> = {};
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i > 0 && !line.trim().startsWith("#")) {
      local[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
}
const PROJECT = local.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = local.NEXT_PUBLIC_SANITY_DATASET;
const TOKEN = local.SANITY_API_WRITE_TOKEN;
if (!PROJECT || !DATASET || !TOKEN) {
  console.error("Missing Sanity credentials in .env.local");
  process.exit(1);
}

const query = async (groq: string) => {
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(groq)}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } },
  );
  return ((await res.json()) as { result?: unknown[] }).result ?? [];
};

const rewrite = (value: string) =>
  REPLACEMENTS.reduce((text, [pattern, to]) => text.replace(pattern, to), value);

const mentionsOld = (value: string) => new RegExp(OLD_DIGITS).test(value.replace(/\D/g, ""));

/** Walks a document, rewriting only string leaves. */
function transform(node: unknown): { value: unknown; changes: string[] } {
  const changes: string[] = [];
  const walk = (input: unknown): unknown => {
    if (typeof input === "string") {
      const next = rewrite(input);
      if (next !== input) changes.push(input.trim().slice(0, 120));
      return next;
    }
    if (Array.isArray(input)) return input.map(walk);
    if (input && typeof input === "object") {
      return Object.fromEntries(Object.entries(input).map(([k, v]) => [k, walk(v)]));
    }
    return input;
  };
  return { value: walk(node), changes };
}

// Lead records preserve what the visitor entered at submission time. Only
// migrate authored site content; rewriting historical leads would corrupt the
// original contact record.
const docs = (await query(`*[!(_type match "sanity.*") && _type != "lead"]`)) as Record<string, unknown>[];
const affected = docs.filter((d) => mentionsOld(JSON.stringify(d)));

console.log(`${apply ? "APPLYING" : "DRY RUN"} — old ${OLD_DIGITS} -> new ${NEW_DIGITS}\n`);
console.log(`documents scanned:  ${docs.length}`);
console.log(`documents affected: ${affected.length}\n`);

const mutations: Record<string, unknown>[] = [];
let sample = 0;
for (const doc of affected) {
  const { value, changes } = transform(doc);
  if (changes.length === 0) continue;
  mutations.push({ createOrReplace: value });
  if (sample < 3) {
    console.log(`  ${doc._id as string}`);
    for (const change of changes.slice(0, 2)) console.log(`     before: ${change}`);
    sample++;
  }
}
if (affected.length > 3) console.log(`  … and ${affected.length - 3} more documents\n`);

// Nothing must still contain the old number after rewriting.
const residual = mutations.filter((m) => mentionsOld(JSON.stringify(m.createOrReplace)));
console.log(`documents to update: ${mutations.length}`);
console.log(`still containing the old number after rewrite: ${residual.length}`);

if (!apply) {
  console.log("\nDry run only. Re-run with --apply to write.");
  process.exit(residual.length === 0 ? 0 : 1);
}

if (residual.length > 0) {
  console.error("\nRefusing to apply: some documents would keep the old number.");
  process.exit(1);
}

mkdirSync("scripts/backups", { recursive: true });
const backup = `scripts/backups/phone-migration-${Date.now()}.json`;
writeFileSync(backup, JSON.stringify(affected, null, 2), "utf8");
console.log(`\noriginals backed up to ${backup}`);

const res = await fetch(`https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
  body: JSON.stringify({ mutations }),
});
if (!res.ok) {
  console.error("Mutation failed:", res.status, await res.text());
  process.exit(1);
}

const remaining = (await query(`*[!(_type match "sanity.*")]`)) as Record<string, unknown>[];
const stillOld = remaining.filter((d) => mentionsOld(JSON.stringify(d)));
console.log(`applied. documents still containing the old number: ${stillOld.length}`);
process.exit(stillOld.length === 0 ? 0 : 1);
