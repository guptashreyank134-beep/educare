import { defineField, defineType } from "sanity";

/**
 * LaTeX maths for blog articles, rendered with KaTeX.
 *
 * Two types, because maths appears two ways in prose:
 *  - `mathBlock`  — a display equation on its own line, centred.
 *  - `mathInline` — a symbol or expression inside a sentence.
 *
 * Write plain LaTeX WITHOUT delimiters: `x^2 + 1`, not `$x^2 + 1$`.
 */

export const mathBlock = defineType({
  name: "mathBlock",
  title: "Equation (display)",
  type: "object",
  fields: [
    defineField({
      name: "latex",
      title: "LaTeX",
      type: "text",
      rows: 3,
      description:
        "LaTeX without delimiters — e.g. \\log_2(x) + \\log_2(x-2) = 3. Rendered centred on its own line.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { latex: "latex" },
    prepare: ({ latex }) => ({ title: latex || "(empty equation)", subtitle: "Display equation" }),
  },
});

export const mathInline = defineType({
  name: "mathInline",
  title: "Equation (inline)",
  type: "object",
  fields: [
    defineField({
      name: "latex",
      title: "LaTeX",
      type: "string",
      description: "LaTeX without delimiters — e.g. \\sin x. Rendered inside the sentence.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { latex: "latex" },
    prepare: ({ latex }) => ({ title: latex || "(empty)", subtitle: "Inline equation" }),
  },
});
