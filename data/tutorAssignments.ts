/**
 * Match page intent to tutors whose published roster explicitly supports it.
 * Returning no profile is preferable to implying expertise we have not verified.
 */
export function tutorIdsForContext(context: string): number[] {
  const value = context.toLowerCase();

  if (
    /medical|mcat|physiology|pathology|pharmacology|anatomy|health sciences/.test(
      value,
    )
  ) {
    return [6, 8];
  }
  if (
    /mechanical|thermo|fluid|heat transfer|engineering statics|engineering dynamics/.test(
      value,
    )
  ) {
    return [1];
  }
  if (/actuarial|economics|econometrics/.test(value)) {
    return [7];
  }
  if (/english|\besl\b|second language/.test(value)) {
    return [9];
  }
  if (
    /science tutor vancouver|science tutoring vancouver|elementary science|grade [1-9].*science/.test(
      value,
    )
  ) {
    return [9];
  }
  if (
    /math tutor vancouver|mathematics tutor vancouver|elementary math/.test(
      value,
    )
  ) {
    return [0, 9];
  }
  if (/biology|biochemistry|genetics|ecology|molecular/.test(value)) {
    return [0, 4];
  }
  if (/stem/.test(value)) {
    return [0, 4];
  }
  if (
    /math|calculus|physics|chemistry|computer science|coding|python|javascript|web development/.test(
      value,
    )
  ) {
    return [0];
  }
  if (/dr\. shreyank|brand|tutoring burnaby|tutoring vancouver/.test(value)) {
    return [0];
  }

  return [];
}
