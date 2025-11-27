import { NextResponse } from "next/server";
import { generateClientEmail, generateAdminEmail } from "@/lib/email-templates";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      projectType,
      businessName,
      currentWebsite,
      primaryGoal,
      projectSummary,
      timeline,
      budgetRange,
      fullName,
      email,
      socialLink,
      extraNotes,
      locale = "en"
    } = body;

    // console.log("📧 Contact form submission received:", { fullName, email });

    // 1. Validation
    if (!projectType || !primaryGoal || !projectSummary || !budgetRange || !fullName || !email) {
      console.error("❌ Validation failed: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("❌ Validation failed: Invalid email format");
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error("❌ Missing environment variables:", {
        hasApiKey: !!apiKey,
        hasFromEmail: !!fromEmail,
        hasToEmail: !!toEmail,
      });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // console.log("✅ Environment variables validated");

    // 2. Send Admin Notification
    const adminPayload = {
      sender: { name: "Ario Studio System", email: fromEmail },
      to: [{ email: toEmail }],
      subject: `New Project Request — From ${fullName}`,
      htmlContent: generateAdminEmail(body, locale),
    };

    // console.log("📤 Sending admin email to:", toEmail);

    const adminEmailRes = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(adminPayload),
    });

    const adminResponseData = await adminEmailRes.json();

    if (!adminEmailRes.ok) {
      console.error("❌ Brevo Admin Email Error:", {
        status: adminEmailRes.status,
        statusText: adminEmailRes.statusText,
        response: adminResponseData,
      });
      return NextResponse.json(
        { 
          error: "Failed to send email", 
          details: adminResponseData.message || "Unknown Brevo error" 
        },
        { status: 500 }
      );
    }

    // console.log("✅ Admin email sent successfully:", adminResponseData);

    // 3. Send Client Confirmation
    const clientPayload = {
      sender: { name: "Ario Studio", email: fromEmail },
      to: [{ email: email, name: fullName }],
      subject: "Ario Studio — Your project request has been received",
      htmlContent: generateClientEmail(fullName, projectType, primaryGoal, budgetRange, locale),
    };

    // console.log("📤 Sending client confirmation to:", email);

    const clientEmailRes = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(clientPayload),
    });

    const clientResponseData = await clientEmailRes.json();

    if (!clientEmailRes.ok) {
      // Log error but don't fail the request if client email fails (admin email already sent)
      console.error("⚠️ Brevo Client Email Error (non-critical):", {
        status: clientEmailRes.status,
        statusText: clientEmailRes.statusText,
        response: clientResponseData,
      });
    } else {
      // console.log("✅ Client confirmation sent successfully:", clientResponseData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Contact API Critical Error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
