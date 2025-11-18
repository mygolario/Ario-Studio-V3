import { NextRequest } from 'next/server'
import { getRequestLang } from '@/lib/i18n'
import { getLocalizedContentList } from '@/lib/content/queries'
import { jsonSuccess, jsonError } from '@/lib/api/response'

// Force dynamic rendering (required for language detection from query params)
export const dynamic = 'force-dynamic'

/**
 * GET /api/portfolio
 * 
 * Returns a list of all published portfolio items in the requested language.
 * 
 * Language detection priority:
 * 1. Query parameter: ?lang=fa or ?lang=en
 * 2. x-lang header
 * 3. Accept-Language header
 * 4. Default: 'en'
 * 
 * @example
 *   GET /api/portfolio?lang=fa
 *   GET /api/portfolio (with Accept-Language: fa-IR)
 * 
 * Response:
 *   {
 *     success: true,
 *     items: LocalizedContent[]
 *   }
 */
export async function GET(req: NextRequest) {
  try {
    // Detect language from request
    const lang = getRequestLang(req)

    // Fetch localized portfolio items
    const portfolioItems = await getLocalizedContentList('portfolio', lang)

    // Return success even if empty (frontend can handle empty state)
    return jsonSuccess(lang, 'portfolio.success', {
      items: portfolioItems,
      count: portfolioItems.length,
      lang,
    })
  } catch (error: any) {
    // Internal error - log for developer, return user-friendly message
    console.error('Error fetching portfolio:', error)
    
    // Try to get language for error message
    try {
      const lang = getRequestLang(req)
      return jsonError(lang, 'portfolio.error', 500)
    } catch {
      return jsonError('en', 'portfolio.error', 500)
    }
  }
}

