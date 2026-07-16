/**
 * Shared builders for the flagship articles.
 *
 * Every article is created as a DRAFT with reviewedByExpert = false, and every
 * equation is verified with KaTeX before writing — a malformed equation renders
 * as red error text on the live page, so publishing is refused instead.
 */
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import katex from "katex";

export const commit = process.argv.includes("--commit");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-12";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("✗ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}
export const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });

export const key = () => randomUUID().replace(/-/g, "").slice(0, 12);
export const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
export const blk = (style, children, markDefs = []) => ({ _type: "block", _key: key(), style, markDefs, children });
export const p = (t) => blk("normal", [span(t)]);
export const h2 = (t) => blk("h2", [span(t)]);
export const h3 = (t) => blk("h3", [span(t)]);
export const strong = (t) => blk("normal", [span(t, ["strong"])]);
export const li = (t) => ({ ...blk("normal", [span(t)]), listItem: "bullet", level: 1 });
export const num = (t) => ({ ...blk("normal", [span(t)]), listItem: "number", level: 1 });
/** Bullet list item that can contain inline equations: parts are strings or im(). */
export const mli = (parts) => ({
  ...blk("normal", parts.map((x) => (typeof x === "string" ? span(x) : x))),
  listItem: "bullet",
  level: 1,
});

/** Display equation. Pass plain LaTeX (use String.raw). */
export const math = (latex) => ({ _type: "mathBlock", _key: key(), latex });
/** Inline equation, for use inside mp(). */
export const im = (latex) => ({ _type: "mathInline", _key: key(), latex });
/** Paragraph mixing text and inline equations. */
export const mp = (parts) => blk("normal", parts.map((x) => (typeof x === "string" ? span(x) : x)));

/** Paragraph with links: parts are strings, im(), or {text, href}. */
export const linked = (parts) => {
  const markDefs = [], children = [];
  for (const part of parts) {
    if (typeof part === "string") children.push(span(part));
    else if (part._type) children.push(part);
    else {
      const k = key();
      markDefs.push({ _key: k, _type: "link", href: part.href });
      children.push(span(part.text, [k]));
    }
  }
  return blk("normal", children, markDefs);
};

/**
 * Every internal link must resolve to a route that exists.
 *
 * The old check only rejected "" and "#", which let a link to a page that was
 * never built pass straight through to a live article. Routes come from three
 * places: static folders under app/, data-driven slugs in data/, and blog posts
 * in Sanity.
 *
 * Returns the list of dead links (empty when all resolve).
 */
export async function deadLinks(hrefs) {
  const { readdirSync, statSync, readFileSync, existsSync } = await import("node:fs");
  const { join } = await import("node:path");
  const routes = new Set(["/"]);

  // 1. static routes: any app/**/page.tsx
  const walk = (dir, base = "") => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (!statSync(full).isDirectory()) continue;
      if (entry.startsWith("_") || entry.startsWith("(") || entry.startsWith("[")) continue;
      const route = `${base}/${entry}`;
      if (existsSync(join(full, "page.tsx"))) routes.add(route);
      walk(full, route);
    }
  };
  if (existsSync("app")) walk("app");

  // 2. data-driven slugs
  if (existsSync("data")) {
    for (const f of readdirSync("data")) {
      if (!f.endsWith(".ts")) continue;
      const src = readFileSync(join("data", f), "utf8");
      for (const m of src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) routes.add(`/${m[1]}`);
    }
  }

  // 3. blog posts
  const slugs = await client.fetch(`*[_type == "post" && defined(slug.current)].slug.current`);
  for (const s of slugs) routes.add(`/blog/${s}`);

  return hrefs.filter((h) => h && h.startsWith("/") && !routes.has(h.split(/[?#]/)[0].replace(/\/$/, "") || "/"));
}

/** Every equation must compile, or it shows as red error text on the page. */
export function verifyLatex(blocks) {
  const found = [];
  for (const b of blocks) {
    if (b._type === "mathBlock") found.push([b.latex, true]);
    for (const c of b.children || []) if (c._type === "mathInline") found.push([c.latex, false]);
  }
  let bad = 0;
  for (const [latex, displayMode] of found) {
    try {
      const html = katex.renderToString(latex, { displayMode, throwOnError: true, output: "html", strict: false });
      if (/katex-error/.test(html)) throw new Error("rendered as error");
    } catch (e) {
      bad++;
      console.error(`  ✗ BAD LATEX: ${latex}`);
      console.error(`      ${String(e.message || e).slice(0, 90)}`);
    }
  }
  return { total: found.length, bad };
}

const shingles7 = (s) => {
  const w = s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
  const o = new Set();
  for (let i = 0; i + 7 <= w.length; i++) o.add(w.slice(i, i + 7).join(" "));
  return o;
};

/**
 * The full flagship gate + apply, so an upgrade script is just {slug, body}.
 * Runs: LaTeX check, dead-link check, 1,500-word floor (a REFUSAL), optional
 * sibling-overlap check, and — after writing — reads the count back from Sanity
 * so "done" means the live post is actually >=1,500, not that the script exited.
 */
export async function applyPost({ slug, body, was = 0, siblingSlugs = [], maxOverlap = 0.03 }) {
  const text = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))].filter(Boolean);
  const { total, bad } = verifyLatex(body);
  const svgs = body.filter((b) => b._type === "htmlBlock").length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${slug}`);
  console.log(`  words     : ${words}  (was ${was})`);
  console.log(`  equations : ${total} (${bad} invalid) | diagrams: ${svgs}`);
  console.log(`  links     : ${links.join(", ") || "none"}`);

  if (bad) { console.error("  ✗ refusing — invalid LaTeX."); process.exit(1); }
  if (links.some((l) => l === "#")) { console.error("  ✗ placeholder link."); process.exit(1); }
  const dead = await deadLinks(links);
  if (dead.length) { console.error(`  ✗ dead link(s): ${dead.join(", ")}`); process.exit(1); }
  if (links.length) console.log(`  links ok  : all ${links.length} resolve ✓`);

  if (siblingSlugs.length) {
    const sib = await client.fetch(`*[_type=="post" && slug.current in $s].body[].children[].text`, { s: siblingSlugs });
    const a = shingles7(text), b = shingles7((sib || []).join(" "));
    const shared = [...a].filter((x) => b.has(x)).length;
    const overlap = shared / Math.min(a.size, b.size || 1);
    console.log(`  siblings  : ${(overlap * 100).toFixed(2)}% 7-word overlap`);
    if (overlap > maxOverlap) { console.error(`  ✗ too similar to siblings (>${maxOverlap * 100}%).`); process.exit(1); }
  }

  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing.`); process.exit(1); }

  const doc = await client.fetch(`*[_type=="post" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id}`, { s: slug });
  if (!doc) { console.error("  ✗ published post not found"); process.exit(1); }

  if (!commit) { console.log("\n  Re-run with --commit to apply."); return; }
  await client.patch(doc._id).set({ body }).commit();

  // Verify the LIVE state, not the in-memory body.
  const live = await client.fetch(`*[_id==$id][0].body[].children[].text`, { id: doc._id });
  const liveWords = (live || []).join(" ").trim().split(/\s+/).filter(Boolean).length;
  if (liveWords < 1500) { console.error(`  ✗ POST-WRITE CHECK FAILED: live is ${liveWords} words`); process.exit(1); }
  console.log(`  ✓ upgraded (live) — verified ${liveWords} words in Sanity`);
}

/** Create one article as a draft, after verifying its maths. */
export async function createArticle({ slug, title, excerpt, metaTitle, metaDescription, body }) {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];

  console.log(`\n── ${title}`);
  console.log(`   slug   : ${slug}`);
  console.log(`   title  : ${title.length} chars | metaTitle: ${metaTitle.length} | metaDesc: ${metaDescription.length}`);
  console.log(`   blocks : ${body.length} | words: ${words} | equations: ${total} (${bad} invalid)`);
  console.log(`   links  : ${links.join(", ") || "none"}`);

  if (bad) {
    console.error("   ✗ refusing to create — fix the LaTeX first.");
    return false;
  }
  const exists = await client.fetch(`*[_type == "post" && slug.current == $s][0]{_id}`, { s: slug });
  if (exists) {
    console.log("   ! a post with this slug already exists — not overwriting.");
    return false;
  }
  if (commit) {
    await client.create({
      _id: `drafts.${slug}`,
      _type: "post",
      title,
      slug: { _type: "slug", current: slug },
      publishedAt: new Date().toISOString(),
      excerpt,
      reviewedByExpert: false,
      metaData: {
        _type: "metaData",
        metaTitle,
        metaDescription,
        canonical: `https://www.drshreyankeducare.com/blog/${slug}`,
      },
      body,
    });
    console.log("   ✓ created as DRAFT (not live)");
  }
  return true;
}
