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
    "Dr. Shreyank Gupta holds a PhD in Ultrasound Signal & Image Processing — applied " +
    "mathematics and physics in practice. He has taught Math, Physics and Chemistry for " +
    "over 10 years, working with students across Burnaby and Vancouver from Grade 6 " +
    "through university, and has supported students from McGill, York, Carleton and the " +
    "University of Ottawa.",
  credential: {
    degree: "Ph.D.",
    field: "Ultrasound Signal & Image Processing",
    // TODO(owner): confirm the degree-awarding institution. Earlier copy and
    // schema both named "University of Quebec", which is unverified and appears
    // nowhere else on the site. `alumniOf` is omitted entirely until confirmed.
    institution: null,
    // TODO(owner): confirm the year the PhD was awarded.
    year: null,
  },
  profiles: {
    // TODO(owner): supply the LinkedIn profile URL.
    linkedin: null,
    // TODO(owner): supply the ORCID iD, if there is one.
    orcid: null,
    // TODO(owner): supply the Google Scholar profile URL, if there is one.
    scholar: null,
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

/** "Ph.D. in Ultrasound Signal & Image Processing", plus institution/year when known. */
export function credentialLabel(credential: AcademicCredential): string {
  const base = `${credential.degree} in ${credential.field}`;
  const suffix = [credential.institution, credential.year].filter(Boolean).join(", ");
  return suffix ? `${base} — ${suffix}` : base;
}
