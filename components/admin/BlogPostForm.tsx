'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BlogPostActionResult } from '@/app/admin/blog/actions'
import { getBlogPostById } from '@/lib/db'

// Type for blog post (inferred from Prisma)
type BlogPost = NonNullable<Awaited<ReturnType<typeof getBlogPostById>>>

interface BlogPostFormProps {
  post?: BlogPost
  action: (formData: FormData) => Promise<BlogPostActionResult>
}

export default function BlogPostForm({ post, action }: BlogPostFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<BlogPostActionResult | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResult(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const actionResult = await action(formData)
      setResult(actionResult)

      if (actionResult.success && !post) {
        router.refresh()
      }
    })
  }

  const errors = result && !result.success ? result.errors || {} : {}

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-surface border border-border-subtle rounded-xl p-8 space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Title <span className="text-orange">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post?.title || ''}
            required
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
              errors.title
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Blog post title"
          />
          {errors.title && (
            <p className="mt-1 text-body-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Slug (leave empty to auto-generate from title)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            defaultValue={post?.slug || ''}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200 font-mono text-body-sm"
            placeholder="blog-post-slug"
          />
          {errors.slug && (
            <p className="mt-1 text-body-sm text-red-500">{errors.slug}</p>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label
            htmlFor="excerpt"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Excerpt <span className="text-orange">*</span>
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            defaultValue={post?.excerpt || ''}
            required
            rows={3}
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none ${
              errors.excerpt
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Short excerpt for listings"
          />
          {errors.excerpt && (
            <p className="mt-1 text-body-sm text-red-500">{errors.excerpt}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Content <span className="text-orange">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={post?.content || ''}
            required
            rows={12}
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none font-mono text-body-sm ${
              errors.content
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Blog post content (Markdown supported)"
          />
          {errors.content && (
            <p className="mt-1 text-body-sm text-red-500">{errors.content}</p>
          )}
        </div>

        {/* Cover Image URL */}
        <div>
          <label
            htmlFor="coverImageUrl"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImageUrl"
            name="coverImageUrl"
            defaultValue={post?.coverImageUrl || ''}
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
              errors.coverImageUrl
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.coverImageUrl && (
            <p className="mt-1 text-body-sm text-red-500">{errors.coverImageUrl}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            defaultValue={post?.tags?.join(', ') || ''}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
            placeholder="Next.js, Design, AI"
          />
        </div>

        {/* Grid: Status, Published At */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="status"
              className="block text-body-sm font-medium text-text-primary mb-2"
            >
              Status <span className="text-orange">*</span>
            </label>
            <select
              id="status"
              name="status"
              defaultValue={post?.status || 'draft'}
              disabled={isPending}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                errors.status
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border-subtle'
              }`}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-body-sm text-red-500">{errors.status}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="publishedAt"
              className="block text-body-sm font-medium text-text-primary mb-2"
            >
              Published At (optional, auto-set if status is published)
            </label>
            <input
              type="datetime-local"
              id="publishedAt"
              name="publishedAt"
              defaultValue={
                post?.publishedAt
                  ? new Date(post.publishedAt).toISOString().slice(0, 16)
                  : ''
              }
              disabled={isPending}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
            />
          </div>
        </div>

        {/* Error Message */}
        {result && !result.success && result.error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-body-sm text-red-500">{result.error}</p>
          </div>
        )}

        {/* Success Message */}
        {result && result.success && post && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-body-sm text-green-500">{result.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-3 rounded-full bg-orange text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
          >
            {isPending ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
          </button>
          <Link
            href="/admin/blog"
            className="px-6 py-3 rounded-full border border-border-subtle text-text-secondary hover:text-text-primary hover:border-orange transition-all duration-200"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  )
}

