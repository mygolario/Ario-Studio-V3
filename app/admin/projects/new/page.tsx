import { redirect } from 'next/navigation'
import { createProjectAction } from '@/app/admin/projects/actions'
import ProjectForm from '@/components/admin/ProjectForm'

export default function CreateProjectPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await createProjectAction(formData)
    
    if (result.success) {
      if (result.projectId) {
        redirect(`/admin/projects/${result.projectId}`)
      } else {
        redirect('/admin/projects')
      }
    }
    
    return result
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Create New Project</h1>
        <p className="text-body text-text-secondary">
          Add a new project to your portfolio
        </p>
      </div>

      <ProjectForm action={handleSubmit} />
    </div>
  )
}

