import { NextRequest } from 'next/server'
import { getRequestLang } from '@/lib/i18n'
import { getLocalizedContentBySlug } from '@/lib/content/queries'
import { jsonSuccess, jsonError } from '@/lib/api/response'

// Force dynamic rendering (required for language detection from query params)
export const dynamic = 'force-dynamic'

/**
 * Route parameters type
 */
interface RouteParams {
  params: {
    slug: string
  }
}

/**
 * GET /api/content/[slug]
 * 
 * Returns a single content item by slug in the requested language.
 * 
 * Language detection priority:
 * 1. Query parameter: ?lang=fa or ?lang=en
 * 2. x-lang header
 * 3. Accept-Language header
 * 4. Default: 'en'
 * 
 * @example
 *   GET /api/content/cinematic-web-experiences?lang=fa
 *   GET /api/content/ario-studio-case-study?lang=en
 * 
 * Response (success):
 *   {
 *     success: true,
 *     item: LocalizedContent
 *   }
 * 
 * Response (not found):
 *   {
 *     success: false,
 *     error: "Content not found",
 *     status: 404
 *   }
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    // Detect language from request
    const lang = getRequestLang(req)
    const { slug } = params

    // Fetch localized content by slug
    const content = await getLocalizedContentBySlug(slug, lang)

    if (!content) {
      // Content not found - return 404
      return jsonError(lang, 'contact.error', 404, {
        message: 'Content not found',
        slug,
      })
    }

    return jsonSuccess(lang, 'contact.success', {
      item: content,
      lang,
    })
  } catch (error: any) {
    console.error(`Error fetching content by slug (slug: ${params.slug}):`, error)
    
    // Try to get language for error message
    try {
      const lang = getRequestLang(req)
      return jsonError(lang, 'contact.error', 500)
    } catch {
      return jsonError('en', 'contact.error', 500)
    }
  }
}

