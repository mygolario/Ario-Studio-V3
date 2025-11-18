'use client'

import { useState, useTransition } from 'react'
import { generateCaseStudyDraftAction } from '@/app/admin/case-studies/[id]/actions'

interface GenerateCaseStudyDraftButtonProps {
  caseStudyId: string
}

export default function GenerateCaseStudyDraftButton({
  caseStudyId,
}: GenerateCaseStudyDraftButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; draft?: string; error?: string } | null>(null)
  const [showDraft, setShowDraft] = useState(false)

  const handleGenerate = () => {
    setResult(null)
    setShowDraft(false)
    startTransition(async () => {
      const actionResult = await generateCaseStudyDraftAction(caseStudyId)
      setResult(actionResult)
      if (actionResult.success) {
        setShowDraft(true)
      }
    })
  }

  const handleCopyDraft = () => {
    if (result?.success && result.draft) {
      navigator.clipboard.writeText(result.draft)
      alert('Draft copied to clipboard!')
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleGenerate}
        disabled={isPending}
        className="px-6 py-3 rounded-full bg-orange text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
      >
        {isPending ? 'Generating draft...' : 'Generate draft content with AI'}
      </button>

      {result && !result.success && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-body-sm text-red-500">{result.error}</p>
        </div>
      )}

      {result && result.success && result.draft && showDraft && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-body-sm text-green-500 mb-2">Draft generated successfully!</p>
            <p className="text-body-sm text-text-secondary">
              Review the draft below and copy it to the Content field if you&apos;d like to use it.
            </p>
          </div>
          <div className="bg-base border border-border-subtle rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-body-sm font-medium text-text-primary">Generated Draft</span>
              <button
                onClick={handleCopyDraft}
                className="px-3 py-1.5 rounded text-body-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors"
              >
                Copy
              </button>
            </div>
            <div className="text-body-sm text-text-secondary whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {result.draft}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

