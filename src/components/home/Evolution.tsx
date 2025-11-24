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
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Typography */}
          <div className="relative">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6 w-fit">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                {isFa ? "تکامل" : "Evolution"}
              </span>
            </div>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none mb-8">
              <span className="block text-white">{content.heading1}</span>
              <span className="block text-gray-600">{content.heading2}</span>
            </h2>
            {/* Floating Decorative Element */}
            <div className="absolute top-1/2 -right-8 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-2xl opacity-50 animate-pulse" />
          </div>

          {/* Right: Content & Stats */}
          <div className="flex flex-col justify-center space-y-12">
            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
              {content.paragraph}
            </p>
            
            <Link
              href={`/${lang}/request`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-background rounded-full font-bold hover:bg-gray-100 transition-all w-fit shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
            >
              <span>{content.cta}</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 border-t border-white/10">
              {content.stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
