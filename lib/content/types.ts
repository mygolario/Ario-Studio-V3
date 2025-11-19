/**
 * Content Types for Multilingual Content System
 * 
 * This module defines TypeScript types for a normalized, multilingual content structure.
 * The design separates content metadata (language-agnostic) from translations (language-specific).
 * 
 * Architecture:
 * - Content: Core content entity (language-agnostic metadata)
 * - ContentTranslation: Language-specific translations
 * - LocalizedContent: Combined view for frontend/API consumption
 * 
 * Usage:
 *   import { ContentType, LocalizedContent, SupportedLang } from '@/lib/content/types'
 */

import { type SupportedLang } from '@/lib/i18n'

/**
 * Content type enumeration
 * Defines the different types of content in the system
 */
export type ContentType = 'portfolio' | 'service' | 'blog'

/**
 * Case Study Layout Type
 * Defines different layout styles for case study pages
 */
export type CaseStudyLayoutType = 'basic' | 'cinematic' | 'split' | 'story'

/**
 * Portfolio Category
 * Defines the category of a portfolio item
 */
export const PORTFOLIO_CATEGORY_KEYS = [
  'landing-page',
  'full-site',
  'automation',
  'brand-experience',
  'other',
] as const

export type PortfolioCategory = typeof PORTFOLIO_CATEGORY_KEYS[number]

/**
 * Type guard for portfolio categories
 */
export function isPortfolioCategory(
  value: string | null | undefined
): value is PortfolioCategory {
  if (!value) return false
  return (PORTFOLIO_CATEGORY_KEYS as readonly string[]).includes(value)
}

/**
 * Service Level
 * Defines the service tier/package level
 */
export type ServiceLevel = 'starter' | 'pro' | 'premium'

/**
 * Type guard for service levels
 */
export function isServiceLevel(
  value: string | null | undefined
): value is ServiceLevel {
  if (!value) return false
  return ['starter', 'pro', 'premium'].includes(value)
}

/**
 * Core content entity (language-agnostic)
 * Contains metadata and structure shared across all languages
 */
export interface Content {
  id: string
  type: ContentType
  slug: string // Language-agnostic slug, e.g., "ai-web-studio"
  isPublished: boolean
  order?: number | null
  createdAt: Date
  updatedAt: Date
  
  // Optional metadata fields
  featured?: boolean
  archived?: boolean
  layoutType?: CaseStudyLayoutType | null // Case study layout type
  category?: PortfolioCategory | null // Portfolio category
  tags?: string | null // Comma-separated tags or JSON string
  
  // Service-specific fields
  servicePriceFrom?: number | null // Starting price (e.g., in USD or equivalent)
  serviceCurrency?: string | null // Currency code: "USD" | "IRR" | etc.
  serviceDuration?: string | null // Free text: "2–4 weeks"
  serviceLevel?: ServiceLevel | null // "starter" | "pro" | "premium"
  
  // Relations (when loaded with Prisma)
  translations?: ContentTranslation[]
}

/**
 * Language-specific translation for content
 * Each Content can have multiple ContentTranslation records (one per language)
 */
export interface ContentTranslation {
  id: string
  contentId: string
  lang: SupportedLang // "fa" | "en"
  title: string
  excerpt?: string | null // Short summary text
  body?: string | null // Full content (for blog/case study) - legacy field, prefer bodyIntro for new content
  metaTitle?: string | null // SEO meta title
  metaDescription?: string | null // SEO meta description
  
  // Optional additional fields
  subtitle?: string | null
  tags?: string[] | null
  
  // Case Study specific fields
  bodyIntro?: string | null // Introduction/Overview text
  bodyProblem?: string | null // Problem/Challenge section
  bodySolution?: string | null // Solution section
  bodyProcess?: string | null // Process section
  bodyResult?: string | null // Result/Outcome section
  featuredImage?: string | null // URL of main featured image
  galleryImages?: string[] | null // Array of image URLs (parsed from JSON)
  
  // Relations (when loaded with Prisma)
  content?: Content
}

/**
 * Localized content view for frontend/API
 * This is the shape of data returned to the frontend after combining
 * Content + ContentTranslation for a specific language
 */
export interface LocalizedContent {
  // Core content fields
  id: string
  type: ContentType
  slug: string
  isPublished: boolean
  order?: number | null
  featured?: boolean
  archived?: boolean
  layoutType?: CaseStudyLayoutType | null // Case study layout type
  category?: PortfolioCategory | null
  
  // Service-specific fields
  servicePriceFrom?: number | null // Starting price (e.g., in USD or equivalent)
  serviceCurrency?: string | null // Currency code: "USD" | "IRR" | etc.
  serviceDuration?: string | null // Free text: "2–4 weeks"
  serviceLevel?: ServiceLevel | null // "starter" | "pro" | "premium"
  
  // Language-specific fields
  lang: SupportedLang
  title: string
  excerpt?: string | null
  body?: string | null // Legacy field, prefer bodyIntro for new content
  metaTitle?: string | null
  metaDescription?: string | null
  subtitle?: string | null
  tags?: string[] | null
  
  // Case Study specific fields
  bodyIntro?: string | null // Introduction/Overview text
  bodyProblem?: string | null // Problem/Challenge section
  bodySolution?: string | null // Solution section
  bodyProcess?: string | null // Process section
  bodyResult?: string | null // Result/Outcome section
  featuredImage?: string | null // URL of main featured image
  galleryImages?: string[] | null // Array of image URLs
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

/**
 * Input type for creating new content
 */
export interface CreateContentInput {
  type: ContentType
  slug: string
  isPublished?: boolean
  order?: number | null
  featured?: boolean
  layoutType?: CaseStudyLayoutType | null
  category?: PortfolioCategory | null
  tags?: string[] | null
  servicePriceFrom?: number | null
  serviceCurrency?: string | null
  serviceDuration?: string | null
  serviceLevel?: ServiceLevel | null
  translations: Array<{
    lang: SupportedLang
    title: string
    excerpt?: string | null
    body?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    subtitle?: string | null
    tags?: string[] | null
    bodyIntro?: string | null
    bodyProblem?: string | null
    bodySolution?: string | null
    bodyProcess?: string | null
    bodyResult?: string | null
    featuredImage?: string | null
    galleryImages?: string[] | null
  }>
}

/**
 * Input type for updating content
 */
export interface UpdateContentInput {
  slug?: string
  isPublished?: boolean
  order?: number | null
  featured?: boolean
  archived?: boolean
  layoutType?: CaseStudyLayoutType | null
  category?: PortfolioCategory | null
  tags?: string[] | null
  servicePriceFrom?: number | null
  serviceCurrency?: string | null
  serviceDuration?: string | null
  serviceLevel?: ServiceLevel | null
}

/**
 * Input type for creating/updating content translation
 */
export interface UpsertContentTranslationInput {
  lang: SupportedLang
  title: string
  excerpt?: string | null
  body?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  subtitle?: string | null
  tags?: string[] | null
  bodyIntro?: string | null
  bodyProblem?: string | null
  bodySolution?: string | null
  bodyProcess?: string | null
  bodyResult?: string | null
  featuredImage?: string | null
  galleryImages?: string[] | null
}

