# مراحل اجرای Migration - راهنمای کامل

## روش 1: استفاده از Neon Console (ساده‌ترین - توصیه شده) ⭐

### مراحل:

1. **ورود به Neon Console:**
   - به [https://console.neon.tech](https://console.neon.tech) بروید
   - وارد حساب کاربری خود شوید

2. **انتخاب Database:**
   - از لیست projects، project خود را انتخاب کنید
   - Database `neondb` را انتخاب کنید

3. **باز کردن SQL Editor:**
   - در سمت چپ، روی **SQL Editor** کلیک کنید
   - یا از منوی بالا **SQL Editor** را انتخاب کنید

4. **کپی و اجرای SQL:**
   - فایل `prisma/migrations/20251118231605_add_multilingual_content/migration-contents-only.sql` را باز کنید
   - تمام محتوای آن را کپی کنید
   - در SQL Editor، paste کنید
   - روی دکمه **Run** یا **Execute** کلیک کنید

5. **بررسی نتیجه:**
   - باید پیام **Success** یا **Query executed successfully** نمایش داده شود
   - اگر خطا داد، پیام خطا را بررسی کنید

---

## روش 2: استفاده از psql (اگر نصب دارید)

### نصب psql (اگر ندارید):

**Windows:**
- PostgreSQL را از [postgresql.org](https://www.postgresql.org/download/windows/) دانلود و نصب کنید
- یا از Chocolatey: `choco install postgresql`

**Mac:**
```bash
brew install postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql-client
```

### اجرای Migration:

**در PowerShell یا Terminal:**

```powershell
# روش 1: اجرای مستقیم SQL
psql "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" -f "prisma/migrations/20251118231605_add_multilingual_content/migration-contents-only.sql"
```

**یا:**

```powershell
# روش 2: اتصال و اجرای دستی
psql "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"
```

بعد از اتصال، SQL را خط به خط اجرا کنید یا از `\i` استفاده کنید:

```sql
\i prisma/migrations/20251118231605_add_multilingual_content/migration-contents-only.sql
```

---

## روش 3: استفاده از Prisma Studio (برای بررسی)

بعد از اجرای migration، می‌توانید از Prisma Studio برای بررسی استفاده کنید:

```bash
$env:DATABASE_URL="postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"; npx prisma studio
```

---

## روش 4: استفاده از DBeaver یا pgAdmin

1. **DBeaver:**
   - DBeaver را باز کنید
   - New Database Connection → PostgreSQL
   - Connection string را وارد کنید
   - Connect
   - SQL Editor را باز کنید
   - فایل SQL را اجرا کنید

2. **pgAdmin:**
   - pgAdmin را باز کنید
   - Server را اضافه کنید
   - Connection string را وارد کنید
   - Query Tool را باز کنید
   - فایل SQL را اجرا کنید

---

## بعد از اجرای Migration

### 1. Seed Database:

```powershell
$env:DATABASE_URL="postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"; npx prisma db seed
```

### 2. Baseline Migration (اختیاری):

```powershell
$env:DATABASE_URL="postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"; npx prisma migrate resolve --applied 20251118231605_add_multilingual_content
```

### 3. Verify:

در Neon Console یا Prisma Studio بررسی کنید:
- ✅ جدول `contents` وجود دارد
- ✅ جدول `content_translations` وجود دارد
- ✅ Enum types `ContentType` و `ContentLang` وجود دارند

---

## Troubleshooting

### اگر psql پیدا نشد:

**Windows:**
```powershell
# بررسی کنید PostgreSQL نصب است
where.exe psql

# اگر نصب نیست، از Neon Console استفاده کنید (روش 1)
```

### اگر Connection Failed:

- بررسی کنید connection string درست است
- بررسی کنید `sslmode=require` است
- بررسی کنید database accessible است

### اگر Table Already Exists:

- این طبیعی است اگر قبلاً اجرا کرده‌اید
- SQL script از `IF NOT EXISTS` استفاده می‌کند، پس خطا نمی‌دهد

---

## توصیه

**بهترین روش:** استفاده از **Neon Console** (روش 1) چون:
- ✅ نیاز به نصب چیزی ندارد
- ✅ Interface ساده دارد
- ✅ Error messages واضح است
- ✅ می‌توانید نتیجه را فوراً ببینید

---

**نکته:** بعد از اجرای migration، deployment بعدی در Vercel باید موفق شود.

