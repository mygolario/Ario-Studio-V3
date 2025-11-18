import { MetadataRoute } from 'next'
import { getProjects, getPublishedBlogPosts } from '@/lib/db'
import { getAllProjects } from '@/data/projects'

/**
 * Sitemap configuration
 * 
 * Generates XML sitemap for search engines.
 * Includes homepage, work pages, blog posts, and case studies.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ario-studio-v3.vercel.app'
  
  // Get all projects from database (with fallback to static data)
  let dbProjects: any[] = []
  try {
    dbProjects = await getProjects()
  } catch (error) {
    // Fallback to static data
    dbProjects = getAllProjects()
  }
  
  // Get published blog posts
  let blogPosts: any[] = []
  try {
    blogPosts = await getPublishedBlogPosts()
  } catch (error) {
    // Continue without blog posts if DB fails
  }
  
  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
  
  // Project/Work pages
  dbProjects.forEach((project) => {
    routes.push({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: project.updatedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })
  
  // Blog posts
  blogPosts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })
  
  return routes
}

