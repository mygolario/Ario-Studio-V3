export function generateClientEmail(name: string, projectType: string, primaryGoal: string, budgetRange: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ario Studio - Project Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1d1d1f; margin: 0; padding: 0; background-color: #f5f5f7;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="margin-bottom: 32px; border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
      <span style="font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: #1d1d1f;">Ario Studio</span>
    </div>

    <!-- Content -->
    <div style="margin-bottom: 32px;">
      <p style="font-size: 16px; margin-bottom: 24px;">Hi ${name},</p>
      <p style="font-size: 16px; margin-bottom: 24px; color: #515155;">
        Thank you for reaching out to Ario Studio. We have received your project request and are excited to review it.
      </p>

      <div style="background-color: #f5f5f7; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin-top: 0; margin-bottom: 16px;">Summary of your request</h3>
        
        <div style="margin-bottom: 12px;">
          <span style="color: #86868b; font-size: 14px; margin-right: 8px;">Project Type:</span>
          <span style="font-weight: 500; font-size: 14px;">${projectType}</span>
        </div>
        <div style="margin-bottom: 12px;">
          <span style="color: #86868b; font-size: 14px; margin-right: 8px;">Primary Goal:</span>
          <span style="font-weight: 500; font-size: 14px;">${primaryGoal}</span>
        </div>
        <div>
          <span style="color: #86868b; font-size: 14px; margin-right: 8px;">Budget Range:</span>
          <span style="font-weight: 500; font-size: 14px;">${budgetRange}</span>
        </div>
      </div>

      <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin-bottom: 16px;">What happens next?</h3>
      <ul style="padding-left: 20px; color: #515155; font-size: 15px; margin-bottom: 32px;">
        <li style="margin-bottom: 8px;">Our team will review your project details.</li>
        <li style="margin-bottom: 8px;">We may reach out with a few clarifying questions.</li>
        <li>We will get back to you with a timeline and next steps within 24–48 hours.</li>
      </ul>

      <p style="font-size: 16px; margin-bottom: 0;">
        Best,<br>
        Ario Studio
      </p>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center; color: #86868b; font-size: 12px;">
      <p style="margin-bottom: 8px;">&copy; ${new Date().getFullYear()} Ario Studio</p>
      <p style="margin: 0;">
        <a href="mailto:info@ariostudio.net" style="color: #86868b; text-decoration: none;">info@ariostudio.net</a>
      </p>
    </div>

  </div>
</body>
</html>
  `;
}

export function generateAdminEmail(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1d1d1f; margin: 0; padding: 0; background-color: #f5f5f7;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="margin-bottom: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
      <h1 style="font-size: 22px; font-weight: 600; letter-spacing: -0.01em; margin: 0; color: #1d1d1f;">New project request</h1>
      <p style="font-size: 14px; color: #86868b; margin-top: 8px; margin-bottom: 0;">
        A new project request has been submitted via the Ario Studio website.
      </p>
    </div>

    <!-- Project Basics -->
    <div style="margin-bottom: 32px;">
      <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; margin-bottom: 16px;">Project Basics</h3>
      
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 140px; font-size: 14px; color: #86868b;">Project Type</div>
        <div style="flex: 1; font-size: 14px; font-weight: 500;">${data.projectType}</div>
      </div>
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 140px; font-size: 14px; color: #86868b;">Business Name</div>
        <div style="flex: 1; font-size: 14px;">${data.businessName || '-'}</div>
      </div>
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 140px; font-size: 14px; color: #86868b;">Website</div>
        <div style="flex: 1; font-size: 14px;">${data.currentWebsite ? `<a href="${data.currentWebsite}" style="color: #007aff; text-decoration: none;">${data.currentWebsite}</a>` : '-'}</div>
      </div>
    </div>

    <!-- Goals & Scope -->
    <div style="margin-bottom: 32px;">
      <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; margin-bottom: 16px;">Goals & Scope</h3>
      
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 140px; font-size: 14px; color: #86868b;">Primary Goal</div>
        <div style="flex: 1; font-size: 14px; font-weight: 500;">${data.primaryGoal}</div>
      </div>
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 140px; font-size: 14px; color: #86868b;">Timeline</div>
        <div style="flex: 1; font-size: 14px;">${data.timeline || 'Flexible'}</div>
      </div>
      <div style="margin-top: 16px;">
        <div style="font-size: 14px; color: #86868b; margin-bottom: 8px;">Project Summary</div>
        <div style="background-color: #f9f9fa; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #1d1d1f; white-space: pre-wrap;">${data.projectSummary}</div>
      </div>
    </div>

    <!-- Budget & Contact -->
    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; margin-bottom: 16px;">Budget & Contact</h3>
      
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 140px; font-size: 14px; color: #86868b;">Budget Range</div>
        <div style="flex: 1; font-size: 14px; font-weight: 500; color: #007aff;">${data.budgetRange}</div>
      </div>
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 140px; font-size: 14px; color: #86868b;">Full Name</div>
        <div style="flex: 1; font-size: 14px; font-weight: 500;">${data.fullName}</div>
      </div>
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 140px; font-size: 14px; color: #86868b;">Email</div>
        <div style="flex: 1; font-size: 14px;"><a href="mailto:${data.email}" style="color: #007aff; text-decoration: none;">${data.email}</a></div>
      </div>
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 140px; font-size: 14px; color: #86868b;">Social Link</div>
        <div style="flex: 1; font-size: 14px;">${data.socialLink || '-'}</div>
      </div>
       ${data.extraNotes ? `
      <div style="margin-top: 16px;">
        <div style="font-size: 14px; color: #86868b; margin-bottom: 8px;">Extra Notes</div>
        <div style="font-size: 14px; line-height: 1.6; color: #515155; white-space: pre-wrap;">${data.extraNotes}</div>
      </div>
      ` : ''}
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 40px; text-align: center; color: #86868b; font-size: 12px;">
      <p style="margin-bottom: 0;">Sent via Ario Studio Contact Form</p>
    </div>

  </div>
</body>
</html>
  `;
}
