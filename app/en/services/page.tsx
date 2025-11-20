import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { servicesConfig } from '@/config/services'
import { ArrowRight } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo'

export const revalidate = 3600

/**
 * Services index page (EN)
 * 
 * Navigation & i18n:
 * - FA route: /services
 * - EN route: /en/services
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('en', {
    title: 'Services',
    description: 'Ario Studio design, build, and automation services. Full website design, landing pages, AI automations, and brand refresh.',
    url: `${baseUrl}/en/services`,
  })
}

export default async function ServicesPageEN() {
  const lang = 'en'

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-6xl mx-auto">
          {/* Intro Section */}
          <div className="text-center mb-16">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              Services
            </h1>
            <p className="text-body-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Ario Studio designs and builds cinematic, AI-assisted web experiences. Each project is scoped custom to fit your business, budget, and timeline — we don&apos;t offer cheap &quot;packages.&quot;
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {servicesConfig.map((service) => {
              const title = service.title.en
              const description = service.shortDescription.en
              const bullets = service.bullets.en

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
                  <ul className="space-y-2 mb-6">
                    {bullets.slice(0, 3).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-body-sm text-text-secondary">
                        <span className="text-orange mt-1.5 flex-shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* View Details Link */}
                  <Link
                    href={`/en/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-orange hover:gap-3 transition-all group/link"
                  >
                    <span>View details</span>
                    <ArrowRight 
                      size={16} 
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Note about pricing */}
          <div className="mt-12 pt-8 border-t border-border-subtle text-center">
            <p className="text-body-sm text-text-muted">
              Pricing is defined per project. To get a quote, please reach out via the &quot;Start a Project&quot; form.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

