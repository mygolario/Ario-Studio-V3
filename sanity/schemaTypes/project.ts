import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'Industry or category tag',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Brief project summary',
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The challenge or problem addressed',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The solution implemented',
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The results achieved',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Link to live project (optional)',
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'number',
      description: 'Manual ordering (lower numbers appear first)',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      clientName: 'clientName',
      media: 'thumbnail',
      orderRank: 'orderRank',
    },
    prepare({ title, clientName, media, orderRank }) {
      return {
        title,
        subtitle: clientName ? `${clientName} • Order: ${orderRank || 0}` : `Order: ${orderRank || 0}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Order Rank',
      name: 'orderRankAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});

