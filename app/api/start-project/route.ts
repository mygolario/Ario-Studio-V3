import { NextRequest, NextResponse } from 'next/server'
import { getRequestLang, getTranslation } from '@/lib/i18n'
import { servicesConfig, getServiceBySlug } from '@/config/services'
import nodemailer from 'nodemailer'

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
 * Start Project / Request a Project API route
 * 
 * Handles form submissions from /start-project and /en/start-project pages.
 * Sends emails to studio and confirmation to user.
 */
export async function POST(req: NextRequest) {
  try {
    const lang = getRequestLang(req)
    const t = (key: string) => getTranslation(lang, key)

    const body = await req.json()
    const { name, email, projectType, projectTypeOther, budget, deadline, message, url } = body

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
          projectType: projectTypeLabel,
          budget: budget?.trim() || (lang === 'fa' ? 'مشخص نشده' : 'Not specified'),
          deadline: deadline?.trim() || (lang === 'fa' ? 'مشخص نشده' : 'Not specified'),
          message: message?.trim() || (lang === 'fa' ? 'پیامی ارسال نشده' : 'No message'),
          lang,
          url: url || '',
        })

        const emailText = generateAdminEmailText({
          name: name.trim(),
          email: email.trim(),
          projectType: projectTypeLabel,
          budget: budget?.trim() || (lang === 'fa' ? 'مشخص نشده' : 'Not specified'),
          deadline: deadline?.trim() || (lang === 'fa' ? 'مشخص نشده' : 'Not specified'),
          message: message?.trim() || (lang === 'fa' ? 'پیامی ارسال نشده' : 'No message'),
          lang,
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
        projectType: projectTypeLabel,
        budget: budget?.trim(),
        deadline: deadline?.trim(),
        message: message?.trim(),
        lang,
        url,
      })
    }

    // Send confirmation email to user
    if (transporter && fromEmail) {
      try {
        const subject = lang === 'fa'
          ? 'درخواست پروژه شما دریافت شد — آریو استودیو'
          : 'We received your project request — Ario Studio'

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
  projectType: string
  budget: string
  deadline: string
  message: string
  lang: string
  url: string
}): string {
  const isRTL = data.lang === 'fa'
  const fontFamily = isRTL ? 'Vazirmatn, sans-serif' : 'Inter, sans-serif'
  const textAlign = isRTL ? 'right' : 'left'
  const dir = isRTL ? 'rtl' : 'ltr'

  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${data.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.lang === 'fa' ? 'درخواست پروژه جدید' : 'New Project Request'}</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${fontFamily}; background-color: #0a0a0a; color: #e5e5e5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0a0a0a;">
    <div style="border-${isRTL ? 'right' : 'left'}: 4px solid #ff6b35; padding-${isRTL ? 'right' : 'left'}: 20px; margin-bottom: 32px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">
        Ario Studio
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; letter-spacing: 1px;">
        ${data.lang === 'fa' ? 'درخواست پروژه جدید' : 'New Project Request'}
      </p>
    </div>

    <div style="background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${data.lang === 'fa' ? 'اطلاعات تماس' : 'Contact Information'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px;">
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.lang === 'fa' ? 'نام:' : 'Name:'}</strong> ${data.name}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.lang === 'fa' ? 'ایمیل:' : 'Email:'}</strong> 
            <a href="mailto:${data.email}" style="color: #ff6b35; text-decoration: none;">${data.email}</a>
          </p>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${data.lang === 'fa' ? 'جزئیات پروژه' : 'Project Details'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px;">
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.lang === 'fa' ? 'نوع پروژه:' : 'Project Type:'}</strong> ${data.projectType}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.lang === 'fa' ? 'بودجه:' : 'Budget:'}</strong> ${data.budget}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign};">
            <strong style="color: #ffffff;">${data.lang === 'fa' ? 'ددلاین:' : 'Deadline:'}</strong> ${data.deadline}
          </p>
        </div>
      </div>

      ${data.message ? `
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.5px; text-align: ${textAlign};">
          ${data.lang === 'fa' ? 'پیام' : 'Message'}
        </h3>
        <div style="background-color: #0f0f0f; border-radius: 8px; padding: 16px;">
          <p style="margin: 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign}; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
      ` : ''}

      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #2a2a2a; font-size: 12px; color: #808080; text-align: ${textAlign};">
        <p style="margin: 4px 0;"><strong>${data.lang === 'fa' ? 'زبان:' : 'Language:'}</strong> ${data.lang === 'fa' ? 'فارسی' : 'English'}</p>
        <p style="margin: 4px 0;"><strong>${data.lang === 'fa' ? 'URL:' : 'URL:'}</strong> ${data.url || 'N/A'}</p>
        <p style="margin: 4px 0;"><strong>${data.lang === 'fa' ? 'زمان:' : 'Time:'}</strong> ${new Date().toLocaleString(data.lang === 'fa' ? 'fa-IR' : 'en-US')}</p>
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
  projectType: string
  budget: string
  deadline: string
  message: string
  lang: string
  url: string
}): string {
  return `
${data.lang === 'fa' ? 'درخواست پروژه جدید' : 'New Project Request'}
${'='.repeat(50)}

${data.lang === 'fa' ? 'اطلاعات تماس' : 'Contact Information'}:
${data.lang === 'fa' ? 'نام:' : 'Name:'} ${data.name}
${data.lang === 'fa' ? 'ایمیل:' : 'Email:'} ${data.email}

${data.lang === 'fa' ? 'جزئیات پروژه' : 'Project Details'}:
${data.lang === 'fa' ? 'نوع پروژه:' : 'Project Type:'} ${data.projectType}
${data.lang === 'fa' ? 'بودجه:' : 'Budget:'} ${data.budget}
${data.lang === 'fa' ? 'ددلاین:' : 'Deadline:'} ${data.deadline}

${data.message ? `${data.lang === 'fa' ? 'پیام:' : 'Message:'}\n${data.message}\n` : ''}

${data.lang === 'fa' ? 'زبان:' : 'Language:'} ${data.lang === 'fa' ? 'فارسی' : 'English'}
${data.lang === 'fa' ? 'URL:' : 'URL:'} ${data.url || 'N/A'}
${data.lang === 'fa' ? 'زمان:' : 'Time:'} ${new Date().toLocaleString(data.lang === 'fa' ? 'fa-IR' : 'en-US')}
  `.trim()
}

/**
 * Generate HTML confirmation email for user
 */
function generateUserConfirmationHTML(name: string, lang: string): string {
  const isRTL = lang === 'fa'
  const fontFamily = isRTL ? 'Vazirmatn, sans-serif' : 'Inter, sans-serif'
  const textAlign = isRTL ? 'right' : 'left'
  const dir = isRTL ? 'rtl' : 'ltr'

  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lang === 'fa' ? 'درخواست پروژه شما دریافت شد' : 'We received your project request'}</title>
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
        ${lang === 'fa' ? `سلام ${name}،` : `Hi ${name},`}
      </p>
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #e5e5e5; text-align: ${textAlign}; line-height: 1.6;">
        ${lang === 'fa' 
          ? 'ممنون از شما برای ارسال درخواست پروژه. ما درخواست شما را دریافت کردیم و خیلی زود با شما تماس خواهیم گرفت.'
          : 'Thank you for submitting your project request. We\'ve received your inquiry and will get back to you soon.'}
      </p>
      <p style="margin: 16px 0 0 0; font-size: 14px; color: #a0a0a0; text-align: ${textAlign};">
        ${lang === 'fa' 
          ? 'با احترام،<br><strong style="color: #ff6b35;">تیم آریو استودیو</strong>'
          : 'Best regards,<br><strong style="color: #ff6b35;">The Ario Studio Team</strong>'}
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
function generateUserConfirmationText(name: string, lang: string): string {
  return `
${lang === 'fa' ? `سلام ${name}،` : `Hi ${name},`}

${lang === 'fa' 
  ? 'ممنون از شما برای ارسال درخواست پروژه. ما درخواست شما را دریافت کردیم و خیلی زود با شما تماس خواهیم گرفت.'
  : 'Thank you for submitting your project request. We\'ve received your inquiry and will get back to you soon.'}

${lang === 'fa' 
  ? 'با احترام،\nتیم آریو استودیو'
  : 'Best regards,\nThe Ario Studio Team'}
  `.trim()
}

