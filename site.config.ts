// site.config.ts — AUTO-DERIVED from hub.config.ts
// DO NOT EDIT — all values come from hub.config.ts
import { BRAND, REGIONS as HUB_REGIONS, GMBS, REVIEWS as HUB_REVIEWS, NETWORK_SITES as HUB_NETWORK } from '@/hub.config';
import { SERVICES } from '@/lib/services';
import type { NavLink } from '@/lib/types';

export const SITE_NAME = BRAND.name;
export const SITE_URL = `https://${BRAND.domain}`;
export const SITE_DOMAIN = BRAND.domain;
export const REGIONS = HUB_REGIONS;

const primaryRegion = HUB_REGIONS.find(r => r.isPrimary) ?? HUB_REGIONS[0];

export const SITE_DESCRIPTION = `Professional pest control serving ${BRAND.region}. Licensed, insured, family-safe treatments. Call ${BRAND.phoneFormatted} for a free estimate.`;

export const GEO = {
  region: BRAND.region,
  countyFull: primaryRegion.name,
  stateCode: primaryRegion.stateCode,
  totalTowns: HUB_REGIONS.reduce((sum: number, r: { townCount: number }) => sum + r.townCount, 0),
  latitude: 0,
  longitude: 0,
};

export const PHONE = BRAND.phoneFormatted;
export const PHONE_HREF = `tel:+1${BRAND.phone.replace(/\D/g, '')}`;
export const EMAIL = BRAND.email;

export const HOURS = {
  weekday: '7:00 AM \u2013 7:00 PM',
  saturday: '7:00 AM \u2013 5:00 PM',
  sunday: 'Closed',
};

const primaryGmb = primaryRegion.gmbId ? GMBS.find(g => g.id === primaryRegion.gmbId) : null;
export const GMB = {
  rating: primaryGmb?.rating ?? 5.0,
  reviewCount: primaryGmb?.reviewCount ?? 0,
  profileUrl: '#',
  reviewsEnabled: !!primaryGmb && primaryGmb.reviewCount > 0,
};

export const PEST_OPTIONS = [
  'Ants', 'Bed Bugs', 'Cockroaches', 'Fleas & Ticks', 'Mice / Rats',
  'Mosquitoes', 'Spiders', 'Termites', 'Wasps / Hornets', 'Wildlife', 'Other',
];

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  services: SERVICES.slice(0, 6).map(s => ({ label: s.name, href: `/services/${s.slug}` })),
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export const SEO = {
  defaultTitle: `${SITE_NAME} | Pest Control in ${GEO.region}`,
  ogImage: '/images/og-default.jpg',
};

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
export const REVIEWS = HUB_REVIEWS;
export const NETWORK_SITES = HUB_NETWORK;
export { SERVICES };
