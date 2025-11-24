import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface IdentityHighlightProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function IdentityHighlight({ data, lang }: IdentityHighlightProps) {
  const isFa = lang === 'fa';

  const identityData = data?.identityHighlight || {};
  const content = {
    heading: isFa 
      ? (identityData.headingFa || "طراحی سفرهای تأثیرگذار برای برندهای جسور دیجیتال")
      : (identityData.headingEn || "Designing impactful journeys for ambitious modern brands."),
    paragraph: isFa
      ? (identityData.paragraphFa || "ما هویت‌هایی می‌سازیم که در همه‌ی نقاط تماس با کاربر، قابل تشخیص، سازگار و ماندگار باشند.")
      : (identityData.paragraphEn || "We create identities that are timeless, adaptable, and built to thrive across every platform."),
    links: isFa
      ? ["استراتژی برند", "تحقیقات بازار"]
      : ["Brand strategy", "Market research"],
    image: identityData.image ? urlFor(identityData.image).width(800).height(1000).url() : null,
  };

  return (
    <section className="py-32 bg-white text-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-900/20 to-gray-800/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity" />
            
            <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
              {content.image ? (
                <img 
                  src={content.image} 
                  alt="Identity"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">Identity Visual</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full mb-6 w-fit">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                {isFa ? "هویت برند" : "Brand Identity"}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#02020a]">
              {content.heading}
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {content.paragraph}
            </p>
            
            {/* Links */}
            <div className="space-y-2 pt-8 border-t border-gray-200">
              {content.links.map((link, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex items-center justify-between py-4 px-4 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 group transition-all"
                >
                  <span className="text-lg font-bold text-[#02020a] group-hover:text-gray-800">
                    {link}
                  </span>
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
            
            {/* Stats */}
            <div className="pt-8 border-t border-gray-200">
              <div className="text-6xl md:text-7xl font-bold tracking-tighter text-[#02020a] mb-2">
                150+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">
                {isFa ? "هویت برند منحصر به فرد" : "Unique brand identities"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
