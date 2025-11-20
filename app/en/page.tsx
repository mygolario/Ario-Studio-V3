import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ServicesOverview from '@/components/ServicesOverview'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import DesignEthos from '@/components/DesignEthos'
import About from '@/components/About'
import StartProjectSection from '@/components/StartProjectSection'
import Footer from '@/components/Footer'
import BetaNotice from '@/components/BetaNotice'
import { getProcessSteps, getHighlights } from '@/lib/db'
import { getLocalizedContentList } from '@/lib/content/queries'

// Revalidate homepage every 60 seconds
export const revalidate = 60

/**
 * Generate metadata for EN homepage
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  const urlEn = `${baseUrl}/en`

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
        'fa-IR': baseUrl,
        'en-US': urlEn,
      },
    },
  }
}

export default async function HomeEN() {
  // Force EN language for this route
  const lang = 'en'

  // Fetch multilingual content from database
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
      {/* Scene 2: SERVICES OVERVIEW */}
      <ServicesOverview />
      {/* Scene 3: WHAT WE DO */}
      <Services servicesContent={servicesContent} lang={lang} />
      {/* Scene 4: OUR WORK */}
      <Portfolio portfolioContent={portfolioContent} lang={lang} />
      {/* Scene 5: OUR PROCESS */}
      <DesignEthos processSteps={processSteps} />
      {/* Scene 6: ABOUT ARIO STUDIO */}
      <About highlights={highlights} />
      {/* Scene 7: FINAL CTA */}
      <StartProjectSection />
      <Footer />
    </main>
  )
}

