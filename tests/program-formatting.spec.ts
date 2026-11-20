import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { expectConsultationLayout, expectProfilesAfterContent, readOnlyPage } from "./helpers/consultation-layout";

const programs = readdirSync("app/programs").filter((slug) => existsSync(join("app/programs", slug, "page.tsx")));

for (const width of [390, 1280]) {
  test.describe(`program summaries at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, deviceScaleFactor: 1.5 });
    test.beforeEach(async ({ page }) => readOnlyPage(page));
    for (const slug of programs) {
      test(`${slug} uses the available width without clipped content`, async ({ page }) => {
        const response = await page.goto(`/programs/${slug}`);
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        await expectConsultationLayout(page, width);
        // Some language/finance/exam pages have no verified tutor assignment.
        // Check the placement of existing profiles without inventing a match.
        if (await page.locator('section[aria-labelledby="subject-tutor-heading"]').count()) {
          await expectProfilesAfterContent(page);
        }
        const overview = page.locator("[data-program-overview]");
        const cards = overview.locator("[data-program-card]");
        const expectedCards = ["gre-prep", "gmat-prep"].includes(slug) ? 7 : 5;
        await expect(cards).toHaveCount(expectedCards);
        const bounds = (await overview.boundingBox())!;
        const first = (await cards.nth(0).boundingBox())!;
        const second = (await cards.nth(1).boundingBox())!;
        // Card columns respond to their available space beside the form,
        // rather than assuming that every desktop section spans the full page.
        if (bounds.width >= 576) {
          expect(Math.abs(first.y - second.y)).toBeLessThanOrEqual(1);
          expect(second.x - first.x - first.width).toBeGreaterThanOrEqual(16);
          expect(Math.abs(second.x + second.width - bounds.x - bounds.width)).toBeLessThanOrEqual(1);
          expect(first.width / bounds.width).toBeGreaterThan(0.45);
          expect(first.width / bounds.width).toBeLessThan(0.5);
        } else {
          expect(second.y).toBeGreaterThan(first.y + first.height);
          expect(Math.abs(first.width - bounds.width)).toBeLessThanOrEqual(1);
        }
        for (const card of await cards.all()) {
          await expect(card.getByRole("heading", { level: 2 })).toHaveCount(1);
          expect(await card.evaluate((el) => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
        }
        const approach = cards.filter({ has: page.getByRole("heading", { name: "Our Approach", exact: true }) });
        expect(Math.abs((await approach.boundingBox())!.width - bounds.width)).toBeLessThanOrEqual(1);
        await expect(approach.locator("[data-program-approach]")).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      });
    }
  });
}
