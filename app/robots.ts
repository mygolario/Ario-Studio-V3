import { MetadataRoute } from 'next'

/**
 * Robots.txt configuration
 * 
 * Controls how search engines crawl and index the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://ario-studio-v3.vercel.app/sitemap.xml',
  }
}

