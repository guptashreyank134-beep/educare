// FAQ Data
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Who are our tutors?",
    answer:
      "Our tutors are experienced educators with strong academic backgrounds and proven teaching expertise. They specialize in various subjects including Mathematics, Physics, Chemistry, Biology, and more. Each tutor is carefully selected and trained to provide personalized, high-quality instruction tailored to student needs.",
  },
  {
    id: 2,
    question:
      "When I come for a drop-in session, can I work on multiple subjects, or is there a fee for additional subjects?",
    answer:
      "During drop-in sessions, you can work on multiple subjects without additional fees. Our tutors are flexible and can help you across different topics within a single session. We encourage you to bring any questions or topics you'd like to cover.",
  },
  {
    id: 3,
    question:
      "If I want to try a drop-in program, do I need to book an appointment, or can I just drop in?",
    answer:
      "For drop-in programs, you don't need to book an appointment in advance. Simply visit us during our operating hours and a tutor will be available to assist you. However, we recommend calling ahead during peak hours to ensure availability.",
  },
  {
    id: 4,
    question:
      "Is there a contract that I need to sign, or a minimum monthly spend?",
    answer:
      "We believe in flexibility. There are no long-term contracts required, and no minimum monthly spend. You can choose the programs and sessions that work best for you and adjust as needed.",
  },
  {
    id: 5,
    question: "How does payment work?",
    answer:
      "Payments are flexible and transparent. We accept various payment methods including credit cards, debit cards, and bank transfers. Pricing varies by program type and session length. You'll receive a clear invoice for each transaction with no hidden fees.",
  },
  {
    id: 6,
    question: "What age groups do you work with?",
    answer:
      "We work with students of all ages, from elementary school through college and professional levels. Our tutors tailor their teaching approach to match the developmental stage and learning needs of each student.",
  },
];

// Demo Videos Data
export interface VideoCategoryItem {
  title: string;
  description: string;
}

interface learningPointerType {
    heading: string;
    pointers: string[];
}

export interface DemoVideoItem {
  imageUrl: string;
  imageAlt: string;
  learningPoints: learningPointerType;
  heading: string;
  description: string;
  categories: VideoCategoryItem[];
}

export const demoVideoData: DemoVideoItem = {
  imageUrl: "/assets/resources/demoVideo.webp",
  imageAlt: "Demo videos preview",
  learningPoints: {
    heading: "What You’ll Learn From These Videos",
    pointers:[
    "Learn how we make complex topics easier",
    "Understand our teaching methodology",
    "Experience our step-by-step explanations",
    "See how personalized tutoring works",
  ]
  },
  heading: "See How Our Teaching Works In Real Time, With Our Demo Videos",
  description:
    "At Dr. Shreyank Educare, we believe that seeing the teaching process helps students and parents make confident decisions. Our demo videos showcase how we simplify difficult concepts through interactive teaching and personalized instruction.",
  categories: [
    {
      title: "Mathematics Tutorials",
      description:
        "\nFrom algebra fundamentals to calculus problem-solving, explore how we break down complex math concepts step-by-step.",
    },
    {
      title: "Science Lessons",
      description:
        "\nWatch physics, chemistry, and biology sessions that simplify formulas, theories, and applications through visual teaching methods.",
    },
    {
      title: "Test Preparation Sessions",
      description:
        "\nSee how our tutors help students prepare for competitive exams with strategy-based learning and structured practice.",
    },
    {
      title: "Coding Demonstrations",
      description:
        "\nExplore beginner-friendly coding sessions covering programming logic, development fundamentals, and project learning.",
    },
  ],
};

// Practice Material Data
export interface StudyTipItem {
  title: string;
  description: string;
}

export interface PracticeMaterialItem {
  label: string;
}

export interface PracticeMaterialSectionData {
  imageUrl: string;
  imageAlt: string;
  downloadMaterials: PracticeMaterialItem[];
  heading: string;
  description: string;
  studyTips: StudyTipItem[];
  whyPraticeHelp: {
    heading: string;
    icon: string;
    pointers?: string[];
  };
}

export const practiceMaterialData: PracticeMaterialSectionData = {
  imageUrl: "/assets/resources/practiceMaterial.webp",
  imageAlt: "Practice material preview",
  downloadMaterials: [
    {
      label: "Algebra Topics Practice Problems",
    },
    {
      label: "Number System Notes",
    },
    {
      label: "Algebra Topics",
    },
    {
      label: "Number System Practice Problems",
    },
  ],
  heading: "Study Resources That Help You Practice With Confidence",
  description:
    "Success in academics comes from consistent practice. Our downloadable materials help students strengthen concepts, revise faster, and build confidence across subjects.",
  studyTips: [
    {
      title: "Practice Regularly",
      description:
        "\nMathematics improves through repetition. Consistent daily practice helps strengthen concepts and improve speed.",
    },
    {
      title: "Break Problems Into Steps",
      description:
        "\nLarge problems become easier when solved through smaller, manageable steps.",
    },
    {
      title: "Learn Visually",
      description:
        "\nUse graphs, diagrams, and visual tools to understand abstract concepts more clearly.",
    },
    {
      title: "Learn From Mistakes",
      description:
        "\nReview incorrect answers to identify patterns and improve problem-solving accuracy.",
    },
    {
      title: "Apply Real-Life Examples",
      description:
        "\nConnecting concepts to practical situations makes learning more meaningful and memorable.",
    },
    {
      title: "Seek Guidance When Needed",
      description:
        "\nWorking with tutors or study groups helps students overcome challenges faster.",
    },
  ],

  whyPraticeHelp:{
    heading: "Why These Practice Materials Help",
    icon: "lightbulb",
    pointers:[
      "Topic-wise worksheets for focused practice",
      "Downloadable notes for quick revision",
      "Practice problems sorted by difficulty level",
      "Formula sheets and concept summaries",
      "Mock tests for exam preparation",
      "Resources aligned with school and university curricula",
    ]
      },
};

// Practice Tests Data
export interface PracticeTestItem {
  label: string;
  link?: string;
}

export interface PracticeTestCardSection {
  heading: string;
  description?: string;
  points?: string[];
}

export interface PracticeTestSectionData {
  imageUrl: string;
  imageAlt: string;
  testHeading: string;
  testDescription: string;
  leftSections: PracticeTestCardSection[];
  mainHeading: string;
  mainDescription: string;
  practiceTests: PracticeTestItem[];
}

export const practiceTestData: PracticeTestSectionData = {
  imageUrl: "/assets/resources/practiceTest.webp",
  imageAlt: "Practice test preview",
  testHeading: "Pre-Calculus 12 Practice Exams",
  testDescription:
    "Strengthen your understanding of core Pre-Calculus concepts through guided online practice tests covering transformations, logarithms, trigonometry, functions, and more.",
  leftSections: [
    {
      heading: "Pre-Calculus 12 Practice Exams",
      description:
        "Strengthen your understanding of core Pre-Calculus concepts through guided online practice tests covering transformations, logarithms, trigonometry, functions, and more.",
    },
    {
      heading: "What These Practice Tests Help With",
      points: [
        "Improve problem-solving speed and accuracy",
        "Practice under exam-style conditions",
        "Identify weak concepts before final exams",
        "Build confidence through repetition and review",
        "Reinforce classroom learning with structured practice",
      ],
    },
  ],
  mainHeading: "Practice Tests Designed To Build Exam Confidence",
  mainDescription:"Prepare smarter with structured practice exams created to simulate real test environments and reinforce key concepts. Our practice tests help students improve speed, accuracy, and confidence before quizzes, assessments, and final exams.\nWhether you’re reviewing concepts or preparing under timed conditions, these exams are designed to help you track progress and identify areas that need improvement.",
  practiceTests: [ 
    {
      label: "Take Exam 1 Online",
      link: "https://drshreyankeducare.com/Exam/exam_e_online.html"
    },
    {
      label: "Take Exam 2 Online",
      link: "https://drshreyankeducare.com/Exam/exam_f_online.html"
    },
    {
      label: "Take Exam 3 Online",
      link: "https://drshreyankeducare.com/Exam/exam_g_online.html"
    },
    {
      label: "Take Exam 4 Online",
      link: "https://drshreyankeducare.com/Exam/exam_h_online.html"
    },
  ],
};
