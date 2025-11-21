"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".finalcta-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".finalcta-sub", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".finalcta-btn", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });

      // بک‌گراند سینماتیک subtle
      gsap.from(".finalcta-bg", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        opacity: 0.3,
        scale: 0.9,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mt-20 overflow-hidden py-24 text-white md:py-32"
    >
      {/* بک‌گراند گرادیان سینماتیک */}
      <div className="finalcta-bg pointer-events-none absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-purple-600/10 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <h2 className="finalcta-header text-3xl font-semibold md:text-4xl">
          آماده‌ای تجربه دیجیتال <span className="text-orange-300">برندت</span>{" "}
          رو بسازی؟
        </h2>

        <p className="finalcta-sub mx-auto mt-5 max-w-xl text-sm text-gray-300 md:text-base">
          اگه ایده داری، یا فقط می‌خوای بدونی بهترین مسیر ساخت سایتت چیه،
          بیا صحبت کنیم. ۱ مشاوره‌ی رایگان داریم که مشخص کنه چطوری می‌تونیم
          برات تجربه‌ای سینماتیک بسازیم.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="finalcta-btn rounded-full bg-orange-400 px-8 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/40 transition hover:bg-orange-300">
            رزرو جلسه مشاوره
          </button>

          <button className="finalcta-btn rounded-full border border-white/15 px-8 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/5">
            بررسی خدمات استودیو
          </button>
        </div>
      </div>
    </section>
  );
}

