import { expect, test, type Page } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";

/**
 * Browser verification of the enquiry forms, against the real server action.
 *
 * Nothing is stubbed. The server under test has the Sanity write token but no
 * Brevo credentials (see playwright.config.ts), so a submission is genuinely
 * stored and no notification is sent to staff. Every lead created here carries
 * TEST_MARKER in its name and is deleted afterwards.
 *
 * This is what markup inspection cannot show: that the contact toggle swaps the
 * required field, that a submission reaches the database, that a double click
 * files one enquiry rather than two, and that the analytics events actually
 * fire with no personal data in them.
 */

const TEST_MARKER = "ZZ-BROWSERTEST-DELETE";

function env(key: string): string | undefined {
  if (process.env[key]) return process.env[key];
  if (!existsSync(".env.local")) return undefined;
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i > 0 && line.slice(0, i).trim() === key) {
      return line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return undefined;
}

const PROJECT = env("NEXT_PUBLIC_SANITY_PROJECT_ID");
const DATASET = env("NEXT_PUBLIC_SANITY_DATASET");
const TOKEN = env("SANITY_API_WRITE_TOKEN") ?? env("SANITY_API_TOKEN");

/** Leads created by these tests, so they can be counted and removed. */
async function testLeadIds(): Promise<string[]> {
  const query = encodeURIComponent(`*[_type == "lead" && name match "${TEST_MARKER}*"]._id`);
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } },
  );
  const json = (await res.json()) as { result?: string[] };
  return json.result ?? [];
}

async function deleteTestLeads(): Promise<number> {
  const ids = await testLeadIds();
  if (ids.length === 0) return 0;
  await fetch(`https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify({ mutations: ids.map((id) => ({ delete: { id } })) }),
  });
  return ids.length;
}

/** Replaces dataLayer with a collector so analytics can be asserted. */
async function captureDataLayer(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { dataLayer?: unknown; __events: Record<string, unknown>[] };
    w.__events = [];
    w.dataLayer = { push: (e: Record<string, unknown>) => w.__events.push(e) };
  });
}

const firedEvents = (page: Page) =>
  page.evaluate(() => (window as unknown as { __events: Record<string, unknown>[] }).__events);

/**
 * The server discards anything submitted within two seconds of the form
 * appearing, because a person cannot read and complete it that fast. Playwright
 * can, so tests wait past that window before submitting — otherwise every
 * submission is correctly treated as automated.
 */
const BOT_WINDOW_MS = 2_500;

/** Clicks the visible label, which is what a person clicks. */
const chooseContact = (page: Page, method: "email" | "phone") =>
  page.locator(`label:has(input[value="${method}"])`).click();

test.beforeAll(async () => {
  test.skip(!PROJECT || !DATASET || !TOKEN, "Sanity credentials required for browser tests");
  await deleteTestLeads();
});

test.afterAll(async () => {
  const removed = await deleteTestLeads();
  if (removed > 0) console.log(`cleaned up ${removed} test lead(s)`);
});

const PAGES = [
  { path: "/programs/physics", anchor: "physics-enquiry", courseLabel: /grade or course/i },
  {
    path: "/programs/university-physics",
    anchor: "university-physics-enquiry",
    courseLabel: /University and course code/i,
  },
];

for (const { path, anchor, courseLabel } of PAGES) {
  test.describe(path, () => {
    test("desktop: form present, labelled, reachable from the CTA", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(path);

      await expect(page.locator(`#${anchor}`)).toBeVisible();
      await expect(page.getByLabel(/your name/i)).toBeVisible();
      await expect(page.getByLabel(courseLabel)).toBeVisible();

      await page.getByRole("link", { name: /Book a Free 30-Minute Consultation/i }).first().click();
      await expect(page).toHaveURL(new RegExp(`#${anchor}$`));
      await expect(page.locator(`#${anchor}`)).toBeInViewport();
    });

    test("mobile: form usable, sticky bar never covers it", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);

      const name = page.getByLabel(/your name/i);
      await name.scrollIntoViewIfNeeded();
      await name.fill("Priya Sharma");
      await expect(name).toHaveValue("Priya Sharma");

      const bar = page.locator("div.fixed.bottom-0").first();
      await expect(bar).toHaveAttribute("aria-hidden", "true");

      await page.mouse.wheel(0, 5000);
      await page.waitForTimeout(500);
      if ((await bar.getAttribute("aria-hidden")) === "false") {
        const barBox = await bar.boundingBox();
        const formBox = await page.locator(`#${anchor}`).boundingBox();
        if (barBox && formBox) {
          expect(formBox.y + formBox.height).toBeLessThanOrEqual(barBox.y + 1);
        }
      }
    });

    test("contact toggle swaps which field is shown and required", async ({ page }) => {
      await page.goto(path);
      await expect(page.getByLabel(/email address/i)).toBeVisible();
      await expect(page.getByLabel(/phone number/i)).toHaveCount(0);

      await chooseContact(page, "phone");
      await expect(page.getByLabel(/phone number/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toHaveCount(0);

      await chooseContact(page, "email");
      await expect(page.getByLabel(/email address/i)).toBeVisible();
    });

    test("invalid input is rejected, values survive, and no lead is counted", async ({ page }) => {
      // Clear leads left by earlier tests so the count below means this test.
      await deleteTestLeads();
      await captureDataLayer(page);
      await page.goto(path);

      await page.getByLabel(/your name/i).fill(`${TEST_MARKER} invalid`);
      await page.getByLabel(/email address/i).fill("not-an-email@");
      await page.waitForTimeout(BOT_WINDOW_MS);
      await page.getByRole("button", { name: /Book a Free 30-Minute Consultation/i }).click();

      await expect(page.getByText(/doesn't look right/i)).toBeVisible();
      // Entered values are preserved, so retrying costs nothing.
      await expect(page.getByLabel(/your name/i)).toHaveValue(`${TEST_MARKER} invalid`);

      const fired = await firedEvents(page);
      expect(fired.map((e) => e.event)).toContain("enquiry_form_error");
      expect(fired.map((e) => e.event)).not.toContain("generate_lead");
      expect(await testLeadIds()).toHaveLength(0);
    });

    test("a valid submission is stored and fires generate_lead", async ({ page }) => {
      await deleteTestLeads();
      await captureDataLayer(page);
      await page.goto(path);

      await page.getByLabel(/your name/i).fill(`${TEST_MARKER} ${anchor}`);
      await page.getByLabel(courseLabel).fill("Physics 12");
      await page.getByLabel(/email address/i).fill("browser.test@example.invalid");
      await page.waitForTimeout(BOT_WINDOW_MS);
      await page.getByRole("button", { name: /Book a Free 30-Minute Consultation/i }).click();

      // Success is shown only after the server confirms durable storage. Scoped
      // to the form: the same timeframe also appears in the consultation box.
      const confirmation = page.locator(`#${anchor}`);
      await expect(confirmation.getByText(/we have your enquiry/i)).toBeVisible({ timeout: 20_000 });
      await expect(confirmation.getByText(/24 hours on business days/i)).toBeVisible();

      const fired = await firedEvents(page);
      const names = fired.map((e) => e.event);
      expect(names).toContain("enquiry_form_start");
      expect(names).toContain("generate_lead");
      expect(names).not.toContain("enquiry_form_error");

      // No personal data may appear in any analytics event.
      const serialised = JSON.stringify(fired);
      expect(serialised).not.toContain("browser.test@example.invalid");
      expect(serialised).not.toContain("Physics 12");
      expect(serialised).not.toContain(TEST_MARKER);

      // The lead genuinely reached the database.
      expect(await testLeadIds()).toHaveLength(1);
    });

    test("a double click files one enquiry, not two", async ({ page }) => {
      await deleteTestLeads();
      await page.goto(path);

      await page.getByLabel(/your name/i).fill(`${TEST_MARKER} double`);
      await page.getByLabel(/email address/i).fill("browser.test@example.invalid");
      await page.waitForTimeout(BOT_WINDOW_MS);

      // Two clicks as close together as the browser will deliver them. The
      // second lands while the first request is still in flight, which is the
      // case the pending guard exists for.
      await page.evaluate(() => {
        const button = document.querySelector<HTMLButtonElement>('button[type="submit"]');
        button?.click();
        button?.click();
      });

      await expect(
        page.locator(`#${anchor}`).getByText(/we have your enquiry/i),
      ).toBeVisible({ timeout: 20_000 });

      // One enquiry, not two: the pending guard blocks the second submit, and
      // the shared submission id would make a retry idempotent regardless.
      expect(await testLeadIds()).toHaveLength(1);
    });
  });
}
