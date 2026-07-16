/**
 * Deepen "A Step-by-Step Guide to Stoichiometry for Grade 11 Chemistry" (1,079 -> 1,500+).
 *
 * This post is already good, so this INSERTS into the existing body rather than
 * regenerating it — cheaper, and it cannot damage prose that is already working.
 *
 * Adds:
 *   - the mole road map (the single most useful picture in Chemistry 11)
 *   - percent yield, which the guide never covered
 *
 * Maths verified first in scripts/verify-percent-yield.mjs. Idempotent: refuses
 * to insert twice.
 *
 *   Preview:  node --env-file=.env.local scripts/enrich-stoichiometry-guide.mjs
 *   Apply:    node --env-file=.env.local scripts/enrich-stoichiometry-guide.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, li, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "step-by-step-guide-stoichiometry-grade-11-chemistry";

/* Four boxes, three arrows. Each arrow is exactly one operation. */
const BW = 95, XS = [15, 160, 305, 450], BY = 60, BH = 52;
const box = (i, l1, l2, fill, stroke) => `
    <rect x="${XS[i]}" y="${BY}" width="${BW}" height="${BH}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <text x="${XS[i] + BW / 2}" y="${BY + 21}" font-size="13" fill="#1F2937" text-anchor="middle" font-weight="600">${l1}</text>
    <text x="${XS[i] + BW / 2}" y="${BY + 39}" font-size="13" fill="#475569" text-anchor="middle">${l2}</text>`;
const arrow = (i, label) => {
  const x1 = XS[i] + BW + 4, x2 = XS[i + 1] - 4, mid = (x1 + x2) / 2;
  return `
    <line x1="${x1}" y1="${BY + BH / 2}" x2="${x2}" y2="${BY + BH / 2}" stroke="#3A5A98" stroke-width="2" marker-end="url(#ar)"/>
    <text x="${mid}" y="${BY + BH / 2 - 10}" font-size="11" fill="#3A5A98" text-anchor="middle" font-weight="600">${label}</text>`;
};

const roadmapSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 560 240" role="img" aria-label="The mole road map. Four boxes in a row: grams of A, moles of A, moles of B, grams of B. Three arrows connect them: divide by the molar mass of A, multiply by the mole ratio from the balanced equation, then multiply by the molar mass of B. A crossed-out curved arrow underneath shows there is no direct route from grams of A to grams of B." style="width:100%;max-width:560px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <defs>
      <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3A5A98"/>
      </marker>
    </defs>
    <text x="280" y="28" font-size="13" fill="#1F2937" text-anchor="middle" font-weight="700">Every stoichiometry question is this map</text>
    ${box(0, "grams", "of A", "#EEF2F7", "#94A3B8")}
    ${box(1, "moles", "of A", "#3A5A98", "#3A5A98")}
    ${box(2, "moles", "of B", "#3A5A98", "#3A5A98")}
    ${box(3, "grams", "of B", "#EEF2F7", "#94A3B8")}
    ${arrow(0, "÷ M(A)")}
    ${arrow(1, "× ratio")}
    ${arrow(2, "× M(B)")}
    <path d="M ${XS[0] + BW / 2} ${BY + BH + 4} Q 280 205 ${XS[3] + BW / 2} ${BY + BH + 4}" fill="none" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6 5"/>
    <line x1="266" y1="158" x2="294" y2="186" stroke="#B45309" stroke-width="3"/>
    <line x1="294" y1="158" x2="266" y2="186" stroke="#B45309" stroke-width="3"/>
    <text x="280" y="228" font-size="12" fill="#B45309" text-anchor="middle" font-weight="600">there is no arrow straight from grams to grams</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    The two dark boxes are the only place chemistry happens. Everything else is unit conversion.
    The mole ratio is the <em>only</em> step that uses the balanced equation — which is why an
    unbalanced equation ruins the answer while leaving the working looking perfectly tidy.
  </figcaption>
</figure>`;

const roadmapBlocks = [
  h2("The road map behind all of it"),
  p("Before the worked examples, here is the picture the whole topic collapses into. Every stoichiometry question in Chemistry 11 — every single one — is a walk along this map."),
  { _type: "htmlBlock", _key: key(), html: roadmapSvg },
  p("Three things are worth noticing, and they answer most of the questions students ask."),
  mli(["The two dark boxes are the only place chemistry actually happens. Grams are a human convenience; reactions count particles. So the first move is always out of grams, and the last move is always back into them."]),
  mli(["Only the middle arrow uses the balanced equation. That is where the coefficients enter, and it is the only place they enter — which is exactly why an unbalanced equation destroys the answer while the working still looks tidy."]),
  mli(["There is no arrow straight across the bottom. You cannot go from grams to grams, and the instinct to divide one mass by another is the single most common wrong turn in the unit. Mass ratios are not conserved by reactions; mole ratios are."]),
  p("If you are stuck on a question, find where you are on the map and look at which arrow comes next. It is almost never a question about chemistry — it is a question about which of three operations you owe."),
];

const yieldBlocks = [
  h2("Percent yield: what actually comes out of the flask"),
  p("Everything so far has been theoretical yield — how much product you would get if the reaction went perfectly and you recovered every last molecule. Reality is less generous. Some product stays stuck to the glass, some reaction never finishes, and side reactions quietly make something else."),
  p("So chemists report what fraction they actually got:"),
  math(String.raw`\text{percent yield} = \frac{\text{actual yield}}{\text{theoretical yield}} \times 100\%`),
  h3("Worked example"),
  mp(["Burn 5.00 g of methane in excess oxygen and you collect 11.2 g of carbon dioxide. What is the percent yield?"]),
  math(String.raw`\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}`),
  p("The theoretical yield comes from the road map, exactly as before. Grams to moles:"),
  math(String.raw`n(\text{CH}_4) = \frac{5.00}{16.04} = 0.3117 \ \text{mol}`),
  p("Mole ratio: the balanced equation gives one CO₂ per CH₄, so n(CO₂) = 0.3117 mol. Moles back to grams:"),
  math(String.raw`m(\text{CO}_2) = 0.3117 \times 44.01 = 13.7 \ \text{g}`),
  p("That is what a perfect reaction would give. Now compare it with what actually turned up:"),
  math(String.raw`\text{percent yield} = \frac{11.2}{13.7} \times 100 = 81.6\%`),
  h3("The check that catches the error"),
  p("Percent yield cannot exceed 100%. If yours does, you have not discovered anything — you have made a mistake, and it is nearly always one of two."),
  mli(["The theoretical yield was calculated from the wrong reactant. If a limiting reactant question is hiding in there, the theoretical yield must come from the limiting one. Use the excess reactant by accident and the theoretical figure comes out too small, so the percentage comes out too big."]),
  mli(["The product was weighed wet. Water left in the sample is mass that is not product. In a real lab this is the usual culprit, and it is why samples get dried to constant mass before weighing."]),
  p("A yield above 100% is therefore a useful signal rather than a disaster: it tells you exactly where to look."),
  mp(["One more thing hides in that question. \"Excess oxygen\" is doing real work — it is the phrase that tells you not to bother checking which reactant runs out. Worth knowing what it costs: this reaction needs ", im(String.raw`2 \times 0.3117 = 0.623`), " mol of O₂, which is 19.9 g. Anything above that is genuinely excess. Below it, oxygen becomes the limiting reactant and the whole calculation changes."]),
];

async function run() {
  const doc = await client.fetch(
    `*[_type == "post" && slug.current == $s && !(_id in path("drafts.**"))][0]{_id, body}`, { s: SLUG },
  );
  if (!doc) { console.error("  ✗ published post not found"); process.exit(1); }
  if (!Array.isArray(doc.body)) { console.error("  ✗ body is not Portable Text"); process.exit(1); }

  const textOf = (b) => (b.children || []).map((c) => c.text || "").join("");
  const before = doc.body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;

  // Idempotency: never insert twice.
  if (doc.body.some((b) => /road map behind all of it|Percent yield: what actually/i.test(textOf(b)))) {
    console.log("  ! already enriched — nothing to do (idempotent)");
    return;
  }

  const idxOf = (re) => doc.body.findIndex((b) => b.style === "h2" && re.test(textOf(b)));
  const iMethane = idxOf(/Worked example: burning methane/i);
  const iWrong = idxOf(/Where stoichiometry goes wrong/i);
  if (iMethane < 0 || iWrong < 0) {
    console.error(`  ✗ anchor headings not found (methane=${iMethane}, wrong=${iWrong}) — refusing to guess placement`);
    process.exit(1);
  }

  // Splice from the back so the earlier index stays valid.
  const body = [...doc.body];
  body.splice(iWrong, 0, ...yieldBlocks);
  body.splice(iMethane, 0, ...roadmapBlocks);

  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const svgs = body.filter((b) => b._type === "htmlBlock").length;

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  inserted  : road map before block ${iMethane}, percent yield before block ${iWrong}`);
  console.log(`  words     : ${before} -> ${words}  (+${words - before})`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);
  console.log(`  blocks    : ${doc.body.length} -> ${body.length}`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ enriched (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
