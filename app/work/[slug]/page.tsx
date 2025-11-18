import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectBySlug as getDbProjectBySlug, getCaseStudyByProjectId } from '@/lib/db'
import { getProjectBySlug, getAllProjects } from '@/data/projects'
import CaseStudyHero from '@/components/CaseStudyHero'
import CaseStudyContent from '@/components/CaseStudyContent'
import Button from '@/components/Button'
import Footer from '@/components/Footer'

// Type for database project (inferred from Prisma)
type DbProject = NonNullable<Awaited<ReturnType<typeof getDbProjectBySlug>>>

/**
 * Generate static params for all projects
 */
export async function generateStaticParams() {
  try {
    // Try database first
    const { getProjects } = await import('@/lib/db')
    const dbProjects = await getProjects().catch(() => [])
    
    if (dbProjects.length > 0) {
      return dbProjects.map((project) => ({
        slug: project.slug,
      }))
    }
  } catch (error) {
    // Fallback to static data
  }
  
  // Fallback to static data
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

/**
 * Generate metadata for each project page
 */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Try database first
  let project: any = null
  try {
    const dbProject = await getDbProjectBySlug(params.slug).catch(() => null)
    if (dbProject) {
      project = {
        title: dbProject.title,
        subtitle: dbProject.shortDescription || '',
        overview: dbProject.longDescription || dbProject.shortDescription || '',
        heroImage: dbProject.heroImageUrl || undefined,
        slug: dbProject.slug,
      }
    }
  } catch (error) {
    // Fallback to static data
  }
  
  // Fallback to static data
  if (!project) {
    project = getProjectBySlug(params.slug)
  }

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
 * Convert database project to component format
 */
function adaptDbProjectToComponent(dbProject: DbProject) {
  return {
    slug: dbProject.slug,
    title: dbProject.title,
    subtitle: dbProject.shortDescription || '',
    role: dbProject.role || 'Design & Build',
    tags: dbProject.tags || [],
    thumbnail: dbProject.thumbnailUrl || undefined,
    heroImage: dbProject.heroImageUrl || dbProject.thumbnailUrl || undefined,
    overview: dbProject.longDescription || dbProject.shortDescription || '',
    problem: '', // Not in DB schema yet
    solution: '', // Not in DB schema yet
    stack: dbProject.tags || [], // Use tags as stack for now
    highlights: [], // Not in DB schema yet
    status: dbProject.liveUrl ? ('Live' as const) : ('In development' as const),
    sections: [],
    year: dbProject.year,
    clientName: dbProject.clientName,
    liveUrl: dbProject.liveUrl,
  }
}

/**
 * Case Study Page
 * 
 * Dynamic route for individual project case studies.
 * Uses database if available, falls back to static data.
 */
export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  // Try database first
  let project: any = null
  let dbProject: any = null
  try {
    dbProject = await getDbProjectBySlug(params.slug).catch(() => null)
    if (dbProject) {
      project = adaptDbProjectToComponent(dbProject)
    }
  } catch (error) {
    // Fallback to static data
  }
  
  // Fallback to static data
  if (!project) {
    project = getProjectBySlug(params.slug)
  }

  if (!project) {
    notFound()
  }

  // Check for case study
  const caseStudy = dbProject
    ? await getCaseStudyByProjectId(dbProject.id).catch(() => null)
    : null

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

      {/* Hero Image (if available) */}
      {project.heroImage && (
        <div className="relative w-full h-[60vh] min-h-[400px] bg-surface-alt overflow-hidden">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Hero Section */}
      <CaseStudyHero project={project} />

      {/* Content Sections */}
      <CaseStudyContent project={project} />

      {/* Case Study CTA */}
      {caseStudy && caseStudy.status === 'published' && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-h2 font-semibold text-text-primary mb-4">
                Read the full case study
              </h2>
              <p className="text-body-lg text-text-secondary mb-8 leading-relaxed">
                Learn more about the process, challenges, and results of this project.
              </p>
              <Link
                href={`/work/${params.slug}/case-study`}
                className="inline-block px-8 py-4 rounded-full bg-orange text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
              >
                Read Case Study →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Live URL Link */}
      {project.liveUrl && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-base">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full bg-orange text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
              >
                Visit Live Site →
              </a>
            </div>
          </div>
        </section>
      )}

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

