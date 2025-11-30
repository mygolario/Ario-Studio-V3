/**
 * ROUTE: /fa and /en (homepage)
 * 
 * This is the main homepage component that renders for both Farsi (/fa) and English (/en) locales.
 * The route is handled by the [locale] dynamic segment.
 * 
 * DESIGN STATUS: CURRENT_MAIN_HOMEPAGE_FA / CURRENT_MAIN_HOMEPAGE_EN
 * - This component renders the new light, white-background homepage design
 * - Supports both Farsi (RTL) and English (LTR) languages
 * - The actual theme (light/dark) is controlled by the ThemeProvider in layout.tsx
 * - Defaults to light theme (defaultTheme="light") for the new design
 * 
 * COMPONENTS RENDERED:
 * - Hero section
 * - Services section
 * - Projects section
 * - About section
 * - Contact CTA section
 */

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
