/**
 * Lead-gen article: "How much does math tutoring cost in Burnaby?" (984 -> 1,500+).
 *
 * This post previously published INVENTED market data — "franchise learning
 * centres often $200-$400/month", "qualified private tutors roughly $60-$120/hr",
 * "a tutor at $40/hr". I wrote those figures and they were sourced from nothing.
 * They are removed here, not re-hedged. The replacement argument compares two
 * approaches AT OUR OWN RATE, which is stronger and needs no competitor data.
 *
 * Every remaining figure traces to app/pricing/content.ts or to a fact the client
 * stated directly. Verified by scripts/verify-cost-math.mjs.
 *
 *   Preview:  node --env-file=.env.local scripts/upgrade-tutoring-cost.mjs
 *   Apply:    node --env-file=.env.local scripts/upgrade-tutoring-cost.mjs --commit
 */
import { client, commit, verifyLatex, key, p, h2, h3, li, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SLUG = "how-much-does-math-tutoring-cost-burnaby";

/* Cost-per-session bars. Verified: $185/8.67 = $21.35, $200/8.67 = $23.08. */
const costSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 480 250" role="img" aria-label="Bar chart comparing cost per session. The monthly program works out at about 21 to 23 dollars per session because it includes two sessions a week. One-on-one tutoring is 75 to 100 dollars per session. The bars show one-on-one costs roughly four times as much per session, in exchange for undivided attention." style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="150" y1="30" x2="150" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
    <!-- monthly program : $21-23 -> 23/100 * 300 = 69px -->
    <rect x="150" y="52" width="69" height="42" rx="3" fill="#94A3B8"/>
    <text x="144" y="68" font-size="12" fill="#1F2937" text-anchor="end" font-weight="600">Monthly</text>
    <text x="144" y="84" font-size="11" fill="#64748B" text-anchor="end">Program</text>
    <text x="227" y="78" font-size="12" fill="#475569">$21–$23 per session</text>
    <!-- one-on-one : $75-100 -> 300px -->
    <rect x="150" y="122" width="300" height="42" rx="3" fill="#3A5A98"/>
    <text x="144" y="138" font-size="12" fill="#1F2937" text-anchor="end" font-weight="600">1-on-1</text>
    <text x="144" y="154" font-size="11" fill="#64748B" text-anchor="end">Tutoring</text>
    <text x="300" y="149" font-size="13" fill="#FFFFFF" text-anchor="middle" font-weight="600">$75–$100 per session</text>
    <text x="150" y="222" font-size="11" fill="#64748B">$0</text>
    <text x="450" y="222" font-size="11" fill="#64748B" text-anchor="end">$100</text>
    <text x="150" y="240" font-size="11" fill="#8a7b1f">Same tutor. Different job. The gap buys undivided attention.</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    The monthly program looks dramatically cheaper per session — and it is, because two sessions a week
    spreads $185–$200 across roughly nine sessions a month. What the higher rate buys is not a better
    tutor. It is a tutor who is not also looking after six other students.
  </figcaption>
</figure>`;

const body = [
  p("Straight answer first, because that is what you came for."),
  mli(["One-on-one tutoring: $75–$100 per hour, depending on subject and level."]),
  mli(["Monthly Program: $185–$200 per month — two sessions a week, in a small group of six to eight."]),
  mli(["Exam Booster: $280 for a two-week intensive course."]),
  p("No registration fee, no assessment fee, no materials fee, no contract, and the first conversation costs nothing. That is the whole price list. The rest of this article is about which of those three is right for your child, and — genuinely — when none of them are."),

  h2("Why one-on-one is a range instead of a number"),
  p("The $75–$100 spread is about the level of the work, not about how much we think you will pay."),
  p("Grade 8 math and second-year university calculus take a different amount of preparation, and the preparation is most of the job. An hour of Pre-Calculus 11 might need fifteen minutes of setup. An hour of university linear algebra, taught against a specific professor's notation and a specific midterm, can need an hour of setup before the session starts. You are told which end of the range applies before you book, not after."),
  p("What does not change the price: how urgently you need it, how worried you sound on the phone, or whether it is exam season."),

  h2("What a session actually costs to deliver"),
  p("It is worth knowing what the hourly rate is paying for, because \"an hour of tutoring\" is not an hour of work."),
  mli(["The hour itself."]),
  mli(["Preparation before it — reading the actual test your child failed, not a generic worksheet."]),
  mli(["The diagnosis. Working out whether the problem is the topic on the page or something from two years earlier."]),
  mli(["A qualified person. These sessions are taught by someone with a PhD in ultrasound and signal processing, who used this mathematics professionally rather than only studying it."]),
  p("That last point is the one parents most often underrate, and it cuts both ways. For Grade 8 arithmetic, a PhD is genuinely overkill and you should not pay for one. For Calculus 12, Physics 12, or a first-year university course going badly, the difference between a tutor who knows the answer and one who knows why the student cannot see it is the entire value of the hour."),

  h2("The comparison nobody does for you"),
  p("Per session, the two main options look very different:"),
  { _type: "htmlBlock", _key: key(), html: costSvg },
  mp(["The Monthly Program is $185–$200 for two sessions a week. Two a week is about ", im(String.raw`2 \times 52 \div 12 = 8.7`), " sessions a month, so:"]),
  math(String.raw`\frac{\$185}{8.7} \approx \$21 \quad \text{to} \quad \frac{\$200}{8.7} \approx \$23 \ \text{per session}`),
  p("Roughly a quarter of the one-on-one rate. So why would anyone pay four times as much?"),
  p("Because they are not the same product, and the honest answer is that they do different jobs:"),
  mli(["The Monthly Program is for consistent practice, accountability and momentum across a term. It works when your child broadly understands the material and needs reps, structure, and someone noticing when they drift."]),
  mli(["One-on-one is for diagnosis and repair. It works when something specific is broken and nobody has found it yet. In a group of seven, that hunt cannot happen — the tutor's attention is divided seven ways, which is exactly why the group rate is a quarter of the price."]),
  p("If you know what is wrong, the group is better value. If you do not know what is wrong, the group will not find out, and the cheaper rate is a false economy."),

  h2("The number that actually matters is not the hourly rate"),
  p("Here is where most families lose money, and it has nothing to do with choosing an expensive tutor over a cheap one."),
  p("It is buying tutoring that never ends. Compare two ways of spending at the same $85 an hour:"),
  mli(["Supervised homework. A tutor sits with your child weekly, helps with tonight's assignment, and the marks stay flat because nobody ever asked why. Two terms of that is 20 sessions:"]),
  math(String.raw`20 \times \$85 = \$1{,}700`),
  mli(["Targeted repair. Session one finds the actual gap — usually something from an earlier year. Six sessions fix it, and the tutoring stops:"]),
  math(String.raw`6 \times \$85 = \$510`),
  p("Same tutor. Same hourly rate. A difference of $1,190 — and the cheaper one is also the one that worked. The expensive option is not the higher rate; it is the arrangement with no diagnosis and no end date."),
  p("So the question worth asking a tutor is not \"what do you charge?\" It is \"how will you know when we are done?\" A tutor who cannot answer that is selling you the $1,700 version."),
  linked(["Working out which kind of problem you have is something you can partly do at the kitchen table before spending anything. We wrote a guide to telling a ", { text: "concept gap from a practice gap", href: "/blog/concept-gap-or-practice-gap-parents-guide" }, ", and it is the single most useful twenty minutes a parent can spend on this."]),

  h2("When tutoring is not worth your money"),
  p("Not many tutoring websites have this section. It matters more than the price list."),
  mli(["The problem is not mathematics. If your child is anxious, sleeping badly, or something changed at school or at home, tutoring treats a symptom and the real thing gets worse while you pay for it. Address that first — we will say so on the call."]),
  mli(["Homework is getting done and marks are fine. Some students are simply finding it hard because it is hard. That is not a gap; that is learning."]),
  mli(["Nobody has talked to the teacher yet. It is free, they have information nobody else has, and it sometimes ends the problem outright."]),
  mli(["The student has flatly refused. Tutoring works on a student who is fed up and willing. It does not work on one who has been sent as a punishment, and we would rather tell you than take the booking."]),
  p("We have turned down work on all four of these. It costs us a booking and saves you several hundred dollars, and we would rather have the reputation."),

  h2("Five questions worth asking any tutor"),
  p("These work on us and they work on anyone else you are considering. If you only take one thing from this page, take these."),
  h3("1. How will you know when we are done?"),
  p("The single most revealing question you can ask. A tutor with a plan can describe an end state. A tutor without one will talk about ongoing support, which is a business model rather than an answer."),
  h3("2. What will you do in the first session?"),
  p("You want to hear diagnosis — looking at past tests, finding where the working breaks down, checking assumed knowledge from earlier years. If the answer is \"start the current unit\", they are treating the symptom on the page."),
  h3("3. Who is actually teaching my child?"),
  p("At larger centres the person you speak to is often not the person who teaches, and the teacher may be a strong student a few years older. That can be perfectly fine for early high school. It is not fine for Calculus 12. Ask, and ask what happens if that person leaves mid-term."),
  h3("4. What am I paying for outside the session?"),
  p("Registration fees, assessment fees, materials, minimum terms, cancellation rules. All legitimate, all worth knowing before rather than after. Ask for the number you will actually pay in month one."),
  h3("5. When would you tell me not to bother?"),
  p("If a tutor cannot think of a single situation where their service is the wrong answer, either they have not thought about it or they are not going to tell you. Both should give you pause."),

  h2("Does online cost less?"),
  p("No — the rate is the same, and it is worth saying why, because plenty of places do charge less for online and it is reasonable to wonder."),
  p("The preparation, the diagnosis and the qualification of the person teaching do not change with the medium. The only thing that changes is the room. For most of high school and essentially all university work, a shared screen with proper equation software is as good as sitting side by side, and for some things it is better — the whole session can be saved and re-read afterwards, which a whiteboard cannot do."),
  p("Where in person genuinely wins is younger students, anyone who fidgets their way out of a video call, and the specific moment when a student needs someone to watch their hand while they write and catch the error as it happens. If that is your child, come to Burnaby. If it is not, online saves you the drive and costs you nothing in quality."),

  h2("What the free consultation actually is"),
  p("Thirty minutes, no charge, no obligation, and it is not a sales call — there is nothing to sign at the end of it."),
  p("Bring a recent test, ideally one that went badly. That single piece of paper carries more information than an hour of description: which questions were left blank, where the working stops, whether the errors are conceptual or arithmetic. Most of a diagnosis is visible in it."),
  p("By the end you should have three things: an honest read on what is actually wrong, a rough idea of how many sessions it should take, and a clear answer on whether it is worth doing at all. If the answer is no, you will hear that, and it costs you nothing but the half hour."),
  p("Then, if it makes sense, sessions run in person in Burnaby — parking is free — or online across Metro Vancouver, between 9am and 8pm."),

  h2("The honest bit about value"),
  p("Nobody can promise you a grade. Any tutor who does is guessing, and any tutor who quotes you an average improvement is quoting a number they cannot support."),
  p("What can be said honestly is this. Pre-Calculus 12 is a prerequisite. If it does not get fixed, the cost is not a lower mark — it is a repeated course, a delayed application, or a program that quietly stops being available. Set against that, six sessions is a small number, and the reason to act early is that gaps compound: every month a foundation stays broken, more of the new material gets built on top of it, and the repair gets longer."),
  p("That is the actual argument for tutoring, and it does not require any exaggeration."),

  h2("Book a conversation"),
  linked(["If you are weighing this up, the cheapest possible next step is a phone call that costs nothing. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", bring a recent test, and we will tell you honestly whether this is worth your money."]),
  linked(["If you already know it is a specific subject going wrong, our ", { text: "Burnaby math tutoring", href: "/math-tutoring-burnaby" }, " pages set out what each course covers and where students usually lose marks."]),
];

async function run() {
  const { total, bad } = verifyLatex(body);
  const words = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const links = [...new Set(body.flatMap((b) => (b.markDefs || []).map((m) => m.href)))];
  const svgs = body.filter((b) => b._type === "htmlBlock").length;
  const text = body.flatMap((b) => (b.children || []).map((c) => c.text || "")).join(" ");

  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`  /blog/${SLUG}`);
  console.log(`  words     : ${words}  (was 984)`);
  console.log(`  equations : ${total} (${bad} invalid)`);
  console.log(`  diagrams  : ${svgs} inline SVG`);
  console.log(`  links     : ${links.join(", ")}`);

  if (bad) { console.error("  ✗ refusing to write — fix the LaTeX."); process.exit(1); }
  if (links.some((l) => !l || l === "#")) { console.error("  ✗ placeholder link found."); process.exit(1); }

  // This article previously published invented market data. Refuse to reintroduce it.
  const BANNED = [/\$\s?60\s*[-–]\s*\$?\s?120/, /\$\s?200\s*[-–]\s*\$?\s?400/, /\$\s?40\s*\/?\s*hr/, /franchise/i, /competitor/i];
  const hit = BANNED.filter((re) => re.test(text));
  if (hit.length) { console.error(`  ✗ unsourced market claim reintroduced: ${hit}`); process.exit(1); }
  console.log(`  sourcing  : no market/competitor figures (all prices trace to app/pricing/content.ts)`);
  if (words < 1500) { console.error(`  ✗ under the 1,500-word floor by ${1500 - words} — refusing to write.`); process.exit(1); }

  const doc = await client.fetch(`*[_type == "post" && slug.current == $s && !(_id in path("drafts.**"))][0]{_id}`, { s: SLUG });
  if (!doc) { console.error("  ✗ published post not found"); process.exit(1); }
  console.log(`  target    : ${doc._id}`);
  if (commit) {
    await client.patch(doc._id).set({ body }).commit();
    console.log("  ✓ upgraded (live)");
  } else {
    console.log("\nRe-run with --commit to apply.");
  }
}
run().catch((e) => { console.error("Failed:", e?.message || e); process.exit(1); });
