import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/blog'
import { generateSEOMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600

/**
 * Blog index page (EN)
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('en', {
    title: 'Blog',
    description: 'Insights, tutorials, and updates from Ario Studio about web design, AI, and cinematic experiences.',
    url: `${baseUrl}/en/blog`,
  })
}

export default async function BlogPageEN() {
  const posts = getAllPosts('en')

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <h1 className="text-h1 font-semibold text-text-primary mb-4">
                Blog
              </h1>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Insights, tutorials, and updates from Ario Studio
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary">No blog posts available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/en/blog/${post.slug}`}
                  className="group bg-surface rounded-xl overflow-hidden border border-border-subtle hover:shadow-card-hover hover:-translate-y-2 hover:border-orange/50 transition-all duration-300 cursor-pointer block relative"
                >
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/0 via-orange/0 to-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl z-0" />
                  
                  {/* Cover Image */}
                  {post.coverImageUrl ? (
                    <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl z-10">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl z-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-alt to-elevated" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-body-sm text-text-muted">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-h4 font-semibold text-text-primary mb-3 group-hover:text-orange transition-colors duration-200">
                      {post.title}
                    </h2>
                    <p className="text-body text-text-secondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-label text-text-muted bg-surface-alt border border-border-subtle px-3 py-1 rounded-full hover:border-orange hover:text-orange hover:bg-orange/5 transition-all duration-200 cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
