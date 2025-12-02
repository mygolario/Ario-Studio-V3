/**
 * CURRENT_MAIN_HOMEPAGE - Light/White Design (Apple-like)
 * 
 * ROUTE: /fa (Farsi) and /en (English)
 * This is the main homepage component that serves both locales via dynamic [locale] route.
 * 
 * DESIGN:
 * - ✅ Defaults to LIGHT theme (via layout.tsx defaultTheme="light")
 * - Light/white background (#f5f5f7) - Apple-like design (ACTIVE)
 * - Dark theme is legacy but still available via theme toggle for users who prefer it
 * 
 * LANGUAGE:
 * - Handles both Farsi (fa) and English (en) via next-intl
 * - Locale is passed via params.locale from the [locale] dynamic route segment
 * - Both languages use the same component, just different translations
 * 
 * RENDERING:
 * - Renders: Hero, Services, Projects, About, ContactCTA sections
 * - All components are dynamically imported for performance
 * 
 * ACCESS PATHS:
 * - / → Middleware always redirects to /fa (light Farsi homepage)
 * - /fa → This component with locale='fa' (Farsi, light theme)
 * - /en → This component with locale='en' (English, light theme)
 */

import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero";
import { getFeaturedServices } from "@/lib/services-data";
import { getAllProjects } from "@/lib/projects-data";

const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services));
const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => mod.Projects));
const About = dynamic(() => import("@/components/sections/About").then(mod => mod.About));
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA").then(mod => mod.ContactCTA));

type PageProps = {
  params: { locale: string };
};

export default function Home({ params }: PageProps) {
  // Get static data
  const featuredServices = getFeaturedServices(params.locale);
  const projects = getAllProjects();
  
  // Limit projects to 4 for homepage
  const featuredProjects = projects.slice(0, 4);

  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Services services={featuredServices} />
      <Projects projects={featuredProjects} />
      <About />
      <ContactCTA />
    </div>
  );
}
