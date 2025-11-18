/**
 * Content Mapping Utilities
 * 
 * Helper functions to map Prisma Content + ContentTranslation models
 * to LocalizedContent for frontend/API consumption.
 * 
 * Fallback Strategy:
 * 1. Try to find translation for the requested language
 * 2. If not found, fallback to English ("en")
 * 3. If English not found, use the first available translation
 * 4. If no translations exist, return null (caller should handle)
 * 
 * Usage:
 *   import { mapToLocalizedContent } from '@/lib/content/mapLocalizedContent'
 *   const localized = mapToLocalizedContent(contentWithTranslations, 'fa')
 */

import { type SupportedLang } from '@/lib/i18n'
import type { Content, ContentTranslation, LocalizedContent } from './types'

/**
 * Type for Content with translations loaded (Prisma include)
 */
export type ContentWithTranslations = Content & {
  translations: ContentTranslation[]
}

/**
 * Map Content + ContentTranslation to LocalizedContent for a specific language
 * 
 * @param content - Content entity with translations loaded
 * @param lang - Target language ('fa' or 'en')
 * @returns LocalizedContent or null if no translation available
 * 
 * @example
 *   const content = await prisma.content.findUnique({
 *     where: { slug: 'ai-web-studio' },
 *     include: { translations: true }
 *   })
 *   const localized = mapToLocalizedContent(content, 'fa')
 */
export function mapToLocalizedContent(
  content: ContentWithTranslations | null,
  lang: SupportedLang
): LocalizedContent | null {
  if (!content) {
    return null
  }

  // Find translation for requested language
  let translation = content.translations.find((t) => t.lang === lang)

  // Fallback to English if requested language not found
  if (!translation && lang !== 'en') {
    translation = content.translations.find((t) => t.lang === 'en')
  }

  // Fallback to first available translation if English not found
  if (!translation && content.translations.length > 0) {
    translation = content.translations[0]
  }

  // If still no translation, return null
  if (!translation) {
    return null
  }

  // Build LocalizedContent object
  return {
    // Core content fields
    id: content.id,
    type: content.type,
    slug: content.slug,
    isPublished: content.isPublished,
    order: content.order ?? null,
    featured: content.featured ?? false,
    archived: content.archived ?? false,
    
    // Language-specific fields from translation
    lang: translation.lang,
    title: translation.title,
    excerpt: translation.excerpt ?? null,
    body: translation.body ?? null,
    metaTitle: translation.metaTitle ?? null,
    metaDescription: translation.metaDescription ?? null,
    subtitle: translation.subtitle ?? null,
    tags: translation.tags ?? null,
    
    // Timestamps
    createdAt: content.createdAt,
    updatedAt: content.updatedAt,
  }
}

/**
 * Map multiple Content entities to LocalizedContent array
 * 
 * @param contents - Array of Content entities with translations
 * @param lang - Target language
 * @returns Array of LocalizedContent (nulls filtered out)
 * 
 * @example
 *   const contents = await prisma.content.findMany({
 *     where: { type: 'portfolio', isPublished: true },
 *     include: { translations: true }
 *   })
 *   const localized = mapManyToLocalizedContent(contents, 'fa')
 */
export function mapManyToLocalizedContent(
  contents: ContentWithTranslations[],
  lang: SupportedLang
): LocalizedContent[] {
  return contents
    .map((content) => mapToLocalizedContent(content, lang))
    .filter((localized): localized is LocalizedContent => localized !== null)
}

/**
 * Get the best available translation for a content item
 * Returns the translation for the requested language, or falls back to English,
 * or returns the first available translation.
 * 
 * @param translations - Array of ContentTranslation
 * @param preferredLang - Preferred language
 * @returns ContentTranslation or null
 */
export function getBestTranslation(
  translations: ContentTranslation[],
  preferredLang: SupportedLang
): ContentTranslation | null {
  // Try preferred language
  let translation = translations.find((t) => t.lang === preferredLang)
  
  // Fallback to English
  if (!translation && preferredLang !== 'en') {
    translation = translations.find((t) => t.lang === 'en')
  }
  
  // Fallback to first available
  if (!translation && translations.length > 0) {
    translation = translations[0]
  }
  
  return translation ?? null
}

