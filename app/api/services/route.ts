import { NextRequest } from 'next/server'
import { getRequestLang } from '@/lib/i18n'
import { getLocalizedContentList } from '@/lib/content/queries'
import { jsonSuccess, jsonError } from '@/lib/api/response'

// Force dynamic rendering (required for language detection from query params)
export const dynamic = 'force-dynamic'

/**
 * GET /api/services
 * 
 * Returns a list of all published services in the requested language.
 * 
 * Language detection priority:
 * 1. Query parameter: ?lang=fa or ?lang=en
 * 2. x-lang header
 * 3. Accept-Language header
 * 4. Default: 'en'
 * 
 * @example
 *   GET /api/services?lang=fa
 *   GET /api/services (with Accept-Language: fa-IR)
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

    // Fetch localized services
    const services = await getLocalizedContentList('service', lang)

    return jsonSuccess(lang, 'contact.success', {
      items: services,
      count: services.length,
      lang,
    })
  } catch (error: any) {
    console.error('Error fetching services:', error)
    
    // Try to get language for error message
    try {
      const lang = getRequestLang(req)
      return jsonError(lang, 'contact.error', 500)
    } catch {
      return jsonError('en', 'contact.error', 500)
    }
  }
}

