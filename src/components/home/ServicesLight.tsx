'use client';
import { useState } from 'react';

interface ServicesLightProps {
  data: any;
  lang: 'en' | 'fa';
}

interface ServiceItem {
  title: string;
  body: string;
}

export default function ServicesLight({ data, lang }: ServicesLightProps) {
  const isFa = lang === 'fa';
  const [activeRow, setActiveRow] = useState(1);

  // Get services from CMS or use fallback
  const servicesFromCMS = data?.servicesSecondary || [];
  const content: { heading: string[]; services: ServiceItem[] } = {
    heading: isFa
      ? ["ما برای رشد محصولات دیجیتال شما راه‌حل‌های ویژه طراحی می‌کنیم.", "از صفر تا مقیاس جهانی، همراه برندتان هستیم."]
      : ["We take creative leaps and offer tailored solutions for the growth of your digital products.", "From scratch to success and beyond."],
    services: servicesFromCMS.length > 0
      ? servicesFromCMS.map((s: any) => ({
          title: s.title || '',
          body: isFa ? s.bodyFa : s.bodyEn,
        }))
      : [
          {
            title: "(01) Interactive design experiences",
            body: isFa ? "ایجاد تجربیات دیجیتالی فراگیر که درگیر می‌کند و تبدیل می‌کند." : "Creating immersive digital experiences that engage and convert."
          },
          {
            title: "(02) Motion graphics production",
            body: isFa ? "زنده کردن برندها از طریق انیمیشن‌های پویا و داستان‌سرایی بصری." : "Bringing brands to life through dynamic animations and visual storytelling."
          },
          {
            title: "(03) Website design development",
            body: isFa ? "ساخت برنامه‌های وب قوی، مقیاس‌پذیر و با عملکرد بالا." : "Building robust, scalable, and high-performance web applications."
          },
          {
            title: "(04) Digital marketing solutions",
            body: isFa ? "کمپین‌های بازاریابی استراتژیک که رشد و تعامل را به همراه دارد." : "Strategic marketing campaigns that drive growth and engagement."
          },
          {
            title: "(05) Packaging design innovation",
            body: isFa ? "راه‌حل‌های بسته‌بندی نوآورانه که در قفسه‌ها برجسته می‌شوند." : "Innovative packaging solutions that stand out on shelves."
          }
        ]
  };

  return (
    <section className="py-32 bg-white text-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-24 max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full mb-6 w-fit">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
              {isFa ? "راه‌حل‌های ما" : "Our Solutions"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#02020a]">
            {content.heading[0]}
          </h2>
          <p className="text-2xl text-gray-600">
            {content.heading[1]}
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          {content.services.map((service: ServiceItem, i: number) => (
            <div
              key={i}
              onMouseEnter={() => setActiveRow(i)}
              className="group relative border-t border-gray-200 py-12 cursor-pointer transition-all hover:bg-gray-50/50"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                {/* Left: Number + Title */}
                <div className="flex items-center gap-8">
                  <span className="text-xs font-mono text-gray-400 min-w-[3rem]">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#02020a] group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>
                </div>
                
                {/* Center: Floating Image (Desktop Only) */}
                <div className={`hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ${
                  activeRow === i 
                    ? 'opacity-100 scale-100 z-10' 
                    : 'opacity-0 scale-95 z-0 pointer-events-none'
                }`}>
                  <div className="w-64 h-40 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl flex items-center justify-center text-white/20 border border-gray-700">
                    <span className="text-sm font-medium">Preview</span>
                  </div>
                </div>

                {/* Right: Description + Arrow */}
                <div className="flex items-center gap-4 md:ml-auto">
                  <p className={`text-sm text-gray-600 max-w-xs transition-all duration-300 ${
                    activeRow === i 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-4 hidden md:block'
                  }`}>
                    {service.body}
                  </p>
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                    activeRow === i 
                      ? 'bg-[#02020a] text-white border-[#02020a] scale-110' 
                      : 'bg-transparent border-gray-300 text-gray-400 group-hover:border-gray-400'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </section>
  );
}
