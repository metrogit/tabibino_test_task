import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import type { Metadata } from 'next';
import '@/app/globals.css';
import { Locale, LOCALES } from '@/lib/dictionaries';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { generateMetadata as generateSEOMetadata, generateStructuredData } from '@/lib/seo';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = generateSEOMetadata({
  title: 'Healthcare Made Simple',
  description: 'Book appointments with qualified doctors in seconds. Trusted medical platform with 24/7 support, secure booking, and expert healthcare professionals.',
  keywords: ['medical', 'healthcare', 'doctor appointments', 'telemedicine', 'online booking', 'پزشک', 'نوبت‌دهی'],
  locale: 'en',
  canonical: '/',
  openGraph: {
    type: 'website',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Tabibino - Healthcare Made Simple'
    }]
  }
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions) as any;
  const { lang } = await params;
  
  // SEO STUFF
  const structuredData = generateStructuredData('medicalOrganization');

  return (
    <html lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
      </head>
      <body className={lang === 'fa' ? 'font-sans-fa' : 'font-sans'}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider session={session}>
            <main role="main" id="main-content">
            <NextTopLoader />
              {children}
            </main>
            <Toaster 
              position="top-right"
              richColors
              closeButton
              duration={4000}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
