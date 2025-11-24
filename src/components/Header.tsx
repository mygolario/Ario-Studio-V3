'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header({ lang }: { lang: 'en' | 'fa' }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFa = lang === 'fa';
  
  // Language Switcher Logic
  const targetLang = isFa ? 'en' : 'fa';
  const targetPath = pathname.replace(`/${lang}`, `/${targetLang}`);

  const navLinks = isFa
    ? [
        { name: 'خدمات', href: '#services' },
        { name: 'نمونه کار', href: '#work' },
        { name: 'درباره ما', href: '#about' },
        { name: 'بلاگ', href: '#blog' },
      ]
    : [
        { name: 'Services', href: '#services' },
        { name: 'Work', href: '#work' },
        { name: 'About', href: '#about' },
        { name: 'Blog', href: '#blog' },
      ];

  const ctaText = isFa ? 'درخواست پروژه' : 'Project Request';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#02020a]/95 backdrop-blur-xl py-4 shadow-lg shadow-black/20 border-b border-white/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex flex-col gap-0.5 group">
            <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-gray-200 transition-colors">
              ARIO
            </span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">
              CREATIVE AGENCY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <Link
              href={targetPath}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              {targetLang.toUpperCase()}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5 group"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
            
            {/* CTA Button */}
            <Link
              href={`/${lang}/request`}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-[#02020a] bg-white rounded-full hover:bg-gray-100 transition-all shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
            >
              {ctaText}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-6 border-t border-white/10 pt-6 animate-in slide-in-from-top-5 duration-300">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href={`/${lang}/request`}
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-4 px-4 py-3 text-base font-bold text-[#02020a] bg-white rounded-lg text-center"
              >
                {ctaText}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
