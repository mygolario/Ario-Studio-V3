# حل مشکل Missing Table `contents` در Production

## مشکل

در build production، خطای زیر رخ می‌دهد:

```
The table `public.contents` does not exist in the current database.
```

## علت

Migrations در production اجرا نشده‌اند. جدول `contents` و `content_translations` هنوز در دیتابیس ایجاد نشده‌اند.

## راه حل

### روش 1: اجرای خودکار در Build (توصیه شده)

Build command به‌روزرسانی شده است تا migrations را به صورت خودکار اجرا کند:

```json
"build": "prisma generate && prisma migrate deploy && next build"
```

این کار به صورت خودکار در هر deployment انجام می‌شود.

### روش 2: اجرای دستی Migrations

اگر می‌خواهید migrations را به صورت دستی اجرا کنید:

#### از Vercel CLI (اگر نصب شده):

```bash
# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
```

#### از Neon Console:

1. به [Neon Console](https://console.neon.tech) بروید
2. Database خود را انتخاب کنید
3. به **SQL Editor** بروید
4. محتوای فایل `prisma/migrations/20251118231605_add_multilingual_content/migration.sql` را کپی کنید
5. Execute کنید

#### از pgAdmin یا DBeaver:

1. به دیتابیس متصل شوید
2. فایل `prisma/migrations/20251118231605_add_multilingual_content/migration.sql` را اجرا کنید

### روش 3: استفاده از Vercel Post Build Command

اگر نمی‌خواهید migrations را در build command داشته باشید، می‌توانید از Vercel Post Build Command استفاده کنید:

1. در Vercel Dashboard → Settings → Build & Development Settings
2. **Post Build Command** را اضافه کنید:
   ```
   npx prisma migrate deploy
   ```

## بعد از اجرای Migrations

### 1. Seed Database (اختیاری)

برای اضافه کردن داده‌های اولیه:

```bash
npx prisma db seed
```

یا در Vercel، یک Post Build Command اضافه کنید:
```
npx prisma db seed
```

### 2. Verify

بعد از deployment:

1. به صفحه اصلی بروید
2. بررسی کنید Services section لود می‌شود
3. بررسی کنید Portfolio section لود می‌شود
4. بررسی کنید sitemap.xml کار می‌کند

## Checklist

- [ ] Migrations اجرا شده (`prisma migrate deploy`)
- [ ] Seed اجرا شده (اگر نیاز است)
- [ ] Build موفق می‌شود
- [ ] Services section داده نمایش می‌دهد
- [ ] Portfolio section داده نمایش می‌دهد
- [ ] Sitemap.xml کار می‌کند

## Troubleshooting

### اگر Migration Fail شد:

1. بررسی کنید `DATABASE_URL` درست است
2. بررسی کنید database accessible است
3. بررسی کنید SSL mode درست است (`?sslmode=require`)
4. Migration logs را بررسی کنید

### اگر Build Fail شد:

1. بررسی کنید Prisma Client generate می‌شود
2. بررسی کنید migrations اجرا می‌شوند
3. Build logs را در Vercel بررسی کنید

---

**نکته:** بعد از اولین migration، build command به صورت خودکار migrations را در هر deployment اجرا می‌کند.

