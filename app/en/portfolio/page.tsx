import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllProjects } from '@/lib/portfolio'
import { generateSEOMetadata } from '@/lib/seo'

export const revalidate = 3600

/**
 * Portfolio page (EN)
 * 
 * Navigation & i18n:
 * - FA route: /portfolio
 * - EN route: /en/portfolio
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('en', {
    title: 'Portfolio',
    description: 'Ario Studio portfolio and case studies. Web design projects, landing pages, and AI automation work.',
    url: `${baseUrl}/en/portfolio`,
  })
}

export default async function PortfolioPageEN() {
  const projects = getAllProjects('en')

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              Portfolio
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-4">
              Ario Studio portfolio and case studies
            </p>
            <p className="text-body text-text-secondary max-w-2xl mx-auto mb-6">
              Our case studies and portfolio pieces will be published here soon. Ario Studio is currently focused on building the first set of live projects.
            </p>
            <p className="text-body-sm text-text-muted">
              You can still contact us via the &quot;Start a Project&quot; page.
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-surface rounded-xl overflow-hidden border border-border-subtle hover:shadow-card-hover hover:-translate-y-2 hover:border-orange/50 transition-all duration-300 relative"
                >
                  {project.thumbnailUrl && (
                    <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-h4 font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-body text-text-secondary mb-3">
                      {project.shortDescription}
                    </p>
                    {project.status === 'coming-soon' && (
                      <span className="inline-block text-body-sm text-text-muted bg-surface-alt border border-border-subtle px-3 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          
          <div className="text-center">
            <p className="text-body text-text-secondary max-w-2xl mx-auto mb-6">
              Full case studies and portfolio pieces will be published here soon.
            </p>
            <p className="text-body-sm text-text-muted">
              You can still contact us via the &quot;Start a Project&quot; page.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

