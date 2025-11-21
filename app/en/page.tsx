import type { Metadata } from 'next'
import HomePageV2 from '@/components/home/HomePageV2'
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
  return <HomePageV2 />
}

