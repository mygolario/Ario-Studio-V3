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
  // Send notification to the lead's email (the person who submitted the form)
  const toEmail = lead.email

  // Skip if email is not configured
  if (!apiKey || !toEmail) {
    console.warn(
      `Email notification skipped: RESEND_API_KEY=${!!apiKey}, toEmail=${!!toEmail}, lead.email=${lead.email}`
    )
    return
  }

  try {
    const resend = new Resend(apiKey)
    
    console.log(`Attempting to send lead notification email to: ${toEmail}`)

    const subject = `Thank you for contacting Ario Studio - We've received your inquiry`
    
    // Build email body - confirmation email to the lead
    const body = `Hi ${lead.name},

Thank you for reaching out to Ario Studio! We've successfully received your project inquiry.

Here's a summary of what you submitted:

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

Your Message:
${lead.message}

---
Next Steps:
Our team will review your project details and get back to you within 24-48 hours. In the meantime, feel free to explore our work at https://ario-studio-v3.vercel.app/work.

If you have any urgent questions, don't hesitate to reach out directly.

Best regards,
Ario Studio Team

Submitted: ${lead.createdAt.toLocaleString()}
Reference ID: ${lead.id}
    `.trim()

    const fromEmail = process.env.ARIO_STUDIO_FROM_EMAIL || process.env.EMAIL_FROM || 'Ario Studio <onboarding@resend.dev>'
    
    console.log(`Sending email from: ${fromEmail}, to: ${toEmail}, subject: ${subject}`)
    
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${body}</pre>`,
    })

    console.log(`Lead notification email sent successfully for lead: ${lead.id}`, result)
  } catch (error: any) {
    // Log detailed error but don't throw - email failure shouldn't break form submission
    console.error('Failed to send lead notification email:', {
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
    console.warn(`Auto-reply email skipped: RESEND_API_KEY=${!!apiKey}`)
    return
  }

  try {
    const resend = new Resend(apiKey)
    
    console.log(`Attempting to send auto-reply email to lead: ${lead.email}`)

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

    console.log(`Sending auto-reply from: ${fromEmail}, to: ${lead.email}, subject: ${subject}`)
    
    const result = await resend.emails.send({
      from: fromEmail,
      to: lead.email,
      subject,
      html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${body}</pre>`,
    })

    console.log(`Auto-reply email sent successfully to lead: ${lead.id}`, result)
  } catch (error: any) {
    // Log detailed error but don't throw - email failure shouldn't break form submission
    console.error('Failed to send lead auto-reply email:', {
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

