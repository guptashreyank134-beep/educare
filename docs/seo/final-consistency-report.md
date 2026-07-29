# Final Site-Wide Consistency Report

Date: 2026-07-29 · Branch: `seo/final-consistency-audit` · **Not pushed / not merged / not deployed.**

Approach: every finding was verified against the **current** source before any
change. A large share of earlier audit items were already fixed in prior work
this cycle and are recorded below as *verified — no change needed*. Two
read-only sub-agents produced the route inventory and the content-conflict sweep;
all edits were applied and verified in the main session.

---

## Files changed (code)

- **New:** `data/pricing.ts` (pricing single source), `scripts/content-audit.mjs` (source-level audit).
- `app/pricing/content.ts` — renders from `data/pricing.ts`.
- `components/servicesPageComponents/HowSessionsWork.tsx` — group size 6; location = "tutoring studio / private learning space".
- `data/cities.ts` — Burnaby: H1 de-"top-rated", metaTitle + local section reworded to "studio", location wording.
- `data/seoPages.ts` — "Best X Tutor" softened (27 spots); "learning centre" → "tutoring studio"; provincial-exam wording corrected; "real grade improvements"/"delivers real results" softened; "top-rated" softened.
- `components/Footer.tsx` — "learning centre" → "tutoring studio".
- `components/ExplorePrograms.tsx`, `components/VancouverExploreSubjectsSection.tsx`, `components/VancouverFlexibleProgramsSection.tsx` — "top-tier results"/"fast improvement" softened.
- `components/GeneralComponents/content.ts` — About heading "…That Delivers Real Results" → "A More Focused Approach to Learning"; Programs heading "Find A Program, That Works Best For You!" → "Find a Program That Works for You".
- `components/programsComponents/programData.ts` — Mathematics card SAT-specific outcome replaced with a general math outcome.
- `components/VancouverCTABanner.tsx` — consultation "experience it directly" → planning-conversation wording ("not a full tutoring lesson").
- `app/programs/ib-ap-tutoring/page.tsx` — "maximize their IA scores" → "understand the assessment criteria and improve their own reasoning…".
- `app/programs/finance/page.tsx`, `app/programs/university-finance/page.tsx` — "Higher certification exam success rates" → "Stronger preparation for certification exams".
- `app/locations/page.tsx`, `app/programs/burnaby-stem-tutoring/page.tsx` — provincial-exam wording corrected.
- `app/book/page.tsx`, `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` — review rating/count now imported from `data/reviews.ts` (no drift).
- `data/redirects.ts` — 2 redirect chains repointed to the final destination.
- `package.json` — `audit:content` script; `seo:audit` now runs the content audit + crawl.

## CMS (Sanity) changes (live, not in git)

- `pageFaq-burnaby` — metaTitle updated to match ("Math Tutoring in Burnaby | Grades 6–12 & University").

## Issues verified as ALREADY FIXED (no change)

- **Course data** centralized in `data/universityCourses.ts`: STAT 241 removed; MATH 152 = "Linear Systems and Engineering Linear Algebra"; Langara PHYS 1117/1170/1108 absent; UBC PHYS 107–108 = Enriched (not "life-sciences"); SFU streams accurate; disclaimer + no-affiliation note present.
- **Computer Science** academic-integrity note is present and visible; no over-broad AI/ML/cybersecurity capability claims.
- **Pre-Calculus** describes limits/derivatives only as optional Calculus-12 prep; no provincial-exam wording.
- **Forms**: single shared `TrialClassForm` (rendered even in the Footer); verticals use `LeadForm`, a thin wrapper. No orphaned/legacy `<form>` found. Per-page subject placeholder is neutral ("Math, Chemistry, Physics or Coding").
- **Structured data**: Organization + LocalBusiness with `hasOfferCatalog` (all subjects), founder, BreadcrumbList, Article (guide) / BlogPosting; **no self-serving AggregateRating**.
- **Robots**: `app/robots.ts` allows Googlebot, Bingbot, OAI-SearchBot and other AI crawlers; only `/studio/` disallowed.
- **Review count**: single value (41 / 5.0) everywhere; now imported from `data/reviews.ts` in the last hard-coded spots.
- **Consultation**: Burnaby FAQ already clarifies "not a lesson"; consistent CTA "Book a Free 30-Minute Consultation".

## Pricing conflicts corrected

See `pricing-consistency-report.md`. Summary: group size six-to-eight → up to 6; guide market band reworded. No `$25–$50` / `$35–$60` anywhere.

## Claims removed or softened

"Best math/physics/chemistry tutor" (27), "top-rated" (6), "top-tier results" (2), "real grade improvements" / "delivers real results" (3), "fast improvement" (1), "certification exam success rates" (2), About "…Delivers Real Results". Genuine review quotations left intact.

## Provincial-exam references corrected

Subject-implying "provincial exam/assessment" wording changed to "final exams and unit assessments" / "BC graduation assessments where applicable". Valid Grade-10 numeracy/literacy references kept. Guarded by the `provincial-exam` audit rule.

## Location wording standardized

To: *"In-person tutoring takes place in a quiet, dedicated tutoring studio at our Burnaby location on Madison Avenue. It is a private learning space rather than a walk-in storefront."* Applied on Services (HowSessionsWork), the Burnaby city page, the Footer, and seoPages ("learning centre" → "tutoring studio"). No implication of multiple locations.

## Academic-integrity changes

IB/AP "maximize their IA scores" reworded to author-integrity language. CS note verified present. (Broader per-subject integrity blocks for labs/IB EE/programming — see remaining.)

## Technical SEO changes

- 2 redirect chains removed (→ `/programs/university-physics`). `redirect-map.csv` regenerated (196 pairs, 0 chains, 0 loops).
- Route inventory built (`final-route-inventory.csv`): only 2 intentional noindex (`/thank-you`, 404); every page self-canonical; redirect sources excluded from sitemap.
- `content-audit.mjs` added to detect pricing conflicts, legacy course codes, old phone numbers, unsupported claims and provincial-exam wording.

## Test / build results

- `tsc --noEmit`: **pass**. `content-audit`: **0 errors, 0 warnings**. `next build`: **pass**. See `validation-results.md`.

## Remaining manual work (scoped, NOT done this pass — larger sub-projects)

- **§7** deep 70–80% math refocus of `/math-tutor-burnaby` and `/math-tutor-vancouver` (restructuring, not just H1/FAQs).
- **§10** convert `/university-professional` fully to an adult audience (copy + a dedicated adult intake form).
- **§16** About-page tutor table + accurate "PhD-led" explanation.
- **§17** Privacy/Terms heading-duplication cleanup + **professional legal review** of all flagged clauses.
- **§18** rewrite the 2 template-family blog posts; add Article schema/updated dates where missing.
- **§20** performance/accessibility deep pass (image dimensions, carousel a11y, contrast).

## Items requiring legal review

Privacy/Terms: privacy contact, third-party processors, analytics/form providers, data retention, minor/student data, marketing consent, data-location, access/correction/withdrawal rights, breach response, refund/cancellation, liability, governing law. **Do not** assert specific encryption/firewall controls unless confirmed.
