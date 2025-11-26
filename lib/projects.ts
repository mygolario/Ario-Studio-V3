export interface Project {
  id: number;
  title: string;
  category: string;
  slug: string;
  gradient: string;
  description: string;
  client: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string;
  images: string[];
}

export const allProjects: Project[] = [
  {
    id: 1,
    title: "Lumina Finance",
    category: "Fintech",
    slug: "lumina-finance",
    gradient: "from-blue-500/20 to-cyan-500/20",
    description: "Next-gen dashboard for crypto portfolio management.",
    client: "Lumina Labs",
    year: "2024",
    services: ["UI/UX Design", "Frontend Development", "Data Visualization"],
    challenge:
      "Lumina needed a way to simplify complex crypto portfolio data for retail investors without sacrificing professional-grade tools. The existing market solutions were either too simple or overly technical.",
    solution:
      "We designed a modular dashboard system that allows users to customize their view. We used advanced data visualization libraries to create interactive charts that are both beautiful and performant. The interface uses a dark mode aesthetic to reduce eye strain during long trading sessions.",
    results:
      "Since launch, Lumina has seen a 40% increase in daily active users and a 25% increase in session duration. The new design has been praised for its clarity and ease of use.",
    images: ["/projects/lumina-1.jpg", "/projects/lumina-2.jpg"],
  },
  {
    id: 2,
    title: "Nebula AI",
    category: "Artificial Intelligence",
    slug: "nebula-ai",
    gradient: "from-purple-500/20 to-pink-500/20",
    description: "Generative AI platform for enterprise content creation.",
    client: "Nebula Corp",
    year: "2023",
    services: ["Product Design", "Brand Identity", "Next.js Development"],
    challenge:
      "Nebula AI wanted to differentiate themselves from the sea of AI tools. They needed a brand and interface that felt 'human-centric' yet futuristic, avoiding the cold, robotic tropes of AI.",
    solution:
      "We created a 'glassmorphism' inspired interface with soft, organic gradients that breathe and move. The user experience focuses on conversation and collaboration, making the AI feel like a partner rather than a tool.",
    results:
      "Nebula AI secured Series A funding shortly after the redesign. The platform is now used by Fortune 500 marketing teams for content generation.",
    images: ["/projects/nebula-1.jpg", "/projects/nebula-2.jpg"],
  },
  {
    id: 3,
    title: "Velox Motors",
    category: "Automotive",
    slug: "velox-motors",
    gradient: "from-orange-500/20 to-red-500/20",
    description: "Electric vehicle configurator and booking system.",
    client: "Velox Auto",
    year: "2024",
    services: ["3D WebGL", "E-commerce", "Performance Optimization"],
    challenge:
      "Velox needed a web-based configurator that could rival native apps in visual fidelity. Performance was a major concern, as the 3D models were highly detailed.",
    solution:
      "We utilized React Three Fiber and custom shaders to build a lightweight yet photorealistic 3D viewer. We implemented aggressive asset optimization and lazy loading to ensure the configurator loads in under 2 seconds.",
    results:
      "Pre-orders for the new model exceeded expectations by 200%. The configurator conversion rate is 3x higher than the industry average.",
    images: ["/projects/velox-1.jpg", "/projects/velox-2.jpg"],
  },
  {
    id: 4,
    title: "Aether Architecture",
    category: "Real Estate",
    slug: "aether-architecture",
    gradient: "from-emerald-500/20 to-teal-500/20",
    description: "Immersive 3D visualization for luxury properties.",
    client: "Aether Group",
    year: "2023",
    services: ["Web Design", "Interactive 3D", "Motion Graphics"],
    challenge:
      "Static images weren't doing justice to Aether's avant-garde architectural designs. They needed a way to let potential buyers 'feel' the space.",
    solution:
      "We built a scroll-based narrative experience that guides users through the properties. We combined video backgrounds, 3D walkthroughs, and cinematic typography to tell the story of each building.",
    results:
      "The average time on site increased to over 4 minutes. Aether reported a significant increase in qualified leads for their penthouse units.",
    images: ["/projects/aether-1.jpg", "/projects/aether-2.jpg"],
  },
  {
    id: 5,
    title: "Quantum Health",
    category: "Healthcare",
    slug: "quantum-health",
    gradient: "from-indigo-500/20 to-violet-500/20",
    description: "Telemedicine platform connecting patients with specialists.",
    client: "Quantum Med",
    year: "2024",
    services: ["UX Research", "Mobile App Design", "Accessibility"],
    challenge:
      "Healthcare apps are often clunky and confusing. Quantum wanted a seamless, reassuring experience for patients who might be anxious about their health.",
    solution:
      "We conducted extensive user research with elderly patients to ensure accessibility. The design uses calming colors, large typography, and clear, step-by-step flows to reduce cognitive load.",
    results:
      "Patient satisfaction scores hit 4.8/5. The app has one of the lowest drop-off rates in the telemedicine sector.",
    images: ["/projects/quantum-1.jpg", "/projects/quantum-2.jpg"],
  },
  {
    id: 6,
    title: "Nova Fashion",
    category: "E-commerce",
    slug: "nova-fashion",
    gradient: "from-rose-500/20 to-orange-500/20",
    description: "Sustainable fashion marketplace with AR try-on.",
    client: "Nova Inc",
    year: "2023",
    services: ["AR Integration", "Shopify Plus", "Brand Strategy"],
    challenge:
      "Online returns are a huge problem for fashion sustainability. Nova wanted to use technology to help customers pick the right size and style.",
    solution:
      "We integrated a web-based AR try-on feature that works on any smartphone camera. We also designed a 'transparency tracker' that shows the supply chain journey of each garment.",
    results:
      "Return rates dropped by 30%. The brand was featured in Vogue for its innovative approach to sustainable e-commerce.",
    images: ["/projects/nova-1.jpg", "/projects/nova-2.jpg"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
