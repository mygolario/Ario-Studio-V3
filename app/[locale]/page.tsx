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
import { draftMode } from 'next/headers';
import { 
  getFeaturedServices, 
  getAllProjects, 
  getAllTestimonials,
  getSiteSettings 
} from "@/sanity/queries";

const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services));
const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => mod.Projects));
const About = dynamic(() => import("@/components/sections/About").then(mod => mod.About));
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA").then(mod => mod.ContactCTA));

type PageProps = {
  params: { locale: string };
};

export default async function Home({ params }: PageProps) {
  const { isEnabled } = draftMode();
  
  // Fetch all data from Sanity in parallel
  // Note: Homepage doesn't need draft preview, but we check for consistency
  const [siteSettings, featuredServices, projects, testimonials] = await Promise.all([
    getSiteSettings(),
    getFeaturedServices(),
    getAllProjects(),
    getAllTestimonials(),
  ]);

  // Limit projects to 3-4 for homepage
  const featuredProjects = projects.slice(0, 4);
  
  // Limit testimonials to 3 for homepage
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="flex flex-col gap-0">
      <Hero 
        siteSettings={siteSettings}
      />
      <Services services={featuredServices} />
      <Projects projects={featuredProjects} />
      <About />
      <ContactCTA />
    </div>
  );
}
