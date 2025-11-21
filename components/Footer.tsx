"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Footer() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".footer-wrapper", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  return (
    <footer
      ref={ref}
      className="relative mt-20 border-t border-white/10 bg-ario-bg/60 backdrop-blur py-16 text-white"
    >
      {/* subtle background light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 bottom-0 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-10 top-0 h-32 w-32 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="footer-wrapper relative mx-auto max-w-6xl px-4 md:px-8">
        {/* top section */}
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          {/* logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-400 to-amber-300" />
            <span className="text-sm font-semibold tracking-[0.18em] uppercase">
              Ario Studio
            </span>
          </div>

          {/* social */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition">
              Telegram
            </a>
            <a href="#" className="hover:text-white transition">
              LinkedIn
            </a>
          </div>
        </div>

        {/* divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* bottom */}
        <div className="flex flex-col items-center justify-between gap-6 text-center text-xs text-gray-400 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Ario Studio – All rights reserved</p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

