# Route Audit & Design Documentation

## Executive Summary

This document maps all routes in the Ario Studio V3 project, identifies which components render which paths, and clarifies the design state (light vs dark theme).

---

## Route Structure

### Root Path (`/`)
- **Status**: ❌ Does NOT have a direct page component
- **Behavior**: Middleware automatically redirects to `/fa` or `/en` based on:
  - Country detection (Vercel header `x-vercel-ip-country` or Cloudflare `cf-ipcountry`)
  - Default: `/fa` (Farsi) if country cannot be detected
  - Iran (IR) → `/fa`
  - Other countries → `/en`
- **Handler**: `middleware.ts`

### Farsi Homepage (`/fa`)
- **Route**: `app/[locale]/page.tsx` with `locale='fa'`
- **Status**: ✅ **CURRENT_MAIN_HOMEPAGE**
- **Design**: 
  - Supports both light and dark themes via CSS variables
  - **Currently defaults to DARK** (legacy design) via `layout.tsx` defaultTheme="dark"
  - **DESIRED DESIGN**: Light/white background (#f5f5f7) - Apple-like
  - **LEGACY DESIGN**: Dark background (#050509) - Cinematic/old version
- **Language**: Farsi (RTL)
- **Sections Rendered**:
  1. Hero
  2. Services
  3. Projects
  4. About
  5. ContactCTA
- **Layout**: `app/[locale]/layout.tsx` (shared with `/en`)

### English Homepage (`/en`)
- **Route**: `app/[locale]/page.tsx` with `locale='en'`
- **Status**: ✅ **CURRENT_MAIN_HOMEPAGE**
- **Design**: 
  - Supports both light and dark themes via CSS variables
  - **Currently defaults to DARK** (legacy design) via `layout.tsx` defaultTheme="dark"
  - **DESIRED DESIGN**: Light/white background (#f5f5f7) - Apple-like
  - **LEGACY DESIGN**: Dark background (#050509) - Cinematic/old version
- **Language**: English (LTR)
- **Sections Rendered**:
  1. Hero
  2. Services
  3. Projects
  4. About
  5. ContactCTA
- **Layout**: `app/[locale]/layout.tsx` (shared with `/fa`)

---

## Other Routes

### Contact Page (`/fa/contact` and `/en/contact`)
- **Route**: `app/[locale]/contact/page.tsx`
- **Status**: ✅ Active
- **Design**: Adapts to theme (light/dark)
- **Language**: Farsi or English based on locale
- **Layout**: Uses `app/[locale]/layout.tsx` + `app/[locale]/contact/layout.tsx`

### Projects Listing (`/fa/projects` and `/en/projects`)
- **Route**: `app/[locale]/projects/page.tsx`
- **Status**: ✅ Active
- **Design**: Adapts to theme (light/dark)
- **Language**: Farsi or English based on locale
- **Component**: Uses `ProjectsClient` component

### Project Detail (`/fa/projects/[slug]` and `/en/projects/[slug]`)
- **Route**: `app/[locale]/projects/[slug]/page.tsx`
- **Status**: ✅ Active
- **Design**: Adapts to theme (light/dark)
- **Language**: Farsi or English based on locale
- **Component**: Uses `ProjectDetailsClient` component

---

## Design State Summary

### CURRENT_MAIN_HOMEPAGE (Desired - New Design)
- **Design Style**: Light/white background, Apple-like aesthetic
- **Background Color**: `#f5f5f7` (light gray/white)
- **Text Color**: `#1d1d1f` (dark text)
- **Status**: ⚠️ **NOT CURRENTLY ACTIVE** (defaultTheme is set to "dark")
- **Location**: Same components as legacy, but with light theme enabled
- **To Activate**: Change `defaultTheme="dark"` to `defaultTheme="light"` in `app/[locale]/layout.tsx` line 181

### LEGACY_DARK_HOMEPAGE (Old Design)
- **Design Style**: Dark background, cinematic aesthetic
- **Background Color**: `#050509` (very dark)
- **Text Color**: `#f5f5f7` (light text)
- **Status**: ✅ **CURRENTLY ACTIVE** (defaultTheme="dark")
- **Location**: Same components as current, but with dark theme enabled
- **Status**: Marked for removal/archival after light theme is confirmed

---

## File Structure

```
app/
├── [locale]/                    # Dynamic locale route segment
│   ├── page.tsx                # ✅ CURRENT_MAIN_HOMEPAGE - Serves /fa and /en
│   ├── layout.tsx              # ✅ Shared layout with ThemeProvider (defaultTheme="dark" - LEGACY)
│   ├── contact/
│   │   ├── page.tsx            # Contact form page
│   │   └── layout.tsx          # Contact page layout
│   └── projects/
│       ├── page.tsx            # Projects listing
│       └── [slug]/
│           └── page.tsx        # Individual project detail
├── api/
│   └── contact/
│       └── route.ts            # Contact form API endpoint
├── globals.css                 # CSS variables for light/dark themes
└── (no root page.tsx)          # ❌ Root path handled by middleware

middleware.ts                   # Handles / → /fa or /en redirect
```

---

## Key Configuration Files

### Theme Configuration
- **File**: `app/[locale]/layout.tsx`
- **Current Setting**: `defaultTheme="dark"` (line 181)
- **Desired Setting**: `defaultTheme="light"`
- **Theme Provider**: Uses `next-themes` package

### Routing Configuration
- **File**: `lib/navigation.ts`
- **Default Locale**: `'fa'` (Farsi)
- **Locales**: `['en', 'fa']`
- **Locale Prefix**: `'always'` (always shows /fa or /en)

### CSS Theme Variables
- **File**: `app/globals.css`
- **Light Mode** (desired):
  - `--bg: #f5f5f7`
  - `--text-main: #1d1d1f`
  - `--bg-elevated: #ffffff`
- **Dark Mode** (legacy):
  - `--bg: #050509`
  - `--text-main: #f5f5f7`
  - `--bg-elevated: #0f0f13`

---

## Action Items

1. ✅ **Route audit completed** - All routes documented
2. ✅ **Design identification completed** - Light (desired) vs Dark (legacy) identified
3. ⏳ **Theme switch** - Change `defaultTheme="dark"` → `defaultTheme="light"` in `app/[locale]/layout.tsx`
4. ⏳ **Verification** - Test that light theme renders correctly for both `/fa` and `/en`
5. ⏳ **Legacy removal** (optional) - Remove dark theme code after light theme is confirmed working

---

## Notes

- There is **NO** separate `app/page.tsx`, `app/en/page.tsx`, or `app/fa/page.tsx`
- All homepage rendering is handled by `app/[locale]/page.tsx` with dynamic locale parameter
- The same components serve both Farsi and English versions
- Design distinction is purely via theme (light vs dark), not separate components
- Middleware ensures all root path access gets a locale prefix

