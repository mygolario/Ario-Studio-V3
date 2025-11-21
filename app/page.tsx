import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import Process from '@/components/home/Process'
import AboutPreview from '@/components/home/AboutPreview'
import CTA from '@/components/home/CTA'
import Footer from '@/components/layout/Footer'
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
  return (
    <main className="relative bg-white">
      <Header />
      <Hero />
      <Services />
      <Process />
      <AboutPreview />
      <CTA />
      <Footer />
    </main>
  )
}

