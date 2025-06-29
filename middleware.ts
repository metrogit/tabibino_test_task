import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { LOCALES, type Locale, DEFAULT_LOCALE } from "./lib/dictionaries";
import { LOCALE_COOKIE_NAME } from "./lib/utils";

const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  httpOnly: false,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
};

function getLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = [...LOCALES];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = match(languages, locales, DEFAULT_LOCALE);
  return locale as Locale;
}

function setLocaleResponse(response: NextResponse, locale: Locale): void {
  response.cookies.set(LOCALE_COOKIE_NAME, locale, COOKIE_OPTIONS);
}

function createRedirectResponse(url: URL, locale?: Locale): NextResponse {
  const response = NextResponse.redirect(url);
  if (locale) {
    setLocaleResponse(response, locale);
  }
  return response;
}

function createNextResponse(pathname: string, locale?: Locale): NextResponse {
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  if (locale) {
    setLocaleResponse(response, locale);
  }
  return response;
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Check if pathname starts with a locale
    const pathnameHasLocale = LOCALES.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
      const locale = getLocale(request);
      request.nextUrl.pathname = `/${locale}${pathname}`;
      return createRedirectResponse(request.nextUrl, locale);
    }

    // Extract locale from pathname
    const locale = pathname.split('/')[1] as Locale;
    const currentCookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
    const needsLocaleUpdate = currentCookieLocale !== locale;

    // For now, just handle locale switching without authentication
    // Authentication will be handled at the component level
    return createNextResponse(pathname, needsLocaleUpdate ? locale : undefined);
  } catch (error) {
    console.error('Middleware error:', error);
    // Fallback to basic response in case of errors
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip internal paths and static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|woff2?|ttf|otf)).*)',
  ],
};
