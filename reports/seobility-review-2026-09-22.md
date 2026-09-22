# SEObility review — 22 September 2026

Source: `2026-09-22_venture-full-export.pdf`, 56 pages, crawl dated 22 September 2026. Compared with the current repository and read-only published Sanity content.

## Findings and decisions

| Finding | Assessment | Action |
| --- | --- | --- |
| 20 HTTP 404 URLs | Valid. Published articles link to nonexistent program aliases and shorthand article paths. | Added 20 explicit permanent redirects to relevant existing content. Both Portable Text and legacy HTML links now resolve directly to their destination. Unknown URLs still return 404. |
| 20 redirects to erroneous targets | Valid, largely the same URLs as the 404 group: non-www links redirect to a www URL that does not exist. These are not 20 additional missing pages. | Normalize same-site absolute links to canonical relative paths, preserve query strings/fragments, and resolve known redirects. |
| 31 internal redirects | Valid where content links use an old path or non-www host. | Shared resolver now handles both host variants and redirect chains; applied to blog, rich body and FAQ links. |
| 35 title warnings | Mixed. Overly verbose titles and repeated “BC” deserve editing; 581 vs 580 pixels on the homepage is not a severe defect. | Reviewed title replacements, shorter author/guide titles, and concise numbered blog titles across the archive. |
| 41 description warnings | Useful editorial guidance, not an indexing failure. Some descriptions were verbose or visibly cut off mid-sentence. | Reviewed concise descriptions for the named examples and the investment article. Together with titles, 35 exact CMS values are corrected; author, guide and archive metadata are also updated separately. |
| Empty anchors on 15 pages | Valid accessibility/navigation issue. Home was an unlabeled icon; previous/next links had ARIA labels but no text content. | Added screen-reader text to those links. |
| Identical anchor text | Mixed. A confirmed “AP Computer Science” link incorrectly went to AP Calculus; a named author link went to the general About page. Shared consultation wording is not proof of competing pages. | Corrected the two verified label/destination mismatches. |
| Four short H1 warnings | No demonstrated defect. “Privacy Policy”, the founder’s name, and concise local service headings describe their pages accurately. | Retained useful headings rather than padding them to reach a tool threshold. |
| Duplicate GMAT/GRE headings | Valid. The page’s own FAQ heading repeated the shared FAQ component heading. | Renamed the planning sections to distinguish the content. |
| Too many headings / repeated bold text | Editorial heuristics. Counts alone do not establish misuse; course lists, FAQs and worked examples legitimately need structure and emphasis. | Retained useful structure. Article-body H1 markup now renders as H2 so the article title remains the main H1. No wholesale stripping of emphasis or content. |
| 83 responses between 0.5 and 1 second | Worth improving, but the report records zero slow responses and measures from Germany. It is not a Core Web Vitals measurement. | Added build-time generation of published article pages, keeping hourly ISR and support for new article paths. Actual deployed latency must be measured after release. |
| 82 deeply linked pages | Valid discoverability concern. Program tabs initially render only the selected category; older articles need several pagination hops. | Added a visible all-program directory and links to every blog archive page. Articles can now be reached through home → blog → archive page → article. |
| WhatsApp and Google review redirects | Expected service behavior: WhatsApp opens its messaging endpoint; Google reviews can require sign-in. | Retained working contact/review links. |
| Missing exact title/H1 words in body | Not automatically a defect. The report itself says synonyms and grammatical variants are not recognized. | Improved generic blog headings and included page numbers in visible archive copy. Did not inject repeated keywords to satisfy a matching rule. |
| Shared text blocks / duplicate paragraphs | Mixed. Repeated author biographies, consultation explanations and service logistics are normal. The report found zero complete page duplicates and zero duplicate-content pages. | Retained shared factual copy. Did not remove useful pages based on repeated snippets. |
| Python/French keyword competition | Not sufficient evidence to merge. Repository pages already distinguish city, delivery mode, beginner/university audiences, general classes, school tutoring and immersion support. A shared broad word such as “French” is not proof of harmful cannibalization. | Retained distinct routes. Use query/page performance in Search Console before deciding on consolidation. |
| “Schema Validation 289” | A count without an accompanying list of schema errors. | Did not interpret this as 289 broken schemas. Production checks verify that emitted JSON-LD parses; rich-result eligibility requires its own validation. |

The export reports totals but caps several detail tables at 20 rows, including descriptions and content issues. It cannot identify every affected URL. This review does not claim every editorial warning has disappeared.

Google recommends concise, descriptive titles and explains that title display depends on available width, not a fixed character limit: https://developers.google.com/search/docs/appearance/title-link . Snippets may be generated from page content and truncated for display: https://developers.google.com/search/docs/appearance/snippet .

## Implementation notes

- Metadata replacements in `data/seoCopyCorrections.ts` match the exact reviewed old text. A later Sanity edit takes effect normally; no automatic truncation is applied.
- CMS content was only read. The repository implements the corrections without changing published Sanity documents.
- `redirects/seobility.ts` documents the 20 aliases. Adult and elementary aliases use the relevant existing detailed guidance articles; organic chemistry aliases use the university chemistry program.
- Existing SEO verification previously checked redirect chains but did not reject a terminal 404/500. It now requires every redirect destination to return 200.
- Invalid numbered archive suffixes are rejected instead of being partially parsed into duplicate pages.

## Validation

- Production build passed, including TypeScript and 313 generated pages.
- Final full test suite: **59 passed, zero failures or skips**, including all 3 link regression tests.
- Final production SEO check: **289 sitemap URLs, 229 redirects, 2 off-sitemap targets — passed**.
- Headless browser checks passed for the desktop/mobile program directory, all 14 archive links, accessible Home link, and corrected AP Computer Science article link. Mobile screenshots reviewed; no horizontal overflow detected.
- Targeted lint: zero errors; two pre-existing unused-symbol warnings in the program component.
- `git diff --check`: passed.
- The first sandbox-only runs failed because Google Fonts/Sanity access was blocked. Re-running with network access and the trusted system certificate store passed; sitemap dates were not fabricated or changed to mask the failure.

## Release status

Validated for release to GitHub at the owner's request. Commit and push status is recorded in Git history; a successful push alone does not verify deployment. After deployment, recrawl in SEObility and inspect the formerly broken URLs. A score above 95% cannot be guaranteed in advance: the export caps several issue tables at 20 rows, and the next crawl may discover additional issues.
