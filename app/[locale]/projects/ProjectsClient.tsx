"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Project } from "@/sanity/queries";
import Image from "next/image";

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const t = useTranslations("projects.page");

  return (
    <div className="pt-20">
      <Section>
        <Container>
          <div className="mb-20">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-text-main mb-4 sm:mb-6"
            >
              {t("title")}
            </h1>
            <p
              className="text-lg sm:text-xl text-text-muted-custom max-w-2xl"
            >
              {t("description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {projects.map((project) => (
              <div
                key={project._id}
              >
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="group block space-y-4 relative z-10"
                >
                  <div
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-500/20 to-slate-500/20 border border-border-subtle group-hover:border-border-subtle/50 transition-all duration-500`}
                  >
                    {project.thumbnail && (
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} - ${project.industry || 'Project'}`}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 pointer-events-none bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-text-main group-hover:text-accent-purple transition-colors">
                        {project.title}
                      </h3>
                      {project.industry && (
                        <span className="text-sm font-mono text-text-muted-custom">
                          {project.industry}
                        </span>
                      )}
                    </div>
                    {project.summary && (
                      <p className="text-text-muted-custom text-sm md:text-base line-clamp-2">
                        {project.summary}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
