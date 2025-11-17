import { Lead } from '@prisma/client'

/**
 * Send a lead notification email
 * 
 * This function only sends an email if RESEND_API_KEY is configured.
 * If not configured, it logs a warning and returns without error.
 * 
 * @param lead - The lead record to send notification about
 */
export async function sendLeadNotificationEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL

  // Skip if email is not configured
  if (!apiKey || !toEmail) {
    console.warn(
      'Email notification skipped: RESEND_API_KEY or LEAD_NOTIFICATION_EMAIL not configured'
    )
    return
  }

  try {
    // Try to use Resend if available
    // Use Function constructor to avoid webpack analyzing the import
    let Resend: any = null
    try {
      // Dynamic require that webpack can't analyze
      const requireResend = new Function('return require("resend")')
      const resendModule = requireResend()
      Resend = resendModule.Resend || resendModule.default?.Resend || resendModule.default
    } catch (importError) {
      // Resend package not installed - that's okay, email is optional
      console.warn('Resend package not installed. Email notifications disabled. Install with: npm install resend')
      return
    }

    if (!Resend) {
      console.warn('Resend package not available. Email notifications disabled.')
      return
    }

    const resend = new Resend(apiKey)

    const subject = `New Lead: ${lead.name}${lead.companyName ? ` from ${lead.companyName}` : ''}`
    
    // Build email body
    const body = `
New lead submitted from ${lead.source}

Contact Information:
- Name: ${lead.name}
- Email: ${lead.email}
${lead.companyName ? `- Company: ${lead.companyName}` : ''}

Project Details:
${lead.budgetRange ? `- Budget: ${lead.budgetRange}` : ''}
${lead.timeline ? `- Timeline: ${lead.timeline}` : ''}
${lead.servicesNeeded && lead.servicesNeeded.length > 0
  ? `- Services Needed: ${lead.servicesNeeded.join(', ')}`
  : ''}

Message:
${lead.message}

---
Submitted: ${lead.createdAt.toLocaleString()}
Lead ID: ${lead.id}
    `.trim()

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: toEmail,
      subject,
      text: body,
    })

    console.log(`Lead notification email sent for lead: ${lead.id}`)
  } catch (error) {
    // Log error but don't throw - email failure shouldn't break form submission
    console.error('Failed to send lead notification email:', error)
    throw error // Re-throw so caller can handle if needed
  }
}

