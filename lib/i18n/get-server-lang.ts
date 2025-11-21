/**
 * Server-side Language Detection Helper
 * 
 * This module provides utilities to detect language in Next.js Server Components
 * using headers() and cookies().
 * 
 * Usage in Server Components:
 *   import { getServerLang } from '@/lib/i18n/get-server-lang'
 *   const lang = await getServerLang()
 */

import { headers, cookies } from 'next/headers'
import { type SupportedLang } from './get-request-lang'

/**
 * Get the preferred language from server-side context
 * 
 * Priority:
 * 1. Cookie: 'language' (set by LanguageContext)
 * 2. Accept-Language header (checks for 'fa')
 * 3. Default: 'fa' (since the site defaults to Farsi)
 * 
 * @returns The detected language ('fa' or 'en')
 * 
 * @example
 *   const lang = await getServerLang()
 *   const services = await getLocalizedContentList('service', lang)
 */
export async function getServerLang(): Promise<SupportedLang> {
  // Priority 1: Check cookie (set by LanguageContext)
  const cookieStore = await cookies()
  const languageCookie = cookieStore.get('language')?.value
  
  if (languageCookie === 'fa' || languageCookie === 'en') {
    return languageCookie as SupportedLang
  }

  // Priority 2: Check Accept-Language header
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')
  
  if (acceptLanguage) {
    const normalizedAcceptLang = acceptLanguage.toLowerCase()
    if (normalizedAcceptLang.includes('fa')) {
      return 'fa'
    }
  }

  // Priority 3: Default to Farsi (site default)
  return 'fa'
}

