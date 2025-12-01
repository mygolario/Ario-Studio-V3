# Sanity CMS Integration

This document outlines the Sanity CMS integration for Ario Studio.

## Overview

Sanity v3 has been integrated into the Next.js project as the content layer. The integration includes:

- **Code-first schemas** for all content types
- **Embedded Sanity Studio** at `/studio`
- **Draft preview support** for content editors
- **Production-ready** configuration for Vercel + Sanity managed cloud

## Environment Variables

Add these to your `.env.local` file (or Vercel environment variables):

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity API Token (for draft preview)
# Get this from: https://www.sanity.io/manage
SANITY_API_READ_TOKEN=your-read-token

# Sanity Revalidate Secret (for draft preview webhook)
# Generate a random string for this (e.g., use `openssl rand -base64 32`)
SANITY_REVALIDATE_SECRET=your-random-secret-string
```

## Getting Started

1. **Create a Sanity project**:
   - Go to https://www.sanity.io/manage
   - Create a new project
   - Note your Project ID and Dataset name

2. **Set up environment variables**:
   - Copy the values to your `.env.local` file
   - For production, add them to Vercel environment variables

3. **Access Sanity Studio**:
   - Run `npm run dev`
   - Navigate to `http://localhost:3000/studio`
   - You'll be prompted to authenticate with Sanity

4. **Create content**:
   - Start by creating a `siteSettings` document (singleton)
   - Add `service` documents for your services
   - Add `project` documents for your portfolio
   - Add `testimonial` documents (optional)
   - Add `blogPost` documents (optional)

## Content Types

### Service
- **ID**: Unique identifier (e.g., "01", "02", "03")
- **Title**: Service name
- **Subtitle**: Short tagline
- **Description**: Full description
- **Color**: Tailwind color class (e.g., "bg-accent-purple")
- **Order**: Display order (lower numbers appear first)

### Project
- **Title**: Project name
- **Slug**: URL-friendly identifier (auto-generated from title)
- **Category**: Project category
- **Description**: Full project description
- **Excerpt**: Short summary for listings
- **Client**: Client name
- **Year**: Project year
- **Services**: Array of services used
- **Challenge/Solution/Results**: Case study content
- **Gradient**: Tailwind gradient classes
- **Thumbnail Image**: Image for listings
- **Cover Image**: Main project image
- **Images**: Gallery images
- **Approach Visuals**: Visual breakdown items
- **Published At**: Publication date (required)
- **Featured**: Show on homepage

### Testimonial
- **Name**: Client name
- **Role**: Job title
- **Company**: Company name
- **Quote**: Testimonial text
- **Avatar**: Client photo
- **Rating**: Rating out of 5 (optional)
- **Featured**: Show prominently
- **Order**: Display order

### Blog Post
- **Title**: Post title
- **Slug**: URL-friendly identifier
- **Excerpt**: Short summary
- **Content**: Rich text content
- **Cover Image**: Featured image
- **Author**: Author name
- **Published At**: Publication date
- **Categories**: Array of categories
- **Tags**: Array of tags

### Site Settings
- **Title**: Site title
- **Description**: Site description
- **Logo**: Site logo
- **OG Image**: Default social sharing image
- **Contact Email**: Contact email
- **Social Links**: Social media URLs

## Draft Preview

Draft preview allows content editors to preview unpublished content:

1. **Enable preview in Sanity Studio**:
   - In your Sanity project settings, add a preview configuration
   - Use the preview URL: `https://yourdomain.com/api/draft?secret=YOUR_SECRET&slug=PROJECT_SLUG&type=project`

2. **Access preview**:
   - Click "Preview" in Sanity Studio
   - You'll be redirected to the live site with draft content visible

3. **Disable preview**:
   - Visit `/api/disable-draft` to exit preview mode

## File Structure

```
sanity/
├── lib/
│   ├── client.ts          # Sanity client configuration
│   ├── env.ts             # Environment variable validation
│   ├── image.ts           # Image URL builder
│   ├── queries.ts         # GROQ queries
│   ├── fetch.ts           # Data fetching functions
│   └── types.ts           # TypeScript types
├── schemas/
│   ├── index.ts           # Schema exports
│   ├── service.ts         # Service schema
│   ├── project.ts         # Project schema
│   ├── testimonial.ts     # Testimonial schema
│   ├── blogPost.ts        # Blog post schema
│   └── siteSettings.ts    # Site settings schema
└── sanity.config.ts       # Sanity Studio configuration

app/
├── studio/
│   └── [[...index]]/
│       └── page.tsx       # Embedded Studio route
└── api/
    ├── draft/
    │   └── route.ts        # Draft preview enable
    └── disable-draft/
        └── route.ts        # Draft preview disable
```

## Data Flow

1. **Content Creation**: Editors create content in Sanity Studio (`/studio`)
2. **Data Fetching**: Next.js pages fetch data using functions in `sanity/queries.ts`
3. **Fallback**: If Sanity data is unavailable, the app falls back to static data
4. **Preview**: Draft mode allows previewing unpublished content

## Migration Notes

- Existing hard-coded project data in `lib/projects.ts` is kept as fallback
- Services now come from Sanity, with fallback to default services
- All existing UI components remain unchanged - only data source changed
- The app gracefully handles missing Sanity data

## Production Deployment

1. **Set environment variables in Vercel**:
   - Add all required Sanity environment variables
   - Ensure `SANITY_REVALIDATE_SECRET` is set

2. **Configure Sanity webhook** (optional, for revalidation):
   - In Sanity project settings, add a webhook
   - URL: `https://yourdomain.com/api/revalidate`
   - Secret: Your `SANITY_REVALIDATE_SECRET` value

3. **Deploy**:
   - Push to your repository
   - Vercel will automatically deploy
   - Access Studio at `https://yourdomain.com/studio`

## Troubleshooting

- **Studio not loading**: Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set
- **No data showing**: Verify your Sanity project has content, or check fallback data is working
- **Preview not working**: Ensure `SANITY_API_READ_TOKEN` and `SANITY_REVALIDATE_SECRET` are set correctly
- **Build errors**: Make sure all environment variables are set before building

