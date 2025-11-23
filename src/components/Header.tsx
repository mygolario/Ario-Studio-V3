'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header({ lang }: { lang: 'en' | 'fa' }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
          <div className="w-8 h-8 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          Ariostudio
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href={targetPath}
            className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase"
          >
            {targetLang}
          </Link>
          
          <Link
            href={`/${lang}/request`}
            className="hidden sm:inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-background bg-white rounded-full hover:bg-gray-200 transition-colors"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </header>
  );
}
