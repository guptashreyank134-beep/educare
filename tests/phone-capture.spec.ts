import { expect, test, type Locator, type Page } from "@playwright/test";
import { getAppointmentBooking } from "../lib/appointmentBooking";
import { readOnlyPage } from "./helpers/consultation-layout";

/**
 * Exercises browser validation and preference switching only. Every write
 * request is blocked, so these checks cannot store a lead or send a message.
 */
async function blockWrites(page: Page) {
  const actionRequests: string[] = [];
  await page.route("**/*", async (route) => {
    const request = route.request();
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      if (request.headers()["next-action"]) actionRequests.push(request.url());
      await route.abort("blockedbyclient");
      return;
    }
    await route.continue();
  });
  return actionRequests;
}

async function expectRequiredPhone(phone: Locator) {
  await expect(phone).toBeVisible();
  await expect(phone).toHaveAttribute("required", "");
  await expect(phone).toHaveAttribute("type", "tel");
  await expect(phone).toHaveAttribute("inputmode", "tel");
  await expect(phone).toHaveAttribute("autocomplete", "tel");
  await expect(phone).toHaveAttribute("maxlength", "40");
  await expect(phone).toHaveAccessibleDescription(
    "Canada/US: include your area code. Other countries: start with + and your country code.",
  );
}

test("program booking links lead to the scheduler and the enquiry has its own action", async ({ page }) => {
  await readOnlyPage(page);
  await page.goto("/programs/physics");
  const destination = getAppointmentBooking()?.url ?? "/book";
  const intro = page.locator("[data-consultation-intro]");
  await expect(intro.getByRole("link", { name: "Book a Free 30-Minute Consultation" })).toHaveAttribute("href", destination);
  await expect(intro.getByRole("link", { name: "Ask about this program" })).toHaveAttribute("href", "#physics-enquiry");
  await expect(page.locator("div.fixed.bottom-0 a", { hasText: "Book a Free 30-Minute Consultation" })).toHaveAttribute("href", destination);
  await expect(page.getByRole("link", { name: "Book a free 30-minute Physics consultation" })).toHaveAttribute("href", "/book");
});

for (const [path, category] of [
  ["/online-medical-tutoring", "medical"],
  ["/online-economics-tutor", "quant"],
  ["/programs/physics", "local-k12"],
] as const) {
  test(`${path} sends the course enquiry with the correct category`, async ({ page }) => {
    await readOnlyPage(page);
    await page.goto(path);
    const form = page.locator('form[data-enquiry-form="page"]');
    await form.getByLabel("Your name", { exact: true }).fill("Routing Test");
    await form.getByLabel("Email address").fill("routing@example.invalid");
    await form.getByLabel("Phone number (required)").fill("604 555 0123");
    // Inspect the outgoing payload. readOnlyPage aborts it before it reaches the server.
    const pending = page.waitForRequest((request) => Boolean(request.headers()["next-action"]));
    await form.getByRole("button", { name: "Send my enquiry" }).click();
    const request = await pending;
    const fields = await new Response(request.postData(), {
      headers: { "content-type": request.headers()["content-type"] },
    }).formData();
    expect([...fields.entries()].find(([key]) => key.endsWith("_vertical"))?.[1]).toBe(category);
  });
}

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
]) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const path of ["/programs/physics", "/programs/university-physics"]) {
      test(`${path}: email preference still requires phone and preserves it`, async ({ page }) => {
        const actionRequests = await blockWrites(page);
        await page.goto(path);
        const form = page.locator('form[data-enquiry-form="page"]');
        const phone = form.getByLabel("Phone number (required)", { exact: true });
        await expectRequiredPhone(phone);
        await expect(form.getByRole("radio", { name: "email", exact: true })).toBeChecked();
        await form.getByLabel("Your name", { exact: true }).fill("Phone Validation Test");
        await form.getByLabel("Email address", { exact: true }).fill("validation@example.invalid");

        // All required fields except phone are complete. Browser validation
        // must keep this email-preferred enquiry from calling the server.
        await form.getByRole("button", { name: "Send my enquiry" }).click();
        await expect(phone).toBeFocused();
        expect(await phone.evaluate((node: HTMLInputElement) => node.validity.valueMissing)).toBe(true);
        expect(actionRequests).toEqual([]);

        await phone.fill("+44 20 7946 0958");
        await form.locator('label:has(input[name="contactMethod"][value="phone"])').click();
        await expect(form.getByLabel("Email address", { exact: true })).toHaveCount(0);
        await expectRequiredPhone(phone);
        await expect(phone).toHaveValue("+44 20 7946 0958");
        await form.locator('label:has(input[name="contactMethod"][value="email"])').click();
        await expect(form.getByLabel("Email address", { exact: true })).toBeVisible();
        await expect(phone).toHaveValue("+44 20 7946 0958");

        const box = await phone.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
        expect(actionRequests).toEqual([]);
      });
    }

    test("Study Club: parent phone is required before an interest enquiry", async ({ page }) => {
      const actionRequests = await blockWrites(page);
      await page.goto("/homework-help-burnaby");
      const form = page.locator('form[data-enquiry-form="page"]');
      const phone = form.getByLabel("Parent phone (required)", { exact: true });
      await expectRequiredPhone(phone);
      await form.getByLabel("Parent or guardian name", { exact: true }).fill("Parent Validation Test");
      await form.getByLabel("Parent email", { exact: true }).fill("validation@example.invalid");
      await form.getByLabel("Student grade", { exact: true }).selectOption({ label: "Grade 9" });
      await form.getByLabel("Subjects needing support", { exact: true }).selectOption({ label: "Mathematics" });
      await form.locator('input[name="consent"]').check();
      await form.getByRole("button", { name: "Register Your Interest" }).click();
      await expect(phone).toBeFocused();
      expect(await phone.evaluate((node: HTMLInputElement) => node.validity.valueMissing)).toBe(true);
      expect(actionRequests).toEqual([]);

      await phone.fill("604 555 0123");
      expect(await form.evaluate((node: HTMLFormElement) => node.checkValidity())).toBe(true);
      await phone.fill("+44 20 7946 0958");
      expect(await form.evaluate((node: HTMLFormElement) => node.checkValidity())).toBe(true);
      expect(actionRequests).toEqual([]);
    });
  });
}
