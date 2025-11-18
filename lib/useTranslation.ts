import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/content/translations'

/**
 * Hook to get translations based on current language
 * Defaults to Farsi if language context is not available
 */
export function useTranslation() {
  const { language } = useLanguage()
  return translations[language] || translations.fa
}

