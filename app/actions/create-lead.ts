'use server'

import { LeadFormSchema, type LeadFormValues } from '@/lib/validation/lead'
import { createLead } from '@/lib/db'
import { sendLeadNotificationEmail, sendLeadAutoReplyEmail } from '@/lib/email'
import { enrichLeadWithAI } from '@/lib/ai'

/**
 * Server action result type
 */
export type CreateLeadActionResult =
  | {
      success: true
      message?: string
    }
  | {
      success: false
      errors?: {
        name?: string
        email?: string
        message?: string
        companyName?: string
        budgetRange?: string
        timeline?: string
        servicesNeeded?: string
        projectType?: string
        _form?: string
      }
      message?: string
    }

/**
 * Server action to create a lead from form submission
 * 
 * @param formData - FormData from the form submission
 * @returns Result object with success/error state
 */
export async function createLeadAction(
  formData: FormData
): Promise<CreateLeadActionResult> {
  try {
    // Parse form data into plain object
    const rawData = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      companyName: formData.get('companyName')?.toString() || '',
      budgetRange: formData.get('budget')?.toString() || '',
      timeline: formData.get('timeline')?.toString() || '',
      projectType: formData.get('projectType')?.toString() || '',
      servicesNeeded: formData.get('servicesNeeded')
        ? (formData.get('servicesNeeded') as string).split(',').filter(Boolean)
        : [],
      source: formData.get('source')?.toString() || 'start_project_form',
    }

    // Validate with Zod
    const validationResult = LeadFormSchema.safeParse(rawData)

    if (!validationResult.success) {
      // Format Zod errors into field-level errors
      const errors: NonNullable<Extract<CreateLeadActionResult, { success: false }>['errors']> = {}
      
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof errors
        if (field && field !== '_form') {
          errors[field] = issue.message
        }
      })

      return {
        success: false,
        errors,
        message: 'Please fix the errors below and try again.',
      }
    }

    const validatedData = validationResult.data

    // Map form fields to Lead model
    // Include projectType in message if provided
    const messageWithProjectType = validatedData.projectType
      ? `Project Type: ${validatedData.projectType}\n\n${validatedData.message}`
      : validatedData.message

    // Attempt AI enrichment (non-blocking, graceful degradation)
    let aiEnrichment = null
    try {
      aiEnrichment = await enrichLeadWithAI({
        name: validatedData.name,
        email: validatedData.email,
        companyName: validatedData.companyName || undefined,
        budgetRange: validatedData.budgetRange || undefined,
        timeline: validatedData.timeline || undefined,
        servicesNeeded: validatedData.servicesNeeded || [],
        message: messageWithProjectType,
      })
    } catch (aiError) {
      // Log AI error but don't fail the form submission
      console.warn('AI enrichment failed (continuing without AI data):', aiError)
    }

    const leadData = {
      name: validatedData.name,
      email: validatedData.email,
      message: messageWithProjectType,
      companyName: validatedData.companyName || undefined,
      budgetRange: validatedData.budgetRange || undefined,
      timeline: validatedData.timeline || undefined,
      servicesNeeded: validatedData.servicesNeeded || [],
      source: validatedData.source,
      status: 'new' as const,
      // Include AI enrichment if available
      aiSummary: aiEnrichment?.summary,
      aiTags: aiEnrichment?.tags,
      aiPriorityScore: aiEnrichment?.priorityScore,
      aiNotes: aiEnrichment?.notes,
    }

    // Create lead in database
    const lead = await createLead(leadData)

    // Send emails (non-blocking, graceful degradation)
    try {
      await sendLeadNotificationEmail(lead)
    } catch (emailError) {
      // Log email error but don't fail the form submission
      console.warn('Failed to send lead notification email:', emailError)
    }

    // Send auto-reply to lead
    try {
      await sendLeadAutoReplyEmail(lead)
    } catch (emailError) {
      // Log email error but don't fail the form submission
      console.warn('Failed to send lead auto-reply email:', emailError)
    }

    return {
      success: true,
      message: 'Thank you! We\'ll get back to you soon.',
    }
  } catch (error) {
    // Log unexpected errors
    console.error('Error creating lead:', error)

    // Return generic error message
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
      errors: {
        _form: 'An unexpected error occurred. Please try again.',
      },
    }
  }
}

