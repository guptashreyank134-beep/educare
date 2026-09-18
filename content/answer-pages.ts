/** @format */

// Answer pages: one page per question parents actually ask.
//
// AI answer engines quote the passage that answers the question directly, so
// every page leads with `directAnswer` — two sentences, immediately under the
// H1 — before any supporting detail.
//
// Curriculum and admissions rules change. Where a claim rests on an external
// authority, `sources` carries the link, and the copy says plainly that families
// must check their own school or programme rather than implying a universal
// rule. Where we have no citable source — a "typical Vancouver rate", for
// instance — the claim is left out rather than estimated.
//
// Facts reviewed by Dr. Shreyank Gupta on 2026-09-18. Flip `status` to
// "published" per page; nothing about the template depends on the others.

import { PRICING, PRICING_TEXT } from "@/data/pricing";

export interface AnswerSection {
  heading: string;
  body: string[];
  points?: string[];
  /**
   * Where a claim in this section comes from. Curriculum and admissions rules
   * change, so a reader — and an answer engine — needs to see the authority
   * rather than take our word for it.
   */
  sources?: { label: string; href: string }[];
}

export interface AnswerPage {
  slug: string;
  /** The question, as asked. Used as the H1. */
  question: string;
  metaTitle: string;
  metaDescription: string;
  /** The answer in two sentences. Rendered directly under the H1. */
  directAnswer: string;
  sections: AnswerSection[];
  /** Internal links to the subject pages this answer relates to. */
  related: { label: string; href: string }[];
  status: "draft" | "published";
  /** ISO date shown as "Last reviewed" and used as dateModified. */
  lastReviewed: string;
}

const REVIEWED = "2026-09-18";

const BC_CURRICULUM_CHEMISTRY = {
  label: "BC Chemistry 12 curriculum",
  href: "https://curriculum.gov.bc.ca/curriculum/science/12/chemistry",
};
const BC_ASSESSMENTS = {
  label: "BC provincial assessments",
  href: "https://curriculum.gov.bc.ca/provincial/assessment",
};

export const answerPages: AnswerPage[] = [
  {
    slug: "how-much-does-a-tutor-cost-vancouver-burnaby",
    question: "How much does a tutor cost in Vancouver and Burnaby?",
    metaTitle: "How Much Does a Tutor Cost in Vancouver & Burnaby?",
    metaDescription:
      "What tutoring costs in Vancouver and Burnaby: one-on-one and small-group rates, what changes the price, and what to check before you book.",
    directAnswer: `At Dr. Shreyank Educare, one-on-one tutoring is ${PRICING_TEXT.oneOnOne}, and small-group tutoring is ${PRICING_TEXT.monthlyGroup} for a ${PRICING_TEXT.maxGroup}. Rates are the same online and in person, and the first 30-minute consultation is free.`,
    sections: [
      {
        heading: "Our rates",
        body: ["These are our own published rates, not a market average."],
        points: [
          `One-on-one: ${PRICING_TEXT.oneOnOne}`,
          `Small group: ${PRICING_TEXT.monthlyGroup} (${PRICING_TEXT.maxGroup})`,
          `Exam booster: ${PRICING_TEXT.examBooster}`,
        ],
      },
      {
        heading: "What changes the price",
        body: [
          "Two things move the price: whether sessions are one-on-one or in a small group, and which programme you book. Grade level and subject do not change our rate — a Grade 8 maths session and a university physics session are priced the same way.",
          `Delivery makes no difference either. Online and in-person sessions cost the same, so choosing online to save money is not a trade-off you have to make.`,
        ],
      },
      {
        heading: "What to check before you book",
        body: [
          "These points apply to any tutor you are considering, not only to us. Ours are listed so you can compare like with like.",
        ],
        points: [
          `Cancellation: we ask for ${PRICING.cancellationHours} hours' notice to cancel or reschedule without charge.`,
          "Tax: our published figures include GST, so the price you see is the price you pay.",
          "Delivery: our rate is identical online and in person.",
          "Group size: our small groups are capped, so ask any tutor what their maximum actually is.",
          "Trial: ask whether the first consultation is free and what it covers — ours is a free 30-minute consultation.",
        ],
      },
    ],
    related: [
      { label: "Pricing", href: "/pricing" },
      { label: "Math tutoring in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Math tutoring in Vancouver", href: "/math-tutor-vancouver" },
      { label: "How to choose a tutor", href: "/guides/how-to-choose-a-tutor-burnaby-vancouver" },
    ],
    status: "draft",
    lastReviewed: REVIEWED,
  },

  {
    slug: "how-to-prepare-for-bc-chemistry-12-final",
    question: "How do you prepare for the BC Chemistry 12 final?",
    metaTitle: "How to Prepare for the BC Chemistry 12 Final",
    metaDescription:
      "A study plan for the BC Chemistry 12 final: what the course covers, a six-to-eight-week revision timeline, and the mistakes that cost the most marks.",
    directAnswer:
      "Begin focused preparation six to eight weeks before your school's exam. Start with a diagnostic test made of mixed questions rather than rereading notes, so you can see exactly which concepts and calculations are costing you marks.",
    sections: [
      {
        heading: "What the final covers",
        body: [
          "BC Chemistry 12 covers five main areas: reaction kinetics and energy changes; dynamic equilibrium; solubility equilibrium and Ksp; acids, bases, buffers, hydrolysis and titration; and oxidation-reduction and electrochemistry.",
          "The province sets the required learning standards but does not prescribe a province-wide unit weighting — individual schools and teachers decide how their course and final assessment are weighted. In our revision plans we normally give the most time to equilibrium, solubility and acid-base chemistry, because they are calculation-heavy, interconnected topics where a small conceptual error can affect an entire solution. Check your teacher's review guide for the weighting your school actually uses.",
          "One point of terminology matters here: BC no longer administers a Chemistry 12 provincial examination. The only provincial graduation assessments are the Grade 10 Numeracy Assessment and the Grade 10 and Grade 12 Literacy Assessments. So “the Chemistry 12 final” means a school-set or teacher-set final, where your school uses one.",
        ],
        sources: [BC_CURRICULUM_CHEMISTRY, BC_ASSESSMENTS],
      },
      {
        heading: "A six-to-eight-week revision plan",
        body: [
          "Starting later is not fatal, but compress this sequence rather than skipping the diagnostic or the error analysis — those are what make the rest of the time efficient.",
        ],
        points: [
          "Week 1: complete a diagnostic assessment and build a topic-by-topic error log.",
          "Weeks 2–4: rebuild weak concepts and practise one unit at a time, starting with equilibrium and acid-base chemistry.",
          "Weeks 5–6: work through mixed, cumulative problem sets under moderate time limits.",
          "Weeks 7–8: write timed school-style practice exams, analyse every error, and revisit only the remaining weak areas.",
          "Final two days: review formulas, recurring mistakes and representative problems rather than trying to relearn the course.",
        ],
      },
      {
        heading: "Where students lose the most marks",
        body: [
          "These are the errors we see most often in Chemistry 12, and most of them are conceptual rather than careless.",
        ],
        points: [
          "Writing an incorrect equilibrium expression, especially by including pure solids or liquids.",
          "Setting up an ICE table without correctly accounting for stoichiometric coefficients.",
          "Confusing acid or base strength with concentration.",
          "Starting a titration calculation as an equilibrium problem before finishing the required mole stoichiometry.",
          "Using Ka, Kb, Kw, Ksp or Keq without first identifying the chemical system.",
          "Reversing anode and cathode, or losing track of electron flow in electrochemistry.",
          "Copying a calculator result without units, significant figures, equations or supporting work.",
          "Repeating familiar questions instead of correcting the underlying misconception.",
        ],
      },
    ],
    related: [
      { label: "Chemistry tutoring", href: "/programs/chemistry" },
      { label: "Chemistry 12 tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "Chemistry 12 final exam review", href: "/chemistry-12-final-exam-review" },
    ],
    status: "draft",
    lastReviewed: REVIEWED,
  },

  {
    slug: "pre-calculus-11-vs-foundations-of-math-11",
    question: "Pre-Calculus 11 or Foundations of Math 11: which should my child take?",
    metaTitle: "Pre-Calculus 11 vs Foundations of Math 11 in BC",
    metaDescription:
      "The difference between Pre-Calculus 11 and Foundations of Math 11 in BC, which programs require which, and how late a student can switch pathways.",
    directAnswer:
      "If there is any realistic chance your child may study science, engineering, computer science, mathematics, economics or another calculus-based program, choose Pre-Calculus 11. Choose Foundations only when the intended pathway clearly does not require Pre-Calculus 12.",
    sections: [
      {
        heading: "What each course is for",
        body: [
          "Pre-Calculus 11 emphasises algebraic and symbolic mathematics: powers and radicals, polynomial factoring, rational expressions, quadratic functions and equations, inequalities, and trigonometry. It leads naturally to Pre-Calculus 12 and then to university calculus.",
          "Foundations of Mathematics 11 emphasises mathematical reasoning, graphical analysis, geometry, optimisation, statistics, scale models and financial applications. It is a full academic mathematics course, but it does not give the same algebraic preparation as Pre-Calculus.",
          "Neither is simply the easier option. They are built for different post-secondary pathways.",
        ],
        sources: [
          {
            label: "BC Pre-Calculus 11 curriculum",
            href: "https://curriculum.gov.bc.ca/curriculum/mathematics/11/pre-calculus",
          },
          {
            label: "BC Foundations of Mathematics 11 curriculum",
            href: "https://curriculum.gov.bc.ca/curriculum/mathematics/11/foundations-of-mathematics",
          },
        ],
      },
      {
        heading: "Which programs require which",
        body: [
          "Requirements vary by institution and by program, so check the specific program rather than relying on a general faculty label. Pre-Calculus 12 is commonly required for engineering; computer science and software systems; mathematics, statistics and actuarial science; the physical sciences; many life-science and health-science degrees; business and economics at some universities; and any program containing first-year calculus.",
          "As a current local example, SFU's requirements from Fall 2026 onward specify Pre-Calculus 12 for programs including Engineering Science, Science, Environmental Science/Physical Geography BSc and Beedie Business, while some programs — Computing Science and Health Sciences BSc among them — accept Pre-Calculus 12 or Calculus 12.",
        ],
        sources: [
          {
            label: "SFU BC/Yukon admission requirements by program",
            href: "https://www.sfu.ca/students/admission/admission-requirements/canadian-highschool/bc-yukon.html",
          },
          {
            label: "UBC Canadian high-school admission requirements",
            href: "https://you.ubc.ca/applying-ubc/requirements/canadian-high-schools/",
          },
        ],
      },
      {
        heading: "Switching between them",
        body: [
          "Switching is possible, and the earlier the decision the easier it is. A student moving from Foundations 11 into the Pre-Calculus pathway will generally need to complete Pre-Calculus 11, or an approved prerequisite or upgrading route, before taking Pre-Calculus 12.",
          "Ideally the pathway is settled during Grade 10 course planning or early in Grade 11. A later switch may still work through summer school, online learning or an extra semester, but prerequisites and scheduling are set locally — confirm both with the school counsellor.",
        ],
      },
    ],
    related: [
      { label: "Pre-Calculus tutoring", href: "/programs/pre-calculus" },
      { label: "Pre-Calculus 11 tutor in Burnaby", href: "/pre-calculus-11-tutor-burnaby" },
      { label: "Mathematics tutoring", href: "/programs/mathematics" },
    ],
    status: "draft",
    lastReviewed: REVIEWED,
  },

  {
    slug: "ap-vs-ib-in-bc-university-admissions",
    question: "AP or IB in BC: what is the difference for university admissions?",
    metaTitle: "AP vs IB in BC: What It Means for University Admissions",
    metaDescription:
      "How AP and IB differ for BC students: course structure, workload, how admissions and transfer credit actually work, and how to choose between them.",
    directAnswer:
      "AP is usually the more flexible option: students take one or several advanced subjects based on their strengths and write separate subject examinations. The IB Diploma Programme is a coordinated two-year course requiring six subject groups plus Theory of Knowledge, the Extended Essay and Creativity, Activity, Service, so it asks for broader and more continuous organisation.",
    sections: [
      {
        heading: "How the two are structured",
        body: [
          "The short version — AP is subject-by-subject, IB is a full diploma programme — is broadly right, with one qualification. AP remains primarily subject-by-subject. IB students may pursue the full Diploma Programme or take individual or partial IB courses, depending on what their school offers; UBC, for example, explicitly recognises IB certificate courses taken alongside another high-school curriculum.",
        ],
        sources: [
          { label: "IB Diploma Programme structure", href: "https://ibo.org/programmes/diploma-programme/" },
          {
            label: "UBC IB admissions information",
            href: "https://you.ubc.ca/applying-ubc/requirements/international-baccalaureate/",
          },
        ],
      },
      {
        heading: "How admissions and transfer credit actually work",
        body: [
          "AP and IB results may support admission and may earn first-year credit or advanced standing, but policies differ by university, subject, score and degree. Verify the current policy for every university and program on your child's list rather than assuming a general rule.",
          "Two examples show why. UBC currently grants first-year credit for approved AP examinations with scores of 4 or higher, while SFU generally grants AP transfer credit in designated subjects for scores of 4 or 5 — and each institution's IB rules are different again.",
        ],
        sources: [
          { label: "UBC AP policy", href: "https://you.ubc.ca/applying-ubc/requirements/advanced-placement/" },
          {
            label: "UBC IB policy",
            href: "https://you.ubc.ca/applying-ubc/requirements/international-baccalaureate/",
          },
          {
            label: "SFU AP policy",
            href: "https://www.sfu.ca/students/admission/admission-requirements/advanced-placement.html",
          },
          {
            label: "SFU IB policy",
            href: "https://www.sfu.ca/students/admission/admission-requirements/international-baccalaureate.html",
          },
        ],
      },
      {
        heading: "How we help families choose",
        body: [
          "Don't choose based on which label sounds more prestigious. Choose AP when your child wants flexibility, has clear strengths in particular subjects, or needs room for sport, activities or other demanding courses. Choose the full IB Diploma when your child is academically balanced, organised, comfortable with sustained writing and research, and genuinely wants an integrated two-year programme.",
          "The quality of the school's teachers and support matters as much as the programme itself. A student who performs well and stays healthy in the right programme is usually better placed than one who picks the most demanding option and becomes overloaded.",
        ],
      },
    ],
    related: [
      { label: "IB & AP tutoring", href: "/programs/ib-ap-tutoring" },
      { label: "IB Math tutor in Burnaby", href: "/ib-math-tutor-burnaby" },
      { label: "Mathematics tutoring", href: "/programs/mathematics" },
    ],
    status: "draft",
    lastReviewed: REVIEWED,
  },

  {
    slug: "when-to-start-ap-exam-prep",
    question: "When should a student start AP exam prep?",
    metaTitle: "When Should a Student Start AP Exam Prep?",
    metaDescription:
      "When to begin preparing for AP exams, a term-by-term schedule anchored to the May exam window, realistic weekly hours, and the signs of starting too late.",
    directAnswer:
      "For a May AP examination, structured preparation should begin in September or October, alongside the course. A strong student who has kept up can start a dedicated review phase in January, but waiting until March to learn major parts of the syllabus creates unnecessary risk.",
    sections: [
      {
        heading: "A term-by-term schedule",
        body: [
          "AP examinations are administered in May. Confirm your subject's exact date each year, because the schedule shifts.",
        ],
        points: [
          "September–October: take a diagnostic, confirm prerequisite skills, establish weekly practice.",
          "November–December: build content knowledge with topic-specific multiple-choice and free-response questions.",
          "January–February: finish most new content, revisit earlier units, begin cumulative timed sections.",
          "March: identify the highest-frequency errors and practise mixed questions under exam conditions.",
          "April: complete full or near-full practice examinations, with detailed corrections after every attempt.",
          "Final two weeks: review the error log, formulas, command words and timing strategy while protecting sleep and schoolwork.",
        ],
        sources: [
          { label: "College Board AP exam calendar", href: "https://apstudents.collegeboard.org/exam-dates" },
        ],
      },
      {
        heading: "How much time per week is realistic",
        body: [
          "For one AP subject, most students can sustain two to three focused hours per week outside class during the first term. A demanding STEM AP course, a student aiming for a 5, or a student with weaker prerequisites may need three to five hours.",
          "Through March and April this may rise to roughly four to six hours including timed practice. The quality of those hours matters more than the total: retrieval practice, exam questions and error correction do far more than passive rereading.",
        ],
      },
      {
        heading: "Signs a student has left it too late",
        body: [
          "Warning signs include reaching March with more than a third of the course still unlearned, being unable to finish a multiple-choice section within the time limit, scoring below roughly 50% on free-response questions, or repeatedly making errors that trace back to missing prerequisite knowledge.",
          "None of that makes improvement impossible, but the goal may need to change from full mastery to a prioritised rescue plan: high-yield topics, scoring technique, timed practice, and the specific errors most likely to move the score in the weeks that remain.",
        ],
      },
    ],
    related: [
      { label: "IB & AP tutoring", href: "/programs/ib-ap-tutoring" },
      { label: "AP Chemistry tutor in Burnaby", href: "/ap-chemistry-tutor-burnaby" },
      { label: "AP Physics tutor in Burnaby", href: "/ap-physics-tutor-burnaby" },
    ],
    status: "draft",
    lastReviewed: REVIEWED,
  },
];

export const answerPagePath = (slug: string) => `/guides/${slug}`;

export const getAnswerPage = (slug: string): AnswerPage | undefined =>
  answerPages.find((page) => page.slug === slug);

/** Only published pages belong in the sitemap, llms.txt or internal link lists. */
export const publishedAnswerPages = answerPages.filter((page) => page.status === "published");
