import { Locale } from '@/config/i18n';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  const content = {
    fa: {
      title: 'خدمات ما',
      description: 'راهکارهای جامع برای رشد کسب‌وکارهای دیجیتال'
    },
    en: {
      title: 'Our Services',
      description: 'Comprehensive solutions for digital business growth'
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-20 px-4">
      <h1 className="text-5xl font-bold mb-6">{content[validLocale].title}</h1>
      <p className="text-xl text-white/60">{content[validLocale].description}</p>
      {/* TODO: Add Services List */}
    </section>
  );
}
