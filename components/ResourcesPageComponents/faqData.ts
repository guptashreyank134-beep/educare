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
