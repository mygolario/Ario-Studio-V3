import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getLocalizedContentBySlug, getLocalizedContentList } from '@/lib/content/queries'
import { getServerLang } from '@/lib/i18n'
import { type SupportedLang } from '@/lib/i18n'
import CaseStudyHero from '@/components/CaseStudyHero'
import CaseStudyContent from '@/components/CaseStudyContent'
import Button from '@/components/Button'
import Footer from '@/components/Footer'

// Revalidate project pages every 3600 seconds (1 hour)
export const revalidate = 3600

/**
 * Generate static params for all portfolio items
 * 
 * TODO: Consider generating params for both languages if using [lang] segments
 * TODO: Add support for draft/unpublished items (exclude from static generation)
 */
export async function generateStaticParams() {
  try {
    // Get all portfolio items (we'll generate for both languages)
    const portfolioItems = await getLocalizedContentList('portfolio', 'en').catch(() => [])
    
    return portfolioItems.map((item) => ({
      slug: item.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

/**
 * Generate metadata for each portfolio page (bilingual)
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Detect language from server context
  const lang = await getServerLang()
  const slug = params.slug

  // Fetch localized content
  const item = await getLocalizedContentBySlug(slug, lang).catch(() => null)

  if (!item) {
    return {
      title: lang === 'fa' ? 'نمونه کار پیدا نشد' : 'Case Study Not Found',
      description: lang === 'fa' ? 'صفحه مورد نظر یافت نشد.' : 'The requested page was not found.',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  const ogImage = `${baseUrl}/og/og-main.png`
  
  // URLs for hreflang (same URL, language detected from context)
  const urlFa = `${baseUrl}/work/${item.slug}`
  const urlEn = `${baseUrl}/work/${item.slug}`

  return {
    title: item.metaTitle || item.title,
    description: item.metaDescription || item.excerpt || item.subtitle || '',
    openGraph: {
      title: item.metaTitle || item.title,
      description: item.metaDescription || item.excerpt || item.subtitle || '',
      url: lang === 'fa' ? urlFa : urlEn,
      siteName: 'Ario Studio',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
      type: 'article',
      locale: lang === 'fa' ? 'fa_IR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.metaTitle || item.title,
      description: item.metaDescription || item.excerpt || item.subtitle || '',
      images: [ogImage],
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
 * Convert LocalizedContent to component format
 */
function adaptLocalizedContentToComponent(item: any) {
  // Determine status from tags or use default
  let status: 'Live' | 'In development' | 'Concept' | 'Internal project' = 'In development'
  
  if (item.tags && Array.isArray(item.tags)) {
    const statusTag = item.tags.find((tag: string) => 
      tag.toLowerCase().includes('live') || 
      tag.toLowerCase().includes('فعال') ||
      tag.toLowerCase().includes('concept') ||
      tag.toLowerCase().includes('کانسپت')
    )
    if (statusTag) {
      if (statusTag.toLowerCase().includes('live') || statusTag.includes('فعال')) {
        status = 'Live'
      } else if (statusTag.toLowerCase().includes('concept') || statusTag.includes('کانسپت')) {
        status = 'Concept'
      }
    }
  }

  return {
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle || item.excerpt || '',
    role: 'Design & Build',
    tags: item.tags || [],
    thumbnail: undefined, // Can be extended later
    heroImage: undefined, // Can be extended later
    overview: item.body || item.excerpt || item.subtitle || '',
    problem: '', // Can be extended in Content model later
    solution: '', // Can be extended in Content model later
    stack: item.tags || [],
    highlights: [],
    status: status,
    sections: [],
    year: undefined,
    clientName: undefined,
    liveUrl: undefined,
  }
}

/**
 * Case Study Page (Bilingual)
 * 
 * Dynamic route for individual portfolio case studies.
 * Uses multilingual content system with fallback logic.
 */
export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  // Detect language from server context
  const lang = await getServerLang()
  
  // Fetch localized content
  let item = await getLocalizedContentBySlug(params.slug, lang).catch(() => null)
  
  // Fallback to English if requested language not available
  if (!item && lang !== 'en') {
    item = await getLocalizedContentBySlug(params.slug, 'en').catch(() => null)
  }

  if (!item) {
    notFound()
  }

  // Convert to component format
  const project = adaptLocalizedContentToComponent(item)

  // Get translations for UI strings
  const backToWorkText = lang === 'fa' ? 'بازگشت به کارها' : 'Back to work'
  const startProjectText = lang === 'fa' ? 'شروع پروژه' : 'Start a project'
  const readyToStartText = lang === 'fa' ? 'آماده شروع پروژه خود هستید؟' : 'Ready to start your project?'
  const letsBuildText = lang === 'fa' ? 'بیایید چیزی با ارزش بلندمدت بسازیم.' : "Let's build something with long-term value."
  const startYourProjectText = lang === 'fa' ? 'شروع پروژه شما' : 'Start Your Project'

  return (
    <main className="relative min-h-screen bg-base">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-base/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/#portfolio"
              className="text-body-sm text-text-secondary hover:text-orange transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {backToWorkText}
            </Link>
            <Link
              href="/#contact"
              className="text-body-sm text-text-secondary hover:text-orange transition-colors"
            >
              {startProjectText}
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Image (if available) */}
      {project.heroImage && (
        <div className="relative w-full h-[60vh] min-h-[400px] bg-surface-alt overflow-hidden">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Hero Section */}
      <CaseStudyHero project={project} />

      {/* Content Sections */}
      <CaseStudyContent project={project} />

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-surface-alt">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h1 font-semibold text-text-primary mb-4 rtl:text-right">
              {readyToStartText}
            </h2>
            <p className="text-body-lg text-text-secondary mb-8 leading-relaxed rtl:text-right">
              {letsBuildText}
            </p>
            <Button href="/#contact" variant="primary" className="!px-12 !py-5">
              {startYourProjectText}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

