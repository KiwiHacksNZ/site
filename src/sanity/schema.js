import { defineArrayMember, defineField, defineType } from 'sanity';
import { NZ_REGIONS, STORY_TAGS } from './storyOptions';

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

// Alt text is required whenever an image has actually been uploaded.
const altText = defineField({
  name: 'alt',
  title: 'Alt text',
  type: 'string',
  description: 'Describe the image for people using screen readers.',
  validation: (rule) =>
    rule.custom((alt, context) =>
      context.parent?.asset && !alt?.trim() ? 'Add alt text for this image.' : true,
    ),
});

export const story = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: "State the person's angle, e.g. \"Aroha built a rain gauge for her marae\"",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "The end of the story's web address. Generate it from the title.",
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on the story card. Name what they built.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      description: 'Set a future date to schedule the story. It stays off the site until then.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Pick one to three.',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: STORY_TAGS },
      validation: (rule) => rule.required().min(1).max(3).unique(),
    }),
    defineField({
      name: 'school',
      title: 'School',
      type: 'string',
      description: 'Optional. For a team, you can name several schools.',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description:
        "Optional. The region of the person's school, or for a multi-person story, where they competed.",
      options: { list: NZ_REGIONS },
      validation: (rule) =>
        rule.custom((region) =>
          !region || NZ_REGIONS.includes(region) ? true : 'Pick a region from the list.',
        ),
    }),
    defineField({
      name: 'yearLevel',
      title: 'Year level',
      type: 'number',
      description: 'Optional, 9 to 13. Leave blank for a multi-person story.',
      validation: (rule) => rule.integer().min(9).max(13),
    }),
    defineField({
      name: 'signOff',
      title: 'Sign-off recorded',
      type: 'boolean',
      description:
        "Tick only once the student's sign-off, and their guardian's where needed, is recorded. A story can't be published without it.",
      initialValue: false,
      validation: (rule) =>
        rule.custom((signOff) =>
          signOff === true ? true : 'Record the sign-off before publishing this story.',
        ),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      description: 'Optional. Cards without one show text only.',
      options: { hotspot: true },
      fields: [
        altText,
        defineField({
          name: 'creditLine',
          title: 'Credit',
          type: 'string',
          description: 'Optional, e.g. "Photo: Fernvale College"',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullets', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            altText,
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Published date, newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary', media: 'coverImage' },
  },
});

export const schemaTypes = [project, story];
