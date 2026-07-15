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
  ],
});
