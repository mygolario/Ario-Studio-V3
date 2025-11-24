# راهنمای راه‌اندازی محتوای Sanity

این راهنما به شما کمک می‌کند محتوای اولیه را در Sanity Studio ایجاد کنید.

## روش 1: ایجاد دستی در Sanity Studio (توصیه می‌شود)

### مرحله 1: باز کردن Sanity Studio
1. به `https://ario.sanity.studio/` بروید
2. یا بعد از deploy شدن در Vercel، به `https://www.ariostudio.net/studio` بروید

### مرحله 2: ایجاد Home Page
1. از منوی سمت چپ "Home Page" را انتخاب کنید
2. دکمه "New document" را بزنید
3. محتوا را بر اساس فایل `scripts/sanity-import-data.json` وارد کنید

### مرحله 3: ایجاد Projects
1. "Project" را از منوی سمت چپ انتخاب کنید
2. برای هر پروژه (Chromore, Gareos, Movtreh, Fueltec) یک سند جدید ایجاد کنید

### مرحله 4: ایجاد Services
1. "Service" را از منوی سمت چپ انتخاب کنید
2. سرویس‌ها را ایجاد کنید

## روش 2: استفاده از API (نیاز به Write Token)

اگر یک API token با دسترسی write دارید، می‌توانید از script زیر استفاده کنید:

```bash
npm run seed:sanity
```

**نکته:** برای استفاده از این روش، باید `SANITY_API_TOKEN` در `.env.local` یک token با دسترسی write باشد.

