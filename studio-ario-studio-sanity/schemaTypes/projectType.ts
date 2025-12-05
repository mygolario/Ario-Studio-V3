import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title.en'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'localeText',
      title: 'Excerpt',
      description: 'Short description for listings',
    }),
    defineField({
      name: 'description',
      type: 'localeText',
      title: 'Description',
    }),
    defineField({
      name: 'content',
      type: 'localeBlockContent',
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
      type: 'localeText',
      title: 'Challenge',
    }),
    defineField({
      name: 'solution',
      type: 'localeText',
      title: 'Solution',
    }),
    defineField({
      name: 'results',
      type: 'localeText',
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
    defineField({
      name: 'code',
      type: 'code',
      title: 'Code',
      description: 'Code snippets or code examples for this project',
      options: {
        language: 'javascript',
        languageAlternatives: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'JSON', value: 'json'},
          {title: 'Python', value: 'python'},
          {title: 'Java', value: 'java'},
          {title: 'PHP', value: 'php'},
          {title: 'Ruby', value: 'ruby'},
          {title: 'Go', value: 'go'},
          {title: 'Rust', value: 'rust'},
          {title: 'Shell', value: 'shell'},
          {title: 'SQL', value: 'sql'},
          {title: 'YAML', value: 'yaml'},
          {title: 'Markdown', value: 'markdown'},
          {title: 'Plain Text', value: 'text'},
        ],
        withFilename: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})

