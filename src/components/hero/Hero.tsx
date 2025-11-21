"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import MagneticButton from "../shared/MagneticButton";
import { content } from "@/lib/content/fa";
import { animations } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onProjectRequest: () => void;
  onViewPortfolio: () => void;
}

export default function Hero({ onProjectRequest, onViewPortfolio }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate core pulse
      gsap.to(coreRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Create orbiting elements
      orbitRefs.current.forEach((orbit, index) => {
        gsap.to(orbit, {
          rotation: 360,
          duration: 20 + index * 5,
          repeat: -1,
          ease: "none",
        });
      });

      // Parallax on scroll
      gsap.to(coreRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Entrance animations
      const tl = gsap.timeline();
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: animations.duration.normal,
        ease: animations.easing.smooth,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: animations.duration.slow,
            ease: animations.easing.smooth,
          },
          "-=0.4"
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: animations.duration.normal,
            ease: animations.easing.smooth,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current?.children || [],
          {
            opacity: 0,
            y: 20,
            duration: animations.duration.normal,
            stagger: animations.stagger.slow,
            ease: animations.easing.smooth,
          },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Orbits */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) orbitRefs.current[i] = el;
            }}
            className="absolute w-[400px] h-[400px] border border-brand-500/20 rounded-full"
            style={{
              width: `${400 + i * 150}px`,
              height: `${400 + i * 150}px`,
            }}
          >
            <div
              className="absolute top-0 right-1/2 w-3 h-3 rounded-full bg-brand-500 blur-sm"
              style={{ transform: "translateX(50%)" }}
            />
          </div>
        ))}
      </div>

      {/* Central Core */}
      <div
        ref={coreRef}
        className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-2xl shadow-brand-500/50"
      >
        <div className="w-24 h-24 rounded-full bg-dark flex items-center justify-center">
          <span className="text-4xl font-bold text-brand-400">آ</span>
        </div>
        <div className="absolute inset-0 rounded-full bg-brand-500/30 blur-2xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
        <motion.div
          ref={badgeRef}
          className="mb-6 px-4 py-2 rounded-full glass border border-brand-500/30 text-sm text-brand-300"
        >
          طراحی و ساخت تجربه‌های دیجیتال هوشمند برای برندهایی که جدی هستند.
        </motion.div>

        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight"
        >
          آریو استودیو
        </h1>

        <p
          ref={subtitleRef}
          className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mb-12 leading-relaxed"
        >
          استودیوی دیجیتال و هوش مصنوعی که با ترکیب طراحی سینماتیک، تکنولوژی
          پیشرفته و UX بین‌المللی، تجربه‌های وب استثنایی خلق می‌کند.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <MagneticButton onClick={onProjectRequest} variant="primary">
            درخواست پروژه
          </MagneticButton>
          <MagneticButton onClick={onViewPortfolio} variant="secondary">
            دیدن نمونه‌کارها
          </MagneticButton>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div className="absolute bottom-12 sm:bottom-20 left-0 right-0 overflow-hidden">
        <div className="flex gap-4 sm:gap-8 text-slate-500 text-xs sm:text-sm">
          {content.marquee.map((text, i) => (
            <div
              key={i}
              className="whitespace-nowrap animate-marquee"
              style={{
                animation: `marquee 20s linear infinite`,
                animationDelay: `${i * 2}s`,
              }}
            >
              {text} •
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}

