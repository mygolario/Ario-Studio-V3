import { Locale } from '@/config/i18n';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  const content = {
    fa: {
      title: 'آریو استودیو',
      subtitle: 'استودیوی خلاق برای برندهای جاه‌طلب',
      description: 'ما با ترکیب هنر و تکنولوژی، تجربه‌های دیجیتال فراموش‌نشدنی خلق می‌کنیم.'
    },
    en: {
      title: 'Ario Studio',
      subtitle: 'Creative Studio for Ambitious Brands',
      description: 'We craft unforgettable digital experiences by blending art and technology.'
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-20 px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-white/50">
        {content[validLocale].title}
      </h1>
      <p className="text-xl md:text-2xl text-accent-primary mb-8 font-medium">
        {content[validLocale].subtitle}
      </p>
      <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
        {content[validLocale].description}
      </p>
      
      {/* TODO: Add Hero Section with cinematic visuals */}
    </section>
  );
}
