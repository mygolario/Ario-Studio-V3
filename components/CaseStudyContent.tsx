'use client'

import { useEffect, useRef } from 'react'
import { Project } from '@/data/projects'
import { animateSectionReveal } from '@/lib/gsapClient'

/**
 * Case Study Content Component
 * 
 * Main content sections for case study pages.
 */
export default function CaseStudyContent({ project }: { project: Project }) {
  const overviewRef = useRef<HTMLElement>(null)
  const problemRef = useRef<HTMLElement>(null)
  const solutionRef = useRef<HTMLElement>(null)
  const highlightsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const refs = [overviewRef, problemRef, solutionRef, highlightsRef]
    refs.forEach((ref) => {
      if (ref.current) {
        animateSectionReveal(ref, {
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        }).catch(() => {
          // Fallback: show section immediately if GSAP fails
          if (ref.current) {
            ref.current.style.opacity = '1'
            ref.current.style.transform = 'translateY(0)'
          }
        })
      }
    })
  }, [])

  return (
    <>
      {/* Overview Section */}
      <section
        ref={overviewRef}
        className="relative py-16 md:py-24 overflow-hidden bg-surface-alt"
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-semibold text-text-primary mb-6">
              Overview
            </h2>
            <p className="text-body-lg text-text-secondary leading-relaxed">
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section - Only show if problem exists */}
      {project.problem && (
        <section
          ref={problemRef}
          className="relative py-16 md:py-24 overflow-hidden bg-base"
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-semibold text-text-primary mb-6">
                Problem
              </h2>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                {project.problem}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Solution Section - Only show if solution exists */}
      {project.solution && (
        <section
          ref={solutionRef}
          className="relative py-16 md:py-24 overflow-hidden bg-surface-alt"
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-semibold text-text-primary mb-6">
                Solution
              </h2>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Highlights Section - Only show if highlights exist */}
      {project.highlights && project.highlights.length > 0 && (
        <section
          ref={highlightsRef}
          className="relative py-16 md:py-24 overflow-hidden bg-base"
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-semibold text-text-primary mb-8">
                Key Highlights
              </h2>
              <ul className="space-y-4">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange/10 border border-orange/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-orange" />
                    </div>
                    <p className="text-body-lg text-text-secondary leading-relaxed flex-1">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Additional Sections */}
      {project.sections && project.sections.length > 0 && (
        <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto space-y-16">
              {project.sections.map((section, index) => (
                <div key={index} data-animate-child>
                  <h2 className="text-h2 font-semibold text-text-primary mb-6">
                    {section.title}
                  </h2>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

