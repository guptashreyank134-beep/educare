// Reviewed September 2026 crawl copy. Exact-value matching preserves future CMS edits.
// These are editorial replacements, not automatic character truncation.
const corrections: Record<string, string> = {
  "Investment Theory & Portfolio Management 2026 | Finance Tutor in Burnaby": "Investment Theory & Portfolio Management Guide (2026)",
  "What is investment theory and portfolio management? A worked-example guide covering CAPM, MPT, the Sharpe ratio, and bond duration for B.Com, MBA and CFA/CSC students plus finance tutoring in Burnaby, BC.": "Study investment theory and portfolio management through worked examples of CAPM, MPT, the Sharpe ratio and bond duration for finance courses.",
  "Actuarial Science Tutoring: What Exams P, FM & SRM Actually Test | Complete Guide": "Actuarial Exams P, FM & SRM: What They Test",
  "Confused about what Exam P, FM and SRM really test? Here's the honest, exam-by-exam breakdown — what trips students up and how an online actuarial science tutor for UK students helps you pass the first time.": "Understand what actuarial Exams P, FM and SRM test, common stumbling blocks and how to prepare with focused practice and online tutoring.",
  "Struggling with AP Chem in Burnaby? Get a PhD-led roadmap that fixes concept gaps, not just symptoms. In-person or online across Metro Vancouver. Book a free as": "A PhD-led AP Chemistry study roadmap for Burnaby students: identify concept gaps and plan targeted practice, in person or online.",
  "Math Foundations vs Pre-Calculus in BC : Which One to Choose?": "Foundations of Math vs Pre-Calculus in BC",
  "Physics Tutoring in Vancouver & Burnaby: The Complete 9–12, IB & AP Physics Roadmap (2026)": "Physics Tutoring Roadmap: Grades 9–12, IB & AP",
  "Dr. Shreyank Educare | Math, Physics, Chemistry & Coding Tutor": "Dr. Shreyank Educare | Math, Science & Coding Tutors",
  "Online Actuarial Exam Tutor | University & Professional — Dr. Shreyank Educare": "Online Actuarial Exam Tutor | P, FM & SRM Preparation",
  "Expert online actuarial exam tutoring for UK, USA and worldwide candidates — structured, problem-focused preparation for professional actuarial exams. Free consultation.": "Prepare for actuarial exams with structured online tutoring, worked problems and targeted practice for candidates in the UK, USA and worldwide.",
  "Expert online actuarial science tutoring for UK students covering probability, financial math and exam-focused problem solving. Book a free consultation with us today.": "Online actuarial science tutoring for UK students. Study probability, financial maths and exam problem solving with one-on-one support.",
  "AP Calculus AB & BC exam prep in Vancouver — targeted review, FRQ practice and exam strategy for a top score. Online or nearby in Burnaby. Free consultation.": "Prepare for AP Calculus AB and BC in Vancouver with targeted review, FRQ practice and exam strategies. Online or in nearby Burnaby.",
  "AP tutoring in Vancouver across Calculus, Physics, Chemistry, Biology and Statistics — expert exam prep for top scores. Online or nearby in Burnaby. Free consultation.": "AP tutoring for Vancouver students in calculus, physics, chemistry, biology and statistics. Study online or in nearby Burnaby.",
  "See why parents rate Dr. Shreyank Educare 5★ for Math, Physics & Chemistry tutoring in Burnaby & Vancouver. Read what families say and book a free consultation.": "Read family reviews of Dr. Shreyank Educare and learn about math, physics and chemistry tutoring in Burnaby and Vancouver.",
  "IB Math tutoring in Vancouver — Analysis & Approaches and Applications & Interpretation, SL & HL, plus IA support. Online or nearby in Burnaby. Free consultation.": "IB Math tutoring for Vancouver students in AA and AI, SL and HL, with IA support. Learn online or in nearby Burnaby. Free consultation.",
  "Online Medical Exam Prep Tutor for USA & Caribbean | Dr. Shreyank Educare": "Online Medical Exam Prep | USA & Caribbean",
  "MD-led online exam prep for USA and Caribbean medical students, with high-yield review, one on one tutoring and targeted practice for board exams. Book a free spot.": "MD-led online medical exam preparation for USA and Caribbean students, with focused review, one-on-one support and targeted practice.",
  "Online Medical Sciences Tutor in USA & Caribbean | Dr. Shreyank": "Online Medical Sciences Tutor | USA & Caribbean",
  "MD-led online medical sciences tutoring for USA and Caribbean students, covering physiology, pathology, pharmacology and anatomy. Book a free consultation now.": "MD-led online medical sciences tutoring for USA and Caribbean students. Get help with physiology, pathology, pharmacology and anatomy.",
  "Online Economics Tutors in United Kingdom | Dr. Shreyank Educare": "Online Economics Tutor for UK University Students",
  "Expert online economics tutoring for UK, USA and worldwide university students — micro, macro and econometrics. One-on-one, exam-focused. Free consultation.": "One-on-one economics tutoring for university students in the UK and worldwide. Get help with microeconomics, macroeconomics and econometrics.",
  "Online High School Math Tutor BC | BC Curriculum": "Online High School Math Tutor | BC Curriculum",
  "Online Medical Tutoring for USA & Caribbean | Dr. Shreyank Educare": "Online Medical Tutoring | USA & Caribbean | MD-Led",
  "Get MD-led, one-on-one online medical tutoring for USA and Caribbean students in physiology, pathology and pharmacology and USMLE prep. Book a free consultation.": "MD-led online tutoring for USA and Caribbean medical students in physiology, pathology, pharmacology and USMLE preparation. Free consultation.",
  "Online Pathology Tutor for USA & Caribbean Students | Dr. Shreyank Educare": "Online Pathology Tutor | USA & Caribbean",
  "MD-led online pathology tutoring for USA and Caribbean medical students. One-on-one help with general and systemic pathology and board prep. Free consultation.": "MD-led online pathology tutoring for USA and Caribbean medical students. Study general and systemic pathology with one-on-one board prep.",
  "Online Pharmacology Tutor for USA & Caribbean Med Students | Dr. Shreyank": "Online Pharmacology Tutor | USA & Caribbean",
  "MD-led online pharmacology tutoring for USA and Caribbean medical students. One-on-one help with drug classes, mechanisms and board prep. Free consultation.": "Online pharmacology tutoring for USA and Caribbean medical students. Get MD-led help with drug classes, mechanisms and board preparation.",
  "Online Physiology Tutor for USA & Caribbean Students | Dr. Shreyank": "Online Physiology Tutor | USA & Caribbean",
  "Online Statistics Tutor for UK University Students | Dr. Shreyank Educare": "Online Statistics Tutor for UK University Students",
  "Expert online statistics tutoring for UK, USA and worldwide university students and professionals in probability, inference, regression and more. Book a free consultation.": "Online statistics tutoring for university students and professionals. Build skills in probability, inference and regression. Free consultation.",
  "Expert one-on-one online R programming tutoring for UK university and professional students covering data analysis, statistical coding and visualization. Book a free consultation.": "One-on-one online R programming tutoring for university students and professionals. Learn data analysis, statistical coding and visualization.",
  "Learn statistics with R through one-on-one online tutoring for university and professional students in UK, from core theory to applied analysis. Book a free consultation.": "Learn statistics with R through online tutoring for UK university students and professionals, from statistical theory to applied data analysis.",
  "University & Professional Tutoring | Economics, Statistics, Actuarial & R — Dr. Shreyank Educare": "University & Professional Tutoring | Economics & Stats",
  "Expert online tutoring in Economics, Statistics, Actuarial Science and R programming for UK, USA and worldwide university and professional learners. Free consultation.": "Online tutoring in economics, statistics, actuarial science and R for university students and professionals worldwide. Book a free consultation."
};

export function correctSeoCopy(value: string): string {
  return corrections[value] ?? value;
}
