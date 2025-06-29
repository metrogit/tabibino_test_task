import type { Metadata } from 'next';
import type { Dictionary, Locale } from './types';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  locale: Locale;
  openGraph?: {
    type?: 'website' | 'article';
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  structuredData?: any;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tabibino.com';
const siteName = 'Tabibino';

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    locale,
    openGraph,
    structuredData
  } = config;

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    
    // Language and location
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en`,
        'fa': `${baseUrl}/fa`,
        'x-default': `${baseUrl}/en`,
      },
    },
    
    // OpenGraph
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      type: openGraph?.type || 'website',
      images: openGraph?.images || [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      site: '@tabibino',
      creator: '@tabibino',
      images: openGraph?.images?.[0]?.url || `${baseUrl}/og-image.jpg`,
    },
    
    // Additional meta tags
    other: {
      'application-name': siteName,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': siteName,
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#2563eb',
      'theme-color': '#ffffff',
      ...(structuredData && {
        'structured-data': JSON.stringify(structuredData)
      }),
    },
    
    // Verification tags
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    
    // Icons
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    
    // Manifest
    manifest: '/site.webmanifest',
  };
}

export function generatePageMetadata(
  pageName: keyof Dictionary,
  dictionary: Dictionary,
  locale: Locale,
  path?: string
): Metadata {
  const pageDict = dictionary[pageName] as any;
  
  const defaultKeywords = [
    'medical',
    'healthcare',
    'doctor',
    'appointment',
    'booking',
    'telemedicine',
    locale === 'fa' ? 'پزشک' : 'physician',
    locale === 'fa' ? 'نوبت‌دهی' : 'scheduling',
  ];

  // Handle different title structures
  let title: string;
  if (pageName === 'hero') {
    title = `${dictionary.hero.title.part1} ${dictionary.hero.title.part2}`;
  } else if (typeof pageDict?.title === 'string') {
    title = pageDict.title;
  } else if (typeof pageDict?.badge === 'string') {
    title = pageDict.badge;
  } else {
    title = dictionary.common.welcome;
  }

  return generateMetadata({
    title,
    description: pageDict?.description || dictionary.hero.description,
    keywords: defaultKeywords,
    canonical: path,
    locale,
  });
}

export function generateStructuredData(type: 'organization' | 'medicalOrganization' | 'website') {
  const baseData = {
    '@context': 'https://schema.org',
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/tabibino',
      'https://linkedin.com/company/tabibino',
    ],
  };

  switch (type) {
    case 'organization':
      return {
        '@type': 'Organization',
        ...baseData,
      };
      
    case 'medicalOrganization':
      return {
        '@type': 'MedicalOrganization',
        ...baseData,
        '@id': `${baseUrl}#organization`,
        medicalSpecialty: 'General Practice',
        serviceType: 'Telemedicine',
        areaServed: ['Iran', 'International'],
      };
      
    case 'website':
      return {
        '@type': 'WebSite',
        ...baseData,
        '@id': `${baseUrl}#website`,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      };
      
    default:
      return baseData;
  }
} 