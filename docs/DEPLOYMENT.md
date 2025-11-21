# Deployment Guide - Ario Studio V3

This guide covers deployment steps for the bilingual (FA/EN) Ario Studio V3 website.

## Pre-Deployment Checklist

### 1. Environment Variables

Ensure all required environment variables are set in your hosting platform (Vercel, etc.):

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `BREVO_SMTP_USER` - Brevo SMTP username
- `BREVO_SMTP_PASS` - Brevo SMTP password
- `CONTACT_FROM_EMAIL` - Verified sender email (must be verified in Brevo)
- `CONTACT_TO_EMAIL` - Admin email for receiving contact form submissions
- `NEXTAUTH_SECRET` - Random secret for JWT (generate with: `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your production URL (e.g., `https://www.ario-studio.net`)

**Optional but Recommended:**
- `NEXT_PUBLIC_SITE_URL` - Base URL for SEO, sitemap, OG images
- `OPENAI_API_KEY` or `LIARA_API_KEY` - For AI lead enrichment
- `ADMIN_EMAIL` - Admin panel email
- `ADMIN_PASSWORD` - Admin panel password (hashed)
- `OPTIMIZE_API_KEY` - Prisma Optimize API key for query analysis and optimization

See `.env.example` for full list.

### 2. Database Setup

1. **Run Migrations:**
   ```bash
   npx prisma migrate deploy
   ```

2. **Seed Initial Data (if needed):**
   ```bash
   npx prisma db seed
   ```

3. **Verify Database Connection:**
   - Test connection in production environment
   - Ensure database is accessible from hosting platform

### 3. Email Configuration

1. **Verify Brevo Setup:**
   - Verify sender email (`CONTACT_FROM_EMAIL`) in Brevo dashboard
   - Test SMTP connection
   - Test email sending with `/api/test-email?to=your-email@example.com`

2. **Email Templates:**
   - Contact form emails are automatically bilingual (FA/EN)
   - Auto-reply emails are sent in user's language

### 4. Build & Test

1. **Build Locally:**
   ```bash
   npm run build
   ```

2. **Check for Errors:**
   - No TypeScript errors
   - No linting errors
   - All API routes compile successfully

3. **Test Key Features:**
   - Homepage loads in both FA and EN
   - Contact form submits successfully
   - Services/Portfolio sections display correctly
   - Portfolio detail pages work

## Deployment Steps

### Vercel Deployment

1. **Connect Repository:**
   - Connect your GitHub repository to Vercel
   - Select the correct branch (usually `master` or `main`)

2. **Configure Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all required variables from `.env.example`
   - Set variables for Production, Preview, and Development

3. **Configure Build Settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Deploy:**
   - Push to connected branch
   - Vercel will automatically deploy
   - Monitor deployment logs for errors

### Post-Deployment

1. **Verify Deployment:**
   - [ ] Homepage loads correctly
   - [ ] Language toggle works (FA ↔ EN)
   - [ ] Contact form submits successfully
   - [ ] Emails are received in correct language
   - [ ] Services/Portfolio sections display data
   - [ ] Portfolio detail pages work
   - [ ] SEO metadata is correct (check page source)

2. **Test Contact Form:**
   - Submit form in FA language → verify FA email received
   - Submit form in EN language → verify EN email received
   - Test validation errors (empty fields)
   - Test error handling (simulate email failure)

3. **Check SEO:**
   - Verify `<html lang="fa" dir="rtl">` for Farsi
   - Verify `<html lang="en" dir="ltr">` for English
   - Check hreflang tags in page source
   - Test OpenGraph previews (Facebook, Twitter, LinkedIn)

4. **Performance:**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Verify images are optimized
   - Check font loading (Vazirmatn for FA, Inter for EN)

## Domain Configuration

### Custom Domain Setup

1. **Add Domain in Vercel:**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `www.ario-studio.net`)
   - Follow DNS configuration instructions

2. **Update Environment Variables:**
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain
   - Update `NEXTAUTH_URL` to your custom domain

3. **SSL Certificate:**
   - Vercel automatically provisions SSL certificates
   - Wait for certificate to be issued (usually < 24 hours)

## Monitoring & Maintenance

### Regular Checks

1. **Error Monitoring:**
   - Monitor Vercel logs for errors
   - Set up error tracking (Sentry, etc.)
   - Check email delivery logs

2. **Database:**
   - Monitor database connection pool
   - Check for slow queries
   - Regular backups

3. **Content Updates:**
   - Use admin panel (`/admin`) to update content
   - Add new portfolio items/services
   - Update translations as needed

### Troubleshooting

**Contact Form Not Working:**
- Check Brevo SMTP credentials
- Verify `CONTACT_FROM_EMAIL` is verified in Brevo
- Check Vercel function logs

**Language Not Switching:**
- Clear browser cookies
- Check `LanguageContext` cookie setting
- Verify `getServerLang()` is working

**Content Not Loading:**
- Check database connection
- Verify Prisma migrations are applied
- Check API route logs

## Rollback Plan

If deployment fails:

1. **Revert to Previous Version:**
   - In Vercel, go to Deployments
   - Find last successful deployment
   - Click "Promote to Production"

2. **Database Rollback:**
   ```bash
   npx prisma migrate resolve --rolled-back <migration-name>
   ```

3. **Environment Variables:**
   - Revert any changed environment variables
   - Verify all required variables are set

## Support

For issues or questions:
- Check `docs/todo-i18n.md` for known limitations
- Review code comments for TODO items
- Check GitHub issues

---

**Last Updated:** 2024

