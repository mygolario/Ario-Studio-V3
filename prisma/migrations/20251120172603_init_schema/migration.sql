-- AlterTable
ALTER TABLE "content_translations" ADD COLUMN     "body_intro" TEXT,
ADD COLUMN     "body_problem" TEXT,
ADD COLUMN     "body_process" TEXT,
ADD COLUMN     "body_result" TEXT,
ADD COLUMN     "body_solution" TEXT,
ADD COLUMN     "featured_image" TEXT,
ADD COLUMN     "gallery_images" JSONB;

-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "category" TEXT,
ADD COLUMN     "layout_type" TEXT,
ADD COLUMN     "service_currency" TEXT,
ADD COLUMN     "service_duration" TEXT,
ADD COLUMN     "service_level" TEXT,
ADD COLUMN     "service_price_from" INTEGER,
ADD COLUMN     "tags" TEXT;

-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "business_type" TEXT,
ADD COLUMN     "website" TEXT;
