import { sanityClient } from "./sanity";
import { SERVICES_QUERY } from "./sanity-queries";
import type { SanityDocument } from "next-sanity";

export type Service = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
};

type SanityService = {
  _id: string;
  title?: string;
  titleEn?: string;
  titleFa?: string;
  subtitle?: string;
  subtitleEn?: string;
  subtitleFa?: string;
  description?: string;
  descriptionEn?: string;
  descriptionFa?: string;
  color?: string;
  order?: number;
  icon?: string;
};

/**
 * Get static services based on locale
 * Returns hardcoded service data in the appropriate language
 */
function getStaticServices(locale: string): Service[] {
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

// Helper to map Sanity service to our Service type
function mapSanityService(sanityService: SanityService, locale: string): Service {
  const isFa = locale === 'fa';
  
  return {
    id: sanityService._id,
    title: isFa 
      ? (sanityService.titleFa || sanityService.title || "")
      : (sanityService.titleEn || sanityService.title || ""),
    subtitle: isFa
      ? (sanityService.subtitleFa || sanityService.subtitle || "")
      : (sanityService.subtitleEn || sanityService.subtitle || ""),
    description: isFa
      ? (sanityService.descriptionFa || sanityService.description || "")
      : (sanityService.descriptionEn || sanityService.description || ""),
    color: sanityService.color || "bg-accent-purple",
    order: sanityService.order ?? 0,
  };
}

/**
 * Get all services - fetches from Sanity with fallback to static data
 * @param locale - The locale for translations (e.g., 'fa', 'en')
 */
export async function getAllServices(locale: string = 'en'): Promise<Service[]> {
  try {
    const sanityServices = await sanityClient.fetch<SanityDocument[]>(SERVICES_QUERY);
    
    if (sanityServices && sanityServices.length > 0) {
      return sanityServices.map(service => mapSanityService(service, locale));
    }
    
    // Fallback to static data if no Sanity services found
    console.log('[getAllServices] No Sanity services found, using static data');
    return getStaticServices(locale);
  } catch (error) {
    console.error('[getAllServices] Error fetching from Sanity, using static data:', error);
    return getStaticServices(locale);
  }
}

/**
 * Get featured services - fetches from Sanity with fallback to static data
 * @param locale - The locale for translations (e.g., 'fa', 'en')
 */
export async function getFeaturedServices(locale: string = 'en'): Promise<Service[]> {
  // For now, featured services are all services (can be filtered later)
  return getAllServices(locale);
}
