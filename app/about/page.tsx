import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutPageContent from '@/components/pages/AboutPageContent'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('fa', {
    url: `${baseUrl}/about`,
    title: 'درباره استودیو آریو',
    description: 'درباره استودیو آریو — تجربه کاربری سینمایی، مهندسی با عملکرد بالا و نوآوری مبتنی بر هوش مصنوعی.',
  })
}

export const revalidate = 3600

export default async function AboutPage() {
  return (
    <main className="relative bg-white">
      <Header />
      <AboutPageContent lang="fa" />
      <Footer />
    </main>
  )
}
