/** @format */

// Single source of truth for the verified business facts used in "At a Glance"
// fact blocks and structured data. Only facts already published elsewhere on the
// site (footer, contact, pricing, about) appear here.

export const BUSINESS = {
  name: "Dr. Shreyank Educare",
  streetAddress: "2088 Madison Avenue",
  addressLocality: "Burnaby",
  addressRegion: "BC",
  postalCode: "V5C 6T5",
  addressFull: "2088 Madison Avenue, Burnaby, BC V5C 6T5",
  phone: "+1 (672) 514-7587",
  email: "info@drshreyankeducare.com",
  leadTutor: "Dr. Shreyank Gupta, PhD",
  levels: "Grades 6–12 and university",
  formats: "In-person (Burnaby) and online",
  programs: "One-on-one and small group",
  consultation: "Free 30-minute consultation",
} as const;

export type Fact = { label: string; value: string };
