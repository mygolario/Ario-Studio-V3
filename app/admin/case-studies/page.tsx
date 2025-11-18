import Link from 'next/link'
import { getAllCaseStudies } from '@/lib/db'

export default async function AdminCaseStudiesPage() {
  const caseStudies = await getAllCaseStudies().catch(() => [])
  
  // Type for case study
  type CaseStudy = Awaited<ReturnType<typeof getAllCaseStudies>>[0]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-semibold text-text-primary mb-2">Case Studies</h1>
          <p className="text-body text-text-secondary">
            Manage all case studies ({caseStudies.length} total)
          </p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="px-6 py-3 rounded-full bg-orange text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
        >
          New case study
        </Link>
      </div>

      {/* Case Studies Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        {caseStudies.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No case studies yet. <Link href="/admin/case-studies/new" className="text-orange hover:underline">Create your first case study</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-alt border-b border-border-subtle">
                <tr>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Title</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Project</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Slug</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Status</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Published At</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.map((caseStudy: CaseStudy) => (
                  <tr
                    key={caseStudy.id}
                    className="border-b border-border-subtle hover:bg-surface-alt transition-colors"
                  >
                    <td className="p-4">
                      <Link
                        href={`/admin/case-studies/${caseStudy.id}`}
                        className="text-body font-medium text-text-primary hover:text-orange transition-colors"
                      >
                        {caseStudy.title}
                      </Link>
                    </td>
                    <td className="p-4 text-body text-text-secondary">
                      {caseStudy.project?.title || '—'}
                    </td>
                    <td className="p-4 text-body-sm text-text-secondary font-mono">
                      {caseStudy.slug}
                    </td>
                    <td className="p-4">
                      {caseStudy.status === 'published' ? (
                        <span className="inline-block px-2 py-1 rounded text-body-sm font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded text-body-sm font-medium bg-surface-alt text-text-muted border border-border-subtle">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-body text-text-secondary">
                      {caseStudy.publishedAt
                        ? new Date(caseStudy.publishedAt).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/case-studies/${caseStudy.id}`}
                        className="text-body-sm font-medium text-orange hover:text-orange/80 transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

