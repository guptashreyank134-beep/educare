# AI Search Visibility — Implementation Report

Goal: make drshreyankeducare.com more citable by AI answer engines (ChatGPT /
OAI-SearchBot, Perplexity, Google AI Overviews, Claude, Apple Intelligence) for
tutoring queries across **all subjects** — mathematics, chemistry, physics,
biology, university courses and medical/MCAT prep — not mathematics alone. The
motivating prompt was *"What are the best math tutoring options in the
Burnaby/Vancouver area?"*, generalised to every subject we teach.

Date: 2026-07-29. **Not deployed / not pushed** — changes are committed to local
branches for review.

---

## 1. Files changed

**New**
- `data/businessInfo.ts` — single source of truth for verified business facts.
- `components/AtAGlance.tsx` — server-rendered "At a Glance" fact block.
- `app/guides/how-to-choose-a-tutor-burnaby-vancouver/page.tsx` — the guide article.
- `data/universityCourses.ts` + `components/UniversityCourseTable.tsx` — centralized, corrected UBC/SFU/Langara course data (from the companion course-code task; reused for the "SFU, UBC and Langara" support signals).

**Modified**
- `components/SchemaMarkup.tsx` — `TUTORING_SERVICES`, `hasOfferCatalog`, `getBreadcrumbSchema`.
- `components/CityLandingPage.tsx` — renders At-a-Glance + BreadcrumbList on every city page (incl. `/math-tutor-burnaby`).
- `data/cities.ts` — Burnaby H1, subheading and math FAQ fallback.
- `app/page.tsx` — homepage links to the math page and the guide.
- `app/sitemap.ts` — adds the guide route.

**CMS (Sanity), not in git**
- `pageFaq-burnaby` — H1 (`heading`), `heroSubheading`, and 7 math-specific FAQs (this doc overrides the code, so both were updated).

## 2. Page title & H1 changes

- `/math-tutor-burnaby` H1: "Top-Rated Math Tutor in Burnaby" → **"Math Tutoring in Burnaby for Grades 6–12 and University"** (removes the unsupportable "Top-Rated" claim; no "best"/"number one"/guarantees anywhere).
- Guide `<title>`: "How to Choose a Tutor in Burnaby & Vancouver | Costs & Questions".

## 3. Structured-data changes (accurate, visible facts only)

- **Organization + LocalBusiness** (already present in `getOrganizationSchema`, rendered site-wide in `app/layout.tsx`): name, canonical URL, logo, address (2088 Madison Avenue, Burnaby BC V5C 6T5), phone, email, founder (Dr. Shreyank Gupta, PhD), areaServed, `sameAs` (Facebook/Instagram/TikTok), `knowsAbout` (all subjects).
- **NEW `hasOfferCatalog`** — an `OfferCatalog` of every tutoring service with its canonical URL (math, pre-calc, university math, physics, university physics, chemistry, university chemistry, biology, university biology, computer science, IB/AP, SAT, **MCAT/medical**, GRE, GMAT). This is the key "capture all subjects" signal for AI engines.
- **NEW `getBreadcrumbSchema`** (BreadcrumbList) — rendered on city pages and the guide.
- **Article** schema — the guide emits `Article`; blog posts already emit `BlogPosting` (an Article subtype).
- **No self-serving `AggregateRating` / review schema** — deliberately omitted (policy-compliant); the genuine Google rating stays in the UI only.
- **Opening hours** are present in the existing LocalBusiness schema (Mon–Sun 09:00–20:00). ⚠️ **Verify these are correct** — remove them if the centre's hours differ.

## 4. Robots.txt result

`app/robots.ts` already permits the required crawlers — **no change needed**:
- `Googlebot`, `Bingbot`: allowed via the `*` rule (only `/studio/` is disallowed).
- `OAI-SearchBot` and other AI bots (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot, Amazonbot, CCBot, cohere-ai) are **explicitly allowed**.
- Sitemap and host are declared.

## 5. Content added

- **"At a Glance"** fact block on every city page (business, address, levels, formats, programs, mathematics areas, lead tutor, consultation) — server-rendered, easy to extract.
- **7 math FAQs** on `/math-tutor-burnaby` (in-person, grades/courses, Pre-Calc 11 & 12, SFU/UBC/Langara, one-on-one vs group, cost, "is the consultation a free lesson?") — answers match the pricing ($75–$100 / 60-min session, GST incl.) and consultation (free 30-minute, not a lesson) pages.
- **Guide article** covering independent tutor vs centre, one-on-one vs group, online vs in person, pricing, BC-curriculum familiarity, qualifications, questions to ask, warning signs and format-fit — neutral, no invented competitor ranking, spanning math, sciences, university and MCAT.

## 6. Internal links added (descriptive anchor text)

- Homepage → `/math-tutor-burnaby` ("math tutoring in Burnaby") and → the guide.
- Guide → `/math-tutor-burnaby`, `/pricing`, and the chemistry / physics / MCAT pages.
- Pre-Calculus and University-Mathematics pages → `/math-tutor-burnaby` (via the shared `ProgramNextSteps`, anchor "Tutoring in Burnaby").
- Pricing → `/math-tutor-burnaby` (pre-existing).

## 7. Server-rendered HTML (no client JS required)

All added content — H1, At-a-Glance facts, FAQs, guide body, JSON-LD — is server components / SSG output and present in the initial HTML. Nothing added here depends on client interaction to become visible.

## 8. Recommended external actions (cannot be done in code)

- **Google Business Profile**: keep NAP identical to the schema; confirm opening hours; post updates; gather reviews (this is what drives local "near me" and AI local answers).
- **Verify opening hours** in the LocalBusiness schema (see §3).
- **Verify SFU/UBC/Langara course codes** added in the companion task against the official calendars.
- **Search Console**: resubmit the sitemap and monitor the guide + math page.

## 9. Validation results

- **Type checking** (`tsc --noEmit`): **pass** (0 errors).
- **Linting** (`eslint`): new files (guide, `AtAGlance`, `businessInfo`, `universityCourses`, `UniversityCourseTable`) are clean. Remaining errors are **pre-existing** and unrelated: `@typescript-eslint/no-explicit-any` in `SchemaMarkup.tsx`'s established `Record<string, any>` style, and `react/no-unescaped-entities` on pre-existing microcopy (`we'll`, etc.). The production build is not gated on these and passes.
- **Tests**: no test suite exists in the repository.
- **Production build** (`next build`): **pass** (0 errors); the guide prerenders as static (`○`).
- **SEO audit** (`seo:audit`): **261 pages, 0 errors**, 263 warnings — all warnings pre-existing (blog canonicals resolve to the production host while auditing on localhost; known `/blog/page/N` pagination and two legacy redirect notes). No new broken links.
- **Structured-data validation**: every JSON-LD block parses. Homepage renders `EducationalOrganization`+`LocalBusiness` (with `hasOfferCatalog` enumerating all subjects incl. MCAT). `/math-tutor-burnaby` renders Org, city `EducationalOrganization`, `FAQPage` and a single `BreadcrumbList`. The guide renders Org, `Article` and a single `BreadcrumbList` (breadcrumb de-duplicated against the shared `Breadcrumbs` component).
- **SSR check**: the new H1, At-a-Glance facts, FAQs, guide body and all JSON-LD are present in the server-rendered HTML (verified via raw `curl`, no JS execution).

**Not deployed / not pushed.** Changes are on local branches for review.
