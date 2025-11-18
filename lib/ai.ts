import { z } from 'zod'

/**
 * Zod schema for AI lead enrichment response
 */
export const LeadEnrichmentSchema = z.object({
  summary: z.string().describe('A short human-readable summary of the lead (1-3 sentences)'),
  tags: z.array(z.string()).describe('Array of relevant tags like "high-budget", "design", "automation", "fast-timeline"'),
  priorityScore: z.number().int().min(1).max(5).describe('Priority score from 1-5, where 5 means very hot lead'),
  notes: z.string().optional().describe('Optional internal suggestions for next steps'),
})

export type LeadEnrichment = z.infer<typeof LeadEnrichmentSchema>

/**
 * AI Client for enriching leads with structured data
 * 
 * Uses OpenAI API (or compatible provider) to analyze lead information
 * and return structured insights.
 */
export async function enrichLeadWithAI(input: {
  name: string
  email: string
  companyName?: string | null
  budgetRange?: string | null
  timeline?: string | null
  servicesNeeded?: string[] | null
  message: string
}): Promise<LeadEnrichment | null> {
  const apiKey = process.env.OPENAI_API_KEY

  // If no API key, return null early (graceful degradation)
  if (!apiKey) {
    console.warn('OPENAI_API_KEY not configured. AI enrichment skipped.')
    return null
  }

  try {
    // Build the prompt
    const prompt = `Analyze the following lead information and provide structured insights.

Lead Information:
- Name: ${input.name}
- Email: ${input.email}
${input.companyName ? `- Company: ${input.companyName}` : ''}
${input.budgetRange ? `- Budget Range: ${input.budgetRange}` : ''}
${input.timeline ? `- Timeline: ${input.timeline}` : ''}
${input.servicesNeeded && input.servicesNeeded.length > 0
  ? `- Services Needed: ${input.servicesNeeded.join(', ')}`
  : ''}
- Message: ${input.message}

Please provide a JSON response with the following structure:
{
  "summary": "A short human-readable summary (1-3 sentences) of what this lead is looking for",
  "tags": ["tag1", "tag2", ...], // Relevant tags like "high-budget", "design", "automation", "fast-timeline", "enterprise", "startup", etc.
  "priorityScore": 1-5, // Where 1 = low priority, 5 = very hot lead (consider budget, timeline urgency, project size, etc.)
  "notes": "Optional internal suggestions for next steps or important context"
}

Return ONLY valid JSON, no other text.`

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Use cost-effective model
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that analyzes business leads and provides structured insights. Always return valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3, // Lower temperature for more consistent structured output
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      return null
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      console.error('No content in OpenAI response')
      return null
    }

    // Parse JSON response
    let parsed: any
    try {
      parsed = JSON.parse(content)
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError)
      return null
    }

    // Validate with Zod schema
    const validationResult = LeadEnrichmentSchema.safeParse(parsed)

    if (!validationResult.success) {
      console.error('AI response validation failed:', validationResult.error)
      return null
    }

    return validationResult.data
  } catch (error) {
    // Log error but don't throw - AI enrichment is optional
    console.error('Error enriching lead with AI:', error)
    return null
  }
}

/**
 * Generate a draft case study content using AI
 * 
 * Takes a case study's challenge, solution, and results and generates
 * a more polished, narrative-style draft.
 */
export async function generateCaseStudyDraft(input: {
  title: string
  challenge: string
  solution: string
  results: string
  projectTitle?: string
}): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.warn('OPENAI_API_KEY not configured. AI draft generation skipped.')
    return null
  }

  try {
    const prompt = `You are a professional copywriter specializing in case studies for web design and development agencies.

Create a polished, narrative-style case study draft based on the following information:

Project: ${input.projectTitle || input.title}
Title: ${input.title}

Challenge:
${input.challenge}

Solution:
${input.solution}

Results:
${input.results}

Write a compelling case study draft that:
- Tells a clear story from challenge to solution to results
- Uses professional, engaging language
- Highlights key achievements and outcomes
- Is suitable for a web design/development agency portfolio
- Is approximately 500-800 words

Return ONLY the case study content, no other text or formatting.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional copywriter that creates compelling case studies for web design and development agencies. Return only the case study content, no other text.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      return null
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      console.error('No content in OpenAI response')
      return null
    }

    return content.trim()
  } catch (error) {
    console.error('Error generating case study draft:', error)
    return null
  }
}

