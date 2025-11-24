import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface PortfolioGridProps {
  data: any;
  lang: 'en' | 'fa';
}

interface ProjectItem {
  title: string;
  year: string;
  slug: string;
  image: string | null;
}

export default function PortfolioGrid({ data, lang }: PortfolioGridProps) {
  const isFa = lang === 'fa';

  const heading = isFa
    ? "نمایش کارهای خلاق که رشد را الهام می‌دهند"
    : "Showcasing creative work that inspires growth.";

  // Get projects from CMS or use fallback
  const projectsFromCMS = data?.portfolioHighlight || [];
  const projects: ProjectItem[] = projectsFromCMS.length > 0
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
    'from-blue-600/90 via-blue-700/80 to-blue-800/90',
    'from-orange-600/90 via-orange-700/80 to-orange-800/90',
    'from-purple-600/90 via-purple-700/80 to-purple-800/90',
    'from-emerald-600/90 via-emerald-700/80 to-emerald-800/90',
  ];

  return (
    <section id="work" className="py-32 bg-[#02020a] border-t border-white/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              {isFa ? "نمونه کارها" : "Portfolio"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto text-white leading-tight">
            {heading}
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project: ProjectItem, i: number) => (
            <Link 
              key={i} 
              href={project.slug ? `/${lang}/work/${project.slug}` : '#'} 
              className="group block"
            >
              <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden relative">
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                
                {/* Image or Gradient Background */}
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${gradientColors[i % gradientColors.length]} group-hover:scale-110 transition-transform duration-700`} />
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex justify-between items-end gap-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
                      {project.title}
                    </h3>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-mono text-gray-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        /{project.year}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
