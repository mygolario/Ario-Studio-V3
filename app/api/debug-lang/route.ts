import { NextRequest } from 'next/server'
import { getRequestLang, getTranslation } from '@/lib/i18n'
import { jsonSuccess } from '@/lib/api/response'

/**
 * Debug Language Detection API Route
 * 
 * This route is used for testing the language detection helper.
 * It returns the detected language from the request with bilingual messages.
 * 
 * Usage:
 *   GET /api/debug-lang?lang=fa
 *   GET /api/debug-lang (with x-lang header)
 *   GET /api/debug-lang (with Accept-Language header)
 * 
 * Response:
 *   { 
 *     success: true,
 *     lang: "fa" | "en", 
 *     detectedFrom: "query" | "header" | "accept-language" | "default",
 *     message: "Translated message based on detected language"
 *   }
 */
export async function GET(req: NextRequest) {
  const lang = getRequestLang(req)
  const t = (key: string) => getTranslation(lang, key)
  
  // Determine how the language was detected (for debugging purposes)
  let detectedFrom: 'query' | 'header' | 'accept-language' | 'default' = 'default'
  let messageKey = 'debug.langDefault'
  
  // Check query parameter
  const queryLang = req.nextUrl.searchParams.get('lang')
  if (queryLang === 'fa' || queryLang === 'en') {
    detectedFrom = 'query'
    messageKey = 'debug.langFromQuery'
  }
  // Check custom header
  else if (req.headers.get('x-lang') === 'fa' || req.headers.get('x-lang') === 'en') {
    detectedFrom = 'header'
    messageKey = 'debug.langFromHeader'
  }
  // Check Accept-Language
  else if (req.headers.get('accept-language')?.toLowerCase().includes('fa')) {
    detectedFrom = 'accept-language'
    messageKey = 'debug.langFromAccept'
  }

  return jsonSuccess(lang, messageKey, {
    lang,
    detectedFrom,
    detectedMessage: t(messageKey),
  })
}

