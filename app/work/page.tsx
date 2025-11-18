import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/lib/db'
import { Copy } from '@/content/copy'

export default async function WorkPage() {
  const projects = await getProjects().catch(() => [])

  // Sort: featured first, then by order
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return a.isFeatured ? -1 : 1
    }
    if (a.order !== b.order) {
      return a.order - b.order
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <main className="relative min-h-screen bg-base">
      <div className="container-custom py-32">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <h1 className="text-h1 font-semibold text-text-primary mb-4">
                {Copy.work.title}
              </h1>
              {/* Section accent line */}
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-orange-light rounded-full mx-auto" />
            </div>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {Copy.work.subtitle}
            </p>
          </div>

          {/* Projects Grid */}
          {sortedProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary">No projects available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {sortedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="group bg-surface rounded-xl overflow-hidden border border-border-subtle hover:shadow-card-hover hover:-translate-y-2 hover:border-orange/50 transition-all duration-300 cursor-pointer block relative"
                >
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/0 via-orange/0 to-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl z-0" />
                  
                  {/* Subtle light streak effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                    <div 
                      className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent"
                      style={{
                        transform: 'translateY(-50%)',
                      }}
                    />
                  </div>
                  
                  {/* Image */}
                  {project.thumbnailUrl ? (
                    <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl z-10">
                      <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      
                      {/* Overlay - appears on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-6">
                          <p className="text-pure-white text-body font-medium mb-2">{project.title}</p>
                          <p className="text-pure-white/80 text-body-sm">{project.shortDescription}</p>
                        </div>
                      </div>
                      
                      {/* Default content - hidden on hover */}
                      <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
                        <p className="text-text-muted text-sm">View case study</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-64 bg-surface-alt overflow-hidden rounded-t-xl z-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-alt to-elevated group-hover:scale-110 transition-transform duration-500 ease-out" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-text-muted text-sm">View case study</p>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-h4 font-semibold text-text-primary group-hover:text-orange transition-colors duration-200">
                        {project.title}
                      </h3>
                      {project.isFeatured && (
                        <span className="text-label text-orange bg-orange/10 border border-orange/20 px-2 py-1 rounded text-xs">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-body text-text-secondary mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string, idx: number) => (
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
    </main>
  )
}

