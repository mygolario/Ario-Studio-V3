import { redirect } from 'next/navigation'
import { createBlogPostAction } from '@/app/admin/blog/actions'
import BlogPostForm from '@/components/admin/BlogPostForm'

export default function NewBlogPostPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await createBlogPostAction(formData)
    
    if (result.success) {
      if (result.postId) {
        redirect(`/admin/blog/${result.postId}`)
      } else {
        redirect('/admin/blog')
      }
    }
    
    return result
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Create New Blog Post</h1>
        <p className="text-body text-text-secondary">
          Write a new blog post
        </p>
      </div>

      <BlogPostForm action={handleSubmit} />
    </div>
  )
}

