import { defineType, defineField } from 'sanity'

export const reelType = defineType({
  name: 'reel',
  title: 'Reels',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project / Client Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category (e.g., Commercial, Music Video, Travel)',
      type: 'string',
    }),
    defineField({
      name: 'videoFile',
      title: 'Upload Video File (MP4)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/quicktime',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})