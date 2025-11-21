import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutPageContent from '@/components/pages/AboutPageContent'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('en', {
    url: `${baseUrl}/en/about`,
    title: 'About Ario Studio',
    description: 'About Ario Studio — Cinematic UX, high-performance engineering, and AI-driven innovation.',
  })
}

export const revalidate = 3600

export default async function AboutPageEN() {
  return (
    <main className="relative bg-white">
      <Header />
      <AboutPageContent lang="en" />
      <Footer />
    </main>
  )
}
