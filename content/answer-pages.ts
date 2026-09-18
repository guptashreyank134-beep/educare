/** @format */

// Answer pages: one page per question parents actually ask.
//
// AI answer engines quote the passage that answers the question directly, so
// every page leads with `directAnswer` — two sentences, immediately under the
// H1 — before any supporting detail.
//
// STATUS: all five ship as `draft`, which renders noindex and keeps them out of
// the sitemap and llms.txt. Structure, schema and internal links are complete;
// the factual claims are not. Anything that needs Dr. Shreyank to confirm is
// marked TODO(review) in the body rather than written as confident copy, because
// a wrong answer cited by an answer engine is worse than no page at all.
//
// Flip `status` to "published" per page once the facts are checked.

import { PRICING_TEXT } from "@/data/pricing";

export interface AnswerSection {
  heading: string;
  /** Paragraphs. A TODO(review) entry marks a claim that needs confirming. */
  body: string[];
  points?: string[];
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

const DRAFTED = "2026-09-18";

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
        body: [
          "These are our own published rates, not a market average.",
        ],
        points: [
          `One-on-one: ${PRICING_TEXT.oneOnOne}`,
          `Small group: ${PRICING_TEXT.monthlyGroup} (${PRICING_TEXT.maxGroup})`,
          `Exam booster: ${PRICING_TEXT.examBooster}`,
        ],
      },
      {
        heading: "What changes the price",
        body: [
          "TODO(review): confirm which factors actually move our price — grade level, subject, one-on-one versus group, and session length. Do not describe a factor that does not affect what we charge.",
        ],
      },
      {
        heading: "What the wider market charges",
        body: [
          "TODO(review): only include a market range if we have a source we are willing to cite. An invented 'typical Vancouver rate' is exactly the kind of claim an answer engine will repeat back at us.",
        ],
      },
      {
        heading: "What to check before you book",
        body: [
          "TODO(review): confirm this list reflects how we actually operate — cancellation terms, whether the rate differs online, and whether GST is included.",
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
    lastReviewed: DRAFTED,
  },

  {
    slug: "how-to-prepare-for-bc-chemistry-12-final",
    question: "How do you prepare for the BC Chemistry 12 final?",
    metaTitle: "How to Prepare for the BC Chemistry 12 Final",
    metaDescription:
      "A study plan for the BC Chemistry 12 final: which units carry the most weight, how to revise them, and the mistakes that cost the most marks.",
    directAnswer:
      "TODO(review): write the two-sentence answer once the exam format is confirmed. It should say how far ahead to start and what to prioritise first.",
    sections: [
      {
        heading: "What the final covers",
        body: [
          "TODO(review): confirm the current BC Chemistry 12 unit list and their relative weighting. The course has changed under the redesigned curriculum and the provincial exam was discontinued, so 'the final' here means the school-set final — confirm this framing is correct before publishing.",
        ],
      },
      {
        heading: "A revision plan",
        body: ["TODO(review): confirm the timeline we actually recommend to students."],
      },
      {
        heading: "Where students lose marks",
        body: [
          "TODO(review): supply the most common errors Dr. Shreyank sees in Chemistry 12 — these should come from real teaching experience, not a generic list.",
        ],
      },
    ],
    related: [
      { label: "Chemistry tutoring", href: "/programs/chemistry" },
      { label: "Chemistry 12 tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "Chemistry 12 final exam review", href: "/chemistry-12-final-exam-review" },
    ],
    status: "draft",
    lastReviewed: DRAFTED,
  },

  {
    slug: "pre-calculus-11-vs-foundations-of-math-11",
    question: "Pre-Calculus 11 or Foundations of Math 11: which should my child take?",
    metaTitle: "Pre-Calculus 11 vs Foundations of Math 11 in BC",
    metaDescription:
      "The difference between Pre-Calculus 11 and Foundations of Math 11 in BC, and which one your child needs for the programs they are aiming at.",
    directAnswer:
      "TODO(review): the answer turns on what the student intends to study after Grade 12. State the rule plainly in two sentences once the current post-secondary requirements are confirmed.",
    sections: [
      {
        heading: "What each course is for",
        body: [
          "TODO(review): confirm how BC currently distinguishes the two pathways, in the school system's own words.",
        ],
      },
      {
        heading: "Which programs require which",
        body: [
          "TODO(review): this is the part families get wrong and the part we must not guess. Confirm the current requirements against published admissions pages before writing anything here, and cite them.",
        ],
      },
      {
        heading: "Switching between them",
        body: ["TODO(review): confirm whether and when a student can move between pathways."],
      },
    ],
    related: [
      { label: "Pre-Calculus tutoring", href: "/programs/pre-calculus" },
      { label: "Pre-Calculus 11 tutor in Burnaby", href: "/pre-calculus-11-tutor-burnaby" },
      { label: "Mathematics tutoring", href: "/programs/mathematics" },
    ],
    status: "draft",
    lastReviewed: DRAFTED,
  },

  {
    slug: "ap-vs-ib-in-bc-university-admissions",
    question: "AP or IB in BC: what is the difference for university admissions?",
    metaTitle: "AP vs IB in BC: What It Means for University Admissions",
    metaDescription:
      "How AP and IB differ for BC students applying to university — course structure, workload, and how each is treated in admissions.",
    directAnswer:
      "TODO(review): state the practical difference in two sentences. Avoid implying one is categorically better; the honest answer depends on the student and the program.",
    sections: [
      {
        heading: "How the two are structured",
        body: [
          "TODO(review): confirm the structural difference — AP as individual subject exams, IB as a full diploma programme — in current terms.",
        ],
      },
      {
        heading: "How admissions treat them",
        body: [
          "TODO(review): do not generalise. Transfer credit and admissions treatment vary by institution and change year to year. Either cite specific published policies or say plainly that families should check with each university.",
        ],
      },
      {
        heading: "Choosing between them",
        body: ["TODO(review): confirm the advice Dr. Shreyank actually gives families here."],
      },
    ],
    related: [
      { label: "IB & AP tutoring", href: "/programs/ib-ap-tutoring" },
      { label: "IB Math tutor in Burnaby", href: "/ib-math-tutor-burnaby" },
      { label: "Mathematics tutoring", href: "/programs/mathematics" },
    ],
    status: "draft",
    lastReviewed: DRAFTED,
  },

  {
    slug: "when-to-start-ap-exam-prep",
    question: "When should a student start AP exam prep?",
    metaTitle: "When Should a Student Start AP Exam Prep?",
    metaDescription:
      "When to begin preparing for AP exams, how to phase revision across the year, and the signs a student has left it too late.",
    directAnswer:
      "TODO(review): give a specific timeframe in two sentences — AP exams sit in May, so the answer should be concrete rather than 'as early as possible'.",
    sections: [
      {
        heading: "A term-by-term timeline",
        body: ["TODO(review): confirm the schedule we actually recommend, anchored to the May exam window."],
      },
      {
        heading: "How much time per week",
        body: ["TODO(review): confirm a realistic weekly commitment rather than an aspirational one."],
      },
      {
        heading: "Signs a student has started too late",
        body: ["TODO(review): supply from real teaching experience."],
      },
    ],
    related: [
      { label: "IB & AP tutoring", href: "/programs/ib-ap-tutoring" },
      { label: "AP Chemistry tutor in Burnaby", href: "/ap-chemistry-tutor-burnaby" },
      { label: "AP Physics tutor in Burnaby", href: "/ap-physics-tutor-burnaby" },
    ],
    status: "draft",
    lastReviewed: DRAFTED,
  },
];

export const answerPagePath = (slug: string) => `/guides/${slug}`;

export const getAnswerPage = (slug: string): AnswerPage | undefined =>
  answerPages.find((page) => page.slug === slug);

/** Only published pages belong in the sitemap, llms.txt or internal link lists. */
export const publishedAnswerPages = answerPages.filter((page) => page.status === "published");
