import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getLocalizedContentList } from '@/lib/content/queries'
import Link from 'next/link'

export const revalidate = 3600

/**
 * Services index page (FA)
 * 
 * Navigation & i18n:
 * - FA route: /services (always Farsi, route determines language)
 * - EN route: /en/services
 * - Route path determines language, not user preference cookie
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  // This is a FA route, always return Farsi metadata
  return {
    title: 'خدمات | آریو استودیو',
    description: 'خدمات طراحی، ساخت و اتوماسیون آریو استودیو',
    alternates: {
      canonical: `${baseUrl}/services`,
      languages: {
        'fa-IR': `${baseUrl}/services`,
        'en-US': `${baseUrl}/en/services`,
      },
    },
  }
}

export default async function ServicesPage() {
  // This is a FA route, always use Farsi language
  const lang = 'fa'
  const servicesContent = await getLocalizedContentList('service', lang).catch(() => [])

  const servicePages = [
    { slug: 'full-website', title: lang === 'fa' ? 'وب‌سایت کامل' : 'Full Website' },
    { slug: 'landing-page', title: lang === 'fa' ? 'صفحه فرود' : 'Landing Page' },
    { slug: 'ai-automation', title: lang === 'fa' ? 'اتوماسیون هوش مصنوعی' : 'AI Automation' },
    { slug: 'brand-refresh', title: lang === 'fa' ? 'بازطراحی برند' : 'Brand Refresh' },
  ]

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              {lang === 'fa' ? 'خدمات' : 'Services'}
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              {lang === 'fa' 
                ? 'خدمات طراحی، ساخت و اتوماسیون آریو استودیو'
                : 'Ario Studio design, build, and automation services'}
            </p>
          </div>

          {/* Service Pages Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {servicePages.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="p-6 bg-surface border border-border-subtle rounded-xl hover:border-orange/50 hover:shadow-card-hover transition-all"
              >
                <h2 className="text-h4 font-semibold text-text-primary mb-2">
                  {service.title}
                </h2>
                <p className="text-body text-text-secondary">
                  {lang === 'fa' 
                    ? 'جزئیات این سرویس به زودی اضافه خواهد شد.'
                    : 'Service details will be added soon.'}
                </p>
              </Link>
            ))}
          </div>

          {/* Services from Database */}
          {servicesContent.length > 0 && (
            <div>
              <h2 className="text-h2 font-semibold text-text-primary mb-8">
                {lang === 'fa' ? 'خدمات ما' : 'Our Services'}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {servicesContent.map((service: any) => (
                  <div
                    key={service.id}
                    className="p-6 bg-surface border border-border-subtle rounded-xl"
                  >
                    <h3 className="text-h4 font-semibold text-text-primary mb-2">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-body text-text-secondary">
                        {service.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

