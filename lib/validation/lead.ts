import { z } from 'zod'

/**
 * Zod validation schema for Lead form submission
 */
export const LeadFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
  companyName: z.string().max(200, 'Company name must be less than 200 characters').optional().or(z.literal('')),
  budgetRange: z.string().optional().or(z.literal('')),
  timeline: z.string().optional().or(z.literal('')),
  servicesNeeded: z.array(z.string()).optional().default([]),
  projectType: z.string().optional().or(z.literal('')),
  source: z.string().default('start_project_form'),
})

/**
 * Inferred TypeScript type from the schema
 */
export type LeadFormValues = z.infer<typeof LeadFormSchema>

