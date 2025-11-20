import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getProcessSteps, getHighlights } from '@/lib/db'
import Link from 'next/link'
import type { ProcessStep, Highlight } from '@prisma/client'

export const metadata: Metadata = {
  title: 'About | Ario Studio',
  description: 'Learn about Ario Studio—cinematic UX, high-performance engineering, and AI-driven innovation.',
  openGraph: {
    title: 'About Ario Studio',
    description: 'Cinematic UX, high-performance engineering, and AI-driven innovation.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'}/en/about`,
    languages: {
      'fa-IR': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'}/about`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'}/en/about`,
    },
  },
}

export const revalidate = 3600

export default async function AboutPageEN() {
  const [processSteps, highlights] = await Promise.all([
    getProcessSteps().catch(() => [] as ProcessStep[]),
    getHighlights('about').catch(() => [] as Highlight[]),
  ])

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-h1 font-semibold text-text-primary mb-6">
            About Ario Studio
          </h1>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Ario Studio is a cinematic, AI-driven web design practice. We blend cinematic aesthetics, 
            modern engineering, and AI automation to create digital experiences that feel alive.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-semibold text-text-primary mb-6">Our Mission</h2>
          <div className="prose prose-lg max-w-none text-text-secondary space-y-4">
            <p>
              Every project combines design, motion, and intelligent systems—crafted with precision and intention. 
              We believe that great digital experiences should be both beautiful and functional, pushing boundaries 
              while maintaining clarity and performance.
            </p>
            <p>
              From concept to launch, we combine visual storytelling, modern engineering, and AI automation to build 
              experiences that feel alive and perform in the real world.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      {processSteps.length > 0 && (
        <section className="py-20 px-4 bg-surface-alt">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-semibold text-text-primary mb-8">Our Process</h2>
            <div className="space-y-6">
              {processSteps.map((step: ProcessStep, idx: number) => (
                <div key={step.id} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange/10 border border-orange/20 flex items-center justify-center text-h4 font-semibold text-orange">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h4 font-semibold text-text-primary mb-2">{step.title}</h3>
                    <p className="text-body text-text-secondary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What Defines Our Work */}
      {highlights.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-semibold text-text-primary mb-8">What Defines Our Work</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {highlights.map((highlight: Highlight) => (
                <div key={highlight.id} className="p-6 bg-surface border border-border-subtle rounded-lg">
                  <h3 className="text-h4 font-semibold text-text-primary mb-2">{highlight.title}</h3>
                  {highlight.description && (
                    <p className="text-body text-text-secondary">{highlight.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-h2 font-semibold text-text-primary mb-4">
            Let&apos;s build something together
          </h2>
          <p className="text-body-lg text-text-secondary mb-8">
            Ready to start your project? Get in touch and let&apos;s discuss how we can bring your vision to life.
          </p>
          <Link
            href="/en/start-project"
            className="inline-flex items-center px-8 py-4 bg-orange text-pure-white font-medium rounded-lg hover:bg-orange/90 transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

