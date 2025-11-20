import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const revalidate = 3600

/**
 * Pricing page (FA)
 * 
 * Navigation & i18n:
 * - FA route: /pricing (always Farsi, route determines language)
 * - EN route: /en/pricing
 * - Route path determines language, not user preference cookie
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  // This is a FA route, always return Farsi metadata
  return {
    title: 'قیمت‌گذاری | آریو استودیو',
    description: 'قیمت‌گذاری و پلن‌های آریو استودیو',
    alternates: {
      canonical: `${baseUrl}/pricing`,
      languages: {
        'fa-IR': `${baseUrl}/pricing`,
        'en-US': `${baseUrl}/en/pricing`,
      },
    },
  }
}

export default async function PricingPage() {
  // This is a FA route, always use Farsi language
  const lang = 'fa'

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              {lang === 'fa' ? 'قیمت‌گذاری' : 'Pricing'}
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              {lang === 'fa' 
                ? 'قیمت‌گذاری و پلن‌های آریو استودیو'
                : 'Ario Studio pricing and plans'}
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-text-secondary text-center">
            <p>
              {lang === 'fa' 
                ? 'جزئیات قیمت‌گذاری به زودی اضافه خواهد شد.'
                : 'Pricing details will be added soon.'}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

