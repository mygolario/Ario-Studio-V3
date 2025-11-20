import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const revalidate = 3600

/**
 * Pricing page (EN)
 * 
 * Navigation & i18n:
 * - FA route: /pricing
 * - EN route: /en/pricing
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  return {
    title: 'Pricing | Ario Studio',
    description: 'Ario Studio pricing and plans',
    alternates: {
      canonical: `${baseUrl}/en/pricing`,
      languages: {
        'fa-IR': `${baseUrl}/pricing`,
        'en-US': `${baseUrl}/en/pricing`,
      },
    },
  }
}

export default async function PricingPageEN() {
  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              Pricing
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Ario Studio pricing and plans
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-text-secondary text-center">
            <p>Pricing details will be added soon.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

