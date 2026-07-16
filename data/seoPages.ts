/**
 * Programmatic SEO landing pages, keyed by URL slug and rendered by the single
 * app/[seoSlug]/page.tsx route via components/SeoLandingPage.tsx.
 *
 * Each entry targets one keyword cluster from the SEO strategy with UNIQUE
 * copy (not a templated city swap) to avoid thin / doorway-page penalties.
 *
 * To add a page: append an entry here. The route (generateStaticParams) and
 * sitemap pick it up automatically. Keep metaTitle unique and ≤ ~60 chars,
 * one keyword-matched H1, and genuine local content.
 */

export interface SeoSection {
  heading: string;
  body?: string[];
  points?: string[];
}

export interface SeoFAQ {
  question: string;
  answer: string;
}

export interface SeoRelated {
  label: string;
  href: string;
}

export interface SeoPage {
  /** URL slug (no leading slash), e.g. "best-math-tutor-burnaby". */
  slug: string;
  cluster: string;
  /** City for Service-schema areaServed; omit for multi-city/brand pages. */
  location?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubheading: string;
  intro: string[];
  sections: SeoSection[];
  faqs: SeoFAQ[];
  related: SeoRelated[];
}

export const SEO_BASE_URL = "https://www.drshreyankeducare.com";
export const seoPagePath = (slug: string) => `/${slug}`;
export const seoPageUrl = (slug: string) => `${SEO_BASE_URL}/${slug}`;

const CONTACT: SeoRelated = { label: "Book a Free Consultation", href: "/contact" };

export const seoPages: SeoPage[] = [
  // ─────────────────────────── BRAND ───────────────────────────
  {
    slug: "dr-shreyank-educare",
    cluster: "Brand",
    metaTitle: "Dr. Shreyank Educare | PhD Tutoring, Burnaby & Vancouver",
    metaDescription:
      "PhD-led Math, Physics, Chemistry & Coding tutoring in Burnaby & Vancouver for Grades 6–12 and university. 5★ rated. Free consultation.",
    h1: "Dr. Shreyank Educare — PhD-Led Tutoring in Burnaby & Vancouver",
    heroSubheading:
      "Personalized, results-driven tutoring in Math, Physics, Chemistry and Coding, led by Dr. Shreyank Gupta and trusted by families across Burnaby and Vancouver.",
    intro: [
      "Dr. Shreyank Educare is a Burnaby-based tutoring service founded on one idea: students learn best with a clear, patient, expert teacher who builds real understanding rather than quick fixes. Led by Dr. Shreyank Gupta, our team helps students in Grades 6–12 and university master their toughest subjects and walk into exams with confidence.",
      "Families choose us for our PhD-led teaching, consistent one-on-one attention, and a track record of measurable grade improvements — reflected in our 5★ parent reviews.",
    ],
    sections: [
      {
        heading: "What We Offer",
        points: [
          "Math tutoring (Grades 6–12 & university)",
          "Physics 11 & 12, university physics",
          "Chemistry 11 & 12",
          "Pre-Calculus & Calculus",
          "IB, AP and BC curriculum support",
          "Coding & computer science",
        ],
      },
      {
        heading: "Why Families Trust Us",
        body: [
          "Every student gets a plan built around their curriculum, pace and goals — not a one-size-fits-all worksheet. Sessions run in person in Burnaby or online across Metro Vancouver.",
          "We measure progress honestly and keep parents informed, so you always know how your child is doing and what comes next.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where is Dr. Shreyank Educare located?",
        answer:
          "our Burnaby location is in Burnaby, BC, and we serve students across Burnaby and Vancouver in person, plus online tutoring across Metro Vancouver and beyond.",
      },
      {
        question: "What subjects and grades do you cover?",
        answer:
          "Math, Physics, Chemistry and Coding for Grades 6–12 and university, including Pre-Calculus, Calculus, IB, AP and the BC curriculum.",
      },
      {
        question: "How do I get started?",
        answer:
          "Book a free 30-minute consultation. We assess your current level, discuss goals and build a personalised plan with no obligation.",
      },
    ],
    related: [
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Read Our Reviews", href: "/dr-shreyank-educare-reviews" },
      CONTACT,
    ],
  },
  {
    slug: "dr-shreyank-educare-reviews",
    cluster: "Brand",
    metaTitle: "Dr. Shreyank Educare Reviews | 5★ Rated Tutoring in BC",
    metaDescription:
      "See why parents rate Dr. Shreyank Educare 5★ for Math, Physics & Chemistry tutoring in Burnaby & Vancouver. Book a free consultation.",
    h1: "Dr. Shreyank Educare Reviews",
    heroSubheading:
      "Parents and students across Burnaby and Vancouver consistently rate Dr. Shreyank Educare 5 stars. Here's what stands behind that reputation.",
    intro: [
      "A tutoring service is only as good as the results it delivers, and the feedback from our families tells the story: clearer understanding, higher grades, and students who finally feel confident in subjects that used to cause stress.",
      "Below is what parents and students most often highlight in their reviews of Dr. Shreyank Educare.",
    ],
    sections: [
      {
        heading: "What Parents and Students Say",
        points: [
          "Patient, expert PhD-led teaching",
          "Real grade improvements",
          "Clear step-by-step explanations",
          "Flexible in-person & online sessions",
          "Strong exam preparation",
          "Honest progress updates",
        ],
      },
      {
        heading: "See Our Live Google Reviews",
        body: [
          "Our reviews are visible right on this site and on our Google Business Profile, so you can read genuine, verified feedback from local families.",
          "We'd rather let results and honest reviews speak than make big promises — book a free consultation and see the difference for yourself.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are Dr. Shreyank Educare's reviews genuine?",
        answer:
          "Yes. Our reviews come from real parents and students and are visible on our Google Business Profile and on this website.",
      },
      {
        question: "What do most reviews mention?",
        answer:
          "Families most often praise the PhD-led teaching, clear explanations, measurable grade improvements and strong exam preparation.",
      },
      {
        question: "Can I leave a review?",
        answer:
          "Absolutely — current families are always welcome to share their experience on our Google Business Profile.",
      },
    ],
    related: [
      { label: "About Dr. Shreyank Educare", href: "/dr-shreyank-educare" },
      { label: "Best Math Tutor in Burnaby", href: "/best-math-tutor-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "dr-shreyank-educare-burnaby",
    cluster: "Brand",
    location: "Burnaby",
    metaTitle: "Dr. Shreyank Educare Burnaby | In-Person & Online Tutoring",
    metaDescription:
      "Dr. Shreyank Educare in Burnaby: PhD-led Math, Physics & Chemistry tutoring for Grades 6–12 and university, in person or online. Free consultation.",
    h1: "Dr. Shreyank Educare in Burnaby",
    heroSubheading:
      "Our home base. In-person, one-on-one tutoring in person in Burnaby in Math, Physics, Chemistry and Coding, plus flexible online sessions.",
    intro: [
      "Dr. Shreyank Educare is proudly based in Burnaby, which means local students get true in-person, one-on-one tutoring built around their exact classroom material and the BC curriculum.",
      "From Metrotown and Brentwood to Lougheed and beyond, Burnaby families rely on us for clear teaching, steady progress and strong exam results.",
    ],
    sections: [
      {
        heading: "Serving Burnaby Neighbourhoods",
        points: [
          "Metrotown",
          "Brentwood",
          "Lougheed",
          "Edmonds",
          "Highgate",
          "SFU / UniverCity",
        ],
      },
      {
        heading: "In-Person or Online",
        body: [
          "Attend sessions in person in Burnaby, or learn from home with the same expert tutors online — whichever suits your family.",
          "Either way, every session is tailored to your student's goals and tracked so parents stay informed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you offer in-person tutoring in Burnaby?",
        answer:
          "Yes. our Burnaby location is in Burnaby, so local students attend in-person one-on-one sessions, with online tutoring also available.",
      },
      {
        question: "Which Burnaby schools do your students attend?",
        answer:
          "Students from Burnaby North, Burnaby Central, Moscrop, Byrne Creek, Alpha and others, plus SFU university students.",
      },
      {
        question: "What are your subjects?",
        answer:
          "Math, Physics, Chemistry and Coding for Grades 6–12 and university, including Pre-Calculus, Calculus, IB and AP.",
      },
    ],
    related: [
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "About Dr. Shreyank Educare", href: "/dr-shreyank-educare" },
      CONTACT,
    ],
  },
  {
    slug: "dr-shreyank-gupta-tutor",
    cluster: "Brand",
    metaTitle: "Dr. Shreyank Gupta | PhD Math & Science Tutor in BC",
    metaDescription:
      "Meet Dr. Shreyank Gupta — PhD-qualified Math, Physics & Chemistry tutor with 10+ years' experience in Burnaby & Vancouver. Free consultation.",
    h1: "Dr. Shreyank Gupta — PhD Math & Science Tutor",
    heroSubheading:
      "Ten-plus years of teaching experience and a PhD behind every lesson. Learn directly from an expert who makes hard concepts genuinely click.",
    intro: [
      "Dr. Shreyank Gupta leads Dr. Shreyank Educare and brings a PhD and over a decade of teaching experience to every student. His approach is built on deep subject mastery and the patience to meet each student where they are.",
      "Students value his ability to break intimidating topics — from calculus to physics mechanics — into clear, repeatable steps that build lasting confidence.",
    ],
    sections: [
      {
        heading: "Teaching Approach",
        points: [
          "Concept-first, not memorisation",
          "Step-by-step problem solving",
          "Curriculum-aligned lessons",
          "Exam strategy & technique",
          "Confidence building",
          "Honest progress tracking",
        ],
      },
      {
        heading: "Expertise",
        body: [
          "Dr. Gupta and the team specialise in Math, Physics and Chemistry across Grades 6–12 and university, including Pre-Calculus, Calculus, IB and AP coursework.",
          "Whether a student needs to catch up, keep up or get ahead, the goal is the same: genuine understanding that holds up under exam pressure.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is Dr. Shreyank Gupta?",
        answer:
          "Dr. Shreyank Gupta is the PhD-qualified founder of Dr. Shreyank Educare, with 10+ years of experience teaching Math, Physics and Chemistry.",
      },
      {
        question: "What does Dr. Gupta tutor?",
        answer:
          "Math, Physics and Chemistry for Grades 6–12 and university, including Pre-Calculus, Calculus, IB and AP.",
      },
      {
        question: "Can I book a session directly?",
        answer:
          "Yes — start with a free 30-minute consultation to discuss your goals and build a plan.",
      },
    ],
    related: [
      { label: "Dr. Shreyank Math Tutor", href: "/dr-shreyank-math-tutor" },
      { label: "About the Centre", href: "/dr-shreyank-educare" },
      CONTACT,
    ],
  },
  {
    slug: "dr-shreyank-math-tutor",
    cluster: "Brand",
    metaTitle: "Dr. Shreyank Math Tutor | Burnaby & Vancouver",
    metaDescription:
      "Expert math tutoring from Dr. Shreyank — Pre-Calculus, Calculus and Grades 6–12 math in Burnaby & Vancouver, in person or online. 5★ rated. Free consultation.",
    h1: "Dr. Shreyank — Expert Math Tutor",
    heroSubheading:
      "Struggling with math? Learn from a PhD-qualified math specialist who turns confusion into clarity, one step at a time.",
    intro: [
      "Math is where most students either build or lose confidence — and it's where Dr. Shreyank Educare shines. From foundational Grade 6 skills to Pre-Calculus 12 and university calculus, our math tutoring is precise, patient and results-focused.",
      "We diagnose exactly where understanding breaks down and rebuild it with clear, step-by-step teaching that sticks.",
    ],
    sections: [
      {
        heading: "Math We Tutor",
        points: [
          "Grades 6–10 math foundations",
          "Pre-Calculus 11 & 12",
          "Calculus 12 & university calculus",
          "IB & AP mathematics",
          "Word problems & problem solving",
          "Provincial & final exam prep",
        ],
      },
      {
        heading: "How We Help",
        body: [
          "Sessions are one-on-one and mapped to your class, so every lesson reinforces what you're learning at school.",
          "We focus on the reasoning behind the math, so students can solve unfamiliar problems — exactly what exams demand.",
        ],
      },
    ],
    faqs: [
      {
        question: "What levels of math do you tutor?",
        answer:
          "Everything from Grade 6 foundations through Pre-Calculus 12, Calculus and university-level math, including IB and AP.",
      },
      {
        question: "Is tutoring in person or online?",
        answer:
          "Both — in person in Burnaby or online across Metro Vancouver.",
      },
      {
        question: "Can you help before an exam?",
        answer:
          "Yes. We offer focused final and provincial exam preparation with targeted review and practice.",
      },
    ],
    related: [
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      CONTACT,
    ],
  },

  // ────────────────────────── CORE LOCAL ──────────────────────────
  {
    slug: "best-math-tutor-burnaby",
    cluster: "Core Local",
    location: "Burnaby",
    metaTitle: "Best Math Tutor in Burnaby | PhD-Led, 5★ Rated",
    metaDescription:
      "Looking for the best math tutor in Burnaby? PhD-led, 5★-rated one-on-one math tutoring for Grades 6–12 and university. Proven results. Free consultation.",
    h1: "Best Math Tutor in Burnaby",
    heroSubheading:
      "PhD-led, 5★-rated math tutoring with a track record of real grade improvements — trusted by Burnaby families for Grades 6–12 and university.",
    intro: [
      "Choosing the best math tutor in Burnaby comes down to three things: genuine expertise, personalised attention, and proven results. Dr. Shreyank Educare delivers all three — PhD-led teaching, true one-on-one sessions, and 5★ reviews from local families.",
      "We don't just help students get the answer; we make sure they understand why, so improvement lasts well beyond the next test.",
    ],
    sections: [
      {
        heading: "What Makes Us Burnaby's Top Choice",
        points: [
          "PhD-qualified, 10+ years' experience",
          "One-on-one, curriculum-aligned",
          "5★ rated by parents",
          "In-person in person in Burnaby",
          "Proven grade improvements",
          "Strong exam preparation",
        ],
      },
      {
        heading: "Results That Speak",
        body: [
          "Our students routinely move up letter grades and, just as importantly, rebuild their confidence in math.",
          "Every plan is tailored to your child's class and goals, and we keep parents updated on progress throughout.",
        ],
      },
    ],
    faqs: [
      {
        question: "What makes a math tutor the 'best' in Burnaby?",
        answer:
          "Genuine subject expertise, personalised one-on-one teaching, and a proven record of results — all of which Dr. Shreyank Educare offers, PhD-led and 5★ rated.",
      },
      {
        question: "Do you tutor all levels of math?",
        answer:
          "Yes — Grades 6–12 through Pre-Calculus, Calculus and university math, including IB and AP.",
      },
      {
        question: "In person or online?",
        answer:
          "in person in Burnaby, with online tutoring available too.",
      },
    ],
    related: [
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Private Math Tutor in Burnaby", href: "/private-math-tutor-burnaby" },
      { label: "Math Tutoring in Burnaby", href: "/math-tutor-burnaby" },
    ],
  },
  {
    slug: "best-math-tutor-vancouver",
    cluster: "Core Local",
    location: "Vancouver",
    metaTitle: "Best Math Tutor in Vancouver | PhD-Led, 5★ Rated",
    metaDescription:
      "The best math tutor in Vancouver: PhD-led, 5★-rated one-on-one tutoring for Grades 6–12 and university, online or nearby in Burnaby. Free consultation.",
    h1: "Best Math Tutor in Vancouver",
    heroSubheading:
      "Expert, PhD-led math tutoring for Vancouver students — online across the city or in person in person nearby in Burnaby.",
    intro: [
      "Vancouver families searching for the best math tutor want an expert who can actually lift grades and confidence. Dr. Shreyank Educare pairs PhD-led teaching with flexible online sessions across Vancouver and in-person options nearby in Burnaby.",
      "From Kitsilano to Kerrisdale and the East Side, students get math tutoring built around their class, their pace and their goals.",
    ],
    sections: [
      {
        heading: "Why Vancouver Students Choose Us",
        points: [
          "PhD-qualified expert tutors",
          "Flexible online across Vancouver",
          "One-on-one, curriculum-aligned",
          "IB & AP experience",
          "5★ parent reviews",
          "Proven results",
        ],
      },
      {
        heading: "Online or In Person",
        body: [
          "Most Vancouver families choose flexible online sessions; others attend in person in Burnaby, a short SkyTrain ride away.",
          "Either way, we align every lesson to the BC curriculum and your student's exact coursework.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor Vancouver students online?",
        answer:
          "Yes. Most Vancouver students learn with us online, with in-person sessions available in person in Burnaby.",
      },
      {
        question: "Can you help with IB and AP math?",
        answer:
          "Yes — we regularly support IB and AP mathematics alongside the standard BC curriculum.",
      },
      {
        question: "What grades do you cover?",
        answer:
          "Grades 6–12 and university, including Pre-Calculus and Calculus.",
      },
    ],
    related: [
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      { label: "Vancouver Math Tutoring (All Levels)", href: "/math-tutoring-vancouver" },
      CONTACT,
    ],
  },
  {
    slug: "math-tutoring-burnaby",
    cluster: "Core Local",
    location: "Burnaby",
    metaTitle: "Math Tutoring in Burnaby | Grades 6–12 & University",
    metaDescription:
      "Personalized math tutoring in Burnaby for Grades 6–12 and university — Pre-Calculus, Calculus and more. PhD-led, in person or online. Book a free consultation.",
    h1: "Math Tutoring in Burnaby",
    heroSubheading:
      "One-on-one math tutoring in Burnaby that builds real understanding — from foundations to Pre-Calculus 12, Calculus and university math.",
    intro: [
      "Effective math tutoring meets a student exactly where they are and moves them forward step by step. Our Burnaby math tutoring does precisely that, with PhD-led, one-on-one sessions aligned to the BC curriculum.",
      "Whether your child needs to fill gaps, keep pace, or push for top marks, we build a plan around their class and goals.",
    ],
    sections: [
      {
        heading: "Math Levels We Cover",
        points: [
          "Grades 6–10 foundations",
          "Pre-Calculus 11 & 12",
          "Calculus 12",
          "University calculus & algebra",
          "IB & AP math",
          "Exam preparation",
        ],
      },
      {
        heading: "How Our Tutoring Works",
        body: [
          "We start with a diagnostic to pinpoint gaps, then teach the underlying concepts and reinforce them with targeted practice.",
          "Sessions run in person in Burnaby or online, and parents receive honest progress updates.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should my child attend math tutoring?",
        answer:
          "It depends on goals and timeline — many students do well with weekly sessions, which we scale up before exams.",
      },
      {
        question: "Do you follow the BC curriculum?",
        answer:
          "Yes, and we align each session to your child's specific class and teacher's material.",
      },
      {
        question: "Is tutoring in person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Best Math Tutor in Burnaby", href: "/best-math-tutor-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Pre-Calculus 12 Tutor in Burnaby", href: "/pre-calculus-12-tutor-burnaby" },
    ],
  },
  {
    slug: "math-tutoring-vancouver",
    cluster: "Core Local",
    location: "Vancouver",
    metaTitle: "Math Tutoring in Vancouver | Grades 6–12 & University",
    metaDescription:
      "Expert math tutoring in Vancouver for Grades 6–12 and university — online or nearby in Burnaby. Pre-Calculus, Calculus, IB & AP. Book a free consultation.",
    h1: "Math Tutoring in Vancouver",
    heroSubheading:
      "Flexible, expert math tutoring for Vancouver students — online across the city or in person in person nearby in Burnaby.",
    intro: [
      "Our Vancouver math tutoring gives students across the city access to PhD-led, one-on-one help without the commute. Sessions are online and fully aligned to the BC curriculum, IB and AP coursework.",
      "From building foundations to mastering Pre-Calculus 12 and calculus, we help students improve steadily and prepare thoroughly for exams.",
    ],
    sections: [
      {
        heading: "What We Cover",
        points: [
          "Grades 6–10 math",
          "Pre-Calculus 11 & 12",
          "Calculus 12 & university math",
          "IB & AP mathematics",
          "Problem solving & word problems",
          "Final & provincial exam prep",
        ],
      },
      {
        heading: "Online, Around Your Schedule",
        body: [
          "Vancouver students learn live and online with a shared whiteboard, ideal for working through problems together in real time.",
          "In-person sessions are available in person in Burnaby for families who prefer them.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is online math tutoring effective?",
        answer:
          "Yes — live one-on-one online sessions with a shared whiteboard are just as effective as in person, and far more convenient for Vancouver families.",
      },
      {
        question: "Do you cover IB and AP?",
        answer: "Yes, alongside the standard BC curriculum.",
      },
      {
        question: "Can you prepare my child for exams?",
        answer:
          "Absolutely — we offer focused final and provincial exam preparation.",
      },
    ],
    related: [
      { label: "Best Math Tutor in Vancouver", href: "/best-math-tutor-vancouver" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      CONTACT,
    ],
  },
  {
    slug: "private-math-tutor-burnaby",
    cluster: "Core Local",
    location: "Burnaby",
    metaTitle: "Private Math Tutor in Burnaby | One-on-One PhD-Led Help",
    metaDescription:
      "Private, one-on-one math tutoring in Burnaby with a PhD-qualified tutor. Personalized plans for Grades 6–12 and university. Book a free consultation.",
    h1: "Private Math Tutor in Burnaby",
    heroSubheading:
      "Dedicated one-on-one attention from a PhD-qualified math tutor — a plan built entirely around your child.",
    intro: [
      "A private math tutor means your child is never one of many. At Dr. Shreyank Educare, every private session is one-on-one, so teaching adapts in real time to exactly what your student needs.",
      "This focused attention is why private tutoring produces faster, more durable improvement than crowded group classes.",
    ],
    sections: [
      {
        heading: "Benefits of Private Tutoring",
        points: [
          "Undivided one-on-one attention",
          "Plan tailored to your child",
          "Faster gap-closing",
          "Flexible scheduling",
          "Aligned to your class",
          "Honest progress updates",
        ],
      },
      {
        heading: "Personalised From Day One",
        body: [
          "We begin with a diagnostic, then design a private plan around your child's strengths, gaps and timeline.",
          "Sessions run in person in Burnaby or online, whichever works best for your family.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is private tutoring better than group classes?",
        answer:
          "For most students, yes — one-on-one attention lets the tutor adapt to your child in real time and close gaps faster.",
      },
      {
        question: "Can I choose in-person or online?",
        answer: "Yes, both are available in Burnaby.",
      },
      {
        question: "What levels do you cover?",
        answer: "Grades 6–12 through Pre-Calculus, Calculus and university math.",
      },
    ],
    related: [
      { label: "One-on-One Math Tutor in Burnaby", href: "/one-on-one-math-tutor-burnaby" },
      { label: "Best Math Tutor in Burnaby", href: "/best-math-tutor-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "one-on-one-math-tutor-burnaby",
    cluster: "Core Local",
    location: "Burnaby",
    metaTitle: "One-on-One Math Tutor in Burnaby | Personalized PhD-Led",
    metaDescription:
      "One-on-one math tutoring in Burnaby with a PhD-qualified tutor — fully personalized for Grades 6–12 and university. In person or online. Free consultation.",
    h1: "One-on-One Math Tutor in Burnaby",
    heroSubheading:
      "Focused, personalized one-on-one math tutoring in Burnaby — every minute of the session is about your student.",
    intro: [
      "One-on-one tutoring is the gold standard for a reason: the tutor can see exactly where a student hesitates and adjust immediately. Our Burnaby one-on-one math sessions are built entirely around your child.",
      "That focus turns confusion into clarity quickly and rebuilds the confidence that group settings often can't.",
    ],
    sections: [
      {
        heading: "Why One-on-One Works",
        points: [
          "Real-time, adaptive teaching",
          "No falling behind in a group",
          "Questions answered instantly",
          "Pace set by your child",
          "Curriculum-aligned",
          "Measurable progress",
        ],
      },
      {
        heading: "Built Around Your Child",
        body: [
          "After a short diagnostic, we tailor every session to your student's class, gaps and goals.",
          "Choose in-person sessions in Burnaby or online — the personalised approach is the same.",
        ],
      },
    ],
    faqs: [
      {
        question: "What makes one-on-one tutoring effective?",
        answer:
          "The tutor adapts in real time to your child, answering questions instantly and setting the pace to their needs.",
      },
      {
        question: "Do you tutor all math levels?",
        answer: "Yes — Grades 6–12 through Pre-Calculus, Calculus and university math.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Private Math Tutor in Burnaby", href: "/private-math-tutor-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "science-tutor-burnaby",
    cluster: "Core Local",
    location: "Burnaby",
    metaTitle: "Science Tutor in Burnaby | Physics, Chemistry & Biology",
    metaDescription:
      "Expert science tutoring in Burnaby — Physics, Chemistry and Biology for Grades 6–12 and university. PhD-led, in person or online. Book a free consultation.",
    h1: "Science Tutor in Burnaby",
    heroSubheading:
      "PhD-led science tutoring in Burnaby across Physics, Chemistry and Biology — concept-first teaching that makes science make sense.",
    intro: [
      "Science rewards understanding, not memorisation. Our Burnaby science tutors teach the mechanisms and reasoning behind Physics, Chemistry and Biology so students can tackle any question, not just the ones they've seen.",
      "From Grade 6 science through Physics 12, Chemistry 12 and university courses, we align every session to the BC curriculum.",
    ],
    sections: [
      {
        heading: "Sciences We Tutor",
        points: [
          "Physics 11 & 12",
          "Chemistry 11 & 12",
          "Biology 11 & 12",
          "Grades 6–10 science",
          "University sciences",
          "Lab & exam preparation",
        ],
      },
      {
        heading: "How We Teach Science",
        body: [
          "We connect each concept to the underlying principles and to problem-solving, so understanding transfers across topics.",
          "Sessions run in person in Burnaby or online, with clear diagrams and step-by-step working.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which sciences do you tutor in Burnaby?",
        answer:
          "Physics, Chemistry and Biology for Grades 6–12 and university, plus general Grade 6–10 science.",
      },
      {
        question: "Do you help with lab reports and exams?",
        answer:
          "Yes — we support concept mastery, problem solving, and lab and exam preparation.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "STEM Tutor in Vancouver", href: "/stem-tutor-vancouver" },
    ],
  },
  {
    slug: "stem-tutor-vancouver",
    cluster: "Core Local",
    location: "Vancouver",
    metaTitle: "STEM Tutor in Vancouver | Math, Science & Coding",
    metaDescription:
      "STEM tutoring in Vancouver — Math, Physics, Chemistry and Coding for Grades 6–12 and university. PhD-led, online or nearby in Burnaby. Free consultation.",
    h1: "STEM Tutor in Vancouver",
    heroSubheading:
      "One expert team for all of STEM — Math, Physics, Chemistry and Coding — for Vancouver students in Grades 6–12 and university.",
    intro: [
      "STEM subjects reinforce each other: strong math underpins physics, and logical thinking powers coding. Our Vancouver STEM tutoring joins these dots, helping students build skills that transfer across math, science and computer science.",
      "Sessions are online across Vancouver, or in person in Burnaby, and always aligned to the BC curriculum.",
    ],
    sections: [
      {
        heading: "STEM Areas We Cover",
        points: [
          "Mathematics (Grades 6–12, university)",
          "Physics 11 & 12",
          "Chemistry 11 & 12",
          "Coding & computer science",
          "IB & AP STEM subjects",
          "Problem solving",
        ],
      },
      {
        heading: "A Connected Approach",
        body: [
          "Because the same team covers math, science and coding, we can strengthen the shared foundations that hold STEM subjects together.",
          "That integrated view helps students who are strong in one area lift the others too.",
        ],
      },
    ],
    faqs: [
      {
        question: "What counts as STEM tutoring?",
        answer:
          "For us, STEM covers Math, Physics, Chemistry and Coding/computer science for Grades 6–12 and university.",
      },
      {
        question: "Do you tutor Vancouver students online?",
        answer:
          "Yes, online across Vancouver, with in-person sessions in Burnaby.",
      },
      {
        question: "Can one tutor cover multiple STEM subjects?",
        answer:
          "Yes — our team's connected approach strengthens the shared foundations across STEM.",
      },
    ],
    related: [
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      CONTACT,
    ],
  },

  // ───────────────────── PRE-CALCULUS / CALCULUS ─────────────────────
  {
    slug: "pre-calculus-11-tutor-burnaby",
    cluster: "Pre-Calculus",
    location: "Burnaby",
    metaTitle: "Pre-Calculus 11 Tutor in Burnaby | BC Curriculum Help",
    metaDescription:
      "Pre-Calculus 11 tutoring in Burnaby — master factoring, trig, and functions with a PhD-led tutor. In person or online. Book a free consultation.",
    h1: "Pre-Calculus 11 Tutor in Burnaby",
    heroSubheading:
      "Build the foundation that Pre-Calculus 12 and Calculus depend on, with clear one-on-one Pre-Calculus 11 tutoring in Burnaby.",
    intro: [
      "Pre-Calculus 11 introduces the algebra, trigonometry and functions that everything after it relies on. Getting these right in Grade 11 makes Grade 12 far smoother — and getting them wrong makes it much harder.",
      "Our Burnaby Pre-Calculus 11 tutoring builds these foundations properly, so students are ready for what comes next.",
    ],
    sections: [
      {
        heading: "Pre-Calculus 11 Topics",
        points: [
          "Factoring & rational expressions",
          "Radicals & absolute value",
          "Quadratic functions & equations",
          "Trigonometry & the sine/cosine laws",
          "Systems of equations",
          "Sequences & series",
        ],
      },
      {
        heading: "Why It Matters",
        body: [
          "Weak Pre-Calculus 11 foundations are the most common reason students struggle in Pre-Calculus 12 and Calculus.",
          "We make sure every core skill is solid, with targeted practice and clear explanations.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does Pre-Calculus 11 cover?",
        answer:
          "Factoring, radicals, quadratics, trigonometry, systems of equations, and sequences and series — the foundations for Pre-Calculus 12.",
      },
      {
        question: "My child is struggling — can you help mid-year?",
        answer:
          "Yes. We start with a diagnostic and target the exact gaps holding them back.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Tutor in Burnaby", href: "/pre-calculus-12-tutor-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "pre-calculus-12-tutor-burnaby",
    cluster: "Pre-Calculus",
    location: "Burnaby",
    metaTitle: "Pre-Calculus 12 Tutor in Burnaby | Exam-Ready Help",
    metaDescription:
      "Pre-Calculus 12 tutoring in Burnaby — trig identities, logarithms, and functions mastered step by step with a PhD-led tutor. Free consultation.",
    h1: "Pre-Calculus 12 Tutor in Burnaby",
    heroSubheading:
      "One of the most demanding Grade 12 courses, made manageable — clear, exam-focused Pre-Calculus 12 tutoring in Burnaby.",
    intro: [
      "Pre-Calculus 12 is a gateway course for university and a demanding one, spanning transformations, trig identities, logarithms and more. Small gaps compound quickly, which is why focused tutoring makes such a difference.",
      "Our Burnaby Pre-Calculus 12 tutoring breaks each topic into clear steps and prepares students thoroughly for the final exam.",
    ],
    sections: [
      {
        heading: "Pre-Calculus 12 Topics",
        points: [
          "Transformations of functions",
          "Trigonometric identities & equations",
          "Exponential & logarithmic functions",
          "Polynomial & rational functions",
          "Geometric sequences & series",
          "Function operations & inverses",
        ],
      },
      {
        heading: "Exam-Focused Teaching",
        body: [
          "We cover the concepts and the exam techniques — the identity proofs, log equations and transformation questions that appear on the final.",
          "Sessions build toward exam day with steady review and targeted practice.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is Pre-Calculus 12 so challenging?",
        answer:
          "It packs demanding topics — trig identities, logarithms, transformations — into one course, and gaps compound quickly. Focused tutoring keeps students on track.",
      },
      {
        question: "Do you prepare for the final exam?",
        answer:
          "Yes — we build toward the final with review and practice on the exact question types it tests.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Final Exam Review", href: "/pre-calculus-12-final-exam-review" },
      { label: "Calculus 12 Tutor in Burnaby", href: "/calculus-12-tutor-burnaby" },
      { label: "Pre-Calculus 11 Tutor in Burnaby", href: "/pre-calculus-11-tutor-burnaby" },
    ],
  },
  {
    slug: "pre-calculus-12-tutor-vancouver",
    cluster: "Pre-Calculus",
    location: "Vancouver",
    metaTitle: "Pre-Calculus 12 Tutor in Vancouver | Exam-Ready Help",
    metaDescription:
      "Pre-Calculus 12 tutoring in Vancouver — trig identities, logarithms and functions mastered with a PhD-led tutor, online or nearby in Burnaby. Free consultation.",
    h1: "Pre-Calculus 12 Tutor in Vancouver",
    heroSubheading:
      "Clear, exam-focused Pre-Calculus 12 tutoring for Vancouver students — online across the city or in person nearby in Burnaby.",
    intro: [
      "For Vancouver students, Pre-Calculus 12 is a key stepping stone to university math and science programs. It's also demanding, covering trig identities, logarithms and transformations that trip many students up.",
      "Our online Pre-Calculus 12 tutoring gives Vancouver students expert, one-on-one help without the commute.",
    ],
    sections: [
      {
        heading: "What We Cover",
        points: [
          "Transformations of functions",
          "Trigonometric identities & equations",
          "Exponential & logarithmic functions",
          "Polynomial & rational functions",
          "Sequences & series",
          "Final exam preparation",
        ],
      },
      {
        heading: "Online & Exam-Ready",
        body: [
          "Live online sessions with a shared whiteboard make it easy to work through identity proofs and log equations together.",
          "We prepare students specifically for the Pre-Calculus 12 final exam.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor Pre-Calculus 12 online for Vancouver students?",
        answer:
          "Yes — live one-on-one online sessions, with in-person options in person in Burnaby.",
      },
      {
        question: "Can you help before the final exam?",
        answer: "Yes, with focused final-exam review and practice.",
      },
      {
        question: "Is Pre-Calculus 12 needed for university?",
        answer:
          "It's a common prerequisite for university math, science and engineering programs, so a strong grade matters.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Final Exam Review", href: "/pre-calculus-12-final-exam-review" },
      { label: "Calculus 12 Tutor in Vancouver", href: "/calculus-12-tutor-vancouver" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
    ],
  },
  {
    slug: "calculus-12-tutor-burnaby",
    cluster: "Calculus",
    location: "Burnaby",
    metaTitle: "Calculus 12 Tutor in Burnaby | Limits, Derivatives & More",
    metaDescription:
      "Calculus 12 tutoring in Burnaby — limits, derivatives and integrals explained clearly by a PhD-led tutor. In person or online. Book a free consultation.",
    h1: "Calculus 12 Tutor in Burnaby",
    heroSubheading:
      "Master limits, derivatives and integrals with clear, one-on-one Calculus 12 tutoring in Burnaby.",
    intro: [
      "Calculus 12 is where math becomes about change — and where strong Pre-Calculus foundations really pay off. It's a rewarding course, but limits, derivatives and integrals need clear teaching to click.",
      "Our Burnaby Calculus 12 tutoring makes the concepts intuitive and the problem-solving reliable.",
    ],
    sections: [
      {
        heading: "Calculus 12 Topics",
        points: [
          "Limits & continuity",
          "Derivatives & rules",
          "Applications of derivatives",
          "Optimization & related rates",
          "Introduction to integration",
          "Curve sketching",
        ],
      },
      {
        heading: "From Concept to Confidence",
        body: [
          "We teach the intuition behind calculus first, then the techniques, so students understand what a derivative or integral actually means.",
          "This foundation also sets students up for university calculus.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does Calculus 12 cover?",
        answer:
          "Limits, derivatives, applications like optimization and related rates, and an introduction to integration.",
      },
      {
        question: "Will this help with university calculus?",
        answer:
          "Yes — a strong Calculus 12 foundation makes first-year university calculus far more manageable.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Tutor in Burnaby", href: "/pre-calculus-12-tutor-burnaby" },
      { label: "AP Calculus Tutor in Burnaby", href: "/ap-calculus-tutor-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
    ],
  },
  {
    slug: "calculus-12-tutor-vancouver",
    cluster: "Calculus",
    location: "Vancouver",
    metaTitle: "Calculus 12 Tutor in Vancouver | Limits, Derivatives & More",
    metaDescription:
      "Calculus 12 tutoring in Vancouver — limits, derivatives and integrals made clear by a PhD-led tutor, online or nearby in Burnaby. Book a free consultation.",
    h1: "Calculus 12 Tutor in Vancouver",
    heroSubheading:
      "Clear, one-on-one Calculus 12 tutoring for Vancouver students — online across the city or in person nearby in Burnaby.",
    intro: [
      "Calculus 12 introduces the mathematics of change and is a strong signal for university readiness. For Vancouver students, mastering it opens doors to competitive STEM programs.",
      "Our online Calculus 12 tutoring makes limits, derivatives and integrals genuinely understandable.",
    ],
    sections: [
      {
        heading: "What We Cover",
        points: [
          "Limits & continuity",
          "Derivatives & differentiation rules",
          "Applications of derivatives",
          "Optimization & related rates",
          "Introduction to integrals",
          "University-prep foundations",
        ],
      },
      {
        heading: "Online & University-Ready",
        body: [
          "Live online sessions let us work through derivations and problems together in real time.",
          "We also connect Calculus 12 to what university courses will expect next.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor Calculus 12 online?",
        answer:
          "Yes — live one-on-one online sessions for Vancouver students, with in-person options in Burnaby.",
      },
      {
        question: "Does Calculus 12 help for university?",
        answer:
          "Very much — it builds the foundation for first-year university calculus.",
      },
      {
        question: "What if I'm behind?",
        answer:
          "We diagnose gaps first — often in Pre-Calculus — and rebuild them quickly.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Tutor in Vancouver", href: "/pre-calculus-12-tutor-vancouver" },
      { label: "University Math Tutor", href: "/university-professional" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
    ],
  },

  // ─────────────────────── CHEMISTRY / PHYSICS ───────────────────────
  {
    slug: "chemistry-11-tutor-burnaby",
    cluster: "Chemistry",
    location: "Burnaby",
    metaTitle: "Chemistry 11 Tutor in Burnaby | BC Curriculum Help",
    metaDescription:
      "Chemistry 11 tutoring in Burnaby — moles, stoichiometry and bonding explained clearly by a PhD-led tutor. In person or online. Book a free consultation.",
    h1: "Chemistry 11 Tutor in Burnaby",
    heroSubheading:
      "Build a strong Chemistry 11 foundation — moles, stoichiometry and bonding — with clear one-on-one tutoring in Burnaby.",
    intro: [
      "Chemistry 11 introduces the core ideas that all later chemistry depends on: the mole concept, stoichiometry, bonding and reactions. Students who master these early find Chemistry 12 far easier.",
      "Our Burnaby Chemistry 11 tutoring makes these foundations solid with clear explanations and plenty of guided practice.",
    ],
    sections: [
      {
        heading: "Chemistry 11 Topics",
        points: [
          "The mole & Avogadro's number",
          "Stoichiometry",
          "Atomic theory & the periodic table",
          "Chemical bonding",
          "Types of reactions",
          "Solutions & concentration",
        ],
      },
      {
        heading: "Foundations First",
        body: [
          "Stoichiometry trips up many students; we make the mole concept intuitive so calculations become routine.",
          "Every session aligns to your child's Chemistry 11 class and the BC curriculum.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does Chemistry 11 cover?",
        answer:
          "The mole concept, stoichiometry, atomic theory, bonding, reaction types and solutions.",
      },
      {
        question: "My child struggles with the mole concept — can you help?",
        answer:
          "Yes, it's one of the most common sticking points, and we make it intuitive with step-by-step teaching.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "chemistry-12-tutor-burnaby",
    cluster: "Chemistry",
    location: "Burnaby",
    metaTitle: "Chemistry 12 Tutor in Burnaby | Exam-Ready Help",
    metaDescription:
      "Chemistry 12 tutoring in Burnaby — kinetics, equilibrium and acids/bases mastered with a PhD-led tutor. In person or online. Book a free consultation.",
    h1: "Chemistry 12 Tutor in Burnaby",
    heroSubheading:
      "Master the demanding Chemistry 12 units — kinetics, equilibrium, acids and bases — with clear tutoring in Burnaby.",
    intro: [
      "Chemistry 12 is a challenging, university-prep course covering reaction kinetics, equilibrium, solubility and acid-base chemistry. Each unit builds on the last, so staying on top of it matters.",
      "Our Burnaby Chemistry 12 tutoring makes these topics clear and prepares students thoroughly for the final exam.",
    ],
    sections: [
      {
        heading: "Chemistry 12 Topics",
        points: [
          "Reaction kinetics",
          "Chemical equilibrium",
          "Solubility equilibria",
          "Acids & bases",
          "Titrations & pH",
          "Final exam preparation",
        ],
      },
      {
        heading: "Clear, Exam-Focused Teaching",
        body: [
          "We connect equilibrium and acid-base concepts so they reinforce each other rather than feeling like separate hurdles.",
          "Sessions build toward the final exam with targeted practice on the highest-value question types.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the hardest Chemistry 12 units?",
        answer:
          "Equilibrium and acid-base chemistry challenge most students; we make them clear with concept-first teaching.",
      },
      {
        question: "Do you prepare for the Chemistry 12 final?",
        answer:
          "Yes — see our dedicated Chemistry 12 final exam review, or we can fold it into regular sessions.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Chemistry 12 Final Exam Review", href: "/chemistry-12-final-exam-review" },
      { label: "Chemistry 11 Tutor in Burnaby", href: "/chemistry-11-tutor-burnaby" },
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
    ],
  },
  {
    slug: "physics-11-tutor-burnaby",
    cluster: "Physics",
    location: "Burnaby",
    metaTitle: "Physics 11 Tutor in Burnaby | Kinematics & Forces",
    metaDescription:
      "Physics 11 tutoring in Burnaby — kinematics, forces and energy explained clearly by a PhD-led tutor. In person or online. Book a free consultation.",
    h1: "Physics 11 Tutor in Burnaby",
    heroSubheading:
      "Get kinematics, forces and energy right the first time with clear one-on-one Physics 11 tutoring in Burnaby.",
    intro: [
      "Physics 11 is where students first meet the mathematical description of motion and forces. The concepts are intuitive once taught well — and confusing when they aren't.",
      "Our Burnaby Physics 11 tutoring pairs clear conceptual teaching with the math skills physics demands.",
    ],
    sections: [
      {
        heading: "Physics 11 Topics",
        points: [
          "Kinematics (motion)",
          "Forces & Newton's laws",
          "Work, energy & power",
          "Momentum",
          "Waves & sound",
          "Problem-solving technique",
        ],
      },
      {
        heading: "Physics Is Applied Math",
        body: [
          "Many Physics 11 struggles are really math struggles; we strengthen both together.",
          "We teach a consistent problem-solving method students can apply to any question.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does Physics 11 cover?",
        answer:
          "Kinematics, forces and Newton's laws, energy, momentum, and waves and sound.",
      },
      {
        question: "My child is good at concepts but loses marks on problems — why?",
        answer:
          "Usually it's the underlying math or setup; we build a reliable problem-solving method to fix that.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "physics-12-tutor-burnaby",
    cluster: "Physics",
    location: "Burnaby",
    metaTitle: "Physics 12 Tutor in Burnaby | Exam-Ready Help",
    metaDescription:
      "Physics 12 tutoring in Burnaby — dynamics, circular motion and electricity mastered with a PhD-led tutor. In person or online. Book a free consultation.",
    h1: "Physics 12 Tutor in Burnaby",
    heroSubheading:
      "Master the challenging Physics 12 units — dynamics, circular motion, fields and electricity — with clear tutoring in Burnaby.",
    intro: [
      "Physics 12 raises the bar with vectors, dynamics, circular motion, and electricity and magnetism. It rewards students who truly understand the concepts and can apply them under exam conditions.",
      "Our Burnaby Physics 12 tutoring builds that deep understanding and the exam technique to go with it.",
    ],
    sections: [
      {
        heading: "Physics 12 Topics",
        points: [
          "Vector kinematics & dynamics",
          "Circular motion & gravitation",
          "Momentum & energy",
          "Electrostatics & circuits",
          "Electromagnetism",
          "Exam problem solving",
        ],
      },
      {
        heading: "Concept + Technique",
        body: [
          "We teach the physics deeply and drill the problem-solving process examiners look for.",
          "Sessions can build toward the Physics 12 final exam with targeted review.",
        ],
      },
    ],
    faqs: [
      {
        question: "What makes Physics 12 hard?",
        answer:
          "Vectors, dynamics and electromagnetism demand both conceptual understanding and strong math. We build both.",
      },
      {
        question: "Do you help with the final exam?",
        answer:
          "Yes — see our Physics 12 final exam review, or we can include it in regular sessions.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Physics 12 Final Exam Review", href: "/physics-12-final-exam-review" },
      { label: "Physics 11 Tutor in Burnaby", href: "/physics-11-tutor-burnaby" },
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
    ],
  },

  // ────────────────────────────── IB / AP ──────────────────────────────
  {
    slug: "ap-calculus-tutor-burnaby",
    cluster: "IB/AP",
    location: "Burnaby",
    metaTitle: "AP Calculus Tutor in Burnaby | AB & BC Exam Prep",
    metaDescription:
      "AP Calculus AB & BC tutoring in Burnaby — PhD-led help mastering derivatives, integrals and exam technique for a top score. Book a free consultation.",
    h1: "AP Calculus Tutor in Burnaby",
    heroSubheading:
      "Aim for a 4 or 5. Expert AP Calculus AB & BC tutoring in Burnaby, focused on deep understanding and exam technique.",
    intro: [
      "AP Calculus rewards students who understand the concepts and can execute under timed conditions. Our Burnaby AP Calculus tutoring covers both AB and BC, targeting the exact skills the College Board exam tests.",
      "We combine concept mastery with AP-style problem practice so students walk into the exam prepared for a top score.",
    ],
    sections: [
      {
        heading: "AP Calculus Coverage",
        points: [
          "Limits & continuity",
          "Derivatives & applications",
          "Integrals & the FTC",
          "Differential equations",
          "Series (BC)",
          "AP exam technique & FRQs",
        ],
      },
      {
        heading: "Built for the AP Exam",
        body: [
          "We practise multiple-choice and free-response questions in the AP format, with a focus on showing work the way graders expect.",
          "Sessions are paced to your exam date for steady, confident preparation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor both AP Calculus AB and BC?",
        answer:
          "Yes — we cover both AB and BC, tailored to your course and exam.",
      },
      {
        question: "How do you prepare for the AP exam?",
        answer:
          "Concept mastery plus AP-style multiple-choice and free-response practice, with graded-style feedback.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "AP Calculus Tutor in Vancouver", href: "/ap-calculus-tutor-vancouver" },
      { label: "Calculus 12 Tutor in Burnaby", href: "/calculus-12-tutor-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "ap-calculus-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "AP Calculus Tutor in Vancouver | AB & BC Exam Prep",
    metaDescription:
      "AP Calculus AB & BC tutoring in Vancouver — PhD-led exam prep for derivatives, integrals and series, online or nearby in Burnaby. Book a free consultation.",
    h1: "AP Calculus Tutor in Vancouver",
    heroSubheading:
      "Expert AP Calculus AB & BC tutoring for Vancouver students — online across the city or in person nearby in Burnaby.",
    intro: [
      "For Vancouver students targeting competitive universities, a strong AP Calculus score matters. Our online AP Calculus tutoring covers AB and BC with the concept depth and exam technique the College Board rewards.",
      "You get expert, one-on-one help without the commute, paced to your exam date.",
    ],
    sections: [
      {
        heading: "AP Calculus Coverage",
        points: [
          "Limits & continuity",
          "Derivatives & applications",
          "Integrals & the FTC",
          "Differential equations",
          "Series & convergence (BC)",
          "AP exam strategy",
        ],
      },
      {
        heading: "Online AP Prep",
        body: [
          "Live online sessions with a shared whiteboard are ideal for working AP free-response questions step by step.",
          "We tailor the plan to your exam timeline for confident, thorough preparation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor AP Calculus online?",
        answer:
          "Yes — live one-on-one online sessions for Vancouver students, plus in-person options in Burnaby.",
      },
      {
        question: "AB or BC?",
        answer: "We cover both, matched to your course.",
      },
      {
        question: "When should we start?",
        answer:
          "The earlier the better, but we build effective plans for any timeline before the exam.",
      },
    ],
    related: [
      { label: "AP Calculus Tutor in Burnaby", href: "/ap-calculus-tutor-burnaby" },
      { label: "IB Math Tutor in Vancouver", href: "/ib-math-tutor-vancouver" },
      CONTACT,
    ],
  },
  {
    slug: "ib-math-tutor-burnaby",
    cluster: "IB/AP",
    location: "Burnaby",
    metaTitle: "IB Math Tutor in Burnaby | AA & AI, SL & HL",
    metaDescription:
      "IB Math tutoring in Burnaby — Analysis & Approaches and Applications & Interpretation, SL & HL, with a PhD-led tutor. IA support too. Free consultation.",
    h1: "IB Math Tutor in Burnaby",
    heroSubheading:
      "Expert IB Math tutoring in Burnaby across AA and AI, SL and HL — including Internal Assessment support.",
    intro: [
      "IB Mathematics is rigorous and distinct from the BC curriculum, with its own AA and AI streams, SL and HL levels, and the Internal Assessment. Specialist help makes a real difference.",
      "Our Burnaby IB Math tutoring is tailored to your exact course and level, and includes guidance on the IA.",
    ],
    sections: [
      {
        heading: "IB Math We Cover",
        points: [
          "Analysis & Approaches (AA) SL & HL",
          "Applications & Interpretation (AI) SL & HL",
          "Calculus & functions",
          "Statistics & probability",
          "Internal Assessment (IA) support",
          "Exam preparation",
        ],
      },
      {
        heading: "IB-Specific Teaching",
        body: [
          "We know the IB assessment style and command terms, and teach to them — not just the underlying math.",
          "For the IA, we help students choose a strong topic and apply mathematics rigorously.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which IB Math courses do you tutor?",
        answer:
          "Both Analysis & Approaches (AA) and Applications & Interpretation (AI), at SL and HL.",
      },
      {
        question: "Do you help with the Internal Assessment?",
        answer:
          "Yes — from choosing a topic to applying the mathematics and meeting the IB criteria.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "IB Math Tutor in Vancouver", href: "/ib-math-tutor-vancouver" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
      CONTACT,
    ],
  },
  {
    slug: "ib-math-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "IB Math Tutor in Vancouver | AA & AI, SL & HL",
    metaDescription:
      "IB Math tutoring in Vancouver — Analysis & Approaches and Applications & Interpretation, SL & HL, plus IA support. Online or nearby in Burnaby. Free consultation.",
    h1: "IB Math Tutor in Vancouver",
    heroSubheading:
      "Specialist IB Math tutoring for Vancouver students across AA and AI, SL and HL — online or in person nearby in Burnaby.",
    intro: [
      "Vancouver's IB students need tutoring that understands the IB, not just math. We tutor both AA and AI at SL and HL, with the assessment style and Internal Assessment built in.",
      "Online sessions give Vancouver IB students expert, one-on-one support around a demanding schedule.",
    ],
    sections: [
      {
        heading: "IB Math We Cover",
        points: [
          "AA SL & HL",
          "AI SL & HL",
          "Calculus, functions & trigonometry",
          "Statistics & probability",
          "Internal Assessment support",
          "Exam preparation",
        ],
      },
      {
        heading: "Built for the IB",
        body: [
          "We teach to IB command terms and mark schemes so students earn the marks their understanding deserves.",
          "IA guidance helps students produce rigorous, well-scoped explorations.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor IB Math HL?",
        answer:
          "Yes — both AA and AI at HL and SL, for Vancouver students online or in person in Burnaby.",
      },
      {
        question: "Can you help with the IA?",
        answer: "Yes, from topic selection through to the finished exploration.",
      },
      {
        question: "How is IB Math different from BC math?",
        answer:
          "It has its own streams, assessment style and IA; we tutor specifically to those requirements.",
      },
    ],
    related: [
      { label: "IB Math HL Tutor in Vancouver", href: "/ib-math-hl-tutor-vancouver" },
      { label: "IB Math Tutor in Burnaby", href: "/ib-math-tutor-burnaby" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
    ],
  },
  {
    slug: "ib-math-hl-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "IB Math HL Tutor in Vancouver | AA HL Specialist Help",
    metaDescription:
      "IB Math HL tutoring in Vancouver — expert help with Analysis & Approaches HL, the toughest topics and the IA. Online or nearby in Burnaby. Free consultation.",
    h1: "IB Math HL Tutor in Vancouver",
    heroSubheading:
      "Take on the most demanding IB Math level with confidence — specialist AA HL tutoring for Vancouver students.",
    intro: [
      "IB Math HL (especially Analysis & Approaches) is among the most challenging high-school math courses anywhere, with deep calculus, proof and problem-solving. It demands a tutor who genuinely commands the material.",
      "Our Vancouver IB Math HL tutoring provides exactly that, with online, one-on-one support and IA guidance.",
    ],
    sections: [
      {
        heading: "IB Math HL Focus Areas",
        points: [
          "Advanced calculus",
          "Proof & reasoning",
          "Complex numbers",
          "Vectors",
          "Statistics & probability",
          "Internal Assessment (HL)",
        ],
      },
      {
        heading: "HL-Level Expertise",
        body: [
          "HL rewards genuine mathematical maturity; we build it through challenging, well-explained problems.",
          "We also support the HL IA, helping students scope and execute a rigorous exploration.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor IB Math AA HL?",
        answer:
          "Yes — Analysis & Approaches HL is one of our specialties, for Vancouver students online or in Burnaby.",
      },
      {
        question: "Is HL much harder than SL?",
        answer:
          "Yes — HL goes deeper and broader, especially in calculus and proof. Specialist tutoring helps significantly.",
      },
      {
        question: "Do you support the HL IA?",
        answer: "Yes, from topic to final exploration.",
      },
    ],
    related: [
      { label: "IB Math Tutor in Vancouver", href: "/ib-math-tutor-vancouver" },
      { label: "AP Calculus Tutor in Vancouver", href: "/ap-calculus-tutor-vancouver" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
    ],
  },

  // ──────────────────────────── EXAM PREP ────────────────────────────
  {
    slug: "pre-calculus-12-final-exam-review",
    cluster: "Exam Prep",
    metaTitle: "Pre-Calculus 12 Final Exam Review | Burnaby & Vancouver",
    metaDescription:
      "Pre-Calculus 12 final exam review tutoring — targeted, high-yield preparation on trig identities, logs and functions. In person or online. Free consultation.",
    h1: "Pre-Calculus 12 Final Exam Review",
    heroSubheading:
      "Walk into the Pre-Calculus 12 final prepared. Focused, high-yield exam review targeting the exact topics that carry the most marks.",
    intro: [
      "The Pre-Calculus 12 final exam covers a lot of ground, and last-minute cramming rarely works. A focused review that targets the highest-value topics and your specific weak spots is far more effective.",
      "Our exam-review sessions do exactly that — diagnose, prioritise, and practise the question types the final actually tests.",
    ],
    sections: [
      {
        heading: "What We Review",
        points: [
          "Trigonometric identities & equations",
          "Exponential & logarithmic equations",
          "Transformations of functions",
          "Polynomial & rational functions",
          "Sequences & series",
          "Timed exam practice",
        ],
      },
      {
        heading: "High-Yield & Timed",
        body: [
          "We start with a diagnostic to find where you lose marks, then focus review where it counts most.",
          "Timed practice builds the pacing and accuracy the final demands.",
        ],
      },
    ],
    faqs: [
      {
        question: "How soon before the exam should we start?",
        answer:
          "Even one to two focused weeks helps, though earlier is better. We tailor the plan to your timeline.",
      },
      {
        question: "Do you use real exam-style questions?",
        answer:
          "Yes — timed, exam-format practice on the highest-yield topics.",
      },
      {
        question: "In person or online?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Tutor in Burnaby", href: "/pre-calculus-12-tutor-burnaby" },
      { label: "Final Exam Review Tutoring in Burnaby", href: "/final-exam-review-tutoring-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "chemistry-12-final-exam-review",
    cluster: "Exam Prep",
    metaTitle: "Chemistry 12 Final Exam Review | Burnaby & Vancouver",
    metaDescription:
      "Chemistry 12 final exam review — targeted prep on equilibrium, kinetics and acids/bases with a PhD-led tutor. In person or online. Book a free consultation.",
    h1: "Chemistry 12 Final Exam Review",
    heroSubheading:
      "Focused Chemistry 12 final exam review — master equilibrium, kinetics and acid-base chemistry where the marks are.",
    intro: [
      "Chemistry 12's final exam leans heavily on equilibrium and acid-base chemistry — the very units students find hardest. A targeted review turns those into strengths.",
      "Our exam-review sessions prioritise the high-value topics and drill the calculation types the final tests.",
    ],
    sections: [
      {
        heading: "What We Review",
        points: [
          "Reaction kinetics",
          "Chemical & solubility equilibria",
          "Acids, bases & pH",
          "Titration calculations",
          "ICE tables & Ksp/Ka problems",
          "Timed exam practice",
        ],
      },
      {
        heading: "Targeted & Practical",
        body: [
          "We focus on the calculation-heavy topics that decide Chemistry 12 grades, with clear methods you can reuse.",
          "Timed practice sharpens speed and accuracy for exam day.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which topics matter most for the Chemistry 12 final?",
        answer:
          "Equilibrium and acid-base chemistry carry heavy weight; we prioritise them along with your weak spots.",
      },
      {
        question: "Do you cover calculation techniques?",
        answer:
          "Yes — ICE tables, Ksp/Ka problems and titrations, with reusable methods.",
      },
      {
        question: "In person or online?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "Final Exam Review Tutoring in Burnaby", href: "/final-exam-review-tutoring-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "physics-12-final-exam-review",
    cluster: "Exam Prep",
    metaTitle: "Physics 12 Final Exam Review | Burnaby & Vancouver",
    metaDescription:
      "Physics 12 final exam review — targeted prep on dynamics, circular motion and electricity with a PhD-led tutor. In person or online. Book a free consultation.",
    h1: "Physics 12 Final Exam Review",
    heroSubheading:
      "Focused Physics 12 final exam review — dynamics, circular motion and electricity, with the problem-solving technique examiners reward.",
    intro: [
      "The Physics 12 final tests both conceptual understanding and problem-solving under time pressure. A targeted review builds the exam technique that turns knowledge into marks.",
      "Our sessions prioritise the highest-value units and drill a consistent, exam-ready problem-solving method.",
    ],
    sections: [
      {
        heading: "What We Review",
        points: [
          "Vector dynamics",
          "Circular motion & gravitation",
          "Momentum & energy",
          "Electrostatics & circuits",
          "Electromagnetism",
          "Timed exam practice",
        ],
      },
      {
        heading: "Technique + Timing",
        body: [
          "We drill a reliable method for setting up and solving physics problems, which is where most marks are won or lost.",
          "Timed, exam-format practice builds confidence for the real thing.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do you improve exam problem-solving?",
        answer:
          "We teach a consistent method for reading, setting up and solving problems, then reinforce it with timed practice.",
      },
      {
        question: "Which units are most important?",
        answer:
          "Dynamics and electromagnetism carry heavy weight; we focus there and on your weak spots.",
      },
      {
        question: "In person or online?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "Final Exam Review Tutoring in Burnaby", href: "/final-exam-review-tutoring-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "final-exam-review-tutoring-burnaby",
    cluster: "Exam Prep",
    location: "Burnaby",
    metaTitle: "Final Exam Review Tutoring in Burnaby | Math & Science",
    metaDescription:
      "Final exam review tutoring in Burnaby for Math, Physics and Chemistry — targeted, high-yield prep and timed practice. In person or online. Free consultation.",
    h1: "Final Exam Review Tutoring in Burnaby",
    heroSubheading:
      "Make your final-exam study time count. Targeted review tutoring in Burnaby for Math, Physics and Chemistry.",
    intro: [
      "As finals approach, the difference between a good and great grade is often how you study, not how long. Our Burnaby final exam review tutoring focuses your effort on the highest-value topics and your specific weak spots.",
      "Across Math, Physics and Chemistry, we combine targeted review with timed, exam-format practice.",
    ],
    sections: [
      {
        heading: "Subjects We Review",
        points: [
          "Pre-Calculus 11 & 12",
          "Calculus 12",
          "Chemistry 11 & 12",
          "Physics 11 & 12",
          "Grades 8–10 math & science",
          "Timed exam practice",
        ],
      },
      {
        heading: "How Review Sessions Work",
        body: [
          "We diagnose where you lose marks, prioritise the topics that matter most, and practise them under timed conditions.",
          "Sessions run in person in Burnaby or online, on a schedule that fits your exam dates.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which subjects do you review?",
        answer:
          "Math (Pre-Calculus, Calculus), Physics and Chemistry for Grades 8–12, plus subject-specific final reviews.",
      },
      {
        question: "When should we book?",
        answer:
          "As early as possible before finals — but even focused short-term review helps a lot.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Final Exam Review", href: "/pre-calculus-12-final-exam-review" },
      { label: "Chemistry 12 Final Exam Review", href: "/chemistry-12-final-exam-review" },
      { label: "Physics 12 Final Exam Review", href: "/physics-12-final-exam-review" },
    ],
  },

  // ─────────────── CORE LOCAL (remaining) ───────────────
  {
    slug: "tutoring-burnaby",
    cluster: "Core Local",
    location: "Burnaby",
    metaTitle: "Tutoring in Burnaby | Math, Science & Coding | 5★ Rated",
    metaDescription:
      "PhD-led tutoring in Burnaby for Grades 6–12 and university — Math, Science and Coding. In person or online, 5★ rated. Book a free consultation.",
    h1: "Tutoring in Burnaby",
    heroSubheading:
      "A trusted Burnaby tutoring service for Math, Science and Coding — one-on-one, PhD-led, and built around each student's goals.",
    intro: [
      "Families across Burnaby come to Dr. Shreyank Educare for tutoring that actually moves the needle: clear teaching, personalised plans, and honest progress. We cover Math, Physics, Chemistry and Coding for Grades 6–12 and university.",
      "As a local, Burnaby-based tutor, we offer genuine in-person sessions alongside flexible online options.",
    ],
    sections: [
      {
        heading: "Subjects We Tutor in Burnaby",
        points: [
          "Math (Grades 6–12 & university)",
          "Physics 11 & 12",
          "Chemistry 11 & 12",
          "Pre-Calculus & Calculus",
          "IB, AP & BC curriculum",
          "Coding & computer science",
        ],
      },
      {
        heading: "Why Local Families Choose Us",
        body: [
          "Every plan is tailored to your child's class, and every session is one-on-one with a PhD-led tutor.",
          "We keep parents informed with honest progress updates throughout.",
        ],
      },
    ],
    faqs: [
      {
        question: "What subjects do you tutor in Burnaby?",
        answer:
          "Math, Physics, Chemistry and Coding for Grades 6–12 and university, including IB, AP and the BC curriculum.",
      },
      {
        question: "Do you offer in-person tutoring?",
        answer: "Yes — in person in Burnaby, plus online options.",
      },
      {
        question: "How do I start?",
        answer: "Book a free 30-minute consultation to discuss goals and build a plan.",
      },
    ],
    related: [
      { label: "Best Math Tutor in Burnaby", href: "/best-math-tutor-burnaby" },
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
      { label: "All-Subject Tutoring in Vancouver", href: "/tutoring-vancouver" },
    ],
  },
  {
    slug: "tutoring-vancouver",
    cluster: "Core Local",
    location: "Vancouver",
    metaTitle: "Tutoring in Vancouver | Math, Science & Coding | 5★ Rated",
    metaDescription:
      "Expert tutoring in Vancouver for Grades 6–12 and university — Math, Science and Coding. Online across the city or nearby in Burnaby. Free consultation.",
    h1: "Tutoring in Vancouver",
    heroSubheading:
      "Flexible, expert tutoring for Vancouver students in Math, Science and Coding — online across the city or in person nearby in Burnaby.",
    intro: [
      "Vancouver families choose Dr. Shreyank Educare for PhD-led tutoring that fits busy schedules and delivers real results. We help students across Math, Physics, Chemistry and Coding, from Grade 6 through university.",
      "Most Vancouver students learn with us online, with in-person options in person nearby in Burnaby.",
    ],
    sections: [
      {
        heading: "Subjects We Tutor",
        points: [
          "Math (Grades 6–12 & university)",
          "Physics & Chemistry 11–12",
          "Pre-Calculus & Calculus",
          "IB & AP",
          "Coding & computer science",
          "Exam preparation",
        ],
      },
      {
        heading: "Online & Flexible",
        body: [
          "Live one-on-one online sessions make expert tutoring convenient for Vancouver families.",
          "We align every lesson to the BC curriculum and your student's coursework.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is online tutoring effective for Vancouver students?",
        answer:
          "Yes — live, one-on-one online sessions with a shared whiteboard are highly effective and convenient.",
      },
      {
        question: "Which subjects do you cover?",
        answer: "Math, Physics, Chemistry and Coding for Grades 6–12 and university.",
      },
      {
        question: "Do you offer in-person options?",
        answer: "Yes, in person in Burnaby.",
      },
    ],
    related: [
      { label: "Best Math Tutor in Vancouver", href: "/best-math-tutor-vancouver" },
      { label: "STEM Tutor in Vancouver", href: "/stem-tutor-vancouver" },
      { label: "All-Subject Tutoring in Burnaby", href: "/tutoring-burnaby" },
    ],
  },
  {
    slug: "science-tutoring-vancouver",
    cluster: "Core Local",
    location: "Vancouver",
    metaTitle: "Science Tutoring in Vancouver | Physics, Chemistry & Biology",
    metaDescription:
      "Science tutoring in Vancouver — Physics, Chemistry and Biology for Grades 6–12 and university. PhD-led, online or nearby in Burnaby. Free consultation.",
    h1: "Science Tutoring in Vancouver",
    heroSubheading:
      "Concept-first Physics, Chemistry and Biology tutoring for Vancouver students — online across the city or in person nearby in Burnaby.",
    intro: [
      "Vancouver students master science fastest when they understand the underlying mechanisms. Our science tutoring teaches Physics, Chemistry and Biology that way — building reasoning, not memorisation.",
      "Sessions are online across Vancouver, or in person in Burnaby, aligned to the BC curriculum.",
    ],
    sections: [
      {
        heading: "Sciences We Cover",
        points: [
          "Physics 11 & 12",
          "Chemistry 11 & 12",
          "Biology 11 & 12",
          "Grades 6–10 science",
          "University sciences",
          "Exam & lab prep",
        ],
      },
      {
        heading: "Understanding First",
        body: [
          "We connect each concept to principles and problem-solving, so knowledge transfers across topics and exams.",
          "Clear diagrams and step-by-step working make even tough units approachable.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which sciences do you tutor?",
        answer: "Physics, Chemistry and Biology for Grades 6–12 and university.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "Do you help before exams?",
        answer: "Yes — targeted exam and lab preparation.",
      },
    ],
    related: [
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "STEM Tutor in Vancouver", href: "/stem-tutor-vancouver" },
    ],
  },
  {
    slug: "stem-tutoring-burnaby",
    cluster: "Core Local",
    location: "Burnaby",
    metaTitle: "STEM Tutoring in Burnaby | Math, Science & Coding",
    metaDescription:
      "STEM tutoring in Burnaby — Math, Physics, Chemistry and Coding for Grades 6–12 and university. PhD-led, in person or online. Book a free consultation.",
    h1: "STEM Tutoring in Burnaby",
    heroSubheading:
      "One expert team for Math, Science and Coding — connected STEM tutoring in Burnaby that builds transferable skills.",
    intro: [
      "STEM subjects reinforce each other, and our Burnaby STEM tutoring joins the dots between strong math, clear physics and logical coding.",
      "In-person in person in Burnaby or online, we help Grades 6–12 and university students build skills that carry across math, science and computer science.",
    ],
    sections: [
      {
        heading: "STEM Areas We Cover",
        points: [
          "Mathematics",
          "Physics 11 & 12",
          "Chemistry 11 & 12",
          "Coding & computer science",
          "IB & AP STEM",
          "Problem solving",
        ],
      },
      {
        heading: "A Connected Approach",
        body: [
          "Because one team covers math, science and coding, we strengthen the shared foundations that underpin STEM success.",
          "That integrated view lifts students who are strong in one area across the others.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is STEM tutoring?",
        answer: "Math, Physics, Chemistry and Coding for Grades 6–12 and university.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
      {
        question: "Can one team cover multiple STEM subjects?",
        answer: "Yes — our connected approach strengthens shared foundations.",
      },
    ],
    related: [
      { label: "STEM Tutor in Vancouver", href: "/stem-tutor-vancouver" },
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
      { label: "Coding Tutor in Burnaby", href: "/coding-tutor-burnaby" },
    ],
  },
  {
    slug: "math-tutor-near-me",
    cluster: "Near Me",
    metaTitle: "Math Tutor Near Me | Burnaby & Vancouver | 5★ Rated",
    metaDescription:
      "Looking for a math tutor near you in Burnaby or Vancouver? PhD-led, 5★-rated one-on-one math tutoring, in person or online. Book a free consultation.",
    h1: "Math Tutor Near Me — Burnaby & Vancouver",
    heroSubheading:
      "Searching for a math tutor near you? If you're in Burnaby, Vancouver or nearby, Dr. Shreyank Educare offers expert, 5★-rated help in person and online.",
    intro: [
      "When you search for a \"math tutor near me\" in the Burnaby–Vancouver area, you want someone genuinely expert, conveniently located, and proven. Dr. Shreyank Educare is a Burnaby-based, PhD-led tutoring service serving students across Metro Vancouver.",
      "Attend in person in Burnaby or learn online from anywhere nearby — either way you get the same expert, one-on-one teaching.",
    ],
    sections: [
      {
        heading: "Convenient for Metro Vancouver",
        points: [
          "In-person sessions in Burnaby",
          "Online across Metro Vancouver",
          "Flexible scheduling",
          "Grades 6–12 & university",
          "Pre-Calculus & Calculus",
          "5★ parent reviews",
        ],
      },
      {
        heading: "Find Us on Google",
        body: [
          "You can find our reviews and location on our Google Business Profile, making it easy to see we're the trusted local choice.",
          "Book a free consultation and we'll recommend the best format for your family.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where are you located?",
        answer:
          "our Burnaby location is in Burnaby, and we serve students across Metro Vancouver in person and online.",
      },
      {
        question: "Do you offer in-person tutoring near me?",
        answer:
          "If you're in or near Burnaby, yes — plus online tutoring anywhere in the region.",
      },
      {
        question: "What math levels do you cover?",
        answer: "Grades 6–12 through Pre-Calculus, Calculus and university math.",
      },
    ],
    related: [
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      { label: "Tutoring Locations", href: "/locations" },
    ],
  },

  // ─────────────── EXAM PREP (remaining) ───────────────
  {
    slug: "exam-prep-tutor-vancouver",
    cluster: "Exam Prep",
    location: "Vancouver",
    metaTitle: "Exam Prep Tutor in Vancouver | Math & Science",
    metaDescription:
      "Exam prep tutoring in Vancouver for Math, Physics and Chemistry — high-yield review and timed practice. Online or in Burnaby. Free consultation.",
    h1: "Exam Prep Tutor in Vancouver",
    heroSubheading:
      "Make your study time count with focused, high-yield exam preparation for Vancouver students in Math and Science.",
    intro: [
      "Great exam results come from studying smart, not just long. Our Vancouver exam-prep tutoring targets the highest-value topics and your specific weak spots across Math, Physics and Chemistry.",
      "Sessions combine targeted review with timed, exam-format practice, online or in person nearby in Burnaby.",
    ],
    sections: [
      {
        heading: "What We Prepare You For",
        points: [
          "Provincial & final exams",
          "Pre-Calculus & Calculus",
          "Chemistry & Physics 11–12",
          "IB & AP exams",
          "Timed practice",
          "Exam technique",
        ],
      },
      {
        heading: "Diagnose, Prioritise, Practise",
        body: [
          "We find where you lose marks, focus review there, and build pacing with timed practice.",
          "Plans are mapped to your exam date for steady, confident preparation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which exams do you prepare students for?",
        answer:
          "Provincial and final exams in Math, Physics and Chemistry, plus IB and AP exams.",
      },
      {
        question: "How early should we start?",
        answer: "Earlier is better, but even focused short-term prep helps significantly.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available for Vancouver students.",
      },
    ],
    related: [
      { label: "Final Exam Review Tutoring in Burnaby", href: "/final-exam-review-tutoring-burnaby" },
      { label: "AP Calculus Exam Prep in Vancouver", href: "/ap-calculus-exam-prep-vancouver" },
      { label: "IB Math Exam Preparation in Vancouver", href: "/ib-math-exam-preparation-vancouver" },
    ],
  },
  {
    slug: "ap-calculus-exam-prep-vancouver",
    cluster: "Exam Prep",
    location: "Vancouver",
    metaTitle: "AP Calculus Exam Prep in Vancouver | AB & BC",
    metaDescription:
      "AP Calculus AB & BC exam prep in Vancouver — targeted review, FRQ practice and exam strategy for a top score. Online or nearby in Burnaby. Free consultation.",
    h1: "AP Calculus Exam Prep in Vancouver",
    heroSubheading:
      "Score higher on the AP Calculus AB or BC exam with focused, format-specific preparation for Vancouver students.",
    intro: [
      "The AP Calculus exam rewards accuracy under time pressure and clear free-response work. Our Vancouver AP Calculus exam prep targets exactly those skills for both AB and BC.",
      "We combine high-yield topic review with AP-format multiple-choice and free-response practice, paced to your exam date.",
    ],
    sections: [
      {
        heading: "Exam-Prep Focus",
        points: [
          "Derivatives & applications",
          "Integrals & the FTC",
          "Series (BC)",
          "Free-response technique",
          "Multiple-choice strategy",
          "Timed practice",
        ],
      },
      {
        heading: "Format-Specific Practice",
        body: [
          "We practise AP-style questions and coach the work-showing graders expect, so you capture every earned mark.",
          "Sessions build steadily toward exam day.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you prep for both AB and BC?",
        answer: "Yes, matched to your exam.",
      },
      {
        question: "Do you use real AP-format questions?",
        answer: "Yes — multiple-choice and free-response in the AP format.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "AP Calculus Tutor in Vancouver", href: "/ap-calculus-tutor-vancouver" },
      { label: "Exam Prep Tutor in Vancouver", href: "/exam-prep-tutor-vancouver" },
      CONTACT,
    ],
  },
  {
    slug: "ib-math-exam-preparation-vancouver",
    cluster: "Exam Prep",
    location: "Vancouver",
    metaTitle: "IB Math Exam Preparation in Vancouver | AA & AI",
    metaDescription:
      "IB Math exam preparation in Vancouver — AA & AI, SL & HL. Targeted review, paper practice and exam technique. Online or nearby in Burnaby. Free consultation.",
    h1: "IB Math Exam Preparation in Vancouver",
    heroSubheading:
      "Prepare for IB Math Paper 1, 2 and 3 with specialist, exam-focused tutoring for Vancouver students across AA and AI.",
    intro: [
      "IB Math exams demand command of both content and IB technique. Our Vancouver IB Math exam preparation covers AA and AI at SL and HL, with paper-specific practice.",
      "We target the command terms and question styles the IB uses, so students earn the marks their understanding deserves.",
    ],
    sections: [
      {
        heading: "IB Exam-Prep Focus",
        points: [
          "Paper 1, 2 & 3 technique",
          "Calculus & functions",
          "Statistics & probability",
          "Command-term practice",
          "Calculator skills",
          "Timed past papers",
        ],
      },
      {
        heading: "Built for the IB",
        body: [
          "We drill IB past papers and mark schemes so students know exactly what examiners want.",
          "Plans are paced to the IB exam timetable.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you cover AA and AI?",
        answer: "Yes — both, at SL and HL.",
      },
      {
        question: "Do you use IB past papers?",
        answer: "Yes — timed past-paper practice with mark-scheme feedback.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available for Vancouver students.",
      },
    ],
    related: [
      { label: "IB Math Tutor in Vancouver", href: "/ib-math-tutor-vancouver" },
      { label: "IB Math HL Tutor in Vancouver", href: "/ib-math-hl-tutor-vancouver" },
      { label: "Exam Prep Tutor in Vancouver", href: "/exam-prep-tutor-vancouver" },
    ],
  },
  {
    slug: "crash-course-pre-calculus-12",
    cluster: "Exam Prep",
    metaTitle: "Crash Course Pre-Calculus 12 | Intensive Exam Prep",
    metaDescription:
      "Intensive Pre-Calculus 12 crash course — cover the highest-yield topics fast before your exam. PhD-led, online or in Burnaby. Book a free consultation.",
    h1: "Pre-Calculus 12 Crash Course",
    heroSubheading:
      "Short on time before the exam? An intensive Pre-Calculus 12 crash course focused on the topics that matter most.",
    intro: [
      "When the exam is close, an intensive crash course beats scattered self-study. We compress Pre-Calculus 12 into focused sessions on the highest-yield topics and your weak spots.",
      "It's fast, targeted, and built to lift your score quickly.",
    ],
    sections: [
      {
        heading: "Crash-Course Coverage",
        points: [
          "Trig identities & equations",
          "Logarithms & exponentials",
          "Transformations",
          "Polynomial & rational functions",
          "Sequences & series",
          "Rapid timed practice",
        ],
      },
      {
        heading: "Fast and Focused",
        body: [
          "We prioritise ruthlessly — the topics with the most marks and your specific gaps.",
          "Expect concentrated review plus quick, exam-style practice.",
        ],
      },
    ],
    faqs: [
      {
        question: "How short can a crash course be?",
        answer:
          "We tailor it to your timeline — even a few intensive sessions can make a real difference.",
      },
      {
        question: "Is it just for exams?",
        answer: "Yes — it's designed for fast, exam-focused improvement.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Final Exam Review", href: "/pre-calculus-12-final-exam-review" },
      { label: "Pre-Calculus 12 Tutor in Burnaby", href: "/pre-calculus-12-tutor-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "test-prep-tutor-burnaby",
    cluster: "Exam Prep",
    location: "Burnaby",
    metaTitle: "Test Prep Tutor in Burnaby | Exams, Provincials & More",
    metaDescription:
      "Test prep tutoring in Burnaby for school exams, provincial assessments and standardized tests. PhD-led, targeted and effective. Book a free consultation.",
    h1: "Test Prep Tutor in Burnaby",
    heroSubheading:
      "Focused test preparation in Burnaby — school exams, provincial assessments and beyond, with a proven, targeted method.",
    intro: [
      "Test prep is about strategy as much as content. Our Burnaby test-prep tutoring builds both — mastering the material and the exam technique that turns knowledge into marks.",
      "We tailor preparation to the specific test, from school finals to provincial numeracy assessments.",
    ],
    sections: [
      {
        heading: "Tests We Prepare For",
        points: [
          "School midterms & finals",
          "Provincial numeracy assessment",
          "Math & science subject tests",
          "IB & AP exams",
          "Timed practice",
          "Test-taking strategy",
        ],
      },
      {
        heading: "Strategy + Content",
        body: [
          "We diagnose gaps, review high-value topics, and drill exam technique with timed practice.",
          "Plans are built around each test's format and your timeline.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which tests do you prepare students for?",
        answer:
          "School exams, provincial assessments, and IB/AP exams in Math and Science.",
      },
      {
        question: "Do you teach test-taking strategy?",
        answer: "Yes — pacing, question selection and technique alongside content.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Final Exam Review Tutoring in Burnaby", href: "/final-exam-review-tutoring-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      CONTACT,
    ],
  },

  // ─────────────── SEASONAL ───────────────
  {
    slug: "summer-math-tutoring-burnaby",
    cluster: "Seasonal",
    location: "Burnaby",
    metaTitle: "Summer Math Tutoring in Burnaby | Get Ahead for Fall",
    metaDescription:
      "Summer math tutoring in Burnaby — close gaps or get ahead for next year with PhD-led, one-on-one sessions. In person or online. Book a free consultation.",
    h1: "Summer Math Tutoring in Burnaby",
    heroSubheading:
      "Use the summer to close gaps or get ahead. Focused, flexible summer math tutoring in Burnaby for Grades 6–12.",
    intro: [
      "Summer is the ideal time to catch up on last year's gaps or preview next year's math — without the pressure of daily homework. Our Burnaby summer math tutoring makes the most of the break.",
      "Whether your child needs to solidify Pre-Calculus foundations or jump ahead, we build a summer plan around their goals.",
    ],
    sections: [
      {
        heading: "Summer Options",
        points: [
          "Catch-up on gaps",
          "Preview next year's math",
          "Pre-Calculus readiness",
          "Foundations & problem solving",
          "Flexible summer scheduling",
          "In person or online",
        ],
      },
      {
        heading: "A Head Start for Fall",
        body: [
          "Students who tutor over summer often start the school year more confident and ahead of the curve.",
          "We keep it engaging and focused, not overwhelming.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is summer tutoring worth it?",
        answer:
          "Yes — it's a low-pressure way to close gaps or get ahead, and students start fall more confident.",
      },
      {
        question: "How often should we meet in summer?",
        answer: "It's flexible; we tailor frequency to your goals.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Summer Tutoring in Burnaby", href: "/summer-tutoring-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Pre-Calculus 11 Tutor in Burnaby", href: "/pre-calculus-11-tutor-burnaby" },
    ],
  },
  {
    slug: "summer-tutoring-burnaby",
    cluster: "Seasonal",
    location: "Burnaby",
    metaTitle: "Summer Tutoring in Burnaby | Math, Science & Coding",
    metaDescription:
      "Summer tutoring in Burnaby — Math, Science and Coding for Grades 6–12. Close gaps or get ahead with PhD-led sessions. In person or online. Free consultation.",
    h1: "Summer Tutoring in Burnaby",
    heroSubheading:
      "Make summer count with flexible tutoring in Math, Science and Coding — catch up, keep sharp, or get ahead.",
    intro: [
      "The long break is a chance to turn last year's weak spots into strengths, or to preview next year across Math, Science and Coding. Our Burnaby summer tutoring is flexible and focused.",
      "We build a relaxed but productive summer plan around each student's goals.",
    ],
    sections: [
      {
        heading: "Summer Subjects",
        points: [
          "Math (Grades 6–12)",
          "Physics & Chemistry",
          "Coding & computer science",
          "Pre-Calculus readiness",
          "Study skills",
          "Flexible scheduling",
        ],
      },
      {
        heading: "Relaxed but Productive",
        body: [
          "Summer sessions keep skills sharp and confidence high without the school-year pressure.",
          "Students return in fall ready to hit the ground running.",
        ],
      },
    ],
    faqs: [
      {
        question: "What can we tutor over summer?",
        answer: "Math, Science and Coding — catch-up or getting ahead.",
      },
      {
        question: "Is scheduling flexible?",
        answer: "Yes, summer scheduling is flexible around your plans.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Summer Math Tutoring in Burnaby", href: "/summer-math-tutoring-burnaby" },
      { label: "All-Subject Tutoring in Burnaby", href: "/tutoring-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "summer-pre-calculus-course-burnaby",
    cluster: "Seasonal",
    location: "Burnaby",
    metaTitle: "Summer Pre-Calculus Course in Burnaby | Get Exam-Ready",
    metaDescription:
      "Summer Pre-Calculus course in Burnaby — build a strong foundation for Pre-Calculus 11/12 before the school year. PhD-led. Free consultation.",
    h1: "Summer Pre-Calculus Course in Burnaby",
    heroSubheading:
      "Get ahead in Pre-Calculus over the summer — a focused course that builds the foundations for a strong year.",
    intro: [
      "Pre-Calculus 11 and 12 are demanding, and a summer head start makes the school year far smoother. Our Burnaby summer Pre-Calculus course front-loads the key foundations.",
      "Students arrive in September already comfortable with topics that trip up their peers.",
    ],
    sections: [
      {
        heading: "Course Focus",
        points: [
          "Factoring & functions",
          "Trigonometry foundations",
          "Exponentials & logarithms",
          "Transformations",
          "Problem-solving technique",
          "Readiness for the school year",
        ],
      },
      {
        heading: "Why a Summer Head Start",
        body: [
          "Previewing Pre-Calculus over summer means students spend the school year deepening understanding rather than scrambling to keep up.",
          "It's one of the highest-ROI ways to use the break.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is the summer Pre-Calculus course for?",
        answer:
          "Students heading into Pre-Calculus 11 or 12 who want a strong head start.",
      },
      {
        question: "Is it one-on-one?",
        answer: "Yes — personalised, one-on-one sessions.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Pre-Calculus 11 Tutor in Burnaby", href: "/pre-calculus-11-tutor-burnaby" },
      { label: "Summer Math Tutoring in Burnaby", href: "/summer-math-tutoring-burnaby" },
      CONTACT,
    ],
  },

  // ─────────────── BIOLOGY ───────────────
  {
    slug: "biology-11-tutor-burnaby",
    cluster: "Biology",
    location: "Burnaby",
    metaTitle: "Biology 11 Tutor in Burnaby | BC Curriculum Help",
    metaDescription:
      "Biology 11 tutoring in Burnaby — cells, genetics and ecology explained clearly by an expert tutor. In person or online. Book a free consultation.",
    h1: "Biology 11 Tutor in Burnaby",
    heroSubheading:
      "Make Biology 11 click — clear, one-on-one tutoring in Burnaby covering cells, genetics, evolution and ecology.",
    intro: [
      "Biology 11 covers a broad sweep of life science, from cell biology to ecology. Strong understanding here sets students up for Biology 12 and pre-med pathways.",
      "Our Burnaby Biology 11 tutoring makes the concepts clear and memorable, aligned to the BC curriculum.",
    ],
    sections: [
      {
        heading: "Biology 11 Topics",
        points: [
          "Cell biology",
          "Genetics & heredity",
          "Evolution",
          "Ecology",
          "Biological diversity",
          "Exam preparation",
        ],
      },
      {
        heading: "Clear and Memorable",
        body: [
          "We use diagrams and real-world examples to make biology stick, not just memorised.",
          "Every session aligns to your child's Biology 11 class.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does Biology 11 cover?",
        answer: "Cells, genetics, evolution, ecology and biological diversity.",
      },
      {
        question: "Does this help for Biology 12 or pre-med?",
        answer: "Yes — a strong Biology 11 foundation supports both.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Biology 12 Tutor in Burnaby", href: "/biology-12-tutor-burnaby" },
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
      CONTACT,
    ],
  },
  {
    slug: "biology-12-tutor-burnaby",
    cluster: "Biology",
    location: "Burnaby",
    metaTitle: "Biology 12 Tutor in Burnaby | Anatomy & Physiology",
    metaDescription:
      "Biology 12 tutoring in Burnaby — human anatomy, physiology and biochemistry made clear. Great for pre-med pathways. In person or online. Free consultation.",
    h1: "Biology 12 Tutor in Burnaby",
    heroSubheading:
      "Master the detail-heavy Biology 12 curriculum — human anatomy, physiology and biochemistry — with clear tutoring in Burnaby.",
    intro: [
      "Biology 12 is content-dense, focusing on human anatomy, physiology and biochemistry — and it's a key course for students heading toward health sciences.",
      "Our Burnaby Biology 12 tutoring organises the detail into understandable systems and prepares students thoroughly for exams.",
    ],
    sections: [
      {
        heading: "Biology 12 Topics",
        points: [
          "Cell biology & biochemistry",
          "Digestive & circulatory systems",
          "Respiratory & excretory systems",
          "Nervous & endocrine systems",
          "Reproduction",
          "Exam preparation",
        ],
      },
      {
        heading: "Systems, Not Just Facts",
        body: [
          "We teach how the body's systems connect, so the volume of detail becomes a coherent picture rather than a memorisation marathon.",
          "This approach pays off on exams and in later health-science study.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Biology 12 good for pre-med?",
        answer:
          "Yes — its focus on human anatomy and physiology is excellent preparation for health-science pathways.",
      },
      {
        question: "How do you handle the heavy content?",
        answer:
          "We teach the systems and connections so detail becomes coherent, not overwhelming.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Biology 11 Tutor in Burnaby", href: "/biology-11-tutor-burnaby" },
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "University Biology Tutor", href: "/programs/university-biology" },
    ],
  },

  // ─────────────── BC CURRICULUM ───────────────
  {
    slug: "foundations-of-math-11-tutor-burnaby",
    cluster: "BC Curriculum",
    location: "Burnaby",
    metaTitle: "Foundations of Math 11 Tutor in Burnaby | BC Curriculum",
    metaDescription:
      "Foundations of Math 11 tutoring in Burnaby — statistics, geometry and reasoning made clear for the BC curriculum. In person or online. Free consultation.",
    h1: "Foundations of Math 11 Tutor in Burnaby",
    heroSubheading:
      "Clear, practical tutoring for Foundations of Math 11 in Burnaby — the applied BC math pathway.",
    intro: [
      "Foundations of Math 11 takes an applied, real-world approach to mathematics — statistics, geometry, and reasoning — and suits students heading toward arts, social sciences and many college programs.",
      "Our Burnaby tutoring makes each topic clear and connects it to practical use.",
    ],
    sections: [
      {
        heading: "Foundations of Math 11 Topics",
        points: [
          "Statistics & probability",
          "Geometry & trigonometry",
          "Systems of equations",
          "Financial mathematics",
          "Logical reasoning",
          "Exam preparation",
        ],
      },
      {
        heading: "Applied and Clear",
        body: [
          "We connect the math to real situations, which makes it more intuitive and easier to remember.",
          "Sessions align to your child's Foundations of Math 11 class.",
        ],
      },
    ],
    faqs: [
      {
        question: "How is Foundations of Math different from Pre-Calculus?",
        answer:
          "Foundations is more applied and statistics-focused; Pre-Calculus is more abstract and university-STEM-focused. We tutor both.",
      },
      {
        question: "Who takes Foundations of Math 11?",
        answer:
          "Students heading toward arts, social sciences and many college programs.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Workplace Math Tutor in Burnaby", href: "/workplace-math-tutor-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Pre-Calculus 11 Tutor in Burnaby", href: "/pre-calculus-11-tutor-burnaby" },
    ],
  },
  {
    slug: "workplace-math-tutor-burnaby",
    cluster: "BC Curriculum",
    location: "Burnaby",
    metaTitle: "Workplace Math Tutor in Burnaby | BC Curriculum Help",
    metaDescription:
      "Workplace Math tutoring in Burnaby — practical, real-world math for the BC curriculum. Clear, patient, one-on-one help. In person or online. Free consultation.",
    h1: "Workplace Math Tutor in Burnaby",
    heroSubheading:
      "Practical, real-world math support for the Workplace Math pathway — clear and patient tutoring in Burnaby.",
    intro: [
      "Workplace Mathematics focuses on the practical numeracy used in trades and everyday life. For students on this pathway, clear and patient support makes all the difference.",
      "Our Burnaby Workplace Math tutoring builds confidence with real-world, applied teaching.",
    ],
    sections: [
      {
        heading: "Workplace Math Topics",
        points: [
          "Measurement & geometry",
          "Proportional reasoning",
          "Financial literacy",
          "Data & statistics",
          "Trades-related math",
          "Exam preparation",
        ],
      },
      {
        heading: "Practical and Supportive",
        body: [
          "We tie every topic to real situations, which makes the math meaningful and easier to grasp.",
          "Sessions are patient, encouraging and aligned to the BC curriculum.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who takes Workplace Math?",
        answer:
          "Students on the applied/trades pathway who want practical, real-world numeracy.",
      },
      {
        question: "Can you help build confidence?",
        answer:
          "Yes — our patient, applied approach is designed to build confidence.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Foundations of Math 11 Tutor in Burnaby", href: "/foundations-of-math-11-tutor-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      CONTACT,
    ],
  },

  // ─────────────── BEST / TOP ───────────────
  {
    slug: "best-chemistry-tutor-burnaby",
    cluster: "Best/Top",
    location: "Burnaby",
    metaTitle: "Best Chemistry Tutor in Burnaby | PhD-Led, 5★ Rated",
    metaDescription:
      "The best chemistry tutor in Burnaby — PhD-led, 5★-rated help with Chemistry 11 & 12 and university chemistry. In person or online. Free consultation.",
    h1: "Best Chemistry Tutor in Burnaby",
    heroSubheading:
      "PhD-led, 5★-rated chemistry tutoring in Burnaby — from Chemistry 11 foundations to Chemistry 12 and university.",
    intro: [
      "The best chemistry tutor combines genuine subject depth with the patience to make abstract concepts concrete. Dr. Shreyank Educare delivers both, with PhD-led teaching and 5★ reviews.",
      "We help Burnaby students master the trickiest units — equilibrium, acids and bases, stoichiometry — with clear, methodical teaching.",
    ],
    sections: [
      {
        heading: "Why We're a Top Choice",
        points: [
          "PhD-qualified chemistry expertise",
          "Chemistry 11 & 12",
          "University chemistry",
          "Clear, methodical teaching",
          "Strong exam preparation",
          "5★ parent reviews",
        ],
      },
      {
        heading: "Concept-First Chemistry",
        body: [
          "We make abstract chemistry concrete with clear explanations and worked examples.",
          "Every plan is tailored to your student's class and goals.",
        ],
      },
    ],
    faqs: [
      {
        question: "What chemistry levels do you tutor?",
        answer: "Chemistry 11 & 12 and university chemistry.",
      },
      {
        question: "Do you help before exams?",
        answer: "Yes — targeted final-exam preparation.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "Chemistry 11 Tutor in Burnaby", href: "/chemistry-11-tutor-burnaby" },
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
    ],
  },
  {
    slug: "best-physics-tutor-burnaby",
    cluster: "Best/Top",
    location: "Burnaby",
    metaTitle: "Best Physics Tutor in Burnaby | PhD-Led, 5★ Rated",
    metaDescription:
      "The best physics tutor in Burnaby — PhD-led, 5★-rated help with Physics 11 & 12 and university physics. In person or online. Book a free consultation.",
    h1: "Best Physics Tutor in Burnaby",
    heroSubheading:
      "PhD-led, 5★-rated physics tutoring in Burnaby — clear concepts and reliable problem-solving from Physics 11 to university.",
    intro: [
      "Physics rewards students who understand the concepts and can solve problems systematically. The best physics tutor builds both — and that's exactly our focus.",
      "Burnaby students trust us for clear teaching of mechanics, electricity and more, plus the math skills physics demands.",
    ],
    sections: [
      {
        heading: "Why We're a Top Choice",
        points: [
          "PhD-qualified physics expertise",
          "Physics 11 & 12",
          "University physics",
          "Concept + problem-solving",
          "Strong exam preparation",
          "5★ parent reviews",
        ],
      },
      {
        heading: "Concept + Technique",
        body: [
          "We teach the physics deeply and drill a reliable problem-solving method.",
          "Plans are tailored to each student's class and exam timeline.",
        ],
      },
    ],
    faqs: [
      {
        question: "What physics levels do you tutor?",
        answer: "Physics 11 & 12 and university physics.",
      },
      {
        question: "My child understands concepts but loses marks — can you help?",
        answer:
          "Yes — usually it's the setup or math; we fix that with a reliable method.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "Physics 11 Tutor in Burnaby", href: "/physics-11-tutor-burnaby" },
      { label: "Science Tutor in Burnaby", href: "/science-tutor-burnaby" },
    ],
  },
  {
    slug: "best-ib-math-tutor-burnaby",
    cluster: "Best/Top",
    location: "Burnaby",
    metaTitle: "Best IB Math Tutor in Burnaby | AA & AI, SL & HL",
    metaDescription:
      "The best IB Math tutor in Burnaby — specialist help with AA & AI, SL & HL, and the IA. PhD-led, in person or online. Book a free consultation.",
    h1: "Best IB Math Tutor in Burnaby",
    heroSubheading:
      "Specialist, top-rated IB Math tutoring in Burnaby across AA and AI, SL and HL — including the Internal Assessment.",
    intro: [
      "The best IB Math tutor understands the IB itself — its streams, assessment style and IA — not just the mathematics. That's our specialty.",
      "Burnaby IB students rely on us for AA and AI at SL and HL, taught to the IB's exact requirements.",
    ],
    sections: [
      {
        heading: "Why We're a Top Choice",
        points: [
          "AA & AI, SL & HL",
          "IB assessment expertise",
          "Internal Assessment support",
          "Command-term teaching",
          "Exam preparation",
          "5★ reviews",
        ],
      },
      {
        heading: "IB-Specific Mastery",
        body: [
          "We teach to IB mark schemes and command terms so students earn every mark.",
          "For the IA, we guide topic choice and rigorous execution.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor IB Math HL?",
        answer: "Yes — AA and AI at HL and SL.",
      },
      {
        question: "Do you help with the IA?",
        answer: "Yes, from topic to finished exploration.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "IB Math Tutor in Burnaby", href: "/ib-math-tutor-burnaby" },
      { label: "IB Math HL Tutor in Vancouver", href: "/ib-math-hl-tutor-vancouver" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
    ],
  },
  {
    slug: "top-math-tutor-vancouver",
    cluster: "Best/Top",
    location: "Vancouver",
    metaTitle: "Top Math Tutor in Vancouver | PhD-Led, 5★ Rated",
    metaDescription:
      "A top-rated math tutor in Vancouver — PhD-led, 5★-rated one-on-one help for Grades 6–12 and university. Online or nearby in Burnaby. Free consultation.",
    h1: "Top Math Tutor in Vancouver",
    heroSubheading:
      "Among Vancouver's most trusted math tutors — PhD-led, 5★-rated, and proven to lift grades and confidence.",
    intro: [
      "A top math tutor in Vancouver should deliver genuine expertise, personalised teaching and results. Dr. Shreyank Educare offers all three, with flexible online sessions across the city.",
      "From Grade 6 through Pre-Calculus, Calculus and university math, we help students reach their potential.",
    ],
    sections: [
      {
        heading: "Why Students Rank Us Highly",
        points: [
          "PhD-qualified expertise",
          "One-on-one, curriculum-aligned",
          "IB & AP experience",
          "Flexible online sessions",
          "Proven results",
          "5★ reviews",
        ],
      },
      {
        heading: "Results-Focused",
        body: [
          "We focus on understanding, which produces improvement that lasts well beyond the next test.",
          "Plans are tailored to each student's class and goals.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor Vancouver students online?",
        answer: "Yes — online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "What levels do you cover?",
        answer: "Grades 6–12 through Pre-Calculus, Calculus and university math.",
      },
      {
        question: "Do you cover IB and AP?",
        answer: "Yes.",
      },
    ],
    related: [
      { label: "Best Math Tutor in Vancouver", href: "/best-math-tutor-vancouver" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
      { label: "Top Chemistry Tutor in Vancouver", href: "/top-chemistry-tutor-vancouver" },
    ],
  },
  {
    slug: "top-chemistry-tutor-vancouver",
    cluster: "Best/Top",
    location: "Vancouver",
    metaTitle: "Top Chemistry Tutor in Vancouver | PhD-Led, 5★ Rated",
    metaDescription:
      "A top chemistry tutor in Vancouver — PhD-led help with Chemistry 11 & 12 and university chemistry. Online or nearby in Burnaby. Book a free consultation.",
    h1: "Top Chemistry Tutor in Vancouver",
    heroSubheading:
      "Top-rated chemistry tutoring for Vancouver students — Chemistry 11, 12 and university, taught clearly and methodically.",
    intro: [
      "Chemistry rewards clear, methodical teaching, especially in its trickiest units. Our top-rated Vancouver chemistry tutoring makes equilibrium, acids and bases, and stoichiometry genuinely understandable.",
      "Sessions are online across Vancouver, or in person nearby in Burnaby.",
    ],
    sections: [
      {
        heading: "Why Students Rank Us Highly",
        points: [
          "PhD-qualified chemistry expertise",
          "Chemistry 11 & 12",
          "University chemistry",
          "Methodical, clear teaching",
          "Exam preparation",
          "5★ reviews",
        ],
      },
      {
        heading: "Clear and Methodical",
        body: [
          "We break the hardest units into clear steps and reliable methods.",
          "Plans are tailored to each student's course and exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "What chemistry levels do you tutor?",
        answer: "Chemistry 11 & 12 and university chemistry.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "Do you prepare for exams?",
        answer: "Yes — targeted exam preparation.",
      },
    ],
    related: [
      { label: "Top Math Tutor in Vancouver", href: "/top-math-tutor-vancouver" },
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "Science Tutoring in Vancouver", href: "/science-tutoring-vancouver" },
    ],
  },
  {
    slug: "top-physics-tutor-vancouver",
    cluster: "Best/Top",
    location: "Vancouver",
    metaTitle: "Top Physics Tutor in Vancouver | PhD-Led, 5★ Rated",
    metaDescription:
      "A top physics tutor in Vancouver — PhD-led help with Physics 11 & 12 and university physics. Online or nearby in Burnaby. Book a free consultation.",
    h1: "Top Physics Tutor in Vancouver",
    heroSubheading:
      "Top-rated physics tutoring for Vancouver students — clear concepts and reliable problem-solving from Physics 11 to university.",
    intro: [
      "The best physics tutoring builds deep conceptual understanding and systematic problem-solving. Our top-rated Vancouver physics tutors do exactly that.",
      "We help students across mechanics, electricity and more, online across Vancouver or in person nearby in Burnaby.",
    ],
    sections: [
      {
        heading: "Why Students Rank Us Highly",
        points: [
          "PhD-qualified physics expertise",
          "Physics 11 & 12",
          "University physics",
          "Concept + problem-solving",
          "Exam preparation",
          "5★ reviews",
        ],
      },
      {
        heading: "Concept + Technique",
        body: [
          "We teach the physics deeply and drill a reliable problem-solving method that wins marks.",
          "Plans are tailored to each student's course and exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "What physics levels do you tutor?",
        answer: "Physics 11 & 12 and university physics.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "Do you help with exam problem-solving?",
        answer: "Yes — a reliable method plus timed practice.",
      },
    ],
    related: [
      { label: "Top Math Tutor in Vancouver", href: "/top-math-tutor-vancouver" },
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "Science Tutoring in Vancouver", href: "/science-tutoring-vancouver" },
    ],
  },

  // ─────────────── IB / AP (remaining) ───────────────
  {
    slug: "ap-chemistry-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "AP Chemistry Tutor in Vancouver | Exam Prep",
    metaDescription:
      "AP Chemistry tutoring in Vancouver — thermodynamics, equilibrium and kinetics mastered for a top score. Online or nearby in Burnaby. Free consultation.",
    h1: "AP Chemistry Tutor in Vancouver",
    heroSubheading:
      "Expert AP Chemistry tutoring for Vancouver students — deep concepts plus AP-format practice for a strong score.",
    intro: [
      "AP Chemistry is demanding, spanning thermodynamics, equilibrium, kinetics and electrochemistry. Our Vancouver AP Chemistry tutoring builds the conceptual depth and exam technique the College Board rewards.",
      "Sessions are online across Vancouver, or in person nearby in Burnaby, and paced to your exam date.",
    ],
    sections: [
      {
        heading: "AP Chemistry Coverage",
        points: [
          "Atomic structure & bonding",
          "Thermodynamics",
          "Chemical equilibrium",
          "Kinetics",
          "Acids, bases & electrochemistry",
          "AP exam technique & FRQs",
        ],
      },
      {
        heading: "Built for the AP Exam",
        body: [
          "We combine concept mastery with AP-format multiple-choice and free-response practice.",
          "Sessions build steadily toward a confident exam day.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor AP Chemistry online?",
        answer: "Yes — for Vancouver students, with in-person options in Burnaby.",
      },
      {
        question: "How do you prepare for the exam?",
        answer: "Concept mastery plus AP-format multiple-choice and free-response practice.",
      },
      {
        question: "When should we start?",
        answer: "Earlier is better, but we build effective plans for any timeline.",
      },
    ],
    related: [
      { label: "AP Chemistry Tutor in Burnaby", href: "/ap-chemistry-tutor-burnaby" },
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "AP Calculus Tutor in Vancouver", href: "/ap-calculus-tutor-vancouver" },
    ],
  },
  {
    slug: "ap-chemistry-tutor-burnaby",
    cluster: "IB/AP",
    location: "Burnaby",
    metaTitle: "AP Chemistry Tutor in Burnaby | Exam Prep",
    metaDescription:
      "AP Chemistry tutoring in Burnaby — equilibrium, thermodynamics and kinetics mastered for a top score. In person or online. Book a free consultation.",
    h1: "AP Chemistry Tutor in Burnaby",
    heroSubheading:
      "Expert AP Chemistry tutoring in Burnaby — deep concepts plus AP-format practice for a strong score.",
    intro: [
      "AP Chemistry packs a lot into one year, and mastering equilibrium, thermodynamics and kinetics needs clear teaching. Our Burnaby AP Chemistry tutoring builds both understanding and exam technique.",
      "Attend in person in Burnaby or online, with sessions paced to your exam date.",
    ],
    sections: [
      {
        heading: "AP Chemistry Coverage",
        points: [
          "Atomic structure & bonding",
          "Thermodynamics",
          "Equilibrium & kinetics",
          "Acids & bases",
          "Electrochemistry",
          "AP exam technique",
        ],
      },
      {
        heading: "Concept + Exam Skill",
        body: [
          "We make the hardest AP Chemistry units clear, then drill AP-format practice.",
          "Plans are tailored to your exam timeline.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor AP Chemistry in Burnaby?",
        answer: "Yes — in person at our Burnaby location or online.",
      },
      {
        question: "Which units are hardest?",
        answer: "Equilibrium, thermodynamics and kinetics; we make them clear.",
      },
      {
        question: "Do you use AP-format questions?",
        answer: "Yes — multiple-choice and free-response practice.",
      },
    ],
    related: [
      { label: "AP Chemistry Tutor in Vancouver", href: "/ap-chemistry-tutor-vancouver" },
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "AP Calculus Tutor in Burnaby", href: "/ap-calculus-tutor-burnaby" },
    ],
  },
  {
    slug: "ap-physics-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "AP Physics Tutor in Vancouver | 1, 2 & C Exam Prep",
    metaDescription:
      "AP Physics tutoring in Vancouver — Physics 1, 2 and C, with concept mastery and AP exam technique. Online or nearby in Burnaby. Free consultation.",
    h1: "AP Physics Tutor in Vancouver",
    heroSubheading:
      "Expert AP Physics tutoring for Vancouver students across Physics 1, 2 and C — concepts and exam technique for a top score.",
    intro: [
      "AP Physics rewards genuine conceptual understanding and confident problem-solving, especially in the calculus-based C courses. Our Vancouver AP Physics tutoring builds both.",
      "We cover Physics 1, 2 and C online across Vancouver, or in person nearby in Burnaby, paced to your exam.",
    ],
    sections: [
      {
        heading: "AP Physics Coverage",
        points: [
          "Mechanics",
          "Electricity & magnetism",
          "Waves & optics",
          "Calculus-based Physics C",
          "Free-response technique",
          "Timed practice",
        ],
      },
      {
        heading: "Concept + Technique",
        body: [
          "We teach the physics deeply and drill AP-format free-response and multiple-choice questions.",
          "Sessions are paced to your exam date.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you cover AP Physics C?",
        answer: "Yes — including the calculus-based Physics C courses, plus 1 and 2.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "Do you use AP-format practice?",
        answer: "Yes — free-response and multiple-choice.",
      },
    ],
    related: [
      { label: "AP Physics Tutor in Burnaby", href: "/ap-physics-tutor-burnaby" },
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "AP Calculus Tutor in Vancouver", href: "/ap-calculus-tutor-vancouver" },
    ],
  },
  {
    slug: "ap-physics-tutor-burnaby",
    cluster: "IB/AP",
    location: "Burnaby",
    metaTitle: "AP Physics Tutor in Burnaby | 1, 2 & C Exam Prep",
    metaDescription:
      "AP Physics tutoring in Burnaby — Physics 1, 2 and C, concepts and AP exam technique for a top score. In person or online. Book a free consultation.",
    h1: "AP Physics Tutor in Burnaby",
    heroSubheading:
      "Expert AP Physics tutoring in Burnaby across Physics 1, 2 and C — concepts and exam technique for a top score.",
    intro: [
      "From mechanics to electromagnetism, AP Physics demands real understanding and strong problem-solving. Our Burnaby AP Physics tutoring covers Physics 1, 2 and the calculus-based C courses.",
      "Attend in person in Burnaby or online, paced to your exam date.",
    ],
    sections: [
      {
        heading: "AP Physics Coverage",
        points: [
          "Mechanics",
          "Electricity & magnetism",
          "Waves & optics",
          "Calculus-based Physics C",
          "Free-response technique",
          "Timed practice",
        ],
      },
      {
        heading: "Concept + Technique",
        body: [
          "We build deep understanding and a reliable problem-solving method, then practise AP-format questions.",
          "Plans are tailored to your exam timeline.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor AP Physics C?",
        answer: "Yes — the calculus-based C courses, plus Physics 1 and 2.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
      {
        question: "Do you use AP-format practice?",
        answer: "Yes.",
      },
    ],
    related: [
      { label: "AP Physics Tutor in Vancouver", href: "/ap-physics-tutor-vancouver" },
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "AP Calculus Tutor in Burnaby", href: "/ap-calculus-tutor-burnaby" },
    ],
  },
  {
    slug: "ap-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "AP Tutor in Vancouver | Calculus, Physics, Chemistry & More",
    metaDescription:
      "AP tutoring in Vancouver across Calculus, Physics, Chemistry, Biology & Statistics — exam prep for top scores. Online or in Burnaby. Free consultation.",
    h1: "AP Tutor in Vancouver",
    heroSubheading:
      "One expert team for your AP subjects — Calculus, Physics, Chemistry, Biology and Statistics — for Vancouver students.",
    intro: [
      "AP courses reward students who master content and exam technique. Our Vancouver AP tutoring spans the STEM APs, with concept depth and format-specific practice for each.",
      "Sessions are online across Vancouver, or in person nearby in Burnaby.",
    ],
    sections: [
      {
        heading: "AP Subjects We Tutor",
        points: [
          "AP Calculus AB & BC",
          "AP Physics 1, 2 & C",
          "AP Chemistry",
          "AP Biology",
          "AP Statistics",
          "AP exam strategy",
        ],
      },
      {
        heading: "One Team, Multiple APs",
        body: [
          "Students taking several APs benefit from a coordinated, consistent approach across subjects.",
          "We pace every subject to its exam date.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which AP subjects do you tutor?",
        answer: "AP Calculus, Physics, Chemistry, Biology and Statistics.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "Can one tutor help with multiple APs?",
        answer: "Yes — our team coordinates across your AP subjects.",
      },
    ],
    related: [
      { label: "AP Calculus Tutor in Vancouver", href: "/ap-calculus-tutor-vancouver" },
      { label: "AP Chemistry Tutor in Vancouver", href: "/ap-chemistry-tutor-vancouver" },
      { label: "AP Physics Tutor in Vancouver", href: "/ap-physics-tutor-vancouver" },
    ],
  },
  {
    slug: "ib-chemistry-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "IB Chemistry Tutor in Vancouver | SL & HL",
    metaDescription:
      "IB Chemistry tutoring in Vancouver — SL & HL, with IA support and exam technique. Online or nearby in Burnaby. Book a free consultation.",
    h1: "IB Chemistry Tutor in Vancouver",
    heroSubheading:
      "Specialist IB Chemistry tutoring for Vancouver students at SL and HL — including Internal Assessment support.",
    intro: [
      "IB Chemistry has its own depth, assessment style and Internal Assessment. Our Vancouver IB Chemistry tutoring is tailored to SL and HL and to the IB's exact requirements.",
      "We help students master the content and earn marks the IB way.",
    ],
    sections: [
      {
        heading: "IB Chemistry Coverage",
        points: [
          "Stoichiometry & bonding",
          "Energetics & kinetics",
          "Equilibrium & acids/bases",
          "Organic chemistry",
          "Internal Assessment support",
          "Exam technique",
        ],
      },
      {
        heading: "Built for the IB",
        body: [
          "We teach to IB command terms and mark schemes, and guide the IA from design to execution.",
          "Sessions cover both SL and HL depth.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor IB Chemistry HL?",
        answer: "Yes — SL and HL, for Vancouver students online or in Burnaby.",
      },
      {
        question: "Do you help with the IA?",
        answer: "Yes, from topic to finished write-up.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "IB Physics Tutor in Vancouver", href: "/ib-physics-tutor-vancouver" },
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
    ],
  },
  {
    slug: "ib-physics-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "IB Physics Tutor in Vancouver | SL & HL",
    metaDescription:
      "IB Physics tutoring in Vancouver — SL & HL, with IA support and exam technique. Online or nearby in Burnaby. Book a free consultation.",
    h1: "IB Physics Tutor in Vancouver",
    heroSubheading:
      "Specialist IB Physics tutoring for Vancouver students at SL and HL — including Internal Assessment support.",
    intro: [
      "IB Physics blends conceptual depth with mathematical rigour and its own assessment style. Our Vancouver IB Physics tutoring is tailored to SL and HL.",
      "We build understanding and exam technique, and support the Internal Assessment.",
    ],
    sections: [
      {
        heading: "IB Physics Coverage",
        points: [
          "Mechanics",
          "Thermal & waves",
          "Electricity & magnetism",
          "Fields & modern physics",
          "Internal Assessment support",
          "Exam technique",
        ],
      },
      {
        heading: "Built for the IB",
        body: [
          "We teach to IB mark schemes and command terms, and guide the IA experiment and analysis.",
          "Sessions cover both SL and HL depth.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor IB Physics HL?",
        answer: "Yes — SL and HL.",
      },
      {
        question: "Do you help with the IA?",
        answer: "Yes, from experiment design to analysis.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available for Vancouver students.",
      },
    ],
    related: [
      { label: "IB Chemistry Tutor in Vancouver", href: "/ib-chemistry-tutor-vancouver" },
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
    ],
  },
  {
    slug: "ib-math-sl-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "IB Math SL Tutor in Vancouver | AA & AI SL",
    metaDescription:
      "IB Math SL tutoring in Vancouver — Analysis & Approaches and Applications & Interpretation SL, with IA support. Online or nearby in Burnaby. Free consultation.",
    h1: "IB Math SL Tutor in Vancouver",
    heroSubheading:
      "Clear IB Math SL tutoring for Vancouver students across AA SL and AI SL — including Internal Assessment support.",
    intro: [
      "IB Math SL still demands solid command of functions, calculus and statistics, plus IB exam technique. Our Vancouver IB Math SL tutoring covers both AA and AI at SL.",
      "We make the content clear and guide the Internal Assessment.",
    ],
    sections: [
      {
        heading: "IB Math SL Coverage",
        points: [
          "Functions & algebra",
          "Calculus (SL)",
          "Trigonometry",
          "Statistics & probability",
          "Internal Assessment support",
          "Exam technique",
        ],
      },
      {
        heading: "SL-Focused Teaching",
        body: [
          "We target the SL syllabus precisely, so time is spent where it counts.",
          "IA guidance helps students produce a strong exploration.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you cover AA SL and AI SL?",
        answer: "Yes — both SL streams.",
      },
      {
        question: "Do you help with the IA?",
        answer: "Yes.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "IB Math Tutor in Vancouver", href: "/ib-math-tutor-vancouver" },
      { label: "IB Math HL Tutor in Vancouver", href: "/ib-math-hl-tutor-vancouver" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
    ],
  },
  {
    slug: "ib-tutor-vancouver",
    cluster: "IB/AP",
    location: "Vancouver",
    metaTitle: "IB Tutor in Vancouver | Math, Physics & Chemistry",
    metaDescription:
      "IB tutoring in Vancouver across Math, Physics and Chemistry — SL & HL, with IA support and exam prep. Online or nearby in Burnaby. Free consultation.",
    h1: "IB Tutor in Vancouver",
    heroSubheading:
      "One specialist team for your IB subjects — Math, Physics and Chemistry, SL and HL — for Vancouver students.",
    intro: [
      "The IB is rigorous and distinct, with its own assessment style, IAs and exam technique. Our Vancouver IB tutoring spans Math, Physics and Chemistry at SL and HL.",
      "Students juggling multiple IB subjects benefit from a coordinated, IB-savvy approach.",
    ],
    sections: [
      {
        heading: "IB Subjects We Tutor",
        points: [
          "IB Math (AA & AI, SL & HL)",
          "IB Physics (SL & HL)",
          "IB Chemistry (SL & HL)",
          "Internal Assessment support",
          "Command-term technique",
          "Exam preparation",
        ],
      },
      {
        heading: "IB-Savvy Support",
        body: [
          "We know the IB's requirements and teach to them, across every subject.",
          "IA guidance and exam technique are built in.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which IB subjects do you tutor?",
        answer: "IB Math, Physics and Chemistry at SL and HL.",
      },
      {
        question: "Do you help with IAs?",
        answer: "Yes, across subjects.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
    ],
    related: [
      { label: "IB Tutor in Burnaby", href: "/ib-tutor-burnaby" },
      { label: "IB Math Tutor in Vancouver", href: "/ib-math-tutor-vancouver" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
    ],
  },
  {
    slug: "ib-tutor-burnaby",
    cluster: "IB/AP",
    location: "Burnaby",
    metaTitle: "IB Tutor in Burnaby | Math, Physics & Chemistry",
    metaDescription:
      "IB tutoring in Burnaby across Math, Physics and Chemistry — SL & HL, with IA support and exam prep. In person or online. Book a free consultation.",
    h1: "IB Tutor in Burnaby",
    heroSubheading:
      "One specialist team for your IB subjects — Math, Physics and Chemistry, SL and HL — for Burnaby students.",
    intro: [
      "IB students in Burnaby need tutoring that understands the programme, not just the subject. Our IB tutoring covers Math, Physics and Chemistry at SL and HL, taught to IB requirements.",
      "Attend in person in Burnaby or online, with IA and exam support built in.",
    ],
    sections: [
      {
        heading: "IB Subjects We Tutor",
        points: [
          "IB Math (AA & AI, SL & HL)",
          "IB Physics (SL & HL)",
          "IB Chemistry (SL & HL)",
          "Internal Assessment support",
          "Command-term technique",
          "Exam preparation",
        ],
      },
      {
        heading: "IB-Savvy Support",
        body: [
          "We teach to the IB's mark schemes and command terms across every subject.",
          "IA guidance and exam technique are included.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which IB subjects do you tutor in Burnaby?",
        answer: "IB Math, Physics and Chemistry at SL and HL.",
      },
      {
        question: "Do you help with IAs?",
        answer: "Yes.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "IB Tutor in Vancouver", href: "/ib-tutor-vancouver" },
      { label: "IB Math Tutor in Burnaby", href: "/ib-math-tutor-burnaby" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
    ],
  },

  // ─────────────── UNIVERSITY ───────────────
  {
    slug: "university-math-tutor-vancouver",
    cluster: "University",
    location: "Vancouver",
    metaTitle: "University Math Tutor in Vancouver | Calculus & Algebra",
    metaDescription:
      "University math tutoring in Vancouver — calculus, linear algebra and more for UBC, SFU and Langara students. Online or nearby in Burnaby. Free consultation.",
    h1: "University Math Tutor in Vancouver",
    heroSubheading:
      "Expert help with first- and second-year university math — calculus, linear algebra and more — for Vancouver students.",
    intro: [
      "University math moves fast and assumes strong foundations. Our Vancouver university math tutoring supports UBC, SFU and Langara students through calculus, linear algebra and related courses.",
      "We bridge gaps quickly and make demanding material manageable, online or in person nearby in Burnaby.",
    ],
    sections: [
      {
        heading: "Courses We Support",
        points: [
          "Differential & integral calculus",
          "Multivariable calculus",
          "Linear algebra",
          "Differential equations",
          "Discrete math",
          "Exam preparation",
        ],
      },
      {
        heading: "Fast, Foundational Help",
        body: [
          "We shore up the foundations university courses assume, then tackle the current material.",
          "Sessions are paced to your course and assessments.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which universities do you support?",
        answer: "UBC, SFU, Langara and others, plus general first- and second-year math.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "Can you help before a midterm?",
        answer: "Yes — focused, exam-paced support.",
      },
    ],
    related: [
      { label: "University Calculus Tutor in Vancouver", href: "/university-calculus-tutor-vancouver" },
      { label: "University & Professional Tutoring", href: "/university-professional" },
      { label: "Linear Algebra Tutor Online", href: "/linear-algebra-tutor-online-canada" },
    ],
  },
  {
    slug: "university-calculus-tutor-vancouver",
    cluster: "University",
    location: "Vancouver",
    metaTitle: "University Calculus Tutor in Vancouver | UBC, SFU & More",
    metaDescription:
      "University calculus tutoring in Vancouver — limits, derivatives, integrals and series for UBC, SFU & Langara students. Free consultation.",
    h1: "University Calculus Tutor in Vancouver",
    heroSubheading:
      "Expert first- and second-year university calculus tutoring for Vancouver students at UBC, SFU, Langara and beyond.",
    intro: [
      "University calculus (Calculus I, II and beyond) is a common hurdle for STEM, commerce and science students. Our Vancouver university calculus tutoring makes it manageable.",
      "We clarify the concepts and drill the problem-solving that exams demand.",
    ],
    sections: [
      {
        heading: "Calculus Topics",
        points: [
          "Limits & continuity",
          "Derivatives & applications",
          "Integration techniques",
          "Sequences & series",
          "Multivariable basics",
          "Midterm & final prep",
        ],
      },
      {
        heading: "Concept + Practice",
        body: [
          "We connect the intuition to the techniques, so you can handle unfamiliar problems.",
          "Sessions are paced to your course schedule.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you support UBC and SFU calculus?",
        answer: "Yes — first- and second-year calculus at UBC, SFU, Langara and others.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "Can you help with integration techniques?",
        answer: "Yes — a common sticking point we cover thoroughly.",
      },
    ],
    related: [
      { label: "Calculus 1 Tutor Online", href: "/calculus-1-tutor-online" },
      { label: "University Math Tutor in Vancouver", href: "/university-math-tutor-vancouver" },
      { label: "University & Professional Tutoring", href: "/university-professional" },
    ],
  },
  {
    slug: "university-physics-tutor-vancouver",
    cluster: "University",
    location: "Vancouver",
    metaTitle: "University Physics Tutor in Vancouver | UBC & Langara",
    metaDescription:
      "University physics tutoring in Vancouver — mechanics, E&M and thermodynamics for UBC, SFU & Langara students. Free consultation.",
    h1: "University Physics Tutor in Vancouver",
    heroSubheading:
      "Expert first-year university physics tutoring for Vancouver students at UBC, SFU, Langara and beyond.",
    intro: [
      "First-year university physics combines demanding concepts with heavy math. Our Vancouver university physics tutoring helps students keep pace and excel.",
      "We strengthen both the physics and the underlying calculus and algebra.",
    ],
    sections: [
      {
        heading: "Physics Topics",
        points: [
          "Mechanics",
          "Electricity & magnetism",
          "Thermodynamics",
          "Waves & optics",
          "Problem-solving method",
          "Exam preparation",
        ],
      },
      {
        heading: "Physics + Math Together",
        body: [
          "Many university physics struggles are really math struggles; we strengthen both.",
          "Sessions are paced to your course and exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you support UBC and Langara physics?",
        answer: "Yes — first-year university physics at UBC, SFU, Langara and others.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "Do you help with the math too?",
        answer: "Yes — we strengthen the calculus and algebra physics relies on.",
      },
    ],
    related: [
      { label: "University Physics Tutor", href: "/programs/university-physics" },
      { label: "Physics 1 Tutor Online", href: "/physics-1-tutor-online" },
      { label: "University & Professional Tutoring", href: "/university-professional" },
    ],
  },
  {
    slug: "calculus-1-tutor-online",
    cluster: "University",
    metaTitle: "Calculus 1 Tutor Online | University Calculus Help",
    metaDescription:
      "Online Calculus 1 tutoring — limits, derivatives and integration made clear for university students across Canada. PhD-led. Book a free consultation.",
    h1: "Calculus 1 Tutor Online",
    heroSubheading:
      "Online, one-on-one Calculus 1 tutoring for university students anywhere in Canada — limits, derivatives and integrals made clear.",
    intro: [
      "Calculus 1 is a make-or-break course for many university programs. Our online Calculus 1 tutoring gives students across Canada expert, one-on-one help on their schedule.",
      "We turn the core ideas — limits, derivatives, integration — into clear, reliable technique.",
    ],
    sections: [
      {
        heading: "Calculus 1 Topics",
        points: [
          "Limits & continuity",
          "Derivatives & rules",
          "Applications of derivatives",
          "Introduction to integration",
          "Related rates & optimization",
          "Exam preparation",
        ],
      },
      {
        heading: "Online & Flexible",
        body: [
          "Live online sessions with a shared whiteboard make working through problems together easy.",
          "Sessions are paced to your course and midterms.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is online Calculus 1 tutoring for?",
        answer: "University students across Canada taking first-semester calculus.",
      },
      {
        question: "How do online sessions work?",
        answer: "Live one-on-one over video with a shared whiteboard.",
      },
      {
        question: "Can you help before a midterm?",
        answer: "Yes — focused, exam-paced support.",
      },
    ],
    related: [
      { label: "Calculus 2 Tutor Online", href: "/calculus-2-tutor-online" },
      { label: "University Calculus Tutor in Vancouver", href: "/university-calculus-tutor-vancouver" },
      { label: "University & Professional Tutoring", href: "/university-professional" },
    ],
  },
  {
    slug: "calculus-2-tutor-online",
    cluster: "University",
    metaTitle: "Calculus 2 Tutor Online | Integration & Series Help",
    metaDescription:
      "Online Calculus 2 tutoring — integration techniques, sequences and series made clear for university students across Canada. PhD-led. Free consultation.",
    h1: "Calculus 2 Tutor Online",
    heroSubheading:
      "Online, one-on-one Calculus 2 tutoring for university students across Canada — integration techniques and series made clear.",
    intro: [
      "Calculus 2 is notoriously tricky, with integration techniques, sequences and series that demand real fluency. Our online Calculus 2 tutoring builds that fluency.",
      "Students across Canada get expert, one-on-one help on their schedule.",
    ],
    sections: [
      {
        heading: "Calculus 2 Topics",
        points: [
          "Integration techniques",
          "Applications of integration",
          "Sequences & series",
          "Convergence tests",
          "Power & Taylor series",
          "Exam preparation",
        ],
      },
      {
        heading: "Fluency Through Practice",
        body: [
          "We teach the methods and drill enough practice that they become automatic.",
          "Sessions are paced to your course and exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is Calculus 2 so hard?",
        answer:
          "Integration techniques and series require fluency and pattern recognition; we build both with practice.",
      },
      {
        question: "Is it online?",
        answer: "Yes — live one-on-one for students across Canada.",
      },
      {
        question: "Do you cover series convergence?",
        answer: "Yes — a common sticking point we cover thoroughly.",
      },
    ],
    related: [
      { label: "Calculus 1 Tutor Online", href: "/calculus-1-tutor-online" },
      { label: "University Math Tutor in Vancouver", href: "/university-math-tutor-vancouver" },
      { label: "Differential Equations Tutor Online", href: "/differential-equations-tutor-online-canada" },
    ],
  },
  {
    slug: "linear-algebra-tutor-online-canada",
    cluster: "University",
    metaTitle: "Linear Algebra Tutor Online Canada | University Help",
    metaDescription:
      "Online linear algebra tutoring for university students across Canada — matrices, vector spaces and eigenvalues made clear. PhD-led. Free consultation.",
    h1: "Linear Algebra Tutor Online (Canada)",
    heroSubheading:
      "Online, one-on-one linear algebra tutoring for university students across Canada — from matrices to eigenvalues.",
    intro: [
      "Linear algebra is abstract, and many students hit a wall with vector spaces and eigenvalues. Our online linear algebra tutoring makes the abstraction concrete.",
      "University students across Canada get expert, one-on-one help on their schedule.",
    ],
    sections: [
      {
        heading: "Linear Algebra Topics",
        points: [
          "Matrices & systems",
          "Vector spaces & subspaces",
          "Linear transformations",
          "Determinants",
          "Eigenvalues & eigenvectors",
          "Exam preparation",
        ],
      },
      {
        heading: "Making Abstraction Concrete",
        body: [
          "We use clear geometric and computational intuition to make abstract ideas tangible.",
          "Sessions are paced to your course and assessments.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is this for?",
        answer: "University students across Canada taking linear algebra.",
      },
      {
        question: "Do you cover eigenvalues and vector spaces?",
        answer: "Yes — the topics students find most abstract, made concrete.",
      },
      {
        question: "Is it online?",
        answer: "Yes — live one-on-one.",
      },
    ],
    related: [
      { label: "Calculus 2 Tutor Online", href: "/calculus-2-tutor-online" },
      { label: "University Math Tutor in Vancouver", href: "/university-math-tutor-vancouver" },
      { label: "University & Professional Tutoring", href: "/university-professional" },
    ],
  },
  {
    slug: "differential-equations-tutor-online-canada",
    cluster: "University",
    metaTitle: "Differential Equations Tutor Online Canada | ODE Help",
    metaDescription:
      "Online differential equations tutoring for university students across Canada — first-order, second-order and systems of ODEs made clear. Free consultation.",
    h1: "Differential Equations Tutor Online (Canada)",
    heroSubheading:
      "Online, one-on-one differential equations tutoring for university students across Canada — ODEs made manageable.",
    intro: [
      "Differential equations pull together calculus, algebra and modelling, which is why they challenge so many students. Our online tutoring makes the methods clear and systematic.",
      "University students across Canada get expert, one-on-one help on their schedule.",
    ],
    sections: [
      {
        heading: "Topics We Cover",
        points: [
          "First-order ODEs",
          "Second-order linear ODEs",
          "Systems of ODEs",
          "Laplace transforms",
          "Applications & modelling",
          "Exam preparation",
        ],
      },
      {
        heading: "Systematic Methods",
        body: [
          "We teach a clear method for identifying and solving each type of equation.",
          "Sessions are paced to your course and exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is this for?",
        answer: "University students across Canada taking a differential equations course.",
      },
      {
        question: "Do you cover Laplace transforms?",
        answer: "Yes.",
      },
      {
        question: "Is it online?",
        answer: "Yes — live one-on-one.",
      },
    ],
    related: [
      { label: "Calculus 2 Tutor Online", href: "/calculus-2-tutor-online" },
      { label: "Linear Algebra Tutor Online", href: "/linear-algebra-tutor-online-canada" },
      { label: "Engineering Math Tutor", href: "/engineering-statics-tutor" },
    ],
  },
  {
    slug: "engineering-statics-tutor",
    cluster: "University",
    metaTitle: "Engineering Statics Tutor Online | University Help",
    metaDescription:
      "Online engineering statics tutoring — equilibrium, trusses, friction and moments made clear for first-year engineering students. PhD-led. Free consultation.",
    h1: "Engineering Statics Tutor",
    heroSubheading:
      "Online, one-on-one statics tutoring for first-year engineering students — equilibrium, trusses and moments made clear.",
    intro: [
      "Statics is a foundational engineering course, and getting free-body diagrams and equilibrium right early makes everything after it easier. Our online statics tutoring builds that foundation.",
      "First-year engineering students get expert, one-on-one help on their schedule.",
    ],
    sections: [
      {
        heading: "Statics Topics",
        points: [
          "Force systems & vectors",
          "Equilibrium & free-body diagrams",
          "Trusses & frames",
          "Friction",
          "Moments & couples",
          "Exam preparation",
        ],
      },
      {
        heading: "Free-Body Mastery",
        body: [
          "We drill the free-body-diagram method that underpins every statics problem.",
          "Sessions are paced to your course and exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is statics tutoring for?",
        answer: "First-year engineering students taking a statics course.",
      },
      {
        question: "Do you cover trusses and friction?",
        answer: "Yes — with a clear, repeatable method.",
      },
      {
        question: "Is it online?",
        answer: "Yes — live one-on-one.",
      },
    ],
    related: [
      { label: "Engineering Dynamics Tutor", href: "/engineering-dynamics-tutor" },
      { label: "First-Year Engineering Tutor", href: "/first-year-engineering-tutor" },
      { label: "University & Professional Tutoring", href: "/university-professional" },
    ],
  },
  {
    slug: "engineering-dynamics-tutor",
    cluster: "University",
    metaTitle: "Engineering Dynamics Tutor Online | University Help",
    metaDescription:
      "Online engineering dynamics tutoring — kinematics, kinetics and work-energy made clear for engineering students. PhD-led. Book a free consultation.",
    h1: "Engineering Dynamics Tutor",
    heroSubheading:
      "Online, one-on-one dynamics tutoring for engineering students — kinematics, kinetics and work-energy methods made clear.",
    intro: [
      "Dynamics builds on statics and calculus, adding motion and time. It's a demanding course where a clear method matters. Our online dynamics tutoring provides exactly that.",
      "Engineering students get expert, one-on-one help on their schedule.",
    ],
    sections: [
      {
        heading: "Dynamics Topics",
        points: [
          "Particle kinematics",
          "Particle kinetics (Newton's 2nd law)",
          "Work & energy methods",
          "Impulse & momentum",
          "Rigid-body dynamics",
          "Exam preparation",
        ],
      },
      {
        heading: "Method Over Memorisation",
        body: [
          "We teach when to use each method — Newton's laws, work-energy, impulse-momentum — so problems become approachable.",
          "Sessions are paced to your course and exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is dynamics tutoring for?",
        answer: "Engineering students taking a dynamics course.",
      },
      {
        question: "Do you cover work-energy and momentum methods?",
        answer: "Yes — and when to use each.",
      },
      {
        question: "Is it online?",
        answer: "Yes — live one-on-one.",
      },
    ],
    related: [
      { label: "Engineering Statics Tutor", href: "/engineering-statics-tutor" },
      { label: "First-Year Engineering Tutor", href: "/first-year-engineering-tutor" },
      { label: "Physics 1 Tutor Online", href: "/physics-1-tutor-online" },
    ],
  },
  {
    slug: "first-year-engineering-tutor",
    cluster: "University",
    metaTitle: "First-Year Engineering Tutor Online | Math & Physics",
    metaDescription:
      "Online first-year engineering tutoring — calculus, physics, statics and dynamics in one place. PhD-led help for engineering students. Free consultation.",
    h1: "First-Year Engineering Tutor",
    heroSubheading:
      "One expert tutor for the toughest first-year engineering courses — calculus, physics, statics and dynamics.",
    intro: [
      "First-year engineering is a demanding mix of calculus, physics, statics and dynamics — often all at once. Our online first-year engineering tutoring supports the whole load with a connected approach.",
      "Students get expert, one-on-one help across their core courses, on their schedule.",
    ],
    sections: [
      {
        heading: "Courses We Support",
        points: [
          "Engineering calculus",
          "Engineering physics",
          "Statics",
          "Dynamics",
          "Linear algebra",
          "Exam preparation",
        ],
      },
      {
        heading: "A Connected Approach",
        body: [
          "Because these courses share foundations, one tutor across them reinforces the whole picture.",
          "Sessions are paced to your course load and exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can one tutor cover multiple engineering courses?",
        answer: "Yes — calculus, physics, statics and dynamics share foundations we reinforce together.",
      },
      {
        question: "Is it online?",
        answer: "Yes — live one-on-one for students across Canada.",
      },
      {
        question: "Can you help before finals?",
        answer: "Yes — focused, exam-paced support.",
      },
    ],
    related: [
      { label: "Engineering Statics Tutor", href: "/engineering-statics-tutor" },
      { label: "Engineering Dynamics Tutor", href: "/engineering-dynamics-tutor" },
      { label: "Calculus 1 Tutor Online", href: "/calculus-1-tutor-online" },
    ],
  },
  {
    slug: "physics-1-tutor-online",
    cluster: "University",
    metaTitle: "Physics 1 Tutor Online | University Mechanics Help",
    metaDescription:
      "Online Physics 1 tutoring for university students across Canada — mechanics, energy and momentum made clear. PhD-led. Book a free consultation.",
    h1: "Physics 1 Tutor Online",
    heroSubheading:
      "Online, one-on-one Physics 1 tutoring for university students across Canada — mechanics made clear.",
    intro: [
      "University Physics 1 focuses on mechanics and demands both conceptual clarity and strong calculus. Our online Physics 1 tutoring builds both.",
      "Students across Canada get expert, one-on-one help on their schedule.",
    ],
    sections: [
      {
        heading: "Physics 1 Topics",
        points: [
          "Kinematics",
          "Newton's laws & dynamics",
          "Work & energy",
          "Momentum",
          "Rotational motion",
          "Exam preparation",
        ],
      },
      {
        heading: "Physics + Math",
        body: [
          "We strengthen the calculus and vectors that university physics relies on, alongside the concepts.",
          "Sessions are paced to your course and exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is Physics 1 tutoring for?",
        answer: "University students across Canada taking first-semester mechanics.",
      },
      {
        question: "Is it online?",
        answer: "Yes — live one-on-one.",
      },
      {
        question: "Do you help with the math too?",
        answer: "Yes — the calculus and vectors physics relies on.",
      },
    ],
    related: [
      { label: "University Physics Tutor in Vancouver", href: "/university-physics-tutor-vancouver" },
      { label: "Engineering Dynamics Tutor", href: "/engineering-dynamics-tutor" },
      { label: "Calculus 1 Tutor Online", href: "/calculus-1-tutor-online" },
    ],
  },

  // ─────────────── ONLINE CANADA ───────────────
  {
    slug: "online-math-tutor-canada",
    cluster: "Online Canada",
    metaTitle: "Online Math Tutor Canada | Grades 6–12 & University",
    metaDescription:
      "Online math tutoring for students across Canada — Grades 6–12 and university, PhD-led and one-on-one. Flexible scheduling. Book a free consultation.",
    h1: "Online Math Tutor (Canada)",
    heroSubheading:
      "Expert, one-on-one online math tutoring for students anywhere in Canada — from Grade 6 foundations to university calculus.",
    intro: [
      "Great math tutoring shouldn't depend on your postal code. Our online math tutoring brings PhD-led, one-on-one help to students across Canada, on a schedule that fits.",
      "We align to your provincial curriculum or university course and teach for genuine understanding.",
    ],
    sections: [
      {
        heading: "What We Cover Online",
        points: [
          "Grades 6–12 math",
          "Pre-Calculus & Calculus",
          "University calculus & algebra",
          "IB & AP math",
          "Problem solving",
          "Exam preparation",
        ],
      },
      {
        heading: "How Online Tutoring Works",
        body: [
          "Live one-on-one sessions over video with a shared whiteboard make it easy to work through problems together.",
          "It's convenient, effective, and available across Canada.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is online math tutoring effective?",
        answer:
          "Yes — live one-on-one online sessions are just as effective as in person, and far more flexible.",
      },
      {
        question: "Do you follow provincial curricula?",
        answer: "Yes — we align to your provincial curriculum or university course.",
      },
      {
        question: "Who can you tutor?",
        answer: "Students across Canada, Grades 6–12 and university.",
      },
    ],
    related: [
      { label: "Online High School Math Tutor (BC)", href: "/online-high-school-math-tutor-bc" },
      { label: "Online IB Math Tutor (Canada)", href: "/online-ib-math-tutor-canada" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
    ],
  },
  {
    slug: "online-high-school-math-tutor-bc",
    cluster: "Online Canada",
    metaTitle: "Online High School Math Tutor BC | BC Curriculum",
    metaDescription:
      "Online high school math tutoring for BC students — Pre-Calculus, Calculus and Foundations, aligned to the BC curriculum. PhD-led. Free consultation.",
    h1: "Online High School Math Tutor (BC)",
    heroSubheading:
      "Online, one-on-one high school math tutoring for BC students — fully aligned to the BC curriculum.",
    intro: [
      "BC's high school math has its own pathways — Pre-Calculus, Foundations and Workplace — and effective tutoring aligns to them precisely. Our online BC math tutoring does exactly that.",
      "Students anywhere in BC get expert, one-on-one help on their schedule.",
    ],
    sections: [
      {
        heading: "BC Math Pathways",
        points: [
          "Pre-Calculus 11 & 12",
          "Calculus 12",
          "Foundations of Math",
          "Workplace Math",
          "Grades 8–10 math",
          "Provincial & final exam prep",
        ],
      },
      {
        heading: "Aligned to BC",
        body: [
          "We match tutoring to your exact BC course and teacher's material.",
          "Sessions build toward provincial and final assessments.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you follow the BC curriculum?",
        answer: "Yes — precisely, across all high school math pathways.",
      },
      {
        question: "Can you tutor anywhere in BC?",
        answer: "Yes — online, one-on-one.",
      },
      {
        question: "Do you prepare for provincial assessments?",
        answer: "Yes.",
      },
    ],
    related: [
      { label: "Online Math Tutor (Canada)", href: "/online-math-tutor-canada" },
      { label: "Pre-Calculus 12 Tutor in Vancouver", href: "/pre-calculus-12-tutor-vancouver" },
      { label: "Foundations of Math 11 Tutor", href: "/foundations-of-math-11-tutor-burnaby" },
    ],
  },
  {
    slug: "online-ib-math-tutor-canada",
    cluster: "Online Canada",
    metaTitle: "Online IB Math Tutor Canada | AA & AI, SL & HL",
    metaDescription:
      "Online IB Math tutoring for students across Canada — AA & AI, SL & HL, with IA support and exam prep. PhD-led. Book a free consultation.",
    h1: "Online IB Math Tutor (Canada)",
    heroSubheading:
      "Specialist online IB Math tutoring for students across Canada — AA and AI, SL and HL, plus IA support.",
    intro: [
      "IB Math is consistent worldwide, which makes it ideal for online tutoring. Our online IB Math tutoring supports students across Canada in both AA and AI at SL and HL.",
      "We teach to the IB's assessment style and guide the Internal Assessment.",
    ],
    sections: [
      {
        heading: "IB Math We Cover",
        points: [
          "AA SL & HL",
          "AI SL & HL",
          "Calculus & functions",
          "Statistics & probability",
          "Internal Assessment support",
          "Exam preparation",
        ],
      },
      {
        heading: "Online & IB-Savvy",
        body: [
          "Live online sessions suit the demanding IB schedule and work anywhere in Canada.",
          "We teach to command terms and mark schemes.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor IB Math HL online?",
        answer: "Yes — AA and AI at HL and SL, for students across Canada.",
      },
      {
        question: "Do you help with the IA?",
        answer: "Yes.",
      },
      {
        question: "Is online effective for IB?",
        answer: "Yes — live one-on-one works well for IB Math.",
      },
    ],
    related: [
      { label: "IB Math Tutor in Vancouver", href: "/ib-math-tutor-vancouver" },
      { label: "Online Math Tutor (Canada)", href: "/online-math-tutor-canada" },
      { label: "IB & AP Tutoring", href: "/programs/ib-ap-tutoring" },
    ],
  },
  {
    slug: "online-chemistry-tutor-canada",
    cluster: "Online Canada",
    metaTitle: "Online Chemistry Tutor Canada | High School & University",
    metaDescription:
      "Online chemistry tutoring for students across Canada — high school and university chemistry made clear. PhD-led, one-on-one. Book a free consultation.",
    h1: "Online Chemistry Tutor (Canada)",
    heroSubheading:
      "Expert, one-on-one online chemistry tutoring for students across Canada — high school through university.",
    intro: [
      "Chemistry's toughest topics — equilibrium, stoichiometry, acids and bases — become clear with the right teaching. Our online chemistry tutoring brings that to students across Canada.",
      "We align to your course and teach concept-first for lasting understanding.",
    ],
    sections: [
      {
        heading: "What We Cover Online",
        points: [
          "Chemistry 11 & 12",
          "Stoichiometry & equilibrium",
          "Acids, bases & kinetics",
          "Organic chemistry",
          "University chemistry",
          "Exam preparation",
        ],
      },
      {
        heading: "Concept-First, Online",
        body: [
          "Live sessions with a shared whiteboard make mechanisms and calculations easy to follow.",
          "We align to your provincial curriculum or university course.",
        ],
      },
    ],
    faqs: [
      {
        question: "What chemistry do you tutor online?",
        answer: "High school (Chemistry 11 & 12) and university chemistry.",
      },
      {
        question: "Is online chemistry tutoring effective?",
        answer: "Yes — live one-on-one with a shared whiteboard.",
      },
      {
        question: "Who can you tutor?",
        answer: "Students across Canada.",
      },
    ],
    related: [
      { label: "Online Physics Tutor (Canada)", href: "/online-physics-tutor-canada" },
      { label: "Chemistry 12 Tutor in Burnaby", href: "/chemistry-12-tutor-burnaby" },
      { label: "Online Math Tutor (Canada)", href: "/online-math-tutor-canada" },
    ],
  },
  {
    slug: "online-physics-tutor-canada",
    cluster: "Online Canada",
    metaTitle: "Online Physics Tutor Canada | High School & University",
    metaDescription:
      "Online physics tutoring for students across Canada — high school and university physics made clear. PhD-led, one-on-one. Book a free consultation.",
    h1: "Online Physics Tutor (Canada)",
    heroSubheading:
      "Expert, one-on-one online physics tutoring for students across Canada — high school through university.",
    intro: [
      "Physics rewards clear concepts and systematic problem-solving. Our online physics tutoring builds both for students across Canada, high school through university.",
      "We strengthen the math physics relies on alongside the concepts.",
    ],
    sections: [
      {
        heading: "What We Cover Online",
        points: [
          "Physics 11 & 12",
          "Mechanics & dynamics",
          "Electricity & magnetism",
          "Waves & optics",
          "University physics",
          "Exam preparation",
        ],
      },
      {
        heading: "Concept + Technique, Online",
        body: [
          "Live sessions with a shared whiteboard are ideal for diagrams and worked problems.",
          "We teach a reliable problem-solving method.",
        ],
      },
    ],
    faqs: [
      {
        question: "What physics do you tutor online?",
        answer: "High school (Physics 11 & 12) and university physics.",
      },
      {
        question: "Is online physics tutoring effective?",
        answer: "Yes — live one-on-one with a shared whiteboard.",
      },
      {
        question: "Who can you tutor?",
        answer: "Students across Canada.",
      },
    ],
    related: [
      { label: "Online Chemistry Tutor (Canada)", href: "/online-chemistry-tutor-canada" },
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "Physics 1 Tutor Online", href: "/physics-1-tutor-online" },
    ],
  },
  {
    slug: "online-pre-calculus-tutor-canada",
    cluster: "Online Canada",
    metaTitle: "Online Pre-Calculus Tutor Canada | 11 & 12 Help",
    metaDescription:
      "Online Pre-Calculus tutoring for students across Canada — Pre-Calculus 11 & 12 made clear with a PhD-led tutor. Book a free consultation.",
    h1: "Online Pre-Calculus Tutor (Canada)",
    heroSubheading:
      "Expert, one-on-one online Pre-Calculus tutoring for students across Canada — Pre-Calculus 11 and 12 made clear.",
    intro: [
      "Pre-Calculus is a key gateway to university math and science, and it's demanding. Our online Pre-Calculus tutoring makes trig identities, logarithms and functions clear for students across Canada.",
      "We align to your course and prepare thoroughly for exams.",
    ],
    sections: [
      {
        heading: "What We Cover Online",
        points: [
          "Functions & transformations",
          "Trigonometric identities",
          "Exponentials & logarithms",
          "Polynomial & rational functions",
          "Sequences & series",
          "Exam preparation",
        ],
      },
      {
        heading: "Clear and Exam-Ready",
        body: [
          "Live sessions make identity proofs and log equations easy to work through together.",
          "We prepare students specifically for their Pre-Calculus exams.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor Pre-Calculus 11 and 12 online?",
        answer: "Yes — both, for students across Canada.",
      },
      {
        question: "Is online effective?",
        answer: "Yes — live one-on-one with a shared whiteboard.",
      },
      {
        question: "Do you help before exams?",
        answer: "Yes — focused exam preparation.",
      },
    ],
    related: [
      { label: "Online Math Tutor (Canada)", href: "/online-math-tutor-canada" },
      { label: "Pre-Calculus 12 Tutor in Vancouver", href: "/pre-calculus-12-tutor-vancouver" },
      { label: "Online AP Calculus Tutor (Canada)", href: "/online-ap-calculus-tutor-canada" },
    ],
  },
  {
    slug: "online-ap-calculus-tutor-canada",
    cluster: "Online Canada",
    metaTitle: "Online AP Calculus Tutor Canada | AB & BC Exam Prep",
    metaDescription:
      "Online AP Calculus tutoring for students across Canada — AB & BC, concept mastery and AP exam technique. PhD-led. Book a free consultation.",
    h1: "Online AP Calculus Tutor (Canada)",
    heroSubheading:
      "Expert online AP Calculus AB & BC tutoring for students across Canada — concepts and exam technique for a top score.",
    intro: [
      "AP exams are the same across the country, making AP Calculus ideal for online tutoring. Our online AP Calculus tutoring covers AB and BC for students anywhere in Canada.",
      "We combine concept mastery with AP-format practice, paced to your exam date.",
    ],
    sections: [
      {
        heading: "AP Calculus Coverage",
        points: [
          "Limits & derivatives",
          "Integrals & the FTC",
          "Applications",
          "Series (BC)",
          "Free-response technique",
          "Timed practice",
        ],
      },
      {
        heading: "Online AP Prep",
        body: [
          "Live sessions with a shared whiteboard are ideal for working AP free-response questions.",
          "Plans are paced to your exam timeline.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you cover AB and BC online?",
        answer: "Yes — both, for students across Canada.",
      },
      {
        question: "Do you use AP-format practice?",
        answer: "Yes — multiple-choice and free-response.",
      },
      {
        question: "Is online effective for AP?",
        answer: "Yes — live one-on-one works well.",
      },
    ],
    related: [
      { label: "AP Calculus Tutor in Vancouver", href: "/ap-calculus-tutor-vancouver" },
      { label: "Online Pre-Calculus Tutor (Canada)", href: "/online-pre-calculus-tutor-canada" },
      { label: "Online Math Tutor (Canada)", href: "/online-math-tutor-canada" },
    ],
  },

  // ─────────────── CODING ───────────────
  {
    slug: "coding-tutor-burnaby",
    cluster: "Coding",
    location: "Burnaby",
    metaTitle: "Coding Tutor in Burnaby | Python, Java & More for Teens",
    metaDescription:
      "Coding tutoring in Burnaby for teens and high schoolers — Python, Java and computer science fundamentals. In person or online. Book a free consultation.",
    h1: "Coding Tutor in Burnaby",
    heroSubheading:
      "Hands-on coding tutoring in Burnaby for teens and high schoolers — Python, Java and real computer science fundamentals.",
    intro: [
      "Coding is a skill best learned by building, with a mentor to explain the why. Our Burnaby coding tutoring teaches Python, Java and computer science fundamentals through hands-on projects.",
      "Sessions suit beginners and students looking to go deeper, in person in Burnaby or online.",
    ],
    sections: [
      {
        heading: "What We Teach",
        points: [
          "Python programming",
          "Java programming",
          "Logic & problem solving",
          "Data structures basics",
          "Web development intro",
          "Project-based learning",
        ],
      },
      {
        heading: "Hands-On & Mentored",
        body: [
          "Students write and run real code with a tutor who explains each step.",
          "We keep it engaging with projects that build genuine skill.",
        ],
      },
    ],
    faqs: [
      {
        question: "What languages do you teach?",
        answer: "Python and Java mainly, plus computer science fundamentals and intro web development.",
      },
      {
        question: "Is it good for beginners?",
        answer: "Yes — we start from the basics and build up with projects.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Python Tutor in Burnaby", href: "/python-tutor-burnaby" },
      { label: "Computer Science Tutor in Vancouver", href: "/computer-science-tutor-vancouver" },
      { label: "Computer Science Program", href: "/programs/computer-science" },
    ],
  },
  {
    slug: "python-tutor-burnaby",
    cluster: "Coding",
    location: "Burnaby",
    metaTitle: "Python Tutor in Burnaby | Beginner to Advanced",
    metaDescription:
      "Python tutoring in Burnaby for teens and students — from basics to projects and problem solving. In person or online. Book a free consultation.",
    h1: "Python Tutor in Burnaby",
    heroSubheading:
      "Learn Python properly in Burnaby — from first steps to real projects — with hands-on, mentored tutoring.",
    intro: [
      "Python is the ideal first language: readable, powerful and everywhere. Our Burnaby Python tutoring takes students from the basics to real projects and problem-solving.",
      "Sessions are hands-on and tailored to each student's level and goals.",
    ],
    sections: [
      {
        heading: "Python Skills",
        points: [
          "Syntax & data types",
          "Loops & conditionals",
          "Functions & logic",
          "Data structures",
          "Small projects",
          "Problem solving",
        ],
      },
      {
        heading: "Learn by Building",
        body: [
          "Students write real Python code with a tutor explaining each concept as it's used.",
          "Projects keep learning engaging and practical.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Python good for beginners?",
        answer: "Yes — it's the ideal first language, and we start from the basics.",
      },
      {
        question: "Do you do project-based learning?",
        answer: "Yes — students build real projects as they learn.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Python Tutor in Vancouver", href: "/python-tutor-vancouver" },
      { label: "Coding Tutor in Burnaby", href: "/coding-tutor-burnaby" },
      { label: "Computer Science Program", href: "/programs/computer-science" },
    ],
  },
  {
    slug: "python-tutor-vancouver",
    cluster: "Coding",
    location: "Vancouver",
    metaTitle: "Python Tutor in Vancouver | Beginner to Advanced",
    metaDescription:
      "Python tutoring in Vancouver for teens and students — from basics to projects and problem solving. Online or nearby in Burnaby. Book a free consultation.",
    h1: "Python Tutor in Vancouver",
    heroSubheading:
      "Learn Python properly in Vancouver — from first steps to real projects — with hands-on, mentored online tutoring.",
    intro: [
      "Python opens doors from web apps to data science, and it's the perfect place to start coding. Our Vancouver Python tutoring takes students from basics to projects.",
      "Sessions are online across Vancouver, or in person nearby in Burnaby, and tailored to each student.",
    ],
    sections: [
      {
        heading: "Python Skills",
        points: [
          "Syntax & data types",
          "Loops & conditionals",
          "Functions & logic",
          "Data structures",
          "Small projects",
          "Problem solving",
        ],
      },
      {
        heading: "Learn by Building",
        body: [
          "Students write real Python with a mentor explaining each step.",
          "Projects make learning practical and engaging.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you teach Python online?",
        answer: "Yes — online across Vancouver, with in-person options in Burnaby.",
      },
      {
        question: "Is it good for beginners?",
        answer: "Yes — we start from the basics.",
      },
      {
        question: "Do you build projects?",
        answer: "Yes — project-based learning throughout.",
      },
    ],
    related: [
      { label: "Python Tutor in Burnaby", href: "/python-tutor-burnaby" },
      { label: "Computer Science Tutor in Vancouver", href: "/computer-science-tutor-vancouver" },
      { label: "Computer Science Program", href: "/programs/computer-science" },
    ],
  },
  {
    slug: "computer-science-tutor-vancouver",
    cluster: "Coding",
    location: "Vancouver",
    metaTitle: "Computer Science Tutor in Vancouver | CS & Programming",
    metaDescription:
      "Computer science tutoring in Vancouver — programming, data structures and algorithms for high school and university. Free consultation.",
    h1: "Computer Science Tutor in Vancouver",
    heroSubheading:
      "Expert computer science tutoring for Vancouver students — programming, data structures and algorithms, high school through university.",
    intro: [
      "Computer science is more than coding — it's problem-solving, data structures and algorithms. Our Vancouver CS tutoring builds real understanding for high school and university students.",
      "Sessions are online across Vancouver, or in person nearby in Burnaby.",
    ],
    sections: [
      {
        heading: "What We Cover",
        points: [
          "Programming (Python, Java)",
          "Data structures",
          "Algorithms",
          "Computational thinking",
          "AP Computer Science",
          "University CS courses",
        ],
      },
      {
        heading: "Understanding, Not Just Syntax",
        body: [
          "We teach the thinking behind the code, so students can solve new problems, not just copy patterns.",
          "Sessions are tailored to each student's course and level.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor university CS?",
        answer: "Yes — plus high school and AP Computer Science.",
      },
      {
        question: "Do you cover data structures and algorithms?",
        answer: "Yes — core CS topics we teach for genuine understanding.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
    ],
    related: [
      { label: "AP Computer Science Tutor in Vancouver", href: "/ap-computer-science-tutor-vancouver" },
      { label: "Python Tutor in Vancouver", href: "/python-tutor-vancouver" },
      { label: "Computer Science Program", href: "/programs/computer-science" },
    ],
  },
  {
    slug: "ap-computer-science-tutor-vancouver",
    cluster: "Coding",
    location: "Vancouver",
    metaTitle: "AP Computer Science Tutor in Vancouver | A & Principles",
    metaDescription:
      "AP Computer Science tutoring in Vancouver — CS A (Java) and CS Principles, with exam prep. Online or nearby in Burnaby. Book a free consultation.",
    h1: "AP Computer Science Tutor in Vancouver",
    heroSubheading:
      "Expert AP Computer Science tutoring for Vancouver students — CS A (Java) and CS Principles, with exam preparation.",
    intro: [
      "AP Computer Science comes in two flavours — CS A (Java-focused) and CS Principles (broader). Our Vancouver AP CS tutoring covers both, with the concepts and exam technique for a top score.",
      "Sessions are online across Vancouver, or in person nearby in Burnaby.",
    ],
    sections: [
      {
        heading: "AP CS Coverage",
        points: [
          "Java programming (CS A)",
          "Object-oriented design",
          "Data structures & algorithms",
          "CS Principles concepts",
          "Free-response & MCQ practice",
          "Exam strategy",
        ],
      },
      {
        heading: "Built for the AP Exam",
        body: [
          "We teach the material and drill AP-format practice for both CS A and Principles.",
          "Plans are paced to your exam date.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you cover CS A and CS Principles?",
        answer: "Yes — both AP Computer Science courses.",
      },
      {
        question: "Which language is AP CS A?",
        answer: "Java — which we teach from fundamentals to exam level.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
    ],
    related: [
      { label: "Computer Science Tutor in Vancouver", href: "/computer-science-tutor-vancouver" },
      { label: "Python Tutor in Vancouver", href: "/python-tutor-vancouver" },
      { label: "Computer Science Program", href: "/programs/computer-science" },
    ],
  },

  // ─────────────── PROBLEM SOLVING (differentiator) ───────────────
  {
    slug: "math-word-problems-tutor",
    cluster: "Problem Solving",
    metaTitle: "Math Word Problems Tutor | Turn Confusion into Method",
    metaDescription:
      "Struggle with math word problems? Learn a reliable method to translate words into math and solve with confidence. PhD-led. Free consultation.",
    h1: "Math Word Problems Tutor",
    heroSubheading:
      "Word problems are where many students freeze. We teach a reliable method to turn any word problem into math you can solve.",
    intro: [
      "Word problems test whether a student truly understands math — not just whether they can follow a procedure. That's exactly why they're so common on exams, and so frustrating.",
      "Our tutoring focuses on a repeatable method: read carefully, identify what's known and unknown, translate into equations, solve, and check. With practice, word problems stop being scary.",
    ],
    sections: [
      {
        heading: "Our Word-Problem Method",
        points: [
          "Read & identify the goal",
          "List knowns & unknowns",
          "Translate words to equations",
          "Choose the right approach",
          "Solve & check the answer",
          "Practise across problem types",
        ],
      },
      {
        heading: "Why This Matters",
        body: [
          "Once students can reliably translate words into math, they can tackle unfamiliar problems — the real test of understanding.",
          "This skill transfers across math, physics and beyond, and it's exactly what exams reward.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does my child freeze on word problems?",
        answer:
          "Usually it's not knowing how to translate the words into math. We teach a step-by-step method that removes the guesswork.",
      },
      {
        question: "Which subjects have word problems?",
        answer:
          "Math especially, plus physics and chemistry. Our method transfers across all of them.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "Math Word Problem Help", href: "/math-word-problem-help" },
      { label: "Problem-Solving Tutor in Vancouver", href: "/problem-solving-tutor-vancouver" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
    ],
  },
  {
    slug: "math-word-problem-help",
    cluster: "Problem Solving",
    metaTitle: "Math Word Problem Help | Step-by-Step Strategies",
    metaDescription:
      "Get help with math word problems — step-by-step strategies to translate, set up and solve any word problem. PhD-led tutoring. Free consultation.",
    h1: "Math Word Problem Help",
    heroSubheading:
      "Practical, step-by-step help with the word problems students find hardest — from setup to solution.",
    intro: [
      "Many students can do the calculations but stumble the moment a problem is written in words. The gap is a method for setting problems up — and that's exactly what we teach.",
      "We work through real word problems together, building the confidence to approach any question systematically.",
    ],
    sections: [
      {
        heading: "Strategies We Teach",
        points: [
          "Underlining key information",
          "Drawing diagrams",
          "Defining variables clearly",
          "Setting up equations",
          "Estimating & checking",
          "Recognising problem types",
        ],
      },
      {
        heading: "Confidence Through Practice",
        body: [
          "We build a toolkit of strategies and practise them until they feel natural.",
          "Students come away able to tackle word problems they'd previously have skipped.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do you help with word problems?",
        answer:
          "We teach concrete strategies — diagrams, defining variables, setting up equations — and practise them on real problems.",
      },
      {
        question: "What ages is this for?",
        answer: "Grades 6–12; the method scales with the difficulty of the math.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "Math Word Problems Tutor", href: "/math-word-problems-tutor" },
      { label: "Pre-Calculus Word Problems Help", href: "/pre-calculus-word-problems-help" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
    ],
  },
  {
    slug: "problem-solving-tutor-vancouver",
    cluster: "Problem Solving",
    location: "Vancouver",
    metaTitle: "Problem-Solving Tutor in Vancouver | Math & Science",
    metaDescription:
      "A problem-solving tutor in Vancouver who teaches the thinking, not just the answer — for math and science. Online or nearby in Burnaby. Free consultation.",
    h1: "Problem-Solving Tutor in Vancouver",
    heroSubheading:
      "Learn to think like a problem-solver. Vancouver tutoring that builds the reasoning behind math and science, not just the answers.",
    intro: [
      "The students who thrive aren't the ones who memorise the most — they're the ones who can reason their way through unfamiliar problems. That skill can be taught, and it's our specialty.",
      "Our Vancouver problem-solving tutoring builds transferable reasoning across math and science, so students can handle whatever an exam throws at them.",
    ],
    sections: [
      {
        heading: "What We Build",
        points: [
          "Structured problem-solving method",
          "Translating problems into math",
          "Multi-step problem strategy",
          "Checking & sense-making",
          "Transfer across subjects",
          "Exam application questions",
        ],
      },
      {
        heading: "Reasoning Over Recall",
        body: [
          "We deliberately practise unfamiliar problems, coaching the thinking process rather than handing over answers.",
          "This is the skill that separates top students, and it's exactly what harder exam questions test.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can problem-solving really be taught?",
        answer:
          "Yes — with a structured method and deliberate practice on unfamiliar problems, students genuinely improve.",
      },
      {
        question: "Which subjects?",
        answer: "Math and science, where the reasoning transfers across topics.",
      },
      {
        question: "Online or in person?",
        answer: "Online across Vancouver, with in-person options in Burnaby.",
      },
    ],
    related: [
      { label: "Math Word Problems Tutor", href: "/math-word-problems-tutor" },
      { label: "Physics Problem-Solving Tutor", href: "/physics-problem-solving-tutor" },
      { label: "Math Tutor in Vancouver", href: "/math-tutor-vancouver" },
    ],
  },
  {
    slug: "physics-problem-solving-tutor",
    cluster: "Problem Solving",
    metaTitle: "Physics Problem-Solving Tutor | Method That Works",
    metaDescription:
      "Physics problem-solving tutoring — learn the systematic method top students use to set up and solve any physics problem. PhD-led. Book a free consultation.",
    h1: "Physics Problem-Solving Tutor",
    heroSubheading:
      "Most physics marks are lost in the setup, not the concept. We teach the systematic method that wins them back.",
    intro: [
      "In physics, understanding a concept isn't enough — you have to set up and solve the problem correctly under time pressure. That setup is where most students lose marks.",
      "We teach a systematic problem-solving method: identify the physics, draw the diagram, choose the equations, solve, and check — until it becomes second nature.",
    ],
    sections: [
      {
        heading: "Our Physics Method",
        points: [
          "Identify the physics at play",
          "Draw free-body / motion diagrams",
          "List knowns & unknowns",
          "Choose the right equations",
          "Solve algebraically, then plug in",
          "Check units & reasonableness",
        ],
      },
      {
        heading: "From Concept to Marks",
        body: [
          "Students who understand physics but lose marks almost always have a setup problem — which this method fixes.",
          "We practise across mechanics, energy and electricity until the process is automatic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does my child understand physics but lose marks?",
        answer:
          "Almost always it's the problem setup, not the concept. Our systematic method fixes exactly that.",
      },
      {
        question: "Which physics topics?",
        answer: "Mechanics, energy, momentum and electricity — the method transfers across all.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "Problem-Solving Tutor in Vancouver", href: "/problem-solving-tutor-vancouver" },
      { label: "Physics 12 Tutor in Burnaby", href: "/physics-12-tutor-burnaby" },
      { label: "Math Word Problems Tutor", href: "/math-word-problems-tutor" },
    ],
  },
  {
    slug: "pre-calculus-word-problems-help",
    cluster: "Problem Solving",
    metaTitle: "Pre-Calculus Word Problems Help | Application Questions",
    metaDescription:
      "Help with Pre-Calculus word and application problems — trig, exponential and function modelling made solvable. PhD-led tutoring. Book a free consultation.",
    h1: "Pre-Calculus Word Problems Help",
    heroSubheading:
      "Pre-Calculus application questions trip up even strong students. We teach the method to model and solve them.",
    intro: [
      "Pre-Calculus application questions — modelling with exponential functions, trig, and sequences — are among the hardest marks on the course. They demand translating a real situation into the right function.",
      "We teach exactly that translation skill, so application questions become a source of marks rather than lost ones.",
    ],
    sections: [
      {
        heading: "Application Types We Cover",
        points: [
          "Exponential growth & decay",
          "Trigonometric modelling (e.g. Ferris wheels)",
          "Logarithmic applications",
          "Sequence & series problems",
          "Rate & mixture problems",
          "Exam-style application questions",
        ],
      },
      {
        heading: "Model, Then Solve",
        body: [
          "We teach students to identify which function models the situation, then set up and solve it.",
          "This is where Pre-Calculus 12 marks are often won or lost.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why are Pre-Calculus application questions so hard?",
        answer:
          "They require translating a real situation into the right function — a skill we teach directly.",
      },
      {
        question: "Do you cover trig and exponential modelling?",
        answer: "Yes — including classic problems like Ferris wheels and growth/decay.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Tutor in Burnaby", href: "/pre-calculus-12-tutor-burnaby" },
      { label: "Math Word Problem Help", href: "/math-word-problem-help" },
      { label: "Problem-Solving Tutor in Vancouver", href: "/problem-solving-tutor-vancouver" },
    ],
  },

  // ─────────────── PARENT PAIN (top-of-funnel) ───────────────
  {
    slug: "my-child-is-failing-math-what-should-i-do",
    cluster: "Parent Pain",
    metaTitle: "My Child Is Failing Math — What Should I Do?",
    metaDescription:
      "Is your child failing math? Here's a calm, practical plan to turn it around — how to find the real problem and the right support. Free consultation available.",
    h1: "My Child Is Failing Math — What Should I Do?",
    heroSubheading:
      "First, don't panic. Failing grades are usually a sign of a fixable gap, not a lack of ability. Here's how to turn it around.",
    intro: [
      "When a child brings home a failing math grade, it's stressful for the whole family. But in our experience, it almost always signals a specific, fixable gap — a missed foundation that's quietly undermining everything built on top of it.",
      "The key is to find the real root cause rather than just drilling the current topic. Below is the practical approach we use.",
    ],
    sections: [
      {
        heading: "A Practical Plan",
        points: [
          "Stay calm — it's usually fixable",
          "Find the root gap, not just the symptom",
          "Rebuild foundations first",
          "Restore confidence with early wins",
          "Align help to the current class",
          "Track progress honestly",
        ],
      },
      {
        heading: "How We Help",
        body: [
          "We start with a diagnostic to find where understanding actually broke down — often one or two grades earlier than the current struggle.",
          "Then we rebuild those foundations and reconnect them to today's class, so grades and confidence recover together.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is my child suddenly failing math?",
        answer:
          "Usually an earlier gap has caught up with them. New topics build on old ones, so a missed foundation eventually shows up as failing grades.",
      },
      {
        question: "Can it be turned around?",
        answer:
          "Almost always — with the right diagnosis and support, students recover both grades and confidence.",
      },
      {
        question: "What's the first step?",
        answer:
          "A free consultation and diagnostic to find the real root cause.",
      },
    ],
    related: [
      { label: "Math Tutor for Anxious Students", href: "/math-anxiety-help-for-students" },
      { label: "How to Choose a Math Tutor in Burnaby", href: "/how-to-choose-a-math-tutor-in-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
    ],
  },
  {
    slug: "math-anxiety-help-for-students",
    cluster: "Parent Pain",
    metaTitle: "Math Anxiety Help for Students | Rebuild Confidence",
    metaDescription:
      "Help for students with math anxiety — a patient, confidence-first approach that replaces panic with understanding. PhD-led tutoring. Book a free consultation.",
    h1: "Math Anxiety Help for Students",
    heroSubheading:
      "Math anxiety is real — and it's beatable. A patient, confidence-first approach replaces panic with genuine understanding.",
    intro: [
      "Math anxiety creates a vicious cycle: stress makes it harder to think, poor results deepen the stress, and students start to believe they're \"just not a math person.\" None of that is true — and it can be reversed.",
      "Our approach lowers the pressure, rebuilds understanding from a comfortable level, and stacks up small wins until confidence returns.",
    ],
    sections: [
      {
        heading: "Our Confidence-First Approach",
        points: [
          "Patient, judgement-free teaching",
          "Start from a comfortable level",
          "Small, frequent wins",
          "Understanding over speed",
          "Low-pressure practice",
          "Rebuilding self-belief",
        ],
      },
      {
        heading: "Breaking the Cycle",
        body: [
          "We deliberately remove the time pressure and fear that fuel math anxiety, focusing on understanding rather than performance.",
          "As students experience success, the anxiety fades and real progress follows.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is math anxiety common?",
        answer:
          "Very — and it has nothing to do with ability. With patient, confidence-first tutoring, students overcome it.",
      },
      {
        question: "How do you reduce the anxiety?",
        answer:
          "We remove time pressure, start from a comfortable level, and build confidence with small wins.",
      },
      {
        question: "Online or in person?",
        answer: "Both are available.",
      },
    ],
    related: [
      { label: "My Child Is Failing Math — What to Do", href: "/my-child-is-failing-math-what-should-i-do" },
      { label: "One-on-One Math Tutor in Burnaby", href: "/one-on-one-math-tutor-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
    ],
  },
  {
    slug: "how-to-choose-a-math-tutor-in-burnaby",
    cluster: "Parent Pain",
    location: "Burnaby",
    metaTitle: "How to Choose a Math Tutor in Burnaby | Parent's Guide",
    metaDescription:
      "A parent's guide to choosing the right math tutor in Burnaby — what to look for, questions to ask, and red flags to avoid. Free consultation available.",
    h1: "How to Choose a Math Tutor in Burnaby",
    heroSubheading:
      "Not all tutoring is equal. Here's how to choose a Burnaby math tutor who will actually make a difference.",
    intro: [
      "Choosing a tutor is a real decision — the wrong fit wastes time and money, while the right one transforms a student's confidence and grades. As a parent, it helps to know what actually matters.",
      "Here's what we'd tell any parent weighing up math tutors in Burnaby, whether or not they choose us.",
    ],
    sections: [
      {
        heading: "What to Look For",
        points: [
          "Genuine subject expertise",
          "One-on-one, personalised teaching",
          "Alignment to your child's class",
          "Real, verifiable reviews",
          "Honest progress tracking",
          "A no-pressure trial or consultation",
        ],
      },
      {
        heading: "Questions to Ask",
        body: [
          "Ask about the tutor's qualifications, how they personalise sessions, and how they measure progress.",
          "Be wary of vague promises — a good tutor will happily explain their approach and offer a free consultation so you can judge the fit.",
        ],
      },
    ],
    faqs: [
      {
        question: "What matters most in a math tutor?",
        answer:
          "Genuine expertise, personalised one-on-one teaching, alignment to your child's class, and honest progress tracking.",
      },
      {
        question: "Should I ask for a trial?",
        answer:
          "Yes — a free consultation or trial lets you judge the fit before committing.",
      },
      {
        question: "What are red flags?",
        answer:
          "Vague promises, no personalisation, and no clear way to measure progress.",
      },
    ],
    related: [
      { label: "Best Math Tutor in Burnaby", href: "/best-math-tutor-burnaby" },
      { label: "My Child Is Failing Math — What to Do", href: "/my-child-is-failing-math-what-should-i-do" },
      { label: "Dr. Shreyank Educare Reviews", href: "/dr-shreyank-educare-reviews" },
    ],
  },
  {
    slug: "child-struggling-with-math-burnaby",
    cluster: "Parent Pain",
    location: "Burnaby",
    metaTitle: "Child Struggling With Math in Burnaby? Here's Help",
    metaDescription:
      "Is your child struggling with math in Burnaby? Learn the common causes and a practical path forward, with patient, PhD-led support. Free consultation.",
    h1: "Is Your Child Struggling With Math? (Burnaby)",
    heroSubheading:
      "Struggling with math rarely means a lack of ability — usually it's a fixable gap. Here's how to help your Burnaby student.",
    intro: [
      "If your child is struggling with math, you're not alone, and it's rarely about ability. Most struggles trace back to a specific missed concept that makes everything after it harder.",
      "The path forward is to find that gap, rebuild it, and restore confidence — which is exactly what our Burnaby tutoring does.",
    ],
    sections: [
      {
        heading: "Common Causes",
        points: [
          "A missed earlier foundation",
          "Gaps from remote-learning years",
          "Fast-paced class coverage",
          "Low confidence or math anxiety",
          "Weak problem-solving method",
          "Not enough one-on-one help",
        ],
      },
      {
        heading: "A Practical Path Forward",
        body: [
          "We diagnose the real cause, rebuild the foundations, and reconnect them to your child's current class.",
          "With patient, one-on-one support, struggling students steadily regain both skills and confidence.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is my child struggling with math?",
        answer:
          "Most often a missed earlier concept has made current topics harder. We find and fix that gap.",
      },
      {
        question: "Does struggling mean a lack of ability?",
        answer:
          "No — it's almost always a fixable gap, not a limit on ability.",
      },
      {
        question: "How do we start?",
        answer: "With a free consultation and diagnostic in Burnaby.",
      },
    ],
    related: [
      { label: "My Child Is Failing Math — What to Do", href: "/my-child-is-failing-math-what-should-i-do" },
      { label: "Math Anxiety Help for Students", href: "/math-anxiety-help-for-students" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
    ],
  },

  // ─────────────── GRADE-LEVEL (representative set) ───────────────
  {
    slug: "grade-11-math-tutor-burnaby",
    cluster: "Grade-Level",
    location: "Burnaby",
    metaTitle: "Grade 11 Math Tutor in Burnaby | Pre-Calc & Foundations",
    metaDescription:
      "Grade 11 math tutoring in Burnaby — Pre-Calculus 11 and Foundations of Math 11, aligned to the BC curriculum. In person or online. Free consultation.",
    h1: "Grade 11 Math Tutor in Burnaby",
    heroSubheading:
      "Grade 11 is a pivotal year for math. Clear, one-on-one tutoring in Burnaby across the Pre-Calculus and Foundations pathways.",
    intro: [
      "Grade 11 is where BC math splits into pathways — Pre-Calculus and Foundations — and where the foundations for Grade 12 and university are set. A strong Grade 11 makes everything after it smoother.",
      "Our Burnaby Grade 11 math tutoring is tailored to your child's pathway and class.",
    ],
    sections: [
      {
        heading: "Grade 11 Math We Cover",
        points: [
          "Pre-Calculus 11",
          "Foundations of Math 11",
          "Quadratics & functions",
          "Trigonometry",
          "Systems & sequences",
          "Exam preparation",
        ],
      },
      {
        heading: "Set Up for Grade 12",
        body: [
          "We make sure the Grade 11 foundations are solid, because Grade 12 and university math build directly on them.",
          "Sessions align to your child's exact course and teacher.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which Grade 11 math pathways do you cover?",
        answer: "Both Pre-Calculus 11 and Foundations of Math 11.",
      },
      {
        question: "Why is Grade 11 math important?",
        answer:
          "It sets the foundation for Grade 12 and university math, and splits into pathways that affect future options.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Pre-Calculus 11 Tutor in Burnaby", href: "/pre-calculus-11-tutor-burnaby" },
      { label: "Grade 12 Math Tutor in Burnaby", href: "/grade-12-math-tutor-burnaby" },
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
    ],
  },
  {
    slug: "grade-12-math-tutor-burnaby",
    cluster: "Grade-Level",
    location: "Burnaby",
    metaTitle: "Grade 12 Math Tutor in Burnaby | Pre-Calc & Calculus",
    metaDescription:
      "Grade 12 math tutoring in Burnaby — Pre-Calculus 12 and Calculus 12, aligned to the BC curriculum and university prep. In person or online. Free consultation.",
    h1: "Grade 12 Math Tutor in Burnaby",
    heroSubheading:
      "Grade 12 math shapes university options. Expert, one-on-one tutoring in Burnaby for Pre-Calculus 12 and Calculus 12.",
    intro: [
      "Grade 12 math — Pre-Calculus 12 and Calculus 12 — is demanding and directly affects university admission and readiness. Strong grades here matter.",
      "Our Burnaby Grade 12 math tutoring makes these courses clear and prepares students thoroughly for finals and university.",
    ],
    sections: [
      {
        heading: "Grade 12 Math We Cover",
        points: [
          "Pre-Calculus 12",
          "Calculus 12",
          "Trig identities & logarithms",
          "Limits & derivatives",
          "University-prep foundations",
          "Final exam preparation",
        ],
      },
      {
        heading: "University-Ready",
        body: [
          "We connect Grade 12 math to what university programs expect, so students arrive prepared.",
          "Sessions align to your child's exact course and finals.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which Grade 12 math do you tutor?",
        answer: "Pre-Calculus 12 and Calculus 12.",
      },
      {
        question: "Does Grade 12 math affect university?",
        answer:
          "Yes — it's a common admission and readiness factor for STEM and commerce programs.",
      },
      {
        question: "In person or online?",
        answer: "Both are available in Burnaby.",
      },
    ],
    related: [
      { label: "Pre-Calculus 12 Tutor in Burnaby", href: "/pre-calculus-12-tutor-burnaby" },
      { label: "Calculus 12 Tutor in Burnaby", href: "/calculus-12-tutor-burnaby" },
      { label: "Grade 11 Math Tutor in Burnaby", href: "/grade-11-math-tutor-burnaby" },
    ],
  },

  // ── Vancouver grade-level science pages ──────────────────────────────
  // Burnaby already has grade-level pages for Physics/Chemistry/Biology 11 & 12;
  // Vancouver had none, so these fill a real structural gap rather than
  // duplicating existing coverage. Each targets a distinct grade+subject query
  // and is written from a different angle — deliberately NOT a city-swap of the
  // Burnaby copy, which would be duplicate content.
  {
    slug: "physics-11-tutor-vancouver",
    cluster: "Physics",
    location: "Vancouver",
    metaTitle: "Physics 11 Tutor in Vancouver | PhD-Led Help",
    metaDescription:
      "Physics 11 tutoring for Vancouver students — build the problem-solving habits Physics 12 assumes. Online citywide or in person in Burnaby. Free consultation.",
    h1: "Physics 11 Tutor in Vancouver",
    heroSubheading:
      "Physics 11 is where memorising formulas stops working. We build the habits that make Physics 12 manageable — online across Vancouver or in person nearby in Burnaby.",
    intro: [
      "Physics 11 is the year the strategy changes. In earlier science, recognising the question type was usually enough to find the right formula. Physics 11 starts describing situations and expects you to work out which principle applies — and that is a different skill, one nobody explicitly teaches.",
      "We work with students from Lord Byng, Prince of Wales, Eric Hamber and schools across Kitsilano, Dunbar and the East Side. Sessions run online anywhere in Vancouver, or in person in Burnaby, a straightforward SkyTrain trip for most families.",
    ],
    sections: [
      {
        heading: "What Physics 11 Covers",
        points: [
          "Kinematics and graphing motion",
          "Forces and Newton's laws",
          "Work, energy and power",
          "Momentum and collisions",
          "Waves, sound and light",
          "Introductory electricity",
        ],
      },
      {
        heading: "Why Physics 11 Decides How Physics 12 Goes",
        body: [
          "Physics 12 does not revisit the fundamentals — it assumes them. Students who arrive able to draw a free-body diagram without thinking find Physics 12 demanding but fair. Students carrying gaps find it relentless, because every new topic taxes the thing they never quite got.",
          "That is why we spend Physics 11 building method rather than answers: read the situation, draw it, name the principle, then calculate. It feels slower for a fortnight and pays off for two years.",
        ],
      },
    ],
    faqs: [
      {
        question: "My child did well in Science 10 but is struggling in Physics 11. Why?",
        answer:
          "This is the single most common pattern we see, and it is not a sign of falling behind. Science 10 largely rewards recall; Physics 11 rewards choosing the right principle for an unfamiliar situation. It is a genuinely new skill, and most students need it taught explicitly rather than absorbed.",
      },
      {
        question: "Is Physics 11 worth taking if my child is unsure about Physics 12?",
        answer:
          "Yes — it keeps the door open. Physics 12 is a prerequisite for many engineering and science programs, and it is far harder to add later than to carry forward. A solid Physics 11 preserves the option cheaply.",
      },
      {
        question: "Do Vancouver students have to travel to Burnaby?",
        answer:
          "No. Most Vancouver families choose online sessions, which work well for physics because we share a whiteboard and work problems together in real time. In-person sessions are available in person in Burnaby if you prefer, and it is an easy SkyTrain trip.",
      },
    ],
    related: [
      { label: "Physics 12 Tutor in Vancouver", href: "/physics-12-tutor-vancouver" },
      { label: "Top Physics Tutor in Vancouver", href: "/top-physics-tutor-vancouver" },
      { label: "Science Tutoring in Vancouver", href: "/science-tutoring-vancouver" },
    ],
  },

  {
    slug: "physics-12-tutor-vancouver",
    cluster: "Physics",
    location: "Vancouver",
    metaTitle: "Physics 12 Tutor in Vancouver | Exam & UBC Prep",
    metaDescription:
      "Physics 12 tutoring for Vancouver students — vectors, dynamics and fields made clear, with the exam technique marks depend on. Free 30-minute consultation.",
    h1: "Physics 12 Tutor in Vancouver",
    heroSubheading:
      "Vectors, dynamics, circular motion and fields — taught so the reasoning is visible, not just the answer. Online across Vancouver or in person in Burnaby.",
    intro: [
      "Physics 12 carries weight beyond the grade. It is a prerequisite for engineering and most physical-science programs at UBC and SFU, which means a Vancouver student's options for two years out are partly decided in this course.",
      "It is also the course where partial credit changes character. Examiners are marking a line of reasoning, so an answer that appears with no visible argument earns little — even when it is right. We teach the physics and the way it has to be shown.",
    ],
    sections: [
      {
        heading: "Physics 12 Units We Cover",
        points: [
          "Vector kinematics in two dimensions",
          "Dynamics and equilibrium",
          "Circular motion and gravitation",
          "Momentum, work and energy",
          "Electrostatics and circuits",
          "Magnetism and electromagnetic induction",
        ],
      },
      {
        heading: "Where Physics 12 Actually Goes Wrong",
        body: [
          "Almost never at the algebra. It goes wrong at the setup — a vector resolved along the wrong axis, a force left off the diagram, a sign convention chosen halfway through. The arithmetic then faithfully produces a confident wrong answer.",
          "So we spend our time where the marks are lost. Diagram first, axes named, every force accounted for, and only then any equation. Students find their accuracy improves before their speed does, which is the right order.",
        ],
      },
      {
        heading: "Learning With Us in Vancouver",
        body: [
          "Sessions run online across Kitsilano, Kerrisdale, Point Grey, Oakridge, Downtown and East Vancouver, or in person in Burnaby via SkyTrain. Work is aligned to the BC curriculum, and can be pointed at a final exam or a specific unit that has stopped making sense.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does Physics 12 matter for UBC or SFU?",
        answer:
          "For engineering and most physical-science programs it is a prerequisite, not a bonus — and the grade is part of a competitive admission average. It is also assumed knowledge in first-year physics, so a shaky Physics 12 tends to resurface in first term.",
      },
      {
        question: "My child understands the concepts but loses marks on tests. What's happening?",
        answer:
          "Usually the reasoning is happening in their head and never reaching the page, so there is nothing for an examiner to award. It is a fixable presentation problem rather than a physics problem, and it is one of the fastest improvements we see.",
      },
      {
        question: "Can you help with just one difficult unit?",
        answer:
          "Yes. Plenty of Vancouver students come to us for circular motion or electromagnetism specifically, having been fine everywhere else. There is no requirement to commit to the whole course.",
      },
    ],
    related: [
      { label: "Physics 11 Tutor in Vancouver", href: "/physics-11-tutor-vancouver" },
      { label: "AP Physics Tutor in Vancouver", href: "/ap-physics-tutor-vancouver" },
      { label: "University Physics Tutor in Vancouver", href: "/university-physics-tutor-vancouver" },
      { label: "Physics 12 Final Exam Review", href: "/physics-12-final-exam-review" },
    ],
  },

  {
    slug: "chemistry-11-tutor-vancouver",
    cluster: "Chemistry",
    location: "Vancouver",
    metaTitle: "Chemistry 11 Tutor in Vancouver | Moles Made Clear",
    metaDescription:
      "Chemistry 11 tutoring for Vancouver students — get the mole and stoichiometry genuinely solid before Chemistry 12 assumes them. Free consultation.",
    h1: "Chemistry 11 Tutor in Vancouver",
    heroSubheading:
      "Almost every Chemistry 11 difficulty traces back to one idea: the mole. Get that right and the year opens up. Online across Vancouver or in person in Burnaby.",
    intro: [
      "There is a single concept that decides how Chemistry 11 goes, and it arrives early: the mole. It is the bridge between what you can weigh and what is actually reacting, and almost everything afterwards leans on it.",
      "Students who half-understand it can still pass the unit — which is precisely the trap. The gap stays hidden until stoichiometry, then solutions, then gas laws, each one quietly harder than it should be. We would rather fix it in October than in April.",
    ],
    sections: [
      {
        heading: "Chemistry 11 Topics",
        points: [
          "The mole and molar mass",
          "Stoichiometry and limiting reactants",
          "Atomic structure and periodic trends",
          "Chemical bonding and nomenclature",
          "Solutions and concentration",
          "Gases and gas laws",
        ],
      },
      {
        heading: "The Mole Is Not a Formula to Memorise",
        body: [
          "Students who treat n = m/M as a formula to apply get stuck the moment a question does not announce which quantity it wants. Students who understand a mole as a counting unit — a way to count particles by weighing them — can reason their way through anything the course asks.",
          "So we teach it as an idea before it is arithmetic. It is slower for one session and it removes a term's worth of confusion.",
        ],
      },
    ],
    faqs: [
      {
        question: "My child passed the mole unit but is now lost in stoichiometry. Why?",
        answer:
          "Because the mole unit can be passed by pattern-matching, and stoichiometry cannot. This is the most predictable sequence in Chemistry 11, and the fix is to go back and rebuild the mole conceptually — which usually takes far less time than parents expect.",
      },
      {
        question: "Is Chemistry 11 enough preparation for Chemistry 12?",
        answer:
          "Only if the foundations are genuinely solid rather than just passed. Chemistry 12 does not revisit moles or stoichiometry — it assumes them and moves straight into equilibrium and acid-base chemistry. Gaps carried forward compound quickly.",
      },
      {
        question: "How do Vancouver students attend sessions?",
        answer:
          "Online across the city is the most popular option and works well for chemistry, since we can work problems together on a shared whiteboard. in-person sessions in Burnaby are available and reachable by SkyTrain.",
      },
    ],
    related: [
      { label: "Chemistry 12 Tutor in Vancouver", href: "/chemistry-12-tutor-vancouver" },
      { label: "Top Chemistry Tutor in Vancouver", href: "/top-chemistry-tutor-vancouver" },
      { label: "Chemistry 11 Tutor in Burnaby", href: "/chemistry-11-tutor-burnaby" },
    ],
  },

  {
    slug: "chemistry-12-tutor-vancouver",
    cluster: "Chemistry",
    location: "Vancouver",
    metaTitle: "Chemistry 12 Tutor in Vancouver | Equilibrium Help",
    metaDescription:
      "Chemistry 12 tutoring for Vancouver students — equilibrium, acids and bases explained so the reasoning makes sense. Online or in person. Free consultation.",
    h1: "Chemistry 12 Tutor in Vancouver",
    heroSubheading:
      "Equilibrium and acid-base chemistry ask you to predict, not recall. We teach that reasoning — online across Vancouver or in person in Burnaby.",
    intro: [
      "Chemistry 12 asks a different kind of question than Chemistry 11. Instead of \"calculate this\", it asks \"what happens if we change that, and why\" — and no amount of memorised reactions answers it.",
      "Equilibrium is where students feel this most sharply. It is a genuinely strange idea: a reaction that never stops, sitting at a balance you can deliberately push around. Once that picture lands, Le Chatelier's principle stops being a rule to recite and becomes something you can reason with.",
    ],
    sections: [
      {
        heading: "Chemistry 12 Units",
        points: [
          "Reaction kinetics and rate",
          "Chemical equilibrium and Le Chatelier's principle",
          "Solubility equilibria",
          "Acids, bases and pH",
          "Titrations and buffers",
          "Oxidation-reduction and electrochemistry",
        ],
      },
      {
        heading: "Why Equilibrium Feels Impossible (And Then Doesn't)",
        body: [
          "Nothing before Chemistry 12 prepares students for a reaction that runs in both directions at once. The instinct is to memorise which way the arrow shifts in each scenario — a strategy that works for a quiz and collapses on an unfamiliar question.",
          "We build the mental picture first: a dynamic balance, and a system that responds to being disturbed. From there, predictions become something a student derives rather than recalls, which is exactly what the exam is testing.",
        ],
      },
      {
        heading: "Sessions for Vancouver Students",
        body: [
          "We work with students across Vancouver online, and in person in Burnaby for families who prefer it. Support can cover the full course or target a single unit — equilibrium and electrochemistry are the two we are asked for most.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is Chemistry 12 such a jump from Chemistry 11?",
        answer:
          "Chemistry 11 mostly asks you to calculate; Chemistry 12 asks you to predict and justify. Students who succeeded by memorising problem types often hit a wall at equilibrium, because there is no template to apply — the question is genuinely new each time.",
      },
      {
        question: "Do you help with the Chemistry 12 final exam specifically?",
        answer:
          "Yes. We run targeted final-exam review that works through the units most commonly examined, focused on the reasoning that earns marks rather than re-reading notes.",
      },
      {
        question: "Is Chemistry 12 required for health programs?",
        answer:
          "It is a prerequisite for many health and life-science pathways, and it is assumed in first-year university chemistry. It is worth learning properly rather than passing, because the next course does not revisit it.",
      },
    ],
    related: [
      { label: "Chemistry 11 Tutor in Vancouver", href: "/chemistry-11-tutor-vancouver" },
      { label: "IB Chemistry Tutor in Vancouver", href: "/ib-chemistry-tutor-vancouver" },
      { label: "AP Chemistry Tutor in Vancouver", href: "/ap-chemistry-tutor-vancouver" },
      { label: "Chemistry 12 Final Exam Review", href: "/chemistry-12-final-exam-review" },
    ],
  },

  {
    slug: "biology-11-tutor-vancouver",
    cluster: "Biology",
    location: "Vancouver",
    metaTitle: "Biology 11 Tutor in Vancouver | Beyond Memorising",
    metaDescription:
      "Biology 11 tutoring for Vancouver students — turn a wall of terminology into systems that make sense. Online citywide or in person in Burnaby. Free consultation.",
    h1: "Biology 11 Tutor in Vancouver",
    heroSubheading:
      "Biology 11 looks like memorisation and isn't. We teach the systems behind the vocabulary — online across Vancouver or in person in Burnaby.",
    intro: [
      "Biology 11 has a reputation as the science you get through by memorising, and it is the reason a lot of capable students underperform in it. The vocabulary is genuinely large, so flashcards feel like the obvious strategy — right up until a question asks you to explain why something happens.",
      "The terminology is not the subject. It is the labelling on top of a small number of systems that make sense once you see how they fit together, and that is far less to hold in your head than a list of definitions.",
    ],
    sections: [
      {
        heading: "Biology 11 Topics",
        points: [
          "Cell structure and function",
          "Biological molecules and enzymes",
          "DNA, genetics and inheritance",
          "Evolution and natural selection",
          "Taxonomy and the diversity of life",
          "Ecology and ecosystems",
        ],
      },
      {
        heading: "Memorising Is the Slow Way to Do Biology",
        body: [
          "A student who has memorised the stages of mitosis can label a diagram. A student who understands why a cell must copy its DNA before dividing can answer a question they have never seen — and, incidentally, finds the labels much easier to remember.",
          "Understanding is not the harder path here; it is the shorter one. We work on the why, and the vocabulary largely takes care of itself.",
        ],
      },
    ],
    faqs: [
      {
        question: "My child studies for hours and still does poorly. What's wrong?",
        answer:
          "Usually the studying is re-reading and memorising, which builds recognition rather than understanding — so the material feels familiar in the moment and vanishes under an unfamiliar question. Changing how they study typically matters more than adding hours.",
      },
      {
        question: "Is Biology 11 needed for Biology 12?",
        answer:
          "It is the foundation Biology 12 builds on. Biology 12 goes deep into human physiology and assumes cells, molecules and genetics are already understood rather than dimly recalled.",
      },
      {
        question: "How do sessions work for Vancouver students?",
        answer:
          "Online across the city, or in person in Burnaby. Online works particularly well for biology, since diagrams and processes can be built up on screen together rather than copied from a textbook.",
      },
    ],
    related: [
      { label: "Biology 12 Tutor in Vancouver", href: "/biology-12-tutor-vancouver" },
      { label: "Biology 11 Tutor in Burnaby", href: "/biology-11-tutor-burnaby" },
      { label: "Science Tutoring in Vancouver", href: "/science-tutoring-vancouver" },
    ],
  },

  {
    slug: "biology-12-tutor-vancouver",
    cluster: "Biology",
    location: "Vancouver",
    metaTitle: "Biology 12 Tutor in Vancouver | Physiology Help",
    metaDescription:
      "Biology 12 tutoring for Vancouver students — human physiology explained as connected systems, not lists. Online or in person in Burnaby. Free consultation.",
    h1: "Biology 12 Tutor in Vancouver",
    heroSubheading:
      "Biology 12 is human physiology in real depth — and a common prerequisite for health programs. Online across Vancouver or in person in Burnaby.",
    intro: [
      "Biology 12 narrows from the whole living world down to one organism, and then goes deep. It is a favourite course for students heading toward health sciences, nursing, kinesiology and medicine — which also means the grade often carries admission weight.",
      "The depth is what surprises people. It is not enough to know that the kidney filters blood; you are expected to follow a substance through each stage and explain what happens to it and why. That is a level of detail Biology 11 never asked for.",
    ],
    sections: [
      {
        heading: "Biology 12 Units",
        points: [
          "Cell biology, membranes and transport",
          "DNA replication, protein synthesis and biotechnology",
          "The digestive and circulatory systems",
          "The respiratory and excretory systems",
          "The nervous and endocrine systems",
          "Homeostasis and system interactions",
        ],
      },
      {
        heading: "Systems, Not Chapters",
        body: [
          "Biology 12 is taught unit by unit, and students often study it that way too — which is exactly where marks are lost. The exam likes questions that cross systems, because homeostasis is the point: the circulatory system is only interesting in terms of what it delivers and removes.",
          "We deliberately study across the boundaries. Trace oxygen from the air to a working muscle and back out as carbon dioxide, and three units connect into one story that is far harder to forget.",
        ],
      },
      {
        heading: "For Vancouver Students Heading to Health Programs",
        body: [
          "Many of the Vancouver students we work with are aiming at health-science pathways at UBC or elsewhere, where Biology 12 is both a prerequisite and part of a competitive average. First-year courses also assume this material, so learning it for retention is worth more than learning it for the exam.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is Biology 12 harder than Biology 11 if it covers less?",
        answer:
          "Because it trades breadth for depth. Biology 11 asks what a system does; Biology 12 asks you to explain each step of how, and to connect it to the systems around it. Less material, examined far more demandingly.",
      },
      {
        question: "Does Biology 12 matter for nursing or health-science programs?",
        answer:
          "It is a prerequisite for many of them, and the grade usually forms part of a competitive admission average. It is also assumed background in first-year physiology, so gaps tend to reappear at a costly moment.",
      },
      {
        question: "Can you help with one system, like the nervous system?",
        answer:
          "Yes. The nervous and endocrine systems are the two we are asked about most, and plenty of students book targeted help for a single unit rather than the whole course.",
      },
    ],
    related: [
      { label: "Biology 11 Tutor in Vancouver", href: "/biology-11-tutor-vancouver" },
      { label: "Biology 12 Tutor in Burnaby", href: "/biology-12-tutor-burnaby" },
      { label: "University Biology Tutoring", href: "/programs/university-biology" },
      { label: "MCAT Prep", href: "/programs/mcat-prep" },
    ],
  },
];

export const getSeoPageBySlug = (slug: string): SeoPage | undefined =>
  seoPages.find((p) => p.slug === slug);
