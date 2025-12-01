import { defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roleOrCompany',
      title: 'Role or Company',
      type: 'string',
      description: 'Job title or company name',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
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
      name: 'projectRef',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Optional reference to a project this testimonial relates to',
    }),
  ],
  preview: {
    select: {
      clientName: 'clientName',
      roleOrCompany: 'roleOrCompany',
      quote: 'quote',
      media: 'avatar',
    },
    prepare({ clientName, roleOrCompany, quote, media }) {
      return {
        title: clientName,
        subtitle: roleOrCompany ? `${roleOrCompany} • ${quote?.substring(0, 50)}...` : quote?.substring(0, 50),
        media,
      };
    },
  },
});

