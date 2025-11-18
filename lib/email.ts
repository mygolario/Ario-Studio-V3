import { Lead } from '@prisma/client'
import { Resend } from 'resend'

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
      from: process.env.ARIO_STUDIO_FROM_EMAIL || process.env.EMAIL_FROM || 'Ario Studio <onboarding@resend.dev>',
      to: toEmail,
      subject,
      html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${body}</pre>`,
    })

    console.log(`Lead notification email sent for lead: ${lead.id}`)
  } catch (error) {
    // Log error but don't throw - email failure shouldn't break form submission
    console.error('Failed to send lead notification email:', error)
    // Don't re-throw - let caller handle gracefully
  }
}

/**
 * Send an auto-reply email to the lead
 * 
 * This function sends a professional thank-you email to the lead.
 * If email env vars / API keys are missing, it logs a warning and returns without throwing.
 * 
 * @param lead - The lead record to send auto-reply to
 */
export async function sendLeadAutoReplyEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.ARIO_STUDIO_FROM_EMAIL || process.env.EMAIL_FROM || 'Ario Studio <onboarding@resend.dev>'

  // Skip if email is not configured
  if (!apiKey) {
    console.warn('Auto-reply email skipped: RESEND_API_KEY not configured')
    return
  }

  try {
    const resend = new Resend(apiKey)

    const subject = 'Thanks for reaching out to Ario Studio'

    // Build email body
    let body = `Hi ${lead.name},

Thank you for reaching out to Ario Studio! We've received your inquiry and are excited about the possibility of working together.

Here's a summary of what you submitted:
${lead.budgetRange ? `- Budget: ${lead.budgetRange}` : ''}
${lead.timeline ? `- Timeline: ${lead.timeline}` : ''}
${lead.servicesNeeded && lead.servicesNeeded.length > 0
  ? `- Services: ${lead.servicesNeeded.join(', ')}`
  : ''}

${lead.aiSummary
  ? `Here's how we understood your project:\n${lead.aiSummary}\n\n`
  : ''}Next Steps:
We'll review your project details and get back to you within 24-48 hours. In the meantime, feel free to explore our work at https://ario-studio-v3.vercel.app/work.

If you have any urgent questions, don't hesitate to reach out directly.

Best regards,
Ario Studio Team

---
Ario Studio
Cinematic, AI-driven web experiences`

    await resend.emails.send({
      from: fromEmail,
      to: lead.email,
      subject,
      html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${body}</pre>`,
    })

    console.log(`Auto-reply email sent to lead: ${lead.id}`)
  } catch (error) {
    // Log error but don't throw - email failure shouldn't break form submission
    console.error('Failed to send lead auto-reply email:', error)
    // Don't re-throw - let caller handle gracefully
  }
}

