# راهنمای سریع: اجرای Migration برای جدول contents

## مشکل

خطا در build:
```
The table `public.contents` does not exist in the current database.
```

## راه حل سریع

### روش 1: از Neon Console (ساده‌ترین روش)

1. به [Neon Console](https://console.neon.tech) بروید
2. Database خود را انتخاب کنید (`neondb`)
3. به **SQL Editor** بروید
4. SQL زیر را کپی و **Execute** کنید:

```sql
-- CreateEnum
DO $$ BEGIN
    CREATE TYPE "ContentType" AS ENUM ('portfolio', 'service', 'blog');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "ContentLang" AS ENUM ('fa', 'en');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- CreateTable: contents
CREATE TABLE IF NOT EXISTS "contents" (
    "id" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "slug" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable: content_translations
CREATE TABLE IF NOT EXISTS "content_translations" (
    "id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "lang" "ContentLang" NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "body" TEXT,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "subtitle" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "content_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "contents_slug_key" ON "contents"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "content_translations_content_id_lang_key" ON "content_translations"("content_id", "lang");

-- AddForeignKey
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'content_translations_content_id_fkey'
    ) THEN
        ALTER TABLE "content_translations" 
        ADD CONSTRAINT "content_translations_content_id_fkey" 
        FOREIGN KEY ("content_id") 
        REFERENCES "contents"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE;
    END IF;
END $$;
```

5. بررسی کنید که **Success** نمایش داده می‌شود

### روش 2: استفاده از فایل SQL

فایل `prisma/migrations/20251118231605_add_multilingual_content/migration-contents-only.sql` را در Neon Console اجرا کنید.

## بعد از اجرای Migration

### 1. Seed Database

در Neon Console، این SQL را اجرا کنید:

```sql
-- یا از Terminal:
-- npx prisma db seed
```

یا می‌توانید seed را بعداً از طریق admin panel انجام دهید.

### 2. Baseline Migration History

برای اینکه Prisma بداند migration اجرا شده:

```bash
npx prisma migrate resolve --applied 20251118231605_add_multilingual_content
```

**نکته:** این دستور را فقط بعد از اجرای دستی SQL اجرا کنید.

### 3. Verify

1. در Neon Console، بررسی کنید:
   - جدول `contents` وجود دارد
   - جدول `content_translations` وجود دارد
   - Enum types `ContentType` و `ContentLang` وجود دارند

2. در Vercel:
   - یک deployment جدید trigger کنید
   - بررسی کنید که build موفق می‌شود
   - صفحه اصلی را باز کنید و بررسی کنید Services/Portfolio لود می‌شوند

## Checklist

- [ ] SQL در Neon Console اجرا شده
- [ ] جدول `contents` ایجاد شده
- [ ] جدول `content_translations` ایجاد شده
- [ ] Indexes ایجاد شده‌اند
- [ ] Foreign key ایجاد شده است
- [ ] Migration history baseline شده (اختیاری)
- [ ] Build در Vercel موفق می‌شود
- [ ] Services/Portfolio sections لود می‌شوند

---

**نکته:** بعد از اجرای دستی migration، در deployment بعدی، `prisma migrate deploy` خطا نمی‌دهد چون tables وجود دارند.

