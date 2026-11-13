import { test, expect } from "@playwright/test";

// A short introduction and a tall form used to share one desktop grid row.
// That left several hundred pixels empty beneath the introduction even though
// ordinary overflow and HTTP checks passed. Measure the actual content flow.
const routes = [
  "/physics-tutor-vancouver",
  "/english-tutor-vancouver",
  "/online-medical-tutoring",
  "/math-tutor-vancouver",
  "/programs/physics",
  "/programs/university-physics",
  "/programs/biology",
  "/programs/mcat-prep",
];

for (const width of [390, 768, 1024, 1280, 1440]) {
  test.describe(`landing content flow at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, deviceScaleFactor: 1.5 });

    for (const route of routes) {
      test(`${route} has no reserved void below its introduction`, async ({ page }) => {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        const isProgram = route.startsWith("/programs/");
        const intro = isProgram ? page.locator("h1").locator("..") : page.locator("[data-landing-introduction]");
        const enquiry = page.locator(isProgram ? "[data-course-consultation]" : "[data-landing-enquiry]");
        await expect(intro).toBeVisible();
        await expect(enquiry).toBeVisible();
        const introBox = (await intro.boundingBox())!;
        const enquiryBox = (await enquiry.boundingBox())!;
        const gap = enquiryBox.y - (introBox.y + introBox.height);
        expect(gap).toBeGreaterThanOrEqual(24);
        expect(gap).toBeLessThanOrEqual(40);
        expect(Math.abs(introBox.x - enquiryBox.x)).toBeLessThanOrEqual(1);
        expect(Math.abs(introBox.width - enquiryBox.width)).toBeLessThanOrEqual(1);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);

        const form = enquiry.locator('form[data-enquiry-form="page"]');
        await expect(form).toHaveCount(1);
        const nameBox = (await form.locator('input[name="fullName"]').boundingBox())!;
        const courseBox = (await form.locator('input[name="course"]').boundingBox())!;
        if (width >= 768) {
          expect(Math.abs(nameBox.y - courseBox.y)).toBeLessThanOrEqual(1);
          expect(courseBox.x).toBeGreaterThan(nameBox.x + nameBox.width);
        } else {
          expect(courseBox.y).toBeGreaterThan(nameBox.y + nameBox.height);
        }

        // Exercise the rearranged form without creating a lead or booking.
        await form.getByText("phone", { exact: true }).click();
        await expect(form.locator('input[name="phone"]')).toBeVisible();
        await form.getByText("email", { exact: true }).click();
        await expect(form.locator('input[name="email"]')).toBeVisible();
        await expect(form.getByRole("button", { name: "Book a Free 30-Minute Consultation", exact: true })).toBeVisible();

        if (route === "/physics-tutor-vancouver" && width === 1440) {
          // Simulate a network failure locally: no submitted request reaches
          // the server, and the live error message must still fit the layout.
          await page.route("**/*", (request) => request.request().method() === "POST" ? request.abort() : request.continue());
          await form.locator('input[name="fullName"]').fill("Layout Validation Test");
          await form.locator('input[name="email"]').fill("layout@example.invalid");
          await form.locator('input[name="phone"]').fill("604 555 0123");
          await form.getByRole("button", { name: "Book a Free 30-Minute Consultation", exact: true }).click();
          await expect(form.locator('[aria-live="polite"]')).toContainText("Something went wrong sending your enquiry");
          await expect(form.locator('[aria-live="polite"]')).toBeVisible();
        }
      });
    }
  });
}
