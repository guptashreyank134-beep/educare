/**
 * City-specific landing page content.
 *
 * Each entry powers a `/math-tutor-<slug>` page rendered by
 * components/CityLandingPage.tsx.
 *
 * IMPORTANT — why these pages are written the way they are:
 * the shared template contributes roughly 850 words to every city page. If the
 * only per-city text is a name-swapped intro and three name-swapped FAQs, the
 * pages come out ~90% identical and read as templated doorway pages, which is
 * a real ranking risk. Every city therefore gets its OWN angle, its OWN
 * sentences, and a `localSections` block of genuine local substance. When
 * adding a city, write it fresh — never copy another city and swap the name.
 *
 * To add a city: append an entry here and create app/math-tutor-<slug>/page.tsx
 * (copy an existing one and change the CITY_SLUG). Also add the route to
 * app/sitemap.ts.
 */

export interface CityFAQ {
  question: string;
  answer: string;
}

export interface CityWhyPoint {
  title: string;
  description: string;
}

/** A substantial, city-specific content block rendered below the intro. */
export interface CityLocalSection {
  heading: string;
  body: string[];
}

export interface City {
  /** URL slug segment, e.g. "burnaby" -> /math-tutor-burnaby */
  slug: string;
  /** Display name, e.g. "Burnaby" */
  name: string;
  region: string;
  /** SEO meta title (~55-65 chars ideal) */
  metaTitle: string;
  /** SEO meta description (~150-160 chars) */
  metaDescription: string;
  /** Hero H1 */
  heroHeading: string;
  /** Hero supporting sentence */
  heroSubheading: string;
  /** Unique local body paragraphs (rendered under an "About" heading) */
  intro: string[];
  /** Neighbourhoods / areas served, shown as chips */
  neighborhoods: string[];
  /** Local schools whose students we support (BC curriculum relevance) */
  nearbySchools: string[];
  /** One honest sentence about in-person vs online availability for this city */
  availability: string;
  /**
   * Long-form, genuinely city-specific content. This is what keeps each city
   * page distinct: the shared template contributes ~850 words to every page, so
   * without real local substance here the pages fingerprint as near-duplicates.
   * Give each city its own angle and its own sentences — never a name swap.
   */
  localSections?: CityLocalSection[];
  /**
   * Locally-framed copy for the shared "who we help" section. Without these the
   * block is byte-identical on every city page and is the single largest source
   * of duplicate text across the set.
   */
  aboutHeading?: string;
  aboutBody?: string[];
  aboutPoints?: string[];
  /** City-specific FAQs (also emitted as FAQPage schema) */
  faqs: CityFAQ[];
}

export const BASE_URL = "https://www.drshreyankeducare.com";

/** Canonical path for a city page (no trailing slash). */
export const cityPath = (slug: string) => `/math-tutor-${slug}`;
export const cityUrl = (slug: string) => `${BASE_URL}${cityPath(slug)}`;

export const cities: City[] = [
  {
    slug: "burnaby",
    name: "Burnaby",
    region: "BC",
    metaTitle: "Math Tutor in Burnaby | Physics, Chemistry & Coding",
    metaDescription:
      "Top-rated Burnaby math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book a free consultation.",
    heroHeading: "Top-Rated Math Tutor in Burnaby",
    heroSubheading:
      "PhD-led tutoring in Math, Physics, Chemistry and Coding for Grades 6–12 and university — and the one city where we teach face to face.",
    intro: [
      "Burnaby is where we teach in person, and that changes what a session can do. Sitting next to a student, a tutor sees the exact moment the pencil stops moving — the pause before a negative sign, the step that quietly gets skipped every single time. That kind of diagnostic detail is difficult to get any other way, and it is usually why our Burnaby students find their footing quickly.",
      "We work across the full range, from Grade 6 fundamentals through Pre-Calculus 12, AP and university coursework, including SFU students who have run into first-year calculus. Every session is built around the material your teacher handed out this week rather than a generic workbook.",
    ],
    neighborhoods: [
      "Metrotown",
      "Brentwood",
      "Lougheed",
      "Edmonds",
      "Highgate",
      "Deer Lake",
      "Burnaby Heights",
      "SFU / UniverCity",
    ],
    nearbySchools: [
      "Burnaby North Secondary",
      "Burnaby Central Secondary",
      "Moscrop Secondary",
      "Byrne Creek Secondary",
      "Alpha Secondary",
    ],
    availability:
      "Burnaby is our home base, so students here can attend in person, with online sessions available for families who prefer to learn from home.",
    localSections: [
      {
        heading: "Who Benefits Most From Sitting in the Room",
        body: [
          "Online tutoring works well for most students, but not all of them equally. Younger students, and students who have learned to nod along rather than admit they are lost, tend to do noticeably better in person — it is much harder to quietly disengage when someone is sitting beside you watching the page.",
          "The same applies to students whose difficulty is with the physical act of doing mathematics: setting work out clearly, keeping track of a multi-step problem, showing enough method to earn part marks. Those habits are far easier to correct with a shared sheet of paper than a shared screen.",
        ],
      },
      {
        heading: "From a Burnaby Classroom to SFU",
        body: [
          "Simon Fraser sits at the top of Burnaby Mountain, and we see both ends of that pipeline: secondary students working toward the admission average they need, and undergraduates who arrived with a strong Pre-Calculus 12 mark and still hit a wall in first-year calculus.",
          "That wall is common and it is not a sign the student was overrated. High school mathematics rewards recognising familiar question types; university mathematics asks you to justify why a method is valid. We spend a lot of time on exactly that transition, and it is easier to make before the first midterm than after it.",
        ],
      },
    ],
    aboutHeading: "Struggling In Class? Sit Down With A Tutor In Burnaby",
    aboutBody: [
      "Most students who fall behind are not short of ability. They are short of the one uninterrupted explanation that would have made a topic click, and in a full classroom that explanation rarely arrives at the moment it is needed.",
      "Because Burnaby is our home location, we can do that in the same room — watching the work happen on paper and catching a hesitation before it hardens into a habit.",
    ],
    aboutPoints: [
      "Go quiet in class rather than ask the question",
      "Understand the lesson but lose marks under exam conditions",
      "Skip their working and cannot show method for part marks",
      "Are moving from Pre-Calculus 12 into first-year calculus at SFU",
      "Would work better beside a tutor than in front of a screen",
    ],
    faqs: [
      {
        question: "My child does fine on homework but freezes in tests — can you help with that?",
        answer:
          "Yes, and it is one of the most common reasons families call. Homework is done with notes open and no clock running, so it can hide gaps completely. We work under test-like conditions and rebuild the underlying fluency, so the recall does not depend on having the textbook nearby.",
      },
      {
        question: "Do you tutor SFU students as well as school students?",
        answer:
          "We do. First- and second-year calculus and linear algebra are the courses we are asked about most, usually by students who did well in high school and were surprised by the jump. Sessions focus on the reasoning university courses assess rather than on drilling more of the same exercises.",
      },
      {
        question: "Is in-person actually better, or should we just book online?",
        answer:
          "Honestly, it depends on the student. If they are older, self-motivated and their difficulty is with specific content, online is just as effective and far more convenient. If they are younger or tend to go quiet when confused, in person is worth the trip. We are happy to say which we would suggest after the free consultation.",
      },
    ],
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    region: "BC",
    metaTitle: "Math Tutor in Vancouver | Physics, Chemistry & Coding",
    metaDescription:
      "Expert Vancouver math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in Vancouver",
    heroSubheading:
      "Math, Physics, Chemistry and Coding tutoring for Grades 6–12, IB, AP and university — online across the city, or in person a SkyTrain ride away.",
    intro: [
      "Vancouver students compete for university places against an unusually strong cohort, and the distance between an 86 and a 93 often decides an offer. A surprising amount of that gap is not ability. It is method: how a solution is set out, whether an answer gets sanity-checked, how time is rationed across a paper that was designed to be slightly too long.",
      "We teach that method alongside the content, across the BC curriculum, IB and AP. Sessions run online everywhere from Kitsilano and Dunbar to the East Side, and in person in Burnaby, which is a short SkyTrain ride for most Vancouver families.",
    ],
    neighborhoods: [
      "Kitsilano",
      "Kerrisdale",
      "Point Grey",
      "Dunbar",
      "Oakridge",
      "Downtown",
      "East Vancouver",
      "UBC",
    ],
    nearbySchools: [
      "Lord Byng Secondary",
      "Prince of Wales Secondary",
      "Eric Hamber Secondary",
      "Point Grey Secondary",
      "University of British Columbia (UBC)",
    ],
    availability:
      "Vancouver students learn with us online across the city, or in person in Burnaby, easily reached by SkyTrain.",
    localSections: [
      {
        heading: "IB, AP and the Admission Average",
        body: [
          "Vancouver has a high concentration of IB and AP students, and the two programmes fail students in different ways. IB rewards sustained written reasoning and punishes thin explanation even when the final answer is right. AP is faster and more procedural, and punishes students who are accurate but slow.",
          "Knowing which of those is costing the marks matters more than doing extra questions. We start by reading the actual assessments rather than guessing, because a student losing marks on communication needs completely different work from one losing marks on speed.",
        ],
      },
      {
        heading: "The First-Year Jump at UBC",
        body: [
          "Every year we work with students who finished Pre-Calculus 12 with a strong mark and then struggled badly in first-year calculus. This is not usually a content problem — the topics overlap considerably — it is a change in what counts as an answer.",
          "University courses want justification: why this theorem applies, why the limit exists, why the step is permitted. Students trained to pattern-match to worked examples suddenly find that producing the right number earns very little. We work on that shift directly, along with the standard trouble spots in limits, series and linear algebra.",
        ],
      },
    ],
    aboutHeading: "Chasing An Admission Average In Vancouver?",
    aboutBody: [
      "Vancouver students compete for university places against an unusually strong cohort, and the distance between a good mark and a competitive one is frequently method rather than ability — how a solution is set out, whether it gets checked, how time is rationed across a paper.",
      "We teach that alongside the content, across the BC curriculum, IB and AP.",
    ],
    aboutPoints: [
      "Need a specific average for a competitive programme",
      "Lose marks on explanation rather than on the final answer",
      "Are taking IB Analysis and Approaches or AP Calculus",
      "Run out of time before finishing an examination paper",
      "Have started first-year mathematics at UBC and stalled",
    ],
    faqs: [
      {
        question: "What is the difference between IB Math AA and AI, and does the choice matter?",
        answer:
          "Analysis and Approaches is the more algebraic, proof-oriented route and is the safer choice for engineering, mathematics, physics and most competitive science programmes. Applications and Interpretation leans toward modelling and statistics. It is worth checking the specific prerequisites of the programmes your child is aiming at before committing, because switching later is disruptive.",
      },
      {
        question: "My child is in the low 80s and needs the mid 90s for their programme. Is that realistic?",
        answer:
          "Sometimes, and the honest answer depends on why the marks are where they are. A student losing marks to careless slips and poor exam technique can move a long way quickly. A student with genuine gaps going back a couple of years can also get there, but it takes longer and we would rather say so at the start than at the end.",
      },
      {
        question: "Do you tutor UBC first-year calculus and linear algebra?",
        answer:
          "Yes, those two are among our most requested university courses. We also work with students in second-year courses and in the mathematics that sits inside physics, chemistry, economics and engineering coursework.",
      },
    ],
  },
  {
    slug: "north-vancouver",
    name: "North Vancouver",
    region: "BC",
    metaTitle: "Math Tutor in North Vancouver | Physics & Chemistry",
    metaDescription:
      "North Vancouver math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book a free consultation today.",
    heroHeading: "Expert Math Tutor in North Vancouver",
    heroSubheading:
      "One-on-one Math, Physics, Chemistry and Coding tutoring for Grades 6–12 and university — online, so nobody has to cross a bridge at rush hour.",
    intro: [
      "For North Shore families the obstacle is rarely finding a tutor. It is the bridge. A crossing at the wrong time of day turns a one-hour lesson into most of an evening, and that arithmetic is why a lot of well-intentioned tutoring arrangements quietly stop by November.",
      "Our sessions run online, so an hour costs an hour. That matters especially on the North Shore, where a large share of students give their evenings to training and practice schedules — tutoring can be fitted around ski season, rowing or club sport rather than competing with them for the same slot.",
    ],
    neighborhoods: [
      "Lonsdale",
      "Lynn Valley",
      "Deep Cove",
      "Edgemont Village",
      "Capilano",
      "Seymour",
      "Central Lonsdale",
    ],
    nearbySchools: [
      "Handsworth Secondary",
      "Carson Graham Secondary",
      "Sutherland Secondary",
      "Argyle Secondary",
      "Windsor Secondary",
    ],
    availability:
      "North Vancouver students learn with us through flexible online tutoring, with in-person sessions available at our Burnaby location.",
    localSections: [
      {
        heading: "Keeping Tutoring Alive Through a Busy Season",
        body: [
          "The students we see slip furthest are rarely the least able. They are the ones with the fullest calendars, who miss three weeks for a competition season and return to a class that has moved on to a topic built on the one they missed.",
          "Because sessions are online and short, they survive that kind of term. We would rather run a focused forty minutes in a genuinely busy week than have a family cancel a two-hour block and lose the thread entirely. Consistency, even at low volume, is what keeps a student from having to rebuild in April.",
        ],
      },
      {
        heading: "What an Online Session Actually Looks Like",
        body: [
          "Sessions are live and one-to-one over video with a shared digital whiteboard — not a recorded course and not a chat window. The tutor writes, the student writes, and both see the same page develop in real time.",
          "In practice most sessions start with whatever the student has in front of them: this week's worksheet, a returned test, an assignment due Thursday. Working from their own material is what keeps the hour relevant, and it means a parent can see the connection between the session and the next report card.",
        ],
      },
    ],
    aboutHeading: "Tutoring That Fits A North Shore Schedule",
    aboutBody: [
      "On the North Shore the difficulty is rarely finding help. It is the bridge — a crossing at the wrong hour turns a one-hour lesson into most of an evening, and that arithmetic is what quietly ends most tutoring arrangements by November.",
      "Online sessions keep the hour to an hour, and bend around training and practice commitments instead of competing with them for the same slot.",
    ],
    aboutPoints: [
      "Lose evenings to training, practice or competition schedules",
      "Have missed weeks and come back to a class that moved on",
      "Need help without a rush-hour bridge crossing",
      "Are working through Pre-Calculus, Physics or Chemistry this term",
      "Do better with short, frequent sessions than long blocks",
    ],
    faqs: [
      {
        question: "Is online tutoring genuinely as effective as sitting in a room?",
        answer:
          "For most secondary and university students, yes — the shared whiteboard covers nearly everything a desk would, and the time saved usually buys an extra session a month. The students who benefit more from in person are younger ones, and those who tend to hide confusion rather than voice it.",
      },
      {
        question: "Can session times move week to week around training schedules?",
        answer:
          "Yes. A fixed weekly slot is ideal when it is possible, but we would rather move a session than lose it. Families with competition or performance schedules usually settle into a rhythm of shifting the time rather than skipping the week.",
      },
      {
        question: "What does my child need for an online session?",
        answer:
          "A laptop or tablet, a reliable connection, and their current course material. A stylus or drawing tablet helps for mathematics but is not required — plenty of students work on paper and hold it up or photograph it, and the tutor writes on the shared board.",
      },
    ],
  },
  {
    slug: "west-vancouver",
    name: "West Vancouver",
    region: "BC",
    metaTitle: "Math Tutor in West Vancouver | Physics & Chemistry",
    metaDescription:
      "West Vancouver math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC & IB curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in West Vancouver",
    heroSubheading:
      "Math, Physics, Chemistry and Coding tutoring for Grades 6–12, IB, AP and university — depth and extension for students who are already doing well.",
    intro: [
      "A good number of West Vancouver enquiries do not begin with a problem at all. They begin with a student who is getting strong marks and a parent with a quiet suspicion that those marks are coming from memory rather than understanding — a suspicion that tends to be confirmed the first time a course turns abstract.",
      "That is much of the work we do here: taking a capable student and making their understanding structural instead of procedural, so it holds up in IB Higher Level, in AP, and in first year at university, where recognising the shape of a question stops being enough to answer it.",
    ],
    neighborhoods: [
      "Ambleside",
      "Dundarave",
      "British Properties",
      "Caulfeild",
      "Horseshoe Bay",
      "Cypress",
      "Park Royal",
    ],
    nearbySchools: [
      "West Vancouver Secondary",
      "Sentinel Secondary",
      "Rockridge Secondary",
      "Collingwood School",
      "Mulgrave School",
    ],
    availability:
      "West Vancouver students learn through flexible online tutoring, with in-person sessions available at our Burnaby location.",
    localSections: [
      {
        heading: "When a Strong Student Is Not Actually Fine",
        body: [
          "There is a recognisable pattern. The student handles anything that resembles a worked example, but stalls completely on a problem phrased in an unfamiliar way. They can apply a formula and cannot say where it comes from. They lose marks on the derivation and gain them back on the arithmetic.",
          "None of this shows up while a course stays computational, which is why it so often surfaces for the first time in Grade 12 or in Higher Level — by which point the student has built two years of confidence on a foundation that was never tested. Catching it earlier is far less disruptive than repairing it during a graduating year.",
        ],
      },
      {
        heading: "Extension for Students Who Are Ahead",
        body: [
          "Not every student who needs a tutor is behind. Some are bored, which looks like carelessness and gets treated as an attitude problem when it is really an unmet appetite.",
          "For those students we work above the syllabus: harder and less familiar problems, competition-style questions, and early exposure to ideas from university mathematics. The aim is not to race ahead through the curriculum but to make the subject interesting again, which in our experience does more for a mark than another set of routine exercises.",
        ],
      },
    ],
    aboutHeading: "Good Marks — But Is There Understanding Underneath?",
    aboutBody: [
      "A lot of West Vancouver enquiries begin with a capable student rather than a struggling one, and with a parent who suspects the marks are resting on memorisation rather than understanding.",
      "That suspicion is usually confirmed the first time a course turns abstract. We would rather make the understanding structural before it gets tested.",
    ],
    aboutPoints: [
      "Handle familiar exercises but stall on unfamiliar problems",
      "Apply a formula without being able to say where it comes from",
      "Are heading into IB Higher Level or AP mathematics",
      "Find schoolwork easy and have stopped being challenged by it",
      "Make careless errors that look like weakness but are boredom",
    ],
    faqs: [
      {
        question: "My child has an A but I do not think they really understand it. Is that a real thing?",
        answer:
          "It is, and it is more common in high-achieving cohorts than people expect. A capable student can carry a course a long way on pattern recognition and diligence. The usual tell is that they are fine on anything resembling practice material and lost on a genuinely unfamiliar question. It is very fixable, and much easier to address before Grade 12.",
      },
      {
        question: "Do you work with students who are ahead and bored rather than behind?",
        answer:
          "Yes, and we enjoy it. Those sessions look quite different — less revision, more difficult and open-ended problems, and often material from beyond the course. Parents frequently find that engagement fixes the careless-mistake problem that prompted the call in the first place.",
      },
      {
        question: "Can you support IB Higher Level Mathematics?",
        answer:
          "Yes. HL Analysis and Approaches is one of our most requested courses, along with HL Physics and Chemistry. We support the internal assessment as well as examination preparation, though we help students develop their own work rather than produce it for them.",
      },
    ],
  },
  {
    slug: "coquitlam",
    name: "Coquitlam",
    region: "BC",
    metaTitle: "Math Tutor in Coquitlam | Physics, Chemistry & Coding",
    metaDescription:
      "Coquitlam math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book your free consultation today.",
    heroHeading: "Expert Math Tutor in Coquitlam",
    heroSubheading:
      "Math, Physics, Chemistry and Coding tutoring for Grades 6–12 and university — with particular attention to the Grade 10 to 11 jump.",
    intro: [
      "The most frequent call we get from Coquitlam is about Grade 11. A student moves through Grade 9 and 10 mathematics comfortably, meets Pre-Calculus 11, and the marks drop sharply within a term. Parents reasonably assume something has gone wrong. Usually nothing has — the course has simply started demanding the algebra habits the student was able to work around until now.",
      "So that is what we rebuild: fluent factoring, genuine comfort with fractions and radicals, and the discipline of writing a solution down instead of holding it in your head. Sessions run online for families from Town Centre and Burke Mountain through Maillardville, Austin Heights and Westwood Plateau.",
    ],
    neighborhoods: [
      "Coquitlam Town Centre",
      "Burke Mountain",
      "Maillardville",
      "Austin Heights",
      "Westwood Plateau",
      "Eagle Ridge",
    ],
    nearbySchools: [
      "Gleneagle Secondary",
      "Centennial Secondary",
      "Dr. Charles Best Secondary",
      "Pinetree Secondary",
      "Heritage Woods Secondary",
    ],
    availability:
      "Coquitlam students learn with us through flexible online tutoring, with in-person sessions available at our Burnaby location.",
    localSections: [
      {
        heading: "Why Pre-Calculus 11 Is Where Marks Fall",
        body: [
          "Up to Grade 10, most mathematics questions tell you fairly plainly what to do. Pre-Calculus 11 stops doing that. Problems become multi-step, the algebra is assumed rather than taught, and a student who has been quietly weak at manipulating expressions can no longer get to the end of a question even when they understand the concept being tested.",
          "This is why the drop feels so abrupt and so personal. The student has not become worse at mathematics; the course has stopped compensating for a specific, narrow weakness. Identifying which weakness it is takes a session or two, and fixing it is usually a matter of weeks rather than months.",
        ],
      },
      {
        heading: "Dealing With It Before Grade 12",
        body: [
          "Pre-Calculus 12 assumes everything from 11 and moves faster. A gap carried forward does not stay the same size — it compounds, because each new topic is built on the one the student did not secure.",
          "The practical consequence is that the same problem costs far more to fix in Grade 12, when it is competing with graduation requirements and application deadlines, than it does mid-way through Grade 11. If the marks have moved and you are unsure whether it is a blip, that is a good moment to have someone look rather than wait a reporting period.",
        ],
      },
    ],
    aboutHeading: "Did Your Child's Marks Fall Away In Grade 11?",
    aboutBody: [
      "It is the call we take most often from Coquitlam. A student moves through Grade 9 and 10 comfortably, meets Pre-Calculus 11, and the marks drop sharply inside a single term.",
      "Nothing has gone wrong with the student. The course has started demanding the algebra habits they were previously able to work around, and those habits can be rebuilt.",
    ],
    aboutPoints: [
      "Did well until Pre-Calculus 11 and then dropped suddenly",
      "Cannot finish multi-step questions they understand conceptually",
      "Are shaky with factoring, fractions or radicals",
      "Solve in their head and lose marks for missing method",
      "Are carrying Grade 11 gaps forward into Pre-Calculus 12",
    ],
    faqs: [
      {
        question: "My child had strong marks until Grade 11 mathematics. What changed?",
        answer:
          "Almost always it is that Pre-Calculus 11 begins assuming algebraic fluency instead of teaching it, while the questions become multi-step. A student who could previously get by without solid factoring or fraction work suddenly cannot finish problems. It reads as a sudden collapse but it is usually one specific, fixable gap.",
      },
      {
        question: "Is it too late to fix the gaps if my child is already in Grade 12?",
        answer:
          "No, but it is more work, and we will be straight with you about the timeline. The Grade 11 material still has to be secured because Grade 12 rests on it, so early sessions often cover both at once. Starting in September is a very different proposition from starting in April.",
      },
      {
        question: "Do you cover Foundations of Mathematics as well as Pre-Calculus?",
        answer:
          "Yes, both streams, along with Workplace Mathematics. If you are unsure which stream suits your child's intended path after graduation, that is worth discussing at the consultation, because the choice affects which post-secondary programmes stay open.",
      },
    ],
  },
  {
    slug: "port-moody",
    name: "Port Moody",
    region: "BC",
    metaTitle: "Math Tutor in Port Moody | Physics & Chemistry",
    metaDescription:
      "Port Moody math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in Port Moody",
    heroSubheading:
      "Steady weekly Math, Physics, Chemistry and Coding tutoring for Grades 6–12 and university — built to catch problems before they become urgent.",
    intro: [
      "Port Moody families tend to come to us for the long game rather than an emergency. The pattern we see most often is drift: a student who is not failing anything, who has simply stopped understanding, and whose marks slide a few points each reporting period until somebody finally notices.",
      "Regular weekly sessions are unusually good at catching that, because a tutor working with the same student every week sees the slide well before a report card does. We work with students from Heritage Mountain and Klahanie through Newport Village, College Park and Inlet Centre.",
    ],
    neighborhoods: [
      "Heritage Mountain",
      "Klahanie",
      "Newport Village",
      "Heritage Woods",
      "College Park",
      "Inlet Centre",
    ],
    nearbySchools: [
      "Port Moody Secondary",
      "Heritage Woods Secondary",
      "Moody Middle School",
    ],
    availability:
      "Port Moody students learn through flexible online tutoring, with in-person sessions available at our Burnaby location.",
    localSections: [
      {
        heading: "The Case for Starting Before It Is Urgent",
        body: [
          "Most families call when a mark has already dropped, which is understandable but expensive. By then the student has usually lost several topics, and the work is remedial and demoralising rather than incremental.",
          "Early looks unremarkable: homework taking longer than it used to, a reluctance to show work, an answer that is right without the student being able to explain it. None of that triggers alarm on its own, which is exactly why it is worth having someone assess it while the fix is still small.",
        ],
      },
      {
        heading: "What a Regular Weekly Session Covers",
        body: [
          "A typical hour splits three ways. We look at whatever came back marked since last week, because a returned test is the most honest diagnostic available. We work through current homework, so the session earns its place in an already full week. And we pre-teach the topic coming next, which is the part families underrate.",
          "Pre-teaching changes the dynamic in class. A student who has already met an idea once arrives able to follow the lesson rather than decode it, and asks better questions of their own teacher — which over a term does more good than any amount of catch-up.",
        ],
      },
    ],
    aboutHeading: "Not Failing, But Quietly Slipping Behind?",
    aboutBody: [
      "Most Port Moody families come to us about drift rather than crisis — a student who is coping, has stopped genuinely understanding, and loses a few marks each reporting period until somebody finally notices.",
      "Regular weekly sessions catch that early, because a tutor working with the same student every week sees the slide long before a report card reports it.",
    ],
    aboutPoints: [
      "Take noticeably longer over homework than they used to",
      "Arrive at the right answer but cannot explain how",
      "Are reluctant to show any written working",
      "Have slipped a few marks a term without failing anything",
      "Would benefit from steady weekly support rather than a rescue",
    ],
    faqs: [
      {
        question: "My child is not failing anything. Is tutoring premature?",
        answer:
          "Usually the opposite. Working with a student who is coping but drifting is faster, cheaper and considerably less stressful than intervening after a bad term. If you are seeing homework take longer than it used to, that is a reasonable point to have someone look.",
      },
      {
        question: "How long do students normally stay with you?",
        answer:
          "It varies a great deal. Some come for a few weeks around a specific unit or an exam and then stop, which is a perfectly good outcome. Others stay across a full course, particularly through Pre-Calculus 11 and 12. We are not going to push for continuation once a student no longer needs it.",
      },
      {
        question: "What actually happens in a typical session?",
        answer:
          "Roughly: review what came back marked, work through current homework, then preview what is coming next so the student walks into class already familiar with it. The balance shifts depending on whether an assessment is close.",
      },
    ],
  },
  {
    slug: "port-coquitlam",
    name: "Port Coquitlam",
    region: "BC",
    metaTitle: "Math Tutor in Port Coquitlam | Physics & Chemistry",
    metaDescription:
      "Port Coquitlam math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book a free consultation.",
    heroHeading: "Expert Math Tutor in Port Coquitlam",
    heroSubheading:
      "Math, Physics, Chemistry and Coding tutoring for Grades 6–12 and university — including help choosing between Workplace, Foundations and Pre-Calculus.",
    intro: [
      "One decision quietly does more damage than any single bad test result: choosing the wrong Grade 11 mathematics stream. British Columbia splits students between Workplace Mathematics, Foundations of Mathematics and Pre-Calculus, and that choice is often made on the basis of which course looks survivable this year rather than which one the student's intended path actually requires.",
      "Pre-Calculus is the prerequisite for most science, engineering, health and many business programmes. Stepping out of it to protect a grade point average can close those doors roughly two years before anyone notices they have closed. We help students stay in the stream they need — and help families work out which stream that is.",
    ],
    neighborhoods: [
      "Citadel Heights",
      "Birchland Manor",
      "Central Port Coquitlam",
      "Riverwood",
      "Mary Hill",
      "Lincoln Park",
    ],
    nearbySchools: [
      "Terry Fox Secondary",
      "Riverside Secondary",
      "Archbishop Carney Regional",
    ],
    availability:
      "Port Coquitlam students learn through flexible online tutoring, with in-person sessions available at our Burnaby location.",
    localSections: [
      {
        heading: "Workplace, Foundations or Pre-Calculus?",
        body: [
          "Workplace Mathematics is built around practical, applied numeracy. Foundations of Mathematics suits students heading toward arts, humanities and a number of college programmes. Pre-Calculus is the algebraic, function-heavy route, and it is the one nearly every science, engineering and health-science programme lists as a prerequisite.",
          "The difficulty is that the streams are chosen in Grade 10 or 11, when many students have no settled idea of what they want to do at nineteen. Choosing the least demanding option is a rational response to a hard year, but it is a decision with a long tail, and it is worth making deliberately rather than by default.",
        ],
      },
      {
        heading: "Staying in Pre-Calculus When It Gets Hard",
        body: [
          "When a student is struggling in Pre-Calculus, the usual advice is to move down a stream. Sometimes that genuinely is right. Often it is a response to two or three specific topics rather than to the course as a whole.",
          "Before a family makes that call, it is worth finding out which it is. If a student is coping with functions and losing marks purely on trigonometric identities, that is a targeted problem with a targeted fix, and stepping down would trade a temporary difficulty for a permanent limitation.",
        ],
      },
      {
        heading: "Physics 11 and 12 Alongside the Mathematics",
        body: [
          "Physics is where weak algebra becomes visible fastest. A student who cannot rearrange an equation confidently will lose marks on kinematics questions they conceptually understand perfectly well, because the physics and the algebra are being assessed simultaneously and only one of them is the stated topic.",
          "We teach the two together for that reason. Forces and free-body diagrams, momentum and energy conservation, and the circuit work in Physics 12 all reward a student who can set up an equation cleanly and track units through it. Fixing the algebra usually lifts the physics mark more than additional physics revision does.",
        ],
      },
    ],
    aboutHeading: "Choosing A Grade 11 Math Stream In Port Coquitlam?",
    aboutBody: [
      "Few school decisions matter more, and few are made with less information. Workplace, Foundations and Pre-Calculus lead to genuinely different places, and Pre-Calculus is the prerequisite for most science, engineering and health-science programmes.",
      "Stepping out of it to protect a grade point average can close those doors roughly two years before anyone notices they have closed.",
    ],
    aboutPoints: [
      "Are deciding between Workplace, Foundations and Pre-Calculus",
      "Want to drop a stream because this particular term is hard",
      "Are struggling with two or three topics rather than the course",
      "Need Physics 11 or 12 alongside the mathematics",
      "Are aiming at a programme that requires Pre-Calculus 12",
    ],
    faqs: [
      {
        question: "Which Grade 11 mathematics should my child take?",
        answer:
          "It depends entirely on what they might want to study after graduation. If there is any realistic chance of science, engineering, health sciences or many business programmes, they need Pre-Calculus, because those programmes list it as a prerequisite. If the direction is clearly toward arts or particular college programmes, Foundations may serve them better.",
      },
      {
        question: "My child wants to drop from Pre-Calculus to Foundations. Should they?",
        answer:
          "Find out first whether the problem is the whole course or two or three topics — the answer changes the decision completely. Dropping down solves this term and can close programme options two years out. It is sometimes the right call, but it deserves more scrutiny than it usually gets.",
      },
      {
        question: "Can a student move back up to Pre-Calculus later?",
        answer:
          "It is possible but genuinely difficult, because the courses diverge quickly and the student would be rejoining without the intervening material. Many students end up taking Pre-Calculus 11 later through summer or upgrading courses. That is doable, but it is far easier not to have to.",
      },
    ],
  },
  {
    slug: "surrey",
    name: "Surrey",
    region: "BC",
    metaTitle: "Math Tutor in Surrey | Physics, Chemistry & Coding",
    metaDescription:
      "Surrey math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book your free consultation today.",
    heroHeading: "Expert Math Tutor in Surrey",
    heroSubheading:
      "Math, Physics, Chemistry and Coding tutoring for Grades 6–12 and university — the individual attention a full classroom cannot give.",
    intro: [
      "Surrey runs the largest school district in British Columbia, and for an individual student the consequence is straightforward arithmetic. In a full class, a teacher dividing attention evenly has a couple of minutes per student per hour. A student who needs ten uninterrupted minutes on one idea is not going to get them, however good the teacher is.",
      "That specific gap is what one-to-one tutoring exists to fill. Sessions run online for families spread across Guildford, Fleetwood, Newton, Cloverdale, Panorama Ridge, Fraser Heights and South Surrey — a city big enough that driving to a tutoring centre can easily cost more time than the lesson itself.",
    ],
    neighborhoods: [
      "Guildford",
      "Fleetwood",
      "Newton",
      "Cloverdale",
      "South Surrey",
      "City Centre / Whalley",
      "Panorama Ridge",
      "Fraser Heights",
    ],
    nearbySchools: [
      "Fraser Heights Secondary",
      "Semiahmoo Secondary",
      "Panorama Ridge Secondary",
      "Elgin Park Secondary",
      "Sullivan Heights Secondary",
    ],
    availability:
      "Surrey students learn with us through flexible online tutoring, with in-person sessions available at our Burnaby location.",
    localSections: [
      {
        heading: "What Changes With One Student in the Room",
        body: [
          "The obvious difference is pace — the lesson moves at the speed of the student rather than the median of thirty. The less obvious difference matters more: a student will admit confusion to one adult in a private session that they would never admit in front of a class.",
          "That willingness is most of the value. A great deal of accumulated difficulty in mathematics traces back to a single idea a student did not want to ask about at thirteen, which every later topic then quietly assumed. Removing the social cost of the question is often what unblocks a year of material.",
        ],
      },
      {
        heading: "Covering a City This Large",
        body: [
          "Surrey is geographically enormous, and the practical effect on tutoring is that in-person options are frequently a thirty- or forty-minute drive each way. Families take that on in September with good intentions, and by the middle of a wet November it is the first commitment to be dropped.",
          "Online sessions remove that failure mode. There is no drive, no parking and no reason to cancel because of weather or traffic, which in our experience is the single biggest factor in whether tutoring lasts long enough to show up in a grade.",
        ],
      },
    ],
    aboutHeading: "Lost In A Full Surrey Classroom?",
    aboutBody: [
      "In the province's largest district the arithmetic is unforgiving: a teacher dividing attention evenly across a full class has roughly a couple of minutes per student in an hour. A student who needs ten uninterrupted minutes on one idea is not going to get them.",
      "Closing that specific gap is the entire purpose of one-to-one sessions.",
    ],
    aboutPoints: [
      "Never ask questions in front of the rest of the class",
      "Need longer on a single concept than a lesson can allow",
      "Have gaps that go back a year or more",
      "Live too far across Surrey for a tutoring-centre commute",
      "Would speak up with one adult but never with thirty peers",
    ],
    faqs: [
      {
        question: "How is this different from the extra help my child can get at school?",
        answer:
          "School help is genuinely valuable and free, and we would never suggest skipping it. The difference is time and privacy: a teacher at lunch is usually helping several students at once and working around the class schedule. A session is one student, at their pace, going back as many years as necessary to find where the gap actually starts.",
      },
      {
        question: "My child never asks questions in class. Will they in a session?",
        answer:
          "Almost always, though it can take two or three sessions. Most reticence in class is social rather than a matter of personality, and it disappears once there is no audience. Tutors also work by asking the student to explain their reasoning, which surfaces confusion without the student having to volunteer it.",
      },
      {
        question: "Do you come to Surrey for in-person sessions?",
        answer:
          "No, and we would rather be direct about it. Surrey families are taught online. In-person sessions happen at our Burnaby location, which is a long drive from most of Surrey, so for the majority of families here online is the sensible option rather than a compromise.",
      },
    ],
  },
  {
    slug: "richmond",
    name: "Richmond",
    region: "BC",
    metaTitle: "Math Tutor in Richmond | Physics, Chemistry & Coding",
    metaDescription:
      "Richmond math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in Richmond",
    heroSubheading:
      "Math, Physics, Chemistry and Coding tutoring for Grades 6–12 and university — for students who want to understand it, not just score well.",
    intro: [
      "Richmond students often arrive already performing well, which makes the request an unusual one: not help my child pass, but help my child actually understand this. It is a good instinct. A student who can reproduce a method without being able to say why it works will meet a ceiling eventually — commonly in Calculus, occasionally not until first year at university.",
      "So we teach for the layer underneath: where a result comes from, the conditions under which it fails, and what a question is really assessing. Sessions run online for families from Steveston and Seafair through Brighouse, Broadmoor, Terra Nova and City Centre.",
    ],
    neighborhoods: [
      "Steveston",
      "Brighouse",
      "Broadmoor",
      "Terra Nova",
      "Hamilton",
      "City Centre",
      "Seafair",
    ],
    nearbySchools: [
      "Richmond Secondary",
      "Steveston-London Secondary",
      "Hugh McRoberts Secondary",
      "R.C. Palmer Secondary",
      "Hugh Boyd Secondary",
    ],
    availability:
      "Richmond students learn with us through flexible online tutoring, with in-person sessions available at our Burnaby location.",
    localSections: [
      {
        heading: "Marks and Understanding Are Not the Same Measurement",
        body: [
          "A diligent student can carry a mathematics course a long way on memory and practice volume. They recognise question types, recall the matching procedure, and execute it accurately. On most school assessments that is worth a very high mark, so nothing appears to be wrong.",
          "The limitation only becomes visible when a question is posed in an unfamiliar form, or when a course starts asking for justification rather than an answer. At that point the student has no way to reconstruct the method, because they never had the reasoning that generated it. The repair is straightforward but it does take deliberate work.",
        ],
      },
      {
        heading: "Work Beyond the Syllabus",
        body: [
          "For students who find their coursework comfortable, more of the same is not useful. We move instead to problems that require several ideas combined, competition-style questions, and topics the school course will not reach.",
          "This is partly about keeping a strong student interested, which matters more than it sounds — boredom produces careless errors that look like weakness. It is also genuine preparation, because unfamiliar and multi-step problems are precisely what university mathematics consists of.",
        ],
      },
      {
        heading: "Chemistry 11 and 12",
        body: [
          "Chemistry divides students at one specific point: the mole. Everything downstream — stoichiometry, solution concentration, limiting reagents, gas calculations — assumes the mole concept is genuinely intuitive rather than a formula being copied off a reference sheet.",
          "In Chemistry 12 the pressure shifts to equilibrium, acids and bases, and titration work, where students must reason about which direction a system moves and why. These are conceptual questions dressed as calculations, and students who rely on plugging numbers into a memorised expression tend to come unstuck the moment a question changes shape.",
        ],
      },
    ],
    aboutHeading: "High Marks — But Does The Understanding Follow?",
    aboutBody: [
      "Richmond families often ask for something slightly unusual: not help passing, but help genuinely understanding. It is a sound instinct, because a student who reproduces a method without knowing why it works will meet a ceiling sooner or later.",
      "Usually that happens in Calculus. Occasionally it waits until first year at university, where it costs a great deal more.",
    ],
    aboutPoints: [
      "Score well but say themselves that they do not understand it",
      "Recognise question types rather than reason from principles",
      "Are strong enough to want work beyond the syllabus",
      "Would rather have harder problems than more of the same",
      "Are heading into Calculus or Chemistry 12",
    ],
    faqs: [
      {
        question: "My child gets high marks but says they do not understand it. Can both be true?",
        answer:
          "Yes, and it is a more perceptive self-assessment than most students manage. School assessment rewards reliable execution of familiar procedures, which a hard-working student can deliver without the underlying reasoning. The gap tends to appear later, in Calculus or first-year university, so addressing it while marks are still strong is the easy version.",
      },
      {
        question: "Do you prepare students for mathematics competitions?",
        answer:
          "We work on competition-style problems with students who want that kind of challenge — problems that need several ideas combined rather than one remembered method. It suits students who are ahead of their coursework and want something more demanding than additional exercises.",
      },
      {
        question: "Can you actually stretch a student who finds school mathematics easy?",
        answer:
          "That is one of the things we most enjoy doing. Those sessions look nothing like revision: harder problems, ideas from beyond the curriculum, and a lot of asking the student to justify their reasoning rather than produce answers.",
      },
    ],
  },
  {
    slug: "new-westminster",
    name: "New Westminster",
    region: "BC",
    metaTitle: "Math Tutor in New Westminster | Physics & Chemistry",
    metaDescription:
      "New Westminster math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book a free consultation.",
    heroHeading: "Expert Math Tutor in New Westminster",
    heroSubheading:
      "Math, Physics, Chemistry and Coding tutoring for Grades 6–12, university and college — in person just over the Burnaby line, or online.",
    intro: [
      "New Westminster sits directly on the Burnaby boundary, which makes it one of the few places outside Burnaby where in-person sessions are genuinely practical rather than theoretically available. For a good number of families here the trip is shorter than crossing their own city would be in most of the region.",
      "We work with secondary students across the full Grade 6 to 12 range, and with Douglas College students working through first-year calculus and statistics — a group that often arrives having been away from mathematics for several years and expecting the worst.",
    ],
    neighborhoods: [
      "Uptown",
      "Sapperton",
      "Queensborough",
      "Downtown / Quayside",
      "West End",
      "Brow of the Hill",
      "Connaught Heights",
    ],
    nearbySchools: [
      "New Westminster Secondary School (NWSS)",
      "Douglas College",
      "École Qayqayt Elementary",
    ],
    availability:
      "New Westminster borders Burnaby, so students here can easily attend in-person sessions, with online tutoring also available.",
    localSections: [
      {
        heading: "Whichever Format Actually Survives the Term",
        body: [
          "Because both options are realistic here, the question is worth asking properly rather than defaulting. In person suits younger students and anyone who tends to go quiet when lost. Online suits older students, packed schedules and the weeks when something inevitably runs late.",
          "The best format is ultimately the one still happening in March. Plenty of New Westminster families mix the two — in person when the week allows, online when it does not — which keeps the arrangement intact through the parts of the year that usually break it.",
        ],
      },
      {
        heading: "Coming Back to Mathematics as an Adult",
        body: [
          "College students returning to study after several years away are a distinct group with a distinct problem. It is rarely the calculus itself that defeats them. It is the assumed algebra underneath — manipulating expressions, handling fractions and exponents — which was last practised a decade ago and has entirely faded.",
          "Sessions for these students usually start by rebuilding that layer quickly and without ceremony, then move into the actual course content. Adults tend to progress fast once the foundation is back, mostly because they are there by choice and know exactly why they need it.",
        ],
      },
      {
        heading: "Introductory Statistics",
        body: [
          "Statistics is the course that catches out students who were comfortable in algebra, because the difficulty is interpretive rather than computational. Calculating a standard deviation is mechanical. Deciding which test applies, what the null hypothesis should say, and what a p-value does and does not tell you is a different kind of thinking altogether.",
          "We spend most of the time there — on sampling and distributions, on confidence intervals, and on reading a question carefully enough to know what is being asked. Students who have been running procedures without understanding the logic usually find this is where the marks were going.",
        ],
      },
    ],
    aboutHeading: "In-Person Tutoring Just Over The New Westminster Border",
    aboutBody: [
      "New Westminster sits directly on the Burnaby boundary, which makes it one of the few places outside Burnaby where face-to-face sessions are genuinely practical rather than merely available in principle.",
      "We work with secondary students across the full range, and with Douglas College students coming back to mathematics after several years away from it.",
    ],
    aboutPoints: [
      "Would rather meet in person than work through a screen",
      "Are at NWSS and need help matched to their own course",
      "Are a college student facing first-year calculus or statistics",
      "Have been away from mathematics for years and expect the worst",
      "Need the algebra underneath a course rebuilt before anything else",
    ],
    faqs: [
      {
        question: "How far is the in-person location from New Westminster?",
        answer:
          "We teach in person in Burnaby, which borders New Westminster, so for most of the city it is a short trip and considerably easier than in-person tutoring is for families further out in the region. Online remains available if it suits your week better.",
      },
      {
        question: "I am an adult student at Douglas College. Do you teach adults?",
        answer:
          "Yes, regularly. College and mature students are a meaningful part of who we work with, most often in first-year calculus and statistics. Sessions are pitched at an adult learner rather than adapted from school tutoring.",
      },
      {
        question: "I have not done mathematics in ten years. Where would we even begin?",
        answer:
          "With a short diagnostic conversation to find what is actually missing, which is usually less than people fear. In most cases the gap is algebraic technique rather than conceptual ability, and that can be rebuilt quickly. You would not be starting from nothing, and you would not be the first person we have started there with.",
      },
    ],
  },
  {
    slug: "delta",
    name: "Delta",
    region: "BC",
    metaTitle: "Math Tutor in Delta | Physics, Chemistry & Coding",
    metaDescription:
      "Delta math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in Delta",
    heroSubheading:
      "Math, Physics, Chemistry and Coding tutoring for Ladner, Tsawwassen and North Delta — online, so the drive does not decide the tutoring.",
    intro: [
      "Delta's geography is the whole problem. Ladner and Tsawwassen sit far enough from the region's tutoring centres that in-person help means committing an evening to a highway, and North Delta families run the same calculation in a different direction.",
      "Online sessions remove that calculation entirely, and the practical result is that students here actually continue past the first month. We follow BC curriculum coursework from Grade 6 through Pre-Calculus 12, AP and university level, matched to whatever the classroom teacher is covering right now.",
    ],
    neighborhoods: [
      "Ladner",
      "Tsawwassen",
      "North Delta",
      "Sunshine Hills",
      "Nordel",
      "Beach Grove",
    ],
    nearbySchools: [
      "Delta Secondary",
      "Sands Secondary",
      "Seaquam Secondary",
      "Burnsview Secondary",
      "South Delta Secondary",
    ],
    availability:
      "Delta students learn with us through flexible online tutoring, with in-person sessions available at our Burnaby location.",
    localSections: [
      {
        heading: "Why Distance Quietly Ends Most Tutoring",
        body: [
          "Tutoring arrangements rarely stop because the tutoring was not working. They stop because the logistics became unsustainable — a long drive twice a week through a wet winter is a genuine ask, and it is the commitment that gets dropped when a term gets busy.",
          "For families out in Ladner and Tsawwassen that risk is higher than almost anywhere else in the region. Removing the travel is not a convenience feature here; it is the difference between a student getting eight months of support and getting six weeks of it.",
        ],
      },
      {
        heading: "Numeracy Assessments and Provincial Exams",
        body: [
          "Delta students, like all BC students, sit the Graduation Numeracy Assessment, which catches many families off guard because it does not resemble a normal mathematics test. It is less about recalling procedures and more about reasoning through an unfamiliar, often wordy situation.",
          "Students who are strong at routine questions can find that genuinely difficult, and it is worth practising the format specifically rather than assuming good marks will carry across. We work on that alongside course content and final examination preparation.",
        ],
      },
      {
        heading: "Coding and Computer Science From Home",
        body: [
          "Programming is the subject that suits remote teaching best, because the work already lives on a screen. A student shares their editor, the tutor watches the code being written, and a bug gets diagnosed in the moment rather than described after the fact.",
          "Most beginners we work with are stuck on the same handful of things: what a loop is actually doing on each pass, why a function returns nothing, how to read an error message instead of fearing it. We teach Python fundamentals through to data structures and the programming inside senior computer science coursework, always by building something rather than by reciting syntax.",
        ],
      },
    ],
    aboutHeading: "Too Far Out For Tutoring? Delta Learns Online",
    aboutBody: [
      "Ladner and Tsawwassen sit far enough from the region's tutoring centres that in-person help means handing an evening to a highway, and North Delta families run the same calculation in a different direction.",
      "Taking the drive out of the equation is what makes tutoring here last beyond the first month, which is usually the difference between a full year of support and six weeks of it.",
    ],
    aboutPoints: [
      "Live too far out for a twice-weekly drive to be realistic",
      "Have tried tutoring before and stopped because of the travel",
      "Are preparing for the Graduation Numeracy Assessment",
      "Need Pre-Calculus, Physics or Chemistry support this term",
      "Are learning to code and want to work from home",
    ],
    faqs: [
      {
        question: "We are in Tsawwassen. Do you have anyone out this way?",
        answer:
          "We teach Delta students online rather than travelling out, and we would rather be straightforward about that than imply otherwise. Given the distance from most in-person tutoring in the region, online is generally the option that actually lasts a full school year for families here.",
      },
      {
        question: "Does online work for a student who is easily distracted?",
        answer:
          "It can work very well, because one-to-one attention leaves nowhere to drift — the tutor is asking the student to work continuously rather than lecturing. For younger or particularly restless students we would suggest shorter, more frequent sessions instead of a long block.",
      },
      {
        question: "Can you help with the Graduation Numeracy Assessment?",
        answer:
          "Yes. It rewards a different skill from a normal mathematics test — interpreting an unfamiliar, wordy problem and reasoning through it — so students who are good at routine questions sometimes underperform. Practising the specific format makes a noticeable difference.",
      },
    ],
  },
];

export const getCityBySlug = (slug: string): City | undefined =>
  cities.find((c) => c.slug === slug);
