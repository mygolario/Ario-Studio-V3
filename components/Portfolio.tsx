'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { animateSectionReveal } from '@/lib/gsapClient'
import { useTranslation } from '@/lib/useTranslation'
import { type LocalizedContent } from '@/lib/content/types'

interface PortfolioProps {
  portfolioContent?: LocalizedContent[]
}

export default function Portfolio({ portfolioContent = [] }: PortfolioProps) {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  
  // Map LocalizedContent to project format for UI
  const projects = portfolioContent.map((item) => {
    // Determine status from content (you can add status field to Content model later)
    // For now, we'll use a default status
    let status: 'Live' | 'In development' | 'Concept' | 'Internal project' = 'In development'
    
    // Try to extract status from tags or use default
    if (item.tags && item.tags.length > 0) {
      const statusTag = item.tags.find(tag => 
        tag.toLowerCase().includes('live') || 
        tag.toLowerCase().includes('فعال') ||
        tag.toLowerCase().includes('concept') ||
        tag.toLowerCase().includes('کانسپت')
      )
      if (statusTag) {
        if (statusTag.toLowerCase().includes('live') || statusTag.includes('فعال')) {
          status = 'Live'
        } else if (statusTag.toLowerCase().includes('concept') || statusTag.includes('کانسپت')) {
          status = 'Concept'
        }
      }
    }
    
    return {
      slug: item.slug,
      title: item.title,
      subtitle: item.excerpt || item.subtitle || item.body || '',
      tags: item.tags || [],
      thumbnail: undefined, // Can be extended later if needed
      status: status,
    }
  })

  useEffect(() => {
    if (sectionRef.current) {
      animateSectionReveal(sectionRef, {
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      }).catch(() => {
        // Fallback: show section immediately if GSAP fails
        if (sectionRef.current) {
          sectionRef.current.style.opacity = '1'
          sectionRef.current.style.transform = 'translateY(0)'
        }
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
                {t.work.title}
              </h2>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {t.work.subtitle}
            </p>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary rtl:text-right">در حال حاضر پروژه‌ای در دسترس نیست.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                data-animate-child
                className="group bg-surface rounded-xl overflow-hidden border border-border-subtle hover:shadow-card-hover hover:-translate-y-2 hover:border-orange/50 transition-all duration-300 cursor-pointer block relative"
              >
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange/0 via-orange/0 to-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl z-0" />
                
                {/* Subtle light streak effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <div 
                    className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent"
                    style={{
                      transform: 'translateY(-50%)',
                    }}
                  />
                </div>
                
                {/* Image Placeholder with Overlay */}
                <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-alt to-elevated group-hover:scale-110 transition-transform duration-500 ease-out" />
                  
                  {/* Overlay - appears on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-6 rtl:text-right">
                      <p className="text-pure-white text-body font-medium mb-2">{project.title}</p>
                      <p className="text-pure-white/80 text-body-sm">{project.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Default content - hidden on hover */}
                  <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
                    <p className="text-text-muted text-sm rtl:text-right">{t.common.viewCaseStudy}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2 rtl:flex-row-reverse">
                    <h3 className="text-h4 font-semibold text-text-primary group-hover:text-orange transition-colors duration-200 rtl:text-right">
                      {project.title}
                    </h3>
                    <span className="text-label text-text-muted bg-surface-alt border border-border-subtle px-2 py-1 rounded text-xs rtl:ml-2 rtl:mr-0">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-body text-text-secondary mb-4 rtl:text-right">
                    {project.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 rtl:flex-row-reverse">
                    {project.tags.map((tag: string) => (
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
          )}
        </div>
      </div>
    </section>
  )
}
