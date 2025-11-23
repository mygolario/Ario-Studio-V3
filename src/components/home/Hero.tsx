import Link from 'next/link';

interface HeroProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function Hero({ data, lang }: HeroProps) {
  const isFa = lang === 'fa';
  
  // Fallback content if CMS data is missing
  const content = {
    tagline: isFa 
      ? (data?.hero?.taglineFa || "استودیوی طراحی و استراتژی دیجیتال")
      : (data?.hero?.taglineEn || "Digital design & brand strategy studio"),
    heading: isFa
      ? (data?.hero?.headingFa || "اینجا فقط استودیو نیست، نقطه شروع رشد برندهاست")
      : (data?.hero?.headingEn || "Not just a studio, the starting point of brand growth."),
    subtext: isFa
      ? (data?.hero?.subtextFa || "آریو استودیو کنار برندهای جاه‌طلب می‌ایستد تا از هویت و وبسایت تا تجربه‌ی کاربری و اتوماسیون هوش مصنوعی را یکپارچه و استراتژیک طراحی کند.")
      : (data?.hero?.subtextEn || "Ariostudio partners with ambitious brands to craft strategic identities, high-impact websites, and AI-powered digital experiences."),
    ctaPrimary: isFa ? "درخواست پروژه" : "Start a project",
    ctaSecondary: isFa ? "رزرو جلسه مشاوره" : "Book a consultation",
    services: ['Branding', 'Photography', 'Animation', 'Design'],
    watchText: isFa ? "تماشای معرفی استودیو" : "Watch studio reel",
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className={`space-y-8 ${isFa ? 'order-2 lg:order-1' : ''}`}>
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-primary">
            {content.tagline}
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">
            {content.heading}
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            {content.subtext}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${lang}/request`}
              className="px-8 py-4 bg-white text-background rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              {content.ctaPrimary}
            </Link>
            <Link
              href="#"
              className="px-8 py-4 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-colors"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Visual / Services List */}
        <div className={`relative ${isFa ? 'order-1 lg:order-2' : ''} flex flex-col items-center lg:items-end justify-center`}>
           {/* Placeholder for Neon Image */}
           <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl border border-white/10 backdrop-blur-sm flex items-center justify-center mb-8">
              <span className="text-white/20 font-bold text-2xl">Neon Visual Placeholder</span>
           </div>

           {/* Services List (English only as requested for global feel) */}
           <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 items-end">
              {content.services.map((service, i) => (
                <span key={i} className="text-2xl font-bold text-white/10 uppercase tracking-widest hover:text-white/40 transition-colors cursor-default">
                  {service}
                </span>
              ))}
           </div>

           {/* Watch Button */}
           <button className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-background transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">{content.watchText}</span>
           </button>
        </div>
      </div>
    </section>
  );
}
