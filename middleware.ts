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
  
  // If accessing root path without locale, detect country and redirect
  if (!hasLocale && (pathname === '/' || !pathname.startsWith('/fa') && !pathname.startsWith('/en'))) {
    // Get country from Vercel header (available on Vercel deployments)
    const country = request.headers.get('x-vercel-ip-country') || 
                    request.headers.get('cf-ipcountry') || 
                    null;

    // Determine locale based on country
    // If from Iran, use Farsi; otherwise use English
    // Default to Farsi if country cannot be detected (since fa is the default locale)
    const preferredLocale = country 
      ? (FARSI_COUNTRIES.includes(country) ? 'fa' : 'en')
      : 'fa'; // Default to Farsi when country detection fails
    
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`;
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
