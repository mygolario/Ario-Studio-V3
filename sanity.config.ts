import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

// Hardcoded to ensure correct targeting
const projectId = 'v3ydinkq'
const dataset = 'production'

export default defineConfig({
  name: 'default',
  title: 'Ario Studio',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
