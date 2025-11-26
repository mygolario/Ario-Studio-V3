"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/lib/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("home.hero");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Gradients - Adjusted for light mode readability */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-purple/20 rounded-full blur-[120px] animate-pulse-slow dark:opacity-100 opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-blue/10 rounded-full blur-[120px] animate-pulse-slow delay-1000 dark:opacity-100 opacity-40" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div style={{ opacity, y }} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-text-main">
              {t('headline.prefix')}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                {t('headline.highlight')}
              </span>
              {t('headline.suffix')}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.32, 0, 0.67, 0],
            }}
            className="text-lg md:text-xl text-text-muted-custom max-w-lg leading-relaxed"
          >
            {t('description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.32, 0, 0.67, 0],
            }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="text-base" asChild>
              <Link href="/contact">{t('cta.startProject')}</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base bg-transparent border-border-subtle hover:bg-surface-hover text-text-main"
              asChild
            >
              <Link href="/projects">{t('cta.viewWork')}</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right UI Preview */}
        <motion.div
          style={{ scale }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.32, 0, 0.67, 0] }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
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
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-8 top-20 w-24 h-24 bg-gradient-to-br from-accent-purple to-blue-600 rounded-2xl blur-xl opacity-40"
            />
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -left-8 bottom-20 w-32 h-32 bg-gradient-to-tr from-accent-blue to-cyan-400 rounded-full blur-2xl opacity-30"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
