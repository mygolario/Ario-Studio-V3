import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getAllProjects } from "@/lib/projects-data";

type PageProps = {
  params: { locale: string };
};

export default async function Home({ params }: PageProps) {
  const { locale } = params;
  const projects = await getAllProjects();

  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Services />
      <Projects projects={projects} locale={locale} />
      <About />
      <ContactCTA />
    </div>
  );
}
