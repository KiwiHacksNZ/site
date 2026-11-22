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

const required = (rule) => rule.required();

// Fields both event types share. Each card on /events links out to `url`,
// where the full details live (e.g. the event's own site).
const eventFields = [
  defineField({ name: 'title', title: 'Event name', type: 'string', validation: required }),
  defineField({
    name: 'summary',
    title: 'One-line summary',
    type: 'string',
    validation: (rule) => rule.required().max(140),
  }),
  defineField({ name: 'city', title: 'Where', type: 'string', description: 'e.g. "Wellington" or "Online"', validation: required }),
  defineField({ name: 'startsAt', title: 'Starts', type: 'datetime', validation: required }),
  defineField({ name: 'endsAt', title: 'Ends', type: 'datetime', validation: required }),
  defineField({
    name: 'url',
    title: 'Event link',
    type: 'url',
    description: 'Where the full details live. Can be a page on this site, e.g. /showcase.',
    validation: (rule) => rule.required().uri({ allowRelative: true }),
  }),
  defineField({
    name: 'image',
    title: 'Card image',
    type: 'image',
    options: { hotspot: true },
    fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    validation: required,
  }),
];

const byStart = [{ title: 'Start date', name: 'startsAtDesc', by: [{ field: 'startsAt', direction: 'desc' }] }];

// Events KiwiHacks runs. Shown under "What's on" until they end, then under
// "Past events".
export const event = defineType({
  name: 'event',
  title: 'KiwiHacks event',
  type: 'document',
  fields: eventFields,
  orderings: byStart,
  preview: { select: { title: 'title', subtitle: 'city', media: 'image' } },
});

// Events other groups run. Organisers request a listing through the Fillout
// form (/submit-event) and the team adds it here. Hidden once it ends.
export const communityEvent = defineType({
  name: 'communityEvent',
  title: 'Community event',
  type: 'document',
  fields: [
    ...eventFields.slice(0, 1),
    defineField({ name: 'organiser', title: 'Run by', type: 'string', validation: required }),
    ...eventFields.slice(1),
    defineField({ name: 'cost', title: 'Cost', type: 'string', description: 'e.g. "Free" or "$20"' }),
    defineField({ name: 'logo', title: 'Organiser logo', type: 'image', description: 'Optional. Square.' }),
  ],
  orderings: byStart,
  preview: { select: { title: 'title', subtitle: 'organiser', media: 'image' } },
});

export const schemaTypes = [project, event, communityEvent];
