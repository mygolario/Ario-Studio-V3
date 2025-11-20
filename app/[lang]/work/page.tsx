import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Portfolio from '@/components/Portfolio'
import { getServerLang } from '@/lib/i18n'


// Revalidate work listing every 3600 seconds (1 hour)
export const revalidate = 3600

/**
 * Generate metadata for work listing page (bilingual)
 */
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang === 'fa' ? 'fa' : 'en'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  const urlFa = `${baseUrl}/fa/work`
  const urlEn = `${baseUrl}/en/work`

  if (lang === 'fa') {
    return {
      title: 'کارهای ما — آریو استودیو',
      description: 'نمونه‌ای از پروژه‌هایی که با نگاه سینمایی و مبتنی بر هوش مصنوعی طراحی کرده‌ایم.',
      openGraph: {
        title: 'کارهای ما — آریو استودیو',
        description: 'نمونه‌ای از پروژه‌هایی که با نگاه سینمایی و مبتنی بر هوش مصنوعی طراحی کرده‌ایم.',
        url: urlFa,
        siteName: 'آریو استودیو',
        locale: 'fa_IR',
        type: 'website',
      },
      alternates: {
        canonical: urlFa,
        languages: {
          'fa-IR': urlFa,
          'en-US': urlEn,
        },
      },
    }
  }

  return {
    title: 'Our Work — Ario Studio',
    description: 'A selection of cinematic, AI-powered web projects we\'ve crafted.',
    openGraph: {
      title: 'Our Work — Ario Studio',
      description: 'A selection of cinematic, AI-powered web projects we\'ve crafted.',
      url: urlEn,
      siteName: 'Ario Studio',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: urlEn,
      languages: {
        'fa-IR': urlFa,
        'en-US': urlEn,
      },
    },
  }
}

/**
 * Work Listing Page
 * 
 * Displays all portfolio items (case studies) in a grid layout.
 * Uses the new Content + ContentTranslation model.
 */
export default async function WorkPage({ params }: { params: { lang: string } }) {
  const lang = params.lang === 'fa' ? 'fa' : 'en'
  
  // Fetch all published portfolio items


  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <Portfolio lang={lang} />
      <Footer />
    </main>
  )
}

