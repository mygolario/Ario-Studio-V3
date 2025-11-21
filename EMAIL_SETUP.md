# راهنمای تنظیم و تست ایمیل

## تغییرات انجام شده

### 1. پشتیبانی از چند ایمیل ادمین
تابع `sendLeadNotificationEmail` حالا از چند ایمیل ادمین پشتیبانی می‌کند (جدا شده با کاما).

**مثال:**
```bash
ADMIN_EMAIL="kavehtkts@gmail.com"
# یا برای چند ایمیل:
ADMIN_EMAIL="kavehtkts@gmail.com,email2@gmail.com"
```

### 2. استفاده از فرستنده پیش‌فرض Resend
- از `onboarding@resend.dev` به عنوان فرستنده پیش‌فرض استفاده می‌شود
- نیازی به verify کردن دامنه سفارشی نیست

### 3. Endpoint تست ایمیل
یک endpoint برای تست ارسال ایمیل اضافه شده است.

## تنظیمات Environment Variables

در فایل `.env.local` یا `.env` این متغیرها را تنظیم کنید:

```bash
# الزامی - API Key از Resend Dashboard
RESEND_API_KEY="re_xxxxxxxxxxxxx"

# اختیاری - اگر می‌خواهید notification به ادمین ارسال شود
# می‌توانید چند ایمیل را با کاما جدا کنید
ADMIN_EMAIL="kavehtkts@gmail.com,ariokaveh85@gmail.com"

# اختیاری - اگر می‌خواهید فرستنده را تغییر دهید
ARIO_STUDIO_FROM_EMAIL="Ario Studio <onboarding@resend.dev>"
# یا
EMAIL_FROM="onboarding@resend.dev"
```

**نکته مهم:** 
- `RESEND_API_KEY` **الزامی** است
- `ADMIN_EMAIL` **اختیاری** است - اگر تنظیم نشود، فقط auto-reply به کاربر ارسال می‌شود
- اگر `ADMIN_EMAIL` تنظیم نشود، notification به ادمین ارسال نمی‌شود (اما فرم submission موفق می‌شود)

## تست ارسال ایمیل

### روش 1: استفاده از API Endpoint

بعد از راه‌اندازی سرور (`npm run dev`)، این URL را در مرورگر باز کنید:

```
http://localhost:3000/api/test-email?to=kavehtkts@gmail.com
```

یا برای تست به چند ایمیل:
```
http://localhost:3000/api/test-email?to=ariokaveh85@gmail.com
```

### روش 2: استفاده از curl

```bash
curl "http://localhost:3000/api/test-email?to=kavehtkts@gmail.com"
```

### پاسخ موفق:
```json
{
  "success": true,
  "message": "Test email sent successfully",
  "result": { ... },
  "config": {
    "fromEmail": "onboarding@resend.dev",
    "toEmail": "kavehtkts@gmail.com",
    "hasApiKey": true
  }
}
```

### پاسخ خطا:
```json
{
  "success": false,
  "error": "Error message here",
  "details": { ... },
  "config": {
    "hasApiKey": true,
    "fromEmail": "onboarding@resend.dev"
  }
}
```

## بررسی مشکلات احتمالی

### 1. ایمیل ارسال نمی‌شود

**بررسی کنید:**
- ✅ `RESEND_API_KEY` در `.env.local` تنظیم شده است (الزامی)
- ✅ API Key معتبر است (از dashboard Resend کپی شده)
- ✅ `ADMIN_EMAIL` تنظیم شده است (اختیاری - فقط برای notification به ادمین)
- ✅ سرور در حال اجرا است (`npm run dev`)

**لاگ‌های کنسول را بررسی کنید:**
- در ترمینال سرور، پیام‌های `[TEST EMAIL]` یا `Attempting to send` را ببینید
- اگر خطایی وجود دارد، در کنسول نمایش داده می‌شود

### 2. خطای "RESEND_API_KEY is not configured"

**راه حل:**
1. فایل `.env.local` را در root پروژه ایجاد کنید
2. `RESEND_API_KEY` را اضافه کنید (الزامی)
3. سرور را restart کنید

**نکته:** `ADMIN_EMAIL` اختیاری است - اگر تنظیم نشود، فقط auto-reply به کاربر ارسال می‌شود

### 3. خطای "Invalid sender"

**راه حل:**
- از `onboarding@resend.dev` استفاده کنید (پیش‌فرض)
- یا یک دامنه را در Resend verify کنید

### 4. ایمیل به inbox نمی‌رسد

**بررسی کنید:**
- ایمیل در Spam/Junk folder نیست؟
- آدرس ایمیل درست است؟
- API Key محدودیت rate limit ندارد؟

## نحوه کار

### هنگام ارسال فرم:
1. **ایمیل به کاربر** (Auto-reply): همیشه به آدرس ایمیل وارد شده در فرم ارسال می‌شود (اگر `RESEND_API_KEY` تنظیم شده باشد)
2. **ایمیل به ادمین**: فقط اگر `ADMIN_EMAIL` تنظیم شده باشد، به تمام ایمیل‌های موجود در `ADMIN_EMAIL` ارسال می‌شود

### مثال:
اگر `ADMIN_EMAIL="kavehtkts@gmail.com,ariokaveh85@gmail.com"` باشد:
- هر دو ایمیل یک کپی از notification را دریافت می‌کنند
- هر دو می‌توانند با استفاده از `replyTo` مستقیماً به کاربر پاسخ دهند

## نکات مهم

1. **فرستنده (from)**: همیشه `onboarding@resend.dev` است (یا از env) - از Resend default استفاده می‌شود
2. **گیرنده (to)**: 
   - برای کاربر = ایمیل وارد شده در فرم (همیشه ارسال می‌شود اگر `RESEND_API_KEY` تنظیم شده باشد)
   - برای ادمین = `ADMIN_EMAIL` (فقط اگر تنظیم شده باشد)
3. **replyTo**: برای ادمین = ایمیل کاربر (می‌توانند مستقیماً پاسخ دهند)
4. **خطاها**: اگر ارسال ایمیل fail شود، فرم submission موفق می‌شود (graceful degradation)
5. **ADMIN_EMAIL اختیاری است**: اگر تنظیم نشود، فقط auto-reply به کاربر ارسال می‌شود

## تست نهایی

1. سرور را راه‌اندازی کنید: `npm run dev`
2. یک فرم را submit کنید
3. بررسی کنید که:
   - ایمیل به کاربر ارسال شده است
   - ایمیل به تمام ادمین‌ها ارسال شده است
4. اگر مشکلی بود، از endpoint تست استفاده کنید

