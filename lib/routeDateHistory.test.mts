import assert from "node:assert/strict";
import test from "node:test";
import { routeEntryFingerprints, routeDatesFromSnapshots } from "../scripts/route-date-history.mts";

const initial = 'export const pages = [{ slug: "math", h1: "Math help", body: ["Original explanation"] }, { slug: "physics", h1: "Physics help" }];';
const snapshot = (date: string, source: string) => ({ date, entries: routeEntryFingerprints(source, "pages") });
const created = "2026-09-01T10:00:00Z";
const edited = "2026-09-02T10:00:00Z";
const formatted = "2026-09-03T10:00:00Z";

test("editing an existing entry body updates only that page's commit-derived date", () => {
  const revised = initial.replace("Original explanation", "Revised explanation");
  const dates = routeDatesFromSnapshots([snapshot(edited, revised), snapshot(created, initial)], ["math", "physics"]);
  assert.equal(dates.get("math"), edited);
  assert.equal(dates.get("physics"), created);
});

test("heading edits count while comments, whitespace, quote style and trailing commas do not", () => {
  const revised = initial.replace("Math help", "Mathematics tutoring");
  const reformatted = `// formatting only
    export const pages = [
      {slug: 'math', h1: 'Mathematics tutoring', body: ['Original explanation',],},
      {slug: 'physics', h1: 'Physics help',},
    ] as const;`;
  const dates = routeDatesFromSnapshots([snapshot(formatted, reformatted), snapshot(edited, revised), snapshot(created, initial)], ["math", "physics"]);
  assert.equal(dates.get("math"), edited);
  assert.equal(dates.get("physics"), created);
});

test("shared local copy constants update only entries that reference them", () => {
  const before = 'const CTA = {label: "Ask about lessons", href: "/book"}; export const pages = [{slug:"math", related:[CTA]}, {slug:"physics", h1:"Physics"}];';
  const after = before.replace("Ask about lessons", "Book an assessment");
  const dates = routeDatesFromSnapshots([snapshot(edited, after), snapshot(created, before)], ["math", "physics"]);
  assert.equal(dates.get("math"), edited);
  assert.equal(dates.get("physics"), created);
});

test("a real bulk edit keeps one truthful commit date for all changed entries", () => {
  const revised = initial.replaceAll("help", "tutoring");
  const dates = routeDatesFromSnapshots([snapshot(edited, revised), snapshot(created, initial)], ["math", "physics"]);
  assert.deepEqual([...dates.values()], [edited, edited]);
});

test("new entries use their introduction commit and unknown entries get no fabricated date", () => {
  const earlier = 'export const pages = [{slug:"math",h1:"Math help",body:["Original explanation"]}];';
  const dates = routeDatesFromSnapshots([snapshot(edited, initial), snapshot(created, earlier)], ["math", "physics", "unknown"]);
  assert.equal(dates.get("math"), created);
  assert.equal(dates.get("physics"), edited);
  assert.equal(dates.has("unknown"), false);
});

test("the selected route array controls extraction, including a separate Vancouver source", () => {
  const source = 'const unrelated = [{slug:"other",h1:"Other"}]; export const vancouverSeoPages = [{slug:"english-tutor-vancouver",h1:"English and ESL"}];';
  const entries = routeEntryFingerprints(source, "vancouverSeoPages");
  assert.deepEqual([...entries.keys()], ["english-tutor-vancouver"]);
  assert.throws(() => routeEntryFingerprints(source, "pages"), /Cannot find/);
});

test("template text changes count and deleted entries do not borrow old dates", () => {
  const before = 'const PLACE = "Burnaby"; export const pages = [{slug:"math", h1:`Math in ${PLACE}`}];';
  const after = before.replace("Math in", "Math tutoring in");
  assert.notEqual(routeEntryFingerprints(before, "pages").get("math"), routeEntryFingerprints(after, "pages").get("math"));
  const dates = routeDatesFromSnapshots([snapshot(edited, "export const pages = [];"), snapshot(created, before)], ["math"]);
  assert.equal(dates.has("math"), false);
});
