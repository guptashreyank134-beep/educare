/** @format */

import type { NextConfig } from "next";

const redirectPairs: [string, string][] = [
  // General & About
  ["/vancouver-math-tutor", "/"],
  ["/why-drshreyankeducare-tutoring", "/about"],
  ["/our-tutors", "/about"],
  ["/our-tutoring-process", "/about"],
  ["/unlock-your-child-s-potential-with-personalized-tutoring-from-dr-shreyan-kedu-care", "/about"],
  ["/unlock-your-child-s-potential-with-dr-shreyan-kedu-care-personalized-tutoring-that-makes-a-difference", "/about"],
  ["/tutors-in-burnaby", "/math-tutor-burnaby"],
  ["/tutors-in-vancouver-how-to-find-and-become-the-best-with-dr-shreyank-educare", "/math-tutor-vancouver"],

  // Services
  ["/our-services", "/services"],
  ["/in-person-tutoring", "/services"],
  ["/online-tutoring", "/services"],
  ["/final-exam-review-courses", "/services"],
  ["/summer-tutoring-courses", "/services"],
  ["/how-to-find-the-best-math-tutor-in-canada", "/services"],
  ["/understanding-how-online-math-tutoring-platforms-work", "/services"],
  ["/online-math-tutor-bc", "/services"],
  ["/how-summer-tutoring-courses-in-north-vancouver-help-students-stay-ahead-academically", "/services"],
  ["/how-to-find-the-right-in-home-tutoring-services-in-north-vancouver-for-your-childs-learning-needs", "/services"],
  ["/best-math-tutor-in-canada-2025", "/services"],
  ["/best-math-tutor-in-canada-online-in-person-math-tutoring-bc", "/services"],
  ["/top-benefits-of-choosing-in-home-tutoring-services-in-north-vancouver-for-your-childs-academic-success", "/services"],
  ["/top-strategies-to-choose-the-right-academic-tutoring-in-north-vancouver-for-your-child", "/services"],
  ["/online-tutoring-for-math", "/services"],
  ["/how-academic-tutoring-in-north-vancouver-can-boost-your-childs-learning-and-confidence", "/services"],
  ["/online-math-tutor-in-canada", "/services"],
  ["/how-to-choose-the-right-tutoring-services-in-north-vancouver-for-your-child", "/services"],
  ["/top-benefits-of-enrolling-in-tutoring-services-in-north-vancouver-for-academic-success", "/services"],
  ["/top-reasons-parents-choose-personalized-tutoring-in-north-vancouver-for-their-childrens-success", "/services"],
  ["/how-personalized-tutoring-in-north-vancouver-helps-students-reach-their-academic-potential", "/services"],
  ["/top-reasons-parents-choose-the-best-tutoring-in-north-vancouver-for-their-children", "/services"],
  ["/how-to-find-the-best-tutoring-in-north-vancouver-for-academic-success", "/services"],
  ["/holiday-tutoring-vancouver-bc", "/services"],

  // Contact
  ["/contact-us", "/contact"],
  ["/new-year-tutoring-offer-in-bc-free-demo-class-start-2026-strong", "/contact"],

  // Resources & Guides
  ["/comprehensive-guide-to-online-math-help-resources-for-struggling-students-2", "/resources"],
  ["/tips-for-effective-math-tutoring-sessions", "/resources"],
  ["/tips-for-effective-online-math-tutoring-sessions", "/resources"],
  ["/bc-curriculum-guide", "/resources"],
  ["/role-of-a-math-tutor-guide", "/resources"],
  ["/grade-10-math-exam-guide-free-exam-pack-download", "/resources"],
  ["/math-tutor-near-me-parent-roadmap-2025", "/resources"],
  ["/improve-math-grades-fast-10-tips-for-bc-students", "/resources"],
  ["/how-to-master-grade-10-math-in-bc-a-complete-study-guide-for-students", "/resources"],
  ["/thesis-and-academic-writing", "/resources"],

  // Mathematics
  ["/math-tutoring", "/programs/mathematics"],
  ["/math-tutor-dr-shreyank-educare", "/programs/mathematics"],
  ["/math-tutoring-burnaby", "/math-tutor-burnaby"],
  ["/vancouver-math-tutors", "/programs/vancouver-math-tutoring"],
  ["/grade-11-functions-graphs-math-tutor-burnaby", "/programs/mathematics"],
  ["/math-tutoring-burnaby-vancouver-online-canada", "/math-tutor-burnaby"],
  ["/radicals-rational-equations-absolute-values-math-tutor", "/programs/mathematics"],
  ["/factoring-algebra-math-tutor-burnaby", "/programs/mathematics"],
  ["/comprehensive-guide-to-math-tutoring-for-elementary-students-online", "/programs/mathematics"],
  ["/mode-in-statistics-high-school", "/programs/mathematics"],
  ["/median-statistics-high-school-canada", "/programs/mathematics"],
  ["/mean-vs-median-vs-mode-bc", "/programs/mathematics"],
  ["/mean-median-mode-help-bc-students", "/programs/mathematics"],
  ["/top-math-concepts-bc-students-struggle-with-how-to-fix-them", "/programs/mathematics"],
  ["/📐-best-math-tutor-in-burnaby-for-high-school-students-grades-6-12", "/programs/mathematics"],
  ["/%f0%9f%93%90-best-math-tutor-in-burnaby-for-high-school-students-grades-6-12", "/programs/mathematics"],
  ["/%F0%9F%93%90-best-math-tutor-in-burnaby-for-high-school-students-grades-6-12", "/programs/mathematics"],

  // Calculus & Pre-Calculus
  ["/calculus-tutoring", "/programs/pre-calculus"],
  ["/calculus-tutor-burnaby-tangents-integrals-optimization", "/programs/pre-calculus"],
  ["/essential-pre-cal-12-tutoring-resources", "/programs/pre-calculus"],
  ["/best-resources-for-studying-precalculus-effectively", "/programs/pre-calculus"],
  ["/grade-12-calculus-math-tutor-burnaby-canada", "/programs/pre-calculus"],
  ["/pre-calculus-formulas-tricks-for-bc-students-free-study-sheet", "/programs/pre-calculus"],
  ["/mastering-the-identities-of-trigonometry__simple-guide", "/programs/pre-calculus"],
  ["/why-understanding-the-identities-of-trigonometry-is-essential-for-math-success", "/programs/pre-calculus"],
  ["/calculus-and-vectors-explained", "/programs/pre-calculus"],
  ["/understanding-the-calculus-quotient-rule-step-by-step-guide", "/programs/pre-calculus"],
  ["/precalculus-12-precalc-12-math-12-guide", "/programs/pre-calculus"],
  ["/www-drshreyankeducare-com-pre-calculus-12-tutoring", "/programs/pre-calculus"],
  ["/how-calculus-tutoring-in-burnaby-helps-students-build-confidence-and-improve-grades", "/programs/pre-calculus"],
  ["/top-reasons-to-choose-professional-calculus-tutoring-in-burnaby-for-high-school-and-university-success", "/programs/pre-calculus"],
  ["/ubc-math-100-study-guide-for-first-year-students-tips-from-expert-calculus-tutors", "/programs/university-mathematics"],
  ["/pre-calculus-11-12-math-tutoring-burnaby", "/programs/pre-calculus"],
  ["/pre-calculus-12-exam-prep-bc-2026", "/programs/pre-calculus"],

  // Chemistry
  ["/chemistry-tutoring", "/programs/chemistry"],
  ["/chemistry-tutoring-burnaby-vancouver", "/programs/chemistry"],
  ["/top-resources-for-mastering-chem-11-2", "/programs/chemistry"],
  ["/how-to-choose-the-best-chemistry-coaching-in-burnaby-for-academic-success", "/programs/chemistry"],
  ["/top-benefits-of-enrolling-in-the-best-chemistry-coaching-in-burnaby-for-high-school-and-college-students", "/programs/chemistry"],
  ["/🔬-best-chemistry-tutoring-in-burnaby-vancouver-ib-ap-bc-curriculum", "/programs/chemistry"],
  ["/%f0%9f%94%ac-best-chemistry-tutoring-in-burnaby-vancouver-ib-ap-bc-curriculum", "/programs/chemistry"],
  ["/%F0%9F%94%AC-best-chemistry-tutoring-in-burnaby-vancouver-ib-ap-bc-curriculum", "/programs/chemistry"],

  // Physics
  ["/physics-tutoring", "/programs/physics-tutoring"],
  ["/science-physics-tutoring-burnaby", "/programs/physics-tutoring"],
  ["/hardest-high-school-physics-topics-bc-curriculum", "/programs/physics"],
  ["/the-math-behind-waves-and-sound-burnaby-tutor", "/programs/physics"],
  ["/mastering-waves-and-sound-physics-tutoring-burnaby", "/programs/physics"],
  ["/mastering-projectile-motion-physics-12-bc", "/programs/physics"],
  ["/types-of-physics-tutoring-in-canada-choose-what-suits-you", "/programs/physics-tutoring"],
  ["/how-calculus-explains-velocity-and-acceleration-in-grade-12-physics", "/programs/physics"],
  ["/calculus-velocity-acceleration-physics-math", "/programs/physics"],
  ["/physics-math-tutoring-high-school-canada", "/programs/physics"],
  ["/algebra-trigonometry-for-physics", "/programs/physics"],
  ["/physics-problems-math-skills-tutor-canada", "/programs/physics"],
  ["/newtons-laws-of-motion-high-school-physics", "/programs/physics"],
  ["/kinematics-in-high-school-physics", "/programs/physics"],
  ["/electricity-circuits-explained", "/programs/physics"],
  ["/work-energy-power-in-high-school-physics", "/programs/physics"],
  ["/physics-tutor-brentwood-burnaby", "/math-tutor-burnaby"],
  ["/math-physics-tutor-metrotown-burnaby", "/math-tutor-burnaby"],
  ["/private-physics-tutor-burnaby", "/math-tutor-burnaby"],
  ["/why-you-need-a-vancouver-physics-tutor", "/math-tutor-vancouver"],
  ["/top-reasons-students-prefer-the-best-physics-coaching-in-burnaby-for-competitive-exams-and-school-support", "/programs/physics"],
  ["/how-to-choose-the-best-physics-coaching-in-burnaby-for-academic-success", "/programs/physics"],
  ["/www-drshreyankeducare-com-peo-statics-dynamics-exam-tutoring", "/programs/university-physics"],

  // Biology
  ["/biology-tutoring", "/programs/biology"],
  ["/dna-replication-fork-diagram-guide", "/programs/biology"],
  ["/why-dna-replication-is-semiconservative", "/programs/biology"],

  // Computer Science / Coding
  ["/computer-science-tutoring", "/programs/computer-science"],
  ["/why-learn-programming-boost-skills-career-2026", "/programs/computer-science"],
  ["/how-to-choose-the-best-computer-science-tutoring-coaching-in-burnaby-top-qualities-and-local-options", "/programs/computer-science"],
  ["/top-computer-science-tutoring-coaching-services-in-burnaby-what-to-look-for-who-stands-out", "/programs/computer-science"],
  ["/how-to-choose-the-right-computer-science-tutoring-in-burnaby-for-your-learning-goals", "/programs/computer-science"],
  ["/top-benefits-of-personalized-computer-science-tutoring-in-burnaby-for-high-school-and-college-students", "/programs/computer-science"],

  // Programming & Other Tech Courses
  ["/python", "/programs/python"],
  ["/java", "/programs/computer-science"],
  ["/web-development", "/programs/web-development"],

  // Language & General Prep
  ["/programs/language-programs", "/programs"],
  ["/programs/test-prep-burnaby", "/programs"],
  ["/college-entrance-exam-prep-canadian-students-2026", "/programs"],
  ["/best-test-prep-courses-2025-comparison", "/programs"],
  ["/math-physics-chemistry-tutoring-drshreyank-educare", "/programs"],
  ["/top-10-reasons-why-the-best-science-coaching-in-burnaby-is-the-right-choice-for-academic-success", "/programs"],
  ["/top-10-benefits-of-joining-the-best-science-coaching-in-burnaby-for-students", "/programs"],
  ["/science-tutoring", "/programs"],

  // Finance
  ["/finance-tutoring", "/programs/finance"],
  ["/how-to-choose-the-right-finance-tutor-in-burnaby-for-your-learning-goals", "/programs/finance"],
  ["/top-reasons-to-hire-a-professional-finance-tutor-in-burnaby-for-academic-success", "/programs/finance"],

  // Special/AP/IB
  ["/ib-math-tutoring-from-grade-6-to-grade-12", "/programs/ib-ap-tutoring"],
  ["/mastering-calculus-12-ap-prep-burnaby-bc", "/programs/ib-ap-tutoring"],
  ["/why-bc-students-need-structured-math-support", "/blog/importance-of-high-school-mathematics"],

  // Consolidated thin blog posts (2026-07): each was a ~400-word generic
  // overview of a topic a dedicated page already covers properly, so it split
  // ranking signals with the page that should win. Content is backed up in
  // scripts/backups/consolidated-posts.json if any needs restoring.
  ["/blog/physics-high-school-physics", "/physics-12-tutor-burnaby"],
  ["/blog/physics-tutoring-high-school-physics", "/physics-12-tutor-burnaby"],
  ["/blog/physics-tutoring-university-physics", "/university-physics-tutor-vancouver"],
  ["/blog/physics-university-level-physics", "/university-physics-tutor-vancouver"],
  ["/blog/physics-tutoring-physics-concepts-problem-solving", "/physics-problem-solving-tutor"],
  ["/blog/mathematics-pre-calculus", "/pre-calculus-12-tutor-burnaby"],
  ["/blog/burnaby-stem-tutoring-physics-11-12", "/physics-12-tutor-burnaby"],
  ["/blog/burnaby-stem-tutoring-chemistry-11-12", "/chemistry-12-tutor-burnaby"],
  ["/blog/burnaby-stem-tutoring-biology-11-12", "/biology-12-tutor-burnaby"],
  ["/blog/burnaby-stem-tutoring-mathematics-grades-8-12", "/math-tutor-burnaby"],

  // Additional redirects (Turn 2)
  ["/how-to-solve-differential-equations", "/programs/university-mathematics"],
  ["/how-to-choose-the-right-math-tutor-in-burnaby-a-parents-complete-guide", "/services"],
  ["/top-benefits-of-hiring-a-math-tutor-in-burnaby-to-boost-your-childs-academic-success", "/services"],
  ["/real-life-applications-of-math", "/blog"],
  ["/how-to-choose-the-right-tutor-in-burnaby-a-parents-guide-to-academic-excellence", "/services"],
  ["/tutoring-young-leaeners", "/services"],
  ["/ib-tutoring-vancouver", "/programs/ib-ap-tutoring"],
  ["/personalized-tutoring-in-burnaby-north-vancouver-coquitlam-the-key-to-academic-success", "/services"],
  ["/french-tutor-in-north-vancouver", "/programs/french"],
  ["/top-5-benefits-of-hiring-a-local-tutor-in-burnaby-for-your-childs-academic-success", "/services"],
  ["/second-law-on-inclined-plane-with-friction", "/programs/physics"],
  ["/problems-in-math-for-high-school-students", "/programs/mathematics"],
  ["/is-canada-losing-its-education-edge", "/blog"],
  ["/how-to-manage-exam-stress-student-wellness-tips", "/resources"],
  ["/top-study-tips-for-high-school-student", "/resources"],
  ["/how-to-choose-the-right-tutor-for-your-child", "/services"],
  ["/struggling-with-math", "/programs/mathematics"],
  ["/frequently-asked-questions", "/about"],
  ["/demo-videos", "/resources"],
  ["/practice-materials", "/resources"],

  // ------------------------------------------------------------------
  // Consolidated stub blog posts (2026-07-15).
  //
  // Each was a ~400-word auto-generated overview of a topic that a dedicated
  // programme page already covers properly, so it split ranking signals with
  // the page that should win. Several were on subjects outside the practice's
  // expertise. Consolidated rather than expanded on purpose: 65 more long
  // articles on Mandarin and React under a physics PhD's byline is precisely
  // what Google's helpful-content system demotes.
  //
  // Every post is backed up in
  // scripts/backups/all-posts-before-consolidation.json and can be restored.
  // Redirects were added BEFORE the posts were deleted, so no URL ever 404s.
  // ------------------------------------------------------------------
  // biology
  ["/blog/biology-cell-biology", "/programs/biology"],
  ["/blog/biology-ecology-biotechnology", "/programs/biology"],
  ["/blog/biology-genetics-evolution", "/programs/biology"],
  ["/blog/biology-human-physiology", "/programs/biology"],
  ["/blog/biology-molecular-biology", "/programs/biology"],
  // burnaby-stem-tutoring
  ["/blog/burnaby-stem-tutoring-computer-science-programming", "/programs/burnaby-stem-tutoring"],
  ["/blog/burnaby-stem-tutoring-statistics-data-analysis", "/programs/burnaby-stem-tutoring"],
  // chemistry
  ["/blog/chemistry-chemical-reactions-bonding", "/programs/chemistry"],
  ["/blog/chemistry-organic-chemistry", "/programs/chemistry"],
  ["/blog/chemistry-physical-chemistry", "/programs/chemistry"],
  // computer-science
  ["/blog/computer-science-computational-thinking", "/programs/computer-science"],
  ["/blog/computer-science-data-structures-algorithms", "/programs/computer-science"],
  ["/blog/computer-science-logic-building", "/programs/computer-science"],
  ["/blog/computer-science-programming-basics", "/programs/computer-science"],
  // finance
  ["/blog/finance-business-concepts", "/programs/finance"],
  ["/blog/finance-financial-basics", "/programs/finance"],
  ["/blog/finance-practical-application-of-finance", "/programs/finance"],
  // french
  ["/blog/french-conversational-french-pronunciation", "/programs/french"],
  ["/blog/french-grammar-vocabulary-sentence-formation", "/programs/french"],
  ["/blog/french-reading-writing-listening-practice", "/programs/french"],
  // gmat-prep
  ["/blog/gmat-prep-data-insights", "/programs/gmat-prep"],
  ["/blog/gmat-prep-ir-mini-mocks-strategies", "/programs/gmat-prep"],
  ["/blog/gmat-prep-verbal-quantitative-focus", "/programs/gmat-prep"],
  // gre-prep
  ["/blog/gre-prep-analytical-writing-assessment-awa-essays", "/programs/gre-prep"],
  ["/blog/gre-prep-quantitative-reasoning-shortcuts", "/programs/gre-prep"],
  ["/blog/gre-prep-verbal-vocabulary-systems", "/programs/gre-prep"],
  // ib-ap-tutoring
  ["/blog/ib-ap-tutoring-ap-calculus-ab-bc", "/programs/ib-ap-tutoring"],
  ["/blog/ib-ap-tutoring-ap-chemistry-biology", "/programs/ib-ap-tutoring"],
  ["/blog/ib-ap-tutoring-ap-physics-1-2-c", "/programs/ib-ap-tutoring"],
  ["/blog/ib-ap-tutoring-ap-statistics", "/programs/ib-ap-tutoring"],
  ["/blog/ib-ap-tutoring-ib-mathematics-analysis-approaches-sl-hl", "/programs/ib-ap-tutoring"],
  ["/blog/ib-ap-tutoring-ib-mathematics-applications-interpretation", "/programs/ib-ap-tutoring"],
  ["/blog/ib-ap-tutoring-ib-physics-chemistry-biology-sl-hl", "/programs/ib-ap-tutoring"],
  // javascript
  ["/blog/javascript-dom-manipulation", "/programs/javascript"],
  ["/blog/javascript-functions-and-events", "/programs/javascript"],
  ["/blog/javascript-loops-and-conditionals", "/programs/javascript"],
  ["/blog/javascript-variables-and-data-types", "/programs/javascript"],
  // mandarin
  ["/blog/mandarin-conversational-mandarin-pronunciation", "/programs/mandarin"],
  ["/blog/mandarin-grammar-listening-cultural-understanding", "/programs/mandarin"],
  ["/blog/mandarin-reading-writing-vocabulary-building", "/programs/mandarin"],
  // mathematics
  ["/blog/mathematics-algebra-functions", "/programs/mathematics"],
  ["/blog/mathematics-trigonometry-coordinate-geometry", "/programs/mathematics"],
  // mcat-prep
  ["/blog/mcat-prep-biology-biochemistry", "/programs/mcat-prep"],
  ["/blog/mcat-prep-cars-drills", "/programs/mcat-prep"],
  ["/blog/mcat-prep-chemistry-physics", "/programs/mcat-prep"],
  ["/blog/mcat-prep-psychology-sociology", "/programs/mcat-prep"],
  // physics
  ["/blog/physics-physics-the-underlying-math", "/programs/physics"],
  // pre-calculus
  ["/blog/pre-calculus-polynomial-rational-functions", "/pre-calculus-12-tutor-burnaby"],
  // python
  ["/blog/python-basic-syntax-and-structure", "/programs/python"],
  ["/blog/python-functions-logic-building", "/programs/python"],
  ["/blog/python-loops-and-conditionals", "/programs/python"],
  ["/blog/python-variables-and-data-types", "/programs/python"],
  // sat-prep
  ["/blog/sat-prep-evidence-based-reading-writing", "/programs/sat-prep"],
  ["/blog/sat-prep-sat-mathematics", "/programs/sat-prep"],
  ["/blog/sat-prep-test-taking-hacks-strategies", "/programs/sat-prep"],
  // university-biology
  ["/blog/university-biology-anatomy-and-physiology", "/programs/university-biology"],
  ["/blog/university-biology-general-biology", "/programs/university-biology"],
  ["/blog/university-biology-molecular-biology", "/programs/university-biology"],
  // university-chemistry
  ["/blog/university-chemistry-chemical-kinetics-equilibrium", "/programs/university-chemistry"],
  // university-finance
  ["/blog/university-finance-bcom-mba-finance", "/programs/university-finance"],
  ["/blog/university-finance-cfa-csc-ifc-certifications", "/programs/university-finance"],
  ["/blog/university-finance-msc-phd-finance-studies", "/programs/university-finance"],
  // university-mathematics
  // university-physics
  ["/blog/university-physics-electromagnetism-thermodynamics", "/programs/university-physics"],
  // vancouver-math-tutoring
  ["/blog/vancouver-math-tutoring-calculus-linear-algebra", "/programs/mathematics"],
  ["/blog/vancouver-math-tutoring-elementary-middle-school-math", "/programs/mathematics"],
  ["/blog/vancouver-math-tutoring-high-school-math-grades-8-12", "/programs/mathematics"],
  // web-development
  ["/blog/web-development-api-development-integration", "/programs/web-development"],
  ["/blog/web-development-backend-development-node-js-express", "/programs/web-development"],
  ["/blog/web-development-database-management-mongodb-firebase", "/programs/web-development"],
  ["/blog/web-development-frontend-development-html-css-react", "/programs/web-development"],

  // Category pages
  ["/category/biology", "/programs/biology"],
  ["/category/blog", "/blog"],
  ["/category/calculus-2", "/programs/pre-calculus"],
  ["/category/maths/calculus", "/programs/pre-calculus"],
  ["/category/chemistry", "/programs/chemistry"],
  ["/category/computer-science", "/programs/computer-science"],
  ["/category/exams", "/programs"],
  ["/category/finance", "/programs/finance"],
  ["/category/maths", "/programs/mathematics"],
  ["/category/physics", "/programs/physics"],
  ["/category/stem", "/programs/burnaby-stem-tutoring"],
  ["/category/stem/stem-education", "/programs/burnaby-stem-tutoring"],
  ["/category/stem-education-2", "/programs/burnaby-stem-tutoring"],
  ["/category/tutor", "/services"],
  ["/category/uncategorized", "/blog"],
];

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 31536000, // 1 year cache policy for optimized images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return redirectPairs.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

