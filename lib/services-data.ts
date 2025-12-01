import { getAllServices as fetchSanityServices } from "@/sanity/queries";
import type { Service as SanityService } from "@/sanity/queries";

export type Service = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
};

// Fallback services (from translations)
const fallbackServices: Service[] = [
  {
    id: "01",
    title: "UI/UX Design",
    subtitle: "User Experience",
    description: "Creating intuitive and beautiful user interfaces.",
    color: "bg-accent-purple",
    order: 0,
  },
  {
    id: "02",
    title: "Frontend Development",
    subtitle: "Modern Web",
    description: "Building fast and responsive web applications.",
    color: "bg-accent-blue",
    order: 1,
  },
  {
    id: "03",
    title: "Brand Identity",
    subtitle: "Visual Design",
    description: "Crafting memorable brand experiences.",
    color: "bg-pink-500",
    order: 2,
  },
];

export async function getAllServices(): Promise<Service[]> {
  try {
    const sanityServices = await fetchSanityServices();
    if (sanityServices.length > 0) {
      return sanityServices.map((s: SanityService) => ({
        id: s.slug?.current || s._id,
        title: s.title,
        subtitle: s.shortDescription || '',
        description: '', // Service description is not in the current query, add if needed
        color: getServiceColorClass(s.tier),
        order: s.orderRank || 0,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch services from Sanity, falling back to default data", e);
  }
  
  // Fallback to default services
  return fallbackServices;
}

// Helper to map Sanity tier to Tailwind color classes
function getServiceColorClass(tier?: 'Starter' | 'Growth' | 'Elite') {
  switch (tier) {
    case 'Starter':
      return 'bg-accent-blue';
    case 'Growth':
      return 'bg-accent-purple';
    case 'Elite':
      return 'bg-pink-500';
    default:
      return 'bg-gray-500';
  }
}

