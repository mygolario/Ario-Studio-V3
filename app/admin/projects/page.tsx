import Link from 'next/link'
import { getProjects } from '@/lib/db'

export default async function AdminProjectsPage() {
  const projects = await getProjects().catch(() => [])

  // Sort by order ascending, then by createdAt descending
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-semibold text-text-primary mb-2">Projects</h1>
          <p className="text-body text-text-secondary">
            Manage all projects ({projects.length} total)
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-6 py-3 rounded-full bg-orange text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
        >
          Create new project
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No projects yet. <Link href="/admin/projects/new" className="text-orange hover:underline">Create your first project</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-alt border-b border-border-subtle">
                <tr>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Title</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Slug</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Tags</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Year</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Featured</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Order</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((project: Awaited<ReturnType<typeof getProjects>>[0]) => (
                  <tr
                    key={project.id}
                    className="border-b border-border-subtle hover:bg-surface-alt transition-colors"
                  >
                    <td className="p-4">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-body font-medium text-text-primary hover:text-orange transition-colors"
                      >
                        {project.title}
                      </Link>
                    </td>
                    <td className="p-4 text-body-sm text-text-secondary font-mono">
                      {project.slug}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {project.tags && project.tags.length > 0 ? (
                          project.tags.slice(0, 2).map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-body-sm text-text-muted bg-surface-alt border border-border-subtle px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-body-sm text-text-muted">—</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-body text-text-secondary">
                      {project.year || '—'}
                    </td>
                    <td className="p-4">
                      {project.isFeatured ? (
                        <span className="inline-block px-2 py-1 rounded text-body-sm font-medium bg-orange/10 text-orange border border-orange/20">
                          Yes
                        </span>
                      ) : (
                        <span className="text-body-sm text-text-muted">No</span>
                      )}
                    </td>
                    <td className="p-4 text-body text-text-secondary">
                      {project.order}
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/projects/${project.id}`}
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

