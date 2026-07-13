import { defineType } from "sanity";

// Reusable rich-text field for FAQ answers.
// Supports paragraphs, bullet/numbered lists, bold/italic and hyperlinks
// (internal like /contact or external like https://...), mirroring the blog body.
export const faqAnswer = defineType({
  name: "faqAnswer",
  title: "Answer",
  type: "array",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                description:
                  "Internal (e.g. /contact) or external (e.g. https://example.com) link.",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              },
            ],
          },
        ],
      },
    },
  ],
});
