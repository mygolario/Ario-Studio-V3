interface KeyStrengthsProps {
  data: any;
  lang: 'en' | 'fa';
}

interface StrengthItem {
  title: string;
  body: string;
}

export default function KeyStrengths({ data, lang }: KeyStrengthsProps) {
  const isFa = lang === 'fa';

  // Get strengths from CMS or use fallback
  const strengthsFromCMS = data?.strengths || [];
  const strengths: StrengthItem[] = strengthsFromCMS.length > 0
    ? strengthsFromCMS.map((s: any) => ({
        title: isFa ? s.titleFa : s.titleEn,
        body: isFa ? s.bodyFa : s.bodyEn,
      }))
    : (isFa
      ? [
          { title: "آژانس برنده جایزه", body: "ما با استانداردهای جهانی طراحی می‌کنیم، حتی اگر پروژه برای یک بیزنس محلی باشد." },
          { title: "چشم‌انداز محقق شده", body: "از استراتژی برند تا آخرین پیکسل صفحه، همه‌چیز در یک مسیر منسجم طراحی می‌شود." },
          { title: "طراحی تأثیرگذار", body: "طراحی‌هایی که فقط توجه جلب نمی‌کنند؛ رفتار کاربر را هدایت می‌کنند و در ذهن می‌مانند." }
        ]
      : [
          { title: "Award winning agency", body: "We design to global standards, even when the project is for a local business." },
          { title: "Vision realized", body: "From brand strategy to the last pixel on screen, everything follows a single, coherent direction." },
          { title: "Impactful design", body: "Designs that don't just look good, but guide user behavior and stay memorable." }
        ]);

  const icons = ['✨', '🎯', '💎'];
  const gradients = [
    'from-blue-500/20 to-purple-500/20',
    'from-purple-500/20 to-pink-500/20',
    'from-pink-500/20 to-orange-500/20',
  ];

  return (
    <section className="py-32 bg-[#02020a] border-t border-white/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              {isFa ? "نقاط قوت ما" : "Our Strengths"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto">
            {isFa 
              ? "چرا آریو استودیو را انتخاب کنید؟"
              : "Why Choose Ariostudio?"
            }
          </h2>
        </div>

        {/* Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {strengths.map((item: StrengthItem, i: number) => (
            <div 
              key={i} 
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 backdrop-blur-sm"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${gradients[i]} rounded-2xl flex items-center justify-center text-3xl border border-white/10 group-hover:scale-110 transition-transform`}>
                  {icons[i] || '✨'}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                
                {/* Body */}
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
