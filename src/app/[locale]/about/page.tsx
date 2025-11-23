import { Locale } from '@/config/i18n';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  const content = {
    fa: {
      title: 'درباره ما',
      description: 'ما تیمی از طراحان و توسعه‌دهندگان خلاق هستیم.'
    },
    en: {
      title: 'About Us',
      description: 'We are a team of creative designers and developers.'
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-20 px-4">
      <h1 className="text-5xl font-bold mb-6">{content[validLocale].title}</h1>
      <p className="text-xl text-white/60">{content[validLocale].description}</p>
      {/* TODO: Add About Content */}
    </section>
  );
}
