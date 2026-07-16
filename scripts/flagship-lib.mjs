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
