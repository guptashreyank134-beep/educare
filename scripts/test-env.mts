/** Loads .env.local for tests that touch Sanity-backed code. */
import { existsSync, readFileSync } from "node:fs";

export function loadEnvLocal(file = ".env.local"): void {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const separator = line.indexOf("=");
    if (separator <= 0 || line.trim().startsWith("#")) continue;
    const key = line.slice(0, separator).trim();
    process.env[key] ??= line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
  }
}
