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
      name: "preferredContact",
      title: "Preferred Contact Method",
      type: "string",
      description:
        "How the enquirer asked to be reached. 'Both' is recorded for the older forms, which require an email and a phone number.",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "Phone", value: "phone" },
          { title: "Both", value: "both" },
        ],
      },
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
