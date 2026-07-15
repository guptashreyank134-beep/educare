import { defineField, defineType } from "sanity";

/**
 * FAQs for a landing page (city / vertical / SEO page), keyed by the page slug.
 *
 * These FAQs used to be hardcoded in data/*.ts, which meant editors could not
 * change them and answers could not contain links. Each document here overrides
 * the code-defined FAQs for the matching slug; if no document exists (or it has
 * no FAQs), the page falls back to its original hardcoded list, so a page can
 * never end up with an empty FAQ section.
 *
 * Answers use the shared `faqAnswer` rich-text type, so they support hyperlinks
 * (internal like /contact, or external), bold/italic and lists.
 */
export const pageFaq = defineType({
  name: "pageFaq",
  title: "Page FAQs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page",
      type: "string",
      description: "Human-friendly page name, for finding this in the list.",
    }),
    defineField({
      name: "pageSlug",
      title: "Page Slug",
      type: "string",
      description:
        "The page's URL slug WITHOUT a leading slash — e.g. math-tutor-burnaby. This is what links these FAQs to the page; changing it will point them at a different page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      options: {
        list: [
          { title: "City page", value: "city" },
          { title: "University / Medical vertical", value: "vertical" },
          { title: "SEO landing page", value: "seo" },
        ],
      },
      readOnly: true,
      description: "Set automatically — for grouping only.",
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
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "pageSlug" },
  },
});
