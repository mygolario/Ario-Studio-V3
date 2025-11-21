# Ario Studio V3 - System Overview

## Architecture

Ario Studio V3 is a full-stack Next.js application built with the App Router, featuring a CMS, CRM with AI-driven lead enrichment, and public-facing pages for portfolio, blog, and case studies.

### Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma 6.19
- **Authentication:** NextAuth.js (Auth.js)
- **Styling:** Tailwind CSS
- **Animations:** GSAP + Framer Motion
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Public-Facing Pages                      │
├─────────────────────────────────────────────────────────────┤
│  Homepage │ Work │ Blog │ About │ Privacy │ Terms │ 404    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer (Prisma)                       │
├─────────────────────────────────────────────────────────────┤
│  Projects │ Blog Posts │ Services │ Leads │ Process Steps  │
│  Highlights │ Case Studies                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Admin Dashboard (CRM)                     │
├─────────────────────────────────────────────────────────────┤
│  Leads Management │ Projects │ Blog │ Case Studies          │
│  AI Lead Enrichment │ Analytics                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### Lead Flow

1. **Lead Creation:** User submits contact form → `createLeadAction` server action
2. **Validation:** Zod schema validates input
3. **Storage:** Lead saved to database with status `"new"`
4. **AI Enrichment (Optional):** AI agent analyzes lead and adds:
   - `aiSummary`: Brief summary of the lead
   - `aiTags`: Relevant tags (e.g., "high-budget", "startup", "enterprise")
   - `aiPriorityScore`: 1-5 priority rating
   - `aiNotes`: Suggested next steps
5. **Admin Review:** Admin views leads in `/admin/leads`
6. **Status Updates:** Admin updates status (New → Contacted → In Progress → Won/Lost)

### Lead Status Flow

```
New → Contacted → In Progress → Won
                          ↓
                        Lost
```

### Blog & Case Studies Management

- **Blog Posts:** Created/edited in `/admin/blog`
- **Case Studies:** Linked to projects, created in `/admin/projects/[id]/case-study`
- **Projects:** Managed in `/admin/projects`
- All content supports draft/published status

## Key Features

### 1. Dynamic Homepage Sections

- **Services:** Fetched from database, displayed in "What We Do" section
- **Projects:** Featured projects shown in portfolio section
- **Process Steps:** Dynamic process workflow
- **Highlights:** About section highlights

### 2. AI-Driven Lead Enrichment

- Automatic analysis of incoming leads
- Priority scoring (1-5)
- Tag generation
- Suggested next steps
- Re-analysis capability

### 3. SEO & Performance

- **Metadata:** Dynamic metadata for all pages
- **Sitemap:** Auto-generated from database
- **Robots.txt:** Configured for search engines
- **Image Optimization:** Next.js Image component throughout
- **Revalidation:** ISR with configurable revalidation times

### 4. Admin Authentication

- Simple credential-based auth (NextAuth.js)
- Protected `/admin/*` routes
- Session management

## File Structure

```
app/
├── layout.tsx              # Root layout with metadata, structured data
├── page.tsx                # Homepage (revalidates every 60s)
├── not-found.tsx           # Custom 404 page
├── error.tsx               # Error boundary
├── sitemap.ts              # Dynamic sitemap
├── robots.ts               # Robots.txt
├── work/
│   ├── page.tsx            # Work listing
│   └── [slug]/
│       ├── page.tsx         # Project detail
│       └── case-study/
│           └── page.tsx     # Case study detail
├── blog/
│   ├── page.tsx            # Blog listing
│   └── [slug]/
│       └── page.tsx         # Blog post detail
├── admin/
│   ├── layout.tsx          # Protected admin layout
│   ├── page.tsx             # Dashboard
│   ├── leads/
│   │   ├── page.tsx         # Leads list
│   │   └── [id]/
│   │       └── page.tsx     # Lead detail
│   ├── projects/
│   │   └── [id]/
│   │       └── page.tsx     # Project management
│   └── blog/
│       └── [id]/
│           └── page.tsx     # Blog post management
├── about/
│   └── page.tsx            # About page
├── privacy/
│   └── page.tsx            # Privacy policy
└── terms/
    └── page.tsx            # Terms of service

lib/
├── db.ts                   # Prisma client + data access functions
├── auth.ts                 # NextAuth configuration
├── email.ts                # Email notification system
└── validation/
    └── lead.ts             # Zod schemas

components/
├── Header.tsx              # Site header with navigation
├── Footer.tsx              # Site footer
├── Hero.tsx                # Homepage hero section
├── Services.tsx            # Services section
├── Portfolio.tsx           # Portfolio section
├── DesignEthos.tsx         # Process section
├── About.tsx               # About section
├── StartProjectSection.tsx # Contact form
└── admin/                  # Admin-specific components

prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed script
```

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://ario-studio-v3.vercel.app"

# Admin Credentials
ADMIN_EMAIL="admin@ariostudio.com"
ADMIN_PASSWORD="..."

# Email (Optional)
RESEND_API_KEY="..."

# Site URL
NEXT_PUBLIC_SITE_URL="https://ario-studio-v3.vercel.app"
```

## Deployment

### Prerequisites

1. PostgreSQL database (Vercel Postgres, Supabase, or self-hosted)
2. Environment variables configured in Vercel
3. Prisma migrations run

### Build Process

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed

# Build
npm run build
```

### Vercel Deployment

1. Connect GitHub repository
2. Configure environment variables
3. Vercel automatically runs `prisma generate && next build`
4. Database migrations should be run manually or via CI/CD

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start dev server
npm run dev
```

## Adding New Projects

1. Go to `/admin/projects`
2. Click "Create New Project"
3. Fill in project details
4. Upload thumbnail and hero images
5. Set `isFeatured` to true to show on homepage
6. Save

## Adding Blog Posts

1. Go to `/admin/blog`
2. Click "Create New Post"
3. Write content (supports Markdown)
4. Set status to "Published" when ready
5. Save

## Lead Management Workflow

1. **New Lead Arrives:** Form submission creates lead with status "new"
2. **AI Enrichment:** Click "Re-run AI analysis" to generate insights
3. **Review:** Check AI summary, tags, and priority score
4. **Update Status:** Move through workflow (New → Contacted → In Progress)
5. **Add Notes:** Use internal notes for follow-up reminders
6. **Close:** Mark as Won or Lost when complete

## Performance Optimizations

- **ISR (Incremental Static Regeneration):** Homepage revalidates every 60s, other pages every 1 hour
- **Image Optimization:** All images use Next.js Image component
- **Dynamic Imports:** Heavy components lazy-loaded
- **Route Segment Caching:** Database queries cached appropriately
- **Analytics:** Vercel Analytics for performance monitoring

## SEO Features

- **Structured Data:** Organization and WebSite schemas
- **Dynamic Metadata:** Each page has unique title, description, OG tags
- **Sitemap:** Auto-generated from database
- **Canonical URLs:** All pages have canonical links
- **OpenGraph Images:** Custom OG images per page type

## Future Enhancements

- [ ] Search functionality
- [ ] Newsletter integration
- [ ] Advanced analytics dashboard
- [ ] Multi-user admin system
- [ ] Content versioning
- [ ] API endpoints for external integrations

## Support

For questions or issues, contact: hello@ariostudio.com

