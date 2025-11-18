/**
 * Server-side i18n Module - Public API
 * 
 * Central entry point for all i18n functionality in the backend.
 * 
 * This module provides:
 * - Language detection from HTTP requests
 * - Translation functions for backend operations
 * - Type-safe language types
 * 
 * Usage in API routes:
 *   import { getRequestLang, getTranslation, type SupportedLang } from '@/lib/i18n'
 *   import { jsonSuccess, jsonError } from '@/lib/api/response'
 * 
 *   export async function POST(req: NextRequest) {
 *     const lang = getRequestLang(req)
 *     const t = (key: string) => getTranslation(lang, key)
 *     
 *     // Use translations
 *     return jsonSuccess(lang, 'contact.success')
 *     return jsonError(lang, 'contact.error', 500)
 *   }
 * 
 * Adding new translation keys:
 *   1. Open lib/i18n/server-i18n.ts
 *   2. Add the new key to the Translations interface
 *   3. Add translations for both 'en' and 'fa' in the translations object
 *   4. Use the key in your API route: getTranslation(lang, 'your.new.key')
 * 
 * Supported Languages:
 *   - 'fa' (Farsi/Persian)
 *   - 'en' (English) - default
 */

// Re-export all translation functions
export {
  getTranslation,
  getTranslations,
  isSupportedLanguage,
  getDefaultLanguage,
  normalizeLanguage,
} from './server-i18n'

// Re-export language detection functions
export {
  getRequestLang,
  getRequestLangFromStandardRequest,
  type SupportedLang,
} from './get-request-lang'

// Re-export server-side language detection
export { getServerLang } from './get-server-lang'

// Convenience alias for getTranslation
export { getTranslation as t } from './server-i18n'

