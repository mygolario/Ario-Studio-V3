export function generateClientEmail(name: string, projectType: string, primaryGoal: string, budgetRange: string) {
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
    .summary {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .summary-item {
      margin-bottom: 8px;
      font-size: 14px;
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
      
      <div class="summary">
        <div class="summary-item"><strong>Project Type:</strong> ${projectType}</div>
        <div class="summary-item"><strong>Primary Goal:</strong> ${primaryGoal}</div>
        <div class="summary-item"><strong>Budget Range:</strong> ${budgetRange}</div>
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

export function generateAdminEmail(data: any) {
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Tehran",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.5; }
    .container { max-width: 600px; margin: 0 auto; }
    .section { margin-bottom: 24px; background: #f9fafb; padding: 16px; border-radius: 8px; }
    .section-title { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600; }
    .row { display: flex; margin-bottom: 8px; }
    .label { flex: 0 0 140px; font-weight: 500; color: #4b5563; font-size: 14px; }
    .value { flex: 1; color: #111827; font-size: 14px; }
    .highlight { background: #eff6ff; padding: 2px 6px; border-radius: 4px; color: #1d4ed8; font-weight: 500; }
    hr { border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Project Request</h2>
    <p style="color: #6b7280; font-size: 13px;">Submitted at: ${timestamp}</p>
    
    <div class="section">
      <div class="section-title">Project Basics</div>
      <div class="row">
        <div class="label">Project Type:</div>
        <div class="value"><span class="highlight">${data.projectType}</span></div>
      </div>
      <div class="row">
        <div class="label">Business Name:</div>
        <div class="value">${data.businessName || '-'}</div>
      </div>
      <div class="row">
        <div class="label">Current Website:</div>
        <div class="value">${data.currentWebsite ? `<a href="${data.currentWebsite}">${data.currentWebsite}</a>` : '-'}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Goals & Scope</div>
      <div class="row">
        <div class="label">Primary Goal:</div>
        <div class="value">${data.primaryGoal}</div>
      </div>
      <div class="row">
        <div class="label">Timeline:</div>
        <div class="value">${data.timeline || 'Flexible'}</div>
      </div>
      <div style="margin-top: 12px;">
        <div class="label" style="margin-bottom: 4px;">Project Summary:</div>
        <div class="value" style="background: white; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px; font-family: monospace; white-space: pre-wrap;">${data.projectSummary}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Budget & Contact</div>
      <div class="row">
        <div class="label">Budget Range:</div>
        <div class="value"><span class="highlight">${data.budgetRange}</span></div>
      </div>
      <div class="row">
        <div class="label">Full Name:</div>
        <div class="value">${data.fullName}</div>
      </div>
      <div class="row">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="row">
        <div class="label">Social Link:</div>
        <div class="value">${data.socialLink || '-'}</div>
      </div>
      ${data.extraNotes ? `
      <div style="margin-top: 12px;">
        <div class="label" style="margin-bottom: 4px;">Extra Notes:</div>
        <div class="value" style="white-space: pre-wrap;">${data.extraNotes}</div>
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>
  `;
}
