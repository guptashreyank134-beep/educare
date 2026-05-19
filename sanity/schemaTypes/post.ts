import { defineField, defineType } from "sanity";

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
        {
          type: "block",
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
  ],
});
