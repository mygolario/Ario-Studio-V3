import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import DesignEthos from '@/components/DesignEthos'
import About from '@/components/About'
import StartProjectSection from '@/components/StartProjectSection'
import Footer from '@/components/Footer'
import BetaNotice from '@/components/BetaNotice'
import { getProcessSteps, getHighlights } from '@/lib/db'
import { getServerLang } from '@/lib/i18n'
import { getLocalizedContentList } from '@/lib/content/queries'

// Revalidate homepage every 60 seconds
export const revalidate = 60

/**
 * Generate metadata for homepage (bilingual)
 */
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  // Since we don't use [lang] segments, we'll use the same URL for both languages
  const urlFa = baseUrl
  const urlEn = baseUrl

  if (lang === 'fa') {
    return {
      title: 'آریو استودیو — طراحی، ساخت و اتوماسیون',
      description:
        'آریو استودیو تجربه‌های وب سینمایی، متحرک و مبتنی بر هوش مصنوعی طراحی و پیاده‌سازی می‌کند. از هر پیکسل، یک تجربه می‌سازیم.',
      openGraph: {
        title: 'آریو استودیو — طراحی، ساخت و اتوماسیون',
        description:
          'تجربه‌های وبی که حس می‌شوند، نه فقط دیده. طراحی سینمایی، مهندسی مدرن و سیستم‌های هوشمند.',
        url: urlFa,
        siteName: 'آریو استودیو',
        images: [
          {
            url: '/og/og-main.png',
            width: 1200,
            height: 630,
            alt: 'آریو استودیو — طراحی، ساخت و اتوماسیون',
          },
        ],
        locale: 'fa_IR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'آریو استودیو — طراحی، ساخت و اتوماسیون',
        description:
          'تجربه‌های وبی که حس می‌شوند، نه فقط دیده.',
        images: ['/og/og-main.png'],
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

  // English version
  return {
    title: 'Ario Studio — Design • Build • Automate',
    description:
      'Cinematic UX, high-performance engineering, and AI-driven innovation. Ario Studio builds modern, expressive, and intelligent web experiences.',
    openGraph: {
      title: 'Ario Studio — Design • Build • Automate',
      description:
        'Cinematic UX, high-performance engineering, and AI-driven innovation. Ario Studio builds modern, expressive, and intelligent web experiences.',
      url: urlEn,
      siteName: 'Ario Studio',
      images: [
        {
          url: '/og/og-main.png',
          width: 1200,
          height: 630,
          alt: 'Ario Studio — Design • Build • Automate',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ario Studio — Design • Build • Automate',
      description:
        'Cinematic UX, high-performance engineering, and AI-driven innovation.',
      images: ['/og/og-main.png'],
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

export default async function Home() {
  // Detect language from server context (cookie -> Accept-Language -> default 'fa')
  const lang = await getServerLang()

  // Fetch multilingual content from database
  // TODO: Add error handling UI for when content fails to load
  // TODO: Consider adding loading skeletons for better UX
  const [servicesContent, portfolioContent, processSteps, highlights] = await Promise.all([
    getLocalizedContentList('service', lang).catch(() => []),
    getLocalizedContentList('portfolio', lang).catch(() => []),
    getProcessSteps().catch(() => []),
    getHighlights('about').catch(() => []),
  ])

  return (
    <main className="relative">
      <Header />
      {/* Scene 1: HERO */}
      <Hero />
      {/* Beta Notice (Farsi only) */}
      <BetaNotice />
      {/* Scene 2: WHAT WE DO */}
      <Services servicesContent={servicesContent} />
      {/* Scene 3: OUR WORK */}
      <Portfolio portfolioContent={portfolioContent} lang={lang} />
      {/* Scene 4: OUR PROCESS */}
      <DesignEthos processSteps={processSteps} />
      {/* Scene 5: ABOUT ARIO STUDIO */}
      <About highlights={highlights} />
      {/* Scene 6: FINAL CTA */}
      <StartProjectSection />
      <Footer />
    </main>
  )
}

