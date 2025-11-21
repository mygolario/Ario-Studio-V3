import type { Metadata } from 'next'
import Header from '@/components/Header'
import HeroTimeline from '@/components/home/HeroTimeline'
import ServicesGrid from '@/components/home/ServicesGrid'
import ProcessTimeline from '@/components/home/ProcessTimeline'
import FinalCTA from '@/components/home/FinalCTA'
import Footer from '@/components/Footer'
import BetaNotice from '@/components/BetaNotice'
import { getProcessSteps, getHighlights } from '@/lib/db'
import { getServerLang } from '@/lib/i18n'
import { getLocalizedContentList } from '@/lib/content/queries'
import { generateSEOMetadata } from '@/lib/seo'

// Revalidate homepage every 60 seconds
export const revalidate = 60

/**
 * Generate metadata for homepage (FA)
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('fa', {
    url: baseUrl,
  })
}

export default async function HomePage() {
  const lang = 'fa'

  // Fetch multilingual content from database
  // TODO: Add error handling UI for when content fails to load
  // TODO: Consider adding loading skeletons for better UX
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

