'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createProject, updateProject, deleteProject, getProjectBySlug } from '@/lib/db'
import { ProjectFormSchema, generateSlug, generateUniqueSlug } from '@/lib/validation/project'
import { z } from 'zod'

export type ProjectActionResult =
  | { success: true; message?: string; projectId?: string }
  | { success: false; error: string; errors?: Record<string, string> }

/**
 * Server action to create a new project
 */
export async function createProjectAction(
  formData: FormData
): Promise<ProjectActionResult> {
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
      shortDescription: formData.get('shortDescription')?.toString() || '',
      longDescription: formData.get('longDescription')?.toString() || '',
      tags: formData.get('tags')?.toString() || '',
      thumbnailUrl: formData.get('thumbnailUrl')?.toString() || '',
      heroImageUrl: formData.get('heroImageUrl')?.toString() || '',
      year: formData.get('year')?.toString() || '',
      clientName: formData.get('clientName')?.toString() || '',
      role: formData.get('role')?.toString() || '',
      liveUrl: formData.get('liveUrl')?.toString() || '',
      isFeatured: formData.get('isFeatured')?.toString() || '',
      order: formData.get('order')?.toString() || '100',
    }

    // Validate with Zod
    const validationResult = ProjectFormSchema.safeParse(rawData)

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

    // Create project
    const project = await createProject({
      title: validatedData.title,
      slug: finalSlug,
      shortDescription: validatedData.shortDescription,
      longDescription: validatedData.longDescription || undefined,
      tags,
      thumbnailUrl: validatedData.thumbnailUrl || undefined,
      heroImageUrl: validatedData.heroImageUrl || undefined,
      year: validatedData.year ? parseInt(validatedData.year) : undefined,
      clientName: validatedData.clientName || undefined,
      role: validatedData.role || undefined,
      liveUrl: validatedData.liveUrl || undefined,
      isFeatured: validatedData.isFeatured || false,
      order: validatedData.order ? parseInt(validatedData.order) : 100,
    })

    return {
      success: true,
      message: 'Project created successfully',
      projectId: project.id,
    }
  } catch (error) {
    console.error('Error creating project:', error)
    return {
      success: false,
      error: 'Failed to create project. Please try again.',
    }
  }
}

/**
 * Server action to update an existing project
 */
export async function updateProjectAction(
  id: string,
  formData: FormData
): Promise<ProjectActionResult> {
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
      shortDescription: formData.get('shortDescription')?.toString() || '',
      longDescription: formData.get('longDescription')?.toString() || '',
      tags: formData.get('tags')?.toString() || '',
      thumbnailUrl: formData.get('thumbnailUrl')?.toString() || '',
      heroImageUrl: formData.get('heroImageUrl')?.toString() || '',
      year: formData.get('year')?.toString() || '',
      clientName: formData.get('clientName')?.toString() || '',
      role: formData.get('role')?.toString() || '',
      liveUrl: formData.get('liveUrl')?.toString() || '',
      isFeatured: formData.get('isFeatured')?.toString() || '',
      order: formData.get('order')?.toString() || '',
    }

    // Validate with Zod
    const validationResult = ProjectFormSchema.safeParse(rawData)

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

    // Update project
    await updateProject(id, {
      title: validatedData.title,
      slug: finalSlug,
      shortDescription: validatedData.shortDescription,
      longDescription: validatedData.longDescription || undefined,
      tags,
      thumbnailUrl: validatedData.thumbnailUrl || undefined,
      heroImageUrl: validatedData.heroImageUrl || undefined,
      year: validatedData.year ? parseInt(validatedData.year) : undefined,
      clientName: validatedData.clientName || undefined,
      role: validatedData.role || undefined,
      liveUrl: validatedData.liveUrl || undefined,
      isFeatured: validatedData.isFeatured || false,
      order: validatedData.order ? parseInt(validatedData.order) : undefined,
    })

    return {
      success: true,
      message: 'Project updated successfully',
    }
  } catch (error) {
    console.error('Error updating project:', error)
    return {
      success: false,
      error: 'Failed to update project. Please try again.',
    }
  }
}

/**
 * Server action to delete a project
 */
export async function deleteProjectAction(id: string): Promise<ProjectActionResult> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in.',
      }
    }

    await deleteProject(id)

    return {
      success: true,
      message: 'Project deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    return {
      success: false,
      error: 'Failed to delete project. Please try again.',
    }
  }
}

