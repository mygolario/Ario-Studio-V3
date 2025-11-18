import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Test email endpoint
 * 
 * GET /api/test-email?to=test@example.com
 * 
 * This endpoint tests if Resend email sending is working correctly.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const testEmail = searchParams.get('to') || 'ariokaveh85@gmail.com'
    
    const apiKey = process.env.RESEND_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'RESEND_API_KEY is not configured',
          config: {
            hasApiKey: false,
            fromEmail: 'onboarding@resend.dev',
            toEmail: testEmail,
          }
        },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    
    // Use Resend's default verified sender
    const fromEmail = process.env.ARIO_STUDIO_FROM_EMAIL || 
                     process.env.EMAIL_FROM || 
                     'onboarding@resend.dev'
    
    console.log(`[TEST EMAIL] Attempting to send test email from: ${fromEmail}, to: ${testEmail}`)
    
    const result = await resend.emails.send({
      from: fromEmail,
      to: testEmail,
      subject: 'Test Email from Ario Studio',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from Ario Studio.</p>
        <p>If you received this, email sending is working correctly!</p>
        <p><strong>From:</strong> ${fromEmail}</p>
        <p><strong>To:</strong> ${testEmail}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    })

    console.log(`[TEST EMAIL] Email sent successfully:`, result)

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      result: result,
      config: {
        fromEmail,
        toEmail: testEmail,
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
          fromEmail: process.env.ARIO_STUDIO_FROM_EMAIL || process.env.EMAIL_FROM || 'onboarding@resend.dev',
        }
      },
      { status: 500 }
    )
  }
}

