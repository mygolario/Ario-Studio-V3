import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'titleFa',
      title: 'Title (FA)',
      type: 'string',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (EN)',
      type: 'text',
    }),
    defineField({
      name: 'descriptionFa',
      title: 'Description (FA)',
      type: 'text',
    }),
  ],
})
