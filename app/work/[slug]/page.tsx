import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getAllProjects } from '@/data/projects'
import CaseStudyHero from '@/components/CaseStudyHero'
import CaseStudyContent from '@/components/CaseStudyContent'
import Button from '@/components/Button'
import Footer from '@/components/Footer'

/**
 * Generate static params for all projects
 */
export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

/**
 * Generate metadata for each project page
 */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const baseUrl = 'https://ario-studio-v3.vercel.app'
  const ogImage = project.heroImage 
    ? `${baseUrl}${project.heroImage}` 
    : `${baseUrl}/og/og-main.png`

  return {
    title: `${project.title} – Case Study`,
    description: project.overview || project.subtitle || 'Project case study.',
    openGraph: {
      title: project.title,
      description: project.overview || project.subtitle,
      url: `${baseUrl}/work/${project.slug}`,
      siteName: 'Ario Studio',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} – Case Study`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.overview || project.subtitle,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/work/${project.slug}`,
    },
  }
}

/**
 * Case Study Page
 * 
 * Dynamic route for individual project case studies.
 * 
 * To customize content:
 * - Edit the project data in data/projects.ts
 * - Modify the layout in CaseStudyHero and CaseStudyContent components
 */
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="relative min-h-screen bg-base">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-base/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/#portfolio"
              className="text-body-sm text-text-secondary hover:text-orange transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to work
            </Link>
            <Link
              href="/#contact"
              className="text-body-sm text-text-secondary hover:text-orange transition-colors"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <CaseStudyHero project={project} />

      {/* Content Sections */}
      <CaseStudyContent project={project} />

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-surface-alt">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h1 font-semibold text-text-primary mb-4">
              Ready to start your project?
            </h2>
            <p className="text-body-lg text-text-secondary mb-8 leading-relaxed">
              Let&apos;s build something with long-term value.
            </p>
            <Button href="/#contact" variant="primary" className="!px-12 !py-5">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

