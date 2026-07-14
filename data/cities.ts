/**
 * City-specific landing page content.
 *
 * Each entry powers a `/math-tutor-<slug>` page rendered by
 * components/CityLandingPage.tsx. Content is intentionally unique per city
 * (neighbourhoods, schools, local framing) to avoid thin/duplicate pages and
 * to rank for "<subject> tutor in <city>" searches.
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
    metaTitle: "Math Tutor in Burnaby | Physics, Chemistry & Coding — Dr. Shreyank Educare",
    metaDescription:
      "Top-rated Burnaby math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book a free consultation.",
    heroHeading: "Top-Rated Math Tutor in Burnaby",
    heroSubheading:
      "PhD-led tutoring in Math, Physics, Chemistry and Coding for Burnaby students in Grades 6–12 and university — in person at our Burnaby centre or online.",
    intro: [
      "Dr. Shreyank Educare is a Burnaby-based tutoring centre helping local students master Math, Physics, Chemistry and Coding. Because we are based in Burnaby, students across the city get in-person, one-on-one sessions built around the BC curriculum and their exact classroom material.",
      "From Grade 6 fundamentals to Pre-Calculus 12, AP and university-level courses, our tutors close gaps quickly with clear, step-by-step teaching. Whether your child needs to catch up, keep up, or get ahead for provincial and final exams, we tailor every session to their goals.",
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
      "In-person tutoring is available at our Burnaby centre, with online sessions offered for families who prefer to learn from home.",
    faqs: [
      {
        question: "Do you offer in-person math tutoring in Burnaby?",
        answer:
          "Yes. Our tutoring centre is located in Burnaby, so students across Metrotown, Brentwood, Lougheed and surrounding neighbourhoods attend in-person one-on-one sessions. Online tutoring is also available if you prefer.",
      },
      {
        question: "Which Burnaby schools do your students attend?",
        answer:
          "We support students from schools across Burnaby including Burnaby North, Burnaby Central, Moscrop, Byrne Creek and Alpha, as well as SFU university students. We align every session with your teacher's material and the BC curriculum.",
      },
      {
        question: "What subjects and grades do you cover in Burnaby?",
        answer:
          "We tutor Math, Physics, Chemistry and Coding for Grades 6–12, plus AP, IB and university-level courses. This includes Pre-Calculus 11/12, Calculus, and provincial and final exam preparation.",
      },
    ],
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    region: "BC",
    metaTitle: "Math Tutor in Vancouver | Physics, Chemistry & Coding — Dr. Shreyank Educare",
    metaDescription:
      "Expert Vancouver math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in Vancouver",
    heroSubheading:
      "Personalized Math, Physics, Chemistry and Coding tutoring for Vancouver students in Grades 6–12 and university — online across the city or in person nearby in Burnaby.",
    intro: [
      "Dr. Shreyank Educare helps Vancouver students build confidence and improve grades in Math, Physics, Chemistry and Coding. We offer flexible online tutoring across Vancouver, plus in-person sessions at our nearby Burnaby centre — an easy hop along the SkyTrain for many families.",
      "Our PhD-led team works with students from Kitsilano to Kerrisdale and the East Side, tailoring each session to the BC curriculum, IB and AP coursework. From Grade 6 basics through Pre-Calculus 12, Calculus and first-year university math, we turn difficult concepts into clear, repeatable steps.",
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
      "Vancouver students learn with us online across the city, or in person at our Burnaby centre, easily reached via SkyTrain.",
    faqs: [
      {
        question: "Do you tutor Vancouver students online or in person?",
        answer:
          "Both. Most Vancouver families choose flexible online sessions, while others attend in person at our Burnaby centre, which is a short SkyTrain ride from many Vancouver neighbourhoods.",
      },
      {
        question: "Can you help with IB and AP courses in Vancouver?",
        answer:
          "Yes. We regularly support Vancouver students in IB and AP Math, Physics and Chemistry, alongside the standard BC curriculum, and we prepare students for provincial, final and university-entrance exams.",
      },
      {
        question: "Do you cover university math for UBC students?",
        answer:
          "We do. Our tutors help UBC and other university students with first- and second-year calculus, linear algebra and related courses, breaking down tough material into manageable steps.",
      },
    ],
  },
  {
    slug: "north-vancouver",
    name: "North Vancouver",
    region: "BC",
    metaTitle: "Math Tutor in North Vancouver | Physics & Chemistry — Dr. Shreyank Educare",
    metaDescription:
      "North Vancouver math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book a free consultation today.",
    heroHeading: "Expert Math Tutor in North Vancouver",
    heroSubheading:
      "One-on-one Math, Physics, Chemistry and Coding tutoring for North Vancouver students in Grades 6–12 and university — flexible online sessions tailored to the BC curriculum.",
    intro: [
      "Dr. Shreyank Educare supports North Vancouver students with focused, PhD-led tutoring in Math, Physics, Chemistry and Coding. Convenient online sessions let students from Lonsdale to Lynn Valley and Deep Cove learn from home without the cross-bridge commute.",
      "We align every lesson with North Shore classrooms and the BC curriculum, helping students from Grade 6 through Pre-Calculus 12, AP and university courses. Whether preparing for a unit test or a provincial exam, students get clear explanations and steady, measurable progress.",
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
      "North Vancouver students learn with us through flexible online tutoring, with in-person sessions available at our Burnaby centre.",
    faqs: [
      {
        question: "Do you offer tutoring in North Vancouver?",
        answer:
          "Yes. We provide flexible online tutoring for North Vancouver students across Lonsdale, Lynn Valley, Deep Cove and Edgemont, so there's no need to cross the bridge. In-person sessions are available at our Burnaby centre.",
      },
      {
        question: "Which North Vancouver schools do you support?",
        answer:
          "We work with students from Handsworth, Carson Graham, Sutherland, Argyle and Windsor, matching our sessions to their teachers' material and the BC curriculum.",
      },
      {
        question: "How do online sessions work for North Shore families?",
        answer:
          "Online sessions are live and one-on-one over video, using a shared digital whiteboard. They're ideal for North Vancouver families who want expert tutoring without travel time.",
      },
    ],
  },
  {
    slug: "west-vancouver",
    name: "West Vancouver",
    region: "BC",
    metaTitle: "Math Tutor in West Vancouver | Physics & Chemistry — Dr. Shreyank Educare",
    metaDescription:
      "West Vancouver math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC & IB curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in West Vancouver",
    heroSubheading:
      "Premium one-on-one Math, Physics, Chemistry and Coding tutoring for West Vancouver students in Grades 6–12 and university — flexible online, aligned to BC and IB coursework.",
    intro: [
      "Dr. Shreyank Educare offers West Vancouver families PhD-led tutoring in Math, Physics, Chemistry and Coding. Flexible online sessions let students from Ambleside to the British Properties and Caulfeild learn at home with an expert tutor.",
      "We tailor each lesson to West Vancouver's academically strong schools and to the BC and IB curricula, supporting students from Grade 6 through Pre-Calculus 12, AP, IB and university-level courses. Our goal is steady, confident mastery — not just a quick fix before the next test.",
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
      "West Vancouver students learn through flexible online tutoring, with in-person sessions available at our Burnaby centre.",
    faqs: [
      {
        question: "Do you tutor West Vancouver students?",
        answer:
          "Yes. We offer flexible online tutoring for West Vancouver students across Ambleside, Dundarave, the British Properties and Caulfeild, with in-person sessions available at our Burnaby centre.",
      },
      {
        question: "Can you support IB students in West Vancouver?",
        answer:
          "Absolutely. We regularly help West Vancouver students with IB and AP Math, Physics and Chemistry, as well as the standard BC curriculum, and we prepare students for final and university-entrance exams.",
      },
      {
        question: "Which West Vancouver schools do your students attend?",
        answer:
          "Our students come from schools including West Vancouver Secondary, Sentinel, Rockridge, Collingwood and Mulgrave. We align sessions with each school's pace and the BC or IB curriculum.",
      },
    ],
  },
  {
    slug: "coquitlam",
    name: "Coquitlam",
    region: "BC",
    metaTitle: "Math Tutor in Coquitlam | Physics, Chemistry & Coding — Dr. Shreyank Educare",
    metaDescription:
      "Coquitlam math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book your free consultation today.",
    heroHeading: "Expert Math Tutor in Coquitlam",
    heroSubheading:
      "Personalized Math, Physics, Chemistry and Coding tutoring for Coquitlam students in Grades 6–12 and university — flexible online sessions built on the BC curriculum.",
    intro: [
      "Dr. Shreyank Educare helps Coquitlam students strengthen their Math, Physics, Chemistry and Coding skills with PhD-led, one-on-one tutoring. Flexible online sessions serve families from Town Centre and Burke Mountain to Maillardville and Austin Heights.",
      "We match every lesson to Coquitlam classrooms and the BC curriculum, guiding students from Grade 6 through Pre-Calculus 12, AP and university courses. From filling foundational gaps to acing provincial and final exams, students build real understanding and lasting confidence.",
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
      "Coquitlam students learn with us through flexible online tutoring, with in-person sessions available at our nearby Burnaby centre.",
    faqs: [
      {
        question: "Do you offer math tutoring in Coquitlam?",
        answer:
          "Yes. We provide flexible online tutoring for Coquitlam students across Town Centre, Burke Mountain, Maillardville and Austin Heights, plus in-person sessions at our nearby Burnaby centre.",
      },
      {
        question: "Which Coquitlam schools do your students attend?",
        answer:
          "We support students from Gleneagle, Centennial, Dr. Charles Best, Pinetree and Heritage Woods, aligning each session with their teacher's material and the BC curriculum.",
      },
      {
        question: "Do you help with Pre-Calculus 11 and 12 in Coquitlam?",
        answer:
          "Yes. Pre-Calculus 11 and 12 are among our most requested courses. We break down tough topics step by step and prepare Coquitlam students thoroughly for their final exams.",
      },
    ],
  },
  {
    slug: "port-moody",
    name: "Port Moody",
    region: "BC",
    metaTitle: "Math Tutor in Port Moody | Physics & Chemistry — Dr. Shreyank Educare",
    metaDescription:
      "Port Moody math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in Port Moody",
    heroSubheading:
      "One-on-one Math, Physics, Chemistry and Coding tutoring for Port Moody students in Grades 6–12 and university — flexible online sessions tailored to the BC curriculum.",
    intro: [
      "Dr. Shreyank Educare offers Port Moody students focused, PhD-led tutoring in Math, Physics, Chemistry and Coding. Convenient online sessions serve families from Heritage Mountain and Klahanie to Newport Village and the Inlet.",
      "Every lesson is aligned to Port Moody classrooms and the BC curriculum, supporting students from Grade 6 through Pre-Calculus 12, AP and university courses. We help students turn confusion into clarity and build the confidence to tackle exams head-on.",
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
      "Port Moody students learn through flexible online tutoring, with in-person sessions available at our Burnaby centre.",
    faqs: [
      {
        question: "Do you tutor students in Port Moody?",
        answer:
          "Yes. We offer flexible online tutoring for Port Moody students across Heritage Mountain, Klahanie and Newport Village, with in-person sessions available at our Burnaby centre.",
      },
      {
        question: "Which Port Moody schools do your students attend?",
        answer:
          "Our students come from Port Moody Secondary and Heritage Woods Secondary, among others. We align each session with their school's pace and the BC curriculum.",
      },
      {
        question: "What subjects do you cover for Port Moody students?",
        answer:
          "We tutor Math, Physics, Chemistry and Coding for Grades 6–12, plus AP and university courses, including Pre-Calculus, Calculus and provincial and final exam preparation.",
      },
    ],
  },
  {
    slug: "port-coquitlam",
    name: "Port Coquitlam",
    region: "BC",
    metaTitle: "Math Tutor in Port Coquitlam | Physics & Chemistry — Dr. Shreyank Educare",
    metaDescription:
      "Port Coquitlam math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book a free consultation.",
    heroHeading: "Expert Math Tutor in Port Coquitlam",
    heroSubheading:
      "Personalized Math, Physics, Chemistry and Coding tutoring for Port Coquitlam students in Grades 6–12 and university — flexible online sessions on the BC curriculum.",
    intro: [
      "Dr. Shreyank Educare helps Port Coquitlam (PoCo) students excel in Math, Physics, Chemistry and Coding with PhD-led, one-on-one tutoring. Flexible online sessions serve families from Citadel Heights and Birchland to central PoCo.",
      "We tailor each lesson to PoCo classrooms and the BC curriculum, guiding students from Grade 6 through Pre-Calculus 12, AP and university courses. Whether catching up or getting ahead, students gain the skills and confidence to perform their best on every exam.",
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
      "Port Coquitlam students learn through flexible online tutoring, with in-person sessions available at our nearby Burnaby centre.",
    faqs: [
      {
        question: "Do you offer tutoring in Port Coquitlam?",
        answer:
          "Yes. We provide flexible online tutoring for Port Coquitlam students across Citadel Heights, Birchland and central PoCo, plus in-person sessions at our nearby Burnaby centre.",
      },
      {
        question: "Which Port Coquitlam schools do your students attend?",
        answer:
          "We support students from Terry Fox, Riverside and Archbishop Carney, aligning each session with their teacher's material and the BC curriculum.",
      },
      {
        question: "Can you help prepare for provincial and final exams?",
        answer:
          "Yes. We prepare Port Coquitlam students thoroughly for provincial numeracy assessments and final exams with targeted review, practice problems and clear, step-by-step strategies.",
      },
    ],
  },
  {
    slug: "surrey",
    name: "Surrey",
    region: "BC",
    metaTitle: "Math Tutor in Surrey | Physics, Chemistry & Coding — Dr. Shreyank Educare",
    metaDescription:
      "Surrey math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book your free consultation today.",
    heroHeading: "Expert Math Tutor in Surrey",
    heroSubheading:
      "Personalized Math, Physics, Chemistry and Coding tutoring for Surrey students in Grades 6–12 and university — flexible online sessions built on the BC curriculum.",
    intro: [
      "Dr. Shreyank Educare helps Surrey students strengthen their Math, Physics, Chemistry and Coding skills with PhD-led, one-on-one tutoring. Flexible online sessions serve families from Guildford and Fleetwood to Cloverdale, Newton and South Surrey.",
      "We align every lesson with Surrey classrooms and the BC curriculum, guiding students from Grade 6 through Pre-Calculus 12, AP and university courses. Whether your child is filling foundational gaps or aiming for top marks, we build genuine understanding and exam-day confidence.",
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
      "Surrey students learn with us through flexible online tutoring, with in-person sessions available at our Burnaby centre.",
    faqs: [
      {
        question: "Do you offer math tutoring in Surrey?",
        answer:
          "Yes. We provide flexible online tutoring for Surrey students across Guildford, Fleetwood, Newton, Cloverdale and South Surrey, with in-person sessions available at our Burnaby centre.",
      },
      {
        question: "Which Surrey schools do your students attend?",
        answer:
          "We support students from schools including Fraser Heights, Semiahmoo, Panorama Ridge, Elgin Park and Sullivan Heights, aligning each session with their teacher's material and the BC curriculum.",
      },
      {
        question: "What subjects and grades do you cover in Surrey?",
        answer:
          "We tutor Math, Physics, Chemistry and Coding for Grades 6–12, plus AP and university courses, including Pre-Calculus 11/12, Calculus, and provincial and final exam preparation.",
      },
    ],
  },
  {
    slug: "richmond",
    name: "Richmond",
    region: "BC",
    metaTitle: "Math Tutor in Richmond | Physics, Chemistry & Coding — Dr. Shreyank Educare",
    metaDescription:
      "Richmond math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in Richmond",
    heroSubheading:
      "One-on-one Math, Physics, Chemistry and Coding tutoring for Richmond students in Grades 6–12 and university — flexible online sessions tailored to the BC curriculum.",
    intro: [
      "Dr. Shreyank Educare supports Richmond students with focused, PhD-led tutoring in Math, Physics, Chemistry and Coding. Convenient online sessions serve families from Steveston and Brighouse to Broadmoor, Terra Nova and City Centre.",
      "Every lesson is aligned to Richmond classrooms and the BC curriculum, supporting students from Grade 6 through Pre-Calculus 12, AP and university courses. We turn difficult concepts into clear, repeatable steps so students improve steadily and walk into exams prepared.",
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
      "Richmond students learn with us through flexible online tutoring, with in-person sessions available at our Burnaby centre.",
    faqs: [
      {
        question: "Do you tutor Richmond students online or in person?",
        answer:
          "Both. Most Richmond families choose flexible online sessions across Steveston, Brighouse and City Centre, while others attend in person at our Burnaby centre.",
      },
      {
        question: "Which Richmond schools do your students attend?",
        answer:
          "Our students come from schools including Richmond Secondary, Steveston-London, Hugh McRoberts, R.C. Palmer and Hugh Boyd. We match each session to their school's pace and the BC curriculum.",
      },
      {
        question: "Can you help with AP and IB courses in Richmond?",
        answer:
          "Yes. We regularly support Richmond students in AP and IB Math, Physics and Chemistry, alongside the standard BC curriculum, and we prepare students for final and university-entrance exams.",
      },
    ],
  },
  {
    slug: "new-westminster",
    name: "New Westminster",
    region: "BC",
    metaTitle: "Math Tutor in New Westminster | Physics & Chemistry — Dr. Shreyank Educare",
    metaDescription:
      "New Westminster math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Book a free consultation.",
    heroHeading: "Expert Math Tutor in New Westminster",
    heroSubheading:
      "Personalized Math, Physics, Chemistry and Coding tutoring for New Westminster students in Grades 6–12 and university — in person nearby in Burnaby or online.",
    intro: [
      "Dr. Shreyank Educare helps New Westminster students master Math, Physics, Chemistry and Coding with PhD-led, one-on-one tutoring. Because New Westminster borders our Burnaby centre, local students enjoy easy in-person access, plus the option of flexible online sessions.",
      "We align every lesson with New Westminster classrooms and the BC curriculum, guiding students from Grade 6 through Pre-Calculus 12, AP and university courses. From Sapperton to Queensborough and the Quayside, students build the skills and confidence to excel.",
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
      "New Westminster borders Burnaby, so students easily attend in-person sessions at our Burnaby centre, with online tutoring also available.",
    faqs: [
      {
        question: "Do you offer in-person tutoring for New Westminster students?",
        answer:
          "Yes. New Westminster borders Burnaby, so local students easily attend in-person one-on-one sessions at our Burnaby centre. Flexible online tutoring is also available.",
      },
      {
        question: "Which New Westminster schools do your students attend?",
        answer:
          "We support students from New Westminster Secondary (NWSS) and Douglas College, among others, aligning each session with their teacher's material and the BC curriculum.",
      },
      {
        question: "What subjects and grades do you cover in New Westminster?",
        answer:
          "We tutor Math, Physics, Chemistry and Coding for Grades 6–12, plus AP and university courses, including Pre-Calculus, Calculus and provincial and final exam preparation.",
      },
    ],
  },
  {
    slug: "delta",
    name: "Delta",
    region: "BC",
    metaTitle: "Math Tutor in Delta | Physics, Chemistry & Coding — Dr. Shreyank Educare",
    metaDescription:
      "Delta math, physics, chemistry & coding tutoring for Grades 6–12 and university. PhD-led, 5★ rated, BC curriculum. Free 30-minute consultation.",
    heroHeading: "Trusted Math Tutor in Delta",
    heroSubheading:
      "One-on-one Math, Physics, Chemistry and Coding tutoring for Delta students in Grades 6–12 and university — flexible online sessions tailored to the BC curriculum.",
    intro: [
      "Dr. Shreyank Educare offers Delta students focused, PhD-led tutoring in Math, Physics, Chemistry and Coding. Convenient online sessions serve families across Ladner, Tsawwassen and North Delta without the long commute.",
      "We align every lesson with Delta classrooms and the BC curriculum, supporting students from Grade 6 through Pre-Calculus 12, AP and university courses. Our clear, step-by-step teaching helps students turn tough topics into confident, exam-ready understanding.",
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
      "Delta students learn with us through flexible online tutoring, with in-person sessions available at our Burnaby centre.",
    faqs: [
      {
        question: "Do you offer tutoring in Delta?",
        answer:
          "Yes. We provide flexible online tutoring for Delta students across Ladner, Tsawwassen and North Delta, so there's no long commute. In-person sessions are available at our Burnaby centre.",
      },
      {
        question: "Which Delta schools do your students attend?",
        answer:
          "We support students from schools including Delta Secondary, Sands, Seaquam, Burnsview and South Delta, aligning each session with their teacher's material and the BC curriculum.",
      },
      {
        question: "Can you help prepare for provincial and final exams?",
        answer:
          "Yes. We prepare Delta students thoroughly for provincial numeracy assessments and final exams with targeted review, practice problems and clear, step-by-step strategies.",
      },
    ],
  },
];

export const getCityBySlug = (slug: string): City | undefined =>
  cities.find((c) => c.slug === slug);
