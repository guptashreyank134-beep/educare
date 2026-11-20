import { test, expect } from "@playwright/test";
import { readOnlyPage } from "./helpers/consultation-layout";

test("booking confirmation comes only from a completed appointment in the scheduler", async ({ page }) => {
  await readOnlyPage(page);
  await page.addInitScript(() => {
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
  });
  const confirmations = () => page.evaluate(() =>
    (window as unknown as { dataLayer: { event?: string }[] }).dataLayer.filter((entry) => entry.event === "booking_confirmed"),
  );
  await page.goto("/thank-you");
  expect(await confirmations()).toEqual([]);
  await expect(page.getByRole("link", { name: "choose an available time", exact: true })).toHaveAttribute("href", "/book");

  // Stand in for Calendly without sending any appointment requests.
  await page.route("https://calendly.com/**", (route) => route.fulfill({
    contentType: "text/html",
    body: "<p>Booking provider</p>",
  }));
  await page.goto("/book");
  const frame = page.frameLocator('iframe[title*="Calendly"]');
  await expect(frame.getByText("Booking provider")).toBeVisible();
  await page.evaluate(() => window.postMessage({ event: "calendly.event_scheduled" }, location.origin));
  await frame.getByText("Booking provider").evaluate(() => {
    window.parent.postMessage({ event: "calendly.date_and_time_selected" }, "*");
  });
  expect(await confirmations()).toEqual([]);
  await frame.getByText("Booking provider").evaluate(() => {
    window.parent.postMessage({ event: "calendly.event_scheduled" }, "*");
    window.parent.postMessage({ event: "calendly.event_scheduled" }, "*");
  });
  await expect.poll(confirmations).toEqual([{ event: "booking_confirmed", page: "/book" }]);
});

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
  await expect(bookingCard.getByRole("link", { name: "Book a Free Consultation", exact: true }))
    .toHaveAttribute("href", "https://calendly.com/drshreyankeducare-info/30min");
  await expect(bookingCard.getByLabel("Parent or Student Name", { exact: true })).toHaveCount(0);
});
