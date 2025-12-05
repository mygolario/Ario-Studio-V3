/**
 * ROUTING MIDDLEWARE - Handles Root Path Redirection
 * 
 * ROOT PATH HANDLING:
 * - "/" → Always redirects to "/fa" (light Farsi homepage)
 * - "/fa" → Light Farsi homepage (optional alias)
 * - "/en" → Light English homepage (same component, English locale)
 * 
 * ROUTES SERVED:
 * - "/" → Always redirects to "/fa" (light Farsi homepage)
 * - "/fa" → CURRENT_MAIN_HOMEPAGE with locale='fa' (Farsi, light/white design)
 * - "/en" → CURRENT_MAIN_HOMEPAGE with locale='en' (English, light/white design)
 * - "/fa/*" → Other pages under Farsi locale
 * - "/en/*" → Other pages under English locale
 * 
 * DESIGN:
 * - All routes use light theme by default (ThemeProvider defaultTheme="light")
 * - Dark theme is legacy but still available via theme toggle
 */

import createMiddleware from 'next-intl/middleware';
import {routing} from './lib/navigation';
import {NextRequest, NextResponse} from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if path already has a locale
  const hasLocale = pathname.startsWith('/fa/') || pathname.startsWith('/en/') || 
                   pathname === '/fa' || pathname === '/en';
  
  // If accessing root path without locale, always redirect to /fa (light Farsi homepage)
  if (!hasLocale && (pathname === '/' || !pathname.startsWith('/fa') && !pathname.startsWith('/en'))) {
    const url = request.nextUrl.clone();
    url.pathname = `/fa${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  // Use next-intl middleware for all other requests
  return intlMiddleware(request);
}
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
