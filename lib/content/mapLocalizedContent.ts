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
import type {
  CaseStudyLayoutType,
  Content,
  ContentTranslation,
  LocalizedContent,
} from './types'

/**
 * Type for Content with translations loaded (Prisma include)
 */
export type ContentWithTranslations = Content & {
  translations: ContentTranslation[]
}

/**
 * Helper function to parse galleryImages from JSON
 * Handles both string (JSON) and array formats
 * 
 * @param galleryImages - JSON string or array of strings
 * @returns Array of image URLs or null
 */
function parseGalleryImages(galleryImages: unknown): string[] | null {
  if (!galleryImages) {
    return null
  }

  // If already an array, return it
  if (Array.isArray(galleryImages)) {
    return galleryImages.filter((item): item is string => typeof item === 'string')
  }

  // If it's a string, try to parse as JSON
  if (typeof galleryImages === 'string') {
    try {
      const parsed = JSON.parse(galleryImages)
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string')
      }
    } catch {
      // If parsing fails, return null
      return null
    }
  }

  return null
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

  // Parse galleryImages (handle JSON from Prisma)
  const galleryImages = parseGalleryImages(translation.galleryImages)

  const resolvedLayoutType: CaseStudyLayoutType | null =
    content.type === 'portfolio'
      ? ((content.layoutType as CaseStudyLayoutType | null) ?? 'basic')
      : ((content.layoutType as CaseStudyLayoutType | null) ?? null)

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
    layoutType: resolvedLayoutType,
    
    // Language-specific fields from translation
    lang: translation.lang,
    title: translation.title,
    excerpt: translation.excerpt ?? null,
    body: translation.body ?? null,
    metaTitle: translation.metaTitle ?? null,
    metaDescription: translation.metaDescription ?? null,
    subtitle: translation.subtitle ?? null,
    tags: translation.tags ?? null,
    
    // Case Study specific fields
    bodyIntro: translation.bodyIntro ?? null,
    bodyProblem: translation.bodyProblem ?? null,
    bodySolution: translation.bodySolution ?? null,
    bodyProcess: translation.bodyProcess ?? null,
    bodyResult: translation.bodyResult ?? null,
    featuredImage: translation.featuredImage ?? null,
    galleryImages: galleryImages,
    
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

