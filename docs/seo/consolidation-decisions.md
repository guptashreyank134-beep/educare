# Page Consolidation — decisions from GSC page-level data (2026-07)

Source: full Search Console export (Pages / Queries / Countries / Devices),
Feb 23 – Jul 28 2026. This resolves the survivor-selection that earlier query-only
data couldn't.

## The key finding

**The homepage is the page ranking for the money queries**, not the dedicated
landing pages:

| Page | Clicks | Impressions | Avg pos |
|---|---|---|---|
| `/` (homepage) | 79 | 8,423 | 5.24 |
| `/programs/mathematics` | 2 | 1,986 | 21.4 |
| `/math-tutor-vancouver` | 0 | 204 | 58.7 |
| `/math-tutor-burnaby` | 0 | 144 | 51.3 |
| `/best-math-tutor-burnaby` | 0 | 125 | 48.7 |
| `/math-tutoring-vancouver` | 0 | 35 | 72.7 |
| brand pages (`/dr-shreyank-*`) | 0 | 3–9 each | — |

The homepage holds the position-1 broad queries ("best math tutoring in burnaby"
531 impr @ 1.16, "tutoring in burnaby" 293 @ 2.06, "math tutoring in burnaby"
165 @ 1.87). The dedicated math pages rank 48–72 — they are **not** cannibalising
each other so much as all losing to the homepage.

## Decisions

**Redirected (301) — near-zero traffic, clear survivor:**

| From | To | Why |
|---|---|---|
| `/dr-shreyank-educare` | `/about` | 6 impr, 0 clicks; homepage wins brand |
| `/dr-shreyank-gupta-tutor` | `/about` | 9 impr, 0 clicks |
| `/dr-shreyank-math-tutor` | `/math-tutor-burnaby` | 3 impr, 0 clicks |
| `/dr-shreyank-educare-burnaby` | `/tutoring-burnaby` | 5 impr, 0 clicks |
| `/best-math-tutor-burnaby` | `/math-tutor-burnaby` | 125 impr @ 48.7, 0 clicks; city page is survivor |
| `/one-on-one-math-tutor-burnaby` | `/math-tutor-burnaby` | 6 impr, 0 clicks |
| `/best-math-tutor-vancouver` | `/math-tutor-vancouver` | 2 impr; **corrected** target (see below) |
| `/math-tutoring-vancouver` | `/math-tutor-vancouver` | 35 impr @ 72.7 → consolidate into the stronger 204-impr URL |

**Correction to the originally-suggested table:** the plan sent
`/best-math-tutor-vancouver` → `/math-tutoring-vancouver`, but the data shows
`/math-tutor-vancouver` is the stronger Vancouver page (204 impr vs 35), so it is
the survivor and `/math-tutoring-vancouver` is folded into it too.

**KEPT (do NOT redirect):**
- `/programs/mathematics` — **1,986 impressions**. The caution was right; this is
  the second-strongest page on the site and must stay.
- `/dr-shreyank-educare-reviews` — reviews pages carry reputational value; left as-is.

## Not touched (flagged for later, needs a call)
Other low-traffic "best-/top-" variants exist (`/best-physics-tutor-burnaby` 11 impr,
`/best-chemistry-tutor-burnaby` 10, `/top-chemistry-tutor-vancouver` 4, `/top-math-tutor-vancouver` 2).
Same pattern — candidates to fold into the subject/city survivor, but out of scope
for this pass.

## The bigger strategic point
Redirects clean up crawl waste and cannibalisation, but they **won't lift clicks
much** — because the homepage already ranks #1 for these queries at ~0.9% CTR. The
real levers are (1) the **homepage title/snippet** for those broad queries, and
(2) **off-page**: Google Business Profile + reviews, which decide the click on
local "tutor in Burnaby" SERPs.

## Implementation notes
- 8 redirects added to `data/redirects.ts` (301, permanent). 0 chains.
- 16 internal links repointed to survivors; 7 duplicate `related` entries removed.
- Sitemap auto-excludes the redirected URLs (redirect-source filter). tsc + build
  clean; all 8 verified 308→survivor; `seo:audit` 0 errors.
