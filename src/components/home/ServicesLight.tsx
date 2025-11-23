'use client';
import { useState } from 'react';

interface ServicesLightProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function ServicesLight({ data, lang }: ServicesLightProps) {
  const isFa = lang === 'fa';
  const [activeRow, setActiveRow] = useState(1);

  const content = {
    heading: isFa
      ? ["ما برای رشد محصولات دیجیتال شما راه‌حل‌های ویژه طراحی می‌کنیم.", "از صفر تا مقیاس جهانی، همراه برندتان هستیم."]
      : ["We take creative leaps and offer tailored solutions for the growth of your digital products.", "From scratch to success and beyond."],
    services: [
      {
        title: "Branding identity",
        body: isFa ? "نام، هویت بصری و سیستم گرافیکی برند شما را از پایه طراحی می‌کنیم." : "Crafting memorable identities for modern digital brands."
      },
      {
        title: "UI/UX design",
        body: isFa ? "طراحی تجربه و رابط کاربری محصولات وب و موبایل با تمرکز روی رفتار واقعی کاربر." : "Designing impactful journeys for ambitious modern brands."
      },
      {
        title: "Web development",
        body: isFa ? "توسعه وبسایت‌های سریع، امن و قابل مقیاس با جدیدترین تکنولوژی‌ها." : "Building robust, scalable, and high-performance web applications."
      },
      {
        title: "Visual design",
        body: isFa ? "طراحی‌های بصری، گرافیک و محتوای تصویری برای کمپین‌ها و لانچ‌های مهم." : "Creating stunning visual assets that capture attention and drive engagement."
      }
    ]
  };

  return (
    <section className="py-32 bg-white text-background">
      <div className="container mx-auto px-6">
        <div className="mb-24 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
            {content.heading[0]}
          </h2>
          <p className="text-2xl text-gray-500">
            {content.heading[1]}
          </p>
        </div>

        <div className="space-y-0">
          {content.services.map((service, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveRow(i)}
              className="group relative border-t border-gray-200 py-12 cursor-pointer transition-all hover:bg-gray-50"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                   <span className="text-xs font-mono text-gray-400">0{i + 1}</span>
                   <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                
                {/* Active State Content */}
                <div className={`md:absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 transition-opacity duration-300 ${activeRow === i ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>
                   {/* Floating Image Placeholder */}
                   <div className="w-64 h-40 bg-gray-900 rounded-xl shadow-2xl flex items-center justify-center text-white/20">
                      Image
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <p className={`text-sm text-gray-500 max-w-xs transition-opacity duration-300 ${activeRow === i ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>
                     {service.body}
                   </p>
                   <div className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${activeRow === i ? 'bg-black text-white border-black' : ''}`}>
                     →
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
