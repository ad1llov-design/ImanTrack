import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://iman-tracko1.vercel.app';

  const routes = [
    '',
    '/quran',
    '/quran/translation',
    '/hadith',
    '/dhikr',
    '/sunnah',
    '/adhkar',
    '/prayer'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));
}
