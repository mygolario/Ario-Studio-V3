'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { updateLead } from '@/lib/db'
import { z } from 'zod'

const UpdateLeadSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['new', 'reviewing', 'contacted', 'in_progress', 'won', 'lost']).optional(),
  internalNotes: z.string().optional(),
})

export type UpdateLeadActionResult =
  | { success: true; message?: string }
  | { success: false; error: string }

/**
 * Server action to update a lead's status and/or internal notes
 * 
 * Requires admin authentication
 */
export async function updateLeadAction(
  data: { id: string; status?: string; internalNotes?: string }
): Promise<UpdateLeadActionResult> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in.',
      }
    }

    // Validate input
    const validationResult = UpdateLeadSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid input data',
      }
    }

    const { id, status, internalNotes } = validationResult.data

    // Update lead
    await updateLead(id, {
      status,
      internalNotes,
    })

    return {
      success: true,
      message: 'Lead updated successfully',
    }
  } catch (error) {
    console.error('Error updating lead:', error)
    return {
      success: false,
      error: 'Failed to update lead. Please try again.',
    }
  }
}

/**
 * Server action to re-analyze a lead with AI
 * 
 * Requires admin authentication
 */
export async function reanalyzeLeadWithAIAction(
  id: string
): Promise<UpdateLeadActionResult> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in.',
      }
    }

    // Fetch the lead
    const { getLeadById } = await import('@/lib/db')
    const lead = await getLeadById(id)

    if (!lead) {
      return {
        success: false,
        error: 'Lead not found.',
      }
    }

    // Enrich with AI
    const { enrichLeadWithAI } = await import('@/lib/ai')
    const aiEnrichment = await enrichLeadWithAI({
      name: lead.name,
      email: lead.email,
      companyName: lead.companyName || undefined,
      budgetRange: lead.budgetRange || undefined,
      timeline: lead.timeline || undefined,
      servicesNeeded: lead.servicesNeeded || [],
      message: lead.message,
    })

    if (!aiEnrichment) {
      return {
        success: false,
        error: 'AI enrichment failed. Please check OPENAI_API_KEY configuration.',
      }
    }

    // Update lead with AI data
    await updateLead(id, {
      aiSummary: aiEnrichment.summary,
      aiTags: aiEnrichment.tags,
      aiPriorityScore: aiEnrichment.priorityScore,
      aiNotes: aiEnrichment.notes,
    })

    return {
      success: true,
      message: 'Lead re-analyzed successfully',
    }
  } catch (error) {
    console.error('Error re-analyzing lead:', error)
    return {
      success: false,
      error: 'Failed to re-analyze lead. Please try again.',
    }
  }
}

