import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, brandName, email, phone, projectTypes, budget, deadline, details, lang } = body;

    // Basic Validation
    if (!fullName || !email || !brandName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'no-reply@ariostudio.com';
    const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Ariostudio';
    const ADMIN_EMAIL = process.env.BREVO_ADMIN_EMAIL || 'contact@ariostudio.com';

    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY is missing");
      // Return success to client even if email fails in dev mode, but log error
      return NextResponse.json({ success: true, message: 'Form submitted (Email skipped: No API Key)' });
    }

    // 1. Send Admin Notification
    const adminContent = `
      New Project Request:
      
      Name: ${fullName}
      Brand: ${brandName}
      Email: ${email}
      Phone: ${phone}
      
      Types: ${projectTypes.join(', ')}
      Budget: ${budget}
      Deadline: ${deadline}
      
      Details:
      ${details}
    `;

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: ADMIN_EMAIL }],
        subject: `New Project Request from ${brandName}`,
        textContent: adminContent
      })
    });

    // 2. Send User Confirmation
    const userSubject = lang === 'fa' 
      ? 'درخواست شما دریافت شد - آریو استودیو' 
      : 'We received your request - Ariostudio';
      
    const userContent = lang === 'fa'
      ? `سلام ${fullName}،\n\nدرخواست پروژه شما را دریافت کردیم. تیم ما به زودی با شما تماس خواهد گرفت.\n\nبا احترام،\nآریو استودیو`
      : `Hi ${fullName},\n\nWe have received your project request. Our team will be in touch shortly.\n\nBest regards,\nAriostudio`;

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: email, name: fullName }],
        subject: userSubject,
        textContent: userContent
      })
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
