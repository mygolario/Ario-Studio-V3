import { redirect } from 'next/navigation'
import { getProjects } from '@/lib/db'
import { createCaseStudyAction } from '@/app/admin/case-studies/actions'
import CaseStudyForm from '@/components/admin/CaseStudyForm'

export default async function NewCaseStudyPage() {
  const projects = await getProjects().catch(() => [])

  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await createCaseStudyAction(formData)
    
    if (result.success) {
      if (result.caseStudyId) {
        redirect(`/admin/case-studies/${result.caseStudyId}`)
      } else {
        redirect('/admin/case-studies')
      }
    }
    
    return result
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Create New Case Study</h1>
        <p className="text-body text-text-secondary">
          Create a new case study linked to a project
        </p>
      </div>

      <CaseStudyForm projects={projects} action={handleSubmit} />
    </div>
  )
}

