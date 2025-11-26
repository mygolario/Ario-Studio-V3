import { NextResponse } from "next/server";
import { generateClientEmail, generateAdminEmail } from "@/lib/email-templates";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
      console.error("Missing Brevo configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 2. Send Admin Notification
    const adminEmailRes = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: "Ario Studio System", email: "no-reply@ariostudio.net" },
        to: [{ email: adminEmail }],
        subject: `New Project Request — From ${name}`,
        htmlContent: generateAdminEmail(name, email, message),
      }),
    });

    if (!adminEmailRes.ok) {
      const errorData = await adminEmailRes.json();
      console.error("Brevo Admin Email Error:", errorData);
      throw new Error("Failed to send admin email");
    }

    // 3. Send Client Confirmation
    const clientEmailRes = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: "Ario Studio", email: adminEmail },
        to: [{ email: email, name: name }],
        subject: "Ario Studio — Your project request has been received",
        htmlContent: generateClientEmail(name),
      }),
    });

    if (!clientEmailRes.ok) {
      // Log error but don't fail the request if client email fails (admin email already sent)
      const errorData = await clientEmailRes.json();
      console.error("Brevo Client Email Error:", errorData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
