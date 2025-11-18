/**
 * Content Query Helpers
 * 
 * Helper functions to fetch multilingual content from the database.
 * These functions handle language detection, fallback logic, and mapping to LocalizedContent.
 * 
 * Usage:
 *   import { getLocalizedContentList, getLocalizedContentBySlug } from '@/lib/content/queries'
 *   const services = await getLocalizedContentList('service', 'fa')
 */

import { prisma } from '@/lib/db'
import { type SupportedLang } from '@/lib/i18n'
import { type ContentType, type LocalizedContent } from './types'
import { mapToLocalizedContent, type ContentWithTranslations } from './mapLocalizedContent'

/**
 * Get list of localized content by type
 * 
 * Fetches all published content of a specific type and returns localized versions
 * based on the requested language with fallback logic.
 * 
 * @param type - Content type (portfolio, service, blog)
 * @param lang - Target language ('fa' or 'en')
 * @returns Array of LocalizedContent items
 * 
 * @example
 *   const services = await getLocalizedContentList('service', 'fa')
 */
export async function getLocalizedContentList(
  type: ContentType,
  lang: SupportedLang
): Promise<LocalizedContent[]> {
  try {
    // Fetch content with translations from database
    const contents = await prisma.content.findMany({
      where: {
        type: type,
        isPublished: true,
        archived: false,
      },
      include: {
        translations: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    // Map each content to LocalizedContent using the helper
    const localizedContents = contents
      .map((content) => mapToLocalizedContent(content as ContentWithTranslations, lang))
      .filter((content): content is LocalizedContent => content !== null)

    return localizedContents
  } catch (error) {
    console.error(`Error fetching localized content list (type: ${type}, lang: ${lang}):`, error)
    // Return empty array on error (graceful degradation)
    return []
  }
}

/**
 * Get a single localized content by slug
 * 
 * Fetches a specific content item by slug and returns its localized version
 * based on the requested language with fallback logic.
 * 
 * @param slug - Content slug (language-agnostic)
 * @param lang - Target language ('fa' or 'en')
 * @returns LocalizedContent or null if not found
 * 
 * @example
 *   const content = await getLocalizedContentBySlug('cinematic-web-experiences', 'fa')
 */
export async function getLocalizedContentBySlug(
  slug: string,
  lang: SupportedLang
): Promise<LocalizedContent | null> {
  try {
    // Fetch content with translations from database
    const content = await prisma.content.findUnique({
      where: {
        slug: slug,
      },
      include: {
        translations: true,
      },
    })

    if (!content) {
      return null
    }

    // Map to LocalizedContent using the helper (handles fallback logic)
    return mapToLocalizedContent(content as ContentWithTranslations, lang)
  } catch (error) {
    console.error(`Error fetching localized content by slug (slug: ${slug}, lang: ${lang}):`, error)
    return null
  }
}

/**
 * Get featured content by type
 * 
 * Fetches featured content of a specific type, useful for homepage highlights.
 * 
 * @param type - Content type (portfolio, service, blog)
 * @param lang - Target language ('fa' or 'en')
 * @param limit - Maximum number of items to return (default: 3)
 * @returns Array of LocalizedContent items
 * 
 * @example
 *   const featuredPortfolio = await getFeaturedContent('portfolio', 'fa', 3)
 */
export async function getFeaturedContent(
  type: ContentType,
  lang: SupportedLang,
  limit: number = 3
): Promise<LocalizedContent[]> {
  try {
    const contents = await prisma.content.findMany({
      where: {
        type: type,
        isPublished: true,
        featured: true,
        archived: false,
      },
      include: {
        translations: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    })

    const localizedContents = contents
      .map((content) => mapToLocalizedContent(content as ContentWithTranslations, lang))
      .filter((content): content is LocalizedContent => content !== null)

    return localizedContents
  } catch (error) {
    console.error(`Error fetching featured content (type: ${type}, lang: ${lang}):`, error)
    return []
  }
}

/**
 * Get content count by type
 * 
 * Returns the total count of published content items for a specific type.
 * Useful for pagination or statistics.
 * 
 * @param type - Content type (portfolio, service, blog)
 * @returns Number of published content items
 */
export async function getContentCount(type: ContentType): Promise<number> {
  try {
    return await prisma.content.count({
      where: {
        type: type,
        isPublished: true,
        archived: false,
      },
    })
  } catch (error) {
    console.error(`Error counting content (type: ${type}):`, error)
    return 0
  }
}

