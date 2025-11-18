import { Lead } from '@prisma/client'
import { Resend } from 'resend'

/**
 * Get the fixed verified sender email address
 * 
 * IMPORTANT: We do NOT have a custom domain verified in Resend.
 * Therefore, we MUST use Resend's default verified sender.
 * 
 * Resend provides a default verified sender for all accounts:
 * - onboarding@resend.dev (default for new accounts)
 * 
 * Never use the user's email as the "from" address.
 * Never use a custom domain email unless it's verified in Resend.
 */
function getVerifiedSenderEmail(): string {
  // Priority: ARIO_STUDIO_FROM_EMAIL > EMAIL_FROM > Resend default
  // If no custom sender is set, use Resend's default verified sender
  // Format: 'Name <email>' (recommended by Resend)
  return process.env.ARIO_STUDIO_FROM_EMAIL || 
         process.env.EMAIL_FROM || 
         'Ario Studio <onboarding@resend.dev>' // Resend's default verified sender with name (works without custom domain)
}

/**
 * Validate email address format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Send admin notification email when a new lead is submitted
 * 
 * This email is sent to the admin to notify them of a new lead.
 * The admin can reply directly to the lead using replyTo.
 * 
 * @param lead - The lead record to send notification about
 */
export async function sendLeadNotificationEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const adminEmailRaw = process.env.ADMIN_EMAIL

  // Skip if API key is not configured
  if (!apiKey) {
    console.warn(`Admin notification email skipped: RESEND_API_KEY is not configured`)
    return
  }

  // ADMIN_EMAIL is optional - if not set, skip admin notification
  // User auto-reply will still be sent via sendLeadAutoReplyEmail
  if (!adminEmailRaw) {
    console.log(`Admin notification skipped: ADMIN_EMAIL is not configured (this is optional)`)
    return
  }

  // Support multiple admin emails (comma-separated)
  const adminEmails = adminEmailRaw
    .split(',')
    .map(email => email.trim())
    .filter(email => email && isValidEmail(email))

  if (adminEmails.length === 0) {
    console.warn(`No valid admin email found in: ${adminEmailRaw}`)
    return
  }

  try {
    const resend = new Resend(apiKey)
    
    console.log(`Attempting to send admin notification email to: ${adminEmails.join(', ')}`)

    const subject = `New Lead: ${lead.name}${lead.companyName ? ` from ${lead.companyName}` : ''}`
    
    // Build email body - notification for admin
    const body = `New lead submitted from ${lead.source}

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

${lead.aiSummary ? `\nAI Summary:\n${lead.aiSummary}\n` : ''}
${lead.aiPriorityScore ? `Priority Score: ${lead.aiPriorityScore}/5\n` : ''}
${lead.aiTags && lead.aiTags.length > 0 ? `Tags: ${lead.aiTags.join(', ')}\n` : ''}

---
Submitted: ${lead.createdAt.toLocaleString()}
Lead ID: ${lead.id}`.trim()

    const fromEmail = getVerifiedSenderEmail()
    
    console.log(`Sending admin notification from: ${fromEmail}, to: ${adminEmails.join(', ')}, replyTo: ${lead.email}`)
    
    // Send to all admin emails
    const sendPromises = adminEmails.map(adminEmail =>
      resend.emails.send({
        from: fromEmail, // Fixed verified sender: Resend default (onboarding@resend.dev) or custom from env
        to: adminEmail, // Admin email from env - can be any valid email
        replyTo: lead.email, // Admin can reply directly to the lead
        subject,
        html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${body}</pre>`,
      })
    )

    const results = await Promise.all(sendPromises)

    console.log(`Admin notification emails sent successfully for lead: ${lead.id}`, results)
  } catch (error: any) {
    // Log detailed error but don't throw - email failure shouldn't break form submission
    console.error('Failed to send admin notification email:', {
      error: error?.message || error,
      stack: error?.stack,
      response: error?.response,
      status: error?.status,
      leadId: lead.id,
    })
    // Don't re-throw - let caller handle gracefully
  }
}

/**
 * Send user confirmation email to the lead
 * 
 * This function sends a professional thank-you confirmation email to the person who submitted the form.
 * The "to" field is dynamically set to the email address entered in the form (lead.email).
 * The "from" field is always the fixed verified sender address.
 * 
 * This works with ANY valid email address - no hard-coded restrictions.
 * 
 * @param lead - The lead record to send confirmation email to
 */
export async function sendLeadAutoReplyEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const formEmail = lead.email // Dynamic email from form - can be ANY valid email address

  // Skip if email is not configured
  if (!apiKey) {
    console.warn(`User confirmation email skipped: RESEND_API_KEY=${!!apiKey}`)
    return
  }

  // Validate form email
  if (!formEmail || !isValidEmail(formEmail)) {
    console.error(`Invalid form email format: ${formEmail}`)
    return
  }

  try {
    const resend = new Resend(apiKey)
    
    console.log(`Attempting to send user confirmation email to: ${formEmail}`)

    const subject = 'Thanks for contacting Ario Studio'

    const fromEmail = getVerifiedSenderEmail() // Fixed verified sender: Resend default (onboarding@resend.dev) or custom from env
    
    console.log(`Sending user confirmation from: ${fromEmail}, to: ${formEmail}`)
    
    const result = await resend.emails.send({
      from: fromEmail, // Fixed verified sender: Resend default (onboarding@resend.dev) - works without custom domain
      to: formEmail, // Form email - ANY valid email address entered by the user (no restrictions)
      subject,
      html: `
        <p>Hi ${lead.name},</p>
        <p>We received your message.</p>
        <p>Thank you for contacting Ario Studio! We've successfully received your project inquiry and will get back to you within 24-48 hours.</p>
        <p>Best regards,<br>Ario Studio Team</p>
      `,
    })

    console.log(`User confirmation email sent successfully to lead: ${lead.id}`, result)
  } catch (error: any) {
    // Log detailed error but don't throw - email failure shouldn't break form submission
    console.error('Failed to send user confirmation email:', {
      error: error?.message || error,
      stack: error?.stack,
      response: error?.response,
      status: error?.status,
      leadId: lead.id,
      formEmail: formEmail,
    })
    // Don't re-throw - let caller handle gracefully
  }
}
