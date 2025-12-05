import {defineField, defineType} from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      type: 'string',
      title: 'Title (English)',
      description: 'English version of the title',
    }),
    defineField({
      name: 'titleFa',
      type: 'string',
      title: 'Title (Farsi)',
      description: 'Farsi version of the title',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    }),
    defineField({
      name: 'subtitleEn',
      type: 'string',
      title: 'Subtitle (English)',
    }),
    defineField({
      name: 'subtitleFa',
      type: 'string',
      title: 'Subtitle (Farsi)',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      type: 'text',
      title: 'Description (English)',
    }),
    defineField({
      name: 'descriptionFa',
      type: 'text',
      title: 'Description (Farsi)',
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color Class',
      description: 'Tailwind CSS color class (e.g., bg-accent-purple, bg-accent-blue)',
      options: {
        list: [
          {title: 'Purple', value: 'bg-accent-purple'},
          {title: 'Blue', value: 'bg-accent-blue'},
          {title: 'Pink', value: 'bg-pink-500'},
          {title: 'Green', value: 'bg-green-500'},
          {title: 'Orange', value: 'bg-orange-500'},
        ],
      },
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first',
      validation: (rule) => rule.required(),
      initialValue: 0,
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon Name',
      description: 'Icon identifier (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})

