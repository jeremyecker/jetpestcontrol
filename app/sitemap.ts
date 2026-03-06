import { MetadataRoute } from 'next';
import { BRAND, REGIONS } from '@/hub.config';
import { SERVICES } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${BRAND.domain}`;
  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ];

  for (const region of REGIONS) {
    const regionBase = `${base}/${region.slug}`;
    entries.push(
      { url: `${regionBase}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
      { url: `${regionBase}/services/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
      { url: `${regionBase}/service-areas/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${regionBase}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
      { url: `${regionBase}/contact/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    );

    for (const service of SERVICES) {
      entries.push({
        url: `${regionBase}/services/${service.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const town of region.towns) {
      const townSlug = town.toLowerCase().replace(/\s+/g, '-');
      entries.push({
        url: `${regionBase}/${townSlug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
