const projectTypeLabels: Record<string, string> = {
  new_website: "New Website",
  redesign: "Redesign / Refresh",
  landing_page: "Landing Page",
  brand_visual: "Brand Identity & Visuals",
  other: "Other",
};

const primaryGoalLabels: Record<string, string> = {
  lead_generation: "Lead Generation",
  online_sales: "Online Sales / E-commerce",
  brand_presence: "Brand Awareness & Presence",
  portfolio_showcase: "Portfolio Showcase",
  other: "Other",
};

const budgetRangeLabels = (locale: string): Record<string, string> => ({
  tier1: locale === "fa" ? "۳۰ تا ۶۰ میلیون تومان" : "1,000 – 3,000 USD",
  tier2: locale === "fa" ? "۶۰ تا ۱۲۰ میلیون تومان" : "3,000 – 6,000 USD",
  tier3: locale === "fa" ? "۱۲۰ تا ۲۵۰ میلیون تومان" : "6,000 – 12,000 USD",
});

export function generateClientEmail(name: string, projectType: string, primaryGoal: string, budgetRange: string, locale: string = "en") {
  const pType = projectTypeLabels[projectType] || projectType;
  const pGoal = primaryGoalLabels[primaryGoal] || primaryGoal;
  const bRange = budgetRangeLabels(locale)[budgetRange] || budgetRange;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ario Studio - Project Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1d1d1f; margin: 0; padding: 24px; background-color: #f5f5f7;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Brand -->
    <div style="margin-bottom: 24px; text-align: center;">
      <span style="font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #7B5CFF;">Ario Studio</span>
    </div>

    <!-- Card -->
    <div style="background-color: #ffffff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="margin-bottom: 24px; text-align: center;">
        <h1 style="font-size: 24px; font-weight: 600; letter-spacing: -0.01em; margin: 0 0 8px 0; color: #1d1d1f;">Thank you for your request</h1>
        <p style="font-size: 16px; color: #86868b; margin: 0;">
          Hi ${name}, we've received your project details.
        </p>
      </div>

      <!-- Summary -->
      <div style="margin-bottom: 32px;">
        <div style="background-color: #f5f5f7; border-radius: 12px; padding: 20px;">
          <dl style="margin: 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <dt style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin: 0;">Project Type</dt>
              <dd style="font-size: 14px; font-weight: 500; color: #1d1d1f; margin: 0; text-align: right;">${pType}</dd>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <dt style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin: 0;">Primary Goal</dt>
              <dd style="font-size: 14px; font-weight: 500; color: #1d1d1f; margin: 0; text-align: right;">${pGoal}</dd>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <dt style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin: 0;">Budget Range</dt>
              <dd style="font-size: 14px; font-weight: 500; color: #1d1d1f; margin: 0; text-align: right;">${bRange}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Next Steps -->
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 14px; font-weight: 600; color: #1d1d1f; margin: 0 0 12px 0;">What happens next?</h3>
        <ul style="padding-left: 20px; margin: 0; color: #515155; font-size: 15px;">
          <li style="margin-bottom: 8px;">Our team will review your project details.</li>
          <li style="margin-bottom: 8px;">We may reach out with a few clarifying questions.</li>
          <li>We will get back to you with a timeline and next steps within 24–48 hours.</li>
        </ul>
      </div>

      <div style="border-top: 1px solid #f0f0f0; padding-top: 24px; text-align: center;">
        <p style="font-size: 14px; color: #86868b; margin: 0;">
          Best regards,<br>
          The Ario Studio Team
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="margin-top: 24px; text-align: center;">
      <p style="font-size: 12px; color: #86868b; margin: 0;">
        &copy; ${new Date().getFullYear()} Ario Studio. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
  `;
}

export function generateAdminEmail(data: any, locale: string = "en") {
  const pType = projectTypeLabels[data.projectType] || data.projectType;
  const pGoal = primaryGoalLabels[data.primaryGoal] || data.primaryGoal;
  // Admin email always sees English budget ranges or maybe locale specific?
  // Let's use the locale passed in so we know what the user selected, 
  // OR force English for Admin. The prompt says "Human-friendly labels".
  // Usually Admin wants to know what the user sees, OR standard English.
  // Let's use the locale specific one so it matches what the user selected (accuracy),
  // OR better, show both if possible? No, let's stick to the requested mapping.
  // "budgetRangeLabels = { tier1: locale === 'fa' ? ... }"
  // If I pass 'en' to budgetRangeLabels, I get USD. If 'fa', Toman.
  // For Admin, let's show what the user saw (pass data.locale or use the passed locale).
  const bRange = budgetRangeLabels(locale)[data.budgetRange] || data.budgetRange;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1d1d1f; margin: 0; padding: 24px; background-color: #f5f5f7;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Brand -->
    <div style="margin-bottom: 24px; text-align: center;">
      <span style="font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #7B5CFF;">Ario Studio</span>
    </div>

    <!-- Card -->
    <div style="background-color: #ffffff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="margin-bottom: 32px; border-bottom: 1px solid #f0f0f0; padding-bottom: 24px;">
        <h1 style="font-size: 22px; font-weight: 600; letter-spacing: -0.01em; margin: 0 0 8px 0; color: #1d1d1f;">New Project Request</h1>
        <p style="font-size: 14px; color: #86868b; margin: 0;">
          Received from website contact form (${locale.toUpperCase()})
        </p>
      </div>

      <!-- Section: Basics -->
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin: 0 0 16px 0;">Project Basics</h3>
        <dl style="margin: 0;">
          <div style="display: flex; margin-bottom: 12px;">
            <dt style="width: 120px; font-size: 14px; color: #86868b; margin: 0;">Type</dt>
            <dd style="flex: 1; font-size: 14px; font-weight: 500; color: #1d1d1f; margin: 0;">${pType}</dd>
          </div>
          <div style="display: flex; margin-bottom: 12px;">
            <dt style="width: 120px; font-size: 14px; color: #86868b; margin: 0;">Business</dt>
            <dd style="flex: 1; font-size: 14px; color: #1d1d1f; margin: 0;">${data.businessName || '-'}</dd>
          </div>
          <div style="display: flex; margin-bottom: 12px;">
            <dt style="width: 120px; font-size: 14px; color: #86868b; margin: 0;">Website</dt>
            <dd style="flex: 1; font-size: 14px; color: #1d1d1f; margin: 0;">${data.currentWebsite ? `<a href="${data.currentWebsite}" style="color: #7B5CFF; text-decoration: none;">${data.currentWebsite}</a>` : '-'}</dd>
          </div>
        </dl>
      </div>

      <!-- Section: Goals -->
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin: 0 0 16px 0;">Goals & Scope</h3>
        <dl style="margin: 0;">
          <div style="display: flex; margin-bottom: 12px;">
            <dt style="width: 120px; font-size: 14px; color: #86868b; margin: 0;">Primary Goal</dt>
            <dd style="flex: 1; font-size: 14px; font-weight: 500; color: #1d1d1f; margin: 0;">${pGoal}</dd>
          </div>
          <div style="display: flex; margin-bottom: 12px;">
            <dt style="width: 120px; font-size: 14px; color: #86868b; margin: 0;">Timeline</dt>
            <dd style="flex: 1; font-size: 14px; color: #1d1d1f; margin: 0;">${data.timeline || 'Flexible'}</dd>
          </div>
        </dl>
        <div style="margin-top: 16px; background-color: #f9f9fa; padding: 16px; border-radius: 8px;">
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin-bottom: 8px;">Summary</div>
          <div style="font-size: 14px; line-height: 1.6; color: #1d1d1f; white-space: pre-wrap;">${data.projectSummary}</div>
        </div>
      </div>

      <!-- Section: Contact -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin: 0 0 16px 0;">Budget & Contact</h3>
        <dl style="margin: 0;">
          <div style="display: flex; margin-bottom: 12px;">
            <dt style="width: 120px; font-size: 14px; color: #86868b; margin: 0;">Budget</dt>
            <dd style="flex: 1; font-size: 14px; font-weight: 600; color: #7B5CFF; margin: 0;">${bRange}</dd>
          </div>
          <div style="display: flex; margin-bottom: 12px;">
            <dt style="width: 120px; font-size: 14px; color: #86868b; margin: 0;">Name</dt>
            <dd style="flex: 1; font-size: 14px; font-weight: 500; color: #1d1d1f; margin: 0;">${data.fullName}</dd>
          </div>
          <div style="display: flex; margin-bottom: 12px;">
            <dt style="width: 120px; font-size: 14px; color: #86868b; margin: 0;">Email</dt>
            <dd style="flex: 1; font-size: 14px; color: #1d1d1f; margin: 0;"><a href="mailto:${data.email}" style="color: #7B5CFF; text-decoration: none;">${data.email}</a></dd>
          </div>
          <div style="display: flex; margin-bottom: 12px;">
            <dt style="width: 120px; font-size: 14px; color: #86868b; margin: 0;">Social</dt>
            <dd style="flex: 1; font-size: 14px; color: #1d1d1f; margin: 0;">${data.socialLink || '-'}</dd>
          </div>
        </dl>
        ${data.extraNotes ? `
        <div style="margin-top: 16px; background-color: #f9f9fa; padding: 16px; border-radius: 8px;">
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #86868b; margin-bottom: 8px;">Extra Notes</div>
          <div style="font-size: 14px; line-height: 1.6; color: #515155; white-space: pre-wrap;">${data.extraNotes}</div>
        </div>
        ` : ''}
      </div>

    </div>

    <!-- Footer -->
    <div style="margin-top: 24px; text-align: center;">
      <p style="font-size: 12px; color: #86868b; margin: 0;">
        Sent from Ario Studio Website
      </p>
    </div>

  </div>
</body>
</html>
  `;
}
