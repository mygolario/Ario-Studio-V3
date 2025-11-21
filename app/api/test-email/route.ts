import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * Test email endpoint
 * 
 * GET /api/test-email?to=test@example.com
 * 
 * This endpoint tests if Brevo email sending is working correctly.
 * 
 * This route must be dynamic because it uses searchParams.
 */
export const dynamic = 'force-dynamic'

/**
 * Get Brevo SMTP transporter
 */
function getBrevoTransporter() {
  const host = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com'
  const port = parseInt(process.env.BREVO_SMTP_PORT || '587', 10)
  const user = process.env.BREVO_SMTP_USER
  const pass = process.env.BREVO_SMTP_PASS

  if (!user || !pass) {
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const toParam = searchParams.get('to') || process.env.CONTACT_TO_EMAIL || 'test@example.com'
    
    // Support multiple emails (comma-separated) - convert to array
    const testEmails = toParam
      .split(',')
      .map(email => email.trim())
      .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    
    if (testEmails.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No valid email addresses provided',
          config: {
            hasBrevoConfig: !!(process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASS),
            fromEmail: process.env.CONTACT_FROM_EMAIL || 'Not configured',
            toEmail: toParam,
          }
        },
        { status: 400 }
      )
    }
    
    const transporter = getBrevoTransporter()
    
    if (!transporter) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Brevo SMTP is not configured. Please set BREVO_SMTP_USER and BREVO_SMTP_PASS',
          config: {
            hasBrevoConfig: false,
            fromEmail: process.env.CONTACT_FROM_EMAIL || 'Not configured',
            toEmails: testEmails,
          }
        },
        { status: 500 }
      )
    }

    const fromEmail = process.env.CONTACT_FROM_EMAIL
    
    if (!fromEmail) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'CONTACT_FROM_EMAIL is not configured',
          config: {
            hasBrevoConfig: true,
            fromEmail: 'Not configured',
            toEmails: testEmails,
          }
        },
        { status: 500 }
      )
    }
    
    console.log(`[TEST EMAIL] Attempting to send test email from: ${fromEmail}, to: ${testEmails.join(', ')}`)
    
    // Send to all test emails
    const sendPromises = testEmails.map((toEmail) =>
      transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: 'Test Email from Ario Studio',
        html: `
          <h2>Test Email</h2>
          <p>This is a test email from Ario Studio.</p>
          <p>If you received this, email sending is working correctly!</p>
          <p><strong>From:</strong> ${fromEmail}</p>
          <p><strong>To:</strong> ${toEmail}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `,
        text: `
Test Email from Ario Studio

This is a test email from Ario Studio.
If you received this, email sending is working correctly!

From: ${fromEmail}
To: ${toEmail}
Time: ${new Date().toLocaleString()}
        `.trim(),
      })
    )

    const results = await Promise.all(sendPromises)

    console.log(`[TEST EMAIL] Email sent successfully to ${testEmails.length} recipient(s):`, results)

    return NextResponse.json({
      success: true,
      message: `Test email sent successfully to ${testEmails.length} recipient(s)`,
      result: results,
      config: {
        fromEmail,
        toEmails: testEmails,
        recipientCount: testEmails.length,
        hasBrevoConfig: true,
      }
    })
  } catch (error: any) {
    console.error('[TEST EMAIL] Error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Unknown error',
        details: {
          message: error?.message,
          stack: error?.stack,
        },
        config: {
          hasBrevoConfig: !!(process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASS),
          fromEmail: process.env.CONTACT_FROM_EMAIL || 'Not configured',
        }
      },
      { status: 500 }
    )
  }
}
