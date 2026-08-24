import { defineField, defineType } from "sanity";
import { relatedLinksField } from "./relatedLinksField";

export const vancouverPage = defineType({
  name: "vancouverPage",
  // Studio label: this document holds the HOMEPAGE's FAQs. The legacy
  // "Vancouver Page" name made it undiscoverable for editors.
  // NOTE: the homepage's SEO title/description live on the "Home" document
  // under Pages — the same place every other page keeps its SEO. This document
  // deliberately has no SEO panel so there is only ONE place to edit it.
  title: "Homepage FAQs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "Homepage",
      description: "For internal reference only",
    }),
    defineField({
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "faqAnswer" },
          ],
        },
      ],
    }),
    relatedLinksField,
  ],
});
