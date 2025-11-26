import { NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

/**
 * Test endpoint to verify Brevo API connectivity
 * Access this at: /api/test-brevo
 */
export async function GET() {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    // Check environment variables
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: "BREVO_API_KEY not found in environment variables",
          status: "❌ Configuration Error"
        },
        { status: 500 }
      );
    }

    if (!adminEmail) {
      return NextResponse.json(
        { 
          error: "ADMIN_EMAIL not found in environment variables",
          status: "❌ Configuration Error"
        },
        { status: 500 }
      );
    }

    console.log("🔍 Testing Brevo API connection...");

    // Test Brevo API with account endpoint (doesn't send an email)
    const testRes = await fetch("https://api.brevo.com/v3/account", {
      method: "GET",
      headers: {
        "api-key": apiKey,
      },
    });

    const testData = await testRes.json();

    if (!testRes.ok) {
      console.error("❌ Brevo API authentication failed:", testData);
      return NextResponse.json(
        {
          status: "❌ Brevo API Error",
          statusCode: testRes.status,
          error: testData,
          suggestions: [
            "Check if your BREVO_API_KEY is correct",
            "Verify API key has proper permissions in Brevo dashboard",
            "Ensure API key is active and not expired",
          ],
        },
        { status: 500 }
      );
    }

    console.log("✅ Brevo API connection successful:", testData);

    return NextResponse.json({
      status: "✅ Brevo API Connected",
      accountInfo: {
        email: testData.email,
        firstName: testData.firstName,
        lastName: testData.lastName,
        companyName: testData.companyName,
      },
      configuration: {
        adminEmail,
        apiKeyConfigured: true,
        apiKeyPrefix: apiKey.substring(0, 15) + "...",
      },
      emailTest: {
        message: "Connection verified. Ready to send emails.",
        senderEmail: "no-reply@ariostudio.net",
        note: "Make sure 'no-reply@ariostudio.net' is verified in Brevo if using a custom domain",
      },
    });
  } catch (error) {
    console.error("❌ Test endpoint error:", error);
    return NextResponse.json(
      {
        status: "❌ Error",
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
