/**
 * Content for the Medical and Quant ("University & Professional") vertical
 * landing pages, rendered by components/VerticalLandingPage.tsx.
 *
 * Wording rules from the SEO brief:
 *  - Medical pages target USA + Caribbean only, "MD-led". They must NOT
 *    mention the UK anywhere (copy, meta, FAQs).
 *  - Quant pages target UK + USA + global (university & professional learners).
 *
 * To add a page: append an entry and create app/<slug>/page.tsx (copy an
 * existing wrapper). Also add the route to app/sitemap.ts.
 */

export interface LandingSection {
  heading: string;
  body?: string[];
  points?: string[];
}

export interface LandingFAQ {
  question: string;
  answer: string;
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface VerticalPage {
  /** URL path segment (no leading slash), e.g. "online-medical-tutoring". */
  slug: string;
  vertical: "medical" | "quant";
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  /** Regions served — used in copy and Service schema areaServed. */
  regionsServed: string[];
  intro: string[];
  sections: LandingSection[];
  whoFor: string[];
  faqs: LandingFAQ[];
  relatedLinks?: RelatedLink[];
  /** Lead form copy overrides. */
  leadHeading?: string;
  leadSubjectLabel?: string;
  leadSubjectPlaceholder?: string;
}

export const VERTICAL_BASE_URL = "https://drshreyankeducare.com";
export const verticalPath = (slug: string) => `/${slug}`;
export const verticalUrl = (slug: string) => `${VERTICAL_BASE_URL}/${slug}`;

export const verticalPages: VerticalPage[] = [
  // ── MEDICAL HUB ─────────────────────────────────────────────
  {
    slug: "online-medical-tutoring",
    vertical: "medical",
    metaTitle:
      "Online Medical Tutoring for USA & Caribbean Students | MD-Led — Dr. Shreyank Educare",
    metaDescription:
      "MD-led online medical tutoring for USA and Caribbean medical students. One-on-one help in physiology, pathology, pharmacology and USMLE prep. Book a free consultation.",
    heroHeading: "MD-Led Online Medical Tutoring for USA & Caribbean Students",
    heroSubheading:
      "One-on-one, online tutoring led by qualified doctors — supporting USA and Caribbean medical students across the core medical sciences and board exam preparation.",
    regionsServed: ["United States", "Caribbean"],
    intro: [
      "Dr. Shreyank Educare provides MD-led online medical tutoring for medical students across the USA and the Caribbean. Every session is one-on-one and taught by qualified doctors who know exactly where students struggle and how to make dense material click.",
      "Whether you are working through the pre-clinical sciences or preparing for board exams, we build a focused study plan around your curriculum, your timeline, and your goals — entirely online, wherever you study.",
    ],
    sections: [
      {
        heading: "Medical Sciences We Tutor",
        points: [
          "Physiology",
          "Pathology",
          "Pharmacology",
          "Anatomy & Histology",
          "Biochemistry",
          "Microbiology & Immunology",
        ],
      },
      {
        heading: "Board & Exam Preparation",
        body: [
          "We help students prepare for their medical board and licensing exams with structured, high-yield review, targeted practice, and clear explanations of the concepts that carry the most marks.",
          "Sessions are tailored to your exam timeline — from early concept-building to focused final revision — so you walk in prepared and confident.",
        ],
      },
      {
        heading: "Why MD-Led, Online Tutoring Works",
        body: [
          "Being taught by doctors means explanations are grounded in real clinical understanding, not just textbook recall. Online delivery gives USA and Caribbean students flexible access to expert help without travel.",
          "You get a consistent tutor who tracks your progress week to week and adapts every session to what you actually need next.",
        ],
      },
    ],
    whoFor: [
      "USA medical students in pre-clinical or clinical years",
      "Caribbean medical school students",
      "Students preparing for medical board and licensing exams",
      "Anyone needing focused, one-on-one help in a core medical science",
    ],
    faqs: [
      {
        question: "Are your medical tutors qualified doctors?",
        answer:
          "Yes. Our medical tutoring is MD-led — sessions are taught by qualified doctors who understand both the exam requirements and the underlying clinical concepts.",
      },
      {
        question: "Do you tutor USA and Caribbean medical students?",
        answer:
          "Yes. We work with medical students across the USA and the Caribbean. All tutoring is delivered online, one-on-one, so you can study from wherever you are.",
      },
      {
        question: "Which medical subjects can you help with?",
        answer:
          "We tutor the core medical sciences including physiology, pathology, pharmacology, anatomy, biochemistry, and microbiology, and we provide focused board and licensing exam preparation.",
      },
      {
        question: "How are sessions delivered?",
        answer:
          "All sessions are live, one-on-one and online over video, using a shared digital whiteboard — ideal for detailed diagrams, pathways and problem-solving.",
      },
    ],
    relatedLinks: [
      { label: "University & Professional Tutoring", href: "/university-professional" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Medical Tutoring Consultation",
    leadSubjectLabel: "Subject / Exam",
    leadSubjectPlaceholder: "e.g. Pharmacology, USMLE Step 1",
  },

  // ── QUANT / UNIVERSITY & PROFESSIONAL HUB ───────────────────
  {
    slug: "university-professional",
    vertical: "quant",
    metaTitle:
      "University & Professional Tutoring | Economics, Statistics, Actuarial & R — Dr. Shreyank Educare",
    metaDescription:
      "Expert online tutoring in Economics, Statistics, Actuarial Science and R programming for UK, USA and worldwide university and professional learners. Free consultation.",
    heroHeading:
      "University & Professional Tutoring — Economics, Statistics, Actuarial & R",
    heroSubheading:
      "Expert-led online tutoring in Economics, Statistics, Actuarial Science and R programming for university students and professionals across the UK, USA and worldwide.",
    regionsServed: ["United Kingdom", "United States", "Global"],
    intro: [
      "Dr. Shreyank Educare offers advanced online tutoring for university and professional learners in the quantitative disciplines. Taught by experienced quant specialists, our sessions turn demanding coursework and professional exams into clear, structured progress.",
      "From undergraduate statistics and econometrics to actuarial exam preparation and R programming, we support students and professionals across the UK, USA and worldwide — all online, around your schedule.",
    ],
    sections: [
      {
        heading: "What We Tutor",
        points: [
          "Economics & Econometrics",
          "Statistics & Probability",
          "Actuarial Science & professional exams",
          "R Programming",
          "Statistics with R",
          "Data analysis for university coursework",
        ],
      },
      {
        heading: "University & Professional Level",
        body: [
          "We support undergraduate and postgraduate students with coursework, assignments and exam preparation, and we coach working professionals sitting quantitative qualifications.",
          "Every plan is built around your syllabus or exam board, so sessions map directly to what you are assessed on.",
        ],
      },
      {
        heading: "Why Learn With Expert Quant Tutors",
        body: [
          "Quantitative subjects reward genuine understanding over memorisation. Our tutors break complex methods — regression, inference, stochastic models, R workflows — into steps you can reproduce under exam pressure.",
          "Online delivery means UK, USA and worldwide learners get consistent, high-level tutoring without geography getting in the way.",
        ],
      },
    ],
    whoFor: [
      "University students (undergraduate & postgraduate) in Economics, Statistics or related fields",
      "Actuarial candidates preparing for professional exams",
      "Professionals upskilling in statistics, data analysis or R",
      "Anyone needing rigorous, one-on-one quantitative tutoring online",
    ],
    faqs: [
      {
        question: "Who do you tutor for quantitative subjects?",
        answer:
          "We tutor university students and professionals across the UK, USA and worldwide in Economics, Statistics, Actuarial Science and R programming.",
      },
      {
        question: "Can you help with actuarial exam preparation?",
        answer:
          "Yes. We support actuarial candidates with structured preparation for professional exams, focusing on the techniques and problem types that appear under exam conditions.",
      },
      {
        question: "Do you teach R programming and statistics with R?",
        answer:
          "Yes. We teach R programming from the fundamentals through to applied statistical analysis, including 'Statistics with R' for coursework and professional work.",
      },
      {
        question: "Are sessions online?",
        answer:
          "All quantitative tutoring is delivered live and online, one-on-one, so university students and professionals worldwide can attend from anywhere.",
      },
    ],
    relatedLinks: [
      { label: "Online Medical Tutoring", href: "/online-medical-tutoring" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free University & Professional Consultation",
    leadSubjectLabel: "Subject / Course",
    leadSubjectPlaceholder: "e.g. Econometrics, Actuarial exams, R",
  },
];

export const getVerticalPageBySlug = (slug: string): VerticalPage | undefined =>
  verticalPages.find((p) => p.slug === slug);
