import 'server-only';
import { type Locale, type Dictionary, DEFAULT_LOCALE } from '@/lib/types';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  fa: () => import('./fa.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Fallback to default locale if the requested locale is not supported
  const validLocale = dictionaries[locale] ? locale : DEFAULT_LOCALE;
  return dictionaries[validLocale]();
};

export { LOCALES, DEFAULT_LOCALE, type Locale, type Dictionary } from '@/lib/types'; 