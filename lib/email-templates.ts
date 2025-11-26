export function generateClientEmail(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Request Received</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
      padding: 40px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    .content {
      padding: 40px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #111;
    }
    .text {
      color: #555;
      margin-bottom: 24px;
    }
    .steps {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
    }
    .steps h3 {
      margin-top: 0;
      font-size: 16px;
      color: #111;
    }
    .steps ul {
      margin: 0;
      padding-left: 20px;
      color: #555;
    }
    .steps li {
      margin-bottom: 8px;
    }
    .footer {
      background: #111;
      color: #888;
      padding: 32px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #fff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Ario Studio</h1>
    </div>
    <div class="content">
      <div class="greeting">Hi ${name}, thanks for reaching out.</div>
      <div class="text">
        We have received your project request. Our team will review the details and get back to you within 24–48 hours.
      </div>
      
      <div class="steps">
        <h3>What happens next?</h3>
        <ul>
          <li>We review your goals and requirements</li>
          <li>We check feasibility & timeline availability</li>
          <li>We respond with a preliminary plan or a call invite</li>
        </ul>
      </div>

      <div class="text">
        We look forward to potentially working with you.
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Ario Studio. All rights reserved.</p>
      <p><a href="https://ariostudio.net">ariostudio.net</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateAdminEmail(name: string, email: string, message: string) {
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Tehran", // Adjust as needed
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; color: #333; }
    .label { font-weight: bold; color: #666; }
  </style>
</head>
<body>
  <h2>New Project Request</h2>
  <p><span class="label">Name:</span> ${name}</p>
  <p><span class="label">Email:</span> ${email}</p>
  <p><span class="label">Submitted at:</span> ${timestamp}</p>
  <hr />
  <p><span class="label">Message:</span></p>
  <pre style="background: #f4f4f4; padding: 10px; border-radius: 4px; white-space: pre-wrap;">${message}</pre>
</body>
</html>
  `;
}
