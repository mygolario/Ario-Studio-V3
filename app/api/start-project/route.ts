import { NextRequest, NextResponse } from 'next/server'
import { getRequestLang } from '@/lib/i18n'
import { servicesConfig, getServiceBySlug } from '@/config/services'
import nodemailer from 'nodemailer'
import type { ProjectRequestPayload } from '@/types/project-request'

/**
 * Validate email address format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get Brevo SMTP transporter
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
    secure: false,
    auth: {
      user,
      pass,
    },
  })
}

/**
 * Get the "From" email address
 */
function getFromEmail(): string {
  return process.env.CONTACT_FROM_EMAIL || process.env.ADMIN_EMAIL || 'info@ariostudio.net'
}

/**
 * Get budget range label
 */
function getBudgetRangeLabel(budgetRange: string, lang: 'fa' | 'en'): string {
  const labels: Record<string, { fa: string; en: string }> = {
    // FA ranges
    'under-20m': { fa: 'زیر ۲۰ میلیون', en: 'Under $2,000' },
    '20-40m': { fa: '۲۰ تا ۴۰ میلیون', en: '$2,000–$4,000' },
    '40-80m': { fa: '۴۰ تا ۸۰ میلیون', en: '$4,000–$8,000' },
    'above-80m': { fa: 'بیش از ۸۰ میلیون', en: 'Above $8,000' },
    // EN ranges
    'under-2000': { fa: 'زیر ۲۰ میلیون', en: 'Under $2,000' },
    '2000-4000': { fa: '۲۰ تا ۴۰ میلیون', en: '$2,000–$4,000' },
    '4000-8000': { fa: '۴۰ تا ۸۰ میلیون', en: '$4,000–$8,000' },
    'above-8000': { fa: 'بیش از ۸۰ میلیون', en: 'Above $8,000' },
    // Legacy support (keep for backward compatibility)
    'under-1000': { fa: 'زیر ۲۰ میلیون', en: 'Under $1,000' },
    '1000-2000': { fa: '۲۰ تا ۴۰ میلیون', en: '$1,000 – $2,000' },
    'above-4000': { fa: 'بیشتر از ۸۰ میلیون', en: 'Above $4,000' },
  }

  return labels[budgetRange]?.[lang] || budgetRange
}

/**
 * Start Project / Request a Project API route
 * 
 * Handles form submissions from /start-project and /en/start-project pages.
 * Sends emails to studio and confirmation to user.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ProjectRequestPayload
    const { name, email, projectType, projectTypeOther, budgetRange, deadline, message, locale, url } = body

    // Use locale from payload, fallback to request detection
    const lang = locale || getRequestLang(req)

    // Validation
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: lang === 'fa' ? 'نام الزامی است' : 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: lang === 'fa' ? 'ایمیل معتبر الزامی است' : 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!projectType && !projectTypeOther?.trim()) {
      return NextResponse.json(
        { success: false, message: lang === 'fa' ? 'نوع پروژه الزامی است' : 'Project type is required' },
        { status: 400 }
      )
    }

    if (!budgetRange) {
      return NextResponse.json(
        { success: false, message: lang === 'fa' ? 'محدوده بودجه الزامی است' : 'Budget range is required' },
        { status: 400 }
      )
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: lang === 'fa' ? 'پیام الزامی است' : 'Message is required' },
        { status: 400 }
      )
    }

    // Get project type label
    let projectTypeLabel = ''
    if (projectType === 'other') {
      projectTypeLabel = projectTypeOther?.trim() || (lang === 'fa' ? 'سایر' : 'Other')
    } else {
      const service = getServiceBySlug(projectType)
      projectTypeLabel = service 
        ? (lang === 'fa' ? service.title.fa : service.title.en)
        : projectType
    }

    // Get budget range label
    const budgetRangeLabel = getBudgetRangeLabel(budgetRange, lang)

    // Prepare email content
    const transporter = getBrevoTransporter()
    const fromEmail = getFromEmail()
    const adminEmailRaw = process.env.CONTACT_TO_EMAIL || process.env.ADMIN_EMAIL || 'info@ariostudio.net'

    // Support multiple admin emails (comma-separated)
    const adminEmails = adminEmailRaw
      .split(',')
      .map(email => email.trim())
      .filter(email => email && isValidEmail(email))

    // Send email to studio (if configured)
    if (transporter && fromEmail && adminEmails.length > 0) {
      try {
        const subject = lang === 'fa' 
          ? `درخواست پروژه جدید — ${name}`
          : `New project request — ${name}`

        const emailHTML = generateAdminEmailHTML({
          name: name.trim(),
          email: email.trim(),
          locale: lang,
          projectType: projectTypeLabel,
          budgetRange: budgetRangeLabel,
          deadline: deadline?.trim() || (lang === 'fa' ? 'مشخص نشده' : 'Not specified'),
          message: message.trim(),
          url: url || '',
        })

        const emailText = generateAdminEmailText({
          name: name.trim(),
          email: email.trim(),
          locale: lang,
          projectType: projectTypeLabel,
          budgetRange: budgetRangeLabel,
          deadline: deadline?.trim() || (lang === 'fa' ? 'مشخص نشده' : 'Not specified'),
          message: message.trim(),
          url: url || '',
        })

        // Send to all admin emails
        const sendPromises = adminEmails.map((toEmail) =>
          transporter.sendMail({
            from: fromEmail,
            to: toEmail,
            replyTo: email.trim(),
            subject,
            html: emailHTML,
            text: emailText,
          })
        )

        await Promise.all(sendPromises)
        console.log(`Start project email sent to ${adminEmails.length} recipient(s)`)
      } catch (emailError: any) {
        console.error('Failed to send admin notification email:', emailError)
        // Don't fail the request if email fails
      }
    } else {
      // Log email payload if email is not configured
      console.log('Email not configured. Form submission data:', {
        name: name.trim(),
        email: email.trim(),
        locale: lang,
        projectType: projectTypeLabel,
        budgetRange: budgetRangeLabel,
        deadline: deadline?.trim(),
        message: message.trim(),
        url: url || '',
      })
    }

    // Send confirmation email to user
    if (transporter && fromEmail) {
      try {
        const subject = lang === 'fa'
          ? 'دریافت درخواست پروژه شما – آریو استودیو'
          : 'We received your project request – Ario Studio'

        const emailHTML = generateUserConfirmationHTML(name.trim(), lang)
        const emailText = generateUserConfirmationText(name.trim(), lang)

        await transporter.sendMail({
          from: fromEmail,
          to: email.trim(),
          subject,
          html: emailHTML,
          text: emailText,
        })

        console.log(`User confirmation email sent to: ${email.trim()}`)
      } catch (emailError: any) {
        console.error('Failed to send user confirmation email:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: lang === 'fa' 
        ? 'درخواست شما با موفقیت ارسال شد'
        : 'Your request has been submitted successfully',
    })
  } catch (error: any) {
    console.error('START_PROJECT_API_ERROR', error)
    const lang = getRequestLang(req)
    return NextResponse.json(
      { 
        success: false, 
        message: lang === 'fa' 
          ? 'خطایی رخ داد. لطفاً دوباره تلاش کنید.'
          : 'An error occurred. Please try again.' 
      },
      { status: 500 }
    )
  }
}

/**
 * Generate HTML email for admin notification
 */
function generateAdminEmailHTML(data: {
  name: string
  email: string
  locale: string
  projectType: string
  budgetRange: string
  deadline: string
  message: string
  url: string
}): string {
  const isRTL = data.locale === 'fa'
  const fontFamily = isRTL ? 'Vazirmatn, sans-serif' : 'Inter, sans-serif'
  const textAlign = isRTL ? 'right' : 'left'
  const dir = isRTL ? 'rtl' : 'ltr'

  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${data.locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.locale === 'fa' ? 'درخواست پروژه جدید' : 'New Project Request'}</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${fontFamily}; background-color: #0a0a0a; color: #e5e5e5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0a0a0a;">
    <div style="border-${isRTL ? 'right' : 'left'}: 4px solid #ff6b35; padding-${isRTL ? 'right' : 'left'}: 20px; margin-bottom: 32px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">
        Ario Studio
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; letter-spacing: 1px;">
        ${data.locale === 'fa' ? 'درخواست پروژه جدید' : 'New Project Request'}
      </p>
    </div>

    <div style="background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${data.locale === 'fa' ? 'اطلاعات تماس' : 'Contact Information'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px;">
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.locale === 'fa' ? 'نام:' : 'Name:'}</strong> ${data.name}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.locale === 'fa' ? 'ایمیل:' : 'Email:'}</strong> 
            <a href="mailto:${data.email}" style="color: #ff6b35; text-decoration: none;">${data.email}</a>
          </p>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${data.locale === 'fa' ? 'جزئیات پروژه' : 'Project Details'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px;">
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.locale === 'fa' ? 'زبان:' : 'Locale:'}</strong> ${data.locale === 'fa' ? 'فارسی' : 'English'}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.locale === 'fa' ? 'نوع پروژه:' : 'Project Type:'}</strong> ${data.projectType}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.locale === 'fa' ? 'بودجه:' : 'Budget Range:'}</strong> ${data.budgetRange}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.locale === 'fa' ? 'ددلاین:' : 'Deadline:'}</strong> ${data.deadline}
          </p>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${data.locale === 'fa' ? 'پیام' : 'Message'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px;">
          <p style="margin: 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign}; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>

      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #2a2a2a; font-size: 12px; color: #808080; text-align: ${textAlign};">
        <p style="margin: 4px 0;"><strong>${data.locale === 'fa' ? 'زبان:' : 'Language:'}</strong> ${data.locale === 'fa' ? 'فارسی' : 'English'}</p>
        <p style="margin: 4px 0;"><strong>${data.locale === 'fa' ? 'URL:' : 'URL:'}</strong> ${data.url || 'N/A'}</p>
        <p style="margin: 4px 0;"><strong>${data.locale === 'fa' ? 'زمان:' : 'Time:'}</strong> ${new Date().toLocaleString(data.locale === 'fa' ? 'fa-IR' : 'en-US')}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Generate plain text email for admin notification
 */
function generateAdminEmailText(data: {
  name: string
  email: string
  locale: string
  projectType: string
  budgetRange: string
  deadline: string
  message: string
  url: string
}): string {
  return `
${data.locale === 'fa' ? 'درخواست پروژه جدید' : 'New Project Request'}
${'='.repeat(50)}

${data.locale === 'fa' ? 'اطلاعات تماس' : 'Contact Information'}:
${data.locale === 'fa' ? 'نام:' : 'Name:'} ${data.name}
${data.locale === 'fa' ? 'ایمیل:' : 'Email:'} ${data.email}

${data.locale === 'fa' ? 'جزئیات پروژه' : 'Project Details'}:
${data.locale === 'fa' ? 'زبان:' : 'Locale:'} ${data.locale === 'fa' ? 'فارسی' : 'English'}
${data.locale === 'fa' ? 'نوع پروژه:' : 'Project Type:'} ${data.projectType}
${data.locale === 'fa' ? 'بودجه:' : 'Budget Range:'} ${data.budgetRange}
${data.locale === 'fa' ? 'ددلاین:' : 'Deadline:'} ${data.deadline}

${data.locale === 'fa' ? 'پیام:' : 'Message:'}
${data.message}

${data.locale === 'fa' ? 'زبان:' : 'Language:'} ${data.locale === 'fa' ? 'فارسی' : 'English'}
${data.locale === 'fa' ? 'URL:' : 'URL:'} ${data.url || 'N/A'}
${data.locale === 'fa' ? 'زمان:' : 'Time:'} ${new Date().toLocaleString(data.locale === 'fa' ? 'fa-IR' : 'en-US')}
  `.trim()
}

/**
 * Generate HTML confirmation email for user
 */
function generateUserConfirmationHTML(name: string, locale: 'fa' | 'en'): string {
  const isRTL = locale === 'fa'
  const fontFamily = isRTL ? 'Vazirmatn, sans-serif' : 'Inter, sans-serif'
  const textAlign = isRTL ? 'right' : 'left'
  const dir = isRTL ? 'rtl' : 'ltr'

  const greeting = locale === 'fa' ? `سلام ${name}،` : `Hi ${name},`
  const thankYou = locale === 'fa'
    ? 'ممنون از شما برای ارسال درخواست پروژه. ما درخواست شما را دریافت کردیم و خیلی زود آن را بررسی می‌کنیم و با شما تماس می‌گیریم.'
    : "Thank you for submitting your project request. We've received your inquiry and will review it and get back to you soon."
  const replyNote = locale === 'fa'
    ? 'اگر جزئیات بیشتری لازم است، می‌توانید مستقیماً به این ایمیل پاسخ بدهید و جزئیات بیشتری ارسال کنید.'
    : "If you need to share additional details, you can reply directly to this email with more information."
  const closing = locale === 'fa'
    ? 'با احترام،<br><strong style="color: #ff6b35;">تیم آریو استودیو</strong>'
    : 'Best regards,<br><strong style="color: #ff6b35;">The Ario Studio Team</strong>'

  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${locale === 'fa' ? 'درخواست پروژه شما دریافت شد' : 'We received your project request'}</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${fontFamily}; background-color: #0a0a0a; color: #e5e5e5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0a0a0a;">
    <div style="border-${isRTL ? 'right' : 'left'}: 4px solid #ff6b35; padding-${isRTL ? 'right' : 'left'}: 20px; margin-bottom: 32px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">
        Ario Studio
      </h1>
    </div>

    <div style="background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 32px;">
      <p style="margin: 0 0 16px 0; font-size: 16px; color: #e5e5e5; text-align: ${textAlign};">
        ${greeting}
      </p>
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign}; line-height: 1.6;">
        ${thankYou}
      </p>
      <p style="margin: 16px 0; font-size: 14px; color: #a0a0a0; text-align: ${textAlign}; line-height: 1.6;">
        ${replyNote}
      </p>
      <p style="margin: 16px 0 0 0; font-size: 14px; color: #a0a0a0; text-align: ${textAlign};">
        ${closing}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Generate plain text confirmation email for user
 */
function generateUserConfirmationText(name: string, locale: 'fa' | 'en'): string {
  const greeting = locale === 'fa' ? `سلام ${name}،` : `Hi ${name},`
  const thankYou = locale === 'fa'
    ? 'ممنون از شما برای ارسال درخواست پروژه. ما درخواست شما را دریافت کردیم و خیلی زود آن را بررسی می‌کنیم و با شما تماس می‌گیریم.'
    : "Thank you for submitting your project request. We've received your inquiry and will review it and get back to you soon."
  const replyNote = locale === 'fa'
    ? 'اگر جزئیات بیشتری لازم است، می‌توانید مستقیماً به این ایمیل پاسخ بدهید و جزئیات بیشتری ارسال کنید.'
    : "If you need to share additional details, you can reply directly to this email with more information."
  const closing = locale === 'fa'
    ? 'با احترام،\nتیم آریو استودیو'
    : 'Best regards,\nThe Ario Studio Team'

  return `
${greeting}

${thankYou}

${replyNote}

${closing}
  `.trim()
}
