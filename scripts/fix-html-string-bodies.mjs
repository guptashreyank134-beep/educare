/**
 * Two published posts store `body` as a raw HTML string instead of Portable Text.
 * <PortableText value={string}> does not throw — it renders a hidden error div, so
 * both posts are live with ZERO visible content and nobody noticed.
 *
 * This converts the HTML to real Portable Text. It is deliberately conservative:
 * it only handles the tags these two documents actually use (div/p/h2/em/strong),
 * refuses anything it does not recognise, and asserts that no word is lost in the
 * conversion before writing.
 *
 *   Preview:  node --env-file=.env.local scripts/fix-html-string-bodies.mjs
 *   Apply:    node --env-file=.env.local scripts/fix-html-string-bodies.mjs --commit
 */
import { client, commit, key, span, blk } from "./flagship-lib.mjs";

const IDS = ["post-how-to-study-effectively-for-ib-exams", "post-importance-of-high-school-mathematics"];
const ALLOWED = new Set(["div", "p", "h2", "h3", "em", "strong", "i", "b", "br"]);

const decode = (s) =>
  s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
   .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&mdash;/g, "—");

const words = (s) => s.replace(/\s+/g, " ").trim().split(/\s+/).filter(Boolean).length;

/** Turn the inline HTML of one block into spans, preserving em/strong as marks. */
function toSpans(html) {
  const out = [];
  const re = /<(em|i|strong|b)>([\s\S]*?)<\/\1>|([^<]+)/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m[1]) {
      const mark = /^(em|i)$/i.test(m[1]) ? "em" : "strong";
      const text = decode(m[2].replace(/<[^>]+>/g, ""));
      if (text.trim()) out.push(span(text, [mark]));
    } else if (m[3]) {
      const text = decode(m[3]);
      if (text.trim()) out.push(span(text.replace(/\s+/g, " ")));
    }
  }
  return out.length ? out : [span(decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim())];
}

function htmlToPortableText(html) {
  const used = [...new Set([...html.matchAll(/<\/?([a-z0-9]+)/gi)].map((m) => m[1].toLowerCase()))];
  const unknown = used.filter((t) => !ALLOWED.has(t));
  if (unknown.length) throw new Error(`unhandled tag(s): ${unknown.join(", ")} — refusing to guess`);

  const blocks = [];
  const re = /<(h2|h3|p)>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1].toLowerCase();
    const children = toSpans(m[2]);
    if (children.length && children.some((c) => (c.text || "").trim())) {
      blocks.push(blk(tag === "p" ? "normal" : tag, children));
    }
  }
  return blocks;
}

let failed = 0;
for (const id of IDS) {
  const doc = await client.fetch(`*[_id == $id][0]{_id, title, body}`, { id });
  if (!doc) { console.error(`  ✗ ${id} not found`); failed++; continue; }
  if (Array.isArray(doc.body)) { console.log(`  – ${id} is already Portable Text, skipping`); continue; }

  const html = String(doc.body);
  let blocks;
  try {
    blocks = htmlToPortableText(html);
  } catch (e) {
    console.error(`  ✗ ${id}: ${e.message}`);
    failed++;
    continue;
  }

  const before = words(decode(html.replace(/<[^>]+>/g, " ")));
  const after = words(blocks.flatMap((b) => b.children.map((c) => c.text)).join(" "));
  const headings = blocks.filter((b) => b.style !== "normal").length;

  console.log(`\n── ${doc.title}`);
  console.log(`   ${id}`);
  console.log(`   blocks    : ${blocks.length} (${headings} headings)`);
  console.log(`   words     : ${before} in the HTML -> ${after} in Portable Text`);

  if (after !== before) {
    console.error(`   ✗ word count changed (${before} -> ${after}) — conversion lost or duplicated text. Refusing.`);
    failed++;
    continue;
  }
  console.log(`   ✓ lossless`);
  if (commit) {
    await client.patch(id).set({ body: blocks }).commit();
    console.log(`   ✓ written — content is now visible`);
  }
}

if (failed) { console.error(`\n✗ ${failed} document(s) failed — nothing was written for them.`); process.exit(1); }
if (!commit) console.log("\nRe-run with --commit to apply.");
