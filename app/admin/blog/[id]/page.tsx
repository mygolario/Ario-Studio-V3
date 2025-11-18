import { notFound, redirect } from 'next/navigation'
import { getBlogPostById } from '@/lib/db'
import { updateBlogPostAction, deleteBlogPostAction } from '@/app/admin/blog/actions'
import BlogPostForm from '@/components/admin/BlogPostForm'
import DeleteBlogPostButton from '@/components/admin/DeleteBlogPostButton'

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await getBlogPostById(params.id).catch(() => null)

  if (!post) {
    notFound()
  }

  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await updateBlogPostAction(params.id, formData)
    return result
  }

  async function handleDelete() {
    'use server'
    const result = await deleteBlogPostAction(params.id)
    
    if (result.success) {
      redirect('/admin/blog')
    }
    
    return result
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Edit Blog Post</h1>
        <p className="text-body text-text-secondary">
          Update blog post details
        </p>
      </div>

      <div className="space-y-6">
        <BlogPostForm post={post} action={handleSubmit} />
        
        <div className="bg-surface border border-border-subtle rounded-xl p-8">
          <h2 className="text-h4 font-semibold text-text-primary mb-4">Danger Zone</h2>
          <p className="text-body-sm text-text-secondary mb-4">
            Once you delete a blog post, there is no going back. Please be certain.
          </p>
          <DeleteBlogPostButton onDelete={handleDelete} postTitle={post.title} />
        </div>
      </div>
    </div>
  )
}

