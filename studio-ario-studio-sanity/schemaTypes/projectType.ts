import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description: 'Short description for listings',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Full Content',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'thumbnailImage',
      type: 'image',
      title: 'Thumbnail Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          {title: 'Fintech', value: 'fintech'},
          {title: 'Artificial Intelligence', value: 'ai'},
          {title: 'Automotive', value: 'automotive'},
          {title: 'Real Estate', value: 'real-estate'},
          {title: 'E-commerce', value: 'ecommerce'},
          {title: 'Healthcare', value: 'healthcare'},
          {title: 'Education', value: 'education'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'client',
      type: 'string',
      title: 'Client Name',
    }),
    defineField({
      name: 'year',
      type: 'string',
      title: 'Year',
    }),
    defineField({
      name: 'services',
      type: 'array',
      title: 'Services',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'challenge',
      type: 'text',
      title: 'Challenge',
    }),
    defineField({
      name: 'solution',
      type: 'text',
      title: 'Solution',
    }),
    defineField({
      name: 'results',
      type: 'text',
      title: 'Results',
    }),
    defineField({
      name: 'gradient',
      type: 'string',
      title: 'Gradient Color',
      description: 'CSS gradient or color class (e.g., bg-accent-purple)',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Gallery Images',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'approachVisuals',
      type: 'array',
      title: 'Approach Visuals',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'id', type: 'string', title: 'ID'},
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'imageUrl', type: 'url', title: 'Image URL'},
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Show this project on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Display order (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})

