/** @format */

// Relative, not the "@/" alias: this module is also loaded by next.config.ts,
// which resolves outside the app's tsconfig paths.
import { legacyRedirects } from "../redirects/legacy";
import { policyRedirects } from "../content/page-policy";

// Single source of truth for 301/permanent redirects. Imported by
// next.config.ts (to emit the redirects) and app/sitemap.ts (to EXCLUDE redirect
// sources, so the sitemap only ever lists canonical, indexable URLs).
//
// Old WordPress URLs live in redirects/legacy.ts. This file adds the internal
// consolidations made during the 2026-07 SEO work, where two of our own pages
// competed for the same query.

const consolidationPairs: [string, string][] = [
  // ── Cannibalization cleanup (2026-07, from GSC page-level data) ────────────
  // Brand-name variants: near-zero impressions each (3-9), 0 clicks; the
  // homepage already wins brand queries ("dr shreyank educare" 7 clicks).
  ["/dr-shreyank-educare", "/about"],
  ["/dr-shreyank-gupta-tutor", "/about"],
  ["/dr-shreyank-math-tutor", "/math-tutor-burnaby"],
  ["/dr-shreyank-educare-burnaby", "/tutoring-burnaby"],
  // Burnaby math variants competing with the city page (all rank ~48-51, 0
  // clicks). Consolidate onto /math-tutor-burnaby.
  ["/best-math-tutor-burnaby", "/math-tutor-burnaby"],
  ["/one-on-one-math-tutor-burnaby", "/math-tutor-burnaby"],
  // Vancouver math variants -> the strongest Vancouver math URL by impressions
  // (/math-tutor-vancouver 204 impr vs /math-tutoring-vancouver 35). NOTE:
  // corrected from the originally-suggested /math-tutoring-vancouver target.
  ["/best-math-tutor-vancouver", "/math-tutor-vancouver"],
  ["/math-tutoring-vancouver", "/math-tutor-vancouver"],

  // ── Blog cleanup (2026-07) ────────────────────────────────────────────────
  // Empty article (0 body blocks) -> the informational resources hub (not a
  // commercial page). The other 108 posts are substantial and kept.
  ["/blog/how-to-study-effectively-for-ib-exams", "/resources"],

  // Chemistry/physics consolidation (2026-07, GSC-confirmed survivors)
  ["/best-chemistry-tutor-burnaby", "/programs/chemistry"],
  ["/best-physics-tutor-burnaby", "/programs/physics"],
  ["/programs/physics-tutoring", "/programs/physics"],
  // Two university-physics pages competed; GSC shows /programs/university-physics
  // already ranks for "university physics tutor vancouver" (pos ~9), so keep it.
  ["/university-physics-tutor-vancouver", "/programs/university-physics"],
];

export const redirectPairs: [string, string][] = [
  ...legacyRedirects.map(({ from, to }): [string, string] => [from, to]),
  ...consolidationPairs,
  ...policyRedirects,
];

export const redirectSources = new Set(redirectPairs.map(([from]) => from));

const redirectMap = new Map(redirectPairs);

/**
 * Final destination for an internal path. Hand-authored link lists outlive the
 * pages they point at, so resolving here keeps an internal link from costing a
 * 308 hop once its target is consolidated away.
 */
export function resolveInternalHref(href: string): string {
  const path = href.replace(/\/+$/, "") || "/";
  return redirectMap.get(path) ?? href;
}
