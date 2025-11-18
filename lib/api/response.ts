/**
 * API Response Helpers for Bilingual Backend
 * 
 * This module provides helper functions to create consistent, bilingual API responses.
 * All responses include translated messages based on the detected language.
 * 
 * Usage:
 *   import { getRequestLang } from '@/lib/i18n'
 *   import { jsonSuccess, jsonError } from '@/lib/api/response'
 * 
 *   const lang = getRequestLang(req)
 *   return jsonSuccess(lang, 'contact.success')
 *   return jsonError(lang, 'contact.error', 500)
 */

import { NextResponse } from 'next/server'
import { getTranslation, type SupportedLang } from '@/lib/i18n'

/**
 * Create a successful JSON response with translated message
 * 
 * @param lang - Language code ('en' or 'fa')
 * @param messageKey - Translation key (e.g., 'contact.success')
 * @param extra - Additional data to include in the response
 * @returns NextResponse with success payload
 * 
 * @example
 *   return jsonSuccess(lang, 'contact.success', { id: leadId })
 */
export function jsonSuccess(
  lang: SupportedLang,
  messageKey: string,
  extra?: Record<string, unknown>
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      message: getTranslation(lang, messageKey),
      messageKey,
      ...extra,
    },
    { status: 200 }
  )
}

/**
 * Create an error JSON response with translated message
 * 
 * @param lang - Language code ('en' or 'fa')
 * @param messageKey - Translation key (e.g., 'contact.error')
 * @param status - HTTP status code (default: 500)
 * @param extra - Additional error data to include
 * @returns NextResponse with error payload
 * 
 * @example
 *   return jsonError(lang, 'contact.validation.nameRequired', 400)
 */
export function jsonError(
  lang: SupportedLang,
  messageKey: string,
  status: number = 500,
  extra?: Record<string, unknown>
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: getTranslation(lang, messageKey),
      message: getTranslation(lang, messageKey), // Alias for consistency
      messageKey,
      ...extra,
    },
    { status }
  )
}

/**
 * Create a validation error JSON response
 * 
 * @param lang - Language code ('en' or 'fa')
 * @param messageKey - Translation key for validation error
 * @param fieldErrors - Optional field-level errors
 * @returns NextResponse with validation error payload
 * 
 * @example
 *   return jsonValidationError(lang, 'contact.validation.emailInvalid', { email: 'Invalid format' })
 */
export function jsonValidationError(
  lang: SupportedLang,
  messageKey: string,
  fieldErrors?: Record<string, string>
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: getTranslation(lang, messageKey),
      message: getTranslation(lang, messageKey),
      messageKey,
      errors: fieldErrors,
    },
    { status: 400 }
  )
}

