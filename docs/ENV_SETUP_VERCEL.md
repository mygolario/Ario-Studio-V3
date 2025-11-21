# راهنمای تنظیم Environment Variables در Vercel (Production)

این راهنما به شما کمک می‌کند تا تمام Environment Variables مورد نیاز را در Vercel برای production تنظیم کنید.

## 📋 لیست کامل Environment Variables

### 🔴 الزامی (Required)

این متغیرها برای عملکرد صحیح سایت ضروری هستند:

| متغیر | توضیحات | مثال |
|-------|---------|------|
| `DATABASE_URL` | Connection string دیتابیس PostgreSQL | `postgresql://user:pass@host:5432/dbname` |
| `BREVO_SMTP_USER` | Username SMTP از Brevo | `your-email@example.com` |
| `BREVO_SMTP_PASS` | Password SMTP از Brevo | `your-smtp-password` |
| `CONTACT_FROM_EMAIL` | ایمیل فرستنده (باید در Brevo verify شده باشد) | `info@ariostudio.net` |
| `CONTACT_TO_EMAIL` | ایمیل دریافت کننده فرم تماس | `info@ariostudio.net` |
| `NEXTAUTH_SECRET` | Secret برای JWT encryption | (تولید با دستور زیر) |
| `NEXTAUTH_URL` | URL سایت production | `https://www.ario-studio.net` |

### 🟡 توصیه شده (Recommended)

این متغیرها اختیاری هستند اما توصیه می‌شوند:

| متغیر | توضیحات | مثال |
|-------|---------|------|
| `NEXT_PUBLIC_SITE_URL` | Base URL برای SEO و sitemap | `https://www.ario-studio.net` |
| `OPENAI_API_KEY` | API Key برای AI lead enrichment | `sk-...` |
| `LIARA_API_KEY` | API Key برای Liara AI (جایگزین OpenAI) | `...` |
| `ADMIN_EMAIL` | ایمیل ادمین برای پنل مدیریت | `admin@ariostudio.net` |
| `ADMIN_PASSWORD` | رمز عبور ادمین (hashed) | `...` |

### 🟢 اختیاری (Optional)

| متغیر | توضیحات | مثال |
|-------|---------|------|
| `BREVO_SMTP_HOST` | Host SMTP (پیش‌فرض: smtp-relay.brevo.com) | `smtp-relay.brevo.com` |
| `BREVO_SMTP_PORT` | Port SMTP (پیش‌فرض: 587) | `587` |
| `BREVO_API_KEY` | API Key Brevo (اگر از API استفاده می‌کنید) | `...` |
| `AI_PROVIDER` | Provider AI (openai یا liara) | `openai` |
| `OPENAI_BASE_URL` | Base URL سفارشی برای OpenAI API | `https://api.openai.com/v1` |
| `OPTIMIZE_API_KEY` | API Key برای Prisma Optimize (تحلیل و بهینه‌سازی queryها) | `eyJhbGci...` |

---

## 🚀 مراحل تنظیم در Vercel

### مرحله 1: ورود به Vercel Dashboard

1. به [vercel.com](https://vercel.com) بروید و وارد حساب کاربری خود شوید
2. پروژه `Ario-Studio-V3` را انتخاب کنید
3. به **Settings** → **Environment Variables** بروید

### مرحله 2: افزودن Environment Variables

برای هر متغیر:

1. روی دکمه **Add New** کلیک کنید
2. **Name** را وارد کنید (مثلاً `DATABASE_URL`)
3. **Value** را وارد کنید
4. **Environment** را انتخاب کنید:
   - ✅ **Production** - برای production deployment
   - ✅ **Preview** - برای preview deployments
   - ✅ **Development** - برای local development (اختیاری)

5. روی **Save** کلیک کنید

### مرحله 3: تنظیم متغیرهای الزامی

#### 1. DATABASE_URL

```
Name: DATABASE_URL
Value: postgresql://username:password@host:5432/database_name
Environment: Production, Preview
```

**نکات:**
- از connection string دیتابیس production استفاده کنید
- اگر از Vercel Postgres استفاده می‌کنید، از connection string خود Vercel استفاده کنید
- اگر از Supabase استفاده می‌کنید، از connection string Supabase استفاده کنید

**مثال برای Vercel Postgres:**
```
postgres://default:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```

#### 2. BREVO_SMTP_USER

```
Name: BREVO_SMTP_USER
Value: your-brevo-smtp-username
Environment: Production, Preview
```

**نحوه دریافت:**
1. به [Brevo Dashboard](https://app.brevo.com) بروید
2. به **Settings** → **SMTP & API** بروید
3. **SMTP Login** را کپی کنید

#### 3. BREVO_SMTP_PASS

```
Name: BREVO_SMTP_PASS
Value: your-brevo-smtp-password
Environment: Production, Preview
```

**نحوه دریافت:**
1. در Brevo Dashboard، **SMTP Password** را کپی کنید
2. اگر password ندارید، **Generate SMTP Key** را بزنید

#### 4. CONTACT_FROM_EMAIL

```
Name: CONTACT_FROM_EMAIL
Value: info@ariostudio.net
Environment: Production, Preview
```

**نکات مهم:**
- این ایمیل **باید** در Brevo verify شده باشد
- برای verify کردن:
  1. به Brevo Dashboard → **Senders** بروید
  2. **Add a sender** را بزنید
  3. ایمیل را اضافه کنید و verify کنید

#### 5. CONTACT_TO_EMAIL

```
Name: CONTACT_TO_EMAIL
Value: info@ariostudio.net
Environment: Production, Preview
```

**نکات:**
- این ایمیل می‌تواند همان `CONTACT_FROM_EMAIL` باشد
- می‌توانید چند ایمیل را با کاما جدا کنید: `email1@example.com,email2@example.com`

#### 6. NEXTAUTH_SECRET

```
Name: NEXTAUTH_SECRET
Value: [تولید با دستور زیر]
Environment: Production, Preview
```

**تولید Secret:**

در Terminal (Mac/Linux):
```bash
openssl rand -base64 32
```

در PowerShell (Windows):
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

یا از [این سایت](https://generate-secret.vercel.app/32) استفاده کنید.

#### 7. NEXTAUTH_URL

```
Name: NEXTAUTH_URL
Value: https://www.ario-studio.net
Environment: Production
```

**نکات:**
- برای Preview: `https://ario-studio-v3-xxx.vercel.app`
- برای Production: دامنه اصلی شما

### مرحله 4: تنظیم متغیرهای توصیه شده

#### NEXT_PUBLIC_SITE_URL

```
Name: NEXT_PUBLIC_SITE_URL
Value: https://www.ario-studio.net
Environment: Production, Preview
```

**نکات:**
- این متغیر برای SEO، sitemap، و OG images استفاده می‌شود
- حتماً با `https://` شروع شود
- بدون trailing slash (`/`)

#### OPENAI_API_KEY (اختیاری)

```
Name: OPENAI_API_KEY
Value: sk-...
Environment: Production, Preview
```

**نحوه دریافت:**
1. به [OpenAI Platform](https://platform.openai.com) بروید
2. به **API Keys** بروید
3. **Create new secret key** را بزنید
4. Key را کپی کنید (فقط یک بار نمایش داده می‌شود!)

**یا استفاده از Liara AI:**

```
Name: LIARA_API_KEY
Value: ...
Environment: Production, Preview
```

```
Name: AI_PROVIDER
Value: liara
Environment: Production, Preview
```

#### OPTIMIZE_API_KEY (اختیاری - برای Prisma Optimize)

```
Name: OPTIMIZE_API_KEY
Value: eyJhbGci...
Environment: Production, Preview
```

**نکات:**
- این API Key برای Prisma Optimize استفاده می‌شود
- Prisma Optimize queryهای دیتابیس را تحلیل و بهینه می‌کند
- معمولاً به صورت خودکار با Prisma Accelerate کار می‌کند
- برای دسترسی به dashboard و API features استفاده می‌شود

### مرحله 5: Redeploy

بعد از تنظیم همه Environment Variables:

1. به **Deployments** بروید
2. آخرین deployment را پیدا کنید
3. روی **...** (سه نقطه) کلیک کنید
4. **Redeploy** را انتخاب کنید
5. ✅ **Use existing Build Cache** را تیک بزنید
6. **Redeploy** را بزنید

---

## ✅ تست Environment Variables

### 1. تست Database Connection

بعد از deployment، به صفحه اصلی بروید و بررسی کنید:
- Services section لود می‌شود
- Portfolio section لود می‌شود
- هیچ خطای database در console نیست

### 2. تست Email System

**روش 1: استفاده از Test Endpoint**

```
https://www.ario-studio.net/api/test-email?to=your-email@example.com
```

**روش 2: تست Contact Form**

1. به صفحه اصلی بروید
2. فرم تماس را پر کنید
3. Submit کنید
4. بررسی کنید:
   - ✅ پیام موفقیت نمایش داده می‌شود
   - ✅ ایمیل به `CONTACT_TO_EMAIL` ارسال می‌شود
   - ✅ Auto-reply به ایمیل شما ارسال می‌شود

### 3. تست Language Detection

1. صفحه را در حالت Farsi باز کنید
2. بررسی کنید:
   - ✅ `lang="fa" dir="rtl"` در HTML است
   - ✅ همه متن‌ها فارسی هستند
   - ✅ ایمیل‌ها فارسی هستند

3. صفحه را در حالت English باز کنید
4. بررسی کنید:
   - ✅ `lang="en" dir="ltr"` در HTML است
   - ✅ همه متن‌ها انگلیسی هستند
   - ✅ ایمیل‌ها انگلیسی هستند

---

## 🔒 نکات امنیتی

### 1. هرگز Secret Keys را در کد commit نکنید

- ✅ از Environment Variables استفاده کنید
- ❌ هرگز در کد hardcode نکنید
- ❌ هرگز در GitHub commit نکنید

### 2. استفاده از Vercel Secrets (اختیاری)

برای متغیرهای حساس، می‌توانید از Vercel Secrets استفاده کنید:

1. به **Settings** → **Secrets** بروید
2. **Add Secret** را بزنید
3. Name و Value را وارد کنید
4. در Environment Variables، به جای Value، از `@secret-name` استفاده کنید

### 3. محدود کردن دسترسی

- فقط افراد مورد اعتماد به Vercel Dashboard دسترسی داشته باشند
- از 2FA (Two-Factor Authentication) استفاده کنید

---

## 🐛 Troubleshooting

### مشکل: Database Connection Failed

**راه‌حل:**
1. بررسی کنید `DATABASE_URL` درست است
2. بررسی کنید database از Vercel قابل دسترسی است
3. بررسی کنید SSL mode درست است (`?sslmode=require`)

### مشکل: Email ارسال نمی‌شود

**راه‌حل:**
1. بررسی کنید `BREVO_SMTP_USER` و `BREVO_SMTP_PASS` درست هستند
2. بررسی کنید `CONTACT_FROM_EMAIL` در Brevo verify شده است
3. از `/api/test-email` برای تست استفاده کنید
4. Vercel Function Logs را بررسی کنید

### مشکل: Language Detection کار نمی‌کند

**راه‌حل:**
1. بررسی کنید cookie `language` تنظیم می‌شود
2. بررسی کنید `getServerLang()` درست کار می‌کند
3. Browser cookies را clear کنید

### مشکل: Build Failed

**راه‌حل:**
1. بررسی کنید همه Environment Variables الزامی تنظیم شده‌اند
2. Build Logs را در Vercel بررسی کنید
3. بررسی کنید TypeScript errors ندارید

---

## 📝 Checklist نهایی

قبل از لانچ، این موارد را بررسی کنید:

- [ ] همه Environment Variables الزامی تنظیم شده‌اند
- [ ] `DATABASE_URL` درست است و database accessible است
- [ ] `BREVO_SMTP_USER` و `BREVO_SMTP_PASS` درست هستند
- [ ] `CONTACT_FROM_EMAIL` در Brevo verify شده است
- [ ] `NEXTAUTH_SECRET` تولید شده و تنظیم شده است
- [ ] `NEXTAUTH_URL` به دامنه production اشاره می‌کند
- [ ] `NEXT_PUBLIC_SITE_URL` به دامنه production اشاره می‌کند
- [ ] Test email ارسال می‌شود
- [ ] Contact form کار می‌کند
- [ ] Language detection کار می‌کند
- [ ] Database connection کار می‌کند

---

## 📞 پشتیبانی

اگر مشکلی دارید:
1. Vercel Function Logs را بررسی کنید
2. Browser Console را بررسی کنید
3. Network tab را بررسی کنید
4. `docs/DEPLOYMENT.md` را مطالعه کنید

---

**آخرین به‌روزرسانی:** 2024

