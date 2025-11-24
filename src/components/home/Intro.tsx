interface IntroProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function Intro({ data, lang }: IntroProps) {
  const isFa = lang === 'fa';

  const content = {
    description: isFa
      ? (data?.intro?.descriptionFa || "ما در آریو استودیو یک استودیوی خلاق تمام‌خدمت هستیم که به برندهای رو‌به‌رشد کمک می‌کنیم تجربه‌های دیجیتالی بسازند که هم زیبا باشند و هم نتیجه بدهند. از اولین جرقه‌ی ایده تا لانچ و بهینه‌سازی، کنار شما هستیم تا هر تماس کاربر با برندتان، دقیق و طراحی‌شده اتفاق بیفتد.\n\nتمرکز ما روی وبسایت‌های پیشرفته، هویت‌های برند قدرتمند، و ادغام هوش مصنوعی در محصولات دیجیتال است.")
      : (data?.intro?.descriptionEn || "Ariostudio is a full-service creative studio partnering with ambitious brands to turn ideas into high-performing digital experiences. From first concept to launch, we design every touchpoint to feel intentional, seamless, and deeply aligned with your brand.\n\nWe specialize in advanced websites, distinctive brand identities, and AI-powered product experiences."),
  };

  return (
    <section id="about" className="py-32 bg-[#02020a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Icon + Description */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 w-fit mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                {isFa ? "درباره ما" : "About Us"}
              </span>
            </div>

            {/* Icon Grid */}
            <div className="w-20 h-20 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3 w-16 h-16">
                <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10" />
                <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-white/10" />
                <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-pink-500/30 to-orange-500/30 border border-white/10" />
                <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-orange-500/30 to-blue-500/30 border border-white/10" />
              </div>
            </div>
            
            {/* Description */}
            <div className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl whitespace-pre-line">
              {content.description}
            </div>
          </div>

          {/* Right: Large Studio Text + Stats */}
          <div className="flex flex-col items-end lg:items-start space-y-8">
            <div className="relative">
              <h2 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-none">
                Studio
              </h2>
              {/* Decorative Element */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">✨</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-lg font-medium">
                {isFa ? "مورد اعتماد" : "Trusted by"}
              </p>
              <p className="text-4xl font-bold text-white">
                15,000+
              </p>
              <p className="text-gray-400 text-lg">
                {isFa ? "بنیان‌گذار و صاحب کسب‌وکار" : "founders & business owners"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
