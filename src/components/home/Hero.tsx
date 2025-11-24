'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface HeroProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function Hero({ data, lang }: HeroProps) {
  const isFa = lang === 'fa';
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Fallback content if CMS data is missing
  const content = {
    tagline: isFa 
      ? (data?.hero?.taglineFa || "CREATIVE AGENCY")
      : (data?.hero?.taglineEn || "CREATIVE AGENCY"),
    heading: isFa
      ? (data?.hero?.headingFa || "نه فقط یک استودیو، ما استراتژیک هستیم")
      : (data?.hero?.headingEn || "Not just a studio, we are Strategic"),
    subtext: isFa
      ? (data?.hero?.subtextFa || "ما یک آژانس خلاق تمام‌خدمات هستیم که به کسب‌وکارهای جاه‌طلب کمک می‌کند تا ایده‌ها را به داستان‌ها، طراحی‌ها و تجربیات دیجیتالی تأثیرگذار تبدیل کنند.")
      : (data?.hero?.subtextEn || "We are a full-service creative agency helping ambitious businesses turn ideas into impactful stories, designs, and digital experiences that connect with people."),
    ctaPrimary: isFa ? "بیایید صحبت کنیم" : "Let's Talk",
    services: data?.hero?.services || ['Branding', 'Photography', 'Animation', 'Design'],
    watchText: isFa ? "تماشای ویدیو" : "Watch video",
  };

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const parallax = scrolled * 0.5;
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02020a]">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-[1] opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen py-20">
          {/* Left: Text Content */}
          <div className={`lg:col-span-7 space-y-8 ${isFa ? 'order-2 lg:order-1' : ''}`}>
            {/* Tagline */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                {content.tagline}
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight text-white">
              <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                {content.heading}
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
              {content.subtext}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${lang}/request`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#02020a] rounded-full font-bold hover:bg-gray-100 transition-all text-lg shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
              >
                <span>{content.ctaPrimary}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <button className="group inline-flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-medium text-white hover:bg-white/10 transition-all">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span className="text-sm">{content.watchText}</span>
              </button>
            </div>
          </div>

          {/* Right: Visual with Services List */}
          <div ref={heroRef} className={`lg:col-span-5 relative ${isFa ? 'order-1 lg:order-2' : ''}`}>
            {/* Main Visual Card */}
            <div className="relative w-full aspect-[4/5] mb-12 group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
              
              {/* Card */}
              <div className="relative w-full h-full bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/30 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white/30 font-medium text-sm uppercase tracking-wider">
                    {isFa ? "تجربه بصری" : "Visual Experience"}
                  </span>
                </div>
              </div>
            </div>

            {/* Services List - Modern Vertical Cards */}
            <div className="space-y-3">
              {content.services.map((service: string, i: number) => (
                <div
                  key={i}
                  className={`group relative p-4 rounded-xl backdrop-blur-sm border transition-all cursor-pointer ${
                    i === 1 
                      ? 'bg-white/10 border-white/20 text-white shadow-lg' 
                      : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{service}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${i === 1 ? 'rotate-0' : '-rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-0'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
