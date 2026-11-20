import { expect, type Page } from "@playwright/test";

/** Keep visual checks local: no analytics, messages, leads or appointments. */
export async function readOnlyPage(page: Page) {
  await page.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (
      !["GET", "HEAD", "OPTIONS"].includes(request.method()) ||
      !["127.0.0.1", "localhost"].includes(url.hostname)
    ) {
      await route.abort("blockedbyclient");
      return;
    }
    if (url.pathname === "/api/reviews") {
      await route.fulfill({ json: { reviews: [] } });
      return;
    }
    await route.continue();
  });
}

export async function expectConsultationLayout(page: Page, width: number) {
  await page.evaluate(() => document.fonts.ready);
  const layout = page.locator("[data-consultation-layout]");
  await expect(layout).toHaveCount(1);
  const intro = layout.locator("[data-consultation-intro]");
  const aside = layout.locator("[data-consultation-aside]");
  const content = layout.locator("[data-consultation-content]");
  await expect(intro.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(aside.locator('form[data-enquiry-form="page"]')).toHaveCount(1);
  await expect(content).not.toBeEmpty();
  const introBox = (await intro.boundingBox())!;
  const asideBox = (await aside.boundingBox())!;
  const contentBox = (await content.boundingBox())!;

  if (width >= 1024) {
    expect(asideBox.x - introBox.x - introBox.width).toBeGreaterThanOrEqual(20);
    expect(Math.abs(asideBox.y - introBox.y)).toBeLessThanOrEqual(2);
    // Program details should continue under the introduction without waiting
    // for the taller form to end and leaving an empty left column.
    const gap = contentBox.y - introBox.y - introBox.height;
    expect(gap).toBeGreaterThanOrEqual(16);
    expect(gap).toBeLessThanOrEqual(64);
    expect(Math.abs(contentBox.x - introBox.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(contentBox.width - introBox.width)).toBeLessThanOrEqual(1);
  } else {
    const formGap = asideBox.y - introBox.y - introBox.height;
    const contentGap = contentBox.y - asideBox.y - asideBox.height;
    expect(formGap).toBeGreaterThanOrEqual(16);
    expect(formGap).toBeLessThanOrEqual(64);
    expect(contentGap).toBeGreaterThanOrEqual(16);
    expect(contentGap).toBeLessThanOrEqual(64);
    expect(Math.abs(asideBox.x - introBox.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(asideBox.width - introBox.width)).toBeLessThanOrEqual(1);
  }

  const formBox = (await aside.locator("[data-course-consultation]").boundingBox())!;
  expect(formBox.x).toBeGreaterThanOrEqual(asideBox.x - 1);
  expect(formBox.x + formBox.width).toBeLessThanOrEqual(asideBox.x + asideBox.width + 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}

export async function expectProfilesAfterContent(page: Page) {
  const profiles = page.locator('section[aria-labelledby="subject-tutor-heading"]');
  await expect(profiles).toHaveCount(1);
  const content = page.locator("[data-consultation-content]");
  const contentBox = (await content.boundingBox())!;
  const profilesBox = (await profiles.boundingBox())!;
  expect(profilesBox.y).toBeGreaterThanOrEqual(contentBox.y + contentBox.height);
}
