import { test, expect } from "@playwright/test";

test("booking page offers Calendly and preserves the enquiry option", async ({ page }) => {
  // Validate our integration without creating appointments or depending on
  // external calendar availability, authentication or third-party cookies.
  await page.route("https://calendly.com/**", (route) => route.fulfill({
    contentType: "text/html", body: "<p>Booking provider</p>",
  }));
  await page.goto("/book");
  const calendar = page.getByTitle("Book a tutoring consultation with Calendly");
  await expect(calendar).toBeVisible();
  await expect(calendar).toHaveAttribute("src", /calendly\.com\/drshreyankeducare-info\/30min\?/);
  await expect(page.getByRole("link", { name: "Open the booking page in a new tab" }))
    .toHaveAttribute("href", "https://calendly.com/drshreyankeducare-info/30min");

  await page.getByRole("button", { name: "Ask us to contact you" }).click();
  await expect(calendar).toHaveCount(0);
  await expect(page.getByLabel("Parent or Student Name", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Choose an appointment time" }).click();
  await expect(calendar).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
