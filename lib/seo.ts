import type { Metadata } from 'next'

export type SupportedLocale = 'fa' | 'en'

interface SEOOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'

// Default site metadata per locale
const defaultMetadata = {
  fa: {
    title: 'آریو استودیو – طراحی سایت سینمایی با هوش مصنوعی',
    description: 'آریو استودیو وب‌سایت‌های سینمایی و هوشمند برای کسب‌وکارهای مدرن طراحی می‌کند. طراحی سایت، لندینگ پیج و اتوماسیون‌های هوش مصنوعی.',
    siteName: 'آریو استودیو',
  },
  en: {
    title: 'Ario Studio – AI-Assisted Web Design for Modern Businesses',
    description: 'Ario Studio designs and builds cinematic, AI-assisted websites for modern businesses. Custom web experiences, automations, and strategy-focused development.',
    siteName: 'Ario Studio',
  },
}

/**
 * Generate SEO metadata for a page
 * 
 * @param locale - The locale ('fa' or 'en')
 * @param options - Optional overrides for title, description, image, url, etc.
 * @returns Next.js Metadata object
 */
export function generateSEOMetadata(
  locale: SupportedLocale,
  options: SEOOptions = {}
): Metadata {
  const defaults = defaultMetadata[locale]
  const localePrefix = locale === 'en' ? '/en' : ''
  
  const title = options.title || defaults.title
  const description = options.description || defaults.description
  const url = options.url || `${baseUrl}${localePrefix}`
  const ogImage = options.image || `${baseUrl}/og/og-main.png`
  
  // Determine alternate URLs
  const urlFa = locale === 'fa' ? url : url.replace('/en', '')
  const urlEn = locale === 'en' ? url : `${baseUrl}/en${url.replace(baseUrl, '')}`
  
  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: locale === 'fa' ? '%s | آریو استودیو' : '%s | Ario Studio',
    },
    description,
    ...(options.noindex && { robots: { index: false, follow: false } }),
    openGraph: {
      type: options.type || 'website',
      siteName: defaults.siteName,
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
      languages: {
        'fa-IR': urlFa,
        'en-US': urlEn,
      },
    },
  }

  return metadata
}

/**
 * Get default metadata for a locale (useful for root layout)
 */
export function getDefaultMetadata(locale: SupportedLocale): Metadata {
  return generateSEOMetadata(locale)
}

