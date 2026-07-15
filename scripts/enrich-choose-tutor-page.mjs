/**
 * Deepen the "How to Choose a Math Tutor in Burnaby" landing page (204 words).
 *
 * Highest buying intent in the Parent Pain cluster — someone searching this is
 * about to spend money — and 204 words does not earn that decision. A blog post
 * on the topic would have cannibalised this page (checked first this time), so
 * the substance goes here, where the lead form and Service schema already are.
 *
 * Written to be useful even to a parent who hires someone else: the questions
 * below work on any tutor, including us. That is the point — a page that only
 * argues for itself reads as a pitch and converts worse.
 *
 * Idempotent. Content lands in Sanity, so it stays editable in Studio.
 *
 *   Preview:  node --env-file=.env.local scripts/enrich-choose-tutor-page.mjs
 *   Apply:    node --env-file=.env.local scripts/enrich-choose-tutor-page.mjs --commit
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

const SLUG = "how-to-choose-a-math-tutor-in-burnaby";

const intro = [
  "Choosing a math tutor is unusually hard, because the thing you are buying is invisible until months later. Every tutor in Burnaby will tell you they are patient, experienced and good with kids. None of that is checkable, and all of it is said by the good ones and the useless ones alike.",
  "So this page is not an argument for hiring us. It is the set of questions that separate a tutor who will help your child from one who will supervise their homework at $40 an hour — and they work on any tutor, including us.",
];

const sections = [
  {
    heading: "The one question that tells you the most",
    body: [
      "Ask: \"What will you do in the first session?\"",
      "There are two kinds of answer. One is a version of \"we'll start with the current unit\" or \"we'll do an assessment worksheet\". The other is a version of \"we'll find out where it actually broke\".",
      "The first answer means you are buying hours. Nobody has diagnosed anything, so the tutor will teach whatever the class is teaching, one week behind, forever. It can go on for a whole term without changing much — and the tutor is not being dishonest, they simply never asked the question.",
      "The second answer means you are buying a diagnosis. Math failure is nearly always a specific gap in a cumulative subject; find the gap and the fix is fast. A diagnosis has an end date. Hours do not.",
    ],
  },
  {
    heading: "Ask what happens after the first session",
    body: [
      "A tutor who diagnosed something should be able to tell you what it was, in specific terms, within a day. \"He's got some gaps\" is not a diagnosis. \"He never solidified factoring, which is why the quadratics unit collapsed\" is.",
      "If nobody can tell you what is wrong after an hour with your child, nothing was found — and you will be paying for supervised practice while everyone hopes it improves.",
    ],
  },
  {
    heading: "Questions worth asking any tutor",
    points: [
      "What will you do in the first session? (diagnosis, or start the curriculum?)",
      "Will you tell me what you found afterwards, specifically?",
      "Who actually teaches — you, or an assistant?",
      "Is it genuinely one-to-one, or one tutor across several students?",
      "Are you comfortable going back to earlier material if that is where the problem is?",
      "How will we know when my child no longer needs you?",
      "Does your price change with the level of the subject?",
    ],
  },
  {
    heading: "Why the last two questions matter most",
    body: [
      "\"How will we know when we're done?\" is the question nobody asks, and the answer is revealing. A tutor with no concept of finishing has a business model, not a plan. Good tutoring ends.",
      "\"Does your price change with level?\" catches a different thing. Grade 8 math and Calculus 12 are not the same job — the second needs genuine subject depth, not a good grasp of the textbook. A service charging one flat rate for both is usually staffing both with the same person, and that person is rarely qualified for the harder end.",
    ],
  },
  {
    heading: "Qualifications: what actually matters",
    body: [
      "Qualifications matter less than parents think at Grade 8, and far more than parents think at Grade 12 and beyond.",
      "For junior math, patience and clear explanation beat credentials. A capable undergraduate can be excellent, and is cheaper.",
      "For senior and university work — Pre-Calculus 12, Calculus, university physics, IB Higher Level — depth stops being optional. The difficulty there is not the procedure, it is knowing why the procedure works and which one applies, and that is exactly what someone who learned it one chapter ahead cannot give you.",
      "So the honest guidance: match the tutor to the level. Paying senior rates for Grade 8 is waste. Paying junior rates for Calculus 12 is worse — it is money spent on someone who cannot see the mistake.",
    ],
  },
  {
    heading: "Warning signs",
    points: [
      "Promises a specific grade improvement before meeting your child — nobody can know that before finding the gap",
      "Cannot tell you what is wrong after the first session",
      "Starts at chapter one regardless of where the problem is",
      "Requires a long package upfront, before either of you knows how long it will take",
      "Describes it as one-to-one but the tutor is watching three students at a table",
      "Never suggests you might be finished",
    ],
  },
  {
    heading: "Group class or one-to-one?",
    body: [
      "Not everyone needs one-to-one, and it is the more expensive option, so it is worth being honest about the difference.",
      "A group class works when your child broadly follows the course and needs more practice and structure. Volume is the constraint, and a group provides it cheaply.",
      "One-to-one is worth the money when there is a specific gap that needs finding. Nobody finds an individual's broken foundation in a group of six — there is no time, and the student rarely volunteers it. If your child understands the class but keeps failing tests, a group may be enough. If they stopped understanding somewhere and cannot say where, a group will not find it.",
    ],
  },
  {
    heading: "When you should not hire anyone",
    body: [
      "Since we are the ones writing this: not every situation needs a tutor.",
      "If your child understands the material and simply is not doing the work, tutoring will not fix it — that is motivation, and you would be adding another adult to ignore. If it is one topic and the teacher offers extra help, start there; it is free and they know the test. If something else is going on at home or with sleep or anxiety, the math is a symptom.",
      "Tutoring earns its cost when there is a real gap that needs finding and rebuilding, and nobody has the time or subject depth to do it one-to-one. That is common — but it is not everyone, and a tutor who tells you otherwise is selling.",
    ],
  },
  {
    heading: "How we answer our own questions",
    body: [
      "It would be unfair to publish that list without answering it. First session: we find the gap — we do not start the curriculum. Afterwards: we tell you what we found, specifically. Who teaches: the PhD-qualified tutor you met, not an assistant. One-to-one: genuinely, the whole hour. Going back: yes, and usually further than parents expect. Price by level: yes — $75–$100 an hour depending on subject and level, because Grade 8 and university calculus are not the same job. Finishing: we tell you when you no longer need us.",
      "Ask the same questions of anyone else you are considering. If their answers are better than ours, hire them — the point is that your child stops losing ground, not that we get the work.",
    ],
  },
];

async function run() {
  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  const doc = await client.fetch(`*[_type == "pageFaq" && pageSlug == $s][0]{_id, intro, sections}`, { s: SLUG });
  if (!doc) { console.error("✗ landing-page document not found."); process.exit(1); }

  const already = (doc.sections || []).some((x) => /tells you the most/i.test(x?.heading || ""));
  const words = [...intro, ...sections.flatMap((s) => [s.heading, ...(s.body || []), ...(s.points || [])])].join(" ").split(/\s+/).length;

  console.log(`  page   : /${SLUG}`);
  console.log(`  before : ${(doc.intro || []).length} intro, ${(doc.sections || []).length} sections (204 words)`);
  console.log(`  after  : ${intro.length} intro, ${sections.length} sections (~${words} words)`);
  if (already) { console.log("  = already deepened."); return; }

  if (commit) {
    await client.patch(doc._id).set({
      intro,
      sections: sections.map((s) => ({ _type: "object", _key: key(), ...s })),
    }).commit();
    console.log("  ✓ deepened (Studio > Landing Pages > SEO Landing Pages)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}

run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
