# Website implementation review — 14 November 2026

Source: **Website Implementation - Dr Shreyank Educare.docx** supplied by the owner.

## Document checklist

| Recommendation | Implementation |
| --- | --- |
| Expand useful introductions and remove excessive empty space | Retained the existing full-width introduction/enquiry flow and expanded 21 active subject introductions, plus the homepage introduction. Added course-specific learning examples and preparation guidance. Updated matching Sanity introductions without replacing existing paragraphs. |
| Individual tutor profiles with photos, names, qualifications and experience | Verified the existing detailed profile cards on all six medical pages, including the five named in the document. Dr. Sabiha Arshed and Dr. Vishal Sehgal use the site's real roster photos and published credentials. Corrected Dr. Vishal's portrait crop to keep his whole face visible. Existing subject-matched cards remain on other tutoring pages. |
| Genuine student/parent testimonials on relevant pages | Added the existing Google reviews component to medical/quant, city, SEO and program templates, and the programs, services, pricing and Study Club pages. Clearly labelled general reviews as feedback across tutoring subjects. Kept the dedicated university Physics testimonial without duplicating its fallback quote. Added the canonical Google Business Profile source link. |
| One clear homepage booking action | The hero now has one **Book a Free Consultation** button linking directly to the existing Calendly event. WhatsApp is a small text link; the floating shortcut is hidden on the homepage. Booking still requires selecting a timeslot. |
| Align homepage heading and booking box | Top-aligned desktop columns; reduced oversized gaps. On mobile, booking follows the short introduction, before the extended copy and decorative imagery, so the main action appears earlier. |

## Expanded introduction URLs

- `/online-medical-tutoring`
- `/medical-sciences-tutor`
- `/online-physiology-tutor`
- `/online-pathology-tutor`
- `/online-pharmacology-tutor`
- `/medical-exam-prep-tutor-online`
- `/crash-course-pre-calculus-12`
- `/ib-math-tutor-burnaby`
- `/ap-tutor-vancouver`
- `/ib-physics-tutor-vancouver`
- `/ib-math-sl-tutor-vancouver`
- `/ib-tutor-vancouver`
- `/university-calculus-tutor-vancouver`
- `/university-physics-tutor-vancouver`
- `/calculus-2-tutor-online`
- `/linear-algebra-tutor-online-canada`
- `/engineering-dynamics-tutor`
- `/physics-1-tutor-online`
- `/online-ib-math-tutor-canada`
- `/online-physics-tutor-canada`
- `/online-ap-calculus-tutor-canada`

The retired `/best-ib-math-tutor-burnaby` still redirects to `/ib-math-tutor-burnaby`. Its original content was preserved; the new paragraph belongs to the canonical page.

## Content and SEO safeguards

- Preserved business contact details, Burnaby location, pricing, qualifications and original testimonial text.
- Did not copy the sample competitor's tutor name, photo, credentials or scores.
- Medical pages remain targeted to the USA and Caribbean, as in the existing approved content.
- Reviews are not presented as medical-specific student outcomes. No self-serving Review/AggregateRating schema was added.
- Titles, descriptions, canonical URLs, existing FAQ/Service schema, sitemap inclusion and redirects remain intact.
- Sanity writes were limited to introduction arrays, protected with revision checks and verified through fresh reads. Existing paragraphs were retained.
- The site already has longer introductions on the other audited landing pages and program pages; those were retained instead of adding repetitive filler.
- Niti's existing placeholder portrait remains. A real portrait was not available in the supplied material; all requested medical tutor cards have real photos.

## Changed files

| Area | Files |
| --- | --- |
| Main pages | `app/page.tsx`, `app/programs/page.tsx`, `app/services/page.tsx`, `app/pricing/page.tsx`, `app/homework-help-burnaby/page.tsx` |
| Shared page templates | `components/CityLandingPage.tsx`, `components/SeoLandingPage.tsx`, `components/VerticalLandingPage.tsx`, `components/ProgramNextSteps.tsx` |
| Reviews, profiles and booking | `components/Reviews.tsx`, `components/RelevantTutorProfiles.tsx`, `components/Team.tsx`, `components/aboutUsComponents/tutorsData.ts`, `components/TrialClassForm.tsx`, `components/WhatsAppFloating.tsx` |
| Content and crawl dates | `data/seoPages.ts`, `data/verticalPages.ts`, `data/route-dates.json` |
| Build and verification | `next.config.ts`, `tests/appointment-booking.spec.ts`, `tests/document-implementation.spec.ts`, this checklist |

## Verification

- Production build: 332 pages generated with no CMS fetch warnings after limiting simultaneous page generation and enabling transient-failure retries.
- Unit tests: 101 passed.
- SEO crawl: 308 sitemap URLs, 231 redirects and two additional linked targets passed.
- Focused lint passed for changed components, routes, config and browser tests. Three pre-existing `no-explicit-any` errors in `data/seoPages.ts` remain outside the changed introduction entries.
- Browser regression suite: 132 non-mutating desktop/mobile checks passed. Final visual adjustments are checked again before pushing.

No test enquiries, appointments or external messages were created.
