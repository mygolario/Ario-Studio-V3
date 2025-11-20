import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Button from '@/components/Button'
import { generateSEOMetadata } from '@/lib/seo'

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
  return generateSEOMetadata('en', {
    title: 'Pricing',
    description: 'How Ario Studio scopes and prices projects. Custom-scoped projects, not cheap packages.',
    url: `${baseUrl}/en/pricing`,
  })
}

export default async function PricingPageEN() {
  const engagementTypes = [
    {
      name: 'Launch',
      phrase: 'For new ideas that need a sharp first impression.',
      bullets: [
        'Typical scope: one key page or a small set of pages',
        'Cinematic landing page for a product, campaign, or MVP',
        'Basic integrations (forms, analytics, messaging)',
        'Designed and built with Next.js, Vercel, and AI-assisted workflows',
      ],
    },
    {
      name: 'Grow',
      phrase: 'For businesses that need a solid multi-page site and smarter flows.',
      bullets: [
        'Multi-page website or a small marketing site',
        'Better content structure and navigation',
        'Key automations (email, lead capture, simple workflows)',
        'Ideal for growing local and online businesses',
      ],
    },
    {
      name: 'Elevate',
      phrase: 'For brands that want a deeper redesign or richer storytelling.',
      bullets: [
        'Strategic redesign of an existing site or brand',
        'Complex storytelling pages, sections, and interactions',
        'More advanced automations and integrations',
        'Closer collaboration and workshop-style process',
      ],
    },
  ]

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-16 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Hero/Intro Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-h1 sm:text-h1 font-semibold text-text-primary mb-4 sm:mb-6">
              How we scope projects
            </h1>
            <p className="text-body-lg text-text-secondary max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Every project is designed around your business, not a fixed template. We don&apos;t sell &quot;cheap website packages&quot; — we scope, design, and price based on your goals, complexity, and timeline.
            </p>
          </div>

          {/* Engagement Cards */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {engagementTypes.map((engagement, index) => (
              <div
                key={engagement.name}
                className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-8 hover:border-orange/50 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <h2 className="text-h4 font-semibold text-text-primary mb-3">
                  {engagement.name}
                </h2>
                <p className="text-body-sm text-text-secondary mb-4 italic">
                  {engagement.phrase}
                </p>
                <ul className="space-y-2">
                  {engagement.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-body-sm text-text-secondary">
                      <span className="text-orange mt-1.5 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="max-w-3xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
            <p className="text-body text-text-secondary text-center leading-relaxed">
              Each project is scoped individually. We&apos;ll discuss your goals, budget, and timeline in a short call, then send a clear proposal before we start.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button href="/en/start-project" variant="primary">
              Discuss your project
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
