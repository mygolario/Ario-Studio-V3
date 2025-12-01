import { defineField, defineType } from 'sanity';
import { SparklesIcon } from '@sanity/icons';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: SparklesIcon,
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Brief summary of the service',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full service description',
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Starter', value: 'Starter' },
          { title: 'Growth', value: 'Growth' },
          { title: 'Elite', value: 'Elite' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'priceFrom',
      title: 'Price From',
      type: 'number',
      description: 'Starting price for this service',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'deliveryTime',
      title: 'Delivery Time',
      type: 'string',
      description: 'e.g., "2–4 weeks"',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this service prominently',
      initialValue: false,
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
      tier: 'tier',
      orderRank: 'orderRank',
    },
    prepare({ title, tier, orderRank }) {
      return {
        title,
        subtitle: tier ? `${tier} • Order: ${orderRank || 0}` : `Order: ${orderRank || 0}`,
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

