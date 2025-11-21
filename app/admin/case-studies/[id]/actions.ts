'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getCaseStudyById } from '@/lib/db'
import { generateCaseStudyDraft } from '@/lib/ai'

export type GenerateDraftActionResult =
  | { success: true; draft: string }
  | { success: false; error: string }

/**
 * Server action to generate a case study draft using AI
 * 
 * Requires admin authentication
 */
export async function generateCaseStudyDraftAction(
  caseStudyId: string
): Promise<GenerateDraftActionResult> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized. Please sign in.',
      }
    }

    // Fetch the case study
    const caseStudy = await getCaseStudyById(caseStudyId)

    if (!caseStudy) {
      return {
        success: false,
        error: 'Case study not found.',
      }
    }

    // Generate draft with AI
    const draft = await generateCaseStudyDraft({
      title: caseStudy.title,
      challenge: caseStudy.challenge,
      solution: caseStudy.solution,
      results: caseStudy.results,
      projectTitle: caseStudy.project?.title,
    })

    if (!draft) {
      return {
        success: false,
        error: 'AI draft generation failed. Please check OPENAI_API_KEY configuration.',
      }
    }

    return {
      success: true,
      draft,
    }
  } catch (error) {
    console.error('Error generating case study draft:', error)
    return {
      success: false,
      error: 'Failed to generate draft. Please try again.',
    }
  }
}

