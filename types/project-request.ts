/**
 * Project Request Payload Type
 * 
 * Used for both client-side form data and API request payload
 */

export type ProjectRequestLocale = 'fa' | 'en'

export interface ProjectRequestPayload {
  name: string
  email: string
  projectType: string
  projectTypeOther?: string
  budgetRange: string
  deadline?: string
  message: string
  locale: ProjectRequestLocale
  url?: string // Optional URL field for tracking submission source
}

