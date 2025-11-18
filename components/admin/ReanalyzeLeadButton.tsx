'use client'

import { useState, useTransition } from 'react'
import { reanalyzeLeadWithAIAction } from '@/app/admin/leads/actions'

interface ReanalyzeLeadButtonProps {
  leadId: string
}

export default function ReanalyzeLeadButton({ leadId }: ReanalyzeLeadButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message?: string } | null>(null)

  const handleReanalyze = () => {
    setResult(null)
    startTransition(async () => {
      const actionResult = await reanalyzeLeadWithAIAction(leadId)
      setResult(actionResult)
      
      if (actionResult.success) {
        // Refresh the page to show updated AI insights
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    })
  }

  return (
    <div>
      <button
        onClick={handleReanalyze}
        disabled={isPending}
        className="px-4 py-2 rounded-full border border-border-subtle text-body-sm font-medium text-text-secondary hover:text-text-primary hover:border-orange transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
      >
        {isPending ? 'Analyzing...' : 'Re-run AI analysis'}
      </button>
      {result && (
        <div className={`mt-2 text-body-sm ${result.success ? 'text-green-500' : 'text-red-500'}`}>
          {result.message}
        </div>
      )}
    </div>
  )
}

