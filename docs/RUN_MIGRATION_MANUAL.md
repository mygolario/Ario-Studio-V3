# اجرای دستی Migration برای جدول contents

## مشکل

Database schema خالی نیست و Prisma نمی‌تواند migration را به صورت خودکار اجرا کند.

## راه حل: اجرای دستی SQL

### روش 1: از Neon Console (توصیه شده)

1. به [Neon Console](https://console.neon.tech) بروید
2. Database خود را انتخاب کنید
3. به **SQL Editor** بروید
4. SQL زیر را کپی و اجرا کنید:

```sql
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('portfolio', 'service', 'blog');

-- CreateEnum
CREATE TYPE "ContentLang" AS ENUM ('fa', 'en');

-- CreateTable
CREATE TABLE "contents" (
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

-- CreateTable
CREATE TABLE "content_translations" (
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
CREATE UNIQUE INDEX "contents_slug_key" ON "contents"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "content_translations_content_id_lang_key" ON "content_translations"("content_id", "lang");

-- AddForeignKey
ALTER TABLE "content_translations" ADD CONSTRAINT "content_translations_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

5. Execute کنید

### روش 2: Baseline Migration

اگر می‌خواهید Prisma migration history را درست کنید:

```bash
# Mark migration as applied without running it
npx prisma migrate resolve --applied 20251118231605_add_multilingual_content
```

اما اول باید tables را به صورت دستی ایجاد کنید (روش 1).

### روش 3: استفاده از psql

اگر `psql` نصب دارید:

```bash
psql "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" -f prisma/migrations/20251118231605_add_multilingual_content/migration.sql
```

## بعد از اجرای Migration

### 1. Seed Database

```bash
npx prisma db seed
```

### 2. Verify

بررسی کنید که:
- جدول `contents` ایجاد شده
- جدول `content_translations` ایجاد شده
- Indexes ایجاد شده‌اند
- Foreign keys درست هستند

### 3. Test

- صفحه اصلی را باز کنید
- Services section باید لود شود
- Portfolio section باید لود شود

---

**نکته:** بعد از اجرای دستی migration، Prisma migration history را baseline کنید تا در deployment بعدی مشکل نداشته باشید.

