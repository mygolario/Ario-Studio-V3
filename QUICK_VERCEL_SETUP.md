# راهنمای سریع تنظیم Environment Variables در Vercel

## روش ساده: استفاده از Vercel Dashboard (توصیه می‌شود)

### 1. ورود به Dashboard
بروید به: https://vercel.com/dashboard

### 2. انتخاب پروژه
- پروژه **Ario-Studio-V3** را انتخاب کنید
- یا بروید به: https://vercel.com/mygolario/Ario-Studio-V3/settings/environment-variables

### 3. اضافه کردن Environment Variables

در صفحه **Settings → Environment Variables**، این متغیرها را یکی یکی اضافه کنید:

#### Database
- **Name**: `DATABASE_URL`
- **Value**: `postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

#### Admin Authentication
- **Name**: `ADMIN_EMAIL`
- **Value**: `kavehtkts@gmail.com`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

- **Name**: `ADMIN_PASSWORD`
- **Value**: `85Ario85`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

- **Name**: `NEXTAUTH_SECRET`
- **Value**: `R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

- **Name**: `NEXTAUTH_URL`
- **Value**: `https://ario-studio-v3.vercel.app`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

#### Email (Resend)
- **Name**: `RESEND_API_KEY`
- **Value**: `re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

#### AI (OpenAI)
- **Name**: `OPENAI_API_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiYzU1YzVlOTNkM2FiOTFmMTYxYzQiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI3Njc2fQ.Ixu_IjDkZsUlCOxHVAu-0rvIggzTtel8nqhXMXqzty4`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

### 4. Redeploy
بعد از اضافه کردن همه متغیرها:
1. بروید به **Deployments**
2. روی آخرین deployment کلیک کنید
3. **"Redeploy"** را بزنید

---

## روش 2: استفاده از Vercel CLI (اگر login کرده‌اید)

### Step 1: Login
```bash
vercel login
```
(در مرورگر باز می‌شود و باید تایید کنید)

### Step 2: Link Project
```bash
vercel link --yes --project prj_rh6elzbu2zw6ABrsmq1Z7mqTTtR0
```

### Step 3: Run Setup Script
```powershell
.\setup-vercel-env.ps1
```

---

## لیست کامل Environment Variables

| Name | Value | Environments |
|------|-------|---------------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require` | All |
| `ADMIN_EMAIL` | `kavehtkts@gmail.com` | All |
| `ADMIN_PASSWORD` | `85Ario85` | All |
| `NEXTAUTH_SECRET` | `R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=` | All |
| `NEXTAUTH_URL` | `https://ario-studio-v3.vercel.app` | All |
| `RESEND_API_KEY` | `re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK` | All |
| `OPENAI_API_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiYzU1YzVlOTNkM2FiOTFmMTYxYzQiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI3Njc2fQ.Ixu_IjDkZsUlCOxHVAu-0rvIggzTtel8nqhXMXqzty4` | All |

---

## تست بعد از تنظیم

### 1. تست ایمیل
```
https://ario-studio-v3.vercel.app/api/test-email?to=kavehtkts@gmail.com
```

### 2. تست فرم
- بروید به صفحه اصلی
- فرم "Start a Project" را submit کنید
- بررسی کنید که ایمیل ارسال می‌شود

### 3. تست Admin
- بروید به `/admin/login`
- با `kavehtkts@gmail.com` و `85Ario85` login کنید

---

## لینک‌های مفید

- **Dashboard**: https://vercel.com/dashboard
- **Project Settings**: https://vercel.com/mygolario/Ario-Studio-V3/settings
- **Environment Variables**: https://vercel.com/mygolario/Ario-Studio-V3/settings/environment-variables
- **Deployments**: https://vercel.com/mygolario/Ario-Studio-V3
- **Live Site**: https://ario-studio-v3.vercel.app

