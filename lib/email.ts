import { Lead } from '@prisma/client'
import { Resend } from 'resend'

/**
 * Get the fixed verified sender email address
 */
function getVerifiedSenderEmail(): string {
  return process.env.ARIO_STUDIO_FROM_EMAIL || 
         process.env.EMAIL_FROM || 
         'Ario Studio <noreply@yourdomain.com>'
}

/**
 * Send admin notification email when a new lead is submitted
 * 
 * This email is sent to the admin to notify them of a new lead.
 * 
 * @param lead - The lead record to send notification about
 */
export async function sendLeadNotificationEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_EMAIL

  // Skip if email is not configured
  if (!apiKey || !adminEmail) {
    console.warn(
      `Admin notification email skipped: RESEND_API_KEY=${!!apiKey}, ADMIN_EMAIL=${!!adminEmail}`
    )
    return
  }

  try {
    const resend = new Resend(apiKey)
    
    console.log(`Attempting to send admin notification email to: ${adminEmail}`)

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
Lead ID: ${lead.id}
    `.trim()

    const fromEmail = getVerifiedSenderEmail()
    
    console.log(`Sending admin notification from: ${fromEmail}, to: ${adminEmail}, replyTo: ${lead.email}`)
    
    const result = await resend.emails.send({
      from: fromEmail, // Fixed verified sender
      to: adminEmail, // Admin email from env
      replyTo: lead.email, // Admin can reply directly to the lead
      subject,
      html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${body}</pre>`,
    })

    console.log(`Admin notification email sent successfully for lead: ${lead.id}`, result)
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
 * If email env vars / API keys are missing, it logs a warning and returns without throwing.
 * 
 * @param lead - The lead record to send confirmation email to
 */
export async function sendLeadAutoReplyEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const userEmail = lead.email

  // Skip if email is not configured
  if (!apiKey || !userEmail) {
    console.warn(`User confirmation email skipped: RESEND_API_KEY=${!!apiKey}, userEmail=${!!userEmail}`)
    return
  }

  try {
    const resend = new Resend(apiKey)
    
    console.log(`Attempting to send user confirmation email to: ${userEmail}`)

    const subject = 'Thanks for contacting Ario Studio'

    // Build email body - confirmation email to the user
    let body = `Hi ${lead.name},

Thank you for reaching out to Ario Studio! We've successfully received your project inquiry and are excited about the possibility of working together.

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
Cinematic, AI-driven web experiences

Reference ID: ${lead.id}
Submitted: ${lead.createdAt.toLocaleString()}`

    const fromEmail = getVerifiedSenderEmail()
    
    console.log(`Sending user confirmation from: ${fromEmail}, to: ${userEmail}`)
    
    const result = await resend.emails.send({
      from: fromEmail, // Fixed verified sender: "Ario Studio <noreply@yourdomain.com>"
      to: userEmail, // Form email - any valid email address
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
      leadEmail: lead.email,
    })
    // Don't re-throw - let caller handle gracefully
  }
}

