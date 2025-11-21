"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export function Header() {
  const headerRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (hash: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: hash, offsetY: 90 },
      ease: "power2.out",
    });
  };

  useGSAP(
    () => {
      // انیمیشن ورود هدر
      gsap.from(".site-header-inner", {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // واکنش به اسکرول: کوچیک شدن و بلور
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          const scrolled = self.scroll() > 80;

          gsap.to(".site-header", {
            duration: 0.3,
            backgroundColor: scrolled
              ? "rgba(5, 8, 22, 0.9)"
              : "rgba(5, 8, 22, 0.0)",
            backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
            boxShadow: scrolled
              ? "0 20px 60px rgba(0,0,0,0.6)"
              : "0 0 0 rgba(0,0,0,0)",
            paddingTop: scrolled ? 8 : 16,
            paddingBottom: scrolled ? 8 : 16,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className="site-header fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all"
    >
      <div className="site-header-inner flex w-full max-w-6xl items-center justify-between gap-6 rounded-full border border-white/10 bg-ario-bg/60 px-5 py-3 backdrop-blur-md">
        {/* لوگو / نام برند */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("#hero")}
        >
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-orange-400 to-amber-300" />
          <span className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
            Ario Studio
          </span>
        </div>

        {/* ناوبری دسکتاپ */}
        <nav className="hidden items-center gap-6 text-xs font-medium text-gray-200 md:flex">
          <button
            className="transition hover:text-white"
            onClick={() => scrollToSection("#services")}
          >
            Services
          </button>
          <button
            className="transition hover:text-white"
            onClick={() => scrollToSection("#process")}
          >
            Process
          </button>
          <button
            className="transition hover:text-white"
            onClick={() => scrollToSection("#contact")}
          >
            Contact
          </button>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection("#contact")}
            className="rounded-full bg-orange-400 px-4 py-1.5 text-xs font-semibold text-black shadow-lg shadow-orange-500/40 transition hover:bg-orange-300"
          >
            Start a project
          </button>
        </div>
      </div>
    </header>
  );
}
