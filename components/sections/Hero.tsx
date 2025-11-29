"use client";

import { PremiumButton } from "@/components/ui/PremiumButton";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24"
    >
      {/* Background Gradients - CSS Animation for Performance */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-purple/20 rounded-full blur-[120px] animate-pulse-slow dark:opacity-100 opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-blue/10 rounded-full blur-[120px] animate-pulse-slower dark:opacity-100 opacity-40" />
        {/* Noise texture - Using img tag for LCP optimization with high priority */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/noise.avif"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay object-cover"
          style={{
            imageRendering: 'auto'
          }}
        />
      </div>

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Content - Optimized structure */}
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-text-main">
            {t('headline.prefix')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
              {t('headline.highlight')}
            </span>
            {t('headline.suffix')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-text-muted-custom max-w-lg leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
            <PremiumButton href="/contact" variant="primary">
              {t('cta.startProject')}
            </PremiumButton>
            <PremiumButton href="/projects" variant="secondary">
              {t('cta.viewWork')}
            </PremiumButton>
          </div>
        </div>

        {/* Right UI Preview - Optimized structure */}
        <div className="relative hidden lg:block w-full aspect-square max-w-lg mx-auto">
          {/* Abstract UI Card */}
          <div className="absolute inset-0 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-12 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5 flex items-center px-6 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>

            <div className="p-8 mt-12 space-y-6">
              <div className="w-2/3 h-8 bg-black/5 dark:bg-white/10 rounded-lg animate-pulse" />
              <div className="space-y-3">
                <div className="w-full h-4 bg-black/5 dark:bg-white/5 rounded-md" />
                <div className="w-full h-4 bg-black/5 dark:bg-white/5 rounded-md" />
                <div className="w-4/5 h-4 bg-black/5 dark:bg-white/5 rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="h-32 bg-accent-purple/10 rounded-xl border border-accent-purple/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-accent-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="h-32 bg-accent-blue/10 rounded-xl border border-accent-blue/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-accent-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -right-8 top-20 w-24 h-24 bg-gradient-to-br from-accent-purple to-blue-600 rounded-2xl blur-xl opacity-40 animate-pulse-slow" />
          <div className="absolute -left-8 bottom-20 w-32 h-32 bg-gradient-to-tr from-accent-blue to-cyan-400 rounded-full blur-2xl opacity-30 animate-pulse-slower" />
        </div>
      </Container>
    </section>
  );
}