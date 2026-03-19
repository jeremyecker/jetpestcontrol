import { MetadataRoute } from 'next';
import { BRAND, REGIONS } from '@/hub.config';
import { SERVICES } from '@/lib/services';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { COMMERCIAL_VERTICALS } from '@/lib/jet-commercial-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${BRAND.domain}`;
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/pest-control-near-me/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/exterminator-near-me/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/emergency-pest-control/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/same-day-pest-control/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/bed-bug-exterminator/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/free-pest-inspection/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/commercial/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  // Static pages
  entries.push(
    { url: `${base}/services/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/terms/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacy/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/reviews/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/service-areas/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  );

  // Commercial vertical pages
  for (const vertical of COMMERCIAL_VERTICALS) {
    entries.push({
      url: `${base}/commercial/${vertical.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Blog posts
  for (const post of getAllBlogPosts()) {
    entries.push({
      url: `${base}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Individual service pages
  for (const service of SERVICES) {
    entries.push({
      url: `${base}/services/${service.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const region of REGIONS) {
    const regionBase = `${base}/${region.slug}`;
    entries.push(
      { url: `${regionBase}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
      { url: `${regionBase}/services/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
      { url: `${regionBase}/service-areas/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${regionBase}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
      { url: `${regionBase}/contact/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    );

    // Region lead capture pages
    const leadTypes = [
      'pest-control-near-me',
      'exterminator-near-me',
      'emergency-pest-control',
      'same-day-pest-control',
      'bed-bug-exterminator',
      'free-pest-inspection',
    ];
    for (const leadType of leadTypes) {
      entries.push({
        url: `${regionBase}/${leadType}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    for (const service of SERVICES) {
      entries.push({
        url: `${regionBase}/services/${service.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const town of region.towns) {
      const townSlug = town.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
      entries.push({
        url: `${regionBase}/${townSlug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // ============================================================
  // Service index pages — /{region}/{service}/ (50 URLs total)
  // ============================================================
  const ALL_SERVICE_SLUGS = [
    'ant-exterminator',
    'bed-bug-exterminator',
    'bee-removal',
    'cockroach-exterminator',
    'cricket-exterminator',
    'raccoon-removal',
    'rodent-control',
    'squirrel-removal',
    'termite-control',
    'wildlife-removal',
  ];

  entries.push(
    ...REGIONS.flatMap((region: { slug: string }) =>
      ALL_SERVICE_SLUGS.map(service => ({
        url: `${base}/${region.slug}/${service}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      }))
    )
  );

  return entries;
}
