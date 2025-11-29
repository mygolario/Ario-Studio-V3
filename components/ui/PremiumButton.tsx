"use client";

import React from "react";
import { Link } from "@/lib/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export function PremiumButton({ children, href, className, variant = "primary" }: PremiumButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] transition-all duration-300",
        // Add hover scale effect via CSS transform for better performance
        "hover:scale-[1.02] active:scale-[0.98]",
        isPrimary 
          ? cn(
              "bg-white text-black font-semibold",
              // Light mode specific: distinct shadow and border for visibility
              "shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(93,93,93,0.23)] border border-black/5",
              // Dark mode specific: glow and lighter border
              "dark:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] dark:border-white/50"
            )
          : cn(
              "backdrop-blur-md text-text-main border",
              // Light mode specific: visible background and darker border
              "bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20",
              // Dark mode specific: glass effect
              "dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20"
            ),
        className
      )}
    >
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 text-base tracking-wide">
        {children}
        {isPrimary ? (
           <Sparkles className="w-4 h-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 text-accent-purple" />
        ) : (
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>

      {/* Cinematic Shine Effect for Primary - CSS only */}
      {isPrimary && (
          <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-[200%] group-hover:animate-[shimmer_1.5s_infinite]" />
          </div>
      )}
    </Link>
  );
}
