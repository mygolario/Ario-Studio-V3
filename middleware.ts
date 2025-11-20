import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for locale routing
 * 
 * Handles:
 * - Root `/` → FA (default, no redirect needed)
 * - `/en` and `/en/*` → EN routes
 * - Language detection from cookies/headers
 * - Preserves query params and pathname on redirects
 * 
 * Strategy:
 * - FA routes: `/`, `/services`, `/about`, etc. (no prefix)
 * - EN routes: `/en`, `/en/services`, `/en/about`, etc. (with `/en` prefix)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const localeCookie = request.cookies.get('language')?.value
  
  // Skip middleware for:
  // - API routes
  // - Static files (_next, images, etc.)
  // - Admin routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next()
  }

  // If pathname starts with /en, it's an EN route - allow it
  if (pathname.startsWith('/en')) {
    return NextResponse.next()
  }

  // For all other routes, they are FA routes by default
  // No redirect needed - just continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

