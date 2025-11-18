/**
 * Server-side i18n Module - Public API
 * 
 * Re-exports all i18n functions for convenient importing
 */

export {
  getTranslation,
  getTranslations,
  isSupportedLanguage,
  getDefaultLanguage,
  normalizeLanguage,
} from './server-i18n'

export {
  getRequestLang,
  getRequestLangFromStandardRequest,
  type SupportedLang,
} from './get-request-lang'

