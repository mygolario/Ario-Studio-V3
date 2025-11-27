"use client";

import React, { useState, useEffect } from "react";
// import Link from "next/link"; // Replaced by next-intl Link
import { Link, usePathname } from "@/lib/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Header() {
  const t = useTranslations('common.navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = useLocale();

  const navItems = [
    { name: t('home'), href: "/" },
    { name: t('services'), href: "/#services" },
    { name: t('projects'), href: "/projects" },
    { name: t('about'), href: "/#about" },
    { name: t('contact'), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
        isScrolled
          ? "bg-nav-bg backdrop-blur-xl border-nav-border py-3 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <BrandLogo className="h-10 w-10" />
          <span className="text-sm md:text-base font-semibold tracking-tight text-text-main hidden sm:inline-block">
            Ario Studio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item) => {
            // Check if active. pathname from next-intl doesn't include locale.
            // But strict equality might fail for hash links or subpaths.
            // simple check:
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href} // Use href as key since name changes with locale
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "text-text-main"
                    : "text-text-muted-custom hover:text-text-main"
                )}
                onMouseEnter={() => setHoveredPath(item.href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {item.name}
                {item.href === hoveredPath && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-muted/50 rounded-full -z-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-0 right-0 h-px bg-text-main"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Theme Toggle & Lang Switcher */}
        <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-sm font-medium">
                <Link 
                    href={pathname} 
                    locale="fa" 
                    className={cn(
                        "transition-colors hover:text-accent-purple",
                        locale === 'fa' ? "text-text-main" : "text-text-muted-custom"
                    )}
                >
                    FA
                </Link>
                <span className="text-text-muted-custom/30">|</span>
                <Link 
                    href={pathname} 
                    locale="en" 
                    className={cn(
                        "transition-colors hover:text-accent-purple",
                        locale === 'en' ? "text-text-main" : "text-text-muted-custom"
                    )}
                >
                    EN
                </Link>
            </div>

          <ModeToggle />
          <Button variant="glow" size="sm" asChild className="hidden sm:flex">
            <Link href="/contact">{t('requestProject')}</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
