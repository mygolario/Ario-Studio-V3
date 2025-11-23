import { Locale } from '@/config/i18n';

export default async function ProjectRequestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  const content = {
    fa: {
      title: 'درخواست پروژه',
      description: 'فرم زیر را پر کنید تا با شما تماس بگیریم.'
    },
    en: {
      title: 'Project Request',
      description: 'Fill out the form below and we will get back to you.'
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pt-20 px-4">
      <h1 className="text-5xl font-bold mb-6">{content[validLocale].title}</h1>
      <p className="text-xl text-white/60">{content[validLocale].description}</p>
      {/* TODO: Add Multi-step Project Request Form */}
    </section>
  );
}
