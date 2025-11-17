import { MetadataRoute } from 'next'
import { getAllProjects } from '@/data/projects'

/**
 * Sitemap configuration
 * 
 * Generates XML sitemap for search engines.
 * Includes homepage and all case study pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ario-studio-v3.vercel.app'
  
  // Get all projects for case study pages
  const projects = getAllProjects()
  
  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
  
  // Case study pages
  projects.forEach((project) => {
    routes.push({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })
  
  return routes
}

