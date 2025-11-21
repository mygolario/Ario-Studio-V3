'use client'

import { useState, useTransition } from 'react'
import { updateLeadAction } from '@/app/admin/leads/actions'
import { getLeadById } from '@/lib/db'

// Type for lead (inferred from Prisma)
type Lead = NonNullable<Awaited<ReturnType<typeof getLeadById>>>

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

export default function LeadDetailForm({ lead }: { lead: Lead }) {
  const [status, setStatus] = useState(lead.status)
  const [notes, setNotes] = useState(lead.internalNotes || '')
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    startTransition(async () => {
      const result = await updateLeadAction({
        id: lead.id,
        status,
        internalNotes: notes,
      })

      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Lead updated successfully' })
        // Clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-surface border border-border-subtle rounded-xl p-6">
        <h2 className="text-h4 font-semibold text-text-primary mb-6">Manage Lead</h2>

        {/* Status Selector */}
        <div className="mb-6">
          <label
            htmlFor="status"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200 disabled:opacity-50"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Internal Notes */}
        <div className="mb-6">
          <label
            htmlFor="notes"
            className="block text-body-sm font-medium text-text-primary mb-2"
          >
            Internal Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isPending}
            rows={8}
            className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:border-orange transition-all duration-200 resize-none disabled:opacity-50"
            placeholder="Add internal notes about this lead..."
          />
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-lg mb-4 ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}
          >
            <p
              className={`text-body-sm ${
                message.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message.text}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-3 rounded-full bg-orange text-pure-white font-medium hover:brightness-105 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}

