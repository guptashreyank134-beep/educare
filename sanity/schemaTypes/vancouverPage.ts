import { defineField, defineType } from "sanity";

export const vancouverPage = defineType({
  name: "vancouverPage",
  // Studio label: this document drives the HOMEPAGE (its FAQs + SEO meta).
  // The legacy "Vancouver Page" name made it undiscoverable for editors.
  title: "Homepage (FAQs & SEO)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "Vancouver Math Tutor Page",
      description: "For internal reference only",
    }),
    defineField({
      name: "metaData",
      title: "Page Meta Data",
      type: "metaData",
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
  ],
});
