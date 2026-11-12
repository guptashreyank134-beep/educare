import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArrowRight } from "lucide-react";
import { Button, ButtonLink } from "./Button.tsx";

test("navigation CTA renders one named anchor instead of nested interactive controls", () => {
  const html = renderToStaticMarkup(createElement(ButtonLink, {
    href: "/book", iconRight: ArrowRight, className: "w-full",
  }, "Book a consultation"));
  assert.equal((html.match(/<a\b/g) || []).length, 1);
  assert.doesNotMatch(html, /<button\b/);
  assert.match(html, /href="\/book"/);
  assert.match(html, /Book a consultation/);
  assert.match(html, /focus:ring-2/);
  assert.match(html, /w-full/);
  assert.match(html, /aria-hidden="true"/);
});

test("form actions retain button semantics and disabled submit behavior", () => {
  const html = renderToStaticMarkup(createElement(Button, {
    type: "submit", disabled: true,
  }, "Sending enquiry"));
  assert.match(html, /<button\b/);
  assert.match(html, /type="submit"/);
  assert.match(html, /disabled=""/);
  assert.doesNotMatch(html, /<a\b/);
});
