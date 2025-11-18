# Launch Checklist - Ario Studio V3 (Bilingual)

This checklist ensures the bilingual (FA/EN) website is ready for production launch.

## ✅ Pre-Launch Checklist

### 1. Core Routes (FA/EN)

- [x] **Homepage (`/`)**
  - [x] Language detection works (cookie → Accept-Language → default 'fa')
  - [x] SEO metadata is bilingual (title, description, OG tags)
  - [x] `lang` and `dir` attributes are set correctly
  - [x] Services section displays localized content
  - [x] Portfolio section displays localized content
  - [x] All UI text is translated (buttons, labels, etc.)

- [x] **Portfolio Detail (`/work/[slug]`)**
  - [x] Content is fetched in correct language
  - [x] SEO metadata is bilingual
  - [x] hreflang tags are present
  - [x] Fallback to English if Farsi not available

- [x] **Contact Form**
  - [x] Form submission works in both languages
  - [x] Validation errors are bilingual
  - [x] Success/error messages are bilingual
  - [x] Language is passed to server action

### 2. API Endpoints

- [x] **`/api/contact`**
  - [x] Language detection from request
  - [x] Bilingual success/error messages
  - [x] Bilingual validation errors
  - [x] Email sending in correct language

- [x] **`/api/services`**
  - [x] Returns localized services
  - [x] Bilingual error messages
  - [x] Proper response structure

- [x] **`/api/portfolio`**
  - [x] Returns localized portfolio items
  - [x] Bilingual error messages
  - [x] Proper response structure

- [x] **`/api/content/[slug]`**
  - [x] Returns localized content
  - [x] 404 handling with bilingual messages
  - [x] Proper response structure

### 3. Email System

- [x] **Contact Form Emails**
  - [x] Admin notification emails are bilingual
  - [x] Auto-reply emails are bilingual
  - [x] RTL support for Farsi emails
  - [x] Vazirmatn font for Farsi emails

- [x] **Lead Emails**
  - [x] Lead notification emails are bilingual
  - [x] Lead auto-reply emails are bilingual
  - [x] RTL support for Farsi emails

### 4. SEO & Metadata

- [x] **HTML Attributes**
  - [x] `<html lang="fa" dir="rtl">` for Farsi
  - [x] `<html lang="en" dir="ltr">` for English
  - [x] Dynamic based on user language

- [x] **Metadata**
  - [x] Bilingual titles and descriptions
  - [x] OpenGraph tags are bilingual
  - [x] Twitter card tags are bilingual
  - [x] hreflang tags for language alternates

- [x] **Sitemap**
  - [x] Includes all routes
  - [x] hreflang annotations
  - [x] Updated lastModified dates

### 5. Environment Variables

- [x] **Required Variables Documented**
  - [x] `.env.example` created
  - [x] All variables documented
  - [x] Production deployment notes included

### 6. Code Quality

- [x] **TypeScript**
  - [x] No type errors
  - [x] All types are correct

- [x] **Linting**
  - [x] ESLint passes with no errors
  - [x] No warnings

- [x] **Build**
  - [x] Production build succeeds
  - [x] All routes compile
  - [x] No build errors

### 7. Documentation

- [x] **TODO List**
  - [x] `docs/todo-i18n.md` created
  - [x] Future improvements documented

- [x] **Deployment Guide**
  - [x] `docs/DEPLOYMENT.md` created
  - [x] Step-by-step deployment instructions

- [x] **Code Comments**
  - [x] TODO comments added in key files
  - [x] Documentation for i18n system

## 🚀 Ready for Launch

### Pre-Launch Steps

1. **Set Environment Variables:**
   - Copy `.env.example` to production environment
   - Fill in all required values
   - Verify email addresses are verified in Brevo

2. **Database Setup:**
   - Run `npx prisma migrate deploy`
   - Run `npx prisma db seed` (if needed)
   - Verify database connection

3. **Test Email System:**
   - Test contact form submission
   - Verify emails are received
   - Check email content is in correct language

4. **Final Testing:**
   - Test homepage in both languages
   - Test contact form in both languages
   - Test portfolio pages
   - Check SEO metadata
   - Verify hreflang tags

### Post-Launch Monitoring

- Monitor error logs
- Check email delivery rates
- Monitor database performance
- Track language preferences
- Monitor SEO performance

## 📝 Notes

- Default language is Farsi ('fa')
- Language is detected from cookie → Accept-Language → default
- All user-facing messages are bilingual
- Internal logs remain in English (for developers)
- Email templates support RTL for Farsi

---

**Status:** ✅ Ready for Production Launch
**Last Updated:** 2024

