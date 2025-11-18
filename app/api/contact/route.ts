import { NextResponse } from "next/server";
import { sendContactEmail, sendAutoReplyEmail } from "@/lib/email/brevo";

/**
 * Contact form API route
 * 
 * Accepts POST requests with contact form data and sends emails via Brevo SMTP
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    // Send contact email to admin
    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        subject: subject?.trim(),
        message: message.trim(),
      });
    } catch (emailError: any) {
      console.error("Failed to send contact email:", emailError);
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    // Send auto-reply to user (non-blocking, graceful degradation)
    try {
      await sendAutoReplyEmail(name.trim(), email.trim());
    } catch (autoReplyError) {
      // Log but don't fail - auto-reply failure shouldn't break the main flow
      console.warn("Failed to send auto-reply email:", autoReplyError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("CONTACT_FORM_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
