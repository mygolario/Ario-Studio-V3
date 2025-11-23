import Link from 'next/link';

interface PortfolioGridProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function PortfolioGrid({ data, lang }: PortfolioGridProps) {
  const isFa = lang === 'fa';

  const heading = isFa
    ? "نمایش کارهای خلاق که رشد را الهام می‌دهند"
    : "Showcasing creative work that inspires growth.";

  const projects = [
    { title: "Chromore", year: "2024", image: "bg-blue-900" },
    { title: "Gareos", year: "2024", image: "bg-orange-900" },
    { title: "Movtreh", year: "2024", image: "bg-yellow-900" },
    { title: "Fueltec", year: "2024", image: "bg-slate-800" },
  ];

  return (
    <section className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-20 max-w-2xl mx-auto">
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <Link key={i} href="#" className="group block">
              <div className={`aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden relative ${project.image}`}>
                 {/* Placeholder Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                 
                 <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <h3 className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
                      {project.title}
                    </h3>
                    <span className="text-sm font-mono text-gray-400">
                      /{project.year}
                    </span>
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
