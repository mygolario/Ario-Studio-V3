import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { servicesConfig } from '@/config/services'
import { ArrowRight } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo'

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
  return generateSEOMetadata('fa', {
    title: 'خدمات',
    description: 'خدمات طراحی، ساخت و اتوماسیون آریو استودیو. طراحی وب‌سایت، لندینگ پیج، اتوماسیون‌های هوش مصنوعی و نوسازی برند.',
    url: `${baseUrl}/services`,
  })
}

export default async function ServicesPage() {
  // This is a FA route, always use Farsi language
  const lang = 'fa'

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-6xl mx-auto">
          {/* Intro Section */}
          <div className="text-center mb-16 rtl">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              خدمات
            </h1>
            <p className="text-body-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              آریو استودیو تجربه‌های وب سینمایی و مبتنی بر هوش مصنوعی را طراحی و می‌سازد. هر پروژه به صورت اختصاصی و متناسب با کسب‌وکار، بودجه و زمان‌بندی شما طراحی می‌شود — ما پکیج‌های آماده و ارزان ارائه نمی‌دهیم.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {servicesConfig.map((service) => {
              const title = service.title.fa
              const description = service.shortDescription.fa
              const bullets = service.bullets.fa

              return (
                <div
                  key={service.slug}
                  className="group bg-surface border border-border-subtle rounded-xl p-6 hover:border-orange/50 hover:shadow-card-hover transition-all"
                >
                  <h2 className="text-h4 font-semibold text-text-primary mb-3">
                    {title}
                  </h2>
                  <p className="text-body text-text-secondary mb-4 leading-relaxed">
                    {description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-6 rtl">
                    {bullets.slice(0, 3).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-body-sm text-text-secondary">
                        <span className="text-orange mt-1.5 flex-shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* View Details Link */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-orange hover:gap-3 transition-all group/link rtl"
                  >
                    <span>مشاهده جزئیات</span>
                    <ArrowRight 
                      size={16} 
                      className="transition-transform group-hover/link:translate-x-1 rtl:rotate-180"
                    />
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Note about pricing */}
          <div className="mt-12 pt-8 border-t border-border-subtle text-center rtl">
            <p className="text-body-sm text-text-muted">
              قیمت‌گذاری برای هر پروژه به صورت اختصاصی تعیین می‌شود. برای دریافت پیشنهاد قیمت، لطفاً از طریق فرم «شروع پروژه» با ما تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

