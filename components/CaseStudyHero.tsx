'use client'

import { useEffect, useRef } from 'react'
import { Project } from '@/data/projects'
import { animateSectionReveal } from '@/lib/gsapClient'

/**
 * Case Study Hero Component
 * 
 * Hero section for individual case study pages.
 */
export default function CaseStudyHero({ project }: { project: Project }) {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      animateSectionReveal(heroRef, {
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      }).catch(() => {
        // Fallback: show section immediately if GSAP fails
        if (heroRef.current) {
          heroRef.current.style.opacity = '1'
          heroRef.current.style.transform = 'translateY(0)'
        }
      })
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative py-24 md:py-32 overflow-hidden bg-base"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="mb-6">
            <span className="inline-block text-label text-text-muted bg-surface-alt border border-border-subtle px-4 py-1.5 rounded-full">
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-hero md:text-[64px] md:leading-[72px] font-semibold text-text-primary mb-6">
            {project.title}
          </h1>

          {/* Subtitle */}
          <p className="text-body-lg md:text-xl text-text-secondary mb-8 leading-relaxed">
            {project.subtitle}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            {project.role && (
              <>
                <div>
                  <span className="text-body-sm text-text-muted">Role</span>
                  <p className="text-body font-medium text-text-primary">{project.role}</p>
                </div>
                {project.stack && project.stack.length > 0 && (
                  <div className="w-px h-8 bg-border-subtle" />
                )}
              </>
            )}
            {project.stack && project.stack.length > 0 && (
              <div>
                <span className="text-body-sm text-text-muted">Stack</span>
                <p className="text-body font-medium text-text-primary">{project.stack.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-body-sm font-medium text-text-secondary bg-surface-alt border border-border-subtle px-4 py-1.5 rounded-full hover:border-orange hover:text-orange transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

