import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test.describe(`navigation semantics at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("public CTAs expose one interactive element per action", async ({ page }) => {
      for (const path of ["/", "/about", "/services", "/physics-tutor-vancouver", "/math-tutor-vancouver", "/online-medical-tutoring", "/homework-help-burnaby", "/pricing", "/blog", "/book", "/contact"]) {
        await page.goto(path);
        await expect(page.locator("a button, button a, button button")).toHaveCount(0);
        await expect(page.getByRole("main")).toHaveCount(1);
        await expect(page.locator("main main")).toHaveCount(0);
      }
    });

    test("contact and article headings follow the page heading", async ({ page }) => {
      for (const path of ["/contact", "/blog"]) {
        await page.goto(path);
        const levels = await page.locator("h1,h2,h3,h4,h5,h6").evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));
        expect(levels[0]).toBe(1);
        for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
      }
    });
  });
}
