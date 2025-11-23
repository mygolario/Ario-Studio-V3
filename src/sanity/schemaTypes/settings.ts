import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'addressFa',
      title: 'Address (FA)',
      type: 'text',
    }),
    defineField({
      name: 'addressEn',
      title: 'Address (EN)',
      type: 'text',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'platform', title: 'Platform', type: 'string' }),
          defineField({ name: 'url', title: 'URL', type: 'url' }),
        ],
      }],
    }),
  ],
})
