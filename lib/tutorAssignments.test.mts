import assert from "node:assert/strict";
import test from "node:test";

import { tutorIdsForContext } from "../data/tutorAssignments.ts";
import { founderTeaches } from "../data/authors.ts";

test("assigns only verified subject tutors", () => {
  assert.deepEqual(tutorIdsForContext("Online Medical Tutoring"), [6, 8]);
  assert.deepEqual(tutorIdsForContext("English and ESL Grades 1–10"), [9]);
  assert.deepEqual(tutorIdsForContext("Math Tutor Vancouver"), [0, 9]);
  assert.deepEqual(tutorIdsForContext("University Biology"), [0, 4]);
  assert.deepEqual(tutorIdsForContext("French tutoring"), []);
});

test("school tutor matches respect complete grade numbers and advanced levels", () => {
  assert.deepEqual(tutorIdsForContext("Grade 10 Science Tutor Vancouver"), [9]);
  assert.deepEqual(tutorIdsForContext("Science for Grades 1–10"), [9]);
  assert.deepEqual(tutorIdsForContext("Grade 11 Science Tutor Vancouver"), [0]);
  assert.deepEqual(tutorIdsForContext("Science for Grades 9–12"), [0]);
  assert.deepEqual(tutorIdsForContext("University Math Tutor Vancouver"), [0]);
  assert.deepEqual(tutorIdsForContext("University English Tutor Vancouver"), []);
  assert.deepEqual(tutorIdsForContext("English Grades 11–12"), []);
  assert.deepEqual(tutorIdsForContext("Adult ESL"), []);
});

test("computer science does not match general Vancouver school science", () => {
  assert.deepEqual(tutorIdsForContext("Computer Science Tutor Vancouver"), [0]);
  assert.deepEqual(tutorIdsForContext("computer-science-tutor-vancouver"), [0]);
  assert.deepEqual(tutorIdsForContext("Grade 10 Computer Science"), [0]);
});

test("mixed hubs and supported specialist pages keep relevant profiles", () => {
  assert.deepEqual(tutorIdsForContext("Tutoring in Vancouver for Math, Science, English and Coding"), [0, 9]);
  assert.deepEqual(tutorIdsForContext("English Tutoring Vancouver"), [9]);
  assert.deepEqual(tutorIdsForContext("Differential Equations Tutor Online Canada"), [0]);
  assert.deepEqual(tutorIdsForContext("First-Year Engineering Tutor"), [1]);
  assert.deepEqual(tutorIdsForContext("IB & AP"), [0]);
});

test("founder teaching credit agrees with specialist assignments", () => {
  for (const context of ["Medical Sciences Tutor", "Actuarial Science", "Health Sciences", "Mechanical Engineering", "English Grades 1–10", "French Tutoring"]) {
    assert.equal(founderTeaches(context), false, context);
    assert.ok(!tutorIdsForContext(context).includes(0), context);
  }
  for (const context of ["University Physics", "IB Chemistry", "Math Tutor Vancouver", "Computer Science"]) {
    assert.equal(founderTeaches(context), true, context);
  }
});
