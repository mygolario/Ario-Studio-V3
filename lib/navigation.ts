import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fa'],
  defaultLocale: 'fa',
  localePrefix: 'always'
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
