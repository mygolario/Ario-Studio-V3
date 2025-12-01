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

/**
 * Get fallback services based on locale
 * This ensures services display in the correct language when Sanity data is unavailable
 */
function getFallbackServices(locale: string): Service[] {
  if (locale === 'fa') {
    return [
      {
        id: "01",
        title: "طراحی وب‌سایت و لندینگ",
        subtitle: "تعالی بصری",
        description: "ما صفحات فرود و وب‌سایت‌های خیره‌کننده و با نرخ تبدیل بالا می‌سازیم که داستان برند شما را با دقت و ظرافت بازگو می‌کنند.",
        color: "bg-accent-purple",
        order: 0,
      },
      {
        id: "02",
        title: "سیستم بصری و برند",
        subtitle: "هویت طراحی",
        description: "سیستم‌های طراحی کامل، طراحی لوگو و دستورالعمل‌های برند که ثبات و جایگاه ممتاز را در تمام نقاط تماس تضمین می‌کنند.",
        color: "bg-accent-blue",
        order: 1,
      },
      {
        id: "03",
        title: "تجربه کاربری هدفمند",
        subtitle: "تجربه کاربری",
        description: "طراحی کاربر-محور که بر شفافیت، کاربردپذیری و دستیابی به اهداف تجاری ملموس از طریق رابط‌های بصری تمرکز دارد.",
        color: "bg-pink-500",
        order: 2,
      },
    ];
  }
  
  // English fallback
  return [
    {
      id: "01",
      title: "Website & Landing Design",
      subtitle: "Visual Excellence",
      description: "We craft visually stunning, high-converting landing pages and websites that tell your brand's story with precision and elegance.",
      color: "bg-accent-purple",
      order: 0,
    },
    {
      id: "02",
      title: "Brand & Visual System",
      subtitle: "Identity Design",
      description: "Complete design systems, logo design, and brand guidelines that ensure consistency and premium positioning across all touchpoints.",
      color: "bg-accent-blue",
      order: 1,
    },
    {
      id: "03",
      title: "UX for Real-Life Goals",
      subtitle: "User Experience",
      description: "User-centric design that focuses on clarity, usability, and achieving tangible business goals through intuitive interfaces.",
      color: "bg-pink-500",
      order: 2,
    },
  ];
}

/**
 * Get all services with fallback to translated static data
 * Maintains resilience pattern - if Sanity is unavailable, returns fallback services in the correct language
 * @param locale - The locale for translations (e.g., 'fa', 'en')
 */
export async function getAllServices(locale: string = 'en'): Promise<Service[]> {
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
  
  // Fallback to translated services
  return getFallbackServices(locale);
}

/**
 * Get featured services with fallback to translated static data
 * Maintains resilience pattern - if Sanity is unavailable or has no featured services, returns fallback
 * @param locale - The locale for translations (e.g., 'fa', 'en')
 */
export async function getFeaturedServices(locale: string = 'en'): Promise<Service[]> {
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
  
  // Fallback to translated services (show all fallback services as featured)
  return getFallbackServices(locale);
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

