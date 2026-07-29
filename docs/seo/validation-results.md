# Validation Results

Date: 2026-07-29 · Branch: `seo/final-consistency-audit`

| Check | Command | Result |
|---|---|---|
| Type checking | `npx tsc --noEmit` | **pass** (0 errors) |
| Content audit (source) | `node scripts/content-audit.mjs` | **0 errors, 0 warnings** (152 files) |
| Production build | `npx next build` | **pass** (0 errors) |
| SEO crawl | `SEO_AUDIT_BASE=… npm run seo:audit` | **261 pages, 0 errors**, 263 warnings |
| Lint | `npx eslint` | pre-existing `no-explicit-any` / `no-unescaped-entities` only; new files clean |
| Unit/integration tests | — | no test suite exists in the repo |

## Notes

- **SEO crawl warnings (263)** are all pre-existing and by design: blog canonicals
  resolve to the production host while the crawl runs on localhost, plus known
  `/blog/page/N` pagination notes. **No broken internal links and no
  internal-links-to-redirects** were reported. 0 ERROR-level issues.
- **Redirects**: 196 pairs, **0 chains** (2 fixed this pass), 0 loops; redirect
  sources excluded from the sitemap; only `/thank-you` and the 404 are noindex.
- **Structured data**: every JSON-LD block parses; Organization + LocalBusiness,
  BreadcrumbList (single per page), Article (guide), FAQPage where FAQs render;
  no fabricated review schema.
- **`npm run seo:audit`** now runs the source content audit first (pricing,
  legacy course codes, phone, unsupported claims, provincial-exam) and then the
  live crawl.

## Responsive spot-check

The layout uses the existing responsive system (Tailwind breakpoints, relative
units, `max-width` containers). Changes in this pass were copy/data/schema only —
no layout structure changed — so small-mobile → desktop rendering is unchanged
from the previously-verified baseline. A fresh device matrix pass is listed under
remaining work (§20).
