import type { Metadata } from 'next'
import HeaderV2 from '@/components/v2/HeaderV2'
import AnimatedBackground from '@/components/v2/AnimatedBackground'
import HeroV2 from '@/components/v2/HeroV2'
import StatsV2 from '@/components/v2/StatsV2'
import ServicesV2 from '@/components/v2/ServicesV2'
import ProcessV2 from '@/components/v2/ProcessV2'
import ShowcaseV2 from '@/components/v2/ShowcaseV2'
import CTAV2 from '@/components/v2/CTAV2'
import FooterV2 from '@/components/v2/FooterV2'
import { generateSEOMetadata } from '@/lib/seo'

/**
 * Homepage V2 - Dark Cinematic Theme
 * 
 * This is the new dark-themed homepage based on the provided HTML design.
 * To use this, rename this file to page.tsx or create a route to switch themes.
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('fa', {
    url: baseUrl,
  })
}

export default async function HomePageV2() {
  return (
    <main className="relative min-h-screen v2-dark">
      <AnimatedBackground />
      <div className="relative z-10">
        <HeaderV2 />
        <HeroV2 />
        <StatsV2 />
        <ServicesV2 />
        <ProcessV2 />
        <ShowcaseV2 />
        <CTAV2 />
        <FooterV2 />
      </div>
    </main>
  )
}

