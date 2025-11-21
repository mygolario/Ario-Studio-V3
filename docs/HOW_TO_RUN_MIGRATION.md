# چگونه Migration را اجرا کنیم؟

## 🎯 روش 1: Neon Console (ساده‌ترین - بدون نصب) ⭐

### مراحل:

1. **باز کردن Neon Console:**
   - به این آدرس بروید: https://console.neon.tech
   - وارد حساب کاربری خود شوید

2. **انتخاب Database:**
   - Project خود را انتخاب کنید
   - Database `neondb` را انتخاب کنید

3. **باز کردن SQL Editor:**
   - در منوی سمت چپ، روی **"SQL Editor"** کلیک کنید
   - یا از منوی بالا **"SQL Editor"** را انتخاب کنید

4. **کپی و اجرای SQL:**
   
   فایل `prisma/migrations/20251118231605_add_multilingual_content/migration-contents-only.sql` را باز کنید و تمام محتوای آن را کپی کنید.
   
   سپس در SQL Editor:
   - SQL را paste کنید
   - روی دکمه **"Run"** یا **"Execute"** کلیک کنید
   - منتظر بمانید تا اجرا شود

5. **بررسی نتیجه:**
   - باید پیام **"Success"** یا **"Query executed successfully"** ببینید
   - اگر خطا داد، پیام خطا را بخوانید

---

## 🔧 روش 2: نصب psql و اجرا از Terminal

### نصب psql در Windows:

**گزینه A: از PostgreSQL Installer**
1. به https://www.postgresql.org/download/windows/ بروید
2. PostgreSQL را دانلود و نصب کنید
3. در حین نصب، **Command Line Tools** را انتخاب کنید

**گزینه B: از Chocolatey (اگر دارید):**
```powershell
choco install postgresql
```

### بعد از نصب:

در PowerShell یا Command Prompt:

```powershell
# اجرای migration از فایل
psql "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" -f "prisma\migrations\20251118231605_add_multilingual_content\migration-contents-only.sql"
```

**نکته:** مسیر فایل باید کامل باشد. اگر در دایرکتوری پروژه هستید:

```powershell
cd C:\Users\Ario\Desktop\Ario-Studio-V3
psql "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" -f "prisma\migrations\20251118231605_add_multilingual_content\migration-contents-only.sql"
```

---

## 📋 SQL که باید اجرا کنید:

اگر از Neon Console استفاده می‌کنید، این SQL را کپی کنید:

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

---

## ✅ بعد از اجرای Migration

### 1. Seed Database:

```powershell
$env:DATABASE_URL="postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"; npx prisma db seed
```

### 2. Verify:

در Neon Console → SQL Editor، این query را اجرا کنید:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('contents', 'content_translations');
```

باید هر دو جدول را ببینید.

---

## 🎯 توصیه

**بهترین روش:** استفاده از **Neon Console** چون:
- ✅ نیاز به نصب ندارد
- ✅ Interface ساده و واضح است
- ✅ Error messages واضح است
- ✅ می‌توانید نتیجه را فوراً ببینید

**مراحل:**
1. https://console.neon.tech → Login
2. Database `neondb` را انتخاب کنید
3. SQL Editor را باز کنید
4. SQL بالا را paste و Run کنید
5. Done! ✅

---

**نکته:** بعد از اجرای migration، deployment بعدی در Vercel باید موفق شود.

