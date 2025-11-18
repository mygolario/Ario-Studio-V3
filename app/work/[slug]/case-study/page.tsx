import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getCaseStudyByProjectId, getProjects } from '@/lib/db'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export async function generateStaticParams() {
  const projects = await getProjects().catch(() => [])
  const caseStudies = await Promise.all(
    projects.map(async (project) => {
      const caseStudy = await getCaseStudyByProjectId(project.id).catch(() => null)
      return caseStudy ? { slug: project.slug } : null
    })
  )
  return caseStudies.filter((item): item is { slug: string } => item !== null)
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProjectBySlug(params.slug).catch(() => null)
  if (!project) {
    return {
      title: 'Case Study Not Found',
    }
  }

  const caseStudy = await getCaseStudyByProjectId(project.id).catch(() => null)
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'

  return {
    title: `${caseStudy.title} | Ario Studio`,
    description: caseStudy.summary,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      images: caseStudy.heroImageUrl ? [caseStudy.heroImageUrl] : [],
      url: `${baseUrl}/work/${params.slug}/case-study`,
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.summary,
      images: caseStudy.heroImageUrl ? [caseStudy.heroImageUrl] : [],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProjectBySlug(params.slug).catch(() => null)

  if (!project) {
    notFound()
  }

  const caseStudy = await getCaseStudyByProjectId(project.id).catch(() => null)

  if (!caseStudy || caseStudy.status !== 'published') {
    notFound()
  }

  return (
    <main className="relative min-h-screen bg-base">
      <Header />

      {/* Hero Image */}
      {caseStudy.heroImageUrl && (
        <div className="relative w-full h-[60vh] min-h-[400px] bg-surface-alt overflow-hidden">
          <Image
            src={caseStudy.heroImageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Case Study Content */}
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 text-body-sm text-text-secondary hover:text-orange transition-colors mb-8"
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
            Back to {project.title}
          </Link>

          {/* Title */}
          <h1 className="text-hero md:text-[64px] md:leading-[72px] font-semibold text-text-primary mb-6">
            {caseStudy.title}
          </h1>

          {/* Summary */}
          <p className="text-body-lg text-text-secondary mb-12 leading-relaxed">
            {caseStudy.summary}
          </p>

          {/* Challenge Section */}
          <section className="mb-12">
            <h2 className="text-h2 font-semibold text-text-primary mb-6">Challenge</h2>
            <div className="text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
              {caseStudy.challenge}
            </div>
          </section>

          {/* Solution Section */}
          <section className="mb-12">
            <h2 className="text-h2 font-semibold text-text-primary mb-6">Solution</h2>
            <div className="text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
              {caseStudy.solution}
            </div>
          </section>

          {/* Results Section */}
          <section className="mb-12">
            <h2 className="text-h2 font-semibold text-text-primary mb-6">Results</h2>
            <div className="text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
              {caseStudy.results}
            </div>
          </section>

          {/* Metrics Section */}
          {caseStudy.metrics && (
            <section className="mb-12">
              <h2 className="text-h2 font-semibold text-text-primary mb-6">Metrics</h2>
              <div className="bg-surface border border-border-subtle rounded-xl p-6">
                <pre className="text-body-sm text-text-secondary font-mono whitespace-pre-wrap">
                  {JSON.stringify(caseStudy.metrics, null, 2)}
                </pre>
              </div>
            </section>
          )}

          {/* Long-form Content */}
          {caseStudy.content && (
            <section className="mb-12">
              <div className="text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
                {caseStudy.content}
              </div>
            </section>
          )}

          {/* CTA to Project */}
          <div className="mt-16 pt-8 border-t border-border-subtle">
            <Link
              href={`/work/${project.slug}`}
              className="inline-block px-8 py-4 rounded-full bg-orange text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
            >
              View Project →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

