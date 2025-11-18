# Migration Guide: Multilingual Content System

This guide explains how to apply the new multilingual content system to your database.

## Prerequisites

- PostgreSQL database running
- Prisma CLI installed (`npm install -g prisma` or use `npx prisma`)

## Step 1: Review Schema Changes

The new schema adds:
- `Content` model (core content entity)
- `ContentTranslation` model (language-specific translations)
- `ContentType` enum (portfolio, service, blog)
- `ContentLang` enum (fa, en)

## Step 2: Create Migration

Run the following command to create a migration:

```bash
npx prisma migrate dev --name add_multilingual_content
```

This will:
1. Create a new migration file in `prisma/migrations/`
2. Apply the migration to your database
3. Regenerate Prisma Client

## Step 3: Seed Sample Data (Optional)

To populate the database with sample multilingual content:

```bash
npx prisma db seed
```

This creates:
- 1 Portfolio content (Ario Studio case study) with EN/FA translations
- 2 Service contents (Cinematic Web Experiences, AI-Powered Automation) with EN/FA translations
- 1 Blog content (Introduction to Cinematic UX) with EN/FA translations (draft)

## Step 4: Verify Migration

Check that the tables were created:

```bash
npx prisma studio
```

You should see:
- `contents` table
- `content_translations` table

## Rollback (if needed)

If you need to rollback the migration:

```bash
npx prisma migrate resolve --rolled-back add_multilingual_content
npx prisma migrate reset  # WARNING: This will delete all data
```

## Production Migration

For production environments:

```bash
# 1. Create migration (without applying)
npx prisma migrate dev --create-only --name add_multilingual_content

# 2. Review the migration SQL in prisma/migrations/

# 3. Apply to production
npx prisma migrate deploy
```

## Next Steps

After migration:
1. Use the content types from `@/lib/content`
2. Use `mapToLocalizedContent` to get localized views
3. Build API routes that use `getRequestLang` from `@/lib/i18n`

