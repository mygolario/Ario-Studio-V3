'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { animateSectionReveal } from '@/lib/gsapClient'
import { getAllProjects } from '@/data/projects'

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const projects = getAllProjects()

  useEffect(() => {
    if (sectionRef.current) {
      animateSectionReveal(sectionRef, {
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-32 overflow-hidden bg-surface-alt"
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <h2 className="text-h1 font-semibold text-text-primary mb-4">
                Our Work
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Selected projects showcasing clean design and reliable engineering.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                data-animate-child
                className="group bg-surface rounded-xl overflow-hidden border border-border-subtle hover:shadow-card-hover hover:-translate-y-2 transition-all duration-200 cursor-pointer block"
              >
                {/* Image Placeholder with Overlay */}
                <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-alt to-elevated group-hover:scale-110 transition-transform duration-500 ease-out" />
                  
                  {/* Overlay - appears on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-6">
                      <p className="text-pure-white text-body font-medium mb-2">{project.title}</p>
                      <p className="text-pure-white/80 text-body-sm">{project.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Default content - hidden on hover */}
                  <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
                    <p className="text-text-muted text-sm">View case study</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-h4 font-semibold text-text-primary group-hover:text-orange transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-label text-text-muted bg-surface-alt border border-border-subtle px-2 py-1 rounded text-xs">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-body text-text-secondary mb-4">
                    {project.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-label text-text-muted bg-surface-alt border border-border-subtle px-3 py-1 rounded-full hover:border-orange hover:text-orange hover:bg-orange/5 transition-all duration-200 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
