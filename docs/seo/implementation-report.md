# SEO Implementation Report

Branch: `seo/search-console-improvements` · not deployed · not pushed.

## Scope note (read first)

This branch implements the **safe, high-leverage, verifiable** parts of the brief
in full, and delivers the rest as **precise, ready-to-apply artifacts** rather
than risky bulk edits. Two facts shaped that split:

1. **User-facing titles and descriptions render from Sanity CMS**, not the code
   (the code values are fallbacks; `orFallback()` prefers the CMS). The CMS is
   shared with production, so rewriting snippets *in code* would neither change
   production nor be safe to auto-apply. The improved snippets are therefore in
   `metadata-map.csv` for one-paste application in Studio.
2. **The owner explicitly chose long, keyword-rich titles on production** two
   changes ago. This branch does not silently override that; the proposed
   concise titles keep the same keywords and are presented for review.

## What was implemented (code, this branch)

| Area | Change | File(s) |
|---|---|---|
| Query analysis | Classifies 394 queries by intent, maps to pages, scores opportunity | `scripts/analyze-queries.mjs`, `docs/seo/search-query-analysis.csv` |
| SEO audit gate | Crawls sitemap; flags dup/missing titles+descriptions, H1 count, canonical, noindex, img alt, redirected/404 sitemap URLs; exits non-zero on errors | `scripts/seo-audit.mjs`, `package.json` (`seo:audit`, `seo:analyze`) |
| Sitemap correctness | Redirect list extracted to a shared module; sitemap now excludes **every** redirect source (was leaking `/math-tutoring-burnaby`) | `data/redirects.ts`, `next.config.ts`, `app/sitemap.ts` |
| Conversion form | Fixed wrong placeholders ("Grade" → "enter last name", "Phone" → "enter subject"); added `type`/`inputMode`/`autoComplete` for mobile keyboards; clearer labels | `components/TrialClassForm.tsx` |

The `seo:audit` script IS the "reusable system so future pages cannot reuse
titles/descriptions" the brief asked for — run it in CI to fail the build on a
duplicate or missing title.

## Deliverable documents

- `search-query-analysis.csv` — every query: intent, recommended page, opportunity, action, priority.
- `page-intent-map.md` — clusters, overlap/consolidation decisions, content gaps, linking spine.
- `metadata-map.csv` — current → proposed title (≤60, keyword-rich) + unique description for the money pages.
- `redirect-map.csv` — existing consolidations + recommended (with "verify first" flags).
- `implementation-report.md` — this file.

## Key findings

- **CTR, not coverage, is the problem.** 861 impressions in positions 4–10 with
  **zero clicks**. The site already ranks for the money terms; the snippets
  aren't earning the click.
- Technical SEO is already strong: audit of 273 live pages found **0 duplicate
  titles, 0 missing canonicals, 0 noindex, single H1 per page** — one defect
  (redirected URL in sitemap), fixed here.
- Real content gap: broad **"chemistry tutor burnaby"** / **"physics tutor
  burnaby"** (125 combined striking-distance impressions) have no broad local page.

## Tests executed

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Pass |
| `npx next build` | Pass (192 static pages) |
| `npm run seo:audit` (vs production) | 273 pages; 1 error (redirected sitemap URL) → **fixed**; homepage-canonical false positive → **fixed** in script |
| Sitemap excludes redirect sources | Verified (`/math-tutoring-burnaby`, `/contact-us`, `/vancouver-math-tutor` absent) |
| Form fix rendered | Verified (grade placeholder + `type=tel`) |

## NOT done on this branch (deferred, with reason)

- **Snippet copy live** — must be applied in Sanity Studio (see manual actions). Code can't change it and production titles are the owner's call.
- **Page merges** (`/programs/physics-tutoring` → `/programs/physics`, Vancouver-math consolidation) — documented in `redirect-map.csv` but **not executed**: merging content + choosing the survivor needs backlink/traffic data and owner sign-off. Redirecting blindly risks dropping the wrong page.
- **Broad chemistry/physics Burnaby hubs** — recommended in the intent map; deliberately not auto-generated to avoid the near-duplicate/doorway risk we fixed earlier.
- **Full per-subject content rewrites** (brief Phase 3 depth) — large content task; the metadata + snippet work is the higher-CTR-leverage first step.
- **Deep performance/accessibility audit** (Phase 9) — not run here; needs Lighthouse against a deploy preview.

## Manual actions required (owner)

1. **Apply `metadata-map.csv` in Sanity Studio** (Landing/pageFaq + vertical docs) for the ~10 money pages — this is what actually moves CTR. *Note the title-length tradeoff you chose earlier: the proposals are concise + keyword-rich; if you prefer the longer titles, keep them and apply only the descriptions.*
2. **Search Console:** submit the updated sitemap; request re-indexing of the ~7 striking-distance pages; then watch CTR on those queries over 4–8 weeks.
3. **Decide the two page-merges** in `redirect-map.csv` (physics program pages; Vancouver math) — tell me which survivor and I'll implement the merge + redirects + internal-link updates.
4. **Wire `npm run seo:audit` into CI** (e.g. against the Vercel preview URL) so duplicate/missing titles fail the build.
5. Ignore the out-of-area (Abbotsford/Langley) and non-service (ADHD/dyslexia/reading) queries — do not build pages for them.

## Remaining risks

- Applying concise titles in the CMS will re-trigger the "title too long" flag
  disappearing but may reduce the keyword breadth you preferred — your call per page.
- Merges, if done without checking backlinks, could drop a page that holds link equity — verify before redirecting.
