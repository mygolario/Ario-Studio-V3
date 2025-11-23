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
    <section className="py-20 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
          {heading}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clients.map((client, i) => (
            <div 
              key={i} 
              className="aspect-video bg-surface rounded-2xl flex items-center justify-center border border-white/5 hover:border-white/10 transition-colors group"
            >
              <span className="text-gray-500 font-bold text-lg group-hover:text-white transition-colors">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
