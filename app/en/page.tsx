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
import { generateSEOMetadata } from '@/lib/seo'

// Revalidate homepage every 60 seconds
export const revalidate = 60

/**
 * Generate metadata for EN homepage
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('en', {
    url: `${baseUrl}/en`,
  })
}

export default async function HomeEN() {
  // Force EN language for this route
  const lang = 'en'

  // Fetch multilingual content from database
  const [servicesContent, processSteps, highlights] = await Promise.all([
    getLocalizedContentList('service', lang).catch(() => []),
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
      <Portfolio lang={lang} />
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

