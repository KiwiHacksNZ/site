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

export const schemaTypes = [project];
