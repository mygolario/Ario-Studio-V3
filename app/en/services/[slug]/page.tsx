import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getAllServiceSlugs } from '@/config/services'

export const revalidate = 3600

/**
 * Service detail page (EN)
 * 
 * Navigation & i18n:
 * - FA route: /services/[slug]
 * - EN route: /en/services/[slug]
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  const service = getServiceBySlug(params.slug)
  
  if (!service) {
    return {}
  }
  
  const title = service.title.en
  const description = service.shortDescription.en
  
  return {
    title: `${title} | Ario Studio`,
    description,
    alternates: {
      canonical: `${baseUrl}/en/services/${params.slug}`,
      languages: {
        'fa-IR': `${baseUrl}/services/${params.slug}`,
        'en-US': `${baseUrl}/en/services/${params.slug}`,
      },
    },
  }
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export default async function ServiceDetailPageEN({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) {
    notFound()
  }

  const title = service.title.en
  const description = service.description.en
  const bullets = service.bullets.en
  const bestFor = service.bestFor?.en
  const outcome = service.outcome?.en
  const tech = service.tech?.en

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/en/services"
            className="inline-flex items-center text-body text-text-secondary hover:text-orange mb-8 transition-colors"
          >
            ← Back to Services
          </Link>

          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-h1 font-semibold text-text-primary mb-6">
              {title}
            </h1>
            <p className="text-body-lg text-text-secondary leading-relaxed mb-4">
              {description}
            </p>
            <p className="text-body-sm text-text-muted italic">
              Custom-scoped projects. No cheap &quot;packages&quot; — we design around your business, budget, and timeline.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 mb-12">
            {/* Best For */}
            {bestFor && (
              <div>
                <h2 className="text-h3 font-semibold text-text-primary mb-3">
                  Best for
                </h2>
                <p className="text-body text-text-secondary">
                  {bestFor}
                </p>
              </div>
            )}

            {/* What You Get */}
            <div>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">
                What you get
              </h2>
              <ul className="space-y-3">
                {bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-body text-text-secondary">
                    <span className="text-orange mt-1.5 flex-shrink-0">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech We Use */}
            {tech && tech.length > 0 && (
              <div>
                <h2 className="text-h3 font-semibold text-text-primary mb-4">
                  Tech we use
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tech.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-surface border border-border-subtle rounded-lg text-body-sm text-text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Outcome */}
            {outcome && (
              <div className="p-6 bg-surface border border-border-subtle rounded-xl">
                <h2 className="text-h4 font-semibold text-text-primary mb-2">
                  Outcome
                </h2>
                <p className="text-body text-text-secondary">
                  {outcome}
                </p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-border-subtle">
            <Link
              href={`/en/start-project?type=${service.slug}`}
              className="inline-flex items-center px-8 py-4 bg-orange text-pure-white font-medium rounded-lg hover:bg-orange/90 transition-colors"
            >
              Start this type of project
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

