import type { BlogPost, BlogPostLocale } from '@/content/blog/types'
import { blogPosts as enPosts } from '@/content/blog/en/posts'
import { blogPosts as faPosts } from '@/content/blog/fa/posts'

/**
 * Blog content loader
 * 
 * This module provides functions to load blog posts from the content structure.
 * In the future, this can be replaced with CMS API calls.
 */

const allPosts: BlogPost[] = [...enPosts, ...faPosts]

/**
 * Get all blog posts for a specific locale
 * 
 * @param locale - The locale ('fa' or 'en')
 * @returns Array of blog posts for the locale
 */
export function getAllPosts(locale: BlogPostLocale): BlogPost[] {
  return allPosts
    .filter((post) => post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get a blog post by slug and locale
 * 
 * @param locale - The locale ('fa' or 'en')
 * @param slug - The post slug
 * @returns The blog post or null if not found
 */
export function getPostBySlug(
  locale: BlogPostLocale,
  slug: string
): BlogPost | null {
  return (
    allPosts.find((post) => post.locale === locale && post.slug === slug) ||
    null
  )
}

/**
 * Get all unique slugs for a locale (useful for static generation)
 * 
 * @param locale - The locale ('fa' or 'en')
 * @returns Array of slugs
 */
export function getAllSlugs(locale: BlogPostLocale): string[] {
  return getAllPosts(locale).map((post) => post.slug)
}

