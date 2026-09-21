/**
 * Verifies the two live delivery channels without emailing staff.
 *
 * Storage: writes a clearly-marked test lead to the real Sanity dataset with the
 * production write token, reads it back, proves createIfNotExists is idempotent,
 * then deletes it. This is a real integration check, not a stub.
 *
 * Notification: checks the Brevo credential against an account endpoint that
 * sends no mail. That proves the key is valid and the sender is usable; it does
 * not prove a message was delivered, which would mean mailing a real inbox.
 *
 * Run: npx tsx scripts/verify-lead-delivery.mts
 */

import { existsSync, readFileSync } from "node:fs";

if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i <= 0 || line.trim().startsWith("#")) continue;
    process.env[line.slice(0, i).trim()] ??= line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
}

const { createClient } = await import("@sanity/client");

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("FAIL  no Sanity write token in the environment");
  process.exit(1);
}

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const id = `lead-verify-${Date.now()}`;
let problems = 0;
const ok = (label: string, passed: boolean, detail = "") => {
  if (!passed) problems++;
  console.log(`  ${passed ? "ok  " : "FAIL"}  ${label}${detail ? `   ${detail}` : ""}`);
};

console.log("=== durable storage (real Sanity dataset) ===");

// Mirrors exactly what app/actions/lead.ts writes.
const document = {
  _type: "lead" as const,
  vertical: "local-k12",
  name: "DELETE ME — automated delivery check",
  subject: "Physics",
  email: "verify@example.invalid",
  phone: "+1 604 000 0000",
  preferredContact: "email",
  message: "Automated verification of lead storage. Safe to delete.",
  submittedAt: new Date().toISOString(),
};

try {
  await sanity.createIfNotExists({ _id: id, ...document });
  ok("write accepted by the live dataset", true);

  const stored = await sanity.fetch<Record<string, unknown> | null>(
    `*[_id == $id][0]{_id, name, subject, email, phone, preferredContact, vertical, submittedAt}`,
    { id },
  );
  ok("document readable straight back", stored !== null);
  ok("subject stored", stored?.subject === "Physics", String(stored?.subject));
  ok(
    "preferredContact stored (new schema field)",
    stored?.preferredContact === "email",
    String(stored?.preferredContact),
  );
  ok("appears in the leads collection", Boolean(stored?.vertical));

  // Idempotency against the real API, not a stub.
  await sanity.createIfNotExists({ _id: id, ...document, name: "SECOND ATTEMPT" });
  const after = await sanity.fetch<{ name?: string } | null>(`*[_id == $id][0]{name}`, { id });
  ok(
    "retry with the same id does not duplicate or overwrite",
    after?.name === document.name,
    String(after?.name),
  );

  const count = await sanity.fetch<number>(`count(*[_type == "lead" && _id == $id])`, { id });
  ok("exactly one document exists for the id", count === 1, `count=${count}`);
} catch (error) {
  ok("write accepted by the live dataset", false, (error as Error).message);
} finally {
  try {
    await sanity.delete(id);
    const gone = await sanity.fetch<number>(`count(*[_id == $id])`, { id });
    ok("test document cleaned up", gone === 0, `remaining=${gone}`);
  } catch (error) {
    ok("test document cleaned up", false, (error as Error).message);
    console.error(`     LEFT BEHIND: ${id} — delete it in Studio.`);
  }
}

console.log("\n=== notification credential (no mail sent) ===");
const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  ok("BREVO_API_KEY present", false, "not set in this environment");
} else {
  try {
    const res = await fetch("https://api.brevo.com/v3/account", {
      headers: { "api-key": apiKey, accept: "application/json" },
    });
    ok("Brevo API key accepted", res.ok, `HTTP ${res.status}`);
    if (res.ok) {
      const account = (await res.json()) as { email?: string; plan?: { credits?: number }[] };
      console.log(`        account: ${account.email ?? "(unknown)"}`);
      const credits = account.plan?.find((p) => typeof p.credits === "number")?.credits;
      if (typeof credits === "number") {
        ok("sending credits remain", credits > 0, `credits=${credits}`);
      }
    }
  } catch (error) {
    ok("Brevo API reachable", false, (error as Error).message);
  }
}

console.log(`\ntotal problems: ${problems}`);
process.exit(problems === 0 ? 0 : 1);
