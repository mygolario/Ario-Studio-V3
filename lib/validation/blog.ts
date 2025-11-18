import { z } from 'zod'

/**
 * Zod validation schema for BlogPost form submission
 */
export const BlogPostFormSchema = z.object({
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
  excerpt: z
    .string()
    .min(1, 'Excerpt is required')
    .max(500, 'Excerpt must be less than 500 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(50000, 'Content must be less than 50000 characters'),
  coverImageUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || z.string().url().safeParse(val).success,
      'Must be a valid URL'
    )
    .or(z.literal('')),
  tags: z
    .string()
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

export type BlogPostFormValues = z.infer<typeof BlogPostFormSchema>

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
    const existing = await prisma.blogPost.findUnique({
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

