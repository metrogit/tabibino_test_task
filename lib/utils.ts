import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Locale } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export function setLocaleCookie(locale: Locale) {
  if (typeof document !== 'undefined') {
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax${process.env.NODE_ENV === 'production' ? '; secure' : ''}`;
  }
}

export function getLocaleCookie(): Locale | null {
  if (typeof document === 'undefined') return null;
  
  const match = document.cookie.match(new RegExp('(^| )' + LOCALE_COOKIE_NAME + '=([^;]+)'));
  return match ? (match[2] as Locale) : null;
}
