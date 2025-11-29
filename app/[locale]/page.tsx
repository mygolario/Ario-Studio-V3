import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero";
import { getAllProjects } from "@/lib/projects-data";

const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services));
const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => mod.Projects));
const About = dynamic(() => import("@/components/sections/About").then(mod => mod.About));
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA").then(mod => mod.ContactCTA));

// Force static generation with revalidation
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

type PageProps = {
  params: { locale: string };
};

export default async function Home({ params }: PageProps) {
  const projects = await getAllProjects();

  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Services />
      <Projects projects={projects} />
      <About />
      <ContactCTA />
    </div>
  );
}
