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
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Avatars */}
          <div className="flex -space-x-4 rtl:space-x-reverse justify-center lg:justify-start">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 rounded-full border-2 border-background bg-surface flex items-center justify-center text-xs text-gray-500">
                User {i}
              </div>
            ))}
            <div className="w-16 h-16 rounded-full border-2 border-background bg-surface flex items-center justify-center text-xs font-bold text-white">
              +2k
            </div>
          </div>

          {/* Text */}
          <div className="space-y-8">
             <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter text-white">
               Ariostudio
             </h2>
             <div className="text-lg lg:text-xl text-gray-400 leading-relaxed whitespace-pre-line">
               {content.description}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
