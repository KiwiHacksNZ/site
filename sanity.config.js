import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes, submissionSchemaTypes } from './src/sanity/schema';
import { ApproveAction, RejectAction, PUBLIC_DATASET } from './src/sanity/actions';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;

export default defineConfig([
  {
    name: 'kiwihacks',
    title: 'KiwiHacks',
    basePath: '/studio',
    projectId,
    dataset: PUBLIC_DATASET,
    plugins: [structureTool()],
    schema: { types: schemaTypes },
  },
  {
    name: 'submissions',
    title: 'Event submissions',
    basePath: '/studio/submissions',
    projectId,
    dataset: import.meta.env.PUBLIC_SANITY_SUBMISSIONS_DATASET || 'submissions',
    plugins: [structureTool()],
    schema: { types: submissionSchemaTypes },
    document: { actions: [ApproveAction, RejectAction] },
  },
]);
