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

export const SEO_BASE_URL = "https://drshreyankeducare.com";
export const seoPagePath = (slug: string) => `/${slug}`;
export const seoPageUrl = (slug: string) => `${SEO_BASE_URL}/${slug}`;

const CONTACT: SeoRelated = { label: "Book a Free Consultation", href: "/contact" };

export const seoPages: SeoPage[] = [
  // ─────────────────────────── BRAND ───────────────────────────
  {
    slug: "dr-shreyank-educare",
    cluster: "Brand",
    metaTitle: "Dr. Shreyank Educare | PhD-Led Tutoring in Burnaby & Vancouver",
    metaDescription:
      "Dr. Shreyank Educare offers PhD-led Math, Physics, Chemistry & Coding tutoring in Burnaby & Vancouver for Grades 6–12 and university. 5★ rated. Free consultation.",
    h1: "Dr. Shreyank Educare — PhD-Led Tutoring in Burnaby & Vancouver",
    heroSubheading:
      "Personalized, results-driven tutoring in Math, Physics, Chemistry and Coding, led by Dr. Shreyank Gupta and trusted by families across Burnaby and Vancouver.",
    intro: [
      "Dr. Shreyank Educare is a Burnaby-based tutoring centre founded on one idea: students learn best with a clear, patient, expert teacher who builds real understanding rather than quick fixes. Led by Dr. Shreyank Gupta, our team helps students in Grades 6–12 and university master their toughest subjects and walk into exams with confidence.",
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
          "Every student gets a plan built around their curriculum, pace and goals — not a one-size-fits-all worksheet. Sessions run in person at our Burnaby centre or online across Metro Vancouver.",
          "We measure progress honestly and keep parents informed, so you always know how your child is doing and what comes next.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where is Dr. Shreyank Educare located?",
        answer:
          "Our tutoring centre is in Burnaby, BC, and we serve students across Burnaby and Vancouver in person, plus online tutoring across Metro Vancouver and beyond.",
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
      "See why parents rate Dr. Shreyank Educare 5★ for Math, Physics & Chemistry tutoring in Burnaby & Vancouver. Read what families say and book a free consultation.",
    h1: "Dr. Shreyank Educare Reviews",
    heroSubheading:
      "Parents and students across Burnaby and Vancouver consistently rate Dr. Shreyank Educare 5 stars. Here's what stands behind that reputation.",
    intro: [
      "A tutoring centre is only as good as the results it delivers, and the feedback from our families tells the story: clearer understanding, higher grades, and students who finally feel confident in subjects that used to cause stress.",
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
      "Dr. Shreyank Educare in Burnaby: PhD-led Math, Physics & Chemistry tutoring for Grades 6–12 and university, in person at our centre or online. Free consultation.",
    h1: "Dr. Shreyank Educare in Burnaby",
    heroSubheading:
      "Our home base. In-person, one-on-one tutoring at our Burnaby centre in Math, Physics, Chemistry and Coding, plus flexible online sessions.",
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
          "Attend sessions in person at our Burnaby centre, or learn from home with the same expert tutors online — whichever suits your family.",
          "Either way, every session is tailored to your student's goals and tracked so parents stay informed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you offer in-person tutoring in Burnaby?",
        answer:
          "Yes. Our centre is in Burnaby, so local students attend in-person one-on-one sessions, with online tutoring also available.",
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
      "Meet Dr. Shreyank Gupta — PhD-qualified Math, Physics & Chemistry tutor with 10+ years' experience, serving Burnaby & Vancouver students. Book a free consultation.",
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
    metaTitle: "Dr. Shreyank Math Tutor | Expert Math Help in Burnaby & Vancouver",
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
          "Both — in person at our Burnaby centre or online across Metro Vancouver.",
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
          "In-person at our Burnaby centre",
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
          "In person at our Burnaby centre, with online tutoring available too.",
      },
    ],
    related: [
      { label: "Math Tutor in Burnaby", href: "/math-tutor-burnaby" },
      { label: "Private Math Tutor in Burnaby", href: "/private-math-tutor-burnaby" },
      { label: "Math Tutoring in Burnaby", href: "/math-tutoring-burnaby" },
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
      "Expert, PhD-led math tutoring for Vancouver students — online across the city or in person at our nearby Burnaby centre.",
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
          "Most Vancouver families choose flexible online sessions; others attend in person at our Burnaby centre, a short SkyTrain ride away.",
          "Either way, we align every lesson to the BC curriculum and your student's exact coursework.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tutor Vancouver students online?",
        answer:
          "Yes. Most Vancouver students learn with us online, with in-person sessions available at our Burnaby centre.",
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
      { label: "Math Tutoring in Vancouver", href: "/math-tutoring-vancouver" },
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
          "Sessions run in person at our Burnaby centre or online, and parents receive honest progress updates.",
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
      "Flexible, expert math tutoring for Vancouver students — online across the city or in person at our nearby Burnaby centre.",
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
          "In-person sessions are available at our Burnaby centre for families who prefer them.",
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
          "Sessions run in person at our Burnaby centre or online, whichever works best for your family.",
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
          "Choose in-person sessions at our Burnaby centre or online — the personalised approach is the same.",
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
          "Sessions run in person at our Burnaby centre or online, with clear diagrams and step-by-step working.",
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
      "Sessions are online across Vancouver, or in person at our Burnaby centre, and always aligned to the BC curriculum.",
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
          "Yes, online across Vancouver, with in-person sessions at our Burnaby centre.",
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
          "Yes — live one-on-one online sessions, with in-person options at our Burnaby centre.",
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
          "Sessions run in person at our Burnaby centre or online, on a schedule that fits your exam dates.",
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
];

export const getSeoPageBySlug = (slug: string): SeoPage | undefined =>
  seoPages.find((p) => p.slug === slug);
