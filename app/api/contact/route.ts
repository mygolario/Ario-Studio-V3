import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, sendAutoReplyEmail } from "@/lib/email/brevo";
import { getRequestLang } from "@/lib/i18n/get-request-lang";
import { getTranslation } from "@/lib/i18n/server-i18n";

/**
 * Contact form API route
 * 
 * Accepts POST requests with contact form data and sends emails via Brevo SMTP
 * Supports bilingual responses (EN/FA) based on request language detection
 */
export async function POST(req: NextRequest) {
  try {
    // Detect language from request
    const lang = getRequestLang(req);
    const t = (key: string) => getTranslation(lang, key);

    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation with i18n messages
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: t("contact.validation.nameRequired") },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: t("contact.validation.emailInvalid") },
        { status: 400 }
      );
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: t("contact.validation.messageRequired") },
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
      }, lang);
    } catch (emailError: any) {
      console.error("Failed to send contact email:", emailError);
      return NextResponse.json(
        { success: false, error: t("contact.error") },
        { status: 500 }
      );
    }

    // Send auto-reply to user (non-blocking, graceful degradation)
    try {
      await sendAutoReplyEmail(name.trim(), email.trim(), lang);
    } catch (autoReplyError) {
      // Log but don't fail - auto-reply failure shouldn't break the main flow
      console.warn("Failed to send auto-reply email:", autoReplyError);
    }

    return NextResponse.json({
      success: true,
      message: t("contact.success")
    });
  } catch (error: any) {
    console.error("CONTACT_FORM_ERROR", error);
    // Try to get language for error message, but don't fail if it doesn't work
    try {
      const lang = getRequestLang(req);
      const t = (key: string) => getTranslation(lang, key);
      return NextResponse.json(
        { success: false, error: t("contact.error") },
        { status: 500 }
      );
    } catch {
      // Fallback to English if language detection fails
      return NextResponse.json(
        { success: false, error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
