import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'taglineFa', title: 'Tagline (FA)', type: 'string' }),
        defineField({ name: 'headingFa', title: 'Heading (FA)', type: 'string' }),
        defineField({ name: 'subtextFa', title: 'Subtext (FA)', type: 'text' }),
        defineField({ name: 'taglineEn', title: 'Tagline (EN)', type: 'string' }),
        defineField({ name: 'headingEn', title: 'Heading (EN)', type: 'string' }),
        defineField({ name: 'subtextEn', title: 'Subtext (EN)', type: 'text' }),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fields: [
        defineField({ name: 'descriptionFa', title: 'Description (FA)', type: 'text' }),
        defineField({ name: 'descriptionEn', title: 'Description (EN)', type: 'text' }),
      ],
    }),
    defineField({
      name: 'servicesPrimary',
      title: 'Primary Services (Dark Section)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'strengths',
      title: 'Key Strengths',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titleFa', title: 'Title (FA)', type: 'string' }),
          defineField({ name: 'bodyFa', title: 'Body (FA)', type: 'text' }),
          defineField({ name: 'titleEn', title: 'Title (EN)', type: 'string' }),
          defineField({ name: 'bodyEn', title: 'Body (EN)', type: 'text' }),
        ],
      }],
    }),
    defineField({
      name: 'evolution',
      title: 'Evolution Section',
      type: 'object',
      fields: [
        defineField({ name: 'headingFa', title: 'Heading (FA)', type: 'string' }),
        defineField({ name: 'paragraphFa', title: 'Paragraph (FA)', type: 'text' }),
        defineField({ name: 'headingEn', title: 'Heading (EN)', type: 'string' }),
        defineField({ name: 'paragraphEn', title: 'Paragraph (EN)', type: 'text' }),
      ],
    }),
    defineField({
      name: 'servicesSecondary',
      title: 'Secondary Services (Light Section)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'bodyFa', title: 'Body (FA)', type: 'text' }),
          defineField({ name: 'bodyEn', title: 'Body (EN)', type: 'text' }),
        ],
      }],
    }),
    defineField({
      name: 'identityHighlight',
      title: 'Identity Highlight',
      type: 'object',
      fields: [
        defineField({ name: 'image', title: 'Image', type: 'image' }),
        defineField({ name: 'headingFa', title: 'Heading (FA)', type: 'string' }),
        defineField({ name: 'paragraphFa', title: 'Paragraph (FA)', type: 'text' }),
        defineField({ name: 'headingEn', title: 'Heading (EN)', type: 'string' }),
        defineField({ name: 'paragraphEn', title: 'Paragraph (EN)', type: 'text' }),
      ],
    }),
    defineField({
      name: 'portfolioHighlight',
      title: 'Portfolio Highlight',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
  ],
})
