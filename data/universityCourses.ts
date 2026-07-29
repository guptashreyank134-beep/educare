/** @format */

// Single source of truth for the UBC / SFU / Langara course codes we reference
// on university tutoring pages. Every course table renders from this file so the
// same subject shows an identical, verified list everywhere.
//
// ACCURACY NOTES
// - Codes and titles were checked against each institution's public course
//   directory. Where an official title was not confirmed, `title` is left empty
//   and only the code is shown (we do not invent titles).
// - SFU is listed for Physics only, which is the stream we have confirmed we
//   tutor. SFU Chemistry / Biology are intentionally omitted until confirmed.
// - Every rendered list carries a disclaimer (COURSE_DISCLAIMER) telling students
//   to confirm details in the official calendar, and we never imply affiliation.

export type Institution =
  | "University of British Columbia"
  | "Simon Fraser University"
  | "Langara College";

export type CourseSubject =
  | "Physics"
  | "Chemistry"
  | "Mathematics"
  | "Statistics"
  | "Biology";

export interface UniversityCourse {
  institution: Institution;
  subject: CourseSubject;
  /** Course code, e.g. "PHYS 100". */
  code: string;
  /** Official course title. Empty when not confirmed — the UI then shows the code alone. */
  title: string;
  /** Grouping label used on the service page, e.g. "Differential Calculus". */
  category: string;
  status: "active" | "legacy";
  /** Optional clarification shown once per institution card. */
  note?: string;
}

/** Official academic-calendar URLs, by institution. */
export const CALENDAR_URLS: Record<Institution, string> = {
  "University of British Columbia": "https://vancouver.calendar.ubc.ca/",
  "Simon Fraser University": "https://www.sfu.ca/students/calendar.html",
  "Langara College": "https://langara.ca/programs-and-courses/courses/",
};

/** Shown beneath every university course list. */
export const COURSE_DISCLAIMER =
  "Course offerings and requirements may change. Students should confirm current course details and prerequisites in their institution's official academic calendar.";

const SFU_PHYSICS_NOTE =
  "PHYS 101–102, 120–121 and 125–126 are different first-year streams and may carry credit exclusions — confirm the right stream for your program.";

const LANGARA_STATS_NOTE =
  "STAT 1123, STAT 1124 and STAT 1181 are alternative introductory statistics courses intended for different programs. Students should confirm the appropriate course for their program and transfer plans.";

export const universityCourses: UniversityCourse[] = [
  // ─── Physics ────────────────────────────────────────────────────────────────
  // UBC physics
  { institution: "University of British Columbia", subject: "Physics", code: "PHYS 100", title: "Introductory Physics", category: "First-year physics", status: "active" },
  { institution: "University of British Columbia", subject: "Physics", code: "PHYS 101", title: "Energy and Waves", category: "First-year physics", status: "active" },
  { institution: "University of British Columbia", subject: "Physics", code: "PHYS 107", title: "Enriched Physics I", category: "Enriched stream", status: "active" },
  { institution: "University of British Columbia", subject: "Physics", code: "PHYS 108", title: "Enriched Physics II", category: "Enriched stream", status: "active" },
  { institution: "University of British Columbia", subject: "Physics", code: "PHYS 117", title: "Dynamics and Waves", category: "First-year physics", status: "active" },
  { institution: "University of British Columbia", subject: "Physics", code: "PHYS 118", title: "Electricity, Light and Radiation", category: "First-year physics", status: "active" },
  { institution: "University of British Columbia", subject: "Physics", code: "PHYS 170", title: "Mechanics I", category: "First-year physics", status: "active" },
  // SFU physics (the stream we have confirmed we tutor)
  { institution: "Simon Fraser University", subject: "Physics", code: "PHYS 101", title: "Physics for the Life Sciences I", category: "Life-sciences stream", status: "active", note: SFU_PHYSICS_NOTE },
  { institution: "Simon Fraser University", subject: "Physics", code: "PHYS 102", title: "Physics for the Life Sciences II", category: "Life-sciences stream", status: "active", note: SFU_PHYSICS_NOTE },
  { institution: "Simon Fraser University", subject: "Physics", code: "PHYS 120", title: "Standard calculus-based physics", category: "Standard calculus-based stream", status: "active", note: SFU_PHYSICS_NOTE },
  { institution: "Simon Fraser University", subject: "Physics", code: "PHYS 121", title: "Standard calculus-based physics", category: "Standard calculus-based stream", status: "active", note: SFU_PHYSICS_NOTE },
  { institution: "Simon Fraser University", subject: "Physics", code: "PHYS 125", title: "Advanced first-year physics", category: "Advanced stream", status: "active", note: SFU_PHYSICS_NOTE },
  { institution: "Simon Fraser University", subject: "Physics", code: "PHYS 126", title: "Advanced first-year physics", category: "Advanced stream", status: "active", note: SFU_PHYSICS_NOTE },
  // Langara physics
  { institution: "Langara College", subject: "Physics", code: "PHYS 1101", title: "Physics I for Life Sciences", category: "First-year physics", status: "active" },
  { institution: "Langara College", subject: "Physics", code: "PHYS 1114", title: "Basic Physics", category: "First-year physics", status: "active" },
  { institution: "Langara College", subject: "Physics", code: "PHYS 1118", title: "Introductory Physics", category: "First-year physics", status: "active" },
  { institution: "Langara College", subject: "Physics", code: "PHYS 1125", title: "Physics I with Calculus", category: "First-year physics", status: "active" },
  { institution: "Langara College", subject: "Physics", code: "PHYS 1225", title: "Physics II with Calculus", category: "First-year physics", status: "active" },

  // ─── Chemistry ──────────────────────────────────────────────────────────────
  { institution: "University of British Columbia", subject: "Chemistry", code: "CHEM 111", title: "", category: "First-year chemistry", status: "active" },
  { institution: "University of British Columbia", subject: "Chemistry", code: "CHEM 121", title: "", category: "First-year chemistry", status: "active" },
  { institution: "University of British Columbia", subject: "Chemistry", code: "CHEM 123", title: "", category: "First-year chemistry", status: "active" },
  { institution: "Langara College", subject: "Chemistry", code: "CHEM 1114", title: "An Introduction to Chemistry", category: "First-year chemistry", status: "active" },
  { institution: "Langara College", subject: "Chemistry", code: "CHEM 1118", title: "Intermediate Chemistry", category: "First-year chemistry", status: "active" },
  { institution: "Langara College", subject: "Chemistry", code: "CHEM 1120", title: "General Chemistry I", category: "First-year chemistry", status: "active" },
  { institution: "Langara College", subject: "Chemistry", code: "CHEM 1220", title: "General Chemistry II", category: "First-year chemistry", status: "active" },

  // ─── Mathematics & Statistics ───────────────────────────────────────────────
  // UBC
  { institution: "University of British Columbia", subject: "Statistics", code: "STAT 200", title: "", category: "Statistics", status: "active" },
  { institution: "University of British Columbia", subject: "Statistics", code: "STAT 203", title: "", category: "Statistics", status: "active" },
  { institution: "University of British Columbia", subject: "Statistics", code: "STAT 251", title: "", category: "Statistics", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 152", title: "Linear Systems", category: "Linear Systems and Engineering Linear Algebra", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 100", title: "", category: "Differential Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 102", title: "", category: "Differential Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 104", title: "", category: "Differential Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 110", title: "", category: "Differential Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 120", title: "", category: "Differential Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 180", title: "", category: "Differential Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 184", title: "", category: "Differential Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 101", title: "", category: "Integral Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 103", title: "", category: "Integral Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 105", title: "", category: "Integral Calculus", status: "active" },
  { institution: "University of British Columbia", subject: "Mathematics", code: "MATH 121", title: "", category: "Integral Calculus", status: "active" },
  // Langara
  { institution: "Langara College", subject: "Statistics", code: "STAT 1123", title: "", category: "Statistics", status: "active", note: LANGARA_STATS_NOTE },
  { institution: "Langara College", subject: "Statistics", code: "STAT 1124", title: "", category: "Statistics", status: "active", note: LANGARA_STATS_NOTE },
  { institution: "Langara College", subject: "Statistics", code: "STAT 1181", title: "", category: "Statistics", status: "active", note: LANGARA_STATS_NOTE },
  { institution: "Langara College", subject: "Mathematics", code: "MATH 2362", title: "", category: "Linear Algebra", status: "active" },
  { institution: "Langara College", subject: "Mathematics", code: "MATH 1153", title: "", category: "Differential Calculus", status: "active" },
  { institution: "Langara College", subject: "Mathematics", code: "MATH 1171", title: "", category: "Differential Calculus", status: "active" },
  { institution: "Langara College", subject: "Mathematics", code: "MATH 1173", title: "", category: "Differential Calculus", status: "active" },
  { institution: "Langara College", subject: "Mathematics", code: "MATH 1174", title: "", category: "Differential Calculus", status: "active" },
  { institution: "Langara College", subject: "Mathematics", code: "MATH 1253", title: "", category: "Differential Calculus", status: "active" },
  { institution: "Langara College", subject: "Mathematics", code: "MATH 1271", title: "", category: "Integral Calculus", status: "active" },
  { institution: "Langara College", subject: "Mathematics", code: "MATH 1273", title: "", category: "Integral Calculus", status: "active" },
  { institution: "Langara College", subject: "Mathematics", code: "MATH 1274", title: "", category: "Integral Calculus", status: "active" },

  // ─── Biology ────────────────────────────────────────────────────────────────
  // SFU Biology is intentionally omitted (not yet confirmed as a stream we tutor).
  { institution: "University of British Columbia", subject: "Biology", code: "BIOL 111", title: "", category: "First-year biology", status: "active" },
  { institution: "University of British Columbia", subject: "Biology", code: "BIOL 112", title: "", category: "First-year biology", status: "active" },
  { institution: "University of British Columbia", subject: "Biology", code: "BIOL 121", title: "", category: "First-year biology", status: "active" },
  { institution: "University of British Columbia", subject: "Biology", code: "BIOL 140", title: "", category: "First-year biology", status: "active" },
  { institution: "University of British Columbia", subject: "Biology", code: "BIOL 200", title: "", category: "Cell & molecular biology", status: "active" },
  { institution: "University of British Columbia", subject: "Biology", code: "BIOL 201", title: "", category: "Cell & molecular biology", status: "active" },
  { institution: "Langara College", subject: "Biology", code: "BIOL 1115", title: "", category: "First-year biology", status: "active" },
  { institution: "Langara College", subject: "Biology", code: "BIOL 1116", title: "", category: "First-year biology", status: "active" },
  { institution: "Langara College", subject: "Biology", code: "BIOL 1215", title: "", category: "First-year biology", status: "active" },
  { institution: "Langara College", subject: "Biology", code: "BIOL 1216", title: "", category: "First-year biology", status: "active" },
];

const INSTITUTION_ORDER: Institution[] = [
  "University of British Columbia",
  "Simon Fraser University",
  "Langara College",
];

export interface InstitutionCourseGroup {
  institution: Institution;
  calendarUrl: string;
  /** One optional note per institution (deduplicated from its courses). */
  note?: string;
  /** Courses grouped by service-page category, preserving data order. */
  categories: { category: string; courses: UniversityCourse[] }[];
}

/**
 * Return the active courses for one or more subjects, grouped by institution
 * (UBC → SFU → Langara) and then by category. Passing several subjects (e.g.
 * ["Statistics", "Mathematics"]) combines them into one card per institution.
 * Used to render identical tables everywhere.
 */
export function courseGroupsForSubject(
  subject: CourseSubject | CourseSubject[],
): InstitutionCourseGroup[] {
  const subjects = Array.isArray(subject) ? subject : [subject];
  const groups: InstitutionCourseGroup[] = [];
  for (const institution of INSTITUTION_ORDER) {
    const courses = universityCourses.filter(
      (c) => subjects.includes(c.subject) && c.institution === institution && c.status === "active",
    );
    if (!courses.length) continue;

    const categories: { category: string; courses: UniversityCourse[] }[] = [];
    for (const c of courses) {
      let bucket = categories.find((b) => b.category === c.category);
      if (!bucket) {
        bucket = { category: c.category, courses: [] };
        categories.push(bucket);
      }
      bucket.courses.push(c);
    }

    const note = courses.find((c) => c.note)?.note;
    groups.push({
      institution,
      calendarUrl: CALENDAR_URLS[institution],
      note,
      categories,
    });
  }
  return groups;
}
