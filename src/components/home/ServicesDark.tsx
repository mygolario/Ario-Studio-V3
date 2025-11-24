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
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {content.heading}
          </h2>
          <p className="text-xl text-gray-400">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual - VR Headset Image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 blur-3xl" />
            <div className="relative w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-3xl border border-white/10 backdrop-blur-sm flex items-center justify-center">
              {/* Placeholder for VR headset image */}
              <div className="text-center space-y-4">
                <div className="w-40 h-40 mx-auto bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                  <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white/20 font-medium text-sm">Service Visual</span>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {content.services.map((service: string, i: number) => {
              const isActive = activeService === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveService(i)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                    isActive 
                      ? 'bg-white text-[#02020a] shadow-xl' 
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5'
                  }`}
                >
                  <span className="text-xl font-bold">
                    {service}
                  </span>
                  <span className={`text-2xl transition-transform ${isActive ? 'rotate-0' : '-rotate-45 opacity-0 group-hover:opacity-100'}`}>
                    →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
