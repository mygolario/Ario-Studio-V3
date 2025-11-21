"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    step: "01",
    title: "Discovery & alignment",
    body: "We jump on a short call, map your brand, goals, and constraints, then define what a “win” looks like for this project.",
  },
  {
    step: "02",
    title: "UX, copy & motion concept",
    body: "We design the core narrative: sections, key messages, and how the scroll should feel. No code yet – just the story.",
  },
  {
    step: "03",
    title: "AI-coded build",
    body: "We let AI agents generate the first implementation in Next.js + GSAP, then refine layout, timing, and responsiveness.",
  },
  {
    step: "04",
    title: "Polish, launch & handoff",
    body: "We tweak micro-interactions, performance, SEO, and analytics – then deploy on Vercel and hand you a clean repo.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // انیمیشن ورود تیتر
        gsap.from(".process-header", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        // نسخه دسکتاپ: scrub + pin
        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: ".process-timeline",
                start: "top center",
                end: "bottom+=200 center",
                scrub: 1.2,
                pin: ".process-panel",
              },
            });

            tl.fromTo(
              ".process-step",
              { opacity: 0.2 },
              {
                opacity: 1,
                stagger: 1,
                duration: 1,
                ease: "power2.out",
              }
            );
          },

          // موبایل: فقط fade + y ساده
          "(max-width: 767px)": () => {
            gsap.from(".process-step", {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
              y: 40,
              opacity: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
            });
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-ario-bg py-20 text-white md:py-28"
    >
      {/* بک‌گراند ملایم */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        {/* تیتر */}
        <div className="process-header max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">
            PROCESS
          </p>
          <h2 className="text-2xl font-semibold leading-snug md:text-3xl">
            How we turn an idea into a{" "}
            <span className="text-orange-300">launch-ready</span> experience.
          </h2>
          <p className="text-sm text-gray-300 md:text-base">
            Every project runs through the same tight loop – so you always know
            what&apos;s happening now and what comes next.
          </p>
        </div>

        {/* محتوای اصلی */}
        <div className="mt-10 flex flex-col gap-10 md:mt-16 md:flex-row md:items-start md:gap-14">
          {/* پنل پین‌شونده سمت چپ */}
          <div className="process-panel md:sticky md:top-28 md:w-1/2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-orange-200">
                A motion-first workflow
              </p>
              <h3 className="mt-3 text-lg font-semibold">
                Strategy, motion, then code.
              </h3>
              <p className="mt-2 text-sm text-gray-300">
                We don&apos;t start in the code editor – we start with the
                scroll. We map how your story should unfold, then use AI and
                GSAP to build that feeling into the site.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-gray-300">
                <li>· Clear timeline and checkpoints</li>
                <li>· Direct access on Telegram/Notion</li>
                <li>· Visual previews before development</li>
              </ul>
            </div>
          </div>

          {/* تایم‌لاین مراحل */}
          <div className="process-timeline relative flex-1">
            {/* خط عمودی */}
            <div className="pointer-events-none absolute left-3 top-0 hidden h-full w-px bg-gradient-to-b from-orange-400 via-orange-300/10 to-transparent md:block" />
            <div className="space-y-6">
              {steps.map((s) => (
                <article
                  key={s.step}
                  className="process-step relative rounded-2xl border border-white/10 bg-white/5 p-5 pl-10 backdrop-blur-md md:pl-14"
                >
                  {/* نقطه‌ی تایم‌لاین */}
                  <div className="absolute left-2 top-5 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-orange-400 shadow shadow-orange-500/60 md:block" />
                  <div className="text-[0.75rem] font-semibold tracking-[0.22em] text-orange-200">
                    {s.step}
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-300 md:text-[0.8rem]">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

