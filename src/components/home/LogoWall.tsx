interface LogoWallProps {
  lang: 'en' | 'fa';
}

export default function LogoWall({ lang }: LogoWallProps) {
  const isFa = lang === 'fa';
  
  const heading = isFa 
    ? "مورد اعتماد برندها و استارتاپ‌هایی که روی طراحی سرمایه‌گذاری می‌کنند."
    : "Trusted by brands and startups that take design seriously.";

  const clients = [
    "Luminous", "FocalPoint", "Interlock", "Netzsche",
    "Capsule", "GlobalBank", "Segment", "Sisyphus"
  ];

  return (
    <section className="py-20 bg-background border-t border-white/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              {isFa ? "مشتریان ما" : "Our Clients"}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {heading}
          </h3>
        </div>
        
        {/* Client Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {clients.map((client, i) => (
            <div 
              key={i} 
              className="group aspect-video bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
            >
              <span className="text-gray-500 font-bold text-base md:text-lg group-hover:text-white transition-colors">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
