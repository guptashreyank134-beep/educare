import { test, expect } from "@playwright/test";

test("booking page requires visitors to use Calendly", async ({ page }) => {
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

  await expect(page.getByText("Select an available time to continue.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send an email enquiry" })).toHaveCount(0);
  await expect(page.getByLabel("Parent or Student Name", { exact: true })).toHaveCount(0);

  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("homepage consultation card goes directly to required Calendly timeslots", async ({ page }) => {
  await page.goto("/");

  const bookingCard = page.locator('[data-enquiry-form="page"]');
  await expect(bookingCard).toBeVisible();
  await expect(bookingCard.locator("form")).toHaveCount(0);
  await expect(bookingCard.getByRole("link", { name: "Choose an Available Timeslot" }))
    .toHaveAttribute("href", "https://calendly.com/drshreyankeducare-info/30min");
  await expect(bookingCard.getByLabel("Parent or Student Name", { exact: true })).toHaveCount(0);
});
