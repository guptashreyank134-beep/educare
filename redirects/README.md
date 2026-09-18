# Redirects

Two maps feed `next.config.ts`, and both are merged by `data/redirects.ts` into
`redirectPairs` / `redirectSources`. Nothing else emits redirects — there is no
`middleware.ts` and no `vercel.json`.

| File | Holds |
| --- | --- |
| `redirects/legacy.ts` | URLs published by the previous WordPress site |
| `data/redirects.ts` | Internal consolidations, where two of our own pages competed for one query |

`app/sitemap.ts` imports `redirectSources` to exclude every redirect source, so
the sitemap only lists canonical URLs.

## Rules

- **Targets are chosen by reading the destination page, not by slug similarity.**
  A question-intent article sent to a generic commercial hub reads as a soft 404:
  the old ranking signal is discarded and the destination gains nothing. If an old
  URL asked "how do I choose a tutor", it belongs on the guide that answers that,
  not on `/services`.
- **No trailing slashes.** The site runs Next's default `trailingSlash: false`,
  which strips a trailing slash before these rules are matched. Write `/foo`, and
  `/foo/` is handled for you.
- **No chains.** Every source reaches its final destination in one hop. A target
  must never itself appear as a source.
- **Every target must return 200 and appear in the sitemap.**
- **Percent-encoded paths need both forms.** The old site published at least one
  URL with an emoji in the slug; the encoded and decoded spellings are separate
  entries.

Run `npm run seo:redirects` to check all of the above.

## Appending from a Search Console export

1. In Search Console choose the property, open **Indexing → Pages**, and pick a
   status with old URLs in it — usually *Not found (404)*, *Page with redirect*,
   or *Crawled – currently not indexed*.
2. **Export → Download CSV**. The URLs are in the first column.
3. For each URL, open the archived page (Search Console's inspect tool, or
   `web.archive.org`) and read what it was actually about. Pick the current page
   that answers the same question.
4. Add an entry to `redirects/legacy.ts`:

   ```ts
   { from: "/old-wordpress-path", to: "/current/page", permanent: true },
   ```

5. Run `npm run seo:redirects`. It fails on chains, conflicting sources,
   self-redirects, and targets that are not live and in the sitemap.

If no current page genuinely answers the old URL, leave it 404 rather than
redirecting it somewhere irrelevant. A 404 is an honest signal; a misleading
redirect is not.

## Handled outside this repo

The apex-to-`www` redirect and the second domain (`drshreyanktutoring.com` →
`www.drshreyankeducare.com`) are DNS/hosting concerns. Do not duplicate them
here.
