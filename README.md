# Ario Studio V3

A world-class creative studio website built with Next.js, TypeScript, and Tailwind CSS.

## 🎨 Creative Direction

This website represents a premium, internationally-recognized creative agency with a sophisticated dark aesthetic, cinematic animations, and a carefully orchestrated narrative experience.

### Design Philosophy

**"Refined Cinematic Minimalism"** — Balancing sophisticated darkness, precision typography, subtle luxury, and emotional depth.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (for production features)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Admin Authentication (required for /admin routes)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
NEXTAUTH_SECRET="your-nextauth-secret-key" # Generate with: openssl rand -base64 32

# Email Configuration (Brevo SMTP)
BREVO_SMTP_HOST="smtp-relay.brevo.com"
BREVO_SMTP_PORT="587"
BREVO_SMTP_USER="your-brevo-smtp-login"
BREVO_SMTP_PASS="your-brevo-smtp-password"
BREVO_API_KEY="your-brevo-api-key" # Optional
CONTACT_FROM_EMAIL="info@ariostudio.net" # From email address
CONTACT_TO_EMAIL="info@ariostudio.net" # Admin inbox for contact messages
```

3. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed  # Optional: seed with sample data
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter, Space Grotesk, Playfair Display

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── Navigation.tsx      # Fixed navigation with scroll effects
│   ├── Hero.tsx            # Cinematic hero section
│   ├── Story.tsx           # Philosophy and principles
│   ├── About.tsx           # About section with stats
│   ├── Services.tsx        # Services grid
│   ├── Portfolio.tsx       # Portfolio showcase
│   ├── Contact.tsx         # Contact and CTA section
│   └── Footer.tsx          # Footer with links
├── lib/
│   └── theme.ts            # Design system tokens
└── CREATIVE_DIRECTION.md    # Complete creative direction document
```

## 🎨 Design System

The design system is built on a foundation of:

- **Color Palette:** Deep blacks, rich accents (Electric Blue, Violet, Amber, Emerald)
- **Typography:** Inter (body), Space Grotesk (display), Playfair Display (accent)
- **Spacing:** 4px base unit system
- **Motion:** Intentional, precise animations with Framer Motion
- **Depth:** Multi-level shadow and elevation system

See `CREATIVE_DIRECTION.md` for complete design system documentation.

## 🎬 Features

- ✅ Fully responsive design (mobile-first)
- ✅ Smooth scroll animations
- ✅ Intersection Observer-based reveals
- ✅ Accessible navigation and interactions
- ✅ Performance-optimized animations
- ✅ Modern, clean architecture
- ✅ TypeScript for type safety
- ✅ Admin dashboard for lead management
- ✅ NextAuth authentication
- ✅ Dynamic content from database

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1439px
- **Large Desktop:** 1440px+

## 🔐 Admin Dashboard

The admin dashboard is available at `/admin` and provides:

- **Lead Management:** View, filter, and update leads
- **Dashboard:** Overview of lead statistics
- **Authentication:** Secure admin-only access via NextAuth

### Accessing the Admin Dashboard

1. Navigate to `/admin/login`
2. Sign in with credentials from `ADMIN_EMAIL` and `ADMIN_PASSWORD`
3. Access the dashboard at `/admin`

### Admin Routes

- `/admin` - Dashboard with lead overview
- `/admin/leads` - Full leads list with filtering
- `/admin/leads/[id]` - Individual lead detail and management

## 🚢 Deployment

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

### Environment Variables for Production

Ensure all required environment variables are set in your deployment platform (Vercel, etc.):

- `DATABASE_URL` - PostgreSQL connection string
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password
- `NEXTAUTH_SECRET` - Secret key for NextAuth (required)
- `NEXTAUTH_URL` - Your production URL (e.g., `https://yourdomain.com`)

## 📄 License

This project is proprietary and confidential.

---

**Ario Studio** — Creating extraordinary experiences through exceptional design.

