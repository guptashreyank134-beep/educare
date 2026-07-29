/** @format */

// SINGLE SOURCE OF TRUTH for the Google review rating/count shown on the site.
//
// Why this exists: the count was previously hard-coded in several places (34 in
// the reviews carousel fallback, 41 in schema/book/llms) and also pulled live
// from the Google Places API, so different pages showed different totals (34 /
// 40 / 41). That inconsistency erodes trust. Everything now reads from here.
//
// IMPORTANT: before changing REVIEW_COUNT, verify it against the live Google
// Business Profile (the public "N Google reviews" figure). Keep it a deliberate,
// verified number rather than an auto-fluctuating one.
export const REVIEW_RATING = 5.0;
export const REVIEW_COUNT = 41;
export const REVIEW_SOURCE = "Google";

/** Canonical phrase, e.g. "5.0 Google rating based on 41 reviews". */
export const REVIEW_SUMMARY = `${REVIEW_RATING.toFixed(1)} ${REVIEW_SOURCE} rating based on ${REVIEW_COUNT} reviews`;
