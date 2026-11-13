import { EVENT_TYPES, FORMATS } from '../Events/options.js';
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
const altText = [defineField({ name: 'alt', title: 'Alt text', type: 'string' })];

const eventFields = [
  defineField({ name: 'title', title: 'Event name', type: 'string', validation: required }),
  defineField({ name: 'eventType', title: 'Type of event', type: 'string', options: { list: EVENT_TYPES } }),
  defineField({ name: 'format', title: 'Format', type: 'string', options: { list: FORMATS }, validation: required }),
  defineField({ name: 'city', title: 'Where', type: 'string', validation: required }),
  defineField({ name: 'startsAt', title: 'Starts', type: 'datetime', validation: required }),
  defineField({ name: 'endsAt', title: 'Ends', type: 'datetime', validation: required }),
  defineField({ name: 'venue', title: 'Venue address', type: 'string', description: 'Blank for online events.' }),
  defineField({ name: 'audience', title: 'Who can come', type: 'string', validation: required }),
  defineField({ name: 'cost', title: 'Cost to attend', type: 'string', validation: required }),
  defineField({ name: 'signupUrl', title: 'Sign-up link', type: 'url' }),
  defineField({ name: 'websiteUrl', title: 'Website', type: 'url' }),
  defineField({ name: 'summary', title: 'One-line summary', type: 'string', validation: (rule) => rule.required().max(140) }),
  defineField({ name: 'about', title: 'About the event', type: 'text', rows: 10, validation: required }),
  defineField({ name: 'headerImage', title: 'Header image', type: 'image', options: { hotspot: true }, fields: altText, validation: required }),
  defineField({
    name: 'photos',
    title: 'Photos from past events',
    type: 'array',
    of: [{ type: 'image', fields: altText }],
    validation: (rule) => rule.max(6),
  }),
  defineField({ name: 'organiser', title: 'Organisation or group', type: 'string', validation: required }),
  defineField({ name: 'logo', title: 'Logo', type: 'image', description: 'Square. Shown on the event card.' }),
];

const eventPreview = { select: { title: 'title', subtitle: 'organiser', media: 'headerImage' } };

export const communityEvent = defineType({
  name: 'communityEvent',
  title: 'Community event',
  type: 'document',
  fields: [
    eventFields[0],
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: required }),
    ...eventFields.slice(1),
  ],
  orderings: [{ title: 'Start date', name: 'startsAtAsc', by: [{ field: 'startsAt', direction: 'asc' }] }],
  preview: eventPreview,
});

// Created by the submit API with a `submission.` ID, which keeps it out of
// the public API. Approving one copies the public fields into a
// communityEvent (see actions.js).
export const submission = defineType({
  name: 'submission',
  title: 'Event submission',
  type: 'document',
  fields: [
    ...eventFields,
    defineField({ name: 'name', title: "Submitter's name", type: 'string' }),
    defineField({ name: 'email', title: "Submitter's email", type: 'string' }),
    defineField({ name: 'confirmAges', title: 'Confirmed ages 13 to 18 can attend', type: 'boolean', readOnly: true }),
    defineField({ name: 'confirmAdult', title: 'Confirmed an adult is responsible', type: 'boolean', readOnly: true }),
    defineField({ name: 'confirmReview', title: 'Understood KiwiHacks does not run the event', type: 'boolean', readOnly: true }),
    defineField({ name: 'agreedAt', title: 'Agreed at', type: 'datetime', readOnly: true }),
    defineField({ name: 'ipHash', title: 'IP hash', type: 'string', hidden: true }),
  ],
  orderings: [{ title: 'Newest first', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] }],
  preview: eventPreview,
});

export const schemaTypes = [project, communityEvent, submission];
