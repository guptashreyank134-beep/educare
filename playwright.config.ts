import { existsSync, readFileSync } from "node:fs";
import { defineConfig } from "@playwright/test";

/**
 * Browser checks for the enquiry forms, run against a production build.
 *
 * The server gets the Sanity write token but deliberately no Brevo credentials:
 * a submission is genuinely stored, and no notification is sent to staff. Test
 * leads are marked and deleted by the spec.
 *
 * Kept out of `npm test`, which stays fast and dependency-light. Run with
 * `npm run test:browser` after `npm run build`.
 */
const local: Record<string, string> = {};
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i > 0 && !line.trim().startsWith("#")) {
      local[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  reporter: [["list"]],
  use: { baseURL: "http://127.0.0.1:3997", trace: "off" },
  webServer: {
    command: "npx next start -p 3997",
    url: "http://127.0.0.1:3997/programs/physics",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: local.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
      NEXT_PUBLIC_SANITY_DATASET: local.NEXT_PUBLIC_SANITY_DATASET ?? "",
      NEXT_PUBLIC_SANITY_API_VERSION: local.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
      SANITY_API_WRITE_TOKEN: local.SANITY_API_WRITE_TOKEN ?? "",
      // The suite submits repeatedly from one address; the production default
      // of five a minute would throttle it into false failures.
      LEAD_RATE_LIMIT_MAX: "1000",
      // No BREVO_* on purpose: storage is exercised, staff are not emailed.
    },
  },
});
