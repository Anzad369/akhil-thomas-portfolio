import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { reel } from './sanity/schemaTypes/reel'

export default defineConfig({
  name: 'default',
  title: 'Reels Portfolio Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'reel',
              title: 'Reels (Drag & Drop)',
              S,
              context,
            }),
          ]),
    }),
  ],
  schema: {
    types: [reel],
  },
})