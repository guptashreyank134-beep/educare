# Blog Inventory Audit (2026-07)

Method: pulled all 109 published posts from Sanity, measured body length (block
count) and cross-referenced Search Console page data (`Pages.csv`).

## Headline

The blog is in **good shape** — this is not a mass-removal situation:
- **108 of 109 posts are substantial** (30+ content blocks).
- Only **1 post is empty** (0 body blocks): `how-to-study-effectively-for-ib-exams`.
- Several posts already earn impressions/clicks (e.g. `university-chemistry-ubc-chemistry-chem-111-121-123` 307 impr, `how-much-does-math-tutoring-cost-burnaby` 156 impr) — clear keeps.
- The topics align with the priority list (UBC/Langara course prep, Physics 12, Chemistry, Pre-Calculus, parent guides).

## Decisions

| Action | Count | What |
|---|---|---|
| **Keep** | 108 | Substantial, topically relevant informational articles. No mass redirect/noindex — that would destroy useful content and long-tail rankings. |
| **Redirect** | 1 | `/blog/how-to-study-effectively-for-ib-exams` (empty) → `/resources` (informational hub, **not** a commercial page). |

Deliberately **not** done: redirecting informational articles to commercial pages
to preserve URLs (against your rule and Google guidance). Trailing-slash duplicate
URLs seen in GSC (`/blog/x/` vs `/blog/x`) are already handled by Next
(`trailingSlash: false` 308s them to the canonical form).

## The real gap, now fixed: every article links to ONE service page

The blog template previously linked each article only to **other blog posts**
("Recommended Reads") — never to a tutoring service. Added a single, topic-mapped
**primary service link** to the article template (`blogServiceLink()`), so all
109 posts now link to their most relevant service (chemistry post → Chemistry
Tutoring, UBC calculus post → University Mathematics, etc.). One template change,
correct link on every article, no per-post editing.

## Priority articles to improve next (your list)

These exist and are kept; they're the ones worth deepening + strong service links
(the template link now covers the basics):
- How to prepare for Pre-Calculus 12
- Common Chemistry 12 equilibrium mistakes
- Physics 12 problem-solving strategies
- UBC first-year calculus preparation
- SFU mathematics course preparation
- Choosing between Foundations and Pre-Calculus
- How parents can identify learning gaps

(If any are missing as standalone posts, they're worth writing — but that's net-new
content, not cleanup.)
