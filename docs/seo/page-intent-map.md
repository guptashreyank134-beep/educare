# Page-Intent Map

Generated from `Queries.csv` (Search Console) + repository inspection on the
`seo/search-console-improvements` branch. Companion data: `search-query-analysis.csv`,
`metadata-map.csv`, `redirect-map.csv`.

## Headline data

- 394 queries, 10 clicks, 3,728 impressions, **0.27% CTR**, weighted position ~15.9.
- **861 impressions** sit in "striking distance" (position 4–10, ≥20 impressions, **0 clicks**).
- The problem is **CTR and page focus, not keyword coverage** — the site already
  has pages for almost every money term. The zero-click positions 4–6 point at
  weak snippets and, in a few clusters, ranking signals split across near-duplicate pages.

## Intent clusters (from the analysis)

| Intent | # queries | Notes |
|---|---|---|
| Subject tutoring | 142 | Core money terms (math/chem/physics/coding × city) |
| Grade / course-specific | 88 | Pre-Calc 11/12, Chem 11/12, Physics 11/12, IB, AP, grade-N |
| University / professional | 67 | UBC/SFU, actuarial, finance, econ, stats/R |
| Broad tutoring | 58 | "tutor near me", "tutoring burnaby" |
| Branded | 8 | Converting at pos 1–2; protect |
| Informational (pricing/jobs) | 8 | Route to /pricing; ignore recruiting queries |
| Irrelevant / low-value | 10 | ADHD/dyslexia/reading/handwriting — not our service |
| Location (not served) | 2 | Abbotsford/Langley — do **not** build pages |

## Top striking-distance opportunities (P1)

| Query | Impr | Pos | Primary page | Action |
|---|---|---|---|---|
| pre calculus 12 tutor burnaby | 63 | 4.8 | /pre-calculus-12-tutor-burnaby | Rewrite snippet (see metadata-map) |
| math tutoring burnaby | 73 | 5.1 | **/math-tutor-burnaby** | Snippet + it's the consolidation target |
| chemistry tutor burnaby | 65 | 5.3 | /chemistry-11-tutor-burnaby | Broad-intent gap — see below |
| coding tutor burnaby | 58 | 5.4 | /coding-tutor-burnaby | Snippet (name Python/Java) |
| physics tutor burnaby | 60 | 5.7 | /physics-11-tutor-burnaby | Broad-intent gap — see below |
| university physics tutor vancouver | 64 | 9.3 | /programs/university-physics | Snippet (name UBC/SFU) |
| university biology tutor vancouver | 53 | 8.3 | /programs/university-biology | Snippet (name UBC/SFU) |

## Overlap review (the pages the brief flagged)

**Keep separate — genuinely different intent** (do NOT merge):
- `/math-tutor-burnaby` (broad, city) vs `/pre-calculus-12-tutor-burnaby`, `/grade-11-math-tutor-burnaby`, `/foundations-of-math-11-tutor-burnaby` — course-specific intents.
- `/programs/mathematics` (subject hub, non-local) vs `/math-tutor-burnaby` (local) — different searcher.
- `/programs/university-physics` (university) vs `/physics-11-tutor-burnaby` (BC high-school) — different level.
- `/coding-tutor-burnaby` (school coding) vs `/programs/computer-science` (incl. university CS).

**Consolidate — same intent, splits authority:**
- `/math-tutor-burnaby` ← `/math-tutoring-burnaby` (✅ already redirects; now removed from sitemap this branch).
- `/math-tutor-vancouver` vs `/vancouver-math-tutor` (✅ `/vancouver-math-tutor` already 301s to `/`). Pick ONE Vancouver math page and point "best math tutor vancouver" at it.
- `/programs/physics` vs `/programs/physics-tutoring` — **two physics program pages for one intent.** Recommend merging to `/programs/physics`, 301 the other. *Verify internal links + any backlinks before merging* (redirect-map.csv).
- `/best-math-tutor-burnaby` vs `/math-tutor-burnaby` — borderline. "best math tutor burnaby" (32 impr) is a distinct commercial modifier; keep for now but ensure the two don't cannibalize (different H1/title, cross-link, `/best-` links up to `/math-tutor-burnaby`).

**Content gap (no ideal page):**
- Broad **"chemistry tutor burnaby"** (65 impr) and **"physics tutor burnaby"** (60 impr) only have *course-specific* (11/12) or *non-local program* pages. Recommend either (a) optimizing `/chemistry-11-tutor-burnaby` / `/physics-11-tutor-burnaby` to also serve the broad term (title/H1 "Chemistry Tutor Burnaby | Chemistry 11–12 & University"), or (b) adding TWO broad hubs `/chemistry-tutor-burnaby`, `/physics-tutor-burnaby` that link down to the 11/12 pages. Two pages, not "dozens" — justified by 125 combined striking-distance impressions. Do NOT template-swap them (see the city-page near-duplicate lesson).

## Per-page canonical status

All indexable pages already carry a self-referencing canonical (verified by
`npm run seo:audit`: 273 pages, 0 missing canonicals, 0 duplicate titles,
0 noindex, single H1 each). The only technical defect found — a redirected URL
in the sitemap — is fixed on this branch.

## Recommended internal-linking spine

```
Home
 ├─ /math-tutor-burnaby (city hub) ──┬─ /pre-calculus-12-tutor-burnaby
 │                                   ├─ /grade-11-math-tutor-burnaby
 │                                   └─ /coding-tutor-burnaby
 ├─ /programs/mathematics ───────────┬─ /programs/pre-calculus
 │                                   └─ /programs/university-mathematics
 ├─ /programs/physics ───────────────── /programs/university-physics
 ├─ /programs/chemistry
 └─ /programs/computer-science ──────── /programs/python, /programs/javascript
Blog posts → link down to the most relevant commercial page (descriptive anchors).
```
