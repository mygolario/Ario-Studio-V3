-- Migration: Add multilingual content tables (contents and content_translations only)
-- This script only creates the new tables, assuming other tables already exist

-- CreateEnum (only if not exists)
DO $$ BEGIN
    CREATE TYPE "ContentType" AS ENUM ('portfolio', 'service', 'blog');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- CreateEnum (only if not exists)
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

-- CreateIndex: contents slug (only if not exists)
CREATE UNIQUE INDEX IF NOT EXISTS "contents_slug_key" ON "contents"("slug");

-- CreateIndex: content_translations unique constraint (only if not exists)
CREATE UNIQUE INDEX IF NOT EXISTS "content_translations_content_id_lang_key" ON "content_translations"("content_id", "lang");

-- AddForeignKey: content_translations -> contents (only if not exists)
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

