'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/db'
import { BlogPostFormSchema, generateSlug, generateUniqueSlug } from '@/lib/validation/blog'

export type BlogPostActionResult =
  | { success: true; message?: string; postId?: string }
  | { success: false; error: string; errors?: Record<string, string> }

/**
 * Server action to create a new blog post
 */
export async function createBlogPostAction(
  formData: FormData
): Promise<BlogPostActionResult> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in.',
      }
    }

    // Parse form data
    const rawData = {
      title: formData.get('title')?.toString() || '',
      slug: formData.get('slug')?.toString() || '',
      excerpt: formData.get('excerpt')?.toString() || '',
      content: formData.get('content')?.toString() || '',
      coverImageUrl: formData.get('coverImageUrl')?.toString() || '',
      tags: formData.get('tags')?.toString() || '',
      status: formData.get('status')?.toString() || 'draft',
      publishedAt: formData.get('publishedAt')?.toString() || '',
    }

    // Validate with Zod
    const validationResult = BlogPostFormSchema.safeParse(rawData)

    if (!validationResult.success) {
      const errors: Record<string, string> = {}
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        if (field) {
          errors[field] = issue.message
        }
      })

      return {
        success: false,
        error: 'Validation failed',
        errors,
      }
    }

    const validatedData = validationResult.data

    // Generate slug if not provided
    let finalSlug = validatedData.slug || generateSlug(validatedData.title)
    finalSlug = await generateUniqueSlug(finalSlug)

    // Parse tags
    const tags = validatedData.tags
      ? validatedData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : []

    // Handle publishedAt
    let publishedAt: Date | undefined = undefined
    if (validatedData.status === 'published') {
      if (validatedData.publishedAt) {
        publishedAt = new Date(validatedData.publishedAt)
      } else {
        publishedAt = new Date()
      }
    }

    // Create blog post
    const post = await createBlogPost({
      title: validatedData.title,
      slug: finalSlug,
      excerpt: validatedData.excerpt,
      content: validatedData.content,
      coverImageUrl: validatedData.coverImageUrl || undefined,
      tags,
      status: validatedData.status,
      publishedAt,
    })

    return {
      success: true,
      message: 'Blog post created successfully',
      postId: post.id,
    }
  } catch (error) {
    console.error('Error creating blog post:', error)
    return {
      success: false,
      error: 'Failed to create blog post. Please try again.',
    }
  }
}

/**
 * Server action to update an existing blog post
 */
export async function updateBlogPostAction(
  id: string,
  formData: FormData
): Promise<BlogPostActionResult> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in.',
      }
    }

    // Parse form data
    const rawData = {
      title: formData.get('title')?.toString() || '',
      slug: formData.get('slug')?.toString() || '',
      excerpt: formData.get('excerpt')?.toString() || '',
      content: formData.get('content')?.toString() || '',
      coverImageUrl: formData.get('coverImageUrl')?.toString() || '',
      tags: formData.get('tags')?.toString() || '',
      status: formData.get('status')?.toString() || 'draft',
      publishedAt: formData.get('publishedAt')?.toString() || '',
    }

    // Validate with Zod
    const validationResult = BlogPostFormSchema.safeParse(rawData)

    if (!validationResult.success) {
      const errors: Record<string, string> = {}
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        if (field) {
          errors[field] = issue.message
        }
      })

      return {
        success: false,
        error: 'Validation failed',
        errors,
      }
    }

    const validatedData = validationResult.data

    // Generate slug if not provided
    let finalSlug = validatedData.slug || generateSlug(validatedData.title)
    finalSlug = await generateUniqueSlug(finalSlug, id)

    // Parse tags
    const tags = validatedData.tags
      ? validatedData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : []

    // Handle publishedAt
    let publishedAt: Date | undefined = undefined
    if (validatedData.status === 'published') {
      if (validatedData.publishedAt) {
        publishedAt = new Date(validatedData.publishedAt)
      } else {
        publishedAt = new Date()
      }
    }

    // Update blog post
    await updateBlogPost(id, {
      title: validatedData.title,
      slug: finalSlug,
      excerpt: validatedData.excerpt,
      content: validatedData.content,
      coverImageUrl: validatedData.coverImageUrl || undefined,
      tags,
      status: validatedData.status,
      publishedAt,
    })

    return {
      success: true,
      message: 'Blog post updated successfully',
    }
  } catch (error) {
    console.error('Error updating blog post:', error)
    return {
      success: false,
      error: 'Failed to update blog post. Please try again.',
    }
  }
}

/**
 * Server action to delete a blog post
 */
export async function deleteBlogPostAction(id: string): Promise<BlogPostActionResult> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in.',
      }
    }

    await deleteBlogPost(id)

    return {
      success: true,
      message: 'Blog post deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return {
      success: false,
      error: 'Failed to delete blog post. Please try again.',
    }
  }
}

