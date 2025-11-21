'use client'

import { useState, useTransition } from 'react'
import { BlogPostActionResult } from '@/app/admin/blog/actions'

interface DeleteBlogPostButtonProps {
  onDelete: () => Promise<BlogPostActionResult>
  postTitle: string
}

export default function DeleteBlogPostButton({
  onDelete,
  postTitle,
}: DeleteBlogPostButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)
  const [result, setResult] = useState<BlogPostActionResult | null>(null)

  const handleDelete = () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    startTransition(async () => {
      const actionResult = await onDelete()
      setResult(actionResult)
    })
  }

  if (result && result.success) {
    return null // Component will unmount after redirect
  }

  return (
    <div>
      {!showConfirm ? (
        <button
          type="button"
          onClick={handleDelete}
          className="px-6 py-3 rounded-full border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete Post
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-body-sm text-red-500 mb-2">
              Are you sure you want to delete &quot;{postTitle}&quot;?
            </p>
            <p className="text-body-sm text-text-secondary">
              This action cannot be undone.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="px-6 py-3 rounded-full bg-red-500 text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {isPending ? 'Deleting...' : 'Yes, delete it'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowConfirm(false)
                setResult(null)
              }}
              disabled={isPending}
              className="px-6 py-3 rounded-full border border-border-subtle text-text-secondary hover:text-text-primary hover:border-orange transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
          {result && !result.success && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-body-sm text-red-500">{result.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

