import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tabibino.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/auth/login',
    '/admin',
    '/doctor', 
    '/client',
    '/appointments',
    '/schedule',
    '/patients',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each page in each language
  staticPages.forEach(page => {
    LOCALES.forEach(locale => {
      const url = `${baseUrl}/${locale}${page}`;
      
      // Determine priority based on page importance
      let priority = 0.5;
      if (page === '') priority = 1.0; // Home pages
      else if (page === '/auth/login') priority = 0.8;
      else if (['/admin', '/doctor', '/client'].includes(page)) priority = 0.9;
      else if (['/appointments', '/schedule'].includes(page)) priority = 0.7;

      // Determine change frequency
      let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';
      if (page === '') changeFrequency = 'daily';
      else if (['/appointments', '/schedule'].includes(page)) changeFrequency = 'daily';
      else if (['/admin', '/doctor', '/client'].includes(page)) changeFrequency = 'weekly';

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: LOCALES.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}${page}`;
            return acc;
          }, {} as Record<string, string>),
        },
      });
    });
  });

  // Add root redirect
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  return sitemapEntries;
} 