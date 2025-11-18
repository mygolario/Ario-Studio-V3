import { notFound, redirect } from 'next/navigation'
import { getCaseStudyById, getProjects } from '@/lib/db'
import { updateCaseStudyAction, deleteCaseStudyAction } from '@/app/admin/case-studies/actions'
import CaseStudyForm from '@/components/admin/CaseStudyForm'
import DeleteCaseStudyButton from '@/components/admin/DeleteCaseStudyButton'

export default async function EditCaseStudyPage({
  params,
}: {
  params: { id: string }
}) {
  const [caseStudy, projects] = await Promise.all([
    getCaseStudyById(params.id).catch(() => null),
    getProjects().catch(() => []),
  ])

  if (!caseStudy) {
    notFound()
  }

  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await updateCaseStudyAction(params.id, formData)
    return result
  }

  async function handleDelete() {
    'use server'
    const result = await deleteCaseStudyAction(params.id)
    
    if (result.success) {
      redirect('/admin/case-studies')
    }
    
    return result
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Edit Case Study</h1>
        <p className="text-body text-text-secondary">
          Update case study details
        </p>
      </div>

      <div className="space-y-6">
        <CaseStudyForm caseStudy={caseStudy} projects={projects} action={handleSubmit} />
        
        <div className="bg-surface border border-border-subtle rounded-xl p-8">
          <h2 className="text-h4 font-semibold text-text-primary mb-4">Danger Zone</h2>
          <p className="text-body-sm text-text-secondary mb-4">
            Once you delete a case study, there is no going back. Please be certain.
          </p>
          <DeleteCaseStudyButton onDelete={handleDelete} caseStudyTitle={caseStudy.title} />
        </div>
      </div>
    </div>
  )
}

