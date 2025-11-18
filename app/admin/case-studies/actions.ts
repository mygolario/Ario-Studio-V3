'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createCaseStudy, updateCaseStudy, deleteCaseStudy, getProjectById } from '@/lib/db'
import { CaseStudyFormSchema, generateSlug, generateUniqueSlug } from '@/lib/validation/case-study'

export type CaseStudyActionResult =
  | { success: true; message?: string; caseStudyId?: string }
  | { success: false; error: string; errors?: Record<string, string> }

/**
 * Server action to create a new case study
 */
export async function createCaseStudyAction(
  formData: FormData
): Promise<CaseStudyActionResult> {
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
      projectId: formData.get('projectId')?.toString() || '',
      title: formData.get('title')?.toString() || '',
      slug: formData.get('slug')?.toString() || '',
      heroImageUrl: formData.get('heroImageUrl')?.toString() || '',
      summary: formData.get('summary')?.toString() || '',
      challenge: formData.get('challenge')?.toString() || '',
      solution: formData.get('solution')?.toString() || '',
      results: formData.get('results')?.toString() || '',
      metrics: formData.get('metrics')?.toString() || '',
      content: formData.get('content')?.toString() || '',
      status: formData.get('status')?.toString() || 'draft',
      publishedAt: formData.get('publishedAt')?.toString() || '',
    }

    // Validate with Zod
    const validationResult = CaseStudyFormSchema.safeParse(rawData)

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

    // Verify project exists
    const project = await getProjectById(validatedData.projectId)
    if (!project) {
      return {
        success: false,
        error: 'Selected project does not exist.',
      }
    }

    // Generate slug if not provided
    let finalSlug = validatedData.slug || generateSlug(validatedData.title)
    finalSlug = await generateUniqueSlug(finalSlug)

    // Parse metrics (JSON string)
    let metrics: any = undefined
    if (validatedData.metrics) {
      try {
        metrics = JSON.parse(validatedData.metrics)
      } catch {
        // If invalid JSON, ignore
      }
    }

    // Handle publishedAt
    let publishedAt: Date | undefined = undefined
    if (validatedData.status === 'published') {
      if (validatedData.publishedAt) {
        publishedAt = new Date(validatedData.publishedAt)
      } else {
        publishedAt = new Date()
      }
    }

    // Create case study
    const caseStudy = await createCaseStudy({
      projectId: validatedData.projectId,
      slug: finalSlug,
      title: validatedData.title,
      heroImageUrl: validatedData.heroImageUrl || undefined,
      summary: validatedData.summary,
      challenge: validatedData.challenge,
      solution: validatedData.solution,
      results: validatedData.results,
      metrics,
      content: validatedData.content || undefined,
      status: validatedData.status,
      publishedAt,
    })

    return {
      success: true,
      message: 'Case study created successfully',
      caseStudyId: caseStudy.id,
    }
  } catch (error) {
    console.error('Error creating case study:', error)
    return {
      success: false,
      error: 'Failed to create case study. Please try again.',
    }
  }
}

/**
 * Server action to update an existing case study
 */
export async function updateCaseStudyAction(
  id: string,
  formData: FormData
): Promise<CaseStudyActionResult> {
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
      projectId: formData.get('projectId')?.toString() || '',
      title: formData.get('title')?.toString() || '',
      slug: formData.get('slug')?.toString() || '',
      heroImageUrl: formData.get('heroImageUrl')?.toString() || '',
      summary: formData.get('summary')?.toString() || '',
      challenge: formData.get('challenge')?.toString() || '',
      solution: formData.get('solution')?.toString() || '',
      results: formData.get('results')?.toString() || '',
      metrics: formData.get('metrics')?.toString() || '',
      content: formData.get('content')?.toString() || '',
      status: formData.get('status')?.toString() || 'draft',
      publishedAt: formData.get('publishedAt')?.toString() || '',
    }

    // Validate with Zod
    const validationResult = CaseStudyFormSchema.safeParse(rawData)

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

    // Verify project exists if changed
    if (validatedData.projectId) {
      const project = await getProjectById(validatedData.projectId)
      if (!project) {
        return {
          success: false,
          error: 'Selected project does not exist.',
        }
      }
    }

    // Generate slug if not provided
    let finalSlug = validatedData.slug || generateSlug(validatedData.title)
    finalSlug = await generateUniqueSlug(finalSlug, id)

    // Parse metrics (JSON string)
    let metrics: any = undefined
    if (validatedData.metrics) {
      try {
        metrics = JSON.parse(validatedData.metrics)
      } catch {
        // If invalid JSON, ignore
      }
    }

    // Handle publishedAt
    let publishedAt: Date | undefined = undefined
    if (validatedData.status === 'published') {
      if (validatedData.publishedAt) {
        publishedAt = new Date(validatedData.publishedAt)
      } else {
        publishedAt = new Date()
      }
    }

    // Update case study
    await updateCaseStudy(id, {
      projectId: validatedData.projectId,
      slug: finalSlug,
      title: validatedData.title,
      heroImageUrl: validatedData.heroImageUrl || undefined,
      summary: validatedData.summary,
      challenge: validatedData.challenge,
      solution: validatedData.solution,
      results: validatedData.results,
      metrics,
      content: validatedData.content || undefined,
      status: validatedData.status,
      publishedAt,
    })

    return {
      success: true,
      message: 'Case study updated successfully',
    }
  } catch (error) {
    console.error('Error updating case study:', error)
    return {
      success: false,
      error: 'Failed to update case study. Please try again.',
    }
  }
}

/**
 * Server action to delete a case study
 */
export async function deleteCaseStudyAction(id: string): Promise<CaseStudyActionResult> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in.',
      }
    }

    await deleteCaseStudy(id)

    return {
      success: true,
      message: 'Case study deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting case study:', error)
    return {
      success: false,
      error: 'Failed to delete case study. Please try again.',
    }
  }
}

