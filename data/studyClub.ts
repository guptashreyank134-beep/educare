export const STUDY_CLUB = {
  id: "homework-study-club-burnaby",
  slug: "homework-help-burnaby",
  path: "/homework-help-burnaby",
  name: "Homework and Study Club",
  status: "registering-interest",
  statusLabel: "Registering interest",
  gradeRange: "Grades 9–10",
  subjects: ["Mathematics", "Science"],
  format: "In person in Burnaby",
  capacity: 6,
  currency: "CAD",
  monthlyTotalCents: 29900,
  monthlySessions: 12,
  sessionMinutes: 60,
  timezone: "America/Vancouver",
  consultationPath: "/book",
} as const;

export const STUDY_CLUB_PRICE = STUDY_CLUB.monthlyTotalCents / 100;

export interface StudyClubCohort {
  id: string;
  tutor: string | null;
  sessionCalendar: string[];
  capacity: number;
  enrolledPlaces: number | null;
  placeRequests: number | null;
  status: "forming" | "open" | "full" | "paused";
}

export const OPENING_STUDY_CLUB_COHORT: StudyClubCohort = {
  id: "opening-grades-9-10",
  tutor: null,
  sessionCalendar: [],
  capacity: STUDY_CLUB.capacity,
  enrolledPlaces: null,
  placeRequests: null,
  status: "forming",
};
