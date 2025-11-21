"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1) بک‌گراند نوری
      tl.from(".hero-bg-glow", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        // 2) بِج بالا
        .from(
          ".hero-badge",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // 3) تیتر اصلی
        .from(
          ".hero-title",
          {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.2"
        )
        // 4) زیرتیتر
        .from(
          ".hero-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // 5) دکمه‌ها
        .from(
          ".hero-cta",
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // 6) کارت‌های سمت راست
        .from(
          ".hero-card",
          {
            y: 60,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // پارالاکس ملایم بک‌گراند با اسکرول
      gsap.to(".hero-bg-glow", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        yPercent: 20,
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden bg-ario-bg text-white"
    >
      {/* بک‌گراند نوری */}
      <div className="pointer-events-none absolute inset-0 hero-bg-glow">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-16 px-4 py-20 md:flex-row md:items-center md:px-8">
        {/* ستون چپ: متن */}
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 hero-badge backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-orange-200">
              ARIO STUDIO · AI-POWERED WEB
            </span>
          </div>

          <h1 className="hero-title text-3xl font-semibold leading-tight text-white md:text-5xl">
            We craft <span className="text-orange-300">cinematic</span>{" "}
            digital experiences
            <br className="hidden md:block" /> powered by{" "}
            <span className="text-orange-400">AI.</span>
          </h1>

          <p className="hero-subtitle text-sm text-gray-300 md:text-base">
            From first concept to final deploy, Ario Studio designs and builds
            high-end web experiences – coded with AI, tuned by a human eye.
          </p>

          <div className="hero-cta flex flex-wrap items-center gap-3 pt-2">
            <button className="rounded-full bg-orange-400 px-6 py-2 text-sm font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-300">
              Start a project
            </button>
            <button className="rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/5">
              View capabilities
            </button>
          </div>
        </div>

        {/* ستون راست: کارت‌ها */}
        <div className="grid w-full max-w-md gap-4 md:w-auto">
          <div className="hero-card rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-200">
              01 · Motion-first design
            </p>
            <p className="mt-2 text-sm text-gray-100">
              Smooth GSAP-powered storytelling for every scroll and interaction.
            </p>
          </div>

          <div className="hero-card rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-200">
              02 · AI-coded builds
            </p>
            <p className="mt-2 text-sm text-gray-100">
              We pair AI agents with handcrafted UX to ship faster without
              losing taste.
            </p>
          </div>

          <div className="hero-card rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-200">
              03 · Launch-ready
            </p>
            <p className="mt-2 text-sm text-gray-100">
              From concept to live on Vercel – performance, SEO, and polish
              included.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
