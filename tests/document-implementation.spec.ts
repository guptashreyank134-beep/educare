import { expect, test, type Page } from "@playwright/test";
import { expectConsultationLayout, expectProfilesAfterContent, readOnlyPage } from "./helpers/consultation-layout";

const medicalPaths = [
  "/online-medical-tutoring",
  "/medical-sciences-tutor",
  "/online-physiology-tutor",
  "/online-pathology-tutor",
  "/online-pharmacology-tutor",
  "/medical-exam-prep-tutor-online",
];

async function expectGeneralReviews(page: Page) {
  const reviews = page.locator('[data-tutoring-reviews="service"]');
  await expect(reviews).toHaveCount(1);
  await expect(reviews.getByRole("heading", { level: 2 })).toHaveText(
    "Student and Parent Reviews of Dr. Shreyank Educare",
  );
  await expect(reviews).toContainText("Individual reviewers may discuss different subjects.");
  await expect(reviews).toContainText("Parag Jawkar");
  await expect(reviews).toContainText("university Physics course");
  await expect(reviews.getByRole("link", { name: "Read Google reviews", exact: true }))
    .toHaveAttribute("href", /^https:\/\//);
}

for (const width of [390, 1280]) {
  test.describe(`document requirements at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    test.beforeEach(async ({ page }) => readOnlyPage(page));

    for (const path of medicalPaths) {
      test(`${path}: useful introduction, genuine profiles and reviews`, async ({ page }) => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);

        const intro = page.locator("[data-landing-introduction]");
        expect(await intro.locator("p").count()).toBeGreaterThanOrEqual(2);
        expect((await intro.innerText()).length).toBeGreaterThan(300);
        await expectConsultationLayout(page, width);
        await expectProfilesAfterContent(page);

        for (const profile of [
          { id: 6, name: "Dr. Sabiha Arshed", credential: "MD, MSc in Health Sciences" },
          { id: 8, name: "Dr. Vishal Sehgal", credential: "Physician & Healthcare Educator" },
        ]) {
          const card = page.locator(`#subject-tutor-${profile.id}`);
          await expect(card.getByRole("heading", { level: 3, name: profile.name, exact: true })).toBeVisible();
          await expect(card).toContainText(profile.credential);
          await expect(card).toContainText("Expertise and teaching strengths");
          expect(await card.locator("li").count()).toBeGreaterThanOrEqual(3);
          const photo = card.getByRole("img");
          await photo.scrollIntoViewIfNeeded();
          await expect(photo).toHaveAttribute("alt", new RegExp(profile.name));
          await expect.poll(() => photo.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
          await expect(card.getByRole("link", { name: /full profile/ })).toHaveAttribute("href", /^\/about/);
        }

        await expectGeneralReviews(page);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      });
    }

    test("homepage has one primary booking action and an aligned introduction", async ({ page }) => {
      const response = await page.goto("/");
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      const hero = page.locator("[data-home-hero]");
      const booking = hero.locator("[data-home-booking]");
      const primary = hero.getByRole("link", { name: "Book a Free Consultation", exact: true });
      await expect(primary).toHaveCount(1);
      await expect(primary).toBeInViewport({ ratio: 1 });
      await expect(primary).toHaveAttribute("href", "https://calendly.com/drshreyankeducare-info/30min");
      await expect(hero.locator('a[href*="calendly.com/"]')).toHaveCount(1);
      const filledActionLabels = await hero.getByRole("link").evaluateAll((links) =>
        links.filter((link) => getComputedStyle(link).backgroundColor !== "rgba(0, 0, 0, 0)")
          .map((link) => link.textContent?.trim()),
      );
      expect(filledActionLabels).toEqual(["Book a Free Consultation"]);
      await expect(hero.locator('a[href="/book"]')).toHaveCount(0);
      await expect(hero.getByRole("link", { name: "Choose an Available Timeslot", exact: true })).toHaveCount(0);
      await expect(booking.locator("form")).toHaveCount(0);
      await expect(booking).toContainText(/select an available time/i);

      const whatsapp = hero.getByRole("link", { name: "Chat on WhatsApp", exact: true });
      await expect(whatsapp).toHaveCount(1);
      const linkStyle = await whatsapp.evaluate((node) => {
        const style = getComputedStyle(node);
        return { background: style.backgroundColor, border: style.borderTopWidth };
      });
      expect(linkStyle.background).toBe("rgba(0, 0, 0, 0)");
      expect(linkStyle.border).toBe("0px");
      await expect(page.locator('a.fixed[aria-label="Chat on WhatsApp"]')).toHaveCount(0);

      const heading = hero.getByRole("heading", { level: 1 });
      const bookingTitle = booking.getByRole("heading", {
        level: 2, name: "Your Free 30-Minute Consultation", exact: true,
      });
      await expect(bookingTitle).toBeVisible();
      if (width >= 1024) {
        for (const desktopWidth of [width, 1024]) {
          await page.setViewportSize({ width: desktopWidth, height: 900 });
          const headingBox = (await heading.boundingBox())!;
          const bookingBox = (await booking.boundingBox())!;
          const titleBox = (await bookingTitle.boundingBox())!;
          expect(Math.abs(headingBox.y - bookingBox.y)).toBeLessThanOrEqual(2);
          expect(Math.abs(headingBox.y - titleBox.y)).toBeLessThanOrEqual(2);
          expect(titleBox.x).toBeGreaterThanOrEqual(headingBox.x + headingBox.width);
        }
      } else {
        const headingBox = (await heading.boundingBox())!;
        const bookingBox = (await booking.boundingBox())!;
        const visualBox = (await hero.locator("[data-home-visual]").boundingBox())!;
        expect(bookingBox.y).toBeGreaterThan(headingBox.y + headingBox.height);
        expect(visualBox.y).toBeGreaterThanOrEqual(bookingBox.y + bookingBox.height);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    });

    test("program navigation distinguishes academic and university finance", async ({ page }) => {
      await page.goto("/programs");
      await page.getByRole("button", { name: "Finance Tutoring", exact: true }).click();
      await expect(page.getByRole("link", { name: "Explore our Finance Tutoring", exact: true }))
        .toHaveAttribute("href", "/programs/finance");
      const directory = page.getByRole("navigation", { name: "All tutoring programs" });
      await expect(directory.getByRole("link", { name: "Finance Tutoring", exact: true }))
        .toHaveAttribute("href", "/programs/finance");
      await expect(directory.getByRole("link", { name: "Finance", exact: true }))
        .toHaveAttribute("href", "/programs/university-finance");

      const studyClub = page.locator("footer").getByRole("link", { name: "Study Club Terms", exact: true });
      await expect(studyClub).toHaveAttribute("href", "/homework-help-burnaby");
      const response = await page.goto("/homework-help-burnaby");
      expect(response?.status()).toBe(200);
      await expect(page.locator("#programme-terms")).toHaveCount(1);
      const comparisonBox = (await page.getByRole("table").boundingBox())!;
      const profileBox = (await page.locator("#subject-tutor-0").boundingBox())!;
      expect(profileBox.y).toBeGreaterThan(comparisonBox.y + comparisonBox.height);
    });
  });
}

for (const path of [
  "/physics-tutor-vancouver",
  "/math-tutor-burnaby",
  "/programs/physics",
  "/programs",
  "/services",
  "/homework-help-burnaby",
  "/pricing",
]) {
  test(`${path}: general reviews are available beyond medical tutoring`, async ({ page }) => {
    await readOnlyPage(page);
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expectGeneralReviews(page);
  });
}
