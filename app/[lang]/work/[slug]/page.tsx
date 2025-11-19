import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocalizedContentBySlug, getLocalizedContentList } from '@/lib/content/queries'
import { type SupportedLang } from '@/lib/i18n'
import CaseStudyTemplate from '@/components/case-study/CaseStudyTemplate'
import Footer from '@/components/Footer'

// Revalidate case study pages every 60 seconds
export const revalidate = 60

/**
 * Generate static params for all portfolio items
 * 
 * Generates params for both languages (fa and en) for each portfolio item.
 */
export async function generateStaticParams() {
  try {
    // Get all portfolio items (using English as base for slug)
    const portfolioItems = await getLocalizedContentList('portfolio', 'en').catch(() => [])
    
    // Generate params for both languages
    const params: Array<{ lang: string; slug: string }> = []
    
    for (const item of portfolioItems) {
      params.push({ lang: 'fa', slug: item.slug })
      params.push({ lang: 'en', slug: item.slug })
    }
    
    return params
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

/**
 * Generate metadata for each case study page (bilingual)
 */
export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata> {
  const lang: SupportedLang = params.lang === 'fa' ? 'fa' : 'en'
  const slug = params.slug

  const item = await getLocalizedContentBySlug(slug, lang).catch(() => null)

  if (!item) {
    return {
      title: lang === 'fa' ? 'نمونه‌کار پیدا نشد' : 'Case study not found',
      description: lang === 'fa' ? 'صفحه مورد نظر یافت نشد.' : 'The requested page was not found.',
    }
  }

  const baseUrlEnv = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ariostudio.net'
  const baseUrl = baseUrlEnv.endsWith('/') ? baseUrlEnv.slice(0, -1) : baseUrlEnv

  const urlFa = `${baseUrl}/fa/work/${slug}`
  const urlEn = `${baseUrl}/en/work/${slug}`

  const title = item.metaTitle || item.title
  const description = item.metaDescription || item.excerpt || undefined

  const featuredImageAbsolute = item.featuredImage
    ? item.featuredImage.startsWith('http')
      ? item.featuredImage
      : `${baseUrl}${item.featuredImage.startsWith('/') ? '' : '/'}${item.featuredImage}`
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description: description ?? '',
      url: lang === 'fa' ? urlFa : urlEn,
      type: 'article',
      images: featuredImageAbsolute ? [{ url: featuredImageAbsolute }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? '',
      images: featuredImageAbsolute ? [featuredImageAbsolute] : undefined,
    },
    alternates: {
      canonical: lang === 'fa' ? urlFa : urlEn,
      languages: {
        'fa-IR': urlFa,
        'en-US': urlEn,
      },
    },
  }
}

/**
 * Case Study Detail Page (Bilingual)
 * 
 * Dynamic route for individual portfolio case studies.
 * Route: /[lang]/work/[slug]
 * 
 * Features:
 * - Fetches content from getLocalizedContentBySlug
 * - Uses CaseStudyTemplate for consistent structure
 * - Full bilingual support (FA/EN)
 * - Fallback to English if requested language not available
 * - Placeholder support for missing content
 */
export default async function CaseStudyPage({ 
  params 
}: { 
  params: { lang: string; slug: string } 
}) {
  // Normalize language
  const lang: SupportedLang = params.lang === 'fa' ? 'fa' : 'en'
  
  // Fetch localized content
  let item = await getLocalizedContentBySlug(params.slug, lang).catch(() => null)
  
  // Fallback to English if requested language not available
  if (!item && lang !== 'en') {
    item = await getLocalizedContentBySlug(params.slug, 'en').catch(() => null)
  }

  // If still not found, show 404
  if (!item) {
    notFound()
  }

  // Ensure we only show portfolio items
  if (item.type !== 'portfolio') {
    notFound()
  }

  return (
    <>
      <CaseStudyTemplate item={item} lang={lang} />
      <Footer />
    </>
  )
}

