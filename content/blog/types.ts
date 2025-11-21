/**
 * Blog post type definition
 * 
 * This type represents a blog post in our CMS-ready content structure.
 * Posts can be stored as JSON/TS config objects or MDX files.
 */

export type BlogPostLocale = 'fa' | 'en'

export interface BlogPost {
  id: string
  slug: string
  locale: BlogPostLocale
  title: string
  excerpt: string
  date: string // ISO date string
  tags?: string[]
  content: string // Markdown/MDX content or plain text
  coverImageUrl?: string
}

