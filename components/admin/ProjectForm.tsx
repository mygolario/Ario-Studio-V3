'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProjectActionResult } from '@/app/admin/projects/actions'
import { getProjectById } from '@/lib/db'

// Type for project (inferred from Prisma)
type Project = NonNullable<Awaited<ReturnType<typeof getProjectById>>>

interface ProjectFormProps {
  project?: Project
  action: (formData: FormData) => Promise<ProjectActionResult>
}

export default function ProjectForm({ project, action }: ProjectFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<ProjectActionResult | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResult(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const actionResult = await action(formData)
      setResult(actionResult)

      if (actionResult.success && !project) {
        // For new projects, redirect is handled server-side
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
            defaultValue={project?.title || ''}
            required
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
              errors.title
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Project title"
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
            defaultValue={project?.slug || ''}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200 font-mono text-body-sm"
            placeholder="project-slug"
          />
          {errors.slug && (
            <p className="mt-1 text-body-sm text-red-500">{errors.slug}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortDescription"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Short Description <span className="text-orange">*</span>
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            defaultValue={project?.shortDescription || ''}
            required
            rows={3}
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none ${
              errors.shortDescription
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Brief description for cards and listings"
          />
          {errors.shortDescription && (
            <p className="mt-1 text-body-sm text-red-500">{errors.shortDescription}</p>
          )}
        </div>

        {/* Long Description */}
        <div>
          <label
            htmlFor="longDescription"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            defaultValue={project?.longDescription || ''}
            rows={8}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200 resize-none"
            placeholder="Detailed project description for case study pages"
          />
          {errors.longDescription && (
            <p className="mt-1 text-body-sm text-red-500">{errors.longDescription}</p>
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
            defaultValue={project?.tags?.join(', ') || ''}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
            placeholder="Next.js, E-commerce, AI"
          />
        </div>

        {/* Grid: Thumbnail URL, Hero Image URL */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="thumbnailUrl"
              className="block text-body-sm font-medium text-text-primary mb-2"
            >
              Thumbnail URL
            </label>
            <input
              type="url"
              id="thumbnailUrl"
              name="thumbnailUrl"
              defaultValue={project?.thumbnailUrl || ''}
              disabled={isPending}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                errors.thumbnailUrl
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border-subtle'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.thumbnailUrl && (
              <p className="mt-1 text-body-sm text-red-500">{errors.thumbnailUrl}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="heroImageUrl"
              className="block text-body-sm font-medium text-text-primary mb-2"
            >
              Hero Image URL
            </label>
            <input
              type="url"
              id="heroImageUrl"
              name="heroImageUrl"
              defaultValue={project?.heroImageUrl || ''}
              disabled={isPending}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                errors.heroImageUrl
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border-subtle'
              }`}
              placeholder="https://example.com/hero.jpg"
            />
            {errors.heroImageUrl && (
              <p className="mt-1 text-body-sm text-red-500">{errors.heroImageUrl}</p>
            )}
          </div>
        </div>

        {/* Grid: Year, Client Name, Role */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="year"
              className="block text-body-sm font-medium text-text-primary mb-2"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              defaultValue={project?.year || ''}
              min="1900"
              max="2100"
              disabled={isPending}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                errors.year
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border-subtle'
              }`}
              placeholder="2024"
            />
            {errors.year && (
              <p className="mt-1 text-body-sm text-red-500">{errors.year}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="clientName"
              className="block text-body-sm font-medium text-text-primary mb-2"
            >
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              defaultValue={project?.clientName || ''}
              disabled={isPending}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
              placeholder="Client name"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-body-sm font-medium text-text-primary mb-2"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              defaultValue={project?.role || ''}
              disabled={isPending}
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200"
              placeholder="Design & Build"
            />
          </div>
        </div>

        {/* Live URL */}
        <div>
          <label
            htmlFor="liveUrl"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Live URL
          </label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            defaultValue={project?.liveUrl || ''}
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
              errors.liveUrl
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="https://example.com"
          />
          {errors.liveUrl && (
            <p className="mt-1 text-body-sm text-red-500">{errors.liveUrl}</p>
          )}
        </div>

        {/* Grid: Is Featured, Order */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                defaultChecked={project?.isFeatured || false}
                disabled={isPending}
                className="w-5 h-5 rounded border-border-subtle text-orange focus:ring-2 focus:ring-orange focus:ring-offset-2"
              />
              <span className="text-body-sm font-medium text-text-primary">
                Featured Project
              </span>
            </label>
          </div>

          <div>
            <label
              htmlFor="order"
              className="block text-body-sm font-medium text-text-primary mb-2"
            >
              Order (lower numbers appear first)
            </label>
            <input
              type="number"
              id="order"
              name="order"
              defaultValue={project?.order || 100}
              min="0"
              disabled={isPending}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
                errors.order
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border-subtle'
              }`}
            />
            {errors.order && (
              <p className="mt-1 text-body-sm text-red-500">{errors.order}</p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {result && !result.success && result.error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-body-sm text-red-500">{result.error}</p>
          </div>
        )}

        {/* Success Message */}
        {result && result.success && project && (
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
            {isPending ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
          </button>
          {project && (
            <Link
              href="/admin/projects"
              className="px-6 py-3 rounded-full border border-border-subtle text-text-secondary hover:text-text-primary hover:border-orange transition-all duration-200"
            >
              Cancel
            </Link>
          )}
        </div>
      </div>
    </form>
  )
}

