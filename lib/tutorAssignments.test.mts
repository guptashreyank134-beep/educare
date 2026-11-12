import assert from "node:assert/strict";
import test from "node:test";

import { tutorIdsForContext } from "../data/tutorAssignments.ts";

test("assigns only verified subject tutors", () => {
  assert.deepEqual(tutorIdsForContext("Online Medical Tutoring"), [6, 8]);
  assert.deepEqual(tutorIdsForContext("English and ESL Grades 1–10"), [9]);
  assert.deepEqual(tutorIdsForContext("Math Tutor Vancouver"), [0, 9]);
  assert.deepEqual(tutorIdsForContext("University Biology"), [0, 4]);
  assert.deepEqual(tutorIdsForContext("French tutoring"), []);
});
