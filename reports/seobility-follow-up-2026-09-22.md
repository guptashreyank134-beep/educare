# Second crawl review — 22 September 2026

Source: `2026-09-22_venture-full-export (1).pdf`, 48 pages. The visually rendered first page shows **92% overall**. This is not yet above 95%.

| Measure | Previous crawl | New crawl |
| --- | ---: | ---: |
| Technical & Meta | 79% | 96% |
| Structure | 82% | 94% |
| Content | 85% | 87% |
| Technical problem URLs | 20 | 1 |
| Broken redirect targets | 20 | 0 |
| Internal redirects | 31 | 1 |
| Empty/problematic anchors | 15 | 0 |
| Deeply linked pages | 82 | 0 |
| Title warnings | 35 | 4 |
| Description warnings | 41 | 20 |
| Medium response times | 83 | 13 |
| Identical anchors for different pages | 8 | 28 |

The crawl checked 289 pages in both reports. Fewer crawled URLs therefore do not indicate that 46 useful pages disappeared: many obsolete/error/redirect URLs are no longer being followed.

## Confirmed follow-up fix

The new technical error is `/blog/page/15`, also advertised in the sitemap. The sitemap counted all posts before excluding redirects, whereas the listing excluded redirected posts before counting. Crossing a nine-post boundary therefore generated a nonexistent final archive page.

The sitemap and listing now share the same published-post query, exclusions, page size and page-count function in `lib/blogPagination.ts`. A regression test covers 126 listed posts plus one redirected post: fourteen archive pages, not fifteen. The fix does not redirect arbitrary out-of-range archive pages to unrelated content.

The follow-up check also found two published CMS records with the same `tutoring-burnaby-metro-vancouver-guide` slug. The shared query selects the newest record per slug, with a stable ID tie-breaker, before counting or slicing. This prevents duplicate sitemap entries and archive cards without deleting CMS records.

Final validation: production build passed; **61 tests passed with no skips**; production SEO check passed for **289 sitemap URLs and 229 redirects**. Targeted lint and whitespace checks passed.

## Remaining work identified by the report

- Four long article titles: engineering statics, university physics, computer science, and online medical tutoring.
- Twenty long descriptions, now fully enumerated in this report; several are only slightly over the tool's pixel threshold, while others are verbose or cut off mid-sentence.
- Twenty-eight pages in identical-anchor groups. Specific science, organic chemistry, school support and exam-prep labels sometimes link to a general hub and sometimes to a dedicated page. The count alone does not establish keyword cannibalization; these links need contextual consistency checks. Some increased visibility may follow the repair of previously uncheckable destinations, but that is an inference rather than a proven cause.
- Content remains the lowest-scoring category. Shared boilerplate, short descriptive H1s and legitimate emphasis should not be removed solely to raise the score. The two Python/French keyword-overlap groups remain an assessment issue, not evidence sufficient to justify merging pages.
- The single slow response was 1.0632 seconds on `/engineering-dynamics-tutor`; it is one crawl observation, not proof of persistent latency.

This follow-up commit fixes the confirmed pagination defect. It does not claim the remaining editorial warnings have been eliminated or guarantee the next overall score.
