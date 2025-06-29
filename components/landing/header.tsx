"use client";

import { Session } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { memo, useCallback, useMemo, useState } from "react";
import { DarkModeToggleButton } from "../dark-mode-toggle-button";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserRole } from "@/types/roles";
import type { Dictionary, Locale } from '@/lib/types';
import { LanguageSwitcher } from '@/components/language-switcher';
import { 
  CircleUser, 
  Stethoscope, 
  Calendar, 
  Clock, 
  Users, 
  Settings,
  LogOut,
  User,
  ShieldCheck,
  UserCog,
  Heart,
  Menu,
  X
} from "lucide-react";

interface ExtendedSession extends Session {
  user: {
    email: string;
    accessToken: string;
    role: UserRole;
  };
}

interface HeaderProps {
  dict: Dictionary;
  lang: Locale;
}

const Header = memo(({ dict, lang }: HeaderProps) => {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roleConfig = useMemo(() => {
    if (!session?.user?.role) return null;
    
    const role = session.user.role;
    
    switch (role) {
      case UserRole.ADMIN:
        return {
          route: '/admin',
          icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
          label: dict.pages.admin.title,
        };
      case UserRole.DOCTOR:
        return {
          route: '/doctor',
          icon: <UserCog className="h-4 w-4" aria-hidden="true" />,
          label: dict.pages.doctor.title,
        };
      case UserRole.CLIENT:
        return {
          route: '/client',
          icon: <Heart className="h-4 w-4" aria-hidden="true" />,
          label: dict.pages.client.title,
        };
      default:
        return {
          route: '/',
          icon: <User className="h-4 w-4" aria-hidden="true" />,
          label: 'Dashboard',
        };
    }
  }, [session?.user?.role, dict.pages]);

  const handleSignOut = useCallback(() => {
    signOut({ redirect: false });
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const navigationLinks = useMemo(() => [
    {
      href: "/appointments",
      icon: <Calendar className="h-4 w-4" aria-hidden="true" />,
      label: dict.header.appointments,
    },
    {
      href: "/schedule",
      icon: <Clock className="h-4 w-4" aria-hidden="true" />,
      label: dict.header.schedule,
    },
    ...(session?.user?.role === UserRole.DOCTOR ? [{
      href: "/patients",
      icon: <Users className="h-4 w-4" aria-hidden="true" />,
      label: dict.header.patients,
    }] : []),
  ], [session?.user?.role, dict.header]);

  return (
    <>
      <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-auto" role="banner">
        <div className="bg-gray-100 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20">
          <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
            {/* Logo */}
            <Link 
              href={"/" as any}
              className="flex items-center gap-1 sm:gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg flex-shrink-0"
              aria-label="Tabibino - Go to homepage"
            >
              <div className="relative">
                <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-blue-700 transition-colors" aria-hidden="true" />
                <div className="absolute -top-1 -right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
              </div>
              <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                Tabibino
              </span>
            </Link>

            {/* Desktop Navigation */}
            {session && (
              <nav className="hidden lg:flex items-center gap-4" role="navigation" aria-label="Main navigation">
                {roleConfig && (
                  <Link 
                    href={roleConfig.route as any}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`Go to ${roleConfig.label}`}
                  >
                    {roleConfig.icon}
                    <span className="text-sm font-medium">{roleConfig.label}</span>
                  </Link>
                )}

                <div className="flex items-center gap-2">
                  {navigationLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href as any}
                      className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={link.label}
                      title={link.label}
                    >
                      {link.icon}
                    </Link>
                  ))}
                </div>
              </nav>
            )}

            {/* Right side controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Language switcher - hide on very small screens */}
              <div className="hidden sm:block">
                <LanguageSwitcher currentLang={lang} dictionary={dict} />
              </div>
              
              {/* Dark mode toggle */}
              <DarkModeToggleButton dict={dict.common} />
              
              {session ? (
                <>
                  {/* Mobile menu button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Menu className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>

                  {/* User dropdown */}
                  <DropdownMenu dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="relative p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="User menu"
                      >
                        <div className="relative">
                          <CircleUser className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" aria-hidden="true" />
                          <div className="absolute -top-1 -right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500 rounded-full" aria-hidden="true" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {session.user?.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {session.user?.role}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="ltr:mr-2 rtl:ml-2 h-4 w-4" aria-hidden="true" />
                        {dict.header.profile}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="ltr:mr-2 rtl:ml-2 h-4 w-4" aria-hidden="true" />
                        {dict.header.settings}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleSignOut}
                        className="cursor-pointer text-red-600 dark:text-red-400"
                      >
                        <LogOut className="ltr:mr-2 rtl:ml-2 h-4 w-4" aria-hidden="true" />
                        {dict.header.logout}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                                     <Button asChild variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-lg">
                     <Link href={"/fa/auth/login"}>
                       <span className="hidden sm:inline">{dict.auth.signIn}</span>
                       <span className="sm:hidden">Login</span>
                     </Link>
                   </Button>
                   <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-lg">
                     <Link href={"/fa/auth/login"}>
                       <span className="hidden sm:inline">{dict.common.start}</span>
                       <span className="sm:hidden">Start</span>
                     </Link>
                   </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {session && isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile menu */}
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-4">
            {/* Role-based dashboard link */}
            {roleConfig && (
              <Link 
                href={roleConfig.route as any}
                className="flex items-center gap-3 p-3 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={`Go to ${roleConfig.label}`}
              >
                {roleConfig.icon}
                <span className="font-medium truncate">{roleConfig.label}</span>
              </Link>
            )}

            {/* Navigation links */}
            <div className="space-y-1">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href as any}
                  className="flex items-center gap-3 w-full p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Language switcher for mobile */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Language</span>
                <LanguageSwitcher currentLang={lang} dictionary={dict} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Header.displayName = 'Header';

export default Header;
