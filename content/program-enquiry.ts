/** @format */

// Per-program settings for the consultation panel.
//
// Kept as data so every program page renders the same component with wording
// that actually suits its audience: a parent looking at Physics 11 has no course
// code to give, while a student on a university page usually does.
//
// `subject` becomes the lead subject in Studio and in analytics, so it must
// distinguish the pages — "Physics" and "University Physics" are separate
// enquiries, not one merged bucket.

export interface ProgramEnquiry {
  subject: string;
  courseExample: string;
  /** Omitted for university programs, which keep the course-code wording. */
  courseLabel?: string;
  /** Matches data/testimonials.ts topics. Omit where no review applies. */
  testimonialTopic?: string;
}

const SCHOOL_LABEL = "Student's grade or course";

export const PROGRAM_ENQUIRY: Record<string, ProgramEnquiry> = {
  // ── School-level subjects ────────────────────────────────────────────────
  mathematics: {
    subject: "Mathematics",
    courseLabel: SCHOOL_LABEL,
    courseExample: "Math 10, Pre-Calculus 11, or Grade 8 maths",
  },
  "pre-calculus": {
    subject: "Pre-Calculus",
    courseLabel: SCHOOL_LABEL,
    courseExample: "Pre-Calculus 11, Pre-Calculus 12, or Calculus 12",
  },
  physics: {
    subject: "Physics",
    courseLabel: SCHOOL_LABEL,
    courseExample: "Physics 11, Physics 12, AP Physics 1, IB Physics HL, or UBC PHYS 117",
    testimonialTopic: "physics",
  },
  chemistry: {
    subject: "Chemistry",
    courseLabel: SCHOOL_LABEL,
    courseExample: "Chemistry 11, Chemistry 12, or AP Chemistry",
  },
  biology: {
    subject: "Biology",
    courseLabel: SCHOOL_LABEL,
    courseExample: "Biology 11, Biology 12, or AP Biology",
  },
  "computer-science": {
    subject: "Computer Science",
    courseLabel: SCHOOL_LABEL,
    courseExample: "Computer Science 11, AP Computer Science A, or IB Computer Science",
  },
  french: {
    subject: "French",
    courseLabel: SCHOOL_LABEL,
    courseExample: "French 9, Core French 11, or conversational French",
  },
  mandarin: {
    subject: "Mandarin",
    courseLabel: SCHOOL_LABEL,
    courseExample: "Mandarin 10, or conversational Mandarin",
  },
  "ib-ap-tutoring": {
    subject: "IB & AP",
    courseLabel: SCHOOL_LABEL,
    courseExample: "IB Math AA HL, AP Calculus BC, or AP Chemistry",
  },
  "burnaby-stem-tutoring": {
    subject: "STEM",
    courseLabel: SCHOOL_LABEL,
    courseExample: "Science 10, Physics 11, or Computer Science 12",
  },
  "vancouver-math-tutoring": {
    subject: "Mathematics (Vancouver)",
    courseLabel: SCHOOL_LABEL,
    courseExample: "Math 10, Pre-Calculus 11, or Calculus 12",
  },

  // ── Coding and web ───────────────────────────────────────────────────────
  python: {
    subject: "Python",
    courseLabel: SCHOOL_LABEL,
    courseExample: "school Python course, a university intro course, or self-study",
  },
  javascript: {
    subject: "JavaScript",
    courseLabel: SCHOOL_LABEL,
    courseExample: "school JavaScript course, a bootcamp module, or self-study",
  },
  "web-development": {
    subject: "Web Development",
    courseLabel: SCHOOL_LABEL,
    courseExample: "a school web course, a bootcamp module, or a personal project",
  },

  // ── Exam preparation ─────────────────────────────────────────────────────
  "sat-prep": {
    subject: "SAT Preparation",
    courseLabel: "Test date and target score",
    courseExample: "SAT in March, aiming for 1400+",
  },
  "gre-prep": {
    subject: "GRE Preparation",
    courseLabel: "Test date and target score",
    courseExample: "GRE in June, aiming for 320+",
  },
  "gmat-prep": {
    subject: "GMAT Preparation",
    courseLabel: "Test date and target score",
    courseExample: "GMAT in May, aiming for 700+",
  },
  "mcat-prep": {
    subject: "MCAT Preparation",
    courseLabel: "Test date and target section",
    courseExample: "MCAT in January, focusing on Chem/Phys",
  },

  // ── University level ─────────────────────────────────────────────────────
  "university-mathematics": {
    subject: "University Mathematics",
    courseExample: "UBC MATH 100 or SFU MATH 151",
  },
  "university-physics": {
    subject: "University Physics",
    courseExample: "UBC PHYS 117 or SFU PHYS 120",
    testimonialTopic: "university-physics",
  },
  "university-chemistry": {
    subject: "University Chemistry",
    courseExample: "UBC CHEM 121 or SFU CHEM 121",
  },
  "university-biology": {
    subject: "University Biology",
    courseExample: "UBC BIOL 112 or SFU BISC 101",
  },
  "university-finance": {
    subject: "University Finance",
    courseExample: "UBC COMM 298 or SFU BUS 312",
  },
  finance: {
    subject: "Finance",
    courseExample: "a finance course, or professional exam preparation",
  },
};

export function programEnquiryFor(slug: string): ProgramEnquiry | undefined {
  return PROGRAM_ENQUIRY[slug];
}

/** Element id and analytics form id for a program's enquiry form. */
export const programAnchor = (slug: string) => `${slug}-enquiry`;
