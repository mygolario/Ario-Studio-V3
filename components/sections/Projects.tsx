"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Lumina Finance",
    category: "Fintech",
    slug: "lumina-finance",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "Nebula AI",
    category: "Artificial Intelligence",
    slug: "nebula-ai",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Velox Motors",
    category: "Automotive",
    slug: "velox-motors",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 4,
    title: "Aether Architecture",
    category: "Real Estate",
    slug: "aether-architecture",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
];

export function Projects() {
  return (
    <Section id="projects">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Selected Works
            </motion.h2>
            <p className="text-white/60 max-w-md">
              A curated selection of our most recent digital products and
              experiences.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/projects" className="group">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div
                  className={`relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} border border-white/5 group-hover:border-white/20 transition-all duration-500`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-sm font-medium text-white/60 mb-2 block">
                      {project.category}
                    </span>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">
                        {project.title}
                      </h3>
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-sm font-medium">
                        Preview <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
