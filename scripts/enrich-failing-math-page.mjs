/**
 * Deepen the "My Child Is Failing Math" landing page.
 *
 * The page was 241 words — thin for the highest-intent parent search on the
 * site. A blog article on the same topic would have cannibalised it (identical
 * H1 and metaTitle), so the substance goes HERE instead, where the lead form,
 * Service schema and internal links already are. One strong page beats two
 * weak ones fighting each other.
 *
 * Writes to the Sanity landing-page document, so it stays editable in Studio.
 * Idempotent: skips if the page has already been deepened.
 *
 *   Preview:  node --env-file=.env.local scripts/enrich-failing-math-page.mjs
 *   Apply:    node --env-file=.env.local scripts/enrich-failing-math-page.mjs --commit
 */
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const commit = process.argv.includes("--commit");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-12";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) { console.error("✗ Missing Sanity env vars."); process.exit(1); }
const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });
const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

const SLUG = "my-child-is-failing-math-what-should-i-do";

const intro = [
  "Finding out your child is failing math is a specific kind of awful. It usually arrives late — a report card, a parent-teacher interview, a test they never mentioned — along with the feeling that you should have known sooner.",
  "The first thing worth saying: a failing grade in math is almost never about intelligence, and it is rarely about effort. Math is relentlessly cumulative. Miss one idea in October and everything built on it is harder, so a student who understood everything until a specific week can look, by December, like a student who understands nothing.",
  "That is also why it is fixable. If the problem is a gap rather than an inability, you can find the gap. Here is how, in the order that actually works.",
];

const sections = [
  {
    heading: "Step 1: Find where it stopped making sense — not what the grade is",
    body: [
      "The grade tells you there is a problem. It does not tell you where the problem is, and that is the only useful information.",
      "Ask your child one question: \"When did this last make sense?\" Not \"what don't you understand\" — they cannot answer that, because nobody can describe what they do not know. \"When did it last make sense\" is answerable, and the answer is often specific: \"when we were doing factoring\", \"before the graphs unit\".",
      "That answer is worth more than the report card. It points at the week the foundation cracked, and everything since has been built on top of it.",
    ],
  },
  {
    heading: "Step 2: Work out which of two problems you have",
    body: [
      "This is the step most parents skip, and it decides everything else. There are two ways to fail math, they look identical from the outside, and they need opposite treatments.",
      "A CONCEPT GAP means they do not understand what the mathematics means. They may still get some answers right by copying the shape of a worked example. Wrong answers are strange rather than close. They ask \"what do I do here?\" rather than \"is this right?\"",
      "A PRACTICE GAP means they understand it, but not fast or reliably enough for a test. They can explain the method to you correctly. Their mistakes are dropped signs and arithmetic slips. Homework is fine; tests are not.",
      "The ten-minute test: take a question they got wrong and ask them to explain how they would do it — out loud, without writing. If they can talk you through it and only fall apart executing, that is a practice gap. If the explanation is vague or circular, that is a concept gap.",
      "This matters because the treatments are opposite. More practice questions make a concept gap WORSE — every repetition drills the misunderstanding deeper. More explanation bores a practice-gap student while changing nothing, because explanation was never the constraint.",
    ],
  },
  {
    heading: "Step 3: Ask the teacher better questions",
    body: [
      "Most parents ask \"how is he doing?\" and get \"he needs to apply himself\", which helps nobody. Ask questions that have answers instead.",
    ],
    points: [
      "Which specific topic did the marks start dropping on?",
      "Is the work wrong, or unfinished? (Unfinished usually means speed; wrong usually means concept.)",
      "Does he ask questions in class, or go quiet?",
      "If you had to name one thing to fix first, what would it be?",
    ],
  },
  {
    heading: "Step 4: Fix the foundation, even though it feels like going backwards",
    body: [
      "This is the part parents resist, and the part that works.",
      "If your child is failing Pre-Calculus 12 because their factoring is shaky, the answer is to fix factoring — not to work harder at Pre-Calculus 12. That feels wrong: they are already behind, and going back to Grade 10 material seems like the opposite of catching up.",
      "But a cumulative subject does not let you skip it. Time spent building on a cracked foundation makes the eventual repair bigger. Students who go back and fix the gap often catch up faster than students who grind forward, because everything suddenly stops fighting them.",
    ],
  },
  {
    heading: "What not to do",
    points: [
      "Do not buy a workbook yet — practice is the right treatment for only one of the two problems, and you do not yet know which you have",
      "Do not make it about effort; \"try harder\" teaches a child that a broken foundation is a character flaw",
      "Do not wait for the next report card — cumulative gaps are far cheaper to fix in November than in April",
      "Do not panic-hire the first tutor who answers; a tutor who teaches before diagnosing is guessing with your money",
    ],
  },
  {
    heading: "When tutoring is NOT the answer",
    body: [
      "Worth saying plainly, given who is saying it: not every failing grade needs a tutor.",
      "If your child understands the material and simply is not doing the work, a tutor will not fix that — that is a motivation problem, and you would be paying for another adult to ignore. If one topic is the issue and their teacher offers extra help, start there: it is free, and the teacher knows the class and the test. If something else is going on — sleep, anxiety, a hard term — the math is a symptom, and fixing the cause fixes the math more easily than you expect.",
      "Tutoring earns its cost when there is a genuine gap that needs finding and rebuilding, and nobody has the time or subject depth to do that one-to-one. That is common. It is not universal.",
    ],
  },
  {
    heading: "What good help actually looks like",
    body: [
      "If you do decide to get help, the thing worth paying for is the diagnosis, not the hours. A tutor who cannot tell you what is wrong after the first session has not diagnosed anything, and you are paying for supervised homework.",
    ],
    points: [
      "The first session finds the gap — it does not start at chapter one",
      "They can tell you where it broke, in specific terms, afterwards",
      "They are willing to go back to earlier material if that is where the problem is",
      "They explain why a method works, not just walk through it faster",
      "They tell you when you no longer need them",
    ],
  },
  {
    heading: "The honest timeline",
    body: [
      "How long this takes depends on the gap, not on the grade. A single missing idea can be repaired in a few sessions, and the improvement is dramatic, because one broken foundation was holding up everything. Several years of accumulated gaps take a term or more, and early progress feels slow because you are rebuilding underneath rather than adding on top.",
      "Anyone who promises a specific grade improvement in a specific number of weeks — before meeting your child — is guessing. There is no way to know before you find the gap.",
    ],
  },
];

async function run() {
  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  const doc = await client.fetch(`*[_type == "pageFaq" && pageSlug == $s][0]{_id, intro, sections}`, { s: SLUG });
  if (!doc) { console.error("✗ landing-page document not found — run migrate-landing-faqs first."); process.exit(1); }

  const already = (doc.sections || []).some((x) => /which of two problems/i.test(x?.heading || ""));
  const words = [...intro, ...sections.flatMap((s) => [s.heading, ...(s.body || []), ...(s.points || [])])].join(" ").split(/\s+/).length;

  console.log(`  page   : /${SLUG}`);
  console.log(`  before : ${(doc.intro || []).length} intro paras, ${(doc.sections || []).length} sections (241 words)`);
  console.log(`  after  : ${intro.length} intro paras, ${sections.length} sections (~${words} words)`);
  if (already) { console.log("  = already deepened — nothing to do."); return; }

  if (commit) {
    await client.patch(doc._id).set({
      intro,
      sections: sections.map((s) => ({ _type: "object", _key: key(), ...s })),
    }).commit();
    console.log("  ✓ landing page deepened (editable in Studio > Landing Pages)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}

run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
