/**
 * Services Configuration
 * 
 * Centralized source of truth for all services offered by Ario Studio.
 * This config is designed to be easily migrated to a CMS later.
 * 
 * Each service includes:
 * - Stable slug (used for routes)
 * - Localized titles and descriptions
 * - Bullet points for key features
 * - Optional fields (bestFor, outcome, tech)
 */

export type ServiceSlug = 'full-website' | 'landing-page' | 'ai-automation' | 'brand-refresh'

export interface ServiceConfig {
  slug: ServiceSlug
  title: {
    en: string
    fa: string
  }
  shortDescription: {
    en: string
    fa: string
  }
  description: {
    en: string
    fa: string
  }
  bullets: {
    en: string[]
    fa: string[]
  }
  bestFor?: {
    en: string
    fa: string
  }
  outcome?: {
    en: string
    fa: string
  }
  tech?: {
    en: string[]
    fa: string[]
  }
}

export const servicesConfig: ServiceConfig[] = [
  {
    slug: 'full-website',
    title: {
      en: 'Full Website Design & Build',
      fa: 'طراحی و ساخت وب‌سایت کامل',
    },
    shortDescription: {
      en: 'Complete website solutions from design to deployment. Modern, fast, and scalable sites built with Next.js and best practices.',
      fa: 'راه‌حل‌های کامل وب‌سایت از طراحی تا راه‌اندازی. سایت‌های مدرن، سریع و مقیاس‌پذیر ساخته شده با Next.js و بهترین روش‌ها.',
    },
    description: {
      en: 'We design and build complete websites tailored to your business needs. From initial strategy to final deployment, we handle every aspect of your web presence. Our approach combines human-led design and strategy with AI-assisted development for faster delivery without compromising quality.',
      fa: 'ما وب‌سایت‌های کامل را متناسب با نیازهای کسب‌وکار شما طراحی و می‌سازیم. از استراتژی اولیه تا راه‌اندازی نهایی، ما تمام جنبه‌های حضور آنلاین شما را مدیریت می‌کنیم. رویکرد ما ترکیبی از طراحی و استراتژی با رهبری انسانی و توسعه با کمک هوش مصنوعی برای تحویل سریع‌تر بدون کاهش کیفیت است.',
    },
    bullets: {
      en: [
        'A cohesive, fast, modern site tailored to your business',
        'Best for: Growing brands, SaaS, local businesses, e-commerce',
        'Tech: Next.js, Vercel, TypeScript, AI tooling',
      ],
      fa: [
        'سایت منسجم، سریع و مدرن متناسب با کسب‌وکار شما',
        'بهترین برای: برندهای در حال رشد، SaaS، کسب‌وکارهای محلی، تجارت الکترونیک',
        'فناوری: Next.js، Vercel، TypeScript، ابزارهای هوش مصنوعی',
      ],
    },
    bestFor: {
      en: 'Growing brands, SaaS companies, local businesses, e-commerce stores',
      fa: 'برندهای در حال رشد، شرکت‌های SaaS، کسب‌وکارهای محلی، فروشگاه‌های آنلاین',
    },
    outcome: {
      en: 'A cohesive, fast, modern website that scales with your business',
      fa: 'یک وب‌سایت منسجم، سریع و مدرن که با کسب‌وکار شما مقیاس می‌یابد',
    },
    tech: {
      en: ['Next.js', 'Vercel', 'TypeScript', 'Tailwind CSS', 'AI tooling'],
      fa: ['Next.js', 'Vercel', 'TypeScript', 'Tailwind CSS', 'ابزارهای هوش مصنوعی'],
    },
  },
  {
    slug: 'landing-page',
    title: {
      en: 'Cinematic Landing Page',
      fa: 'صفحه فرود سینمایی',
    },
    shortDescription: {
      en: 'High-converting landing pages with cinematic design and smooth animations. Built for campaigns, product launches, and conversions.',
      fa: 'صفحات فرود با نرخ تبدیل بالا با طراحی سینمایی و انیمیشن‌های روان. ساخته شده برای کمپین‌ها، راه‌اندازی محصول و تبدیل.',
    },
    description: {
      en: 'Create stunning landing pages that convert visitors into customers. We combine cinematic design principles with conversion-focused UX to build pages that not only look beautiful but drive results. Perfect for product launches, marketing campaigns, and lead generation.',
      fa: 'صفحات فرود خیره‌کننده بسازید که بازدیدکنندگان را به مشتری تبدیل می‌کند. ما اصول طراحی سینمایی را با UX متمرکز بر تبدیل ترکیب می‌کنیم تا صفحاتی بسازیم که نه تنها زیبا هستند بلکه نتایج را به همراه دارند. مناسب برای راه‌اندازی محصول، کمپین‌های بازاریابی و تولید لید.',
    },
    bullets: {
      en: [
        'High-converting, visually striking pages optimized for results',
        'Best for: Product launches, campaigns, lead generation',
        'Tech: Next.js, GSAP, Tailwind CSS, performance optimization',
      ],
      fa: [
        'صفحات با نرخ تبدیل بالا و بصری چشمگیر بهینه شده برای نتایج',
        'بهترین برای: راه‌اندازی محصول، کمپین‌ها، تولید لید',
        'فناوری: Next.js، GSAP، Tailwind CSS، بهینه‌سازی عملکرد',
      ],
    },
    bestFor: {
      en: 'Product launches, marketing campaigns, lead generation, event promotions',
      fa: 'راه‌اندازی محصول، کمپین‌های بازاریابی، تولید لید، تبلیغات رویدادها',
    },
    outcome: {
      en: 'A high-converting landing page that drives measurable results',
      fa: 'یک صفحه فرود با نرخ تبدیل بالا که نتایج قابل اندازه‌گیری ایجاد می‌کند',
    },
    tech: {
      en: ['Next.js', 'GSAP', 'Tailwind CSS', 'Framer Motion', 'Performance optimization'],
      fa: ['Next.js', 'GSAP', 'Tailwind CSS', 'Framer Motion', 'بهینه‌سازی عملکرد'],
    },
  },
  {
    slug: 'ai-automation',
    title: {
      en: 'AI Automation & Integration',
      fa: 'اتوماسیون و ادغام هوش مصنوعی',
    },
    shortDescription: {
      en: 'Intelligent automation systems and AI integrations that reduce manual work and enhance user experiences.',
      fa: 'سیستم‌های اتوماسیون هوشمند و ادغام‌های هوش مصنوعی که کار دستی را کاهش می‌دهند و تجربیات کاربری را بهبود می‌بخشند.',
    },
    description: {
      en: 'Integrate AI-powered automation into your business processes. We build intelligent systems that handle repetitive tasks, provide AI-powered customer support, and streamline workflows. Our solutions are custom-built to fit your specific needs while leveraging cutting-edge AI technology.',
      fa: 'اتوماسیون مبتنی بر هوش مصنوعی را در فرآیندهای کسب‌وکار خود ادغام کنید. ما سیستم‌های هوشمندی می‌سازیم که کارهای تکراری را انجام می‌دهند، پشتیبانی مشتری مبتنی بر هوش مصنوعی ارائه می‌دهند و گردش‌های کاری را ساده می‌کنند. راه‌حل‌های ما به صورت سفارشی ساخته می‌شوند تا با نیازهای خاص شما سازگار باشند و در عین حال از فناوری پیشرفته هوش مصنوعی استفاده کنند.',
    },
    bullets: {
      en: [
        'Automated workflows and AI-powered features that save time',
        'Best for: SaaS, e-commerce, service businesses, customer support',
        'Tech: OpenAI, LangChain, custom integrations, API development',
      ],
      fa: [
        'گردش‌های کاری خودکار و ویژگی‌های مبتنی بر هوش مصنوعی که زمان را ذخیره می‌کنند',
        'بهترین برای: SaaS، تجارت الکترونیک، کسب‌وکارهای خدماتی، پشتیبانی مشتری',
        'فناوری: OpenAI، LangChain، ادغام‌های سفارشی، توسعه API',
      ],
    },
    bestFor: {
      en: 'SaaS platforms, e-commerce stores, service businesses, customer support teams',
      fa: 'پلتفرم‌های SaaS، فروشگاه‌های آنلاین، کسب‌وکارهای خدماتی، تیم‌های پشتیبانی مشتری',
    },
    outcome: {
      en: 'Automated workflows and AI features that reduce manual work and improve efficiency',
      fa: 'گردش‌های کاری خودکار و ویژگی‌های هوش مصنوعی که کار دستی را کاهش می‌دهند و کارایی را بهبود می‌بخشند',
    },
    tech: {
      en: ['OpenAI', 'LangChain', 'Custom APIs', 'Webhooks', 'Integration platforms'],
      fa: ['OpenAI', 'LangChain', 'APIهای سفارشی', 'Webhooks', 'پلتفرم‌های ادغام'],
    },
  },
  {
    slug: 'brand-refresh',
    title: {
      en: 'Brand & Visual Refresh',
      fa: 'نوسازی برند و بصری',
    },
    shortDescription: {
      en: 'Modernize your brand identity and visual system. Redesign websites with fresh aesthetics while maintaining brand essence.',
      fa: 'هویت برند و سیستم بصری خود را مدرن کنید. بازطراحی وب‌سایت‌ها با زیبایی‌شناسی تازه در حالی که جوهره برند حفظ می‌شود.',
    },
    description: {
      en: 'Give your brand a fresh, modern look while staying true to your core identity. We redesign websites, update visual systems, and modernize your online presence. Perfect for established brands looking to stay current or businesses ready for a visual upgrade.',
      fa: 'به برند خود ظاهری تازه و مدرن بدهید در حالی که به هویت اصلی خود وفادار می‌مانید. ما وب‌سایت‌ها را بازطراحی می‌کنیم، سیستم‌های بصری را به‌روزرسانی می‌کنیم و حضور آنلاین شما را مدرن می‌کنیم. مناسب برای برندهای تثبیت شده که می‌خواهند به‌روز بمانند یا کسب‌وکارهایی که آماده ارتقای بصری هستند.',
    },
    bullets: {
      en: [
        'Refreshed brand identity and visual system that stays true to your essence',
        'Best for: Established brands, rebranding projects, visual upgrades',
        'Tech: Design systems, component libraries, modern frameworks',
      ],
      fa: [
        'هویت برند و سیستم بصری تازه که به جوهره شما وفادار می‌ماند',
        'بهترین برای: برندهای تثبیت شده، پروژه‌های بازطراحی برند، ارتقای بصری',
        'فناوری: سیستم‌های طراحی، کتابخانه‌های کامپوننت، فریمورک‌های مدرن',
      ],
    },
    bestFor: {
      en: 'Established brands, rebranding projects, businesses ready for visual upgrades',
      fa: 'برندهای تثبیت شده، پروژه‌های بازطراحی برند، کسب‌وکارهای آماده برای ارتقای بصری',
    },
    outcome: {
      en: 'A refreshed brand identity and modern visual system that maintains your brand essence',
      fa: 'هویت برند تازه و سیستم بصری مدرن که جوهره برند شما را حفظ می‌کند',
    },
    tech: {
      en: ['Design systems', 'Component libraries', 'Modern CSS', 'Design tools'],
      fa: ['سیستم‌های طراحی', 'کتابخانه‌های کامپوننت', 'CSS مدرن', 'ابزارهای طراحی'],
    },
  },
]

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return servicesConfig.find(service => service.slug === slug)
}

/**
 * Get all service slugs
 */
export function getAllServiceSlugs(): ServiceSlug[] {
  return servicesConfig.map(service => service.slug)
}

