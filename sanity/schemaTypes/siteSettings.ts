import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline or slogan',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Site description for SEO',
    }),
    defineField({
      name: 'mainEmail',
      title: 'Main Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'whatsappLink',
      title: 'WhatsApp Link',
      type: 'url',
      description: 'WhatsApp contact link',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              label: 'label',
              url: 'url',
            },
            prepare({ label, url }) {
              return {
                title: label,
                subtitle: url,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline for the hero section',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      description: 'Subheadline or description for the hero section',
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero CTA Label',
      type: 'string',
      description: 'Call-to-action button label',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero CTA Link',
      type: 'url',
      description: 'Call-to-action button link',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      tagline: 'tagline',
    },
    prepare({ title, tagline }) {
      return {
        title: title || 'Site Settings',
        subtitle: tagline,
      };
    },
  },
});

