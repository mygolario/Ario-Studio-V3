'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/config/i18n';

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  
  // Helper to switch locale
  const getLocalizedPath = (newLocale: Locale) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split('/');
    // segments[0] is empty, segments[1] is locale
    if (segments.length > 1) {
      segments[1] = newLocale;
    } else {
      return `/${newLocale}`;
    }
    return segments.join('/');
  };

  const navItems = {
    fa: [
      { name: 'خانه', href: '/' },
      { name: 'خدمات', href: '/services' },
      { name: 'نمونه‌کارها', href: '/portfolio' },
      { name: 'درباره ما', href: '/about' },
      { name: 'تماس', href: '/contact' },
    ],
    en: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ]
  };

  const ctaText = locale === 'fa' ? 'درخواست پروژه' : 'Project Request';
  const ctaLink = `/${locale}/project-request`;

  return (
    <header className="w-full py-6 px-8 flex items-center justify-between absolute top-0 left-0 z-50 bg-transparent">
      <div className="text-2xl font-bold tracking-tighter text-white">
        Ario Studio
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        {navItems[locale].map((item) => (
          <Link 
            key={item.href} 
            href={`/${locale}${item.href === '/' ? '' : item.href}`}
            className="text-white/80 hover:text-accent-primary transition-colors text-sm uppercase tracking-wider"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Link 
            href={getLocalizedPath('fa')} 
            className={`${locale === 'fa' ? 'text-accent-primary' : 'text-white/60 hover:text-white'}`}
          >
            FA
          </Link>
          <span className="text-white/20">/</span>
          <Link 
            href={getLocalizedPath('en')} 
            className={`${locale === 'en' ? 'text-accent-primary' : 'text-white/60 hover:text-white'}`}
          >
            EN
          </Link>
        </div>
        
        <Link 
          href={ctaLink}
          className="bg-accent-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent-secondary transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    </header>
  );
}
