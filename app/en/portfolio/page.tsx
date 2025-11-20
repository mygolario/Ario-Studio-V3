import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getProjects } from '@/lib/db'
import Image from 'next/image'

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
  
  return {
    title: 'Portfolio | Ario Studio',
    description: 'Ario Studio portfolio and case studies',
    alternates: {
      canonical: `${baseUrl}/en/portfolio`,
      languages: {
        'fa-IR': `${baseUrl}/portfolio`,
        'en-US': `${baseUrl}/en/portfolio`,
      },
    },
  }
}

export default async function PortfolioPageEN() {
  const projects = await getProjects().catch(() => [])

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return a.isFeatured ? -1 : 1
    }
    if (a.order !== b.order) {
      return a.order - b.order
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

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
            <p className="text-body-sm text-text-muted italic">
              Our case studies and portfolio pieces will be published here soon.
            </p>
          </div>

          {sortedProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {sortedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/en/work/${project.slug}`}
                  className="group bg-surface rounded-xl overflow-hidden border border-border-subtle hover:shadow-card-hover hover:-translate-y-2 hover:border-orange/50 transition-all duration-300 cursor-pointer block relative"
                >
                  {project.thumbnailUrl && (
                    <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl">
                      <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-h4 font-semibold text-text-primary mb-2 group-hover:text-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-body text-text-secondary">
                      {project.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary">
                No projects available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

