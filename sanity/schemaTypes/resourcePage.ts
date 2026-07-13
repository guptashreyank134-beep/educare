import { defineField, defineType } from "sanity";

export const resourcePage = defineType({
  name: "resourcePage",
  title: "Resource Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Resources",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      initialValue: { current: "resources" },
    }),
    defineField({
      name: "metaData",
      title: "SEO Metadata",
      type: "metaData",
    }),

    // FAQs Section
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question" },
            { name: "answer", type: "faqAnswer", title: "Answer" },
          ],
        },
      ],
    }),

    // Videos Section
    defineField({
      name: "videosSection",
      title: "Demo Videos Section",
      type: "object",
      fields: [
        { name: "heading", type: "string" },
        { name: "description", type: "text" },
        { name: "image", type: "image", options: { hotspot: true } },
        {
          name: "learningPoints",
          type: "object",
          fields: [
            { name: "heading", type: "string" },
            { name: "pointers", type: "array", of: [{ type: "string" }] },
          ],
        },
        {
          name: "categories",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "description", type: "text" },
              ],
            },
          ],
        },
      ],
    }),

    // Practice Material Section
    defineField({
      name: "practiceMaterialSection",
      title: "Practice Material Section",
      type: "object",
      fields: [
        { name: "heading", type: "string" },
        { name: "description", type: "text" },
        { name: "image", type: "image", options: { hotspot: true } },
        {
          name: "downloadMaterials",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", type: "string" },
                { name: "file", type: "file", title: "Upload File (Optional)" },
                { name: "externalLink", type: "url", title: "External Link (Optional)" },
              ],
            },
          ],
        },
        {
          name: "studyTips",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "description", type: "text" },
              ],
            },
          ],
        },
        {
          name: "whyPracticeHelp",
          type: "object",
          fields: [
            { name: "heading", type: "string" },
            { name: "icon", type: "string", description: "Icon name (e.g. lightbulb)" },
            { name: "pointers", type: "array", of: [{ type: "string" }] },
          ],
        },
      ],
    }),

    // Practice Tests Section
    defineField({
      name: "practiceTestsSection",
      title: "Practice Tests Section",
      type: "object",
      fields: [
        { name: "mainHeading", type: "string" },
        { name: "mainDescription", type: "text" },
        { name: "image", type: "image", options: { hotspot: true } },
        { name: "testHeading", type: "string" },
        { name: "testDescription", type: "text" },
        {
          name: "leftSections",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "heading", type: "string" },
                { name: "description", type: "text" },
                { name: "points", type: "array", of: [{ type: "string" }] },
              ],
            },
          ],
        },
        {
          name: "practiceTests",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", type: "string" },
                { name: "link", type: "url" },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
