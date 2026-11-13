import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schema';
import { ApproveAction, RejectAction } from './src/sanity/actions';

export default defineConfig({
  name: 'kiwihacks',
  title: 'KiwiHacks',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (prev, { schemaType }) => (schemaType === 'submission' ? [ApproveAction, RejectAction] : prev),
  },
});
