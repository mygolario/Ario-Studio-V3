/**
 * Server-side i18n Module for Ario Studio
 * 
 * This module provides internationalization support for backend operations including:
 * - API responses (contact forms, error messages)
 * - Email templates (subject lines, body content)
 * - Server-side validation messages
 * 
 * Usage:
 *   import { getTranslation } from '@/lib/i18n/server-i18n'
 *   const message = getTranslation('fa', 'contact.success')
 * 
 * Translation Keys Structure:
 *   - contact.success: Success message for contact form submission
 *   - contact.error: Error message for contact form failures
 *   - email.contactSubject: Subject line for contact form emails
 *   - email.contactIntro: Introduction text for contact form emails
 *   - email.contactOutro: Closing text for contact form emails
 * 
 * To extend translations:
 *   1. Add new keys to the translations object below
 *   2. Follow the nested structure (e.g., 'section.subsection.key')
 *   3. Ensure both 'en' and 'fa' translations are provided
 */

type Language = 'en' | 'fa'

interface Translations {
  contact: {
    success: string
    error: string
    validation: {
      nameRequired: string
      emailRequired: string
      emailInvalid: string
      messageRequired: string
    }
  }
  email: {
    contactSubject: string
    contactIntro: string
    contactOutro: string
    autoReplySubject: string
    autoReplyBody: string
  }
}

const translations: Record<Language, Translations> = {
  en: {
    contact: {
      success: 'Your message has been sent successfully. We will get back to you soon.',
      error: 'Something went wrong. Please try again later.',
      validation: {
        nameRequired: 'Name is required',
        emailRequired: 'Valid email is required',
        emailInvalid: 'Please provide a valid email address',
        messageRequired: 'Message is required',
      },
    },
    email: {
      contactSubject: 'New contact request — Ario Studio',
      contactIntro: 'You have received a new contact form submission:',
      contactOutro: 'Please respond to this inquiry as soon as possible.',
      autoReplySubject: 'Thank you for contacting Ario Studio',
      autoReplyBody: 'We have received your message and will get back to you within 24 hours.',
    },
  },
  fa: {
    contact: {
      success: 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.',
      error: 'متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.',
      validation: {
        nameRequired: 'نام الزامی است',
        emailRequired: 'ایمیل معتبر الزامی است',
        emailInvalid: 'لطفاً یک آدرس ایمیل معتبر وارد کنید',
        messageRequired: 'پیام الزامی است',
      },
    },
    email: {
      contactSubject: 'درخواست جدید تماس — آریو استودیو',
      contactIntro: 'شما یک درخواست تماس جدید دریافت کرده‌اید:',
      contactOutro: 'لطفاً در اسرع وقت به این درخواست پاسخ دهید.',
      autoReplySubject: 'با تشکر از تماس شما با آریو استودیو',
      autoReplyBody: 'پیام شما دریافت شد و در عرض ۲۴ ساعت با شما تماس خواهیم گرفت.',
    },
  },
}

/**
 * Get a translation value by language and key path
 * 
 * @param lang - Language code ('en' or 'fa'). Defaults to 'en' if invalid
 * @param key - Dot-separated key path (e.g., 'contact.success' or 'email.contactSubject')
 * @param fallback - Optional fallback value if key is not found
 * @returns The translated string or fallback/default value
 * 
 * @example
 *   getTranslation('fa', 'contact.success')
 *   // Returns: 'پیام شما با موفقیت ارسال شد...'
 * 
 * @example
 *   getTranslation('en', 'email.contactSubject')
 *   // Returns: 'New contact request — Ario Studio'
 */
export function getTranslation(
  lang: string | undefined | null,
  key: string,
  fallback?: string
): string {
  // Normalize language: default to 'en' if invalid
  const normalizedLang: Language = lang === 'fa' ? 'fa' : 'en'
  
  // Get the translation object for the language
  const translationObj = translations[normalizedLang]
  
  // Navigate through nested keys (e.g., 'contact.success' -> translationObj.contact.success)
  const keys = key.split('.')
  let value: any = translationObj
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // Key not found - return fallback or the key itself
      return fallback ?? key
    }
  }
  
  // Return the final value if it's a string, otherwise return fallback or key
  if (typeof value === 'string') {
    return value
  }
  
  return fallback ?? key
}

/**
 * Type-safe translation getter with autocomplete support
 * 
 * @param lang - Language code ('en' or 'fa')
 * @returns An object with typed translation functions
 * 
 * @example
 *   const t = getTranslations('fa')
 *   t.contact.success // Type-safe access
 */
export function getTranslations(lang: string | undefined | null) {
  const normalizedLang: Language = lang === 'fa' ? 'fa' : 'en'
  return translations[normalizedLang]
}

/**
 * Check if a language is supported
 * 
 * @param lang - Language code to check
 * @returns true if language is supported ('en' or 'fa'), false otherwise
 */
export function isSupportedLanguage(lang: string | undefined | null): lang is Language {
  return lang === 'en' || lang === 'fa'
}

/**
 * Get the default language
 * 
 * @returns The default language code ('en')
 */
export function getDefaultLanguage(): Language {
  return 'en'
}

/**
 * Normalize language code to a supported language
 * 
 * @param lang - Language code to normalize
 * @returns A supported language code ('en' or 'fa')
 */
export function normalizeLanguage(lang: string | undefined | null): Language {
  return lang === 'fa' ? 'fa' : 'en'
}

