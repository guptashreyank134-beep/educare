/** @format */

export interface Program {
  title: string;
  coreTargets: string[];
  idealFor: string;
  expectedOutcome: string;
  learnMoreHref?: string;
  slug?: string;
}

export interface ProgramTab {
  label: string;
  programs: Program[];
}

export const programTabs: ProgramTab[] = [
  {
    label: "Academic Subjects",
    programs: [
      {
        title: "Mathematics Tutoring",
        coreTargets: [
          "Algebra & functions",
          "Calculus, Limits & Derivatives",
          "Trigonometry & Coordinate Geometry",
        ],
        idealFor:
          "Students preparing for school exams and competitive entrance tests requiring strong analytical thinking.",
        expectedOutcome: "Stronger conceptual understanding, improved problem-solving skills and greater confidence across school and university mathematics.",
        learnMoreHref: "/programs/mathematics",
      },
      {
        title: "Physics Tutoring",
        coreTargets: [
          "High-school physics",
          "Physics and the underlying math",
          "University level physics",
        ],
        idealFor: "High-school and university students",
        expectedOutcome:
          "Clear conceptual understanding and the ability to solve complex problems.",
        learnMoreHref: "/programs/physics",
      },
      {
        title: "Chemistry Tutoring",
        slug: "chemistry",
        coreTargets: [
          "Organic Chemistry",
          "Physical Chemistry",
          "Chemical Reactions & Bonding",
        ],
        idealFor:
          "School students and aspirants preparing for competitive academic exams.",
        expectedOutcome:
          "Improved conceptual clarity, better retention, and higher accuracy in problem-solving and theory.",
        learnMoreHref: "/programs/chemistry",
      },
      {
        title: "Biology Tutoring",
        coreTargets: [
          "Human Physiology",
          "Genetics & Evolution",
          "Cell Biology",
        ],
        idealFor:
          "Students aiming for strong performance in school exams and medical entrance preparation.",
        expectedOutcome:
          "Faster recall, deeper understanding, and improved performance in theory-based exams.",
        learnMoreHref: "/programs/biology",
      },
      {
        title: "Computer Science Tutoring",
        coreTargets: [
          "Programming Basics",
          "Logic Building",
          "Data Structures (Intro)",
        ],
        idealFor:
          "School and beginner-level students interested in coding and computational thinking.",
        expectedOutcome:
          "Strong logical foundation and the ability to write and understand structured code.",
        learnMoreHref: "/programs/computer-science",
      },
      {
        title: "Finance Tutoring",
        coreTargets: [
          "Financial Basics",
          "Business Concepts",
          "Practical Application",
        ],
        idealFor:
          "Commerce students and beginners looking to understand real-world financial systems.",
        expectedOutcome:
          "Clear understanding of financial principles with practical, applicable knowledge.",
        learnMoreHref: "/programs/university-finance",
      },
    ],
  },
  {
    label: "Coding & Tech",
    programs: [
      {
        title: "Python",
        coreTargets: [
          "Variables and data types",
          "Loops and conditionals",
          "Functions & logic building",
          "Basic syntax and structure",
        ],
        idealFor: "Beginners and students starting their coding journey.",
        expectedOutcome:
          "Ability to write functional programs and build a strong foundation.",
        learnMoreHref: "/programs/python",
      },
      {
        title: "JavaScript",
        coreTargets: [
          "Variables and data types",
          "Functions and  events",
          "Loops and conditionals",
          "DOM (Document Object Model) manipulation",
        ],
        idealFor:
          "Students aiming to build structured programming knowledge for academics or development.",
        expectedOutcome:
          "Clear OOP concepts & ability to develop structured applications.",
        learnMoreHref: "/programs/javascript",
      },
      {
        title: "Web Development",
        coreTargets: [
          "Frontend Development (HTML, CSS, JavaScript, React)",
          "Backend Development (Node.js, Express.js)",
          "Database Management (MongoDB, Firebase)",
          "API Development & Integration",
        ],
        idealFor:
          "Beginners interested in building websites and learning front-end development.",
        expectedOutcome:
          "Design and build functional, responsive websites from scratch.",
        learnMoreHref: "/programs/web-development",
      },
    ],
  },
  {
    label: "Test Preparations",
    programs: [
      {
        title: "SAT/PSAT",
        coreTargets: [
          "Mathematics",
          "Evidence-Based RW",
          "Test-taking hacks",
        ],
        idealFor: "Students preparing for SAT/PSAT",
        expectedOutcome:
          "Targeted SAT math practice — accuracy, timing and test strategy",
        learnMoreHref: "/programs/sat-prep",
      },
      {
        title: "MCAT",
        coreTargets: [
          "CARS drills",
          "Biology/Biochemistry",
          "Chemistry/Physics, Psych/Soc",
        ],
        idealFor: "Students preparing for MCAT",
        expectedOutcome: "510+ pts target score",
        learnMoreHref: "/programs/mcat-prep",
      },
      {
        title: "GRE",
        coreTargets: [
          "Quant shortcuts",
          "Verbal vocab systems",
          "AWA essays",
        ],
        idealFor: "Students preparing for GRE",
        expectedOutcome:
          "A standout GRE score 320+ that can serve as powerful evidence",
        learnMoreHref: "/programs/gre-prep",
      },
      {
        title: "GMAT/GRE Focus",
        coreTargets: [
          "Data Insights",
          "Verbal & Quant",
          "IR mini-mocks",
        ],
        idealFor: "Students preparing for GMAT/GRE",
        expectedOutcome: "675+ / 325+ pts target score",
        learnMoreHref: "/programs/gmat-prep",
      },
    ],
  },
  {
    label: "University Courses",
    programs: [
      {
        title: "Mathematics - College/ University",
        coreTargets: [
          "Statistics UBC: STAT 200, 203 and 251",
          "Statistics Langara: STAT 1123, 1124 and 1181",
          "Linear Systems (Engineering Linear Algebra) UBC: MATH 152",
          "Linear Algebra Langara: MATH 2362",
        ],
        idealFor: "College/University students",
        expectedOutcome:
          "Better conceptual clarity & performance in university-level exams.",
        learnMoreHref: "/programs/university-mathematics",
      },
      {
        title: "Physics - College/ University",
        coreTargets: [
          "UBC: PHYS 100, 101, 107, 108, 117, 118, 170",
          "Langara College: PHYS 1101, 1114, 1118, 1125, 1225",
        ],
        idealFor: "College/University students",
        expectedOutcome:
          "Clear conceptual understanding of subjects and core",
        learnMoreHref: "/programs/university-physics",
      },
      {
        title: "Chemistry - College/ University",
        coreTargets: [
          "UBC: CHEM 111, 121, 123",
          "Langara College: CHEM 1114, 1118, 1120, 1220",
        ],
        idealFor: "College/University students",
        expectedOutcome:
          "Clear conceptual understanding of subjects and core",
        learnMoreHref: "/programs/university-chemistry",
      },
      {
        title: "Biology - College/ University",
        coreTargets: [
          "General Biology",
          "Molecular Biology",
          "Anatomy and Physiology",
        ],
        idealFor: "College/University students",
        expectedOutcome:
          "Clear conceptual understanding of subjects and core",
        learnMoreHref: "/programs/university-biology",
      },
      {
        title: "Finance",
        coreTargets: [
          "BCom, MBA",
          "MSc, Phd",
          "CFA, CSC, IFC",
        ],
        idealFor:
          "Pursuing a BCom, MBA, MSc, or PhD, or preparing for prestigious certifications such as CFA, CSC, or IFC.",
        expectedOutcome:
          "Master both fundamental and advanced finance concepts",
        learnMoreHref: "/programs/university-finance",
      },
    ],
  },
  {
    label: "Extra Curricular",
    programs: [
      {
        title: "Language Lessons Mandarin",
        coreTargets: [
          "Conversational Mandarin & Pronunciation",
          "Reading, Writing & Vocabulary Building",
          "Grammar, Listening & Cultural Understanding",
        ],
        idealFor:
          "Students, professionals, and language learners looking to build practical Mandarin communication skills for academics, travel, career opportunities, or personal growth.",
        expectedOutcome:
          "Improved speaking confidence, stronger reading and writing skills, and practical fluency for real-world communication.",
        learnMoreHref: "/programs/mandarin",
      },
      {
        title: "Language Lessons French",
        coreTargets: [
          "Conversational French & Pronunciation",
          "Grammar, Vocabulary & Sentence Formation",
          "Reading, Writing & Listening Practice",
        ],
        idealFor:
          "Students preparing for school curriculum, professionals seeking language skills, and learners interested in travel, immigration, or personal development.",
        expectedOutcome:
          "Enhanced communication skills, language proficiency, improved confidence in academic or everyday French conversations.",
        learnMoreHref: "/programs/french",
      },
    ],
  },
];
