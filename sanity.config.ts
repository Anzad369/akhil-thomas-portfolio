import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { reelType } from './sanity/schemaTypes/reel'

export default defineConfig({
  name: 'default',
  title: 'Reels Portfolio Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [reelType],
  },
})