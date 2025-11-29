"use client";

import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { Link, usePathname } from "@/lib/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// Simplified Request Project Button - CSS only hover effects
function RequestButton() {
  const t = useTranslations('common.navigation');

  return (
    <Link
      href="/contact"
      className={cn(
        "group relative flex items-center justify-center overflow-hidden",
        "rounded-full px-3 sm:px-5 h-8 sm:h-9 font-medium text-xs sm:text-sm min-w-[80px] sm:min-w-auto",
        "bg-accent-purple/20 text-accent-purple",
        "border border-accent-purple/50",
        "shadow-md shadow-accent-purple/10",
        "transition-all duration-300",
        "hover:bg-accent-purple/30",
        "hover:border-accent-purple/70",
        "hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]",
        "hover:scale-[1.02] active:scale-[0.98]"
      )}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-full">
        <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[200%] group-hover:animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* Button Text */}
      <span className="relative z-10 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap">
        {t('requestProject')}
      </span>
    </Link>
  );
}

export function Header() {
  const t = useTranslations('common.navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: t('home'), href: "/" },
    { name: t('services'), href: "/#services" },
    { name: t('projects'), href: "/projects" },
    { name: t('about'), href: "/#about" },
    { name: t('contact'), href: "/contact" },
  ];

  // Use requestAnimationFrame to batch scroll reads and prevent forced reflow
  const scrollRafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous RAF if it exists
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
      }
      
      // Batch scroll reads using requestAnimationFrame
      scrollRafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Only update state if scroll position changed significantly (avoid unnecessary re-renders)
        if (Math.abs(scrollY - lastScrollYRef.current) > 5) {
          lastScrollYRef.current = scrollY;
          setIsScrolled(scrollY > 20);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  // Close mobile menu on escape key and improve backdrop handling
  // Use useLayoutEffect to prevent body scroll before paint
  useLayoutEffect(() => {
    if (!isMobileMenuOpen) {
      // Restore scroll when menu closes
      document.body.style.overflow = '';
      return;
    }
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    // Prevent body scroll when menu is open - batch with RAF to avoid forced reflow
    requestAnimationFrame(() => {
      document.body.style.overflow = 'hidden';
    });
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore scroll on cleanup
      requestAnimationFrame(() => {
        document.body.style.overflow = '';
      });
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <Container className="pt-4 relative">
        {/* Floating Capsule Container - Glass Effect */}
        <div
          className={cn(
            "pointer-events-auto relative flex items-center justify-between",
            "px-2 sm:px-3 md:px-4 py-2",
            "rounded-full",
            "backdrop-blur-xl",
            "bg-[rgba(245,245,247,0.85)]",
            "dark:bg-[rgba(15,15,19,0.75)]",
            "border border-black/[0.08]",
            "dark:border-white/[0.08]",
            "shadow-lg shadow-black/5 dark:shadow-black/20",
            "transition-shadow duration-300 ease-out",
            "hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          )}
        >
          {/* Logo + Website Name - Always visible */}
          <Link href="/" className="group flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 relative z-10" aria-label={locale === "fa" ? "برو به صفحه اصلی آریو استودیو" : "Go to Ario Studio homepage"}>
            <BrandLogo className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="text-xs sm:text-sm md:text-base font-semibold tracking-tight text-text-main">
              {locale === "fa" ? "آریو استودیو" : "Ario Studio"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 relative z-10 mx-auto" aria-label={locale === "fa" ? "منوی اصلی" : "Main navigation"}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
                    isActive
                      ? "text-text-main bg-black/5 dark:bg-white/10"
                      : "text-text-muted-custom hover:text-text-main hover:bg-black/5 dark:hover:bg-white/10"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span
                      className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-text-main rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Only Menu Button on Mobile, Desktop Nav + Actions */}
          <div className="flex items-center gap-2 relative z-50 pr-1">
            {/* Desktop: Navigation + Language + Theme + CTA */}
            <div className="hidden md:flex items-center gap-2">
              {/* Language Switcher "Keys" */}
              <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/5 h-9">
                  {['fa', 'en'].map((l) => (
                      <Link 
                          key={l}
                          href={pathname} 
                          locale={l as 'fa' | 'en'} 
                          className={cn(
                              "relative z-10 w-8 h-7 flex items-center justify-center text-[10px] font-bold uppercase transition-all duration-300 rounded-full cursor-pointer",
                              locale === l 
                                ? "text-text-main bg-white dark:bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-black/5 dark:border-white/5" 
                                : "text-text-muted-custom hover:text-text-main"
                          )}
                      >
                          {l}
                      </Link>
                  ))}
              </div>

              {/* Theme Toggle "Keys" */}
              {mounted && (
                <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/5 h-9 ml-1">
                  <button
                    onClick={() => setTheme('light')}
                    className={cn(
                      "relative w-8 h-7 flex items-center justify-center rounded-full transition-all duration-300",
                      theme === 'light' 
                        ? "text-amber-500 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-black/5" 
                        : "text-text-muted-custom hover:text-text-main"
                    )}
                  >
                    <Sun className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={cn(
                      "relative w-8 h-7 flex items-center justify-center rounded-full transition-all duration-300",
                      theme === 'dark' 
                        ? "text-blue-400 bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-white/5" 
                        : "text-text-muted-custom hover:text-text-main"
                    )}
                  >
                    <Moon className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              )}

              <div className="w-px h-5 bg-border-subtle mx-1" />

              {/* CTA Button - Desktop only */}
              <RequestButton />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsMobileMenuOpen((prev) => !prev);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen((prev) => !prev);
              }}
              type="button"
              data-mobile-menu-button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-text-main hover:bg-black/10 dark:hover:bg-white/10 active:bg-black/15 dark:active:bg-white/15 transition-colors cursor-pointer z-50 relative touch-manipulation"
              aria-label={locale === "fa" ? "منو" : "Menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop - Click to close */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(false);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(false);
            }}
            aria-hidden="true"
            role="button"
            tabIndex={-1}
          />
        )}

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            data-mobile-menu
            className="md:hidden mt-3 rounded-2xl backdrop-blur-xl bg-[rgba(245,245,247,0.95)] dark:bg-[rgba(15,15,19,0.95)] border border-black/[0.08] dark:border-white/[0.08] shadow-lg overflow-hidden pointer-events-auto z-50 relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Close Button inside Menu */}
            <div className="flex items-center justify-between p-3 border-b border-black/10 dark:border-white/10">
              <span className="text-sm font-semibold text-text-main">
                {locale === "fa" ? "منو" : "Menu"}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMobileMenuOpen(false);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-text-main hover:bg-black/20 dark:hover:bg-white/20 active:scale-95 transition-all duration-200 touch-manipulation"
                aria-label={locale === "fa" ? "بستن منو" : "Close menu"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col p-2" aria-label={locale === "fa" ? "منوی موبایل" : "Mobile navigation"}>
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "relative px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-xl",
                      isActive
                        ? "text-text-main bg-black/5 dark:bg-white/10"
                        : "text-text-muted-custom hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <span
                        className="absolute left-0 top-0 bottom-0 w-1 bg-text-main rounded-r-full"
                      />
                    )}
                  </Link>
                );
              })}
              
              {/* Language Switcher in Mobile Menu */}
              <div className="mt-3 pt-3 border-t border-border-subtle">
                <div className="px-2 mb-2">
                  <span className="text-xs font-medium text-text-muted-custom uppercase tracking-wider">
                    {locale === "fa" ? "زبان" : "Language"}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-2">
                  {['fa', 'en'].map((l) => (
                    <Link 
                      key={l}
                      href={pathname} 
                      locale={l as 'fa' | 'en'}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Close menu after a small delay to allow navigation
                        setTimeout(() => setIsMobileMenuOpen(false), 100);
                      }}
                      className={cn(
                        "relative flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer",
                        locale === l
                          ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/50"
                          : "bg-black/5 dark:bg-white/5 text-text-muted-custom border border-transparent hover:bg-black/10 dark:hover:bg-white/10"
                      )}
                    >
                      {l === 'fa' ? (locale === "fa" ? "فارسی" : "Persian") : "English"}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Theme Toggle in Mobile Menu */}
              {mounted && (
                <div className="mt-3 pt-3 border-t border-border-subtle">
                  <div className="px-2 mb-2">
                    <span className="text-xs font-medium text-text-muted-custom uppercase tracking-wider">
                      {locale === "fa" ? "تم" : "Theme"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTheme('light');
                      }}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                        theme === 'light'
                          ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/50"
                          : "bg-black/5 dark:bg-white/5 text-text-muted-custom border border-transparent hover:bg-black/10 dark:hover:bg-white/10"
                      )}
                    >
                      <Sun className="w-4 h-4" strokeWidth={2.5} />
                      {locale === "fa" ? "روشن" : "Light"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTheme('dark');
                      }}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                        theme === 'dark'
                          ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/50"
                          : "bg-black/5 dark:bg-white/5 text-text-muted-custom border border-transparent hover:bg-black/10 dark:hover:bg-white/10"
                      )}
                    >
                      <Moon className="w-4 h-4" strokeWidth={2.5} />
                      {locale === "fa" ? "تاریک" : "Dark"}
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile CTA Button */}
              <div className="mt-3 pt-3 border-t border-border-subtle">
                <Link
                  href="/contact"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-accent-purple/20 text-accent-purple border border-accent-purple/50 font-medium text-sm transition-all hover:bg-accent-purple/30"
                >
                  {t('requestProject')}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}