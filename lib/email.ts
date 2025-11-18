import { Lead } from '@prisma/client'
import nodemailer from 'nodemailer'
import { getTranslation, type SupportedLang } from '@/lib/i18n'

/**
 * Validate email address format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get Brevo SMTP transporter
 * Creates a reusable transporter instance configured with Brevo SMTP settings
 */
function getBrevoTransporter() {
  const host = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com'
  const port = parseInt(process.env.BREVO_SMTP_PORT || '587', 10)
  const user = process.env.BREVO_SMTP_USER
  const pass = process.env.BREVO_SMTP_PASS

  if (!user || !pass) {
    console.warn('BREVO_SMTP_USER and BREVO_SMTP_PASS must be configured')
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: false, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  })
}

/**
 * Get the "From" email address from environment variables
 */
function getFromEmail(): string {
  return process.env.CONTACT_FROM_EMAIL || process.env.ADMIN_EMAIL || 'info@ariostudio.net'
}

/**
 * Generate HTML email template for lead notifications (admin)
 * Matches Ario Studio's dark, modern, AI/studio vibe
 * Supports bilingual content (EN/FA)
 */
function generateLeadNotificationHTML(lead: Lead, lang: SupportedLang = 'en'): string {
  const t = (key: string) => getTranslation(lang, key)
  const isRTL = lang === 'fa'
  const dir = isRTL ? 'rtl' : 'ltr'
  const textAlign = isRTL ? 'right' : 'left'
  const fontFamily = isRTL 
    ? "'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  const dateTime = lead.createdAt.toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  })

  return `
<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lang === 'fa' ? 'تماس جدید از آریو استودیو' : 'New Contact from Ario Studio'}</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${fontFamily}; background-color: #0a0a0a; color: #e5e5e5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0a0a0a;">
    <!-- Header with gradient accent -->
    <div style="border-${isRTL ? 'right' : 'left'}: 4px solid #ff6b35; padding-${isRTL ? 'right' : 'left'}: 20px; margin-bottom: 32px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
        Ario Studio
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; letter-spacing: 1px;">
        ${lang === 'fa' ? 'تماس جدید' : 'New Contact'}
      </p>
    </div>

    <!-- Main Content Card -->
    <div style="background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
      <!-- Contact Information -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${lang === 'fa' ? 'اطلاعات تماس' : 'Contact Information'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px;">
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${lang === 'fa' ? 'نام:' : 'Name:'}</strong> ${lead.name}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${lang === 'fa' ? 'ایمیل:' : 'Email:'}</strong> 
            <a href="mailto:${lead.email}" style="color: #ff6b35; text-decoration: none;">
              ${lead.email}
            </a>
          </p>
          ${lead.companyName ? `<p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};"><strong style="color: #ffffff;">${lang === 'fa' ? 'شرکت:' : 'Company:'}</strong> ${lead.companyName}</p>` : ''}
        </div>
      </div>

      ${lead.budgetRange || lead.timeline || (lead.servicesNeeded && lead.servicesNeeded.length > 0) ? `
      <!-- Project Details -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${lang === 'fa' ? 'جزئیات پروژه' : 'Project Details'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px;">
          ${lead.budgetRange ? `<p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};"><strong style="color: #ffffff;">${lang === 'fa' ? 'بودجه:' : 'Budget:'}</strong> ${lead.budgetRange}</p>` : ''}
          ${lead.timeline ? `<p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};"><strong style="color: #ffffff;">${lang === 'fa' ? 'زمان‌بندی:' : 'Timeline:'}</strong> ${lead.timeline}</p>` : ''}
          ${lead.servicesNeeded && lead.servicesNeeded.length > 0
            ? `<p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};"><strong style="color: #ffffff;">${lang === 'fa' ? 'سرویس‌های مورد نیاز:' : 'Services Needed:'}</strong> ${lead.servicesNeeded.join(', ')}</p>`
            : ''}
        </div>
      </div>
      ` : ''}

      <!-- Message -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${lang === 'fa' ? 'پیام' : 'Message'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px; border-${isRTL ? 'right' : 'left'}: 3px solid #ff6b35;">
          <p style="margin: 0; font-size: 14px; color: #e5e5e5; line-height: 1.6; white-space: pre-wrap; text-align: ${textAlign};">
            ${lead.message.replace(/\n/g, '<br>')}
          </p>
        </div>
      </div>

      ${lead.aiSummary || lead.aiPriorityScore || (lead.aiTags && lead.aiTags.length > 0) ? `
      <!-- AI Analysis -->
      <div style="margin-bottom: 24px; padding: 16px; background-color: #1a0f0a; border-radius: 8px; border-${isRTL ? 'right' : 'left'}: 3px solid #ff6b35;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${lang === 'fa' ? 'تحلیل هوش مصنوعی' : 'AI Analysis'}
        </h3>
        ${lead.aiSummary ? `<p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};"><strong style="color: #ffffff;">${lang === 'fa' ? 'خلاصه:' : 'Summary:'}</strong> ${lead.aiSummary}</p>` : ''}
        ${lead.aiPriorityScore ? `<p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};"><strong style="color: #ffffff;">${lang === 'fa' ? 'امتیاز اولویت:' : 'Priority Score:'}</strong> ${lead.aiPriorityScore}/5</p>` : ''}
        ${lead.aiTags && lead.aiTags.length > 0 ? `<p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};"><strong style="color: #ffffff;">${lang === 'fa' ? 'برچسب‌ها:' : 'Tags:'}</strong> ${lead.aiTags.join(', ')}</p>` : ''}
      </div>
      ` : ''}

      <!-- Footer Info -->
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #2a2a2a; font-size: 12px; color: #808080; text-align: ${textAlign};">
        <p style="margin: 4px 0;"><strong>${lang === 'fa' ? 'ارسال شده:' : 'Submitted:'}</strong> ${dateTime}</p>
        <p style="margin: 4px 0;"><strong>${lang === 'fa' ? 'منبع:' : 'Source:'}</strong> ${lead.source}</p>
        <p style="margin: 4px 0;"><strong>${lang === 'fa' ? 'شناسه لید:' : 'Lead ID:'}</strong> ${lead.id}</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid #2a2a2a;">
      <p style="margin: 0; font-size: 12px; color: #808080;">
        ${t('email.contactOutro')}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Generate plain text email for lead notifications
 * Supports bilingual content (EN/FA)
 */
function generateLeadNotificationText(lead: Lead, lang: SupportedLang = 'en'): string {
  const t = (key: string) => getTranslation(lang, key)
  const dateTime = lead.createdAt.toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  })

  let text = `
ARIO STUDIO - ${lang === 'fa' ? 'تماس جدید' : 'NEW CONTACT'}
${'='.repeat(50)}

${lang === 'fa' ? 'اطلاعات تماس' : 'CONTACT INFORMATION'}
${'-'.repeat(50)}
${lang === 'fa' ? 'نام:' : 'Name:'} ${lead.name}
${lang === 'fa' ? 'ایمیل:' : 'Email:'} ${lead.email}
${lead.companyName ? `${lang === 'fa' ? 'شرکت:' : 'Company:'} ${lead.companyName}\n` : ''}
`

  if (lead.budgetRange || lead.timeline || (lead.servicesNeeded && lead.servicesNeeded.length > 0)) {
    text += `
${lang === 'fa' ? 'جزئیات پروژه' : 'PROJECT DETAILS'}
${'-'.repeat(50)}
${lead.budgetRange ? `${lang === 'fa' ? 'بودجه:' : 'Budget:'} ${lead.budgetRange}\n` : ''}
${lead.timeline ? `${lang === 'fa' ? 'زمان‌بندی:' : 'Timeline:'} ${lead.timeline}\n` : ''}
${lead.servicesNeeded && lead.servicesNeeded.length > 0 ? `${lang === 'fa' ? 'سرویس‌های مورد نیاز:' : 'Services Needed:'} ${lead.servicesNeeded.join(', ')}\n` : ''}
`
  }

  text += `
${lang === 'fa' ? 'پیام' : 'MESSAGE'}
${'-'.repeat(50)}
${lead.message}
`

  if (lead.aiSummary || lead.aiPriorityScore || (lead.aiTags && lead.aiTags.length > 0)) {
    text += `
${lang === 'fa' ? 'تحلیل هوش مصنوعی' : 'AI ANALYSIS'}
${'-'.repeat(50)}
${lead.aiSummary ? `${lang === 'fa' ? 'خلاصه:' : 'Summary:'} ${lead.aiSummary}\n` : ''}
${lead.aiPriorityScore ? `${lang === 'fa' ? 'امتیاز اولویت:' : 'Priority Score:'} ${lead.aiPriorityScore}/5\n` : ''}
${lead.aiTags && lead.aiTags.length > 0 ? `${lang === 'fa' ? 'برچسب‌ها:' : 'Tags:'} ${lead.aiTags.join(', ')}\n` : ''}
`
  }

  text += `
${'-'.repeat(50)}
${lang === 'fa' ? 'ارسال شده:' : 'Submitted:'} ${dateTime}
${lang === 'fa' ? 'منبع:' : 'Source:'} ${lead.source}
${lang === 'fa' ? 'شناسه لید:' : 'Lead ID:'} ${lead.id}
`

  return text.trim()
}

/**
 * Generate auto-reply HTML email template
 * Supports bilingual content (EN/FA)
 */
function generateAutoReplyHTML(name: string, lang: SupportedLang = 'en'): string {
  const t = (key: string) => getTranslation(lang, key)
  const isRTL = lang === 'fa'
  const dir = isRTL ? 'rtl' : 'ltr'
  const textAlign = isRTL ? 'right' : 'left'
  const fontFamily = isRTL 
    ? "'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

  return `
<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t('email.autoReplySubject')}</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${fontFamily}; background-color: #0a0a0a; color: #e5e5e5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0a0a0a;">
    <!-- Header -->
    <div style="border-${isRTL ? 'right' : 'left'}: 4px solid #ff6b35; padding-${isRTL ? 'right' : 'left'}: 20px; margin-bottom: 32px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
        Ario Studio
      </h1>
    </div>

    <!-- Main Content -->
    <div style="background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 32px;">
      <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #ffffff; text-align: ${textAlign};">
        ${lang === 'fa' ? 'با تشکر از تماس شما!' : 'Thanks for reaching out!'}
      </h2>
      
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #e5e5e5; line-height: 1.6; text-align: ${textAlign};">
        ${t('email.greeting')} ${name}${lang === 'fa' ? '،' : ','}
      </p>
      
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #e5e5e5; line-height: 1.6; text-align: ${textAlign};">
        ${t('email.autoReplyBody')}
      </p>
      
      <p style="margin: 24px 0 0 0; font-size: 14px; color: #e5e5e5; line-height: 1.6; text-align: ${textAlign};">
        ${t('email.closing')}<br>
        <strong style="color: #ff6b35;">${t('email.signature')}</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid #2a2a2a; margin-top: 32px;">
      <p style="margin: 0; font-size: 12px; color: #808080;">
        ${t('email.footerNote')}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Generate plain text auto-reply email
 * Supports bilingual content (EN/FA)
 */
function generateAutoReplyText(name: string, lang: SupportedLang = 'en'): string {
  const t = (key: string) => getTranslation(lang, key)
  
  return `
ARIO STUDIO

${t('email.greeting')} ${name}${lang === 'fa' ? '،' : ','}

${lang === 'fa' ? 'با تشکر از تماس شما!' : 'Thanks for reaching out!'}

${t('email.autoReplyBody')}

${t('email.closing')}
${t('email.signature')}

---
${t('email.footerNote')}
  `.trim()
}

/**
 * Send admin notification email when a new lead is submitted
 * 
 * This email is sent to the admin to notify them of a new lead.
 * The admin can reply directly to the lead using replyTo.
 * Supports bilingual content (EN/FA).
 * 
 * @param lead - The lead record to send notification about
 * @param lang - Language code ('en' or 'fa') for email content
 */
export async function sendLeadNotificationEmail(lead: Lead, lang: SupportedLang = 'en'): Promise<void> {
  const adminEmailRaw = process.env.CONTACT_TO_EMAIL || process.env.ADMIN_EMAIL || 'info@ariostudio.net'

  // CONTACT_TO_EMAIL/ADMIN_EMAIL is optional - if not set, skip admin notification
  // User auto-reply will still be sent via sendLeadAutoReplyEmail
  if (!adminEmailRaw) {
    console.log(`Admin notification skipped: CONTACT_TO_EMAIL/ADMIN_EMAIL is not configured (this is optional)`)
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

  const transporter = getBrevoTransporter()
  if (!transporter) {
    console.warn('Admin notification email skipped: Brevo SMTP is not configured')
    return
  }

  const fromEmail = getFromEmail()
  if (!fromEmail) {
    console.warn('Admin notification email skipped: CONTACT_FROM_EMAIL is not configured')
    return
  }

  try {
    console.log(`Attempting to send admin notification email to: ${adminEmails.join(', ')}`)

    const t = (key: string) => getTranslation(lang, key)
    const subject = lang === 'fa' ? 'تماس جدید از آریو استودیو' : 'New contact from Ario Studio'

    // Send to all admin emails (send separately for each to ensure delivery)
    const sendPromises = adminEmails.map((toEmail) =>
      transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        replyTo: lead.email, // Admin can reply directly to the lead
        subject,
        html: generateLeadNotificationHTML(lead, lang),
        text: generateLeadNotificationText(lead, lang),
      })
    )

    const results = await Promise.all(sendPromises)

    console.log(`Admin notification email sent successfully to ${adminEmails.length} recipient(s) for lead: ${lead.id}`, results)
  } catch (error: any) {
    // Log detailed error but don't throw - email failure shouldn't break form submission
    console.error('Failed to send admin notification email:', {
      error: error?.message || error,
      stack: error?.stack,
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
 * Supports bilingual content (EN/FA).
 * 
 * This works with ANY valid email address - no hard-coded restrictions.
 * 
 * @param lead - The lead record to send confirmation email to
 * @param lang - Language code ('en' or 'fa') for email content
 */
export async function sendLeadAutoReplyEmail(lead: Lead, lang: SupportedLang = 'en'): Promise<void> {
  const formEmail = lead.email // Dynamic email from form - can be ANY valid email address

  // Validate form email
  if (!formEmail || !isValidEmail(formEmail)) {
    console.error(`Invalid form email format: ${formEmail}`)
    return
  }

  const transporter = getBrevoTransporter()
  if (!transporter) {
    console.warn('User confirmation email skipped: Brevo SMTP is not configured')
    return
  }

  const fromEmail = getFromEmail()
  if (!fromEmail) {
    console.warn('User confirmation email skipped: CONTACT_FROM_EMAIL is not configured')
    return
  }

  try {
    console.log(`Attempting to send user confirmation email to: ${formEmail}`)

    const t = (key: string) => getTranslation(lang, key)
    const subject = t('email.autoReplySubject')

    console.log(`Sending user confirmation from: ${fromEmail}, to: ${formEmail}, lang: ${lang}`)

    const result = await transporter.sendMail({
      from: fromEmail,
      to: formEmail, // Form email - ANY valid email address entered by the user (no restrictions)
      subject,
      html: generateAutoReplyHTML(lead.name, lang),
      text: generateAutoReplyText(lead.name, lang),
    })

    console.log(`User confirmation email sent successfully to lead: ${lead.id}`, {
      messageId: result.messageId,
      to: formEmail,
      from: fromEmail,
    })
  } catch (error: any) {
    // Log detailed error but don't throw - email failure shouldn't break form submission
    console.error('Failed to send user confirmation email:', {
      error: error?.message || error,
      stack: error?.stack,
      leadId: lead.id,
      formEmail: formEmail,
    })
    // Don't re-throw - let caller handle gracefully
  }
}
