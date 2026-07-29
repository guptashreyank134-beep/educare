#!/usr/bin/env node
// Source-level content-consistency audit (no running server needed).
// Complements scripts/seo-audit.mjs (which crawls the live build). This scans
// the source tree for content problems that keep recurring:
//   - pricing amounts that conflict with data/pricing.ts (the single source)
//   - legacy/incorrect university course codes
//   - outdated phone numbers
//   - unsupported fixed-improvement / superlative claims
//   - subject-specific "provincial exam" wording (BC has no such exam for
//     Physics 12 / Chemistry 12 / Pre-Calculus 12)
//
// Usage: node scripts/content-audit.mjs   (also runs as part of npm run seo:audit)
// Exits non-zero if any ERROR-level issue is found, so it can gate CI.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "data", "utils"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);
const SKIP_FILES = new Set([
  "content-audit.mjs",
  "seo-audit.mjs",
  "pricing.ts", // the source of truth itself
]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(p, out);
    } else if (EXTS.has(p.slice(p.lastIndexOf(".")))) {
      if (!SKIP_FILES.has(name)) out.push(p);
    }
  }
  return out;
}

const PHONE = "6725147587"; // canonical, digits only
const ALLOWED_PRICE = new Set([75, 100, 185, 200, 280]);

// Each rule: {id, level, test(line) -> boolean, note}
const rules = [
  {
    id: "pricing-conflict",
    level: "ERROR",
    note: "dollar amount near hour/session/month that isn't in data/pricing.ts ($75/100/185/200/280)",
    test: (line) => {
      const m = [...line.matchAll(/\$(\d{2,4})/g)];
      if (!m.length) return false;
      if (!/hour|session|month|per\b|\/hr|\/hour/i.test(line)) return false;
      return m.some((x) => !ALLOWED_PRICE.has(Number(x[1])));
    },
  },
  {
    id: "group-size",
    level: "ERROR",
    note: "group size other than 'up to 6' (approved max is 6)",
    test: (line) => /six to eight|6\s*(?:-|–|to)\s*8\b/i.test(line),
  },
  {
    id: "legacy-course-code",
    level: "ERROR",
    note: "course code removed in the verified audit",
    test: (line) => /\bPHYS\s?1117\b|\bPHYS\s?1170\b|\bPHYS\s?1108\b|\bSTAT\s?241\b/.test(line),
  },
  {
    id: "old-phone",
    level: "ERROR",
    note: "phone number that isn't +1 672-514-7587",
    test: (line) => {
      // form placeholders show a fake example number on purpose — not a business phone
      if (/placeholder|e\.g\./i.test(line)) return false;
      const nums = [...line.matchAll(/(?:\+?1[\s.-]?)?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})/g)];
      return nums.some((n) => (n[1] + n[2] + n[3]) !== PHONE);
    },
  },
  {
    id: "unsupported-claim",
    level: "WARN",
    note: "unsupported improvement/superlative claim",
    test: (line) => {
      // skip cautionary text that warns AGAINST such claims (e.g. the guide)
      if (/cautious|beware|avoid|do not|don't|never promise|cannot be guaranteed/i.test(line)) return false;
      return /\b(4\s*-\s*6\s*weeks|four to six weeks|guaranteed|proven grade|fast improvement|top-tier results|98%\s*success|success rate|routinely move up|real grade improvement|best (math|physics|chemistry|biology) tutor|number one tutor|top-rated by all)\b/i.test(
        line,
      );
    },
  },
  {
    id: "provincial-exam",
    level: "WARN",
    note: "subject-specific 'provincial exam/assessment' wording (BC has none for Physics/Chem/Pre-Calc 12)",
    test: (line) => {
      if (!/provincial\s+(exam|assessment)/i.test(line)) return false;
      // numeracy/literacy graduation assessments are real — allow them
      if (/numeracy|literacy|graduation/i.test(line)) return false;
      return true;
    },
  },
];

const files = ROOTS.flatMap((r) => {
  try { return walk(r); } catch { return []; }
});

const findings = [];
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    // ignore pure comments for claim/pricing rules to cut false positives from code notes
    const isComment = /^\s*(\/\/|\*|\/\*)/.test(line);
    for (const rule of rules) {
      if (isComment && rule.id !== "legacy-course-code") continue;
      if (rule.test(line)) {
        findings.push({ file, line: i + 1, rule, text: line.trim().slice(0, 140) });
      }
    }
  });
}

const errors = findings.filter((f) => f.rule.level === "ERROR");
const warns = findings.filter((f) => f.rule.level === "WARN");

console.log(`\nContent audit — scanned ${files.length} source files\n`);
for (const f of findings) {
  console.log(`  ${f.rule.level === "ERROR" ? "✗" : "!"} [${f.rule.id}] ${f.file}:${f.line}`);
  console.log(`      ${f.text}`);
}
console.log(`\nSummary: ${errors.length} errors, ${warns.length} warnings.`);
if (errors.length) process.exit(1);
