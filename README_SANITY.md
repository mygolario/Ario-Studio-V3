# Sanity CMS Integration Guide

This document provides instructions for working with Sanity CMS in the Ario Studio V3 project.

## Table of Contents

- [Running Sanity Studio Locally](#running-sanity-studio-locally)
- [Creating Content](#creating-content)
- [Environment Variables](#environment-variables)
- [Preview/Draft Mode](#previewdraft-mode)
- [Project Information](#project-information)
- [Troubleshooting](#troubleshooting)

## Running Sanity Studio Locally

The Sanity Studio is embedded in the Next.js application and accessible at `/studio` when running the development server.

### Steps

1. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```

2. **Open Sanity Studio:**
   - Navigate to `http://localhost:3000/studio` in your browser
   - You'll see the Sanity Studio interface with all content types

3. **Authentication:**
   - If this is your first time, you'll need to authenticate with Sanity
   - Follow the prompts to log in with your Sanity account

### Alternative: Standalone Studio (Optional)

If you prefer to run Studio separately, you can use:

```bash
npx sanity dev
```

This will start Studio on a different port (typically `http://localhost:3333`).

## Creating Content

### Content Types Available

1. **Site Settings** (Singleton - only one document)
   - Site title, tagline, description
   - Contact information (email, WhatsApp)
   - Social media links
   - Hero section content

2. **Projects** (Case Studies)
   - Title, slug, thumbnail image
   - Client name, industry
   - Problem, Solution, Result (rich text)
   - Live URL, order rank

3. **Blog Posts**
   - Title, slug, excerpt
   - Cover image, content (rich text)
   - Published date, tags, categories
   - Author information

4. **Services**
   - Title, slug, short description
   - Full description (rich text)
   - Tier (Starter/Growth/Elite)
   - Price from, delivery time
   - Featured flag, order rank

5. **Testimonials**
   - Client name, role/company
   - Quote, avatar image
   - Optional project reference

### How to Create New Content

#### Creating a New Project

1. Go to `/studio` → Click **"Projects"** in the sidebar
2. Click **"Create new"** button
3. Fill in the required fields:
   - **Title**: Project name
   - **Slug**: Auto-generated from title (or customize)
   - **Thumbnail**: Upload an image
   - **Client Name**: Name of the client
   - **Industry**: e.g., "Fintech", "Healthcare"
   - **Summary**: Brief overview
   - **Problem**: The challenge (rich text)
   - **Solution**: How it was solved (rich text)
   - **Result**: Outcomes (rich text)
   - **Live URL**: Link to live project (optional)
   - **Order Rank**: Number for sorting (lower = appears first)
4. Click **"Publish"** to make it live

#### Creating a New Blog Post

1. Go to `/studio` → Click **"Blog Posts"** in the sidebar
2. Click **"Create new"** button
3. Fill in the required fields:
   - **Title**: Post title
   - **Slug**: Auto-generated from title
   - **Excerpt**: Short summary
   - **Cover Image**: Upload image
   - **Content**: Main post content (rich text)
   - **Published At**: Publication date
   - **Tags**: Array of tags
   - **Author**: Author name (optional)
4. Click **"Publish"** to make it live

#### Creating a New Service

1. Go to `/studio` → Click **"Services"** in the sidebar
2. Click **"Create new"** button
3. Fill in the required fields:
   - **Title**: Service name
   - **Slug**: Auto-generated from title
   - **Short Description**: Brief summary
   - **Description**: Full description (rich text)
   - **Tier**: Select Starter, Growth, or Elite
   - **Price From**: Starting price (optional)
   - **Delivery Time**: e.g., "2-4 weeks"
   - **Is Featured**: Toggle to feature on homepage
   - **Order Rank**: Number for sorting
4. Click **"Publish"** to make it live

#### Creating a New Testimonial

1. Go to `/studio` → Click **"Testimonials"** in the sidebar
2. Click **"Create new"** button
3. Fill in the required fields:
   - **Client Name**: Name of the client
   - **Role or Company**: e.g., "CEO of Acme Corp"
   - **Quote**: The testimonial text
   - **Avatar**: Client photo (optional)
   - **Related Project**: Link to a project (optional)
4. Click **"Publish"** to make it live

#### Updating Site Settings

1. Go to `/studio` → Click **"Site Settings"** in the sidebar
2. Update any fields:
   - Site title, tagline, description
   - Contact information
   - Social links
   - Hero section content
3. Click **"Publish"** to save changes

## Environment Variables

### Required Variables

Add these to your `.env.local` file:

```env
# Sanity Project Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity API Token (for authenticated requests and preview)
SANITY_API_READ_TOKEN=your-read-token

# Preview/Draft Mode Secret
SANITY_PREVIEW_SECRET=your-random-secret-string

# Site URL (for preview links)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# For production: NEXT_PUBLIC_SITE_URL=https://www.ariostudio.net
```

### Getting Your Sanity Credentials

1. **Project ID and Dataset:**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Project ID is visible in the project settings
   - Dataset is typically `production` or `development`

2. **API Read Token:**
   - In your Sanity project dashboard
   - Go to **API** → **Tokens**
   - Create a new token with **Read** permissions
   - Copy the token value

3. **Preview Secret:**
   - Generate a random string (e.g., using `openssl rand -base64 32`)
   - This should be kept secret and not committed to version control
   - Used to secure the preview/draft mode endpoint

## Preview/Draft Mode

### How It Works

Draft mode allows you to preview unpublished content from Sanity Studio directly on your Next.js site.

### Enabling Preview

1. **From Sanity Studio:**
   - Open any document (project or blog post)
   - Click **"Open Preview"** button (if configured)
   - This will open the preview URL with draft mode enabled

2. **Manual Preview URL:**
   ```
   /api/draft?secret=YOUR_SECRET&slug=my-project&type=project
   ```

### Preview Features

- ✅ Real-time updates as you edit in Studio
- ✅ Visual indicator showing you're in draft mode
- ✅ Works for both blog posts and projects
- ✅ Secure with secret token validation

### Disabling Preview

Visit `/api/disable-draft` to exit draft mode, or simply close the preview tab.

## Project Information

### Sanity Project Details

- **Project Name**: Ario Studio CMS
- **Project ID**: See `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- **Dataset**: See `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`
- **Studio URL**: `/studio` (embedded) or `https://your-project.sanity.studio`

### Sanity Dashboard

- **Manage Project**: [sanity.io/manage](https://sanity.io/manage)
- **API Documentation**: [sanity.io/docs](https://sanity.io/docs)
- **GROQ Query Language**: [sanity.io/docs/groq](https://sanity.io/docs/groq)

### Content Structure

All content schemas are defined in:
- `sanity/schemaTypes/` - Individual schema definitions
- `sanity/schemaTypes/index.ts` - Schema exports

Query helpers are in:
- `sanity/queries.ts` - GROQ queries for fetching content

## Troubleshooting

### Studio Not Loading

1. **Check environment variables:**
   ```bash
   # Verify .env.local has all required variables
   cat .env.local
   ```

2. **Check Sanity credentials:**
   - Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
   - Verify `NEXT_PUBLIC_SANITY_DATASET` matches your dataset name

3. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

### Preview Not Working

1. **Check preview secret:**
   - Ensure `SANITY_PREVIEW_SECRET` matches in both `.env.local` and Sanity Studio config
   - Verify the secret is included in the preview URL

2. **Check API token:**
   - Ensure `SANITY_API_READ_TOKEN` is valid and has read permissions
   - Token should not be expired

3. **Check site URL:**
   - Verify `NEXT_PUBLIC_SITE_URL` is correct
   - For local development: `http://localhost:3000`
   - For production: your actual domain

### Content Not Appearing

1. **Check if content is published:**
   - In Sanity Studio, ensure documents are in "Published" state
   - Draft content only appears in preview mode

2. **Check GROQ queries:**
   - Verify queries in `sanity/queries.ts` match your schema
   - Check browser console for query errors

3. **Rebuild the site:**
   ```bash
   npm run build
   ```

### Build Errors

1. **Type errors:**
   ```bash
   npm run lint
   # Fix any TypeScript errors
   ```

2. **Missing dependencies:**
   ```bash
   npm install
   ```

3. **Sanity client errors:**
   - Ensure all environment variables are set
   - Check that Sanity project is accessible

## Development Workflow

### Typical Workflow

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Open Studio:**
   - Navigate to `http://localhost:3000/studio`

3. **Create/Edit content:**
   - Use Studio to create or edit content
   - Changes are saved to Sanity Content Lake

4. **Preview changes:**
   - Use preview mode to see draft content
   - Or publish to see live content

5. **Deploy:**
   - Push changes to repository
   - Vercel will rebuild with new content

### Content Updates

- Content updates in Sanity are reflected immediately (no rebuild needed)
- For static pages, Next.js will regenerate on next request
- Use ISR (Incremental Static Regeneration) for automatic updates

## Additional Resources

- [Sanity Documentation](https://sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/js-client)
- [GROQ Query Language](https://sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/block-content)
- [Next.js Draft Mode](https://nextjs.org/docs/app/api-reference/functions/draft-mode)

