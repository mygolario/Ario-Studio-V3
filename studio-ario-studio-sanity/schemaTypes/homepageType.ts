import {defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Homepage',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      fields: [
        {
          name: 'headline',
          type: 'object',
          title: 'Headline',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'fa', type: 'string', title: 'Farsi'},
          ],
        },
        {
          name: 'description',
          type: 'object',
          title: 'Description',
          fields: [
            {name: 'en', type: 'text', title: 'English'},
            {name: 'fa', type: 'text', title: 'Farsi'},
          ],
        },
        {
          name: 'primaryCTA',
          type: 'object',
          title: 'Primary CTA Button',
          fields: [
            {name: 'textEn', type: 'string', title: 'Text (English)'},
            {name: 'textFa', type: 'string', title: 'Text (Farsi)'},
            {name: 'link', type: 'string', title: 'Link'},
          ],
        },
        {
          name: 'secondaryCTA',
          type: 'object',
          title: 'Secondary CTA Button',
          fields: [
            {name: 'textEn', type: 'string', title: 'Text (English)'},
            {name: 'textFa', type: 'string', title: 'Text (Farsi)'},
            {name: 'link', type: 'string', title: 'Link'},
          ],
        },
      ],
    }),
    defineField({
      name: 'about',
      type: 'object',
      title: 'About Section',
      fields: [
        {
          name: 'title',
          type: 'object',
          title: 'Title',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'fa', type: 'string', title: 'Farsi'},
          ],
        },
        {
          name: 'description',
          type: 'object',
          title: 'Description',
          fields: [
            {name: 'en', type: 'array', of: [{type: 'block'}], title: 'English'},
            {name: 'fa', type: 'array', of: [{type: 'block'}], title: 'Farsi'},
          ],
        },
      ],
    }),
    defineField({
      name: 'contactCTA',
      type: 'object',
      title: 'Contact CTA Section',
      fields: [
        {
          name: 'headline',
          type: 'object',
          title: 'Headline',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'fa', type: 'string', title: 'Farsi'},
          ],
        },
        {
          name: 'description',
          type: 'object',
          title: 'Description',
          fields: [
            {name: 'en', type: 'text', title: 'English'},
            {name: 'fa', type: 'text', title: 'Farsi'},
          ],
        },
        {
          name: 'email',
          type: 'string',
          title: 'Contact Email',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

