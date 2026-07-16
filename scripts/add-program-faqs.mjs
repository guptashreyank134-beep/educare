/**
 * Add subject-specific FAQs to the thin, zero-FAQ program pages. Seobility
 * flagged these as <500 words; they all render programPage.faqs (empty) via
 * VancouverFAQSection. Genuine per-subject FAQs add unique content + FAQPage
 * schema WITHOUT creating shared blocks — a self-overlap guard fails the run if
 * any two new answers share a 7-word run.
 */
import { createClient } from "@sanity/client";

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-12",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});
const COMMIT = process.argv.includes("--commit");

// slug -> [ [question, answer], ... ]
const FAQS = {
  "mcat-prep": [
    ["Which MCAT sections do you tutor?", "All four — Chemical/Physical, CARS, Biological/Biochemical, and Psychological/Social. Our MD-led tutors target the high-yield concepts each section rewards and the reasoning style the exam tests, rather than long fact lists to memorise."],
    ["How long should I prepare for the MCAT?", "Most students need three to six months of consistent study. We build a plan backwards from your test date, weighting content review early and full-length AAMC practice with thorough review as the exam approaches."],
    ["Do you use AAMC practice materials?", "Yes. The AAMC full-lengths and question packs are the closest thing to the real test, so we work through them and, crucially, dissect every miss to convert it into a fixed weakness."],
    ["I keep scoring low on CARS — can you help?", "CARS is a skill rather than knowledge, and it responds to trained technique. We drill active reading, timing, and how to reason to the intended answer instead of the tempting one, with timed passages each session."],
    ["Is MCAT tutoring done online?", "Yes — it runs entirely online, so we support pre-med students in Vancouver, across Canada and beyond. Every session is one-to-one and shaped around your target score and timeline."],
  ],
  "sat-prep": [
    ["Do you cover both SAT sections?", "Yes — the digital SAT's Math and Reading & Writing modules, plus the test-taking strategy (pacing, smart guessing, and the on-screen tools) that turns what you know into the score you earn."],
    ["Is the SAT digital now, and do you prepare for that?", "It is — the exam is adaptive and taken on a computer. We practise on the real digital interface so the calculator, annotation and flagging tools feel automatic on test day."],
    ["How much can my score improve?", "It depends on your starting point and the work you put in, but focused attention on pacing, error review and weak topics reliably lifts a prepared student a band. We begin with a diagnostic to set a realistic target."],
    ["How many practice tests should I take?", "Quality beats quantity here. A few full, timed tests that you pull apart afterwards teach far more than many taken and forgotten — each one hands you a study list ranked by what is actually costing points."],
    ["Where do the sessions happen?", "The digital SAT tutoring runs online, which suits students right across Vancouver, with in-person sessions available in Burnaby whenever you prefer to meet face to face."],
  ],
  "mandarin": [
    ["Do I need any Mandarin background to start?", "No — we teach complete beginners as well as students pushing toward fluency. Early lessons build pronunciation, including the four tones, and the everyday phrases that get a real conversation off the ground."],
    ["How do you teach the tones and pronunciation?", "Tones are practised from the very first lesson through listening and speaking, not memorised from a chart. Getting them right early prevents habits that are painful to unlearn later on."],
    ["Do you cover Chinese characters and writing?", "Yes — reading and writing characters, correct stroke order, and the radicals that make new characters learnable, taught alongside pinyin so speaking and reading grow together."],
    ["Is this for school, heritage learners or adults?", "All three. We tailor lessons to school Mandarin courses, heritage speakers reconnecting with the language, and adults learning for work or travel, each at a different starting point."],
    ["How are Mandarin lessons delivered?", "We meet online right across Metro Vancouver, or face to face in Burnaby — whichever fits your family — and every lesson is one-to-one, paced to how quickly you become comfortable using the language."],
  ],
  "french": [
    ["Do you teach French for the BC curriculum and Immersion?", "Yes — Core French and French Immersion students, aligned to what is assessed in class, covering grammar, vocabulary, and the spoken confidence an immersion classroom demands."],
    ["Can you help with French conversation and pronunciation?", "That is a central focus. We build speaking ability through actual conversation, working on pronunciation, listening, and the tactics for keeping an exchange alive when your French is still imperfect."],
    ["My child reads French but freezes when speaking — can you fix that?", "Yes, and that gap is common and very fixable. We shift practice toward real, guided speaking so passive understanding turns into the confidence to respond in the moment."],
    ["Do you prepare students for French exams?", "We support school French assessments and can prepare for standardised exams such as DELF, focusing on the reading, writing, listening and speaking each one weighs most heavily."],
    ["How do French lessons take place?", "You can learn online from home anywhere in the Vancouver area, or in person at our Burnaby location, always one-to-one and matched to your child's grade and goals."],
  ],
  "javascript": [
    ["Is JavaScript a good language for a beginner?", "Yes — it runs in every browser, gives instant visual feedback, and lets a beginner build real interactive things quickly, which keeps motivation high while the fundamentals settle in."],
    ["What JavaScript topics do you cover?", "From variables, functions and loops through the DOM, events, arrays and objects, up to async code, fetch and working with APIs — the whole path from a first script to interactive web features."],
    ["Can you help with school or bootcamp coursework?", "Yes — we support high-school computer-studies work and bootcamp or university assignments, working on your actual project so the concepts stick and the grade follows."],
    ["Do you teach frameworks like React?", "Once the JavaScript fundamentals are solid, yes — we move into modern tooling and React so you understand what the framework is doing underneath, not just how to copy it."],
    ["Where are JavaScript sessions held?", "Sessions run online for students anywhere in Vancouver, or in person in Burnaby, and you are always working on your own code rather than watching a lecture."],
  ],
  "web-development": [
    ["What does web development tutoring cover?", "The full front-end path — HTML structure, CSS layout and responsive design, and JavaScript interactivity — then, when you are ready, back-end basics, databases and deploying a real, live site."],
    ["I want to build my own website — where do I start?", "We start with a small real project and build it with you, explaining each piece as it is used, so you finish with both a working site and the understanding to change it yourself."],
    ["Do you teach React and modern tooling?", "Yes — after the fundamentals are solid we cover React, component thinking, and the everyday workflow professional developers actually use to ship features."],
    ["Is this suitable for a complete beginner or career-changer?", "Both. We meet you at your first line of code or mid-career switch and sequence the skills so each builds on the last rather than overwhelming you at once."],
    ["How is the tutoring delivered?", "We teach remotely across the Lower Mainland, with the option to meet in person in Burnaby, one-to-one and paced to the goal you are working toward."],
  ],
  "physics-tutoring": [
    ["What levels of physics do you tutor?", "High-school Physics 11 and 12 through first-year university mechanics, electricity and waves — the levels where the maths and the concepts start pulling in different directions."],
    ["My child understands the theory but can't solve the problems — why?", "Physics rewards turning a worded situation into the right equation and reasoning through it, which is a separate skill from knowing the theory. We drill exactly that, step by step, until it becomes automatic."],
    ["Do you connect the maths to the physics?", "Yes — much of the struggle is really algebra and trigonometry under time pressure. We shore up the specific maths a topic needs so the physics stops feeling impossible."],
    ["Can you help before a Physics 12 provincial or final?", "Yes — focused, high-yield review of the topics that carry the most marks, with timed practice so the pressure of the real exam holds no surprises."],
    ["How do physics sessions run?", "Choose in-person sessions in Burnaby or online tutoring from anywhere in the region — the teaching is the same either way, one-to-one and aligned to the BC curriculum."],
  ],
  "burnaby-stem-tutoring": [
    ["What subjects does your STEM tutoring cover?", "Math, Physics, Chemistry, Biology and Computer Science for high-school and university students — the connected core where strength in one subject quietly lifts the others."],
    ["Can one tutor cover more than one STEM subject?", "Yes — our PhD-led tutors work across the maths and sciences, which helps students see how calculus, physics and chemistry reinforce one another instead of feeling like separate silos."],
    ["Is this for high-school or university students?", "Both. We support Grades 8–12 STEM courses and first- and second-year university subjects, from Pre-Calculus through university physics and chemistry."],
    ["How do you help a student who has fallen behind?", "We pinpoint the exact gaps, rebuild the foundation, and then move forward — because in STEM a shaky earlier concept silently breaks everything built on top of it."],
    ["Do you tutor in person in Burnaby?", "Yes — in person in Burnaby, plus online options for families across the wider region, with each student paired to a single tutor around the courses they are taking."],
  ],
  "vancouver-math-tutoring": [
    ["What levels of math do you tutor in Vancouver?", "From Grade 8 through Pre-Calculus 11/12, Calculus, IB and AP, up to first-year university calculus and linear algebra — both school and university math."],
    ["Do you follow the BC math curriculum?", "Yes — school sessions align to the BC curriculum and your student's exact course, so the tutoring reinforces precisely what is being assessed in class."],
    ["My child has math anxiety — can you help?", "Yes. We slow the pace, rebuild confidence from a solid base, and turn confusing topics into methods a student can actually follow, which is what quietly dissolves the anxiety."],
    ["Can you help with UBC or SFU calculus?", "Yes — for UBC, SFU and Langara students we break first-year calculus and linear-algebra courses down into manageable steps you can actually follow."],
    ["Where do Vancouver math sessions take place?", "Everything is available online for Vancouver students, or in person just across the bridge in Burnaby, always one-to-one and built around your goals."],
  ],
};

// ── self-overlap guard: no two answers may share a 7-word run ──
const shingles = (s, n = 7) => {
  const w = s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const out = new Set();
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(" "));
  return out;
};
const answers = Object.entries(FAQS).flatMap(([slug, arr]) => arr.map(([q, a], i) => ({ slug, i, q, a })));
let clash = 0;
for (let x = 0; x < answers.length; x++) {
  for (let y = x + 1; y < answers.length; y++) {
    const sa = shingles(answers[x].a), sb = shingles(answers[y].a);
    for (const sh of sa) if (sb.has(sh)) { console.error(`✗ overlap "${sh}" between ${answers[x].slug}#${answers[x].i} and ${answers[y].slug}#${answers[y].i}`); clash++; break; }
  }
}
if (clash) { console.error(`\n${clash} overlapping pairs — reword before committing.`); process.exit(1); }
console.log(`✓ ${answers.length} answers, 0 shared 7-word runs`);

const block = (slug, i, text) => ({
  _key: `${slug}faq${i}b`, _type: "block", style: "normal", markDefs: [],
  children: [{ _key: `${slug}faq${i}s`, _type: "span", marks: [], text }],
});
const toFaq = (slug, i, q, a) => ({ _key: `${slug}faq${i}`, question: q, answer: [block(slug, i, a)] });

console.log(`Mode: ${COMMIT ? "COMMIT" : "DRY RUN"}`);
let fail = false;
for (const [slug, arr] of Object.entries(FAQS)) {
  const doc = await c.fetch(`*[_type=="programPage" && slug.current==$s && !(_id in path("drafts.**"))][0]{_id, "n":count(faqs)}`, { s: slug });
  if (!doc?._id) { console.error(`✗ programPage/${slug} not found`); fail = true; continue; }
  if (doc.n) { console.log(`  ~ ${slug} already has ${doc.n} FAQs — skipping`); continue; }
  const faqs = arr.map(([q, a], i) => toFaq(slug, i, q, a));
  const words = arr.reduce((n, [, a]) => n + a.split(/\s+/).length, 0);
  console.log(`  ${slug}: +${faqs.length} FAQs (~${words} words)`);
  if (COMMIT) await c.patch(doc._id).set({ faqs }).commit();
}
if (fail) process.exit(1);

if (COMMIT) {
  let bad = 0;
  for (const slug of Object.keys(FAQS)) {
    const n = await c.fetch(`count(*[_type=="programPage" && slug.current==$s][0].faqs)`, { s: slug });
    if (!n) { console.error(`✗ ${slug} still 0 FAQs`); bad++; }
  }
  console.log(bad ? `✗ ${bad} failed` : "✓ all programs have FAQs live");
  process.exit(bad ? 1 : 0);
}
