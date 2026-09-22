// Invalid URLs linked from published articles in the 2026-09-22 crawl.
// Keep explicit mappings: unknown URLs must still return a real 404.
export const crawlRepairPairs: [string, string][] = [
  ["/programs/math", "/programs/mathematics"],
  ["/programs/math-tutoring", "/programs/mathematics"],
  ["/programs/high-school", "/programs/burnaby-stem-tutoring"],
  ["/programs/high-school-tutoring", "/programs/burnaby-stem-tutoring"],
  ["/programs/science", "/science-tutor-burnaby"],
  ["/programs/science-tutoring", "/science-tutor-burnaby"],
  ["/programs/college", "/university-professional"],
  ["/programs/college-tutoring", "/university-professional"],
  ["/programs/organic-chemistry", "/programs/university-chemistry"],
  ["/programs/organic-chemistry-tutoring", "/programs/university-chemistry"],
  ["/programs/in-person-burnaby", "/tutoring-burnaby"],
  ["/programs/adult-upgrading", "/blog/adult-upgrading-advising-vancouver"],
  ["/programs/adult-learners", "/blog/adult-upgrading-advising-vancouver"],
  ["/programs/elementary", "/blog/elementary-tutor-burnaby-k7-math-reading-foundations"],
  ["/programs/exam-prep", "/final-exam-review-tutoring-burnaby"],
  ["/blog/concept-gaps-vs-practice-gaps", "/blog/one-on-one-math-tutoring-burnaby-close-concept-gaps"],
  ["/blog/in-person-vs-online-tutoring", "/blog/tutoring-burnaby-phd-led-guide-in-person-vs-online"],
  ["/blog/does-my-child-need-a-tutor", "/blog/tutoring-burnaby-metro-vancouver-guide"],
  ["/blog/understanding-over-memorisation", "/blog/study-skills-coaching-how-to-actually-learn"],
  ["/blog/managing-exam-stress", "/blog/exam-strategy-coaching-burnaby-metro-vancouver"],
];
