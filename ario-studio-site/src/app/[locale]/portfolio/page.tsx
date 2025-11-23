import { Locale } from '@/config/i18n';

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  const content = {
    fa: {
      title: 'نمونه‌کارها',
      description: 'گزیده‌ای از بهترین پروژه‌های ما'
    },
    en: {
      title: 'Portfolio',
      description: 'A selection of our finest work'
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-20 px-4">
      <h1 className="text-5xl font-bold mb-6">{content[validLocale].title}</h1>
      <p className="text-xl text-white/60">{content[validLocale].description}</p>
      {/* TODO: Add Portfolio Grid */}
    </section>
  );
}
