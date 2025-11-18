import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/db'

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts().catch(() => [])
  
  // Type for blog post
  type BlogPost = Awaited<ReturnType<typeof getAllBlogPosts>>[0]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-semibold text-text-primary mb-2">Blog Posts</h1>
          <p className="text-body text-text-secondary">
            Manage all blog posts ({posts.length} total)
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 rounded-full bg-orange text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
        >
          New post
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No blog posts yet. <Link href="/admin/blog/new" className="text-orange hover:underline">Create your first post</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-alt border-b border-border-subtle">
                <tr>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Title</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Slug</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Status</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Published At</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Tags</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post: BlogPost) => (
                  <tr
                    key={post.id}
                    className="border-b border-border-subtle hover:bg-surface-alt transition-colors"
                  >
                    <td className="p-4">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-body font-medium text-text-primary hover:text-orange transition-colors"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="p-4 text-body-sm text-text-secondary font-mono">
                      {post.slug}
                    </td>
                    <td className="p-4">
                      {post.status === 'published' ? (
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
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags && post.tags.length > 0 ? (
                          post.tags.slice(0, 2).map((tag: string, idx: number) => (
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
                    <td className="p-4">
                      <Link
                        href={`/admin/blog/${post.id}`}
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

