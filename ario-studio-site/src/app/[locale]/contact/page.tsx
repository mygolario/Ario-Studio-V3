import { Locale } from '@/config/i18n';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  const content = {
    fa: {
      title: 'تماس با ما',
      description: 'برای شروع پروژه جدید با ما در ارتباط باشید.'
    },
    en: {
      title: 'Contact Us',
      description: 'Get in touch to start your new project.'
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-20 px-4">
      <h1 className="text-5xl font-bold mb-6">{content[validLocale].title}</h1>
      <p className="text-xl text-white/60">{content[validLocale].description}</p>
      {/* TODO: Add Contact Form */}
    </section>
  );
}
