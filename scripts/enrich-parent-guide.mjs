/**
 * Deepen "Concept gap or practice gap? A parent's guide" (1,208 -> 1,500+).
 *
 * This is the post the cost article sends parents to, and it had 0 equations and
 * 0 diagrams. Adds:
 *   - a diagnostic card matching the post's OWN ten-minute test (explain the
 *     method aloud, no writing, no textbook)
 *   - one worked example showing the SAME wrong answer arising from both gaps,
 *     which is the article's whole thesis made concrete
 *
 * Maths verified first (scripts/verify-parent-guide.mjs).
 *
 *   Preview:  node --env-file=.env.local scripts/enrich-parent-guide.mjs
 *   Apply:    node --env-file=.env.local scripts/enrich-parent-guide.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "concept-gap-or-practice-gap-parents-guide";

const cardSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 520 310" role="img" aria-label="A diagnostic card. Top: take a question they got wrong and ask them to explain the method out loud, with no writing and no textbook. It then splits two ways. Left: if the explanation is vague, circular, or reaches for the textbook, it is a concept gap, which needs rebuilding rather than repetition. Right: if they explain it confidently and only fall apart when executing, it is a practice gap, which needs volume and timing." style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <defs>
      <marker id="dg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8"/>
      </marker>
    </defs>
    <rect x="40" y="12" width="440" height="56" rx="8" fill="#1F2937"/>
    <text x="260" y="34" font-size="13" fill="#FFFFFF" text-anchor="middle" font-weight="600">Take a question they got wrong.</text>
    <text x="260" y="54" font-size="13" fill="#E2E8F0" text-anchor="middle">Ask them to explain the method out loud — no writing, no textbook.</text>
    <path d="M 260 68 L 260 84 L 150 84 L 150 100" fill="none" stroke="#94A3B8" stroke-width="2" marker-end="url(#dg)"/>
    <path d="M 260 68 L 260 84 L 370 84 L 370 100" fill="none" stroke="#94A3B8" stroke-width="2" marker-end="url(#dg)"/>
    <rect x="30" y="104" width="240" height="52" rx="8" fill="#EEF2F7" stroke="#CBD5E1" stroke-width="1.5"/>
    <text x="150" y="126" font-size="12" fill="#334155" text-anchor="middle">Vague, circular, or reaches</text>
    <text x="150" y="143" font-size="12" fill="#334155" text-anchor="middle">for the textbook</text>
    <rect x="250" y="104" width="240" height="52" rx="8" fill="#EEF2F7" stroke="#CBD5E1" stroke-width="1.5"/>
    <text x="370" y="126" font-size="12" fill="#334155" text-anchor="middle">Explains it fine, then falls</text>
    <text x="370" y="143" font-size="12" fill="#334155" text-anchor="middle">apart doing it on paper</text>
    <line x1="150" y1="156" x2="150" y2="176" stroke="#94A3B8" stroke-width="2" marker-end="url(#dg)"/>
    <line x1="370" y1="156" x2="370" y2="176" stroke="#94A3B8" stroke-width="2" marker-end="url(#dg)"/>
    <rect x="30" y="180" width="240" height="46" rx="8" fill="#3A5A98"/>
    <text x="150" y="209" font-size="17" fill="#FFFFFF" text-anchor="middle" font-weight="700">CONCEPT GAP</text>
    <rect x="250" y="180" width="240" height="46" rx="8" fill="#F4E98B"/>
    <text x="370" y="209" font-size="17" fill="#6b5d0f" text-anchor="middle" font-weight="700">PRACTICE GAP</text>
    <text x="150" y="252" font-size="12.5" fill="#475569" text-anchor="middle" font-weight="600">Needs rebuilding.</text>
    <text x="150" y="270" font-size="12" fill="#64748B" text-anchor="middle">More practice makes it worse —</text>
    <text x="150" y="286" font-size="12" fill="#64748B" text-anchor="middle">it drills in the wrong rule.</text>
    <text x="370" y="252" font-size="12.5" fill="#475569" text-anchor="middle" font-weight="600">Needs volume and timing.</text>
    <text x="370" y="270" font-size="12" fill="#64748B" text-anchor="middle">Re-explaining it is wasted —</text>
    <text x="370" y="286" font-size="12" fill="#64748B" text-anchor="middle">they already understand.</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Ten minutes, at your kitchen table, before you spend anything. The two branches
    do not just have different names — they need <em>opposite</em> treatments, which is why
    guessing is expensive.
  </figcaption>
</figure>`;

const cardBlocks = [{ _type: "htmlBlock", _key: key(), html: cardSvg }];

const exampleBlocks = [
  h2("The same wrong answer, two different causes"),
  p("Here is the whole problem in one line of a student's homework. They write:"),
  math(String.raw`(x+3)^2 = x^2 + 9`),
  p("It is wrong. The real expansion carries a middle term:"),
  math(String.raw`(x+3)^2 = x^2 + 6x + 9`),
  p("Now — and this is the point of this entire article — that identical mark on the page can mean two completely different things, and the paper cannot tell you which."),
  h3("If it is a concept gap"),
  p("The student believes squaring distributes across a sum. They are not being careless; they are applying a rule they think is real. So they will make this error every single time, calmly, and with no sense that anything is wrong. Their confidence is intact, which is exactly what makes it dangerous — nothing signals to them that they need help."),
  p("Ask them to check it and they cannot, because to them there is nothing to check."),
  h3("If it is a practice gap"),
  p("The student knows perfectly well that there is a middle term. Under time pressure, on question 14 of 20, they wrote the fast thing instead of the true thing. Ask them to look again and they will say \"oh — 6x\" before you finish the sentence."),
  p("Same error on paper. Opposite problems. Opposite treatments."),
  h3("How to tell, in thirty seconds"),
  mp(["Hand them a number. Ask them to try ", im(String.raw`x = 1`), " in both sides."]),
  math(String.raw`(1+3)^2 = 16 \qquad \text{but} \qquad 1^2 + 9 = 10`),
  p("A practice-gap student sees 16 against 10 and instantly knows what they did. A concept-gap student sees 16 against 10 and is confused — the numbers disagree and they do not know why, because their rule said they should match. That confusion is the diagnosis. It is not a bad sign; it is the most useful thing that could happen, because it is the first moment the gap has ever been visible."),
  p("One last detail, and it explains why this survives for years undetected. Try x = 0:"),
  math(String.raw`(0+3)^2 = 9 \qquad \text{and} \qquad 0^2 + 9 = 9`),
  p("They agree. The wrong rule gives the right answer, because the term it omits is 6x, and 6 times 0 is 0. Every so often a student's broken rule produces a correct answer by accident, it gets a tick, and the rule is quietly reinforced. This is how a concept gap survives a whole term of homework that looked fine."),
];

async function run() {
  const doc = await client.fetch(
    `*[_type == "post" && slug.current == $s && !(_id in path("drafts.**"))][0]{_id, body}`, { s: SLUG },
  );
  if (!doc || !Array.isArray(doc.body)) { console.error("  ✗ post not found or body is not Portable Text"); process.exit(1); }

  const textOf = (b) => (b.children || []).map((c) => c.text || "").join("");
  const before = doc.body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;

  if (doc.body.some((b) => /same wrong answer, two different causes/i.test(textOf(b))) || doc.body.some((b) => b._type === "htmlBlock")) {
    console.log("  ! already enriched — nothing to do (idempotent)");
    return;
  }

  const idxOf = (re, style = "h2") => doc.body.findIndex((b) => b.style === style && re.test(textOf(b)));
  const iWhy = idxOf(/Why they need opposite treatments/i);
  const iTrap = idxOf(/The trap: "silly mistakes"/i);
  if (iWhy < 0 || iTrap < 0) {
    console.error(`  ✗ anchors not found (why=${iWhy}, trap=${iTrap}) — refusing to guess`);
    process.exit(1);
  }

  const body = [...doc.body];
  body.splice(iTrap, 0, ...exampleBlocks);   // example sits before the "silly mistakes" trap it sets up
  body.splice(iWhy, 0, ...cardBlocks);       // card closes the ten-minute-test section

  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${before} -> ${words}  (+${words - before})`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${body.filter((b) => b._type === "htmlBlock").length} inline SVG`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (words < 1500) console.log(`  ! under the 1,500-word floor by ${1500 - words}`);

  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ enriched (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
