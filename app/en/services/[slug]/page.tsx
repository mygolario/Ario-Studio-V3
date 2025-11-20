import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600

const serviceSlugs = ['full-website', 'landing-page', 'ai-automation', 'brand-refresh']

const serviceData: Record<string, { title: string; description: string }> = {
  'full-website': {
    title: 'Full Website',
    description: 'Complete website design and development with all required features',
  },
  'landing-page': {
    title: 'Landing Page',
    description: 'Optimized landing page design and development for conversion',
  },
  'ai-automation': {
    title: 'AI Automation',
    description: 'AI systems and automation integration for your business',
  },
  'brand-refresh': {
    title: 'Brand Refresh',
    description: 'Redesign and modernize your brand visual identity',
  },
}

/**
 * Service detail page (EN)
 * 
 * Navigation & i18n:
 * - FA route: /services/[slug]
 * - EN route: /en/services/[slug]
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  const service = serviceData[params.slug]
  
  if (!service) {
    return {}
  }
  
  return {
    title: `${service.title} | Ario Studio`,
    description: service.description,
    alternates: {
      canonical: `${baseUrl}/en/services/${params.slug}`,
      languages: {
        'fa-IR': `${baseUrl}/services/${params.slug}`,
        'en-US': `${baseUrl}/en/services/${params.slug}`,
      },
    },
  }
}

export default async function ServiceDetailPageEN({ params }: { params: { slug: string } }) {
  if (!serviceSlugs.includes(params.slug)) {
    notFound()
  }

  const service = serviceData[params.slug]

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

          <h1 className="text-h1 font-semibold text-text-primary mb-6">
            {service.title}
          </h1>
          
          <div className="prose prose-lg max-w-none text-text-secondary space-y-4 mb-12">
            <p>{service.description}</p>
            <p>Full service details will be added soon.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-border-subtle">
            <Link
              href="/en/start-project"
              className="inline-flex items-center px-8 py-4 bg-orange text-pure-white font-medium rounded-lg hover:bg-orange/90 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

