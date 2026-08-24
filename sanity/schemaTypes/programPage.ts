import { defineField, defineType } from "sanity";

export const programPage = defineType({
  name: "programPage",
  title: "Program Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "metaData",
      title: "SEO Metadata",
      type: "metaData",
    }),
    // These FAQs already existed in the content but were never declared here,
    // which is why Studio reported "Unknown field found" — and because nothing
    // rendered them, the answers never appeared on the site.
    defineField({
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      description:
        "Shown at the bottom of the program page and submitted to Google as FAQ structured data. Answers support hyperlinks.",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "faqAnswer" },
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
    defineField({
      name: "bodyContent",
      title: "Body Content (rich text)",
      type: "faqAnswer",
      description: "Optional rich text with inline links, rendered in the page content (before the FAQ). Supports paragraphs, lists, bold and hyperlinks.",
    }),

    defineField({
      name: "relatedLinks",
      title: "Extra Related Links",
      type: "array",
      description:
        "Optional. Added to the auto-generated 'Related Tutoring Pages' block at the bottom of the page. The automatic cluster links always show; these append (duplicates are removed).",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            {
              name: "href",
              title: "URL / Path",
              type: "string",
              description: "Internal path (e.g. /programs/physics) or full URL.",
            },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
  ],
});
