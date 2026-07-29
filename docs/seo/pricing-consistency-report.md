# Pricing Consistency Report

Date: 2026-07-29 · Branch: `seo/final-consistency-audit`

## Source of truth

Pricing is now centralized in **`data/pricing.ts`**. The pricing page
(`app/pricing/content.ts`) imports these values instead of hard-coding them, and
`scripts/content-audit.mjs` fails the build if any source file introduces a
dollar amount that conflicts with them.

## Approved pricing (verified from the pricing page)

| Item | Value |
|---|---|
| One-on-one tutoring | **CAD $75–$100** per 60-minute session (GST included) |
| Monthly small-group program | **CAD $185–$200** per month (GST included) |
| — sessions | Two 60-minute sessions per week |
| — group size | up to **6** students |
| Exam Booster | **CAD $280** for 5 instructional hours (GST included) |
| GST | Included (no hidden fees) |
| Online vs in-person | Same pricing both ways |
| Cancellation | ≥ 24 hours' notice |

## Conflicts found and corrected

| Location | Was | Now |
|---|---|---|
| `components/servicesPageComponents/HowSessionsWork.tsx` (body) | "small group of **six to eight**" | "small group of **up to six**" |
| `HowSessionsWork.tsx` (code comment) | "small group of **6-8**" | "small group of up to 6" |
| `app/guides/…/page.tsx` | market-rate band "**$70–$110 per hour**" (conflicted with approved) | reworded to "rates vary widely by level and tutor experience" + link to pricing |

## Verified clean (no conflict)

- **No `$25–$50`, `$35–$60`, or other outdated hourly/monthly amounts** exist anywhere in the source (searched `app/`, `components/`, `data/`, `utils/`).
- `data/cities.ts` Burnaby copy ("$75–$100 per 60-minute session") matches the approved figure.
- The pricing card amounts (75/100/185/200/280) now derive from `data/pricing.ts`.

## Ongoing guard

`npm run audit:content` (also part of `npm run seo:audit`) flags any future
dollar amount near "hour/session/month" that isn't in `data/pricing.ts`.
