import { defineField, defineType } from "sanity";
import { relatedLinksField } from "./relatedLinksField";

export const post = defineType({
  name: "post",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    // ── Authorship ──────────────────────────────────────────────────────────
    // Google's guidance is to show first-hand expertise. A named expert byline
    // only signals that honestly if the named expert has actually read the
    // article — so the byline credits Dr. Shreyank ONLY when this is ticked.
    // Until then the page and its structured data credit the organisation.
    defineField({
      name: "reviewedByExpert",
      title: "Reviewed by Dr. Shreyank",
      type: "boolean",
      initialValue: false,
      description:
        "Tick this ONLY after Dr. Shreyank has read the article and is happy to put his name to it. Until then the byline reads 'Dr. Shreyank Educare' — we don't credit a named expert for teaching he hasn't reviewed.",
    }),
    defineField({
      name: "reviewedAt",
      title: "Reviewed On",
      type: "date",
      description: "The date the review happened. Shown in the author box as 'Reviewed on …'.",
      hidden: ({ document }) => !document?.reviewedByExpert,
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A short preview of the post. If left blank, it will be generated from the body.",
    }),
    defineField({
      name: "body",
      title: "Body (Rich Text & HTML)",
      type: "array",
      description: "Write content using standard rich text blocks or add raw HTML/embed code blocks.",
      of: [
        // Display equations sit between paragraphs.
        { type: "mathBlock" },
        {
          type: "block",
          // Inline equations sit inside a sentence.
          of: [{ type: "mathInline" }],
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "object",
          name: "htmlBlock",
          title: "HTML / Code Snippet",
          fields: [
            {
              name: "html",
              type: "text",
              title: "HTML Code",
              description: "Paste raw HTML, iframes, CSS styling, embeds, or script tags here.",
              rows: 10,
            },
          ],
          preview: {
            select: {
              html: "html",
            },
            prepare({ html }) {
              return {
                title: "HTML Block",
                subtitle: html ? (html.length > 50 ? html.substring(0, 50) + "..." : html) : "Empty HTML block",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "metaData",
      title: "SEO Metadata",
      type: "metaData",
    }),
    relatedLinksField,
  ],
});
