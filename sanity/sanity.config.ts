import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { sanityConfig } from './config';
import structure from './structure';

export default defineConfig({
  name: 'default',
  title: 'Ario Studio CMS',
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  basePath: '/studio',
  // Studio App ID for authentication
  appId: sanityConfig.studioAppId,
  plugins: [
    structureTool({
      structure,
    }),
    // visionTool can be added later if needed:
    // import { visionTool } from '@sanity/vision';
    // visionTool({ defaultApiVersion: sanityConfig.apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
