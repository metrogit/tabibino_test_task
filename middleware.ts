import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { LOCALES, type Locale, DEFAULT_LOCALE } from "./lib/dictionaries";
import { LOCALE_COOKIE_NAME } from "./lib/utils";
import { UserRole } from "./types/roles";

function getLocale(request: NextRequest): Locale {
  // First, check if there's a stored locale preference in cookies
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // Fallback to browser's Accept-Language header
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = LOCALES;
  
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = match(languages, locales, DEFAULT_LOCALE);
  return locale as Locale;
}

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    // Check if the pathname starts with a locale
    const pathnameHasLocale = LOCALES.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
      // Redirect to locale path
      const locale = getLocale(request);
      request.nextUrl.pathname = `/${locale}${pathname}`;
      const response = NextResponse.redirect(request.nextUrl);
      
      // Set locale cookie to remember user's preference
      response.cookies.set(LOCALE_COOKIE_NAME, locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      
      return response;
    }

    // Extract locale from pathname
    const locale = pathname.split('/')[1] as Locale;
    
    // Update locale cookie if it's different from the current URL locale
    const currentCookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
    const needsLocaleUpdate = currentCookieLocale !== locale;

    // Check if the current path is the login route or home page
    const isLoginPage = pathname.includes('/auth/login');
    const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

    if (isLoginPage) {
      if (token) {
        // If user is already logged in, redirect to home page with current locale
        const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
        if (needsLocaleUpdate) {
          response.cookies.set(LOCALE_COOKIE_NAME, locale, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            httpOnly: false,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          });
        }
        return response;
      }
      
      const response = NextResponse.next();
      // Set pathname in header so layout can access it
      response.headers.set('x-pathname', pathname);
      
      if (needsLocaleUpdate) {
        response.cookies.set(LOCALE_COOKIE_NAME, locale, {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          httpOnly: false,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
      }
      
      return response;
    }

    // Allow access to home page for non-authenticated users
    if (isHomePage) {
      const response = NextResponse.next();
      // Set pathname in header so layout can access it
      response.headers.set('x-pathname', pathname);
      
      if (needsLocaleUpdate) {
        response.cookies.set(LOCALE_COOKIE_NAME, locale, {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          httpOnly: false,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
      }
      return response;
    }

    // For all other routes, check for authentication
    if (!token) {
      // If not authenticated, redirect to login page with current locale
      const response = NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
      if (needsLocaleUpdate) {
        response.cookies.set(LOCALE_COOKIE_NAME, locale, {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          httpOnly: false,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
      }
      return response;
    }

    // Role-based access control
    const userRole = token.role as UserRole;
    const pathSegments = pathname.split('/');
    const roleRoute = pathSegments[2]; // The segment after /{locale}/

    // Define role-specific routes
    const roleRoutes = {
      'admin': UserRole.ADMIN,
      'doctor': UserRole.DOCTOR,
      'client': UserRole.CLIENT,
    };

    // Check if user is trying to access a role-specific route
    if (roleRoute && roleRoutes[roleRoute as keyof typeof roleRoutes]) {
      const requiredRole = roleRoutes[roleRoute as keyof typeof roleRoutes];
      
      // If user doesn't have the required role, redirect to unauthorized page
      if (userRole !== requiredRole) {
        const response = NextResponse.redirect(new URL(`/${locale}/unauthorized`, request.url));
        if (needsLocaleUpdate) {
          response.cookies.set(LOCALE_COOKIE_NAME, locale, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            httpOnly: false,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          });
        }
        return response;
      }
    }

    const response = NextResponse.next();
    // Set pathname in header so layout can access it
    response.headers.set('x-pathname', pathname);
    
    if (needsLocaleUpdate) {
      response.cookies.set(LOCALE_COOKIE_NAME, locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    // Fallback to basic response in case of errors
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api) and static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)).*)',
  ],
};
