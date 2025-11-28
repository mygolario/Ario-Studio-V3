"use client";

import React, { useState, useEffect } from "react";
// import Link from "next/link"; // Replaced by next-intl Link
import { Link, usePathname } from "@/lib/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

// Enhanced Request Project Button with Beautiful Hover Effect
function EnhancedRequestButton() {
  const t = useTranslations('common.navigation');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLAnchorElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="hidden sm:flex relative group rounded-full"
    >
      <Link
        href="/contact"
        onMouseMove={handleMouseMove}
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          "rounded-full px-5 h-9 font-medium",
          "bg-accent-purple/20 text-accent-purple",
          "border border-accent-purple/50",
          "shadow-md shadow-accent-purple/10",
          "transition-all duration-500",
          "hover:bg-accent-purple/30",
          "hover:border-accent-purple/70",
          "hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]"
        )}
      >
        {/* Mouse-following Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                150px circle at ${mouseX}px ${mouseY}px,
                rgba(139, 92, 246, 0.3),
                transparent 70%
              )
            `,
          }}
        />

        {/* Enhanced Glow Ring on Hover */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.2)",
          }}
        />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[200%] group-hover:animate-[shimmer_1.5s_infinite]" />
        </div>

        {/* Button Text */}
        <span className="relative z-10 text-sm font-medium tracking-wide">
          {t('requestProject')}
        </span>
      </Link>
    </motion.div>
  );
}

export function Header() {
  const t = useTranslations('common.navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <Container className="pt-4">
        {/* Floating Capsule Container - Glass Effect */}
        <motion.div
          style={{ willChange: "box-shadow, background-color" }} // Optimized for performance
          className={cn(
            "pointer-events-auto relative flex items-center justify-between",
            "px-2 sm:px-3 md:px-4 py-2", // Compact and sleek
            "rounded-full", // Always pill-shaped
            "backdrop-blur-xl",
            // Glass background matching site theme
            "bg-[rgba(245,245,247,0.85)]", // Light mode
            "dark:bg-[rgba(15,15,19,0.75)]", // Dark mode
            // Subtle border
            "border border-black/[0.08]",
            "dark:border-white/[0.08]",
            // Soft shadow
            "shadow-lg shadow-black/5 dark:shadow-black/20",
            "transition-shadow duration-300 ease-out"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            // REMOVED y and scale to prevent jitter/wobble ("eating blood")
            boxShadow: isHovered 
              ? "0 8px 30px rgba(0,0,0,0.08)" // Stronger shadow on hover
              : "0 4px 20px rgba(0,0,0,0.04)", // Default shadow
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          {/* Top edge highlight for glass feel */}
          <div 
            className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/[0.15] opacity-50"
          />

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 relative z-10">
            <BrandLogo className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="text-xs sm:text-sm md:text-base font-semibold tracking-tight text-text-main hidden sm:inline-block">
              {locale === "fa" ? "آریو استودیو" : "Ario Studio"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 relative z-10 mx-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full",
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
                      className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-text-main rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Lang + Theme + CTA */}
          <div className="flex items-center gap-1 sm:gap-2 relative z-10 pr-1">
            
            {/* Language Switcher "Keys" */}
            <div className="hidden sm:flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/5 h-9">
                {['fa', 'en'].map((l) => (
                    <Link 
                        key={l}
                        href={pathname} 
                        locale={l as 'fa' | 'en'} 
                        className={cn(
                            "relative z-10 w-8 h-7 flex items-center justify-center text-[10px] font-bold uppercase transition-colors duration-300 rounded-full",
                            locale === l ? "text-text-main" : "text-text-muted-custom hover:text-text-main"
                        )}
                    >
                        {l}
                        {locale === l && (
                            <motion.div
                                layoutId="lang-active"
                                className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] -z-10 border border-black/5 dark:border-white/5"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </Link>
                ))}
            </div>

            {/* Theme Toggle "Keys" */}
            {mounted && (
              <div className="hidden sm:flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/5 h-9 sm:ml-1">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    "relative w-8 h-7 flex items-center justify-center rounded-full transition-all duration-300",
                    theme === 'light' ? "text-amber-500" : "text-text-muted-custom hover:text-text-main"
                  )}
                >
                  <Sun className="w-4 h-4" strokeWidth={2.5} />
                  {theme === 'light' && (
                    <motion.div
                      layoutId="theme-active"
                      className="absolute inset-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-full -z-10 border border-black/5"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    "relative w-8 h-7 flex items-center justify-center rounded-full transition-all duration-300",
                    theme === 'dark' ? "text-blue-400" : "text-text-muted-custom hover:text-text-main"
                  )}
                >
                  <Moon className="w-4 h-4" strokeWidth={2.5} />
                  {theme === 'dark' && (
                    <motion.div
                      layoutId="theme-active"
                      className="absolute inset-0 bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.2)] rounded-full -z-10 border border-white/5"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            )}

            <div className="w-px h-5 bg-border-subtle hidden sm:block sm:mx-1" />

            {/* CTA Button - Enhanced Hover Effect */}
            <EnhancedRequestButton />
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-text-main hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.div>
      </Container>
    </header>
  );
}