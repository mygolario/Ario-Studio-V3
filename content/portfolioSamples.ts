export type PortfolioSample = {
  id: string;
  slug: string;
  status: 'sample';
  title: {
    fa: string;
    en: string;
  };
  subtitle: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  tags: {
    fa: string[];
    en: string[];
  };
};

export const portfolioSamples: PortfolioSample[] = [
  {
    id: '1',
    slug: 'ecommerce-landing',
    status: 'sample',
    title: {
      fa: 'لندینگ پیج فروش ویژه یک فروشگاه آنلاین ایرانی',
      en: 'Launch landing page for a growing e-commerce brand',
    },
    subtitle: {
      fa: 'تمرکز روی استوری‌تلینگ تصویری و فراخوان خرید واضح.',
      en: 'Cinematic hero, clear offer, and conversion-focused layout.',
    },
    description: {
      fa: 'طراحی مینیمال با تمرکز بر نرخ تبدیل بالا و تجربه کاربری روان برای کمپین‌های فصلی.',
      en: 'Minimalist design focused on high conversion rates and smooth user experience for seasonal campaigns.',
    },
    tags: {
      fa: ['فروشگاه آنلاین', 'لندینگ پیج', 'Next.js'],
      en: ['E-commerce', 'Landing page', 'Next.js'],
    },
  },
  {
    id: '2',
    slug: 'corporate-rebrand',
    status: 'sample',
    title: {
      fa: 'بازطراحی هویت بصری و وب‌سایت شرکتی',
      en: 'Corporate Rebranding & Website Overhaul',
    },
    subtitle: {
      fa: 'ایجاد یک زبان بصری مدرن برای یک هلدینگ صنعتی.',
      en: 'Creating a modern visual language for an industrial holding.',
    },
    description: {
      fa: 'ارتقای تصویر برند با استفاده از تایپوگرافی اختصاصی و پالت رنگی جدید.',
      en: 'Elevating brand image using custom typography and a fresh color palette.',
    },
    tags: {
      fa: ['برندینگ', 'وب‌سایت شرکتی', 'UI/UX'],
      en: ['Branding', 'Corporate Website', 'UI/UX'],
    },
  },
  {
    id: '3',
    slug: 'saas-dashboard',
    status: 'sample',
    title: {
      fa: 'داشبورد مدیریتی برای پلتفرم SaaS',
      en: 'Management Dashboard for SaaS Platform',
    },
    subtitle: {
      fa: 'طراحی رابط کاربری پیچیده برای مدیریت داده‌های حجیم.',
      en: 'Designing complex UI for managing large datasets.',
    },
    description: {
      fa: 'بهینه‌سازی تجربه کاربری برای تحلیل داده‌ها و گزارش‌گیری در لحظه.',
      en: 'Optimizing UX for data analysis and real-time reporting.',
    },
    tags: {
      fa: ['SaaS', 'داشبورد', 'React'],
      en: ['SaaS', 'Dashboard', 'React'],
    },
  },
  {
    id: '4',
    slug: 'creative-portfolio',
    status: 'sample',
    title: {
      fa: 'وب‌سایت شخصی برای یک هنرمند دیجیتال',
      en: 'Personal Website for a Digital Artist',
    },
    subtitle: {
      fa: 'نمایش آثار هنری در یک گالری تعاملی و سه بعدی.',
      en: 'Showcasing artworks in an interactive 3D gallery.',
    },
    description: {
      fa: 'استفاده از WebGL برای خلق تجربه‌ای غوطه‌ورکننده و منحصر به فرد.',
      en: 'Using WebGL to create an immersive and unique experience.',
    },
    tags: {
      fa: ['پورتفولیو', 'سه بعدی', 'WebGL'],
      en: ['Portfolio', '3D', 'WebGL'],
    },
  },
];
