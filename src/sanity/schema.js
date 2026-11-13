import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Showcase project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'string',
      description: 'Shown under the project name, e.g. "Team Kiwi"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Screenshot',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'event',
      title: 'Event',
      type: 'string',
      description: 'e.g. "KiwiHacks 2026"',
    }),
    defineField({
      name: 'place',
      title: 'Placing',
      type: 'string',
      description: 'e.g. "1st Place" - shown on the award pill',
    }),
    defineField({
      name: 'points',
      title: 'Points',
      type: 'number',
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repo URL',
      type: 'url',
    }),
    defineField({
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured projects fill the carousel at the top (max 3).',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first in the grid.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'team', media: 'image' },
  },
});

export const HACKATHON_CATEGORIES = [
  { title: "KiwiHacks event", value: "kiwihacks" },
  { title: "Community hackathon", value: "community-hackathon" },
  { title: "Community event", value: "community-event" },
];

export const HACKATHON_FORMATS = [
  { title: "In person", value: "in-person" },
  { title: "Hybrid", value: "hybrid" },
  { title: "Online", value: "online" },
];

export const hackathon = defineType({
  name: "hackathon",
  title: "Hackathon listing",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Event name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: HACKATHON_CATEGORIES, layout: "radio" },
      initialValue: "community-hackathon",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
      description:
        "Last day of the event. Leave empty for a one-day event. The listing disappears from the site the day after this date (NZ time).",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = context.document?.startDate;
          if (endDate && startDate && endDate < startDate) {
            return "End date can't be before the start date";
          }
          return true;
        }),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: { list: HACKATHON_FORMATS, layout: "radio", direction: "horizontal" },
      initialValue: "in-person",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "City",
      type: "string",
      description: 'e.g. "Auckland". Not shown for online events.',
      hidden: ({ document }) => document?.format === "online",
      validation: (rule) =>
        rule.custom((location, context) =>
          context.document?.format === "online" || location
            ? true
            : "Add a city, or set the format to Online",
        ),
    }),
    defineField({
      name: "url",
      title: "Event website",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Optional. Square, ideally on a transparent background.",
    }),
    defineField({
      name: "banner",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional. Fills the card behind the name, darkened so the text stays readable. Landscape works best.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured listings get a big banner at the top of the page.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Start date",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", startDate: "startDate", category: "category", media: "logo" },
    prepare({ title, startDate, category, media }) {
      const label = HACKATHON_CATEGORIES.find((c) => c.value === category)?.title;
      return { title, subtitle: [startDate, label].filter(Boolean).join(" - "), media };
    },
  },
});

export const schemaTypes = [project, hackathon];
