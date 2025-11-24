import Link from 'next/link';

interface HeroProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function Hero({ data, lang }: HeroProps) {
  const isFa = lang === 'fa';
  
  // Fallback content if CMS data is missing - matching template exactly
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
    ctaPrimary: isFa ? "بیایید صحبت کنیم" : "Lets Talk",
    services: data?.hero?.services || ['Branding', 'Photography', 'Animation', 'Design'],
    watchText: isFa ? "تماشای ویدیو" : "Watch video",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02020a]">
      {/* Background gradient effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          {/* Left: Text Content */}
          <div className={`space-y-8 ${isFa ? 'order-2 lg:order-1' : ''}`}>
            <h1 className="text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-white">
              {content.heading}
            </h1>
            
            <Link
              href={`/${lang}/request`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#02020a] rounded-full font-bold hover:bg-gray-100 transition-colors text-lg"
            >
              {content.ctaPrimary}
            </Link>
          </div>

          {/* Right: Visual with Services List */}
          <div className={`relative ${isFa ? 'order-1 lg:order-2' : ''} flex flex-col items-center lg:items-end`}>
            {/* Main Visual - VR Headset Image Placeholder */}
            <div className="relative w-full max-w-lg aspect-[4/5] mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 rounded-3xl blur-3xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-3xl border border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                {/* Placeholder for VR headset image */}
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white/20 font-medium text-sm">VR Headset Visual</span>
                </div>
              </div>
            </div>

            {/* Services List - Vertical on the right */}
            <div className="flex flex-col gap-6 items-end w-full max-w-xs">
              {content.services.map((service: string, i: number) => (
                <div
                  key={i}
                  className={`text-right w-full transition-all ${
                    i === 1 ? 'text-white font-bold text-xl' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {service}
                </div>
              ))}
            </div>

            {/* Watch Video Button - Bottom Right */}
            <button className="flex items-center gap-3 mt-8 group text-white/60 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-sm font-medium uppercase tracking-wider">{content.watchText}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
