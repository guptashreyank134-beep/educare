import { expect, test } from "@playwright/test";

const vancouverPages = [
  "/tutoring-vancouver",
  "/math-tutor-vancouver",
  "/ap-calculus-tutor-vancouver",
  "/ib-chemistry-tutor-vancouver",
  "/physics-tutor-vancouver",
  "/biology-tutor-vancouver",
];

for (const path of vancouverPages) {
  test(`${path} is indexable and complete`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.drshreyankeducare.com${path}`,
    );
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute(
      "content",
      /noindex/i,
    );
    await expect(page.getByRole("link", { name: "Book a Free Assessment Session" }).first()).toBeVisible();

    const schemaText = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemaText.some((schema) => schema.includes('"@type":"Service"'))).toBe(true);
    expect(schemaText.some((schema) => schema.includes('"@type":"FAQPage"'))).toBe(true);
    expect(schemaText.some((schema) => schema.includes('"@type":"BreadcrumbList"'))).toBe(true);
  });
}

test("Homework & Study Club remains crawlable", async ({ page }) => {
  const path = "/homework-help-burnaby";
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `https://www.drshreyankeducare.com${path}`,
  );
  expect(await page.locator('meta[name="robots"][content*="noindex"]').count()).toBe(0);
  const sitemap = await page.request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(`https://www.drshreyankeducare.com${path}`);
});

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 1000 },
]) {
  test(`Vancouver pages fit ${viewport.name} viewport`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const path of [...vancouverPages, "/homework-help-burnaby"]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.scrollWidth, `${path} has horizontal overflow`).toBeLessThanOrEqual(
        dimensions.clientWidth + 1,
      );
    }
  });
}
