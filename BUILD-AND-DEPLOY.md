# راهنمای Build و Deploy استودیو

## وضعیت فعلی

✅ استودیو در Sanity ایجاد شده: `www.ariostudio.net`  
✅ CORS origin اضافه شده: `https://www.ariostudio.net`  
✅ همه فایل‌های کانفیگ آماده هستند

## مراحل Build و Deploy

### 1. Build کردن استودیو

در ترمینال، این دستور را اجرا کنید:

```bash
npx sanity build
```

این دستور:
- فایل‌های استودیو را build می‌کند
- فایل‌های static را در پوشه `dist/` ایجاد می‌کند

### 2. بررسی فایل‌های Build شده

بعد از build، پوشه `dist/` باید ایجاد شود که شامل:
- `index.html`
- فایل‌های JavaScript و CSS
- سایر فایل‌های static

### 3. Deploy کردن روی `www.ariostudio.net`

#### روش 1: استفاده از Vercel

1. فایل‌های پوشه `dist/` را به یک repository در GitHub push کنید
2. در Vercel، پروژه جدید ایجاد کنید
3. Repository را connect کنید
4. Build Command: (خالی بگذارید - فایل‌ها از قبل build شده‌اند)
5. Output Directory: `dist`
6. Domain را به `www.ariostudio.net` تنظیم کنید

#### روش 2: استفاده از Netlify

1. فایل‌های پوشه `dist/` را به یک repository در GitHub push کنید
2. در Netlify، پروژه جدید ایجاد کنید
3. Repository را connect کنید
4. Build command: (خالی)
5. Publish directory: `dist`
6. Domain را به `www.ariostudio.net` تنظیم کنید

#### روش 3: استفاده از سرور خودتان

1. فایل‌های پوشه `dist/` را روی سرور خودتان آپلود کنید
2. مطمئن شوید که server برای SPA routing تنظیم شده است
3. همه route‌ها باید به `index.html` redirect شوند

## نکات مهم

- ✅ CORS origin قبلاً اضافه شده است
- ✅ استودیو می‌تواند به Sanity API متصل شود
- ⚠️ بعد از deploy، استودیو در `https://www.ariostudio.net` در دسترس خواهد بود

## دستورات سریع

```bash
# Build
npx sanity build

# بررسی فایل‌ها
ls dist/

# Deploy (اگر از Vercel CLI استفاده می‌کنید)
vercel --prod
```

## نتیجه

بعد از deploy، می‌توانید:
- به `https://www.ariostudio.net` بروید
- وارد استودیو شوید
- محتوای وب‌سایت را ویرایش کنید

