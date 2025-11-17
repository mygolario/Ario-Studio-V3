import Link from 'next/link'
import { getLeadStats, getLeads } from '@/lib/db'

export default async function AdminDashboard() {
  const [stats, recentLeads] = await Promise.all([
    getLeadStats().catch(() => ({ total: 0, new: 0, last7Days: 0, byStatus: {} })),
    getLeads().then((leads) => leads.slice(0, 5)).catch(() => []),
  ])

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
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Dashboard</h1>
        <p className="text-body text-text-secondary">Overview of leads and activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface border border-border-subtle rounded-xl p-6">
          <div className="text-body-sm text-text-muted mb-1">Total Leads</div>
          <div className="text-h2 font-semibold text-text-primary">{stats.total}</div>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-6">
          <div className="text-body-sm text-text-muted mb-1">New Leads</div>
          <div className="text-h2 font-semibold text-orange">{stats.new}</div>
        </div>
        <div className="bg-surface border border-border-subtle rounded-xl p-6">
          <div className="text-body-sm text-text-muted mb-1">Last 7 Days</div>
          <div className="text-h2 font-semibold text-text-primary">{stats.last7Days}</div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
          <h2 className="text-h3 font-semibold text-text-primary">Recent Leads</h2>
          <Link
            href="/admin/leads"
            className="text-body-sm font-medium text-orange hover:text-orange/80 transition-colors"
          >
            View all →
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No leads yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-alt border-b border-border-subtle">
                <tr>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Name</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Email</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Services</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Budget</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Status</th>
                  <th className="text-left text-body-sm font-medium text-text-primary p-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
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
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.servicesNeeded && lead.servicesNeeded.length > 0 ? (
                          lead.servicesNeeded.slice(0, 2).map((service, idx) => (
                            <span
                              key={idx}
                              className="text-body-sm text-text-muted bg-surface-alt border border-border-subtle px-2 py-0.5 rounded"
                            >
                              {service}
                            </span>
                          ))
                        ) : (
                          <span className="text-body-sm text-text-muted">—</span>
                        )}
                      </div>
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

