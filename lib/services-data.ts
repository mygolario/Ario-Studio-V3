import { 
  getAllServices as fetchSanityServices,
  getFeaturedServices as fetchFeaturedServices 
} from "@/sanity/queries";
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

/**
 * Get all services with fallback to static data
 * Maintains resilience pattern - if Sanity is unavailable, returns fallback services
 */
export async function getAllServices(): Promise<Service[]> {
  try {
    const sanityServices = await fetchSanityServices();
    if (sanityServices.length > 0) {
      return sanityServices.map((s: SanityService) => ({
        id: s.slug?.current || s._id,
        title: s.title,
        subtitle: s.shortDescription || '', // Use shortDescription only, not tier
        description: s.shortDescription || '', // Use shortDescription for description
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

/**
 * Get featured services with fallback to static data
 * Maintains resilience pattern - if Sanity is unavailable or has no featured services, returns fallback
 */
export async function getFeaturedServices(): Promise<Service[]> {
  try {
    const sanityServices = await fetchFeaturedServices();
    if (sanityServices.length > 0) {
      return sanityServices.map((s: SanityService) => ({
        id: s.slug?.current || s._id,
        title: s.title,
        subtitle: s.shortDescription || '', // Use shortDescription only, not tier
        description: s.shortDescription || '', // Use shortDescription for description
        color: getServiceColorClass(s.tier),
        order: s.orderRank || 0,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch featured services from Sanity, falling back to default data", e);
  }
  
  // Fallback to default services (show all fallback services as featured)
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

