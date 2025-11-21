# TODO: Future Improvements for Bilingual System

This document tracks future improvements and enhancements for the bilingual (FA/EN) system in Ario Studio V3.

## Content Management

- [ ] **Admin Panel for Content Management**
  - Create a simple admin interface for managing Content and ContentTranslation
  - Allow adding/editing portfolio items, services, and blog posts in both languages
  - Visual editor for rich text content (body field)
  - Image upload and management for portfolio items

- [ ] **Draft/Published Status**
  - Add draft mode for content items
  - Preview functionality for unpublished content
  - Scheduled publishing (publish at specific date/time)

- [ ] **Content Versioning**
  - Track changes to content over time
  - Ability to revert to previous versions
  - Change history log

## Translation Management

- [ ] **Translation Fallback UI**
  - Show a banner/notice when a translation is missing (e.g., "This content is not yet available in your language")
  - Better fallback strategy: show English with a clear indicator
  - Translation completion status indicator in admin panel

- [ ] **Translation Workflow**
  - Mark translations as "needs review"
  - Translation progress tracking
  - Bulk translation import/export

## Portfolio & Case Studies

- [ ] **Portfolio Detail Page Enhancements**
  - Image gallery for portfolio items
  - Video embeds support
  - Interactive case study sections
  - Client testimonials section

- [ ] **Portfolio Preview Mode**
  - Preview unpublished portfolio items
  - Share preview links with clients
  - Password-protected preview links

## SEO & Performance

- [ ] **Dynamic OG Images**
  - Generate OG images per portfolio item
  - Bilingual OG image text
  - Automatic OG image generation from content

- [ ] **Sitemap Improvements**
  - Separate sitemaps per language (if using [lang] segments)
  - Last modified dates from Content model
  - Priority calculation based on content type

- [ ] **Structured Data**
  - Bilingual structured data (JSON-LD)
  - Organization schema with multilingual info
  - BreadcrumbList schema

## API & Backend

- [ ] **API Rate Limiting**
  - Rate limiting for contact form submissions
  - IP-based throttling
  - CAPTCHA integration for spam prevention

- [ ] **Email Queue System**
  - Queue emails for better reliability
  - Retry failed email sends
  - Email delivery status tracking

- [ ] **Analytics Integration**
  - Track language preferences
  - Content engagement metrics
  - Form submission analytics

## User Experience

- [ ] **Language Detection Improvements**
  - Better browser language detection
  - Remember user preference across sessions
  - Geolocation-based default language

- [ ] **RTL Layout Refinements**
  - More comprehensive RTL testing
  - RTL-specific animations
  - Better RTL support for complex components

## Testing & Quality

- [ ] **E2E Tests for Bilingual Flow**
  - Test form submission in both languages
  - Test API responses in both languages
  - Test email delivery in both languages

- [ ] **Accessibility Improvements**
  - ARIA labels in both languages
  - Screen reader optimization
  - Keyboard navigation improvements

## Infrastructure

- [ ] **CDN for Static Assets**
  - Serve fonts (Vazirmatn) from CDN
  - Optimize image delivery
  - Cache static translations

- [ ] **Database Optimization**
  - Index optimization for Content queries
  - Query performance monitoring
  - Database connection pooling

---

**Last Updated:** 2024
**Status:** Active Development

