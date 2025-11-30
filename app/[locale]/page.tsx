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
