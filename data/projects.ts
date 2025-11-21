/**
 * Projects Data Source
 * 
 * Centralized data for all portfolio projects.
 * 
 * To add a new project:
 * 1. Add a new object to the projects array below
 * 2. Ensure it has all required fields (slug, title, etc.)
 * 3. The project will automatically appear in the Work section
 * 4. A case study page will be available at /work/[slug]
 */

export interface Project {
  slug: string
  title: string
  subtitle: string
  role: string
  tags: string[]
  thumbnail?: string // Optional: image path for card
  heroImage?: string // Optional: hero image for case study page
  overview: string
  problem: string
  solution: string
  stack: string[]
  highlights: string[]
  status: 'Live' | 'In development' | 'Internal project' | 'Concept'
  sections?: Array<{
    title: string
    content: string
  }>
}

export const projects: Project[] = [
  {
    slug: 'ario-account',
    title: 'Ario Account',
    subtitle: 'Digital marketplace for gaming and AI accounts with automated order handling',
    role: 'Design & Build',
    tags: ['Next.js', 'E-commerce', 'Automation', 'AI'],
    overview: 'A digital marketplace platform for selling gaming and AI accounts with fully automated order processing and delivery.',
    problem: 'Need for a scalable platform that can handle account sales, automated verification, and seamless user experience without manual intervention.',
    solution: 'Built a Next.js-based marketplace with automated order handling, AI-powered account verification, and a clean, conversion-focused UX.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'AI APIs'],
    highlights: [
      'Automated order processing and delivery',
      'AI-powered account verification system',
      'Clean, conversion-optimized checkout flow',
      'Real-time inventory management',
      'TODO: Add detailed description of the checkout flow and architecture',
    ],
    status: 'In development',
    sections: [
      {
        title: 'Architecture',
        content: 'TODO: Add detailed architecture overview including database schema, API structure, and automation workflows.',
      },
      {
        title: 'Key Features',
        content: 'TODO: Expand on key features like automated delivery, payment processing, and user dashboard.',
      },
    ],
  },
  {
    slug: 'ario-gold',
    title: 'Ario Gold',
    subtitle: 'Concept MVP for online gold purchase experience with clean UX and modern UI',
    role: 'Design & Frontend',
    tags: ['Next.js', 'E-commerce', 'UI/UX', 'MVP'],
    overview: 'A concept MVP for an online gold purchase experience featuring clean UX, modern UI, and streamlined checkout process.',
    problem: 'Traditional gold purchase platforms lack modern UX and clear value proposition. Need a clean, trustworthy interface that simplifies the purchase journey.',
    solution: 'Designed and built a modern MVP with focus on clarity, trust signals, and simplified purchase flow using Next.js and Tailwind CSS.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    highlights: [
      'Clean, trustworthy UI design',
      'Streamlined purchase flow',
      'Modern responsive layout',
      'Clear pricing and product information',
      'TODO: Add payment integration details and user testing results',
    ],
    status: 'Concept',
    sections: [
      {
        title: 'Design Process',
        content: 'TODO: Add design process details including user research, wireframes, and design iterations.',
      },
    ],
  },
  {
    slug: 'ario-studio',
    title: 'Ario Studio',
    subtitle: 'AI-native studio website with cinematic UX and motion-first design',
    role: 'Design & Build',
    tags: ['Next.js', 'GSAP', 'AI-native', 'Motion Design'],
    overview: 'This portfolio website itself—an AI-native studio site featuring cinematic UX, GSAP-powered animations, and a polished Day/Night theme system.',
    problem: 'Need a portfolio site that showcases our capabilities while demonstrating the quality of work we deliver. Must feel premium, trustworthy, and AI-native.',
    solution: 'Built a comprehensive portfolio site with GSAP motion system, theme switching, structured case study pages, and a polished Start Project form.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    highlights: [
      'Cinematic hero section with parallax and depth',
      'GSAP-based motion system for scroll reveals',
      'Day/Night theme system with smooth transitions',
      'Structured case study system',
      'Start Project form with validation',
    ],
    status: 'Live',
    sections: [
      {
        title: 'Motion System',
        content: 'Implemented a comprehensive GSAP-based motion system including hero intro animations, scroll-triggered reveals, and parallax effects.',
      },
      {
        title: 'Theme System',
        content: 'Created a token-based theme system with CSS variables for seamless Day/Night mode switching with smooth transitions.',
      },
    ],
  },
]

/**
 * Get a project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projects
}

