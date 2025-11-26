import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '../lib/navigation';

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      common: (await import(`../messages/${locale}/common.json`)).default,
      home: (await import(`../messages/${locale}/home.json`)).default,
      projects: (await import(`../messages/${locale}/projects.json`)).default,
      contact: (await import(`../messages/${locale}/contact.json`)).default
    }
  };
});
