/**
 * Request Language Detection Helper
 * 
 * This module provides a utility function to detect the user's preferred language
 * from an HTTP request. It follows a priority order to determine the language:
 * 
 * Priority Order:
 *   1. Query parameter: `?lang=fa` or `?lang=en`
 *   2. Custom header: `x-lang: fa` or `x-lang: en`
 *   3. Accept-Language header: Checks if "fa" is present, otherwise defaults to "en"
 *   4. Default: "en" if nothing valid is found
 * 
 * Supported Languages:
 *   - Only "fa" (Farsi) and "en" (English) are supported
 *   - Any other language code will be ignored and default to "en"
 * 
 * Usage:
 *   import { getRequestLang } from '@/lib/i18n/get-request-lang'
 *   const lang = getRequestLang(request)
 */

import { NextRequest } from 'next/server'

export type SupportedLang = 'fa' | 'en'

/**
 * Get the preferred language from a Next.js request
 * 
 * @param req - Next.js request object (NextRequest)
 * @returns The detected language code ('fa' or 'en')
 * 
 * @example
 *   // From query parameter
 *   // GET /api/contact?lang=fa
 *   const lang = getRequestLang(request) // Returns: 'fa'
 * 
 * @example
 *   // From custom header
 *   // x-lang: fa
 *   const lang = getRequestLang(request) // Returns: 'fa'
 * 
 * @example
 *   // From Accept-Language header
 *   // Accept-Language: fa-IR,fa;q=0.9,en;q=0.8
 *   const lang = getRequestLang(request) // Returns: 'fa'
 */
export function getRequestLang(req: NextRequest): SupportedLang {
  // Priority 1: Check query parameter
  const queryLang = req.nextUrl.searchParams.get('lang')
  if (queryLang === 'fa' || queryLang === 'en') {
    return queryLang as SupportedLang
  }

  // Priority 2: Check custom header 'x-lang'
  const customHeaderLang = req.headers.get('x-lang')
  if (customHeaderLang === 'fa' || customHeaderLang === 'en') {
    return customHeaderLang as SupportedLang
  }

  // Priority 3: Check Accept-Language header
  const acceptLanguage = req.headers.get('accept-language')
  if (acceptLanguage) {
    // Check if "fa" appears in the Accept-Language header
    // This handles cases like "fa-IR,fa;q=0.9,en;q=0.8" or "fa,en"
    const normalizedAcceptLang = acceptLanguage.toLowerCase()
    if (normalizedAcceptLang.includes('fa')) {
      return 'fa'
    }
  }

  // Priority 4: Default to English
  return 'en'
}

/**
 * Get the preferred language from a standard Request object
 * (Useful for non-Next.js contexts or when working with standard Request)
 * 
 * @param req - Standard Request object
 * @param url - Optional URL string or URL object for query parameter parsing
 * @returns The detected language code ('fa' or 'en')
 * 
 * @example
 *   const lang = getRequestLangFromStandardRequest(request, request.url)
 */
export function getRequestLangFromStandardRequest(
  req: Request,
  url?: string | URL
): SupportedLang {
  // Priority 1: Check query parameter if URL is provided
  if (url) {
    try {
      const urlObj = typeof url === 'string' ? new URL(url) : url
      const queryLang = urlObj.searchParams.get('lang')
      if (queryLang === 'fa' || queryLang === 'en') {
        return queryLang as SupportedLang
      }
    } catch (error) {
      // Invalid URL, continue to next priority
    }
  }

  // Priority 2: Check custom header 'x-lang'
  const customHeaderLang = req.headers.get('x-lang')
  if (customHeaderLang === 'fa' || customHeaderLang === 'en') {
    return customHeaderLang as SupportedLang
  }

  // Priority 3: Check Accept-Language header
  const acceptLanguage = req.headers.get('accept-language')
  if (acceptLanguage) {
    const normalizedAcceptLang = acceptLanguage.toLowerCase()
    if (normalizedAcceptLang.includes('fa')) {
      return 'fa'
    }
  }

  // Priority 4: Default to English
  return 'en'
}

