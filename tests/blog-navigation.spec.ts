import { expect, test, type Page } from "@playwright/test";

async function expectBlogLayout(page: Page) {
  const main = page.getByRole("main");
  const panel = page.locator('[data-enquiry-section="shared"]');
  await expect(main).toHaveCount(1);
  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
  await expect(panel).toHaveCount(1);
  await expect(page.locator("[data-whatsapp-shortcut]")).toHaveCount(1);
  await expect(panel).toBeVisible();
  // The intended CTA follows the content. A stale copy of the previous
  // layout used to appear above the blog immediately after a Link click.
  const mainBox = (await main.boundingBox())!;
  const panelBox = (await panel.boundingBox())!;
  expect(panelBox.y).toBeGreaterThanOrEqual(mainBox.y + mainBox.height - 1);
}

for (const width of [390, 1440]) {
  test(`blog navigation keeps one consultation panel below the content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route("**/*", (route) =>
      ["GET", "HEAD", "OPTIONS"].includes(route.request().method()) ? route.continue() : route.abort(),
    );
    await page.goto("/");
    const panel = page.locator('[data-enquiry-section="shared"]');
    const homeBooking = page.locator("[data-home-booking]");
    await expect(homeBooking).toBeVisible();
    const origin = await page.evaluate(() => performance.timeOrigin);

    const header = page.getByRole("banner");
    if (width === 390) {
      await header.getByRole("button", { name: "Toggle navigation menu" }).click();
    }
    await header.getByRole("link", { name: "Blog", exact: true }).click();
    const archive = page.getByRole("navigation", { name: "Blog archive pages" });
    await expect(archive).toBeVisible();
    await expectBlogLayout(page);
    expect(await page.evaluate(() => performance.timeOrigin)).toBe(origin);

    await page.goBack();
    await expect(homeBooking).toBeVisible();
    await expect(panel).toBeHidden();
    await page.goForward();
    await expect(archive).toBeVisible();
    await expectBlogLayout(page);
    await page.reload();
    await expect(archive).toBeVisible();
    await expectBlogLayout(page);

    await archive.getByRole("link", { name: "Page 2", exact: true }).click();
    await expect(page).toHaveURL(/\/blog\/page\/2$/);
    await expect(archive.getByRole("link", { name: "Page 2", exact: true })).toHaveAttribute("aria-current", "page");
    await expectBlogLayout(page);

    const articleLink = page.getByRole("link", { name: "Read Article", exact: true }).first();
    await articleLink.click();
    const authorBooking = page.locator("main article aside").getByRole("link", { name: /book a free 30-minute consultation/i });
    await expect(authorBooking).toHaveAttribute("href", "/book");
    await expectBlogLayout(page);
    await page.reload();
    await expect(authorBooking).toBeVisible();
    await expectBlogLayout(page);

    if (width === 390) {
      await header.getByRole("button", { name: "Toggle navigation menu" }).click();
    }
    await header.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(panel).toHaveCount(1);
    await expect(panel).toBeVisible();
  });
}
