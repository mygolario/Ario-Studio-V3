/**
 * MIDDLEWARE: Root path routing handler
 * 
 * This middleware handles the root path (/) and redirects to locale-specific routes.
 * 
 * ROUTING LOGIC:
 * - / → Always redirects to /fa (light Farsi homepage)
 * - /fa → Handled by app/[locale]/page.tsx (Farsi homepage with light theme)
 * - /en → Handled by app/[locale]/page.tsx (English homepage with light theme)
 * - /fa/* and /en/* → Handled by next-intl middleware
 * 
 * NOTE: Root path (/) always redirects to /fa to ensure the light Farsi homepage is shown
 * 
 * NOTE: There is no app/page.tsx - all homepage rendering is done via app/[locale]/page.tsx
 */

import createMiddleware from 'next-intl/middleware';
import {routing} from './lib/navigation';
import {NextRequest, NextResponse} from 'next/server';

// Countries where Farsi should be the default
const FARSI_COUNTRIES = ['IR']; // Iran

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if path already has a locale
  const hasLocale = pathname.startsWith('/fa/') || pathname.startsWith('/en/') || 
                   pathname === '/fa' || pathname === '/en';
  
  // If accessing root path without locale, always redirect to /fa (light Farsi homepage)
  if (!hasLocale && (pathname === '/' || !pathname.startsWith('/fa') && !pathname.startsWith('/en'))) {
    // Always redirect to /fa for the light Farsi homepage
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
