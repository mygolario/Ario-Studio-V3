import { notFound, redirect } from 'next/navigation'
import { getProjectById } from '@/lib/db'
import { updateProjectAction, deleteProjectAction } from '@/app/admin/projects/actions'
import ProjectForm from '@/components/admin/ProjectForm'
import DeleteProjectButton from '@/components/admin/DeleteProjectButton'

export default async function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const project = await getProjectById(params.id).catch(() => null)

  if (!project) {
    notFound()
  }

  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await updateProjectAction(params.id, formData)
    return result
  }

  async function handleDelete() {
    'use server'
    const result = await deleteProjectAction(params.id)
    
    if (result.success) {
      redirect('/admin/projects')
    }
    
    return result
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Edit Project</h1>
        <p className="text-body text-text-secondary">
          Update project details
        </p>
      </div>

      <div className="space-y-6">
        <ProjectForm project={project} action={handleSubmit} />
        
        <div className="bg-surface border border-border-subtle rounded-xl p-8">
          <h2 className="text-h4 font-semibold text-text-primary mb-4">Danger Zone</h2>
          <p className="text-body-sm text-text-secondary mb-4">
            Once you delete a project, there is no going back. Please be certain.
          </p>
          <DeleteProjectButton onDelete={handleDelete} projectTitle={project.title} />
        </div>
      </div>
    </div>
  )
}

