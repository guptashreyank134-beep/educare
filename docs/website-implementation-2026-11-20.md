# Website implementation — 20 November 2026

Source: `Website Implementation - Dr Shreyank Educare (1).docx`, supplied by the owner. The owner approved implementation after reviewing the analysis and plan.

This work is prepared locally for review. It has not been committed, pushed or deployed in this task, and no published Sanity documents were changed.

## Document requirements

| Requirement | Result |
| --- | --- |
| Expand useful introductions and reduce excessive whitespace | Added original, course-specific learning guidance to 76 short landing-page introductions while preserving the existing text. Retained the earlier 21 expanded introductions and homepage improvements. Desktop course content continues beneath the introduction beside the form; mobile remains stacked. Reduced the oversized top spacing on all 24 program pages. |
| Relevant tutor profiles | Kept real, subject-matched photos, names, qualifications and biographies. Verified the five requested medical routes plus the broader online medical page. No competitor identities or invented tutor claims were used. |
| Genuine testimonials | Retained the genuine review components on service pages and hubs. General feedback is labelled as business-wide feedback, rather than implying medical-specific outcomes. Existing dedicated subject reviews remain intact. |
| Homepage CTA and alignment | Verified the earlier implementation: one primary Book a Free Consultation link, a text WhatsApp link and aligned desktop columns. The mobile booking card follows the short introduction. |
| Consultation form on the right | Implemented a shared responsive layout in the SEO, city and vertical templates and all 24 form-bearing program pages. The desktop sidebar spans the introduction and first content rows, preventing the form from pushing course information below an empty column. |
| Tutor profiles below program content | Moved profiles in the three shared landing templates and Study Club. Preserved the existing bottom placement in program pages and hubs. The About Us directory remains a dedicated roster. |
| Footer Study Club link | Study Club Terms now points to `/homework-help-burnaby`. The actual `programme-terms` section and other valid anchor links remain. |
| Academic Subjects Finance link | Academic Subjects now points to `/programs/finance`; College/University Finance still points to `/programs/university-finance`. |

## Content review and Studio editing

The full existing-plus-added introduction copy for all 76 pages is in [website-copy-review-2026-11-20.md](website-copy-review-2026-11-20.md).

In **Studio → Landing Pages → Page Content**:

- **Intro Paragraphs** retains the existing opening copy.
- **Learning Guidance** is the new optional override for the added paragraphs. Unset uses the code fallback; an explicitly empty array hides it; entered paragraphs replace the fallback.
- Exact repeated paragraphs are suppressed when an editor has already included them in the main introduction.

Added guidance explains the relevant learning process, practical preparation and course topics. It does not add new prices, credentials, results, availability claims or guarantees. A repeated “in-person … in person” typo in older CMS introductions is corrected during rendering. Niti's placeholder portrait remains because a genuine portrait was not supplied.

## SEO, links and booking

- Page titles, descriptions, H1 text, canonical URLs and existing schema types are preserved. No new content URLs or duplicate city pages were created.
- Added `/programs/chemistry-tutoring` → `/programs/chemistry` to the existing permanent redirect map. This fixes a stale Chemistry 11/12 link in the `physics-tutor-brentwood-burnaby` blog, and the existing content-link resolver emits the canonical destination directly.
- Sitemap routes and crawling rules remain intact, including Homework and Study Club.
- Sitemap dates choose the newer real CMS/source timestamp. The history generator now tracks each learning-guidance entry separately, so editing one paragraph does not change every landing page's date. Regression checks validate date provenance and allow genuine bulk edits.
- Source modification dates must be generated from committed history before release; the pre-existing dirty `data/route-dates.json` has been preserved during implementation.
- Required enquiry phone validation and international-number hints remain intact. `/book` and the homepage continue to require a Calendly timeslot for an appointment.
- No test enquiries, bookings, external messages or CMS writes were made.

## Changed implementation files

- Shared presentation: `components/ConsultationLayout.tsx`, `components/CourseConsultationPanel.tsx`, `components/CourseEnquiryForm.tsx`, `components/ProgramOverview.tsx`, `components/SeoLandingPage.tsx`, `components/CityLandingPage.tsx`, `components/VerticalLandingPage.tsx`.
- Navigation: `components/Footer.tsx`, `components/programsComponents/programData.ts`.
- Copy and links: `data/landingLearningGuidance.ts`, `data/redirects.ts`.
- Studio integration: `sanity/lib/faqs.ts`, `sanity/schemaTypes/pageFaq.ts`. Existing FAQ text parsing also now narrows unknown values safely instead of using explicit `any`.
- Study Club: `app/homework-help-burnaby/page.tsx`.
- Sitemap history: `app/sitemap.ts`, `scripts/build-route-dates.mts`, `scripts/route-date-history.mts`, `lib/contentDates.ts`, `lib/routeDateHistory.test.mts`, `app/sitemap.test.mts`.
- Program routes: the 24 `app/programs/<slug>/page.tsx` files listed below.
- Regression checks: `tests/document-implementation.spec.ts`, `tests/landing-spacing.spec.ts`, `tests/program-formatting.spec.ts`, `tests/helpers/consultation-layout.ts`.
- Review material: this file and `docs/website-copy-review-2026-11-20.md`.

Program slugs: `biology`, `burnaby-stem-tutoring`, `chemistry`, `computer-science`, `finance`, `french`, `gmat-prep`, `gre-prep`, `ib-ap-tutoring`, `javascript`, `mandarin`, `mathematics`, `mcat-prep`, `physics`, `pre-calculus`, `python`, `sat-prep`, `university-biology`, `university-chemistry`, `university-finance`, `university-mathematics`, `university-physics`, `vancouver-math-tutoring`, `web-development`.

## Verification

| Check | Result |
| --- | --- |
| Production build and TypeScript | Passed; 334 pages generated. Existing Sanity content was read successfully using the system certificate store. |
| Unit suite | 105 passed, 0 failed, 0 skipped. |
| ESLint | Passed for all changed TypeScript/TSX/MTS files and new source files. This is a scoped result, not a claim that unrelated legacy files are lint-clean. |
| Desktop/mobile regression suite | 154 passed. Covers 390, 768, 1024, 1280 and 1440 pixel layouts, profile order, reviews, homepage CTA, navigation, phone requirements, booking flow and Vancouver SEO. |
| Final program spacing verification | All 48 desktop/mobile checks passed after the last padding adjustment (24 program pages at two widths). |
| Production SEO crawl | Passed: 310 sitemap URLs, 232 redirects and 2 additional linked targets. Checks include HTTP status, canonical URLs, indexability, robots, metadata, structured data and internal-link destinations. |
| Rendered guidance | All 76 new paragraphs confirmed in final production HTML. Editorial replacement, empty override and duplicate suppression verified. |
| Visual review | Reviewed desktop and mobile screenshots of engineering, university, city, homepage and medical profile layouts. |
| Patch hygiene | `git diff --check` passed. |

No public URL was newly created, so sitemap membership continues to be generated by the existing route/CMS sources. Before an approved release, commit the reviewed source, run `npx tsx scripts/build-route-dates.mts`, review and commit the generated dates, then build and deploy. Date generation intentionally requires committed history and has not been run over this uncommitted review state.

Preview screenshots are saved in `tmp/nov20-review/`. They cover the homepage, engineering pages, University Physics, a Vancouver city page and medical tutors on desktop/mobile. Scratch files and logs in `tmp/` and the pre-existing `debug.log` are not release files.
