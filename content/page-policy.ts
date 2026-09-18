/** @format */

// Which programmatic pages survive, and where the rest go.
//
// Produced by `npm run seo:duplicates` (scripts/audit-duplicates.mts), then
// reviewed. Keeping the decision here as data means the route, the redirect, the
// sitemap and the internal linking all read from one list instead of each
// carrying its own special case.
//
// Measurement note: the retired city hubs are NOT duplicate content — each has
// ~1,000 unique words and a maximum similarity to any other page of ~0.30 (the
// merge threshold is 0.80). They are retired because six city hubs is the
// portfolio we want to maintain properly, not because they are doorway pages.
// Reversing a decision here means deleting the entry and restoring the route.

export type PageDecision =
  | { url: string; action: "merge"; target: string; reason: string }
  | { url: string; action: "noindex"; reason: string };

export const pagePolicy: PageDecision[] = [
  // ── City hubs outside the six we maintain ────────────────────────────────
  // Each merges into its nearest kept hub.
  {
    url: "/math-tutor-north-vancouver",
    target: "/math-tutor-vancouver",
    action: "merge",
    reason: "City hub outside the maintained six; nearest kept hub is Vancouver.",
  },
  {
    url: "/math-tutor-west-vancouver",
    target: "/math-tutor-vancouver",
    action: "merge",
    reason: "City hub outside the maintained six; nearest kept hub is Vancouver.",
  },
  {
    url: "/math-tutor-port-moody",
    target: "/math-tutor-coquitlam",
    action: "merge",
    reason: "City hub outside the maintained six; nearest kept hub is Coquitlam.",
  },
  {
    url: "/math-tutor-port-coquitlam",
    target: "/math-tutor-coquitlam",
    action: "merge",
    reason: "City hub outside the maintained six; nearest kept hub is Coquitlam.",
  },
  {
    url: "/math-tutor-delta",
    target: "/math-tutor-surrey",
    action: "merge",
    reason: "City hub outside the maintained six; nearest kept hub is Surrey.",
  },

  // ── Ranking modifiers that should not hold their own URL ─────────────────
  // "best"/"top"/"private" describe how we want to rank, not a distinct topic.
  {
    url: "/best-ib-math-tutor-burnaby",
    target: "/ib-math-tutor-burnaby",
    action: "merge",
    reason: "\"best\" modifier of an existing base page.",
  },
  {
    url: "/private-math-tutor-burnaby",
    target: "/math-tutor-burnaby",
    action: "merge",
    reason: "\"private\" modifier of the Burnaby city hub.",
  },
  {
    url: "/top-math-tutor-vancouver",
    target: "/math-tutor-vancouver",
    action: "merge",
    reason: "\"top\" modifier of the Vancouver city hub.",
  },
  {
    url: "/top-chemistry-tutor-vancouver",
    target: "/programs/chemistry",
    action: "merge",
    reason: "\"top\" modifier with no chemistry city page; the subject hub is the match.",
  },
  {
    url: "/top-physics-tutor-vancouver",
    target: "/programs/physics",
    action: "merge",
    reason: "\"top\" modifier with no physics city page; the subject hub is the match.",
  },
  {
    url: "/math-tutor-near-me",
    target: "/math-tutor-burnaby",
    action: "merge",
    reason: "\"near me\" is local intent; it resolves to the hub for our physical location.",
  },
];

/** Redirects implied by the policy, merged into the site-wide redirect map. */
export const policyRedirects: [string, string][] = pagePolicy
  .filter((d): d is Extract<PageDecision, { action: "merge" }> => d.action === "merge")
  .map(({ url, target }) => [url, target]);

/** Paths that must render with robots noindex and stay out of sitemap/llms.txt. */
export const noindexPaths = new Set(
  pagePolicy.filter((d) => d.action === "noindex").map((d) => d.url),
);

/** Paths that no longer have a route: merged away, so nothing should build them. */
export const retiredPaths = new Set(policyRedirects.map(([from]) => from));
