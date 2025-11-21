import { z } from 'zod'

/**
 * Zod validation schema for CaseStudy form submission
 */
export const CaseStudyFormSchema = z.object({
  projectId: z
    .string()
    .min(1, 'Project is required'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  slug: z
    .string()
    .max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional()
    .or(z.literal('')),
  heroImageUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || z.string().url().safeParse(val).success,
      'Must be a valid URL'
    )
    .or(z.literal('')),
  summary: z
    .string()
    .min(1, 'Summary is required')
    .max(500, 'Summary must be less than 500 characters'),
  challenge: z
    .string()
    .min(1, 'Challenge is required')
    .max(10000, 'Challenge must be less than 10000 characters'),
  solution: z
    .string()
    .min(1, 'Solution is required')
    .max(10000, 'Solution must be less than 10000 characters'),
  results: z
    .string()
    .min(1, 'Results is required')
    .max(10000, 'Results must be less than 10000 characters'),
  metrics: z
    .string()
    .optional()
    .or(z.literal('')),
  content: z
    .string()
    .max(50000, 'Content must be less than 50000 characters')
    .optional()
    .or(z.literal('')),
  status: z
    .string()
    .refine((val) => val === 'draft' || val === 'published', 'Status must be draft or published'),
  publishedAt: z
    .string()
    .optional()
    .or(z.literal('')),
})

export type CaseStudyFormValues = z.infer<typeof CaseStudyFormSchema>

/**
 * Generate a URL-safe slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a number if needed
 */
export async function generateUniqueSlug(
  baseSlug: string,
  excludeId?: string
): Promise<string> {
  const dbModule = await import('@/lib/db')
  const prisma = dbModule.prisma
  
  let slug = baseSlug
  let counter = 1
  
  while (true) {
    const existing = await prisma.caseStudy.findUnique({
      where: { slug },
      select: { id: true },
    })
    
    if (!existing || (excludeId && existing.id === excludeId)) {
      return slug
    }
    
    slug = `${baseSlug}-${counter}`
    counter++
  }
}

