# Multilingual Content System

This module provides a normalized, scalable approach to managing multilingual content (Portfolio, Services, Blog) with separate translation records for each language.

## Architecture

The system uses a normalized database structure:

- **Content**: Core content entity (language-agnostic metadata)
- **ContentTranslation**: Language-specific translations
- **LocalizedContent**: Combined view for frontend/API consumption

## Database Schema

```prisma
model Content {
  id          String               @id @default(cuid())
  type        ContentType          // portfolio | service | blog
  slug        String               @unique
  isPublished Boolean              @default(false)
  order       Int?
  featured    Boolean              @default(false)
  archived    Boolean              @default(false)
  translations ContentTranslation[]
}

model ContentTranslation {
  id             String    @id @default(cuid())
  contentId      String
  lang           ContentLang  // fa | en
  title          String
  excerpt        String?
  body           String?
  metaTitle      String?
  metaDescription String?
  subtitle       String?
  tags           String[]
  @@unique([contentId, lang])
}
```

## Usage

### Import Types

```typescript
import {
  ContentType,
  LocalizedContent,
  Content,
  ContentTranslation,
  mapToLocalizedContent,
} from '@/lib/content'
```

### Fetching Content with Translations

```typescript
import { prisma } from '@/lib/db'
import { mapToLocalizedContent } from '@/lib/content'

// Fetch content with translations
const content = await prisma.content.findUnique({
  where: { slug: 'ario-studio-case-study' },
  include: { translations: true },
})

// Map to localized view
const localized = mapToLocalizedContent(content, 'fa')
```

### Fallback Strategy

The `mapToLocalizedContent` function implements a smart fallback:

1. **Try requested language**: If translation for requested language exists, use it
2. **Fallback to English**: If requested language is not 'en' and English exists, use English
3. **Fallback to first available**: If neither exists, use the first available translation
4. **Return null**: If no translations exist, return null

### Creating Content

```typescript
import { prisma } from '@/lib/db'

const content = await prisma.content.create({
  data: {
    type: 'portfolio',
    slug: 'my-project',
    isPublished: true,
    featured: true,
    translations: {
      create: [
        {
          lang: 'en',
          title: 'My Project',
          excerpt: 'Project description',
          body: 'Full project content...',
        },
        {
          lang: 'fa',
          title: 'پروژه من',
          excerpt: 'توضیحات پروژه',
          body: 'محتوای کامل پروژه...',
        },
      ],
    },
  },
})
```

## Migration

To apply the new schema to your database:

```bash
npx prisma migrate dev --name add_multilingual_content
```

## Seed Data

Seed data includes sample content for:
- Portfolio: Ario Studio case study (EN/FA)
- Services: Cinematic Web Experiences, AI-Powered Automation (EN/FA)
- Blog: Introduction to Cinematic UX (EN/FA, draft)

Run seed:

```bash
npx prisma db seed
```

## Future API Routes

In future phases, we'll add:

- `GET /api/content/:slug?lang=fa` - Get content by slug
- `GET /api/portfolio?lang=fa` - List portfolio items
- `GET /api/services?lang=fa` - List services
- `GET /api/blog?lang=fa` - List blog posts

These routes will use `getRequestLang` from `@/lib/i18n` to detect language and return localized content.

