export const STUDY_CLUB_GRADES = ["Grade 9", "Grade 10", "Another grade"] as const;
export const STUDY_CLUB_SUBJECTS = ["Mathematics", "Science", "Both", "Other"] as const;
export const STUDY_CLUB_WEEKDAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
] as const;
export const STUDY_CLUB_WINDOWS = ["After school before 5 pm", "5–7 pm", "Flexible", ""] as const;

export interface StudyClubInterestInput {
  parentName: string;
  grade: string;
  subjectNeed: string;
  weekdays: string[];
  timeWindow: string;
  learningGoal: string;
  consent: boolean;
}

export function validateStudyClubInterest(input: StudyClubInterestInput): string | null {
  if (input.parentName.length < 2 || input.parentName.length > 100) {
    return "Please enter the parent or guardian name.";
  }
  if (!(STUDY_CLUB_GRADES as readonly string[]).includes(input.grade)) {
    return "Please select the student’s grade.";
  }
  if (!(STUDY_CLUB_SUBJECTS as readonly string[]).includes(input.subjectNeed)) {
    return "Please select the subject support needed.";
  }
  if (
    input.weekdays.length === 0 ||
    input.weekdays.length > STUDY_CLUB_WEEKDAYS.length ||
    input.weekdays.some((day) => !(STUDY_CLUB_WEEKDAYS as readonly string[]).includes(day))
  ) {
    return "Please select at least one preferred weekday.";
  }
  if (!(STUDY_CLUB_WINDOWS as readonly string[]).includes(input.timeWindow)) {
    return "Please select a valid preferred time window.";
  }
  if (input.learningGoal.length > 500) {
    return "Please keep the learning goal under 500 characters.";
  }
  if (!input.consent) {
    return "Please confirm the enquiry consent statement.";
  }
  return null;
}
