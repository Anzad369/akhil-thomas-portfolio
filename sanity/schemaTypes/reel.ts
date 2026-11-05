import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const reel = defineType({
  name: 'reel',
  title: 'Reel',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'reel' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: { accept: 'video/*' },
    }),
  ],
})