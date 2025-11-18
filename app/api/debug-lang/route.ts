import { NextRequest, NextResponse } from 'next/server'
import { getRequestLang } from '@/lib/i18n/get-request-lang'

/**
 * Debug Language Detection API Route
 * 
 * This route is used for testing the language detection helper.
 * It returns the detected language from the request.
 * 
 * Usage:
 *   GET /api/debug-lang?lang=fa
 *   GET /api/debug-lang (with x-lang header)
 *   GET /api/debug-lang (with Accept-Language header)
 * 
 * Response:
 *   { lang: "fa" | "en", detectedFrom: "query" | "header" | "accept-language" | "default" }
 */
export async function GET(req: NextRequest) {
  const lang = getRequestLang(req)
  
  // Determine how the language was detected (for debugging purposes)
  let detectedFrom: 'query' | 'header' | 'accept-language' | 'default' = 'default'
  
  // Check query parameter
  const queryLang = req.nextUrl.searchParams.get('lang')
  if (queryLang === 'fa' || queryLang === 'en') {
    detectedFrom = 'query'
  }
  // Check custom header
  else if (req.headers.get('x-lang') === 'fa' || req.headers.get('x-lang') === 'en') {
    detectedFrom = 'header'
  }
  // Check Accept-Language
  else if (req.headers.get('accept-language')?.toLowerCase().includes('fa')) {
    detectedFrom = 'accept-language'
  }

  return NextResponse.json({
    lang,
    detectedFrom,
    message: `Language detected: ${lang} (from ${detectedFrom})`,
  })
}

