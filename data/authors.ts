/** @format */

// Author and credential model.
//
// Every field is rendered only when it holds a real value. An unconfirmed
// credential stays null and simply does not appear — on the page or in the
// structured data. Stating a qualification the business cannot evidence is
// worse than stating nothing, and `alumniOf` in particular is a factual claim
// about an institution that never agreed to it.

import { SITE_URL } from "./businessInfo";

export interface AcademicCredential {
  /** e.g. "Ph.D." */
  degree: string;
  /** e.g. "Ultrasound Signal & Image Processing" */
  field: string;
  /** Degree-awarding institution. Null until the owner confirms it. */
  institution: string | null;
  /** Year awarded. Null until the owner confirms it. */
  year: number | null;
  /** Year study began. Set only when the full range is known. */
  startYear?: number | null;
}

export interface AuthorProfiles {
  linkedin: string | null;
  orcid: string | null;
  scholar: string | null;
}

export interface Author {
  /** URL segment under /about, e.g. "dr-shreyank-gupta". */
  slug: string;
  name: string;
  honorificPrefix?: string;
  jobTitle: string;
  image: string;
  /** Short biography. Only verifiable claims. */
  bio: string;
  credential: AcademicCredential;
  profiles: AuthorProfiles;
  knowsAbout: string[];
}

export const LEAD_AUTHOR: Author = {
  slug: "dr-shreyank-gupta",
  name: "Dr. Shreyank Gupta",
  honorificPrefix: "Dr.",
  jobTitle: "Founder & Lead Tutor",
  image: `${SITE_URL}/assets/drShreyank.webp`,
  bio:
    "Dr. Shreyank Gupta holds a PhD in Ultrasound Signal & Image Processing from École de " +
    "technologie supérieure in Montréal — applied mathematics and physics in practice. " +
    "He has taught Math, Physics and Chemistry for " +
    "over 10 years, working with students across Burnaby and Vancouver from Grade 6 " +
    "through university, and has supported students from McGill, York, Carleton and the " +
    "University of Ottawa.",
  credential: {
    degree: "Ph.D.",
    field: "Ultrasound Signal & Image Processing",
    // Confirmed by the owner. ETS is a constituent school of the Universite du
    // Quebec network, which is what earlier copy had loosely called it.
    institution: "École de technologie supérieure",
    year: 2021,
    startYear: 2016,
  },
  profiles: {
    linkedin: "https://www.linkedin.com/in/shreyank-gupta-3501aa6a/",
    // TODO(owner): supply the ORCID iD, if there is one.
    orcid: null,
    scholar: "https://scholar.google.com/citations?user=Q7HaLb8AAAAJ&hl=en",
  },
  knowsAbout: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
};

export const authorPath = (slug: string) => `/about/${slug}`;
export const authorUrl = (slug: string) => `${SITE_URL}${authorPath(slug)}`;

/** Confirmed profile URLs only — an empty list means no `sameAs` is emitted. */
export function authorSameAs(author: Author): string[] {
  return Object.values(author.profiles).filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );
}

/** The years of study, as a range when the start year is known. */
export function credentialYears(credential: AcademicCredential): string | null {
  if (!credential.year) return null;
  return credential.startYear ? `${credential.startYear}–${credential.year}` : String(credential.year);
}

/** "Ph.D. in Ultrasound Signal & Image Processing", plus institution/year when known. */
export function credentialLabel(credential: AcademicCredential): string {
  const base = `${credential.degree} in ${credential.field}`;
  const suffix = [credential.institution, credentialYears(credential)].filter(Boolean).join(", ");
  return suffix ? `${base} — ${suffix}` : base;
}
