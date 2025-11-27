# راهنمای استقرار Sanity Studio

## مشکل
خطای "sanity.studio domains must be created as 'internal'" به این معنی است که:
- نمی‌توانید دامنه‌های `sanity.studio` را از طریق دکمه "Add studio" در داشبورد اضافه کنید
- این دامنه‌ها باید از طریق CLI به عنوان "internal" studio ایجاد شوند
- دکمه "Add studio" فقط برای استودیوهای custom-hosted (دامنه‌های خودتان) است

## راه حل

### روش 1: استفاده از CLI (پیشنهادی)

فایل `DEPLOY-SIMPLE.bat` را اجرا کنید یا این دستور را در ترمینال اجرا کنید:

```bash
npx sanity deploy --host ariostudio
```

این دستور:
1. یک پنجره مرورگر برای احراز هویت باز می‌کند (فقط یک بار)
2. استودیو را در `https://ariostudio.sanity.studio` استقرار می‌دهد

### روش 2: استفاده از Deploy Token

اگر می‌خواهید بدون احراز هویت تعاملی استقرار دهید:

1. به داشبورد Sanity بروید: https://www.sanity.io/manage
2. پروژه `ArioStudio` را انتخاب کنید
3. به بخش Settings یا API بروید
4. یک Deploy Token ایجاد کنید
5. از آن token به عنوان `SANITY_AUTH_TOKEN` استفاده کنید

## وضعیت فعلی

✅ همه فایل‌های کانفیگ به‌روزرسانی شده‌اند:
- `sanity.config.ts` - Project ID: `dgwzv4lg`
- `sanity.cli.ts` - Hostname: `ariostudio`
- `.env.local` - API Token تنظیم شده

✅ استودیو آماده استقرار است

⚠️ فقط احراز هویت تعاملی باقی مانده است

## دستور نهایی

```bash
npx sanity deploy --host ariostudio
```

بعد از اجرا، استودیو در داشبورد شما در بخش Studios ظاهر می‌شود.

