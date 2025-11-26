import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'fa'];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: {
      common: (await import(`./messages/${locale}/common.json`)).default,
      home: (await import(`./messages/${locale}/home.json`)).default,
      projects: (await import(`./messages/${locale}/projects.json`)).default,
      contact: (await import(`./messages/${locale}/contact.json`)).default
    }
  };
});

