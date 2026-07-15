import { defineField, defineType } from "sanity";

/**
 * Editable content for a landing page (city / vertical / SEO page), keyed by
 * the page slug.
 *
 * This content used to be hardcoded in data/*.ts, so editors could not change
 * it. Each field here OVERRIDES the code-defined value for the matching slug;
 * anything left empty falls back to the original code content, so a page can
 * never render blank. That fallback also means this document only needs to hold
 * what you actually want to change.
 *
 * NOTE ON THE NAME: the schema is still called `pageFaq` because it originally
 * held only FAQs, and 122 documents already exist under that name — renaming
 * the type would mean recreating every document and risking edits made in the
 * Studio. The name is internal; editors see "Landing Pages".
 *
 * Structural fields (neighbourhoods, schools served, regions, related links,
 * lead-form copy) deliberately stay in code — they drive layout/schema markup
 * rather than prose.
 */
export const pageFaq = defineType({
  name: "pageFaq",
  title: "Landing Pages",
  type: "document",
  groups: [
    { name: "seo", title: "SEO", default: true },
    { name: "content", title: "Page Content" },
    { name: "faqs", title: "FAQs" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page",
      type: "string",
      group: "seo",
      description: "Human-friendly page name, for finding this in the list.",
    }),
    defineField({
      name: "pageSlug",
      title: "Page Slug",
      type: "string",
      group: "seo",
      description:
        "The page's URL slug WITHOUT a leading slash — e.g. math-tutor-burnaby. This links the content to the page; changing it will point it at a different page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      group: "seo",
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

    // ── SEO ──
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
      description:
        "Title shown in Google results. Aim for ≤ 60 characters. Leave empty to keep the current built-in title.",
      validation: (Rule) => Rule.max(70).warning("Titles over ~60 characters get truncated in search results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Description shown in Google results. Aim for 150–160 characters. Leave empty to keep the current built-in description.",
      validation: (Rule) => Rule.max(200).warning("Descriptions over ~160 characters get truncated."),
    }),

    // ── Page content ──
    defineField({
      name: "heading",
      title: "Main Heading (H1)",
      type: "string",
      group: "content",
      description: "The big heading at the top of the page. Leave empty to keep the current one.",
    }),
    defineField({
      name: "heroSubheading",
      title: "Sub-heading",
      type: "text",
      rows: 2,
      group: "content",
      description: "The supporting sentence under the main heading.",
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "content",
      description: "Opening paragraphs. Leave empty to keep the current ones.",
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Section Heading", type: "string" },
            {
              name: "body",
              title: "Paragraphs",
              type: "array",
              of: [{ type: "text", rows: 3 }],
            },
            {
              name: "points",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: { select: { title: "heading" } },
        },
      ],
      description: "Leave empty to keep the current sections.",
    }),

    // ── FAQs ──
    defineField({
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      group: "faqs",
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
