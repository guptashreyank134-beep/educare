import type { SeoPage } from "./seoPages";

/**
 * Carefully differentiated Vancouver pages. These are kept together so the
 * subject intent, local-service wording and cross-links can be reviewed as one
 * cluster instead of drifting into doorway-style city swaps.
 */
export const vancouverSeoPages: SeoPage[] = [
  {
    slug: "tutoring-vancouver",
    cluster: "Core Local",
    location: "Vancouver",
    metaTitle: "Tutoring Vancouver | Math & Science, Grades 6–University",
    metaDescription:
      "PhD-led tutoring for Vancouver students in math, physics, chemistry, biology and coding. Online across Vancouver or in person in Burnaby.",
    h1: "Tutoring in Vancouver for Math, Science and Coding",
    heroSubheading:
      "Understanding-first support for Vancouver students in Grades 6–12 and university—online across the city, with in-person tutoring at our Burnaby studio.",
    intro: [
      "Dr. Shreyank Educare is a Burnaby-based tutoring service supporting Vancouver students through live online lessons and in-person appointments at our Burnaby studio. We do not claim a Vancouver office: families who choose face-to-face tutoring travel to our Madison Avenue location, while online sessions are available across UBC, Downtown Vancouver, Kitsilano, Kerrisdale, Dunbar, East Vancouver and surrounding communities.",
      "Our teaching is PhD-led and understanding-first. A tutor begins by locating the step where the reasoning breaks down, then rebuilds the concept and practises it in the format the student meets at school or university. That approach applies across the BC curriculum, AP and IB programmes, and selected UBC and SFU coursework.",
    ],
    sections: [
      {
        heading: "Subjects and Levels We Tutor",
        points: [
          "Mathematics, Pre-Calculus and Calculus",
          "Physics 11–12, AP/IB Physics and first-year university physics",
          "Chemistry 11–12, AP/IB Chemistry and university chemistry",
          "Biology 11–12, AP/IB Biology and university biology",
          "Computer science, Python and web development",
          "Grades 6–12, AP, IB and selected UBC/SFU courses",
        ],
      },
      {
        heading: "Online Vancouver Tutoring or In-Person in Burnaby",
        body: [
          "Online tutoring is usually the simplest option for Vancouver families: the student can share current worksheets, course notes and practice tests without crossing the city. A shared whiteboard lets the tutor see each step rather than only the final answer.",
          "Students who learn better beside a tutor can attend in person at our Burnaby studio. The same diagnostic teaching method is used in both formats; the practical difference is travel, screen preference and how independently the student works.",
        ],
      },
      {
        heading: "BC Curriculum, AP, IB and University Support",
        body: [
          "Secondary-school sessions follow the student’s actual BC, AP or IB course rather than a generic worksheet sequence. We use current class material to identify prerequisite gaps, explain the underlying idea and prepare for the assessment style the course requires.",
          "University support is available where it matches our subject expertise, including common first-year mathematics and science courses at UBC and SFU. Students remain responsible for their own assessed work; tutoring explains methods and develops independent problem-solving.",
        ],
      },
      {
        heading: "What Happens in the Free Assessment Session",
        body: [
          "The free 30-minute assessment is a planning conversation, not a teaching lesson. We discuss the course, current concerns, recent assessment patterns, preferred format and schedule, then recommend an appropriate starting point without guaranteeing a particular grade.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where is Dr. Shreyank Educare located?",
        answer:
          "The tutoring studio is at 2088 Madison Avenue in Burnaby. Vancouver students can learn online or travel to the Burnaby studio for an in-person appointment; there is no separate Vancouver office.",
      },
      {
        question: "Which Vancouver students can use online tutoring?",
        answer:
          "Online sessions are available across Vancouver, including UBC, Downtown, Kitsilano, Kerrisdale, Dunbar and East Vancouver, as well as West Vancouver. Availability depends on subject, level and scheduling.",
      },
      {
        question: "Which grades and subjects do you support?",
        answer:
          "We support Grades 6–12 and university students in mathematics, physics, chemistry, biology and coding, including relevant BC curriculum, AP and IB courses.",
      },
      {
        question: "Can you help UBC and SFU students?",
        answer:
          "Yes, for selected mathematics, physics, chemistry, biology and computing coursework that matches our tutors’ expertise. We confirm the exact course before recommending a tutor.",
      },
      {
        question: "Is the free assessment a free tutoring lesson?",
        answer:
          "No. It is a free 30-minute planning and needs-assessment conversation. We review the student’s goals and recommend next steps; no grade outcome is promised.",
      },
    ],
    related: [
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      { label: "Physics Tutor in Vancouver", href: "/physics-tutor-vancouver" },
      { label: "Biology Tutor in Vancouver", href: "/biology-tutor-vancouver" },
      { label: "IB Chemistry Tutor in Vancouver", href: "/ib-chemistry-tutor-vancouver" },
      { label: "In-Person Tutoring in Burnaby", href: "/tutoring-burnaby" },
      { label: "Vancouver Tutoring Guide", href: "/blog/tutoring-vancouver-phd-led-concept-gaps" },
    ],
  },
  {
    slug: "ap-calculus-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "AP Calculus Tutor Vancouver | AB & BC Exam Support",
    metaDescription:
      "AP Calculus AB and BC tutoring for Vancouver students. Limits, derivatives, integrals, series and exam preparation, online or in Burnaby.",
    h1: "AP Calculus Tutor in Vancouver for AB and BC",
    heroSubheading:
      "One-to-one AP Calculus AB and BC support for Vancouver students, focused on conceptual understanding, clear written work and exam-format practice.",
    intro: [
      "AP Calculus moves quickly because every unit depends on the one before it. A weak grasp of limits appears again in derivative definitions; uncertain algebra later obstructs integration and differential equations. Our Vancouver AP Calculus tutoring begins by diagnosing that dependency chain instead of assigning more questions at random.",
      "Vancouver students can meet online from anywhere in the city or attend in person at our Burnaby studio. Sessions follow the student’s AP Calculus AB or BC course and use representative multiple-choice and free-response tasks without promising a particular score.",
    ],
    sections: [
      {
        heading: "AP Calculus AB and BC Topics",
        points: [
          "Limits, continuity and asymptotic behaviour",
          "Derivative rules and applications",
          "Related rates and optimization",
          "Definite integrals and the Fundamental Theorem",
          "Differential equations and slope fields",
          "Parametric, polar and series topics for BC",
        ],
      },
      {
        heading: "AP Exam Preparation That Shows the Reasoning",
        body: [
          "Students practise choosing a method before calculating, communicating enough work to earn available marks, checking whether an answer is reasonable and managing time across calculator and non-calculator sections.",
          "BC students also work on convergence tests, Taylor and Maclaurin series, and parametric or polar reasoning. AB students use the same time to deepen the core limits, differentiation, integration and differential-equation skills.",
        ],
      },
      {
        heading: "For Vancouver Secondary and University-Bound Students",
        body: [
          "Support is available to students across UBC, Kitsilano, Kerrisdale, Dunbar, Downtown and East Vancouver online, with face-to-face appointments in Burnaby. We can also help students connect AP Calculus methods to the expectations of first-year calculus, while keeping the immediate course and exam as the priority.",
        ],
      },
      {
        heading: "Free AP Calculus Assessment Session",
        body: [
          "The free 30-minute assessment reviews the course level, exam date and recurring error patterns. It is a planning conversation rather than a free lesson, and it ends with an honest recommendation for next steps.",
        ],
      },
    ],
    faqs: [
      { question: "Do you tutor both AP Calculus AB and BC?", answer: "Yes. We support AB and BC, including BC-only topics such as series, parametric equations and polar calculus." },
      { question: "Can you help with AP free-response questions?", answer: "Yes. Sessions include method selection, written justification, calculator use and timed practice with AP-style free-response questions." },
      { question: "Do you teach limits, derivatives and integrals?", answer: "Yes. These are the core of both courses, along with applications, differential equations and the Fundamental Theorem of Calculus." },
      { question: "Is tutoring available in Vancouver?", answer: "Online tutoring is available across Vancouver. In-person appointments take place at our Burnaby studio; we do not operate a separate Vancouver office." },
      { question: "When should AP Calculus exam preparation begin?", answer: "The right start depends on the student’s current gaps and exam date. The free assessment identifies priorities and a realistic study sequence." },
    ],
    related: [
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      { label: "AP & IB Tutoring", href: "/programs/ib-ap-tutoring" },
      { label: "Pre-Calculus Tutoring", href: "/programs/pre-calculus" },
      { label: "University Mathematics", href: "/programs/university-mathematics" },
      { label: "AP Calculus Exam Guide", href: "/blog/ap-calculus-tutor-vancouver-ab-bc-exam-prep" },
    ],
  },
  {
    slug: "ib-chemistry-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "IB Chemistry Tutor Vancouver | SL, HL & IA Guidance",
    metaDescription:
      "IB Chemistry SL and HL tutoring for Vancouver students: core concepts, laboratory reasoning, IA guidance and exam preparation online or in Burnaby.",
    h1: "IB Chemistry Tutor in Vancouver for SL and HL",
    heroSubheading:
      "Concept-led IB Chemistry support for Vancouver students, including SL and HL content, laboratory reasoning, ethical IA guidance and exam preparation.",
    intro: [
      "IB Chemistry combines a broad syllabus with precise assessment language. Students may understand a reaction yet lose marks because they have not connected particulate reasoning, equations, data and the command term in the question. Our Vancouver IB Chemistry tutoring makes those connections explicit.",
      "Lessons are available online across Vancouver or in person at our Burnaby studio. We work from the student’s current SL or HL course, recent assessments and laboratory work, teaching the method without completing assessed work on the student’s behalf.",
    ],
    sections: [
      {
        heading: "IB Chemistry SL and HL Coverage",
        points: [
          "Atomic structure, periodicity and bonding",
          "Stoichiometry and quantitative chemistry",
          "Energetics, kinetics and equilibrium",
          "Acids, bases and redox chemistry",
          "Organic chemistry and spectroscopy",
          "Data analysis and practical chemistry",
        ],
      },
      {
        heading: "Laboratory and Internal Assessment Guidance",
        body: [
          "We can explain experimental design, variables, uncertainty, graphing, evaluation and how to interpret results. For the Internal Assessment, guidance remains educational and ethical: the student chooses, performs and writes their own investigation, while the tutor teaches the scientific reasoning and helps them understand feedback.",
        ],
      },
      {
        heading: "IB Chemistry Exam Preparation",
        body: [
          "Preparation includes topic diagnosis, multi-step calculations, data-based questions, command terms and timed practice. HL students receive the additional depth their course requires rather than an SL explanation with extra vocabulary attached.",
        ],
      },
      {
        heading: "Vancouver Online Access, Burnaby In-Person Option",
        body: [
          "Students in UBC, Kitsilano, Kerrisdale, Dunbar, Downtown and East Vancouver can learn online. In-person tutoring is available at the Burnaby studio, not at a claimed Vancouver office.",
        ],
      },
    ],
    faqs: [
      { question: "Do you tutor both IB Chemistry SL and HL?", answer: "Yes. Sessions are matched to the student’s SL or HL syllabus and current school sequence." },
      { question: "Can you help with the IB Chemistry Internal Assessment?", answer: "We provide ethical guidance on scientific method, data analysis, uncertainty and understanding teacher feedback. We do not write or complete assessed work for students." },
      { question: "Do you support laboratory skills?", answer: "Yes. We teach experimental design, variables, uncertainty, data presentation and evaluation using the student’s course expectations." },
      { question: "Can tutoring prepare me for IB Chemistry exams?", answer: "Yes. We diagnose topic gaps and practise calculations, data-based questions, command terms and timed exam technique." },
      { question: "Where do Vancouver students attend?", answer: "Most Vancouver students meet online. In-person appointments are available at the Burnaby studio at 2088 Madison Avenue." },
    ],
    related: [
      { label: "Chemistry Tutoring", href: "/programs/chemistry" },
      { label: "AP & IB Tutoring", href: "/programs/ib-ap-tutoring" },
      { label: "Physics Tutor in Vancouver", href: "/physics-tutor-vancouver" },
      { label: "Biology Tutor in Vancouver", href: "/biology-tutor-vancouver" },
      { label: "Chemistry Concept-Gap Guide", href: "/blog/chemistry-11-12-tutoring-burnaby-concept-gaps" },
    ],
  },
  {
    slug: "physics-tutor-vancouver",
    cluster: "Core Local",
    location: "Vancouver",
    metaTitle: "Physics Tutor Vancouver | Physics 11–12, AP, IB & UBC",
    metaDescription:
      "Physics tutoring for Vancouver students in Physics 11–12, AP, IB and selected UBC/SFU courses. Online across Vancouver or in person in Burnaby.",
    h1: "Physics Tutor in Vancouver for School and University",
    heroSubheading:
      "Understanding-first Physics 11–12, AP, IB and university support for Vancouver students, online across the city or in person in Burnaby.",
    intro: [
      "Physics becomes difficult when a student collects formulas without a model of what the system is doing. Our Vancouver physics tutoring starts with the diagram, assumptions and governing principle, then connects those ideas to equations and units. That makes the method reusable when the wording changes.",
      "We support BC Physics 11 and 12, AP Physics, IB Physics and selected first-year UBC and SFU physics courses. Online sessions are available across Vancouver; in-person tutoring takes place at our Burnaby studio.",
    ],
    sections: [
      {
        heading: "Physics Courses and Topics",
        points: [
          "BC Physics 11 and Physics 12",
          "Kinematics, forces, energy and momentum",
          "Circular motion, gravitation and waves",
          "Electric fields, circuits and magnetism",
          "AP Physics 1, 2 and C",
          "IB Physics SL/HL and selected first-year university physics",
        ],
      },
      {
        heading: "Concept-Gap Diagnosis Before More Practice",
        body: [
          "A missed question may come from algebra, vectors, diagramming, sign conventions, units or the physical concept itself. We identify which layer is failing before assigning practice, because repeating questions cannot repair an unidentified prerequisite gap.",
          "Students learn to state the system, sketch the situation, choose a principle and check dimensions before trusting an answer. This is the same habit that supports mechanics, electricity and first-year university problem solving.",
        ],
      },
      {
        heading: "UBC and SFU First-Year Physics Support",
        body: [
          "Where the course matches our expertise, we support first-year mechanics, electricity and magnetism, waves and the calculus or vector reasoning used within them. Sessions work from the student’s syllabus and practice material while preserving academic integrity.",
        ],
      },
      {
        heading: "Online Vancouver Tutoring and In-Person Burnaby Sessions",
        body: [
          "Online tutoring is available to students around UBC, Downtown Vancouver, Kitsilano, Kerrisdale, Dunbar and East Vancouver. Students who prefer face-to-face support can travel to the Burnaby studio; Dr. Shreyank Educare remains accurately represented as a Burnaby-based business.",
        ],
      },
    ],
    faqs: [
      { question: "Do you tutor BC Physics 11 and Physics 12?", answer: "Yes. We support the BC curriculum in mechanics, waves, electricity and related problem-solving skills." },
      { question: "Do you teach AP Physics and IB Physics?", answer: "Yes. AP Physics 1, 2 and C and IB Physics SL/HL are supported, subject to tutor availability and the student’s exact course." },
      { question: "Can you help with UBC or SFU physics?", answer: "We support selected first-year UBC and SFU physics courses, including common mechanics and electricity topics. We confirm the course before recommending a tutor." },
      { question: "How do you diagnose a physics concept gap?", answer: "We examine diagrams, assumptions, algebra, vectors, units and principle selection to locate the first step that is not secure, then rebuild from there." },
      { question: "Is in-person physics tutoring available in Vancouver?", answer: "The business has no Vancouver office. Vancouver students can learn online or attend an in-person appointment at the Burnaby studio." },
    ],
    related: [
      { label: "Physics Tutoring Programme", href: "/programs/physics" },
      { label: "University Physics", href: "/programs/university-physics" },
      { label: "AP Physics Tutor in Vancouver", href: "/ap-physics-tutor-vancouver" },
      { label: "IB Physics Tutor in Vancouver", href: "/ib-physics-tutor-vancouver" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      { label: "University Physics Guide", href: "/blog/university-physics-tutoring-in-vancouver-and-burnaby" },
    ],
  },
  {
    slug: "biology-tutor-vancouver",
    cluster: "Core Local",
    location: "Vancouver",
    metaTitle: "Biology Tutor Vancouver | Grades 11–12, AP, IB & UBC",
    metaDescription:
      "Biology tutoring for Vancouver students in Biology 11–12, AP, IB and selected university courses. Online across Vancouver or in person in Burnaby.",
    h1: "Biology Tutor in Vancouver for School and University",
    heroSubheading:
      "Structured Biology 11–12, AP, IB and university support for Vancouver students, connecting mechanisms, evidence and exam-ready explanations.",
    intro: [
      "Biology is often taught as a large vocabulary list, but strong answers depend on mechanisms: what changes, why it changes and how one process affects the next. Our Vancouver biology tutoring organizes the detail around those causal links so students can explain unfamiliar questions instead of relying on recall alone.",
      "Support is available for BC Biology and Life Sciences courses, AP Biology, IB Biology and selected university coursework. Vancouver students can meet online, while in-person tutoring is offered at our Burnaby studio.",
    ],
    sections: [
      {
        heading: "Biology Courses and Topics",
        points: [
          "BC Life Sciences 11 and Anatomy & Physiology 12",
          "Cell structure, membranes and metabolism",
          "Molecular biology and genetics",
          "Evolution, ecology and biotechnology",
          "Human physiology and homeostasis",
          "AP Biology, IB Biology and selected university biology",
        ],
      },
      {
        heading: "From Memorising Terms to Explaining Mechanisms",
        body: [
          "Sessions use diagrams, sequences and comparison tables to show how structures support functions. Students then practise turning that understanding into concise written answers, data interpretation and exam responses.",
          "When a topic is weak, we trace it to the prerequisite—such as chemistry behind respiration or cell division behind genetics—rather than treating every missed fact as an isolated memory problem.",
        ],
      },
      {
        heading: "AP, IB and University Biology Support",
        body: [
          "AP and IB students receive course-specific support with experimental reasoning, data analysis, extended responses and exam preparation. For selected UBC and SFU courses, tutoring can cover foundational cell biology, genetics, molecular biology and physiology where they match tutor expertise.",
          "Tutors explain concepts and research methods but do not produce laboratory reports, Internal Assessments or other submitted work for students.",
        ],
      },
      {
        heading: "Vancouver Access Without a False Vancouver Office",
        body: [
          "Online biology tutoring is available across Vancouver, including UBC, Downtown, Kitsilano, Kerrisdale, Dunbar and East Vancouver. In-person appointments are held only at the Burnaby studio.",
        ],
      },
    ],
    faqs: [
      { question: "Which BC biology courses do you tutor?", answer: "We support relevant secondary biology courses including Life Sciences 11 and Anatomy and Physiology 12, subject to current tutor availability." },
      { question: "Do you tutor AP Biology and IB Biology?", answer: "Yes. We support AP Biology and IB Biology with concept review, experimental reasoning, data analysis and exam preparation." },
      { question: "Can you help with university biology?", answer: "We support selected university biology topics such as cell biology, genetics, molecular biology and physiology. We confirm the exact UBC, SFU or other course before recommending a tutor." },
      { question: "Can a tutor write my lab report or IA?", answer: "No. We teach the science, experimental reasoning, analysis and interpretation, but the student must produce and submit their own assessed work." },
      { question: "Where is in-person biology tutoring held?", answer: "In-person sessions are held at the Burnaby studio. Vancouver students can also learn online from anywhere in the city." },
    ],
    related: [
      { label: "Biology Tutoring Programme", href: "/programs/biology" },
      { label: "University Biology", href: "/programs/university-biology" },
      { label: "IB Chemistry Tutor in Vancouver", href: "/ib-chemistry-tutor-vancouver" },
      { label: "Physics Tutor in Vancouver", href: "/physics-tutor-vancouver" },
      { label: "Cell Biology Guide", href: "/blog/biology-cell-biology" },
      { label: "Genetics and Evolution Guide", href: "/blog/biology-genetics-evolution" },
    ],
  },
];
