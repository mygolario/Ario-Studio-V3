import Link from 'next/link';

interface EvolutionProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function Evolution({ data, lang }: EvolutionProps) {
  const isFa = lang === 'fa';

  const evolutionData = data?.evolution || {};
  const content = {
    heading1: isFa ? "تکامل" : "Evolution",
    heading2: isFa ? "از طریق طراحی" : "through design",
    paragraph: isFa
      ? (evolutionData.paragraphFa || "استودیوی ما تفکر استراتژیک، طراحی تجربی و هوش مصنوعی را به هم متصل می‌کند تا برند شما را به یک سیستم زنده تبدیل کند که می‌تواند رشد کند، سازگار شود و مقیاس‌پذیر باشد.")
      : (evolutionData.paragraphEn || "Our studio connects strategic thinking, experiential design, and AI to turn your brand into a living system that can grow, adapt, and scale."),
    cta: isFa ? "درخواست پروژه" : "Start a project",
    stats: isFa
      ? [
          { label: "پروژه‌ی تکمیل‌شده", value: "200k+" },
          { label: "جایزه‌ی طراحی", value: "150+" },
          { label: "رضایت مشتری", value: "99%" },
          { label: "سال تجربه‌ی جمعی تیم", value: "25+" },
        ]
      : [
          { label: "Projects completed", value: "200k+" },
          { label: "Awards won", value: "150+" },
          { label: "Client satisfaction", value: "99%" },
          { label: "Years of experience", value: "25+" },
        ],
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
           {/* Visual / Typography */}
           <div className="relative">
              <h2 className="text-7xl lg:text-9xl font-bold tracking-tighter leading-none">
                <span className="block">{content.heading1}</span>
                <span className="block text-gray-600">{content.heading2}</span>
              </h2>
              {/* Floating Elements Placeholder */}
              <div className="absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-50 animate-pulse" />
           </div>

           {/* Content & Stats */}
           <div className="flex flex-col justify-center space-y-12">
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                {content.paragraph}
              </p>
              
              <Link
                href={`/${lang}/request`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-background rounded-full font-bold hover:bg-gray-200 transition-colors w-fit"
              >
                {content.cta}
              </Link>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 border-t border-white/10">
                {content.stats.map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
