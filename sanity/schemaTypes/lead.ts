import { defineField, defineType } from "sanity";

export const lead = defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    defineField({
      name: "vertical",
      title: "Vertical",
      type: "string",
      description: "Which tutoring vertical this lead came from",
      options: {
        list: [
          { title: "Local (K-12)", value: "local-k12" },
          { title: "Medical", value: "medical" },
          { title: "Quant", value: "quant" },
        ],
        layout: "radio",
      },
      initialValue: "local-k12",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Subject / Interest",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
