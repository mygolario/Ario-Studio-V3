'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CaseStudyActionResult } from '@/app/admin/case-studies/actions'
import { getCaseStudyById, getProjects } from '@/lib/db'

// Type for case study (inferred from Prisma)
type CaseStudy = NonNullable<Awaited<ReturnType<typeof getCaseStudyById>>>
type Project = Awaited<ReturnType<typeof getProjects>>[0]

interface CaseStudyFormProps {
  caseStudy?: CaseStudy
  projects: Project[]
  action: (formData: FormData) => Promise<CaseStudyActionResult>
}

export default function CaseStudyForm({ caseStudy, projects, action }: CaseStudyFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<CaseStudyActionResult | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResult(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const actionResult = await action(formData)
      setResult(actionResult)

      if (actionResult.success && !caseStudy) {
        router.refresh()
      }
    })
  }

  const errors = result && !result.success ? result.errors || {} : {}

  // Format metrics as JSON string for textarea
  const metricsString = caseStudy?.metrics
    ? JSON.stringify(caseStudy.metrics, null, 2)
    : ''

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-surface border border-border-subtle rounded-xl p-8 space-y-6">
        {/* Project Selection */}
        <div>
          <label
            htmlFor="projectId"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Project <span className="text-orange">*</span>
          </label>
          <select
            id="projectId"
            name="projectId"
            defaultValue={caseStudy?.projectId || ''}
            required
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
              errors.projectId
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
          {errors.projectId && (
            <p className="mt-1 text-body-sm text-red-500">{errors.projectId}</p>
          )}
        </div>

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
            defaultValue={caseStudy?.title || ''}
            required
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange ${
              errors.title
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Case study title"
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
            defaultValue={caseStudy?.slug || ''}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200 font-mono text-body-sm"
            placeholder="case-study-slug"
          />
          {errors.slug && (
            <p className="mt-1 text-body-sm text-red-500">{errors.slug}</p>
          )}
        </div>

        {/* Hero Image URL */}
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
            defaultValue={caseStudy?.heroImageUrl || ''}
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

        {/* Summary */}
        <div>
          <label
            htmlFor="summary"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Summary <span className="text-orange">*</span>
          </label>
          <textarea
            id="summary"
            name="summary"
            defaultValue={caseStudy?.summary || ''}
            required
            rows={3}
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none ${
              errors.summary
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Short summary for listings"
          />
          {errors.summary && (
            <p className="mt-1 text-body-sm text-red-500">{errors.summary}</p>
          )}
        </div>

        {/* Challenge */}
        <div>
          <label
            htmlFor="challenge"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Challenge <span className="text-orange">*</span>
          </label>
          <textarea
            id="challenge"
            name="challenge"
            defaultValue={caseStudy?.challenge || ''}
            required
            rows={6}
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none ${
              errors.challenge
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Describe the challenge or problem"
          />
          {errors.challenge && (
            <p className="mt-1 text-body-sm text-red-500">{errors.challenge}</p>
          )}
        </div>

        {/* Solution */}
        <div>
          <label
            htmlFor="solution"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Solution <span className="text-orange">*</span>
          </label>
          <textarea
            id="solution"
            name="solution"
            defaultValue={caseStudy?.solution || ''}
            required
            rows={6}
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none ${
              errors.solution
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Describe the solution"
          />
          {errors.solution && (
            <p className="mt-1 text-body-sm text-red-500">{errors.solution}</p>
          )}
        </div>

        {/* Results */}
        <div>
          <label
            htmlFor="results"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Results <span className="text-orange">*</span>
          </label>
          <textarea
            id="results"
            name="results"
            defaultValue={caseStudy?.results || ''}
            required
            rows={6}
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none ${
              errors.results
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border-subtle'
            }`}
            placeholder="Describe the results and outcomes"
          />
          {errors.results && (
            <p className="mt-1 text-body-sm text-red-500">{errors.results}</p>
          )}
        </div>

        {/* Metrics */}
        <div>
          <label
            htmlFor="metrics"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Metrics (JSON format, optional)
          </label>
          <textarea
            id="metrics"
            name="metrics"
            defaultValue={metricsString}
            rows={4}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none font-mono text-body-sm"
            placeholder='{"conversionLift": "25%", "loadTime": "1.2s"}'
          />
          <p className="mt-1 text-body-sm text-text-muted">
            Enter metrics as JSON (e.g., {`{"key": "value"}`})
          </p>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Long-form Content (optional)
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={caseStudy?.content || ''}
            rows={10}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange resize-none font-mono text-body-sm"
            placeholder="Additional long-form content (Markdown supported)"
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
              defaultValue={caseStudy?.status || 'draft'}
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
                caseStudy?.publishedAt
                  ? new Date(caseStudy.publishedAt).toISOString().slice(0, 16)
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
        {result && result.success && caseStudy && (
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
            {isPending ? 'Saving...' : caseStudy ? 'Update Case Study' : 'Create Case Study'}
          </button>
          <Link
            href="/admin/case-studies"
            className="px-6 py-3 rounded-full border border-border-subtle text-text-secondary hover:text-text-primary hover:border-orange transition-all duration-200"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  )
}

