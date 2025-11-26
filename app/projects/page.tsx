"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allProjects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <Section>
        <Container>
          <div className="mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Our Work
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/60 max-w-2xl"
            >
              A collection of digital experiences crafted with precision, passion,
              and a focus on user impact.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block space-y-4"
                >
                  <div
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} border border-white/5 group-hover:border-white/20 transition-all duration-500`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent-purple transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-sm font-mono text-white/40">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
