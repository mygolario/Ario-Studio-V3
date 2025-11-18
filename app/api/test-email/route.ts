import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Test email endpoint
 * 
 * GET /api/test-email?to=test@example.com
 * 
 * This endpoint tests if Resend email sending is working correctly.
 * 
 * This route must be dynamic because it uses searchParams.
 */
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const toParam = searchParams.get('to') || 'ariokaveh85@gmail.com'
    
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
            hasApiKey: !!process.env.RESEND_API_KEY,
            fromEmail: 'Ario Studio <onboarding@resend.dev>',
            toEmail: toParam,
          }
        },
        { status: 400 }
      )
    }
    
    const apiKey = process.env.RESEND_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'RESEND_API_KEY is not configured',
          config: {
            hasApiKey: false,
            fromEmail: 'Ario Studio <onboarding@resend.dev>',
            toEmail: testEmails,
          }
        },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    
    // Use Resend's default verified sender
    // Format: 'Name <email>' (recommended by Resend)
    const fromEmail = process.env.ARIO_STUDIO_FROM_EMAIL || 
                     process.env.EMAIL_FROM || 
                     'Ario Studio <onboarding@resend.dev>'
    
    console.log(`[TEST EMAIL] Attempting to send test email from: ${fromEmail}, to: ${testEmails.join(', ')}`)
    
    // Use array for 'to' field (as per Resend documentation)
    const result = await resend.emails.send({
      from: fromEmail,
      to: testEmails, // Array of email addresses - sends to all
      subject: 'Test Email from Ario Studio',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from Ario Studio.</p>
        <p>If you received this, email sending is working correctly!</p>
        <p><strong>From:</strong> ${fromEmail}</p>
        <p><strong>To:</strong> ${testEmails.join(', ')}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    })

    console.log(`[TEST EMAIL] Email sent successfully to ${testEmails.length} recipient(s):`, result)

    return NextResponse.json({
      success: true,
      message: `Test email sent successfully to ${testEmails.length} recipient(s)`,
      result: result,
      config: {
        fromEmail,
        toEmails: testEmails,
        recipientCount: testEmails.length,
        hasApiKey: true,
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
          status: error?.status,
          response: error?.response,
        },
        config: {
          hasApiKey: !!process.env.RESEND_API_KEY,
          fromEmail: process.env.ARIO_STUDIO_FROM_EMAIL || process.env.EMAIL_FROM || 'Ario Studio <onboarding@resend.dev>',
        }
      },
      { status: 500 }
    )
  }
}

