import createMiddleware from 'next-intl/middleware';
import {routing} from './lib/navigation';
import {NextRequest, NextResponse} from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Always rewrite root path (/) to /en (English homepage)
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.rewrite(url);
  }
  
  // Check if path already has a locale
  const hasLocale = pathname.startsWith('/fa/') || pathname.startsWith('/en/') || 
                   pathname === '/fa' || pathname === '/en';
  
  // If accessing path without locale (but not root), use next-intl middleware
  // This will handle locale detection and routing
  if (!hasLocale && pathname !== '/') {
    return intlMiddleware(request);
  }

  // Use next-intl middleware for all other requests (with locale)
  return intlMiddleware(request);
}
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
