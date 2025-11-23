interface KeyStrengthsProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function KeyStrengths({ data, lang }: KeyStrengthsProps) {
  const isFa = lang === 'fa';

  const strengths = isFa
    ? [
        { title: "استودیوی برنده‌جوایز", body: "ما با استانداردهای جهانی طراحی می‌کنیم، حتی اگر پروژه برای یک بیزنس محلی باشد." },
        { title: "چشم‌انداز تا اجرا", body: "از استراتژی برند تا آخرین پیکسل صفحه، همه‌چیز در یک مسیر منسجم طراحی می‌شود." },
        { title: "طراحی تأثیرگذار", body: "طراحی‌هایی که فقط توجه جلب نمی‌کنند؛ رفتار کاربر را هدایت می‌کنند و در ذهن می‌مانند." }
      ]
    : [
        { title: "Award-winning mindset", body: "We design to global standards, even when the project is for a local business." },
        { title: "Vision realized", body: "From brand strategy to the last pixel on screen, everything follows a single, coherent direction." },
        { title: "Impactful design", body: "Designs that don’t just look good, but guide user behavior and stay memorable." }
      ];

  return (
    <section className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strengths.map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-surface border border-white/5 hover:border-white/20 transition-colors group">
              <div className="w-12 h-12 mb-8 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <div className="w-6 h-6 bg-current rounded-full opacity-50" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
