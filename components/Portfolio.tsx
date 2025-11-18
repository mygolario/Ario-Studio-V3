'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { animateSectionReveal } from '@/lib/gsapClient'
import { getAllProjects } from '@/data/projects'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getFeaturedProjects } from '@/lib/db'

// Type for database project
type DbProject = Awaited<ReturnType<typeof getFeaturedProjects>>[0]

interface PortfolioProps {
  projects?: DbProject[]
}

export default function Portfolio({ projects: dbProjects = [] }: PortfolioProps) {
  const t = useTranslation()
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  
  // Use database projects if available, otherwise fallback to static data
  const rawProjects = dbProjects.length > 0
    ? dbProjects.map((project: DbProject) => ({
        slug: project.slug,
        title: project.title,
        subtitle: project.shortDescription || '',
        tags: project.tags || [],
        thumbnail: project.thumbnailUrl || undefined,
        status: project.liveUrl ? ('Live' as const) : ('In development' as const),
      }))
    : getAllProjects()
  
  // Apply translations to projects if available (for Farsi version)
  const projects = rawProjects.map((project) => {
    // Always check for Farsi translations (default language is 'fa')
    // Only skip if language is explicitly 'en'
    if (language !== 'en') {
      const workTranslations = t.work as any
      if (workTranslations?.projects && project.slug) {
        const projectTranslation = workTranslations.projects[project.slug as keyof typeof workTranslations.projects]
        
        if (projectTranslation) {
          // Use Farsi translations - replace all fields
          return {
            ...project,
            title: projectTranslation.title,
            subtitle: projectTranslation.subtitle,
            status: projectTranslation.status as typeof project.status,
            tags: projectTranslation.tags,
          }
        }
      }
    }
    
    // Fallback to original project data if no translation found or language is EN
    return project
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
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-6">
                      <p className="text-pure-white text-body font-medium mb-2">{project.title}</p>
                      <p className="text-pure-white/80 text-body-sm">{project.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Default content - hidden on hover */}
                  <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
                    <p className="text-text-muted text-sm">{t.common.viewCaseStudy}</p>
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
