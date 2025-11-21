import { z } from 'zod'

/**
 * Zod validation schema for Project form submission
 */
export const ProjectFormSchema = z.object({
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
  shortDescription: z
    .string()
    .min(1, 'Short description is required')
    .max(500, 'Short description must be less than 500 characters'),
  longDescription: z
    .string()
    .max(10000, 'Long description must be less than 10000 characters')
    .optional()
    .or(z.literal('')),
  tags: z
    .string()
    .optional()
    .or(z.literal('')),
  thumbnailUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || z.string().url().safeParse(val).success,
      'Must be a valid URL'
    )
    .or(z.literal('')),
  heroImageUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || z.string().url().safeParse(val).success,
      'Must be a valid URL'
    )
    .or(z.literal('')),
  year: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || (!isNaN(Number(val)) && Number(val) >= 1900 && Number(val) <= 2100),
      'Year must be between 1900 and 2100'
    )
    .or(z.literal('')),
  clientName: z
    .string()
    .max(200, 'Client name must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  role: z
    .string()
    .max(200, 'Role must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  liveUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || z.string().url().safeParse(val).success,
      'Must be a valid URL'
    )
    .or(z.literal('')),
  isFeatured: z
    .string()
    .optional()
    .transform((val) => val === 'on' || val === 'true'),
  order: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
      'Order must be a non-negative number'
    )
    .or(z.literal('')),
})

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>

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
    const existing = await prisma.project.findUnique({
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

