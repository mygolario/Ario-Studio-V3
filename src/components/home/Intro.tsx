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
    <section className="py-32 bg-[#02020a]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Icon + Description */}
          <div className="space-y-8">
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2 w-12 h-12">
                <div className="w-5 h-5 rounded-full bg-white/20" />
                <div className="w-5 h-5 rounded-full bg-white/20" />
                <div className="w-5 h-5 rounded-full bg-white/20" />
                <div className="w-5 h-5 rounded-full bg-white/20" />
              </div>
            </div>
            
            {/* Description */}
            <div className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl whitespace-pre-line">
              {content.description}
            </div>
          </div>

          {/* Right: Large Studio Text + Stats */}
          <div className="flex flex-col items-end lg:items-start space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-8xl lg:text-9xl font-bold tracking-tighter text-white">
                Studio
              </h2>
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-purple-500/30">
                <span className="text-3xl">😊</span>
              </div>
            </div>
            <p className="text-gray-400 text-lg">
              {isFa ? "مورد اعتماد ۱۵,۰۰۰+ بنیان‌گذار و صاحب کسب‌وکار" : "Trusted by 15,000+ founders & business owners"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
