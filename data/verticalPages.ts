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

export const VERTICAL_BASE_URL = "https://www.drshreyankeducare.com";
export const verticalPath = (slug: string) => `/${slug}`;
export const verticalUrl = (slug: string) => `${VERTICAL_BASE_URL}/${slug}`;

export const verticalPages: VerticalPage[] = [
  // ── MEDICAL HUB ─────────────────────────────────────────────
  {
    slug: "online-medical-tutoring",
    vertical: "medical",
    metaTitle:
      "Online Medical Tutoring | USA & Caribbean | MD-Led",
    metaDescription:
      "MD-led online medical tutoring for USA & Caribbean students — physiology, pathology, pharmacology and USMLE prep. Book a free consultation.",
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
      "University & Professional Tutoring | Economics & Stats",
    metaDescription:
      "Expert online tutoring in Economics, Statistics, Actuarial Science and R for university and professional learners worldwide. Free consultation.",
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

  // ── MEDICAL SUBJECT PAGES ───────────────────────────────────
  {
    slug: "medical-sciences-tutor",
    vertical: "medical",
    metaTitle:
      "Medical Sciences Tutor | USA & Caribbean | MD-Led",
    metaDescription:
      "MD-led online medical sciences tutoring for USA & Caribbean students — physiology, pathology, pharmacology, anatomy and more. Free consultation.",
    heroHeading: "Online Medical Sciences Tutor — USA & Caribbean",
    heroSubheading:
      "MD-led, one-on-one online tutoring across the core medical sciences for USA and Caribbean medical students, built around your curriculum and exams.",
    regionsServed: ["United States", "Caribbean"],
    intro: [
      "Dr. Shreyank Educare provides MD-led online tutoring across the full range of medical sciences for USA and Caribbean medical students. Every session is one-on-one with a qualified doctor who connects each concept to its clinical relevance.",
      "We build a focused plan around the subjects you find hardest — from physiology to pharmacology — so you understand the material deeply rather than memorising it for a single test.",
    ],
    sections: [
      {
        heading: "Medical Sciences We Cover",
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
        heading: "Tailored to Your Curriculum",
        body: [
          "Sessions map directly to your medical school syllabus and exam timeline, whether you are in pre-clinical or clinical years.",
          "You get a consistent tutor who tracks your progress and adapts each session to what you need next.",
        ],
      },
    ],
    whoFor: [
      "USA and Caribbean medical students in pre-clinical or clinical years",
      "Students needing help across multiple medical sciences",
      "Anyone building a stronger foundation before board exams",
    ],
    faqs: [
      {
        question: "Which medical sciences do you tutor?",
        answer:
          "We cover physiology, pathology, pharmacology, anatomy, biochemistry, microbiology and immunology — MD-led and one-on-one, for USA and Caribbean students.",
      },
      {
        question: "Are the tutors qualified doctors?",
        answer:
          "Yes. All medical tutoring is MD-led, taught by qualified doctors who understand both the exams and the clinical reasoning behind the material.",
      },
      {
        question: "Is tutoring online?",
        answer:
          "Yes. All sessions are live, one-on-one and online, so you can study from anywhere in the USA or the Caribbean.",
      },
    ],
    relatedLinks: [
      { label: "Online Medical Tutoring (overview)", href: "/online-medical-tutoring" },
      { label: "Physiology Tutor", href: "/online-physiology-tutor" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Medical Sciences Consultation",
    leadSubjectLabel: "Subject / Exam",
    leadSubjectPlaceholder: "e.g. Pathology, Anatomy",
  },
  {
    slug: "online-physiology-tutor",
    vertical: "medical",
    metaTitle:
      "Online Physiology Tutor | USA & Caribbean | MD-Led",
    metaDescription:
      "MD-led online physiology tutoring for USA and Caribbean medical students. One-on-one help with systems physiology and board prep. Book a free consultation.",
    heroHeading: "Online Physiology Tutor — USA & Caribbean",
    heroSubheading:
      "MD-led, one-on-one online physiology tutoring for USA and Caribbean medical students — from cellular mechanisms to whole-system integration.",
    regionsServed: ["United States", "Caribbean"],
    intro: [
      "Physiology is the foundation everything else in medicine builds on. Dr. Shreyank Educare's MD-led tutors help USA and Caribbean medical students master it system by system, with clear cause-and-effect reasoning instead of rote recall.",
      "We focus on the high-yield mechanisms that recur throughout your courses and board exams, so your understanding compounds across subjects.",
    ],
    sections: [
      {
        heading: "Physiology Topics We Tutor",
        points: [
          "Cardiovascular physiology",
          "Respiratory physiology",
          "Renal physiology",
          "Endocrine & reproductive",
          "Neurophysiology",
          "GI & cellular physiology",
        ],
      },
      {
        heading: "Understanding Over Memorisation",
        body: [
          "Our doctors teach the mechanisms so you can reason through unfamiliar questions rather than recall isolated facts — exactly what board exams test.",
          "Each session targets your weak spots and links physiology to the pathology and pharmacology you will meet next.",
        ],
      },
    ],
    whoFor: [
      "USA and Caribbean medical students studying physiology",
      "Students preparing for physiology-heavy board questions",
      "Anyone who wants mechanism-based understanding, not memorisation",
    ],
    faqs: [
      {
        question: "Do you tutor systems physiology for board exams?",
        answer:
          "Yes. We cover cardiovascular, respiratory, renal, endocrine, neuro and GI physiology with a focus on the mechanisms most tested on medical board exams.",
      },
      {
        question: "Who teaches the sessions?",
        answer:
          "Qualified doctors. Our physiology tutoring is MD-led, one-on-one and online for USA and Caribbean students.",
      },
      {
        question: "How do online physiology sessions work?",
        answer:
          "Sessions are live over video with a shared whiteboard — ideal for drawing curves, loops and pathways as we work through mechanisms together.",
      },
    ],
    relatedLinks: [
      { label: "Online Medical Tutoring (overview)", href: "/online-medical-tutoring" },
      { label: "Pathology Tutor", href: "/online-pathology-tutor" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Physiology Consultation",
    leadSubjectLabel: "Physiology Topic",
    leadSubjectPlaceholder: "e.g. Cardiovascular, Renal",
  },
  {
    slug: "online-pathology-tutor",
    vertical: "medical",
    metaTitle:
      "Online Pathology Tutor | USA & Caribbean | MD-Led",
    metaDescription:
      "MD-led online pathology tutoring for USA and Caribbean medical students. One-on-one help with general and systemic pathology and board prep. Free consultation.",
    heroHeading: "Online Pathology Tutor — USA & Caribbean",
    heroSubheading:
      "MD-led, one-on-one online pathology tutoring for USA and Caribbean medical students — connecting mechanisms of disease to diagnosis.",
    regionsServed: ["United States", "Caribbean"],
    intro: [
      "Pathology ties the basic sciences to real disease. Dr. Shreyank Educare's MD-led tutors help USA and Caribbean medical students master general and systemic pathology with clear, mechanism-driven explanations.",
      "We emphasise the disease processes and high-yield associations that dominate board exams, so you can recognise patterns quickly and reason to a diagnosis.",
    ],
    sections: [
      {
        heading: "Pathology Topics We Tutor",
        points: [
          "General pathology & cell injury",
          "Inflammation & repair",
          "Neoplasia",
          "Systemic pathology (organ systems)",
          "Immunopathology",
          "Board-style case reasoning",
        ],
      },
      {
        heading: "From Mechanism to Diagnosis",
        body: [
          "We connect pathology back to the physiology you know and forward to the pharmacology you will use, so the whole picture holds together.",
          "Sessions use board-style vignettes to build the pattern recognition exams reward.",
        ],
      },
    ],
    whoFor: [
      "USA and Caribbean medical students studying pathology",
      "Students preparing for pathology-heavy board questions",
      "Anyone wanting stronger mechanism-to-diagnosis reasoning",
    ],
    faqs: [
      {
        question: "Do you cover general and systemic pathology?",
        answer:
          "Yes. We tutor general pathology (cell injury, inflammation, neoplasia) and systemic pathology across the organ systems, with board-style case practice.",
      },
      {
        question: "Is the pathology tutoring MD-led?",
        answer:
          "Yes. Sessions are taught by qualified doctors, one-on-one and online, for USA and Caribbean medical students.",
      },
      {
        question: "How are sessions delivered?",
        answer:
          "Live and online with a shared whiteboard, using clinical vignettes and diagrams to build diagnostic reasoning.",
      },
    ],
    relatedLinks: [
      { label: "Online Medical Tutoring (overview)", href: "/online-medical-tutoring" },
      { label: "Pharmacology Tutor", href: "/online-pharmacology-tutor" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Pathology Consultation",
    leadSubjectLabel: "Pathology Topic",
    leadSubjectPlaceholder: "e.g. Neoplasia, Systemic pathology",
  },
  {
    slug: "online-pharmacology-tutor",
    vertical: "medical",
    metaTitle:
      "Online Pharmacology Tutor | USA & Caribbean | MD-Led",
    metaDescription:
      "MD-led online pharmacology tutoring for USA and Caribbean medical students. One-on-one help with drug classes, mechanisms and board prep. Free consultation.",
    heroHeading: "Online Pharmacology Tutor — USA & Caribbean",
    heroSubheading:
      "MD-led, one-on-one online pharmacology tutoring for USA and Caribbean medical students — drug mechanisms, classes and clinical use made memorable.",
    regionsServed: ["United States", "Caribbean"],
    intro: [
      "Pharmacology overwhelms many students with sheer volume. Dr. Shreyank Educare's MD-led tutors help USA and Caribbean medical students organise it into logical drug classes and mechanisms that actually stick.",
      "We focus on the high-yield drugs, side effects and interactions that recur on board exams, tied back to the physiology and pathology they act on.",
    ],
    sections: [
      {
        heading: "Pharmacology Topics We Tutor",
        points: [
          "Autonomic pharmacology",
          "Cardiovascular & renal drugs",
          "CNS pharmacology",
          "Antimicrobials",
          "Endocrine drugs",
          "Pharmacokinetics & dynamics",
        ],
      },
      {
        heading: "Organised, High-Yield Learning",
        body: [
          "Instead of endless drug lists, we teach frameworks by mechanism and class so you can predict effects and side effects.",
          "Board-style questions reinforce the associations that matter most.",
        ],
      },
    ],
    whoFor: [
      "USA and Caribbean medical students studying pharmacology",
      "Students struggling with drug-heavy board questions",
      "Anyone wanting a mechanism-based framework over memorisation",
    ],
    faqs: [
      {
        question: "Which pharmacology topics do you tutor?",
        answer:
          "We cover autonomic, cardiovascular, renal, CNS, antimicrobial and endocrine pharmacology, plus pharmacokinetics and dynamics — for USA and Caribbean students.",
      },
      {
        question: "Is it MD-led?",
        answer:
          "Yes. Pharmacology tutoring is taught by qualified doctors, one-on-one and online.",
      },
      {
        question: "How do you make pharmacology manageable?",
        answer:
          "We organise drugs by mechanism and class so you can reason out effects and side effects, then reinforce with board-style practice.",
      },
    ],
    relatedLinks: [
      { label: "Online Medical Tutoring (overview)", href: "/online-medical-tutoring" },
      { label: "Medical Exam Prep", href: "/medical-exam-prep-tutor-online" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Pharmacology Consultation",
    leadSubjectLabel: "Pharmacology Topic",
    leadSubjectPlaceholder: "e.g. Antimicrobials, CNS drugs",
  },
  {
    slug: "medical-exam-prep-tutor-online",
    vertical: "medical",
    metaTitle:
      "Medical Exam Prep Tutor | USA & Caribbean | MD-Led",
    metaDescription:
      "MD-led online medical board and licensing exam prep for USA and Caribbean students. Structured, high-yield, one-on-one tutoring. Book a free consultation.",
    heroHeading: "Online Medical Exam Prep — USA & Caribbean",
    heroSubheading:
      "MD-led, one-on-one online preparation for medical board and licensing exams, built around your test date and your weak areas.",
    regionsServed: ["United States", "Caribbean"],
    intro: [
      "Dr. Shreyank Educare helps USA and Caribbean medical students prepare for their board and licensing exams with MD-led, one-on-one tutoring. We turn a huge syllabus into a structured, high-yield plan you can actually follow.",
      "Sessions target the topics and question styles that carry the most marks, with steady review and practice so you peak on exam day.",
    ],
    sections: [
      {
        heading: "How We Prepare You",
        points: [
          "Diagnostic of strengths & gaps",
          "High-yield topic review",
          "Board-style question practice",
          "Timed test strategy",
          "Weak-area remediation",
          "Final revision plan",
        ],
      },
      {
        heading: "Structured Around Your Test Date",
        body: [
          "We build a week-by-week plan from where you are now to your exam date, adjusting as your scores improve.",
          "Because it's MD-led, explanations come with the clinical reasoning examiners want to see.",
        ],
      },
    ],
    whoFor: [
      "USA and Caribbean students preparing for medical board or licensing exams",
      "International medical graduates preparing to sit their exams",
      "Students who want structure and accountability, not just content",
    ],
    faqs: [
      {
        question: "Which medical exams do you prepare students for?",
        answer:
          "We provide MD-led preparation for medical board and licensing exams for USA and Caribbean students, focused on high-yield content and board-style questions.",
      },
      {
        question: "How is the prep structured?",
        answer:
          "We start with a diagnostic, then build a week-by-week high-yield plan to your test date, with question practice, test strategy and targeted remediation.",
      },
      {
        question: "Is preparation one-on-one and online?",
        answer:
          "Yes. All exam prep is one-on-one, MD-led and delivered online for students across the USA and the Caribbean.",
      },
    ],
    relatedLinks: [
      { label: "Online Medical Tutoring (overview)", href: "/online-medical-tutoring" },
      { label: "Medical Sciences Tutor", href: "/medical-sciences-tutor" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Medical Exam Prep Consultation",
    leadSubjectLabel: "Exam",
    leadSubjectPlaceholder: "e.g. USMLE Step 1, board exam",
  },

  // ── QUANT SUBJECT PAGES ─────────────────────────────────────
  {
    slug: "online-statistics-tutor",
    vertical: "quant",
    metaTitle:
      "Online Statistics Tutor | University & Professional",
    metaDescription:
      "Expert online statistics tutoring worldwide — probability, inference, regression and more for university students and professionals. Free consultation.",
    heroHeading: "Online Statistics Tutor — University & Professional",
    heroSubheading:
      "Expert one-on-one online statistics tutoring for UK, USA and worldwide university students and professionals, from probability to advanced inference.",
    regionsServed: ["United Kingdom", "United States", "Global"],
    intro: [
      "Dr. Shreyank Educare offers expert online statistics tutoring for university students and professionals across the UK, USA and worldwide. Our tutors turn abstract theory into methods you can apply and reproduce under exam pressure.",
      "From first-year probability to regression and statistical inference, we tailor every session to your syllabus, assignment or professional exam.",
    ],
    sections: [
      {
        heading: "Statistics Topics We Tutor",
        points: [
          "Probability & distributions",
          "Hypothesis testing & inference",
          "Regression & ANOVA",
          "Bayesian statistics",
          "Experimental design",
          "Statistical computing",
        ],
      },
      {
        heading: "University & Professional Level",
        body: [
          "We support undergraduate and postgraduate coursework, dissertations and professional qualifications with rigorous, applied tutoring.",
          "Every plan maps to your module or exam board so sessions target exactly what you're assessed on.",
        ],
      },
    ],
    whoFor: [
      "University students in statistics, economics, psychology or the sciences",
      "Postgraduates needing help with dissertation analysis",
      "Professionals applying statistics in their work",
    ],
    faqs: [
      {
        question: "Who do you tutor statistics for?",
        answer:
          "University students and professionals across the UK, USA and worldwide — from first-year probability through advanced inference and regression.",
      },
      {
        question: "Can you help with dissertation or coursework analysis?",
        answer:
          "Yes. We help with the statistical methods behind coursework and dissertations, including choosing, running and interpreting the right tests.",
      },
      {
        question: "Do you teach statistics with software like R?",
        answer:
          "Yes. We can teach statistics alongside R — see our dedicated Statistics with R tutoring for applied, software-based sessions.",
      },
    ],
    relatedLinks: [
      { label: "University & Professional (overview)", href: "/university-professional" },
      { label: "Statistics with R Tutor", href: "/statistics-with-r-tutor" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Statistics Consultation",
    leadSubjectLabel: "Topic / Course",
    leadSubjectPlaceholder: "e.g. Regression, Inference",
  },
  {
    slug: "online-economics-tutor",
    vertical: "quant",
    metaTitle:
      "Online Economics Tutor | University & Professional",
    metaDescription:
      "Expert online economics tutoring for university students worldwide — micro, macro and econometrics. One-on-one, exam-focused. Free consultation.",
    heroHeading: "Online Economics Tutor — University & Professional",
    heroSubheading:
      "Expert one-on-one online economics tutoring for UK, USA and worldwide university students, covering micro, macro and econometrics.",
    regionsServed: ["United Kingdom", "United States", "Global"],
    intro: [
      "Dr. Shreyank Educare provides expert online economics tutoring for university students across the UK, USA and worldwide. We connect models and theory to the exam questions and problem sets you actually face.",
      "From introductory micro and macro to econometrics, sessions are built around your syllabus and the analytical skills your assessments reward.",
    ],
    sections: [
      {
        heading: "Economics Topics We Tutor",
        points: [
          "Microeconomics",
          "Macroeconomics",
          "Econometrics",
          "Game theory",
          "Mathematical economics",
          "Problem sets & exam technique",
        ],
      },
      {
        heading: "University & Professional Level",
        body: [
          "We help undergraduates and postgraduates with coursework, problem sets and exam preparation, emphasising the quantitative reasoning economics demands.",
          "Sessions map to your module and exam board so nothing is wasted.",
        ],
      },
    ],
    whoFor: [
      "University economics students (undergraduate & postgraduate)",
      "Students needing help with econometrics and quantitative methods",
      "Anyone preparing for economics exams or problem sets",
    ],
    faqs: [
      {
        question: "Which economics topics do you tutor?",
        answer:
          "Micro, macro, econometrics, game theory and mathematical economics — for UK, USA and worldwide university students.",
      },
      {
        question: "Can you help with econometrics?",
        answer:
          "Yes. Econometrics is one of our most requested areas; we cover the theory and the applied estimation, including work in R where useful.",
      },
      {
        question: "Are sessions exam-focused?",
        answer:
          "Yes. We align tutoring to your module and exam board, with problem-set practice and exam technique.",
      },
    ],
    relatedLinks: [
      { label: "University & Professional (overview)", href: "/university-professional" },
      { label: "Statistics Tutor", href: "/online-statistics-tutor" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Economics Consultation",
    leadSubjectLabel: "Topic / Course",
    leadSubjectPlaceholder: "e.g. Econometrics, Macro",
  },
  {
    slug: "r-programming-tutor",
    vertical: "quant",
    metaTitle:
      "R Programming Tutor | University & Professional",
    metaDescription:
      "Expert online R programming tutoring for UK, USA and worldwide students and professionals — from basics to data analysis and visualisation. Free consultation.",
    heroHeading: "Online R Programming Tutor — University & Professional",
    heroSubheading:
      "Expert one-on-one online R programming tutoring for UK, USA and worldwide university students and professionals, from fundamentals to applied data analysis.",
    regionsServed: ["United Kingdom", "United States", "Global"],
    intro: [
      "Dr. Shreyank Educare offers expert online R programming tutoring for university students and professionals across the UK, USA and worldwide. We teach R as a practical tool — you write, run and understand real code from day one.",
      "Whether you're new to R or handling complex data analysis, sessions are hands-on and built around your project, coursework or professional work.",
    ],
    sections: [
      {
        heading: "R Skills We Tutor",
        points: [
          "R fundamentals & syntax",
          "Data wrangling (tidyverse)",
          "Data visualisation (ggplot2)",
          "Statistical modelling in R",
          "Reproducible reports (R Markdown)",
          "Debugging & good practice",
        ],
      },
      {
        heading: "Hands-On & Applied",
        body: [
          "You learn by doing — writing and running code with a tutor who explains what each line does and why.",
          "We tailor sessions to your dataset, assignment or professional task so skills transfer immediately.",
        ],
      },
    ],
    whoFor: [
      "University students using R for coursework or dissertations",
      "Professionals adopting R for data analysis",
      "Anyone moving from spreadsheets to reproducible R workflows",
    ],
    faqs: [
      {
        question: "Do you teach R from the basics?",
        answer:
          "Yes. We teach R from fundamentals through to applied data analysis and visualisation, for UK, USA and worldwide learners.",
      },
      {
        question: "Can you help with my specific dataset or assignment?",
        answer:
          "Yes. Sessions are hands-on and tailored to your dataset, coursework or professional project.",
      },
      {
        question: "Do you cover statistics in R?",
        answer:
          "Yes — see our dedicated Statistics with R tutoring, which combines statistical methods with applied R.",
      },
    ],
    relatedLinks: [
      { label: "University & Professional (overview)", href: "/university-professional" },
      { label: "Statistics with R Tutor", href: "/statistics-with-r-tutor" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free R Programming Consultation",
    leadSubjectLabel: "Topic / Project",
    leadSubjectPlaceholder: "e.g. ggplot2, data wrangling",
  },
  {
    slug: "actuarial-science-tutor",
    vertical: "quant",
    metaTitle:
      "Actuarial Science Tutor | University & Professional",
    metaDescription:
      "Expert online actuarial science tutoring for UK, USA and worldwide students and candidates — probability, financial maths and models. Free consultation.",
    heroHeading: "Online Actuarial Science Tutor — University & Professional",
    heroSubheading:
      "Expert one-on-one online actuarial science tutoring for UK, USA and worldwide university students and exam candidates.",
    regionsServed: ["United Kingdom", "United States", "Global"],
    intro: [
      "Dr. Shreyank Educare provides expert online actuarial science tutoring for university students and professional exam candidates across the UK, USA and worldwide. We make the demanding quantitative core manageable and exam-ready.",
      "From the probability and financial mathematics underpinning the field to applied models, sessions are structured around your course or professional exam syllabus.",
    ],
    sections: [
      {
        heading: "Actuarial Topics We Tutor",
        points: [
          "Probability & statistics",
          "Financial mathematics",
          "Life contingencies",
          "Actuarial models",
          "Interest theory",
          "Exam problem technique",
        ],
      },
      {
        heading: "University & Exam Candidates",
        body: [
          "We support university actuarial students and candidates sitting professional exams, focusing on the problem types that appear under exam conditions.",
          "Plans map to your syllabus so every session builds toward your goal.",
        ],
      },
    ],
    whoFor: [
      "University actuarial science students",
      "Candidates preparing for professional actuarial exams",
      "Anyone needing rigorous, one-on-one quantitative support",
    ],
    faqs: [
      {
        question: "Do you tutor for professional actuarial exams?",
        answer:
          "Yes. We support candidates preparing for professional actuarial exams as well as university students, for UK, USA and worldwide learners. See also our actuarial exam prep page.",
      },
      {
        question: "Which actuarial topics do you cover?",
        answer:
          "Probability and statistics, financial mathematics, interest theory, life contingencies and actuarial models, with exam-focused problem practice.",
      },
      {
        question: "Are sessions online and one-on-one?",
        answer:
          "Yes. All actuarial tutoring is live, online and one-on-one, scheduled around you.",
      },
    ],
    relatedLinks: [
      { label: "University & Professional (overview)", href: "/university-professional" },
      { label: "Actuarial Exam Prep", href: "/actuarial-exam-tutor-online" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Actuarial Science Consultation",
    leadSubjectLabel: "Topic / Exam",
    leadSubjectPlaceholder: "e.g. Financial maths, Models",
  },
  {
    slug: "statistics-with-r-tutor",
    vertical: "quant",
    metaTitle:
      "Statistics with R Tutor | University & Professional",
    metaDescription:
      "Expert online 'Statistics with R' tutoring for UK, USA and worldwide students and professionals — applied statistics using R. One-on-one. Free consultation.",
    heroHeading: "Statistics with R Tutor — University & Professional",
    heroSubheading:
      "Expert one-on-one online tutoring that combines statistical methods with hands-on R, for UK, USA and worldwide university students and professionals.",
    regionsServed: ["United Kingdom", "United States", "Global"],
    intro: [
      "Dr. Shreyank Educare offers expert online 'Statistics with R' tutoring for university students and professionals across the UK, USA and worldwide — the sweet spot where statistical theory meets practical computing.",
      "You learn the methods and how to implement them in R, so you can run, interpret and report analyses correctly for coursework or professional work.",
    ],
    sections: [
      {
        heading: "What We Cover",
        points: [
          "Descriptive & inferential statistics in R",
          "Regression & modelling with R",
          "Data wrangling (tidyverse)",
          "Visualisation (ggplot2)",
          "Hypothesis testing in R",
          "Reproducible analysis (R Markdown)",
        ],
      },
      {
        heading: "Theory Plus Practice",
        body: [
          "Each session pairs the statistical concept with its R implementation, so you understand both the 'why' and the 'how'.",
          "We work on your dataset or assignment wherever possible for immediate transfer.",
        ],
      },
    ],
    whoFor: [
      "University students taking statistics courses that use R",
      "Postgraduates running analyses for dissertations",
      "Professionals needing applied statistics in R",
    ],
    faqs: [
      {
        question: "What is 'Statistics with R' tutoring?",
        answer:
          "It combines statistical methods with hands-on R implementation — you learn the theory and how to run and interpret the analysis in R.",
      },
      {
        question: "Can you use my own dataset?",
        answer:
          "Yes. Wherever possible we work on your dataset or assignment so the skills transfer directly to your coursework or job.",
      },
      {
        question: "Do I need prior R experience?",
        answer:
          "No. We can start from R basics or pick up from wherever you are, for UK, USA and worldwide learners.",
      },
    ],
    relatedLinks: [
      { label: "University & Professional (overview)", href: "/university-professional" },
      { label: "Statistics Tutor", href: "/online-statistics-tutor" },
      { label: "R Programming Tutor", href: "/r-programming-tutor" },
    ],
    leadHeading: "Book a Free Statistics with R Consultation",
    leadSubjectLabel: "Topic / Course",
    leadSubjectPlaceholder: "e.g. Regression in R, ggplot2",
  },
  {
    slug: "actuarial-exam-tutor-online",
    vertical: "quant",
    metaTitle:
      "Actuarial Exam Tutor | University & Professional",
    metaDescription:
      "Expert online actuarial exam tutoring worldwide — structured, problem-focused preparation for professional actuarial exams. Free consultation.",
    heroHeading: "Online Actuarial Exam Tutor — University & Professional",
    heroSubheading:
      "Expert one-on-one online preparation for professional actuarial exams, for UK, USA and worldwide candidates — structured around your exam and timeline.",
    regionsServed: ["United Kingdom", "United States", "Global"],
    intro: [
      "Dr. Shreyank Educare helps actuarial exam candidates across the UK, USA and worldwide prepare with expert, one-on-one online tutoring. We focus relentlessly on the problem types and techniques that appear under exam conditions.",
      "Sessions are structured around your specific exam and study timeline, turning a heavy syllabus into a focused, high-yield plan.",
    ],
    sections: [
      {
        heading: "How We Prepare You",
        points: [
          "Syllabus-focused topic review",
          "Exam-style problem practice",
          "Timed technique & strategy",
          "Weak-area remediation",
          "Past-paper walkthroughs",
          "Final revision plan",
        ],
      },
      {
        heading: "Built Around Your Exam",
        body: [
          "We map a week-by-week plan to your exam date and adapt it as your practice scores improve.",
          "Emphasis is on reproducible problem-solving technique, not memorisation.",
        ],
      },
    ],
    whoFor: [
      "Candidates preparing for professional actuarial exams",
      "University students sitting exemption exams",
      "Anyone needing structured, exam-focused actuarial preparation",
    ],
    faqs: [
      {
        question: "Do you prepare candidates for professional actuarial exams?",
        answer:
          "Yes. We provide structured, problem-focused preparation for professional actuarial exams for UK, USA and worldwide candidates.",
      },
      {
        question: "How is the preparation structured?",
        answer:
          "We build a week-by-week plan to your exam date with topic review, exam-style problems, past-paper practice and timed technique.",
      },
      {
        question: "Is it online and one-on-one?",
        answer:
          "Yes. All actuarial exam tutoring is live, online and one-on-one, scheduled around you.",
      },
    ],
    relatedLinks: [
      { label: "University & Professional (overview)", href: "/university-professional" },
      { label: "Actuarial Science Tutor", href: "/actuarial-science-tutor" },
      { label: "Book a Free Consultation", href: "/contact" },
    ],
    leadHeading: "Book a Free Actuarial Exam Consultation",
    leadSubjectLabel: "Exam",
    leadSubjectPlaceholder: "e.g. professional actuarial exam",
  },
];

export const getVerticalPageBySlug = (slug: string): VerticalPage | undefined =>
  verticalPages.find((p) => p.slug === slug);
