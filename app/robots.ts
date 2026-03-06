import { MetadataRoute } from 'next';
import { BRAND } from '@/hub.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `https://${BRAND.domain}/sitemap.xml`,
  };
}
