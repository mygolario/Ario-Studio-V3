"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../shared/MagneticButton";
import { content } from "@/lib/content/fa";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onProjectRequest: () => void;
  onViewPortfolio: () => void;
}

export default function Hero({ onProjectRequest, onViewPortfolio }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const orbit1Ref = useRef<HTMLDivElement>(null);
  const orbit2Ref = useRef<HTMLDivElement>(null);
  const orbit3Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate logo core pulse
      gsap.to(logoRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Animate orbits
      gsap.to(orbit1Ref.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(orbit2Ref.current, {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      gsap.to(orbit3Ref.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      // Entrance animations
      const tl = gsap.timeline();
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.5"
        )
        .from(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          buttonsRef.current?.children || [],
          {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.6,
          },
          "-=0.3"
        );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (logoRef.current) {
            gsap.to(logoRef.current, {
              y: self.progress * 50,
              scale: 1 - self.progress * 0.1,
              duration: 0.3,
            });
          }
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16"
    >
      {/* Animated Background Orbits */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Orbit 1 */}
        <div
          ref={orbit1Ref}
          className="absolute w-96 h-96 border border-brand-500/20 rounded-full"
        >
          <div className="absolute top-0 start-1/2 -translate-x-1/2 w-3 h-3 bg-brand-500 rounded-full blur-sm" />
        </div>

        {/* Orbit 2 */}
        <div
          ref={orbit2Ref}
          className="absolute w-[500px] h-[500px] border border-brand-400/15 rounded-full"
        >
          <div className="absolute top-0 start-1/2 -translate-x-1/2 w-2 h-2 bg-brand-400 rounded-full blur-sm" />
          <div className="absolute bottom-0 start-1/2 -translate-x-1/2 w-2 h-2 bg-brand-400 rounded-full blur-sm" />
        </div>

        {/* Orbit 3 */}
        <div
          ref={orbit3Ref}
          className="absolute w-[600px] h-[600px] border border-brand-300/10 rounded-full"
        >
          <div className="absolute top-1/4 start-0 w-2 h-2 bg-brand-300 rounded-full blur-sm" />
          <div className="absolute bottom-1/4 end-0 w-2 h-2 bg-brand-300 rounded-full blur-sm" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-block px-4 py-2 rounded-full glass text-sm text-slate-300 mb-8"
          >
            {content.hero.badge}
          </div>

          {/* Logo Core */}
          <div className="flex justify-center mb-8">
            <div
              ref={logoRef}
              className="w-32 h-32 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-5xl font-bold shadow-2xl shadow-brand-500/50 relative z-10"
            >
              آ
            </div>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-brand-100 to-brand-300 bg-clip-text text-transparent"
          >
            {content.hero.title}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-slate-300 mb-4"
          >
            {content.hero.subtitle}
          </p>

          {/* Description */}
          <p
            ref={subtitleRef}
            className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto"
          >
            {content.hero.description}
          </p>

          {/* CTAs */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton onClick={onProjectRequest} variant="primary" className="text-lg px-8 py-4">
              {content.hero.primaryCTA}
            </MagneticButton>
            <MagneticButton onClick={onViewPortfolio} variant="secondary" className="text-lg px-8 py-4">
              {content.hero.secondaryCTA}
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="absolute bottom-20 start-0 w-full overflow-hidden"
      >
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...content.hero.marquee, ...content.hero.marquee].map(
            (item, idx) => (
              <span
                key={idx}
                className="text-slate-500 text-sm font-medium"
              >
                {item} •
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

