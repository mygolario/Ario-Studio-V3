export type Service = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
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

/**
 * Get all services - returns static data
 * @param locale - The locale for translations (e.g., 'fa', 'en')
 */
export function getAllServices(locale: string = 'en'): Service[] {
  return getStaticServices(locale);
}

/**
 * Get featured services - returns static data (all services are featured)
 * @param locale - The locale for translations (e.g., 'fa', 'en')
 */
export function getFeaturedServices(locale: string = 'en'): Service[] {
  return getStaticServices(locale);
}

