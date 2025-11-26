import { NextResponse } from "next/server";
import { generateClientEmail, generateAdminEmail } from "@/lib/email-templates";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    console.log("📧 Contact form submission received:", { name, email });

    // 1. Validation
    if (!name || !email || !message) {
      console.error("❌ Validation failed: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
      console.error("❌ Missing environment variables:", {
        hasApiKey: !!apiKey,
        hasAdminEmail: !!adminEmail,
      });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    console.log("✅ Environment variables validated");

    // 2. Send Admin Notification
    const adminPayload = {
      sender: { name: "Ario Studio System", email: "no-reply@ariostudio.net" },
      to: [{ email: adminEmail }],
      subject: `New Project Request — From ${name}`,
      htmlContent: generateAdminEmail(name, email, message),
    };

    console.log("📤 Sending admin email to:", adminEmail);

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

    console.log("✅ Admin email sent successfully:", adminResponseData);

    // 3. Send Client Confirmation
    const clientPayload = {
      sender: { name: "Ario Studio", email: adminEmail },
      to: [{ email: email, name: name }],
      subject: "Ario Studio — Your project request has been received",
      htmlContent: generateClientEmail(name),
    };

    console.log("📤 Sending client confirmation to:", email);

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
      console.log("✅ Client confirmation sent successfully:", clientResponseData);
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
