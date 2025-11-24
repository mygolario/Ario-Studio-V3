'use client';
import { useState } from 'react';

interface ServicesDarkProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function ServicesDark({ data, lang }: ServicesDarkProps) {
  const isFa = lang === 'fa';
  const [activeService, setActiveService] = useState(1);

  // Get services from CMS or use fallback
  const servicesFromCMS = data?.servicesSecondary || [];
  const content = {
    heading: isFa 
      ? "ایده‌های نوآورانه و اجرای جسورانه که رشد قابل اندازه‌گیری ایجاد می‌کند"
      : "Innovative ideas and bold execution that drive measurable growth.",
    description: isFa
      ? "ما ترکیب استراتژی، دیزاین و تکنولوژی را ارائه می‌دهیم تا هر وبسایت و هر هویت بصری، فقط زیبا نباشد؛ برای بیزنس شما کار کند."
      : "We combine strategy, design, and technology to ensure every website and visual identity isn't just beautiful—it works for your business.",
    services: servicesFromCMS.length > 0 
      ? servicesFromCMS.map((s: any) => s.title || s)
      : [
          "(01) Interactive design experiences",
          "(02) Motion graphics production",
          "(03) Website design development",
          "(04) Digital marketing solutions",
          "(05) Packaging design innovation"
        ]
  };

  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6 w-fit">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              {isFa ? "خدمات ما" : "Our Services"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            {content.heading}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual - Left Side */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group order-2 lg:order-1">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            
            {/* Card */}
            <div className="relative w-full h-full bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/30 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden">
              {/* Animated Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-8">
                <div className="w-40 h-40 mx-auto bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-20 h-20 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white/30 font-medium text-sm uppercase tracking-wider">
                  {isFa ? "تجربه بصری" : "Visual Experience"}
                </span>
              </div>
            </div>
          </div>

          {/* Services List - Right Side */}
          <div className="space-y-4 order-1 lg:order-2">
            {content.services.map((service: string, i: number) => {
              const isActive = activeService === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveService(i)}
                  className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-[#02020a] shadow-2xl shadow-white/10 scale-[1.02]' 
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-2xl" />
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xl font-bold transition-colors ${isActive ? 'text-[#02020a]' : ''}`}>
                      {service}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-[#02020a]/10 text-[#02020a] rotate-0' 
                        : 'bg-white/5 text-gray-400 -rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-0'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
