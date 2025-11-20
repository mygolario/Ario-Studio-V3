import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const revalidate = 3600

/**
 * FAQ page (EN)
 * 
 * Navigation & i18n:
 * - FA route: /faq
 * - EN route: /en/faq
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  return {
    title: 'FAQ | Ario Studio',
    description: 'Frequently asked questions about Ario Studio',
    alternates: {
      canonical: `${baseUrl}/en/faq`,
      languages: {
        'fa-IR': `${baseUrl}/faq`,
        'en-US': `${baseUrl}/en/faq`,
      },
    },
  }
}

export default async function FAQPageEN() {
  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              FAQ
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Frequently asked questions about Ario Studio
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-text-secondary text-center">
            <p>FAQ content will be added soon.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

