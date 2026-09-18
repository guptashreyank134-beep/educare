/** @format */

// Single source of truth for the business entity.
//
// AI answer engines resolve a business by matching an identical name, address,
// phone and profile set across every surface. A value retyped in a component
// drifts from the one in the schema and splits the entity, so everything here
// must be imported rather than copied.

export const SITE_URL = "https://www.drshreyankeducare.com";

/**
 * Profile URLs for the business.
 *
 * Only profiles published under the exact brand name belong here — a listing
 * under an old or abbreviated name describes a different entity as far as an
 * answer engine is concerned. Unconfirmed slots stay `null`; they are filtered
 * out of `SAME_AS` rather than shipped as placeholders.
 */
export interface SocialProfiles {
  instagram: string;
  facebook: string;
  tiktok: string;
  /** TODO(owner): Google Business Profile URL (maps.app.goo.gl or g.page link). */
  googleBusinessProfile: string | null;
  /** TODO(owner): LinkedIn company page URL. */
  linkedin: string | null;
}

export const SOCIAL_PROFILES: SocialProfiles = {
  instagram: "https://www.instagram.com/drshreyankeducare/",
  facebook: "https://www.facebook.com/DrShreyankEducare/",
  tiktok: "https://www.tiktok.com/@drshreyankeducare",
  googleBusinessProfile: null,
  linkedin: null,
};

/** `sameAs` for structured data: confirmed profile URLs only. */
export const SAME_AS: string[] = Object.values(SOCIAL_PROFILES).filter(
  (url): url is string => typeof url === "string" && url.length > 0,
);

export const BUSINESS = {
  name: "Dr. Shreyank Educare",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,

  streetAddress: "2088 Madison Avenue",
  addressLocality: "Burnaby",
  addressRegion: "BC",
  postalCode: "V5C 6T5",
  addressCountry: "CA",
  addressFull: "2088 Madison Avenue, Burnaby, BC V5C 6T5",

  // One phone format for every visible surface and every schema field. The site
  // previously displayed three variants, which reads as three NAP records.
  phone: "+1-672-514-7587",
  /** Digits-only form, for `tel:` and `wa.me` hrefs. */
  phoneE164: "+16725147587",
  whatsapp: "https://wa.me/16725147587",
  email: "info@drshreyankeducare.com",

  leadTutor: "Dr. Shreyank Gupta, PhD",
  levels: "Grades 6–12 and university",
  formats: "In-person (Burnaby) and online",
  programs: "One-on-one and small group",
  consultation: "Free 30-minute consultation",
} as const;

export type Fact = { label: string; value: string };
