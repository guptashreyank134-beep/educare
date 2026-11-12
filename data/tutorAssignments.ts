/**
 * Match page intent to tutors whose published roster explicitly supports it.
 * Returning no profile is preferable to implying expertise we have not verified.
 */
export function tutorIdsForContext(context: string): number[] {
  const value = context.toLowerCase().replace(/[-–—_/]/g, " ").replace(/\s+/g, " ");
  // Parse whole grade numbers (and ranges) before matching school subjects.
  // In particular, Grade 11 must never match a `grade 1` prefix.
  const grades = [...context.toLowerCase().matchAll(/\bgrades?\s+(\d{1,2})(?:\s*(?:[-–—]|to|through)\s*(\d{1,2}))?\b/g)]
    .flatMap((match) => [Number(match[1]), ...(match[2] ? [Number(match[2])] : [])]);
  const schoolThroughGrade10 = grades.length > 0 && grades.every((grade) => grade >= 1 && grade <= 10);
  const advancedLevel = /\b(university|college|undergraduate|graduate|adult|ap|ib|ielts|toefl)\b/.test(value)
    || grades.some((grade) => grade > 10);

  if (
    /\b(medical|medicine|mcat|physiology|pathology|pharmacology|anatomy|health sciences)\b/.test(
      value,
    )
  ) {
    return [6, 8];
  }
  if (
    /\b(mechanical|thermodynamics|thermo|fluids?|heat transfer|engineering statics|engineering dynamics|first year engineering)\b/.test(
      value,
    )
  ) {
    return [1];
  }
  if (/\b(actuarial|economics|econometrics)\b/.test(value)) {
    return [7];
  }
  if (/^tutoring (?:in )?vancouver\b/.test(value) && /\benglish\b/.test(value)) {
    return [0, 9];
  }
  if (/\b(english|esl|second language)\b/.test(value)) {
    // Niti's confirmed English/ESL offering is for Grades 1–10.
    return advancedLevel ? [] : [9];
  }
  // Match computer science before general school science. A Vancouver
  // location does not turn a programming page into Niti's school-science offer.
  if (/\b(computer science|coding|programming|python|javascript|web development)\b/.test(value)) {
    return [0];
  }
  if (
    !advancedLevel && /\bscience\b/.test(value)
    && (schoolThroughGrade10 || /\b(science tutor(?:ing)? vancouver|elementary science)\b/.test(value))
  ) {
    return [9];
  }
  if (
    !advancedLevel && /\b(math|maths|mathematics)\b/.test(value)
    && (schoolThroughGrade10 || /\b((?:math|mathematics) tutor(?:ing)? vancouver|elementary math)\b/.test(value))
  ) {
    return [0, 9];
  }
  if (/\b(biology|biochemistry|genetics|ecology|molecular)\b/.test(value)) {
    return [0, 4];
  }
  if (/\bstem\b/.test(value)) {
    return [0, 4];
  }
  if (
    /\b(math|maths|mathematics|calculus|algebra|differential equations|physics|chemistry|science)\b/.test(
      value,
    )
  ) {
    return [0];
  }
  if (/\bib\s*(?:&|and)\s*ap\b|\bap\s*(?:&|and)\s*ib\b/.test(value)) {
    return [0];
  }
  if (/\b(dr\.? shreyank|brand|tutoring burnaby|tutoring vancouver)\b/.test(value)) {
    return [0];
  }

  return [];
}
