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

  const icons = ['✨', '🎯', '💎']; // Award, Vision, Impact icons

  return (
    <section className="py-32 bg-[#02020a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strengths.map((item: StrengthItem, i: number) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group hover:bg-white/10">
              <div className="w-16 h-16 mb-8 bg-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {icons[i] || '✨'}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
