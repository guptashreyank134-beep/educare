import { defineField } from "sanity";

/**
 * Shared "Extra Related Links" field — an editable list of internal links shown
 * in a "Related" block at the bottom of a page. Reused across programPage,
 * pageFaq (landing pages), post (blog), resourcePage and vancouverPage (home).
 */
export const relatedLinksField = defineField({
  name: "relatedLinks",
  title: "Extra Related Links",
  type: "array",
  description:
    "Optional internal links shown in a 'Related' block at the bottom of the page.",
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
});
