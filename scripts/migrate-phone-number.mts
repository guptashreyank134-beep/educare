/**
 * Preview with: node --env-file=.env.local --import tsx scripts/migrate-phone-number.mts
 * Pass --apply to back up and update stale fields in published content and drafts.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { replaceRetiredBusinessPhone } from "../lib/retiredBusinessPhone.ts";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token,
  apiVersion: "2026-05-12",
  useCdn: false,
  perspective: "raw",
});
// Restrict the migration to authored website content, including Studio drafts.
const query = `*[_type in ["post", "page", "programPage", "pageFaq", "vancouverPage", "resourcePage", "studyClubPage"] && !(_id in path("versions.**"))]`;
type ContentDocument = Record<string, unknown> & { _id: string; _rev: string };

function phonePatches(doc: ContentDocument) {
  const set: Record<string, string> = {};
  function visit(value: unknown, path: string) {
    if (typeof value === "string") {
      const updated = replaceRetiredBusinessPhone(value);
      if (updated !== value) set[path] = updated;
    } else if (Array.isArray(value)) {
      // Numeric indexes refer to the exact revision required by each patch.
      value.forEach((item, index) => visit(item, `${path}[${index}]`));
    } else if (value && typeof value === "object") {
      for (const [key, item] of Object.entries(value)) {
        if (!key.startsWith("_")) visit(item, path ? `${path}.${key}` : key);
      }
    }
  }
  visit(doc, "");
  return set;
}

async function main() {
  const docs = await client.fetch<ContentDocument[]>(query);
  const matches = docs.map(doc => ({ doc, set: phonePatches(doc) }))
    .filter(({ set }) => Object.keys(set).length > 0);
  console.log(`Scanned ${docs.length} published documents and drafts. ${matches.length} have stale phone fields.`);
  for (const { doc, set } of matches) {
    console.log(`${doc._id}: ${Object.keys(set).length} fields`);
  }
  if (!process.argv.includes("--apply") || !matches.length) return;

  mkdirSync("scripts/backups", { recursive: true });
  const backup = `scripts/backups/phone-migration-${Date.now()}.json`;
  writeFileSync(backup, JSON.stringify(matches.map(({ doc }) => doc), null, 2), { flag: "wx" });
  console.log(`Originals saved to ${backup}`);
  const transaction = client.transaction();
  for (const { doc, set } of matches) {
    transaction.patch(doc._id, patch => patch.ifRevisionId(doc._rev).set(set));
  }
  await transaction.commit({ visibility: "sync" });

  const remaining = (await client.fetch<ContentDocument[]>(query)).filter(doc => Object.keys(phonePatches(doc)).length);
  if (remaining.length) throw new Error(`${remaining.length} documents still have stale phone fields`);
  console.log("Verified all scanned documents are clear of the retired phone number.");
}

main().catch(error => {
  // Avoid logging authenticated request options if Sanity returns an error.
  console.error("Phone migration failed:", error.message);
  process.exitCode = 1;
});
