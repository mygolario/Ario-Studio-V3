'use client';
import { useState } from 'react';

interface ServicesDarkProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function ServicesDark({ data, lang }: ServicesDarkProps) {
  const isFa = lang === 'fa';
  const [activeService, setActiveService] = useState(1);

  const content = {
    heading: isFa 
      ? "ایده‌های جسورانه و اجرای دقیق که رشد قابل اندازه‌گیری می‌سازد"
      : "Innovative ideas and bold execution that drive measurable growth.",
    description: isFa
      ? "ما ترکیب استراتژی، دیزاین و تکنولوژی را ارائه می‌دهیم تا هر وبسایت و هر هویت بصری، فقط زیبا نباشد؛ برای بیزنس شما کار کند."
      : "We combine strategy, design, and technology to ensure every website and visual identity isn't just beautiful—it works for your business.",
    services: [
      "Interactive design experiences",
      "Motion graphics production",
      "Website design development",
      "Digital marketing solutions",
      "Packaging design innovation"
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
          {/* Visual */}
          <div className="relative aspect-[4/5] bg-surface rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50" />
             <span className="text-white/20 font-bold text-2xl relative z-10">Service Visual {activeService + 1}</span>
          </div>

          {/* List */}
          <div className="space-y-2">
            {content.services.map((service, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveService(i)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                  activeService === i 
                    ? 'bg-white text-background scale-105 shadow-lg shadow-white/5' 
                    : 'hover:bg-surface text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono opacity-50">0{i + 1}</span>
                  <span className="text-xl font-bold">{service}</span>
                </div>
                <span className={`transform transition-transform ${activeService === i ? 'rotate-0' : '-rotate-45 opacity-0 group-hover:opacity-100'}`}>
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
