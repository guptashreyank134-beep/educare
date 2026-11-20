import { test, expect } from "@playwright/test";
import { expectConsultationLayout, expectProfilesAfterContent, readOnlyPage } from "./helpers/consultation-layout";

// Measure the document's requested sidebar while guarding against the large
// empty area that used to appear between short introductions and course details.
const routes = [
  "/physics-tutor-vancouver",
  "/english-tutor-vancouver",
  "/online-medical-tutoring",
  "/math-tutor-vancouver",
  "/engineering-dynamics-tutor",
  "/engineering-statics-tutor",
  "/differential-equations-tutor-online-canada",
  "/online-economics-tutor",
  "/programs/physics",
  "/programs/university-physics",
  "/programs/biology",
  "/programs/mcat-prep",
];

for (const width of [390, 768, 1024, 1280, 1440]) {
  test.describe(`landing content flow at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, deviceScaleFactor: 1.5 });
    test.beforeEach(async ({ page }) => readOnlyPage(page));

    for (const route of routes) {
      test(`${route} has no reserved void below its introduction`, async ({ page }) => {
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        await expectConsultationLayout(page, width);
        await expectProfilesAfterContent(page);

        const form = page.locator('[data-consultation-aside] form[data-enquiry-form="page"]');
        await expect(form).toHaveCount(1);
        const nameBox = (await form.locator('input[name="fullName"]').boundingBox())!;
        const courseBox = (await form.locator('input[name="course"]').boundingBox())!;
        // Sidebar fields remain comfortably readable in a single column.
        expect(courseBox.y).toBeGreaterThan(nameBox.y + nameBox.height);
        expect(Math.abs(courseBox.x - nameBox.x)).toBeLessThanOrEqual(1);

        // Exercise the rearranged form without creating a lead or booking.
        await form.getByText("phone", { exact: true }).click();
        await expect(form.locator('input[name="phone"]')).toBeVisible();
        await form.getByText("email", { exact: true }).click();
        await expect(form.locator('input[name="email"]')).toBeVisible();
        await expect(form.getByRole("button", { name: "Send my enquiry", exact: true })).toBeVisible();

        if (route === "/physics-tutor-vancouver" && width === 1440) {
          // Simulate a network failure locally: no submitted request reaches
          // the server, and the live error message must still fit the layout.
          await form.locator('input[name="fullName"]').fill("Layout Validation Test");
          await form.locator('input[name="email"]').fill("layout@example.invalid");
          await form.locator('input[name="phone"]').fill("604 555 0123");
          await form.getByRole("button", { name: "Send my enquiry", exact: true }).click();
          await expect(form.locator('[aria-live="polite"]')).toContainText("Something went wrong sending your enquiry");
          await expect(form.locator('[aria-live="polite"]')).toBeVisible();
        }
      });
    }
  });
}
