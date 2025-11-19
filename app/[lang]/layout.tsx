import { type SupportedLang } from '@/lib/i18n'

/**
 * Layout for [lang] route segment
 * 
 * This layout ensures that the html lang and dir attributes
 * are correctly set based on the language parameter.
 * 
 * Note: The root layout already handles this, but this ensures
 * consistency for [lang] routes.
 */
export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Normalize language
  const lang: SupportedLang = params.lang === 'fa' ? 'fa' : 'en'
  
  // The actual lang and dir are set in root layout
  // This layout just passes through
  return <>{children}</>
}

