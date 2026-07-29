/** @format */

// Single source of truth for pricing. The pricing page and any other surface
// that references amounts should import from here so figures are never manually
// duplicated (and so scripts/seo-audit.mjs can flag conflicting values).
//
// If the business changes pricing, update ONLY this file.

export const PRICING = {
  currency: "CAD",
  gstIncluded: true,
  /** The same figures apply to online and in-person sessions. */
  sameOnlineAndInPerson: true,
  /** Hours of notice required to cancel or reschedule without charge. */
  cancellationHours: 24,

  oneOnOne: {
    min: 75,
    max: 100,
    sessionMinutes: 60,
  },
  monthlyGroup: {
    min: 185,
    max: 200,
    sessionsPerWeek: 2,
    sessionMinutes: 60,
    maxGroupSize: 6,
  },
  examBooster: {
    amount: 280,
    hours: 5,
  },
} as const;

const dash = "–"; // en dash

/** Ready-to-use human-readable strings, so copy stays consistent everywhere. */
export const PRICING_TEXT = {
  oneOnOne: `$${PRICING.oneOnOne.min}${dash}$${PRICING.oneOnOne.max} per ${PRICING.oneOnOne.sessionMinutes}-minute session, GST included`,
  monthlyGroup: `$${PRICING.monthlyGroup.min}${dash}$${PRICING.monthlyGroup.max} per month, GST included`,
  examBooster: `$${PRICING.examBooster.amount} for the full ${PRICING.examBooster.hours}-hour course, GST included`,
  maxGroup: `small group of up to ${PRICING.monthlyGroup.maxGroupSize} students`,
} as const;

export const PRICING_PAGE_PATH = "/pricing";
