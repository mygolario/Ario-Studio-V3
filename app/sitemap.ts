import { MetadataRoute } from 'next'
import { getLocalizedContentList } from '@/lib/content/queries'
import { getPublishedBlogPosts } from '@/lib/db'

/**
 * Multilingual Sitemap configuration
 * 
 * Generates XML sitemap for search engines with bilingual support.
 * Includes homepage, work pages, blog posts, and case studies.
 * Since we don't use [lang] segments, we include both language versions
 * with hreflang annotations in the metadata.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  // Get all portfolio items (multilingual content)
  let portfolioItems: any[] = []
  try {
    portfolioItems = await getLocalizedContentList('portfolio', 'en').catch(() => [])
  } catch (error) {
    console.error('Error fetching portfolio items for sitemap:', error)
  }
  
  // Get published blog posts
  let blogPosts: any[] = []
  try {
    blogPosts = await getPublishedBlogPosts()
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }
  
  // Homepage (same URL for both languages, language detected from context)
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          'fa-IR': baseUrl,
          'en-US': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'fa-IR': `${baseUrl}/work`,
          'en-US': `${baseUrl}/work`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'fa-IR': `${baseUrl}/blog`,
          'en-US': `${baseUrl}/blog`,
        },
      },
    },
  ]
  
  // Portfolio/Work pages (multilingual)
  portfolioItems.forEach((item) => {
    const workUrl = `${baseUrl}/work/${item.slug}`
    routes.push({
      url: workUrl,
      lastModified: new Date(), // TODO: Use actual updatedAt from Content model
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'fa-IR': workUrl,
          'en-US': workUrl,
        },
      },
    })
  })
  
  // Blog posts
  blogPosts.forEach((post) => {
    const blogUrl = `${baseUrl}/blog/${post.slug}`
    routes.push({
      url: blogUrl,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'fa-IR': blogUrl,
          'en-US': blogUrl,
        },
      },
    })
  })
  
  return routes
}

