import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'fa'] as const;
export const localePrefix = 'always'; // Must match middleware config
 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});

