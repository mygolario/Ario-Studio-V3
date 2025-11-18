import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const FROM = process.env.RESEND_FROM || "onboarding@resend.dev";
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "kavehtkts@gmail.com";

    // 1) Admin notification
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: "New contact form submission",
      html: `
        <p><strong>Name:</strong> ${name || "Unknown"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "-"}</p>
      `,
    });

    // 2) User confirmation
    await resend.emails.send({
      from: FROM,
      to: email, // IMPORTANT: dynamic user email from the form
      subject: "Thanks for contacting Ario Studio",
      html: `
        <p>Hi ${name || ""},</p>
        <p>Thanks for reaching out to Ario Studio. We received your message and will get back to you soon.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT_FORM_ERROR", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

