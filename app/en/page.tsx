import type { Metadata } from 'next'
import Header from '@/components/Header'
import HeroTimeline from '@/components/home/HeroTimeline'
import ServicesGrid from '@/components/home/ServicesGrid'
import ProcessTimeline from '@/components/home/ProcessTimeline'
import FinalCTA from '@/components/home/FinalCTA'
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
      {/* Scene 1: HERO TIMELINE */}
      <HeroTimeline />
      {/* Beta Notice (Farsi only) */}
      <BetaNotice />
      {/* Scene 2: SERVICES GRID */}
      <ServicesGrid servicesContent={servicesContent} lang={lang} />
      {/* Scene 3: PROCESS TIMELINE */}
      <ProcessTimeline processSteps={processSteps} />
      {/* Scene 4: FINAL CTA */}
      <FinalCTA />
      <Footer />
    </main>
  )
}

