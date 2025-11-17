'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

export default function LeadsFilter({ currentStatus }: { currentStatus: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status === 'all') {
      params.delete('status')
    } else {
      params.set('status', status)
    }
    router.push(`/admin/leads?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {statusOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleStatusChange(option.value)}
          className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all duration-200 ${
            currentStatus === option.value
              ? 'bg-orange text-pure-white'
              : 'bg-surface border border-border-subtle text-text-secondary hover:border-orange hover:text-orange'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

