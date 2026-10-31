import assert from "node:assert/strict";
import test from "node:test";

import { validateStudyClubInterest } from "./studyClubInterest.ts";

const valid = {
  parentName: "Priya Sharma",
  grade: "Grade 9",
  subjectNeed: "Both",
  weekdays: ["Monday", "Wednesday"],
  timeWindow: "5–7 pm",
  learningGoal: "Build a regular homework routine.",
  consent: true,
};

test("study-club interest accepts the opening grades and another-grade enquiries", () => {
  assert.equal(validateStudyClubInterest(valid), null);
  assert.equal(validateStudyClubInterest({ ...valid, grade: "Another grade" }), null);
});

test("study-club interest requires consent and a real weekday selection", () => {
  assert.match(validateStudyClubInterest({ ...valid, consent: false }) ?? "", /consent/i);
  assert.match(validateStudyClubInterest({ ...valid, weekdays: [] }) ?? "", /weekday/i);
  assert.match(validateStudyClubInterest({ ...valid, weekdays: ["Someday"] }) ?? "", /weekday/i);
});

test("study-club interest enforces the public form limits", () => {
  assert.match(validateStudyClubInterest({ ...valid, parentName: "x".repeat(101) }) ?? "", /name/i);
  assert.match(validateStudyClubInterest({ ...valid, learningGoal: "x".repeat(501) }) ?? "", /500/i);
  assert.match(validateStudyClubInterest({ ...valid, subjectNeed: "History" }) ?? "", /subject/i);
});
