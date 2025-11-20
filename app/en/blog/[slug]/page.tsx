import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { generateSEOMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  return getAllSlugs('en').map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPostBySlug('en', params.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('en', {
    title: post.title,
    description: post.excerpt,
    url: `${baseUrl}/en/blog/${post.slug}`,
    type: 'article',
    image: post.coverImageUrl,
  })
}

export default async function BlogPostPageEN({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug('en', params.slug)

  if (!post) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl ? [post.coverImageUrl] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Ario Studio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ario Studio',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og/og-main.png`,
      },
    },
  }

  return (
    <main className="relative min-h-screen bg-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      
      {/* Article Content */}
      <article className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/en/blog"
            className="inline-flex items-center gap-2 text-body-sm text-text-secondary hover:text-orange transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <time
                dateTime={post.date}
                className="text-body-sm text-text-muted"
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h1 className="text-hero md:text-[64px] md:leading-[72px] font-semibold text-text-primary mb-6">
              {post.title}
            </h1>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-body-sm font-medium text-text-secondary bg-surface-alt border border-border-subtle px-4 py-1.5 rounded-full hover:border-orange hover:text-orange transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}

