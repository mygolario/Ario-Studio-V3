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
  body?: string | null // Full content (for blog/case study)
  metaTitle?: string | null // SEO meta title
  metaDescription?: string | null // SEO meta description
  
  // Optional additional fields
  subtitle?: string | null
  tags?: string[] | null
  
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
  
  // Language-specific fields
  lang: SupportedLang
  title: string
  excerpt?: string | null
  body?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  subtitle?: string | null
  tags?: string[] | null
  
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
  translations: Array<{
    lang: SupportedLang
    title: string
    excerpt?: string | null
    body?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    subtitle?: string | null
    tags?: string[] | null
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
}

