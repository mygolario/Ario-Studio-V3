export type ProcessStep = {
  id: number;
  title: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
};

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: {
      fa: 'شناخت و تحلیل',
      en: 'Discovery',
    },
    description: {
      fa: 'فهم دقیق هدف، بازار و نیازهای پروژه.',
      en: 'Understanding goals, audience, and project scope.',
    },
  },
  {
    id: 2,
    title: {
      fa: 'طراحی تجربه',
      en: 'Experience design',
    },
    description: {
      fa: 'ساخت ساختار، وایرفریم و جریان‌های اصلی.',
      en: 'Wireframes and structural flow.',
    },
  },
  {
    id: 3,
    title: {
      fa: 'طراحی بصری',
      en: 'Visual design',
    },
    description: {
      fa: 'طراحی نهایی صفحات و هویت بصری.',
      en: 'Final UI design and brand alignment.',
    },
  },
  {
    id: 4,
    title: {
      fa: 'توسعه و اجرا',
      en: 'Development',
    },
    description: {
      fa: 'پیاده‌سازی سریع و دقیق با Next.js و ابزارهای مدرن.',
      en: 'Building with Next.js and modern tools.',
    },
  },
  {
    id: 5,
    title: {
      fa: 'تحویل و بهینه‌سازی',
      en: 'Delivery & optimization',
    },
    description: {
      fa: 'تحویل نهایی، تست و بهبودهای تکمیلی.',
      en: 'Launch, QA, and refinements.',
    },
  },
];
