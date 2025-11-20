import type { PortfolioProject, PortfolioLocale } from '@/content/portfolio/types'
import { portfolioProjects } from '@/content/portfolio/projects'

/**
 * Portfolio content loader
 * 
 * This module provides functions to load portfolio projects from the content structure.
 * In the future, this can be replaced with CMS API calls.
 */

/**
 * Get all portfolio projects for a specific locale
 * 
 * @param locale - The locale ('fa' or 'en')
 * @returns Array of portfolio projects for the locale
 */
export function getAllProjects(locale: PortfolioLocale): PortfolioProject[] {
  return portfolioProjects
    .filter((project) => project.locale === locale)
    .sort((a, b) => {
      // Sort by date if available, otherwise by id
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })
}

/**
 * Get a portfolio project by slug and locale
 * 
 * @param locale - The locale ('fa' or 'en')
 * @param slug - The project slug
 * @returns The portfolio project or null if not found
 */
export function getProjectBySlug(
  locale: PortfolioLocale,
  slug: string
): PortfolioProject | null {
  return (
    portfolioProjects.find(
      (project) => project.locale === locale && project.slug === slug
    ) || null
  )
}

/**
 * Get published projects only (for future use)
 * 
 * @param locale - The locale ('fa' or 'en')
 * @returns Array of published portfolio projects
 */
export function getPublishedProjects(locale: PortfolioLocale): PortfolioProject[] {
  return getAllProjects(locale).filter(
    (project) => project.status === 'published'
  )
}

