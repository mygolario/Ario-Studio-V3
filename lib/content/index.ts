/**
 * Content Module - Public API
 * 
 * Central entry point for content-related types and utilities.
 * 
 * This module provides:
 * - TypeScript types for multilingual content
 * - Helper functions for mapping content to localized views
 * - Type-safe content operations
 * 
 * Usage:
 *   import { LocalizedContent, ContentType, mapToLocalizedContent } from '@/lib/content'
 */

// Re-export all types
export type {
  Content,
  ContentTranslation,
  LocalizedContent,
  ContentType,
  CreateContentInput,
  UpdateContentInput,
  UpsertContentTranslationInput,
} from './types'

// Re-export mapping utilities
export {
  mapToLocalizedContent,
  mapManyToLocalizedContent,
  getBestTranslation,
  type ContentWithTranslations,
} from './mapLocalizedContent'

