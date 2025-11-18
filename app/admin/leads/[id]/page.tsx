import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLeadById } from '@/lib/db'
import LeadDetailForm from '@/components/admin/LeadDetailForm'
import ReanalyzeLeadButton from '@/components/admin/ReanalyzeLeadButton'

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const lead = await getLeadById(params.id).catch(() => null)

  if (!lead) {
    notFound()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/leads"
          className="text-body-sm text-text-secondary hover:text-orange transition-colors mb-4 inline-block"
        >
          ← Back to leads
        </Link>
        <h1 className="text-h1 font-semibold text-text-primary mb-2">{lead.name}</h1>
        <p className="text-body text-text-secondary">Lead details and management</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-surface border border-border-subtle rounded-xl p-6">
            <h2 className="text-h4 font-semibold text-text-primary mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div>
                <div className="text-body-sm text-text-muted mb-1">Email</div>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-body font-medium text-text-primary hover:text-orange transition-colors"
                >
                  {lead.email}
                </a>
              </div>
              {lead.companyName && (
                <div>
                  <div className="text-body-sm text-text-muted mb-1">Company</div>
                  <div className="text-body text-text-primary">{lead.companyName}</div>
                </div>
              )}
              <div>
                <div className="text-body-sm text-text-muted mb-1">Source</div>
                <div className="text-body text-text-primary">{lead.source || '—'}</div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-surface border border-border-subtle rounded-xl p-6">
            <h2 className="text-h4 font-semibold text-text-primary mb-4">Project Details</h2>
            <div className="space-y-3 mb-6">
              {lead.budgetRange && (
                <div>
                  <div className="text-body-sm text-text-muted mb-1">Budget Range</div>
                  <div className="text-body text-text-primary">{lead.budgetRange}</div>
                </div>
              )}
              {lead.timeline && (
                <div>
                  <div className="text-body-sm text-text-muted mb-1">Timeline</div>
                  <div className="text-body text-text-primary">{lead.timeline}</div>
                </div>
              )}
              {lead.servicesNeeded && lead.servicesNeeded.length > 0 && (
                <div>
                  <div className="text-body-sm text-text-muted mb-1">Services Needed</div>
                  <div className="flex flex-wrap gap-2">
                    {lead.servicesNeeded.map((service: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-body-sm text-text-secondary bg-surface-alt border border-border-subtle px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="text-body-sm text-text-muted mb-2">Message</div>
              <div className="text-body text-text-secondary whitespace-pre-wrap bg-base border border-border-subtle rounded-lg p-4">
                {lead.message}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-surface border border-border-subtle rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h4 font-semibold text-text-primary">AI Insights</h2>
              <ReanalyzeLeadButton leadId={lead.id} />
            </div>
            {lead.aiSummary || lead.aiTags?.length > 0 || lead.aiPriorityScore || lead.aiNotes ? (
              <div className="space-y-4">
                {lead.aiSummary && (
                  <div>
                    <div className="text-body-sm text-text-muted mb-2">Summary</div>
                    <p className="text-body text-text-secondary leading-relaxed">{lead.aiSummary}</p>
                  </div>
                )}
                {lead.aiTags && lead.aiTags.length > 0 && (
                  <div>
                    <div className="text-body-sm text-text-muted mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {lead.aiTags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-body-sm text-text-secondary bg-orange/10 border border-orange/20 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {lead.aiPriorityScore && (
                  <div>
                    <div className="text-body-sm text-text-muted mb-2">Priority Score</div>
                    <span
                      className={`inline-block px-3 py-1.5 rounded text-body font-medium ${
                        lead.aiPriorityScore >= 4
                          ? 'bg-orange/20 text-orange border border-orange/40 font-semibold'
                          : lead.aiPriorityScore >= 3
                          ? 'bg-orange/10 text-orange border border-orange/20'
                          : 'bg-surface-alt text-text-muted border border-border-subtle'
                      }`}
                    >
                      {lead.aiPriorityScore}/5
                    </span>
                  </div>
                )}
                {lead.aiNotes && (
                  <div>
                    <div className="text-body-sm text-text-muted mb-2">Suggested Next Steps</div>
                    <p className="text-body-sm text-text-secondary leading-relaxed italic">{lead.aiNotes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-body-sm text-text-muted italic">
                No AI insights yet. Click &quot;Re-run AI analysis&quot; to generate insights.
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="bg-surface border border-border-subtle rounded-xl p-6">
            <h2 className="text-h4 font-semibold text-text-primary mb-4">Metadata</h2>
            <div className="space-y-3">
              <div>
                <div className="text-body-sm text-text-muted mb-1">Created</div>
                <div className="text-body text-text-secondary">{formatDate(lead.createdAt)}</div>
              </div>
              <div>
                <div className="text-body-sm text-text-muted mb-1">Last Updated</div>
                <div className="text-body text-text-secondary">{formatDate(lead.updatedAt)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Status & Notes */}
        <div className="lg:col-span-1">
          <LeadDetailForm lead={lead} />
        </div>
      </div>
    </div>
  )
}

