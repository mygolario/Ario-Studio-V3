import nodemailer from 'nodemailer'
import { getTranslation, type SupportedLang } from '@/lib/i18n'

/**
 * Contact email payload type
 */
export type ContactEmailPayload = {
  name: string
  email: string
  subject?: string
  message: string
}

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
    throw new Error('BREVO_SMTP_USER and BREVO_SMTP_PASS must be configured')
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
  const fromEmail = process.env.CONTACT_FROM_EMAIL
  if (!fromEmail) {
    throw new Error('CONTACT_FROM_EMAIL must be configured')
  }
  return fromEmail
}

/**
 * Get the "To" email address (admin inbox) from environment variables
 */
function getToEmail(): string {
  const toEmail = process.env.CONTACT_TO_EMAIL
  if (!toEmail) {
    throw new Error('CONTACT_TO_EMAIL must be configured')
  }
  return toEmail
}

/**
 * Generate HTML email template for contact form submissions
 * Matches Ario Studio's dark, modern, AI/studio vibe
 * Supports bilingual content (EN/FA)
 */
function generateContactEmailHTML(payload: ContactEmailPayload, lang: SupportedLang = 'en'): string {
  const t = (key: string) => getTranslation(lang, key)
  const subject = payload.subject || t('email.contactSubject')
  const dateTime = new Date().toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  })
  
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
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${fontFamily}; background-color: #0a0a0a; color: #e5e5e5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0a0a0a;">
    <!-- Header with gradient accent -->
    <div style="border-${isRTL ? 'right' : 'left'}: 4px solid #ff6b35; padding-${isRTL ? 'right' : 'left'}: 20px; margin-bottom: 32px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
        Ario Studio
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; letter-spacing: 1px;">
        ${t('email.contactIntro')}
      </p>
    </div>

    <!-- Main Content Card -->
    <div style="background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
      <!-- Subject -->
      <div style="margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #2a2a2a;">
        <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff; text-align: ${textAlign};">
          ${subject}
        </h2>
      </div>

      <!-- Contact Information -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${lang === 'fa' ? 'اطلاعات تماس' : 'Contact Information'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px;">
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${lang === 'fa' ? 'نام:' : 'Name:'}</strong> ${payload.name}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${lang === 'fa' ? 'ایمیل:' : 'Email:'}</strong> 
            <a href="mailto:${payload.email}" style="color: #ff6b35; text-decoration: none;">
              ${payload.email}
            </a>
          </p>
        </div>
      </div>

      <!-- Message -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${lang === 'fa' ? 'پیام' : 'Message'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px; border-${isRTL ? 'right' : 'left'}: 3px solid #ff6b35;">
          <p style="margin: 0; font-size: 14px; color: #e5e5e5; line-height: 1.6; white-space: pre-wrap; text-align: ${textAlign};">
            ${payload.message.replace(/\n/g, '<br>')}
          </p>
        </div>
      </div>

      <!-- Footer Info -->
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #2a2a2a; font-size: 12px; color: #808080; text-align: ${textAlign};">
        <p style="margin: 4px 0;">
          <strong>${lang === 'fa' ? 'دریافت شده:' : 'Received:'}</strong> ${dateTime}
        </p>
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
 * Generate plain text email for contact form submissions
 * Supports bilingual content (EN/FA)
 */
function generateContactEmailText(payload: ContactEmailPayload, lang: SupportedLang = 'en'): string {
  const t = (key: string) => getTranslation(lang, key)
  const subject = payload.subject || t('email.contactSubject')
  const dateTime = new Date().toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  })

  return `
ARIO STUDIO - ${lang === 'fa' ? 'پیام تماس جدید' : 'NEW CONTACT MESSAGE'}
${'='.repeat(50)}

${lang === 'fa' ? 'موضوع:' : 'Subject:'} ${subject}

${lang === 'fa' ? 'اطلاعات تماس' : 'CONTACT INFORMATION'}
${'-'.repeat(50)}
${lang === 'fa' ? 'نام:' : 'Name:'} ${payload.name}
${lang === 'fa' ? 'ایمیل:' : 'Email:'} ${payload.email}

${lang === 'fa' ? 'پیام' : 'MESSAGE'}
${'-'.repeat(50)}
${payload.message}

${'-'.repeat(50)}
${lang === 'fa' ? 'دریافت شده:' : 'Received:'} ${dateTime}

${t('email.contactOutro')}
  `.trim()
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
        ${lang === 'fa' ? 'سلام' : 'Hi'} ${name}،
      </p>
      
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #e5e5e5; line-height: 1.6; text-align: ${textAlign};">
        ${t('email.autoReplyBody')}
      </p>
      
      <p style="margin: 24px 0 0 0; font-size: 14px; color: #e5e5e5; line-height: 1.6; text-align: ${textAlign};">
        ${lang === 'fa' ? 'با احترام،' : 'Best regards,'}<br>
        <strong style="color: #ff6b35;">${lang === 'fa' ? 'تیم آریو استودیو' : 'Ario Studio Team'}</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid #2a2a2a; margin-top: 32px;">
      <p style="margin: 0; font-size: 12px; color: #808080;">
        ${lang === 'fa' ? 'این یک ایمیل تأیید خودکار است.' : 'This is an automated confirmation email.'}
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

${lang === 'fa' ? 'سلام' : 'Hi'} ${name}،

${lang === 'fa' ? 'با تشکر از تماس شما!' : 'Thanks for reaching out!'}

${t('email.autoReplyBody')}

${lang === 'fa' ? 'با احترام،' : 'Best regards,'}
${lang === 'fa' ? 'تیم آریو استودیو' : 'Ario Studio Team'}

---
${lang === 'fa' ? 'این یک ایمیل تأیید خودکار است.' : 'This is an automated confirmation email.'}
  `.trim()
}

/**
 * Send contact form email to admin
 * 
 * @param payload - Contact form data
 * @param lang - Language code ('en' or 'fa') for email content
 * @throws Error if validation fails or email sending fails
 */
export async function sendContactEmail(
  payload: ContactEmailPayload,
  lang: SupportedLang = 'en'
): Promise<void> {
  // Validate input
  if (!payload.name || payload.name.trim().length === 0) {
    throw new Error('Name is required')
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    throw new Error('Valid email is required')
  }

  if (!payload.message || payload.message.trim().length === 0) {
    throw new Error('Message is required')
  }

  // Get configuration
  const fromEmail = getFromEmail()
  const toEmail = getToEmail()
  const t = (key: string) => getTranslation(lang, key)
  const subject = payload.subject || t('email.contactSubject')

  // Create transporter
  const transporter = getBrevoTransporter()

  // Send email
  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email, // Allow admin to reply directly to the sender
      subject,
      html: generateContactEmailHTML(payload, lang),
      text: generateContactEmailText(payload, lang),
    })

    console.log('Contact email sent successfully:', {
      messageId: info.messageId,
      to: toEmail,
      from: fromEmail,
      replyTo: payload.email,
      lang,
    })
  } catch (error: any) {
    console.error('Failed to send contact email:', {
      error: error?.message || error,
      stack: error?.stack,
      to: toEmail,
      from: fromEmail,
      lang,
    })
    throw new Error(`Failed to send email: ${error?.message || 'Unknown error'}`)
  }
}

/**
 * Send auto-reply confirmation email to the user
 * 
 * @param name - User's name
 * @param email - User's email address
 * @param lang - Language code ('en' or 'fa') for email content
 * @throws Error if email sending fails
 */
export async function sendAutoReplyEmail(
  name: string,
  email: string,
  lang: SupportedLang = 'en'
): Promise<void> {
  // Validate input
  if (!name || name.trim().length === 0) {
    throw new Error('Name is required for auto-reply')
  }

  if (!email || !isValidEmail(email)) {
    throw new Error('Valid email is required for auto-reply')
  }

  // Get configuration
  const fromEmail = getFromEmail()
  const t = (key: string) => getTranslation(lang, key)

  // Create transporter
  const transporter = getBrevoTransporter()

  // Send email
  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: t('email.autoReplySubject'),
      html: generateAutoReplyHTML(name, lang),
      text: generateAutoReplyText(name, lang),
    })

    console.log('Auto-reply email sent successfully:', {
      messageId: info.messageId,
      to: email,
      from: fromEmail,
      lang,
    })
  } catch (error: any) {
    // Log error but don't throw - auto-reply failure shouldn't break the main flow
    console.error('Failed to send auto-reply email:', {
      error: error?.message || error,
      stack: error?.stack,
      to: email,
      from: fromEmail,
      lang,
    })
    // Don't re-throw - let caller handle gracefully
  }
}

