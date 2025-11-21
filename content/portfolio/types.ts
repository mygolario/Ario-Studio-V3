/**
 * Portfolio project type definition
 * 
 * This type represents a portfolio project in our CMS-ready content structure.
 */

export type PortfolioLocale = 'fa' | 'en'
export type ProjectStatus = 'coming-soon' | 'published'

export interface PortfolioProject {
  id: string
  slug: string
  locale: PortfolioLocale
  title: string
  shortDescription: string
  status: ProjectStatus
  tags?: string[]
  services?: string[] // Related service slugs
  link?: string // External link if available
  date?: string // ISO date string
  thumbnailUrl?: string
}

