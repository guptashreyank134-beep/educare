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

import { SITE_URL } from "./businessInfo";

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
  /**
   * A real quote from a family in this city. Rendered only when set, so an
   * unfilled slot shows nothing rather than generic filler.
   *
   * TODO(owner): supply genuine, attributable quotes. Leave undefined until
   * then — invented testimonials are not an option.
   */
  localTestimonial?: CityTestimonial;
  /** City-specific FAQs (also emitted as FAQPage schema) */
  faqs: CityFAQ[];
}

/** A real, attributable quote from a family in the city. */
export interface CityTestimonial {
  quote: string;
  /** How the person is credited, e.g. "Parent of a Grade 11 student". */
  attribution: string;
}

export const BASE_URL = SITE_URL;

/** Canonical path for a city page (no trailing slash). */
export const cityPath = (slug: string) => `/math-tutor-${slug}`;
export const cityUrl = (slug: string) => `${BASE_URL}${cityPath(slug)}`;

export const cities: City[] = [
  {
    slug: "burnaby",
    name: "Burnaby",
    region: "BC",
    metaTitle: "Math Tutoring in Burnaby | Grades 6–12 & University",
    metaDescription:
      "In-person and online tutoring in Burnaby — math, physics, chemistry and coding for Grades 6–12 and university. PhD-led, 5★ rated. Book a free consultation.",
    heroHeading: "Math Tutoring in Burnaby for Grades 6–12 and University",
    heroSubheading:
      "PhD-led mathematics tutoring in Burnaby — Foundations, Pre-Calculus 11 & 12, Calculus and university math, one-on-one or small group, in person or online.",
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
        heading: "In-Person Tutoring at Our Burnaby Studio",
        body: [
          "In-person tutoring takes place in a quiet, dedicated tutoring studio at our Burnaby location on Madison Avenue, where students work one-on-one with a tutor in person, not over a screen. It is a private learning space rather than a walk-in storefront — focused, private sessions built around each student.",
          "For mathematics in particular, being in the room helps: a tutor can watch how a student sets out a problem — where a sign gets dropped, where a step is quietly skipped — and correct it on the spot, which is much harder to catch over a screen.",
        ],
      },
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
        question: "Do you offer in-person math tutoring in Burnaby?",
        answer:
          "Yes — we teach in person at our Burnaby centre on Madison Avenue, and online for students who prefer to learn from home.",
      },
      {
        question: "Which grades and math courses do you teach?",
        answer:
          "Grades 6–12 across the BC curriculum — Foundations of Mathematics, Pre-Calculus 11 and 12, and Calculus — as well as first-year university mathematics.",
      },
      {
        question: "Do you teach Pre-Calculus 11 and 12?",
        answer:
          "Yes. Pre-Calculus 11 and 12 are among the courses we tutor most, including transformations, trigonometry, logarithms, word problems and final-exam preparation.",
      },
      {
        question: "Do you tutor SFU, UBC and Langara students?",
        answer:
          "Yes — we support first- and second-year university mathematics, including calculus, linear algebra and statistics, for SFU, UBC and Langara students.",
      },
      {
        question: "What is the difference between one-on-one and group tutoring?",
        answer:
          "One-on-one sessions are fully tailored to a single student's pace and gaps. Small-group sessions (up to six students) cost less per student and suit learners who are close in level and taking the same course.",
      },
      {
        question: "How much does math tutoring cost?",
        answer:
          "One-on-one sessions are $75–$100 per 60-minute session, GST included, varying by level. Group and package options are on the pricing page.",
      },
      {
        question: "Is the consultation a free lesson?",
        answer:
          "No — the free 30-minute consultation is a planning conversation, not a lesson. We discuss your child's needs and suggest a plan that fits, with no obligation.",
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
    heroHeading: "Online Math Tutor for Vancouver Students",
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
    slug: "coquitlam",
    name: "Coquitlam",
    region: "BC",
    metaTitle: "Math Tutor in Coquitlam | Physics, Chemistry & Coding",
    metaDescription:
      "Coquitlam math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book your free consultation today.",
    heroHeading: "Online Math Tutor for Coquitlam Students",
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
    slug: "surrey",
    name: "Surrey",
    region: "BC",
    metaTitle: "Math Tutor in Surrey | Physics, Chemistry & Coding",
    metaDescription:
      "Surrey math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book your free consultation today.",
    heroHeading: "Online Math Tutor for Surrey Students",
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
    heroHeading: "Online Math Tutor for Richmond Students",
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
    heroHeading: "Online Math Tutor for New Westminster Students",
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
];

export const getCityBySlug = (slug: string): City | undefined =>
  cities.find((c) => c.slug === slug);
