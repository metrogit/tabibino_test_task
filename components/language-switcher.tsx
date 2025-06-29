'use client';

import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';
import { GlobeIcon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Locale, type Dictionary, LOCALES } from '@/lib/types';
import { setLocaleCookie } from '@/lib/utils';

interface LanguageSwitcherProps {
  currentLang: Locale;
  dictionary: Dictionary;
}

const LANGUAGE_NAMES = {
  en: { native: 'English', localized: 'English' },
  fa: { native: 'فارسی', localized: 'Persian' },
} as const;

export const LanguageSwitcher = memo(({ currentLang, dictionary }: LanguageSwitcherProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // Ensure currentLang is valid, fallback to 'en'
  const validCurrentLang = (currentLang && LANGUAGE_NAMES[currentLang]) ? currentLang : 'en';
  const currentLangInfo = LANGUAGE_NAMES[validCurrentLang];

  const switchLanguage = useCallback((newLang: Locale) => {
    if (newLang === currentLang) return;
    
    // Save language preference to cookie
    setLocaleCookie(newLang);
    
    // Remove the current language from pathname
    const pathWithoutLang = pathname.replace(`/${currentLang}`, '') || '/';
    
    const newPath = `/${newLang}${pathWithoutLang}`;
    router.push(newPath as any);
  }, [currentLang, pathname, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`${dictionary.common?.language || 'Language'}: ${currentLangInfo.native}`}
        >
          <GlobeIcon className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline font-medium">
            {currentLangInfo.native}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-[140px] text-center">
        {LOCALES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => switchLanguage(lang)}
            className="flex items-center justify-between cursor-pointer focus:bg-accent"
            role="menuitem"
            aria-current={validCurrentLang === lang ? 'true' : 'false'}
          >
            <div className="flex flex-col text-left">
              <span className="font-medium">
                {LANGUAGE_NAMES[lang].native}
              </span>
              <span className="text-xs text-muted-foreground">
                {lang === 'en' ? (dictionary.common?.english || 'English') : (dictionary.common?.persian || 'فارسی')}
              </span>
            </div>
            {validCurrentLang === lang && (
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

LanguageSwitcher.displayName = 'LanguageSwitcher'; 