import type { StructureBuilder } from 'sanity/structure';

/**
 * Custom structure configuration
 */
export default (S: StructureBuilder) => {
  return S.list()
    .title('Content')
    .items([
      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      
      // Projects
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .defaultOrdering([{ field: 'orderRank', direction: 'asc' }])
        ),

      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      // Services
      S.listItem()
        .title('Services')
        .schemaType('service')
        .child(
          S.documentTypeList('service')
            .defaultOrdering([{ field: 'orderRank', direction: 'asc' }])
        ),

      // Testimonials
      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .child(
          S.documentTypeList('testimonial')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
    ]);
};
