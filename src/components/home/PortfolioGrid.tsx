import Link from 'next/link';

interface PortfolioGridProps {
  data: any;
  lang: 'en' | 'fa';
}

import { urlFor } from '@/sanity/lib/image';

export default function PortfolioGrid({ data, lang }: PortfolioGridProps) {
  const isFa = lang === 'fa';

  const heading = isFa
    ? "نمایش کارهای خلاق که رشد را الهام می‌دهند"
    : "Showcasing creative work that inspires growth.";

  // Get projects from CMS or use fallback
  const projectsFromCMS = data?.portfolioHighlight || [];
  const projects = projectsFromCMS.length > 0
    ? projectsFromCMS.map((p: any) => ({
        title: p.title || 'Project',
        year: p.year || '2024',
        slug: p.slug?.current || '',
        image: p.coverImage ? urlFor(p.coverImage).width(800).height(600).url() : null,
      }))
    : [
        { title: "Chromore", year: "2024", slug: "chromore", image: null },
        { title: "Gareos", year: "2024", slug: "gareos", image: null },
        { title: "Movtreh", year: "2024", slug: "movtreh", image: null },
        { title: "Fueltec", year: "2024", slug: "fueltec", image: null },
      ];

  const gradientColors = [
    'from-blue-900/80 to-blue-700/60',
    'from-orange-900/80 to-orange-700/60',
    'from-yellow-900/80 to-yellow-700/60',
    'from-slate-800/80 to-slate-700/60',
  ];

  return (
    <section className="py-32 bg-[#02020a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-20 max-w-2xl mx-auto text-white">
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <Link 
              key={i} 
              href={project.slug ? `/${lang}/work/${project.slug}` : '#'} 
              className="group block"
            >
              <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden relative">
                {/* Image or Gradient Background */}
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${gradientColors[i % gradientColors.length]}`} />
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                {/* Content */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <h3 className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
                    {project.title}
                  </h3>
                  <span className="text-sm font-mono text-gray-300">
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
