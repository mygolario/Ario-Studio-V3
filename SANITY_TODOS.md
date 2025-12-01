# Sanity Integration - Improvements & TODOs

This document outlines potential improvements and future enhancements for the Sanity CMS integration.

## ✅ Completed Features

- [x] Sanity v3 integration with Next.js App Router
- [x] Code-first schema definitions for all content types
- [x] Embedded Sanity Studio at `/studio`
- [x] GROQ query helpers with TypeScript types
- [x] Draft mode / preview functionality
- [x] Real-time preview updates with `useLiveQuery`
- [x] Portable Text rendering for rich content
- [x] Image optimization with `@sanity/image-url`
- [x] Static generation for blog posts and projects
- [x] Type-safe queries and components

## 🚀 Recommended Improvements

### 1. Multi-Language Content Support

**Current State:** UI is translated (Farsi/English), but content is single-language.

**Improvements:**
- Add `locale` field to content types (project, blogPost, service)
- Implement language-specific queries
- Create locale-aware routing for content
- Add language switcher in Sanity Studio
- Support for RTL content in Portable Text

**Implementation:**
```typescript
// Example: Add locale to project schema
defineField({
  name: 'locale',
  title: 'Language',
  type: 'string',
  options: {
    list: [
      { title: 'English', value: 'en' },
      { title: 'Farsi', value: 'fa' }
    ]
  },
  initialValue: 'en'
})
```

### 2. Enhanced Rich Text Components

**Current State:** Basic Portable Text rendering with simple blocks.

**Improvements:**
- Custom code blocks with syntax highlighting
- Embedded videos (YouTube, Vimeo)
- Custom callout/alert blocks
- Table support
- Custom image galleries
- Tweet/Instagram embeds
- Custom button/link blocks

**Implementation:**
```typescript
// Example: Add custom block types
{
  type: 'code',
  component: CodeBlock,
  icon: CodeIcon
},
{
  type: 'video',
  component: VideoEmbed,
  icon: VideoIcon
}
```

### 3. Content Revalidation Webhooks

**Current State:** Content updates require manual rebuild or ISR.

**Improvements:**
- Set up Sanity webhooks for automatic revalidation
- Create `/api/revalidate` endpoint
- Configure webhook triggers for create/update/delete
- Add revalidation tags to queries

**Implementation:**
```typescript
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { isValidSignature, body } = await parseBody(
    request,
    process.env.SANITY_REVALIDATE_SECRET
  );
  
  if (isValidSignature) {
    await revalidateTag(body._type);
    return NextResponse.json({ revalidated: true });
  }
}
```

### 4. Advanced Image Handling

**Current State:** Basic image URLs with width/height.

**Improvements:**
- Responsive image sets with srcset
- Lazy loading for below-fold images
- Blur placeholders for images
- Image aspect ratio preservation
- WebP/AVIF format support
- Image optimization presets

**Implementation:**
```typescript
// Enhanced urlFor usage
urlFor(image)
  .width(800)
  .height(600)
  .format('webp')
  .quality(85)
  .url()
```

### 5. Better Error Handling

**Current State:** Basic error handling with fallbacks.

**Improvements:**
- Error boundaries for Sanity queries
- Graceful degradation when content is missing
- User-friendly error messages
- Retry logic for failed requests
- Error logging and monitoring

### 6. SEO Enhancements

**Current State:** Basic metadata generation.

**Improvements:**
- Dynamic Open Graph images per content
- Structured data (JSON-LD) for all content types
- Sitemap generation from Sanity content
- Canonical URLs for all pages
- Meta descriptions from content excerpts
- Twitter Card optimization

### 7. Content Validation & Quality

**Current State:** Basic field validation.

**Improvements:**
- Custom validation rules
- Required field indicators
- Content quality checks
- Slug uniqueness validation
- Image dimension validation
- Character count limits

### 8. Preview UI Enhancements

**Current State:** Basic draft mode banner.

**Improvements:**
- Better preview toolbar
- Exit preview button
- Preview status indicator
- Draft vs published comparison
- Preview sharing links

### 9. Performance Optimizations

**Current State:** Good performance with static generation.

**Improvements:**
- Query result caching
- Incremental Static Regeneration (ISR)
- Edge runtime for API routes
- CDN optimization for images
- Query optimization (reduce data fetched)
- Bundle size optimization

### 10. Analytics & Tracking

**Current State:** No content analytics.

**Improvements:**
- Content view tracking
- Popular content analytics
- Search analytics
- Content performance metrics
- A/B testing support

### 11. Content Relationships

**Current State:** Basic references (testimonials → projects).

**Improvements:**
- Related content suggestions
- Content tagging system
- Category/taxonomy support
- Content series/collections
- Cross-referencing between content

### 12. Search Functionality

**Current State:** No search.

**Improvements:**
- Full-text search for blog posts
- Project search/filtering
- Service search
- Search result highlighting
- Search analytics

### 13. Content Scheduling

**Current State:** Manual publishing.

**Improvements:**
- Scheduled publishing for blog posts
- Content expiration dates
- Draft scheduling
- Publishing workflow

### 14. Media Library Management

**Current State:** Basic image uploads.

**Improvements:**
- Media library organization
- Image tagging and categorization
- Bulk image operations
- Image alt text management
- Media usage tracking

### 15. Content Versioning

**Current State:** No version history.

**Improvements:**
- Content revision history
- Rollback functionality
- Version comparison
- Change tracking

## 🔧 Technical Debt

### Code Organization

- [ ] Extract Portable Text components to shared file
- [ ] Create reusable preview components
- [ ] Standardize error handling patterns
- [ ] Add comprehensive TypeScript types
- [ ] Create query builder utilities

### Testing

- [ ] Unit tests for query functions
- [ ] Integration tests for preview mode
- [ ] E2E tests for content creation flow
- [ ] Visual regression tests

### Documentation

- [ ] API documentation for queries
- [ ] Component documentation
- [ ] Schema documentation
- [ ] Deployment guide
- [ ] Content editor guide

## 📋 Quick Wins (Easy Improvements)

1. **Add vision tool back** - Uncomment `visionTool` in `sanity.config.ts` once version is compatible
2. **Add preview button in Studio** - Configure preview URLs in Studio structure
3. **Improve error messages** - Add user-friendly error messages
4. **Add loading states** - Better loading indicators for content
5. **Add empty states** - Better UI when no content exists

## 🎯 Priority Recommendations

### High Priority

1. **Content Revalidation Webhooks** - Critical for production
2. **Enhanced Rich Text Components** - Better content authoring
3. **Multi-Language Support** - Important for Farsi/English site
4. **SEO Enhancements** - Important for discoverability

### Medium Priority

5. **Advanced Image Handling** - Better performance
6. **Search Functionality** - Better UX
7. **Content Validation** - Better content quality

### Low Priority

8. **Analytics & Tracking** - Nice to have
9. **Content Scheduling** - Future feature
10. **Media Library Management** - Nice to have

## 📝 Notes

- All improvements should maintain backward compatibility
- Consider performance impact of new features
- Test thoroughly before deploying to production
- Document all new features in `README_SANITY.md`

## 🔗 Related Resources

- [Sanity Documentation](https://sanity.io/docs)
- [Next.js + Sanity Best Practices](https://www.sanity.io/docs/js-client)
- [GROQ Query Language](https://sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/block-content)

