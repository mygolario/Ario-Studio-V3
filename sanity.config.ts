'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'

// Hardcode values for standalone Studio deployment (these are public values)
const SANITY_PROJECT_ID = 'v3ydinkq'
const SANITY_DATASET = 'production'

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || SANITY_PROJECT_ID,
  dataset: dataset || SANITY_DATASET,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: apiVersion,
      defaultDataset: dataset || SANITY_DATASET,
      defaultQuery: '*[_type == "homePage"][0]',
    }),
  ],
})
