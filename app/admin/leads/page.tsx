import Link from 'next/link'
import { getLeads } from '@/lib/db'
import LeadsFilter from '@/components/admin/LeadsFilter'

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const status = searchParams.status && searchParams.status !== 'all' 
    ? searchParams.status 
    : undefined

  const leads = await getLeads(status).catch(() => [])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Leads</h1>
        <p className="text-body text-text-secondary">
          Manage and track all leads ({leads.length} total)
        </p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <LeadsFilter currentStatus={searchParams.status || 'all'} />
      </div>

      {/* Leads Table */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No leads found{status ? ` with status "${status}"` : ''}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-alt border-b border-border-subtle">
                <tr>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Name</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Email</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Source</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Budget</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Status</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border-subtle hover:bg-surface-alt transition-colors"
                  >
                    <td className="p-4">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="text-body font-medium text-text-primary hover:text-orange transition-colors"
                      >
                        {lead.name}
                      </Link>
                    </td>
                    <td className="p-4">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-body text-text-secondary hover:text-orange transition-colors"
                      >
                        {lead.email}
                      </a>
                    </td>
                    <td className="p-4 text-body text-text-secondary">
                      {lead.source || '—'}
                    </td>
                    <td className="p-4 text-body text-text-secondary">
                      {lead.budgetRange || '—'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-body-sm font-medium ${
                          lead.status === 'new'
                            ? 'bg-orange/10 text-orange border border-orange/20'
                            : lead.status === 'won'
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                            : lead.status === 'lost'
                            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                            : 'bg-surface-alt text-text-secondary border border-border-subtle'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-body-sm text-text-muted">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

