"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    label: "01 · Brand-first websites",
    title: "Cinematic landing pages",
    body: "Hero sections and scrolling stories that feel like a product launch, not a template.",
    tag: "Launch-ready hero builds",
  },
  {
    label: "02 · AI-powered delivery",
    title: "AI-coded, human-edited",
    body: "We use AI agents to generate and refactor code, then refine UX and motion by hand.",
    tag: "Faster without losing taste",
  },
  {
    label: "03 · Motion & GSAP",
    title: "Scroll-based storytelling",
    body: "GSAP timelines, ScrollTrigger scenes, and subtle micro-interactions across the site.",
    tag: "GSAP native studio",
  },
  {
    label: "04 · Production setup",
    title: "From repo to live",
    body: "We connect your stack – Vercel, databases, email, analytics – so you can ship and iterate.",
    tag: "Dev + infra together",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // عنوان و توضیح
      gsap.from(".services-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // کارت‌ها
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      // خط دکوری سمت راست (اگه دوست نداشتی، می‌تونی حذفش کنی)
      gsap.from(".services-accent", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-ario-bg pb-24 pt-10 text-white md:pb-32 md:pt-20"
    >
      {/* بک‌گراند خیلی لطیف */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-10 top-0 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-16 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:px-8">
        {/* ستون چپ: عنوان و توضیح */}
        <div className="services-header max-w-md space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">
            SERVICES
          </p>
          <h2 className="text-2xl font-semibold leading-snug md:text-3xl">
            What we actually{" "}
            <span className="text-orange-300">build</span> for you.
          </h2>
          <p className="text-sm text-gray-300 md:text-base">
            Ario Studio is a motion-focused web studio. We don&apos;t just ship
            static pages – we design flows, scroll experiences, and launch-ready
            products around your brand.
          </p>
          <div className="hidden items-center gap-3 text-xs text-gray-300 md:flex">
            <div className="h-px flex-1 bg-gradient-to-r from-orange-400/60 to-transparent" />
            <span>From first scroll to final CTA.</span>
          </div>
        </div>

        {/* ستون راست: کارت‌ها */}
        <div className="relative flex-1">
          {/* خط دکوری عمودی */}
          <div className="services-accent pointer-events-none absolute -left-4 top-2 hidden h-[90%] w-px bg-gradient-to-b from-orange-400 via-orange-300/10 to-transparent md:block" />

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.label}
                className="service-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:border-orange-300/60"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-orange-200">
                  {service.label}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs text-gray-300 leading-relaxed">
                  {service.body}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-[0.7rem] text-orange-200">
                  <span className="h-1 w-1 rounded-full bg-orange-300" />
                  <span>{service.tag}</span>
                </div>

                {/* glow hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -bottom-10 right-0 h-24 w-24 rounded-full bg-orange-400/20 blur-3xl" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

