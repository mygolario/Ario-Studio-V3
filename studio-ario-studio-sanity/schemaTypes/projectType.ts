import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title (English)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleFa',
      type: 'string',
      title: 'Title (Farsi)',
      description: 'Farsi version of the title',
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
      title: 'Excerpt (English)',
      description: 'Short description for listings',
    }),
    defineField({
      name: 'excerptFa',
      type: 'text',
      title: 'Excerpt (Farsi)',
      description: 'Farsi version of the excerpt',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description (English)',
    }),
    defineField({
      name: 'descriptionFa',
      type: 'text',
      title: 'Description (Farsi)',
      description: 'Farsi version of the description',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Full Content (English)',
    }),
    defineField({
      name: 'contentFa',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Full Content (Farsi)',
      description: 'Farsi version of the full content',
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
      title: 'Challenge (English)',
    }),
    defineField({
      name: 'challengeFa',
      type: 'text',
      title: 'Challenge (Farsi)',
      description: 'Farsi version of the challenge',
    }),
    defineField({
      name: 'solution',
      type: 'text',
      title: 'Solution (English)',
    }),
    defineField({
      name: 'solutionFa',
      type: 'text',
      title: 'Solution (Farsi)',
      description: 'Farsi version of the solution',
    }),
    defineField({
      name: 'results',
      type: 'text',
      title: 'Results (English)',
    }),
    defineField({
      name: 'resultsFa',
      type: 'text',
      title: 'Results (Farsi)',
      description: 'Farsi version of the results',
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
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})

