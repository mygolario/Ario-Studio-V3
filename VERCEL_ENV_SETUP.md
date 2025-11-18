# راهنمای تنظیم Environment Variables در Vercel

## Environment Variables مورد نیاز

از فایل `.env` محلی، این متغیرها باید در Vercel تنظیم شوند:

### 1. Database
```bash
DATABASE_URL=postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### 2. Admin Authentication
```bash
ADMIN_EMAIL=kavehtkts@gmail.com
ADMIN_PASSWORD=85Ario85
NEXTAUTH_SECRET=R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=
NEXTAUTH_URL=https://ario-studio-v3.vercel.app
```

### 3. Email (Resend)
```bash
RESEND_API_KEY=re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK
```

### 4. AI (OpenAI)
```bash
OPENAI_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiY2NmNTY5MjdkMjAxMDBiZWU0MjgiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI5NjIxfQ.Bsbq45mwzKEw5dErH5VUokSk43QT7uH7h0C446ai4Fc
```

## روش 1: استفاده از Vercel CLI

### نصب Vercel CLI (اگر نصب نشده)
```bash
npm i -g vercel
```

### Login به Vercel
```bash
vercel login
```

### Link کردن پروژه
```bash
vercel link
# Project ID: prj_rh6elzbu2zw6ABrsmq1Z7mqTTtR0
```

### اضافه کردن Environment Variables
```bash
# Database
vercel env add DATABASE_URL production
# Paste: postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require

# Admin
vercel env add ADMIN_EMAIL production
# Paste: kavehtkts@gmail.com

vercel env add ADMIN_PASSWORD production
# Paste: 85Ario85

vercel env add NEXTAUTH_SECRET production
# Paste: R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=

vercel env add NEXTAUTH_URL production
# Paste: https://ario-studio-v3.vercel.app

# Email
vercel env add RESEND_API_KEY production
# Paste: re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK

# AI
vercel env add OPENAI_API_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiYzU1YzVlOTNkM2FiOTFmMTYxYzQiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI3Njc2fQ.Ixu_IjDkZsUlCOxHVAu-0rvIggzTtel8nqhXMXqzty4
```

### اضافه کردن برای Preview و Development هم
```bash
# برای هر متغیر، بعد از اضافه کردن برای production، می‌توانید برای preview و development هم اضافه کنید
vercel env add DATABASE_URL preview
vercel env add DATABASE_URL development
# و همینطور برای بقیه...
```

## روش 2: استفاده از Vercel Dashboard

1. بروید به: https://vercel.com/dashboard
2. پروژه `Ario-Studio-V3` را انتخاب کنید
3. Settings → Environment Variables
4. هر متغیر را اضافه کنید:
   - **Name**: نام متغیر (مثلاً `DATABASE_URL`)
   - **Value**: مقدار متغیر
   - **Environment**: Production, Preview, Development (یا همه)

### لیست کامل Environment Variables:

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require` | All |
| `ADMIN_EMAIL` | `kavehtkts@gmail.com` | All |
| `ADMIN_PASSWORD` | `85Ario85` | All |
| `NEXTAUTH_SECRET` | `R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=` | All |
| `NEXTAUTH_URL` | `https://ario-studio-v3.vercel.app` | Production |
| `RESEND_API_KEY` | `re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK` | All |
| `OPENAI_API_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiY2NmNTY5MjdkMjAxMDBiZWU0MjgiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI5NjIxfQ.Bsbq45mwzKEw5dErH5VUokSk43QT7uH7h0C446ai4Fc` | All |

## روش 3: استفاده از Vercel CLI با فایل .env

اگر Vercel CLI نصب شده و پروژه link شده است:

```bash
# Push تمام environment variables از .env.local به Vercel
vercel env pull .env.local
# یا
vercel env add .env
```

## بررسی Environment Variables

بعد از تنظیم، می‌توانید بررسی کنید:

```bash
vercel env ls
```

یا در Dashboard:
https://vercel.com/dashboard → Project → Settings → Environment Variables

## Redeploy بعد از تنظیم

بعد از اضافه کردن environment variables، باید یک redeploy انجام دهید:

```bash
vercel --prod
```

یا در Dashboard:
- بروید به Deployments
- روی آخرین deployment کلیک کنید
- "Redeploy" را بزنید

## نکات مهم

1. **NEXTAUTH_URL**: برای production باید `https://ario-studio-v3.vercel.app` باشد
2. **RESEND_API_KEY**: برای ارسال ایمیل ضروری است
3. **DATABASE_URL**: برای اتصال به database ضروری است
4. **ADMIN_EMAIL**: برای notification ایمیل‌ها (اختیاری اما توصیه می‌شود)

## تست

بعد از تنظیم و redeploy، تست کنید:

1. **تست ایمیل:**
   ```
   https://ario-studio-v3.vercel.app/api/test-email?to=kavehtkts@gmail.com
   ```

2. **تست فرم:**
   - بروید به صفحه اصلی
   - فرم "Start a Project" را submit کنید
   - بررسی کنید که ایمیل ارسال می‌شود

3. **تست Admin:**
   - بروید به `/admin/login`
   - با `ADMIN_EMAIL` و `ADMIN_PASSWORD` login کنید

