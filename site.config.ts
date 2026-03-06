/**
 * ============================================================
 * SITE CONFIGURATION — Jet Pest Control
 * ============================================================
 * This is the ONLY file that changes between sites.
 * All components read from here.
 * ============================================================
 */

export const SITE_ID = 'jet';
export const SITE_NAME = 'Jet Pest Control';
export const SITE_DOMAIN = 'jetpestcontrol.com';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jetpestcontrol.com';
export const SITE_TAGLINE = 'Professional Pest Control Services — NYC, Long Island & Beyond';
export const SITE_DESCRIPTION = 'Professional pest control serving Brooklyn, Queens, Manhattan, Nassau & Suffolk Counties. Discreet unmarked trucks. Licensed, insured, and effective treatments. Free estimates.';
export const EMAIL = 'info@jetpestcontrol.com';

export const SITE = {
  name: 'Jet Pest Control',
  id: 'jet',
} as const;

export const PHONE = '(718) 710-0330';
export const PHONE_RAW = '+17187100330';
export const PHONE_HREF = 'tel:+17187100330';

export const GEO = {
  county: 'Brooklyn',
  countyFull: 'Brooklyn',
  state: 'New York',
  stateCode: 'NY',
  region: 'Brooklyn, Queens, Manhattan, Nassau & Suffolk Counties',
  totalTowns: 261,
  latitude: 0,
  longitude: 0,
} as const;

export const REGIONS = [
  { name: 'Brooklyn', slug: 'brooklyn', townCount: 30 },
  { name: 'Queens', slug: 'queens', townCount: 33 },
  { name: 'Manhattan', slug: 'manhattan', townCount: 32 },
  { name: 'Nassau County', slug: 'nassau', townCount: 65 },
  { name: 'Suffolk County', slug: 'suffolk', townCount: 101 },
] as const;

export const BRAND = {
  primaryColor: '#1B3A5C',
  secondaryColor: '#2A5C8F',
  accentColor: '#E63946',
  darkColor: '#1A1A2E',
  lightBg: '#EBF0FA',
  white: '#FFFFFF',
} as const;

export const PEST_OPTIONS = [
  'Ants',
  'Bed Bugs',
  'Cockroaches',
  'Fleas & Ticks',
  'Mice / Rats',
  'Mosquitoes',
  'Spiders',
  'Termites',
  'Wasps / Hornets',
  'Wildlife',
  'Other',
] as const;

export const SERVICES = [
  { name: 'Ant Control', slug: 'ant-control', icon: '\uD83D\uDC1C', description: 'Keep ants out of your kitchen and away from your family. Effective, family-friendly treatments.' },
  { name: 'Termite Treatment', slug: 'termite-treatment', icon: '\uD83E\uDEB5', description: 'Protect your biggest investment. Expert termite inspections and treatment.' },
  { name: 'Bed Bug Removal', slug: 'bed-bug-removal', icon: '\uD83D\uDECF\uFE0F', description: 'Help your family sleep easy again. Thorough bed bug removal using proven treatments.' },
  { name: 'Rodent Control', slug: 'rodent-control', icon: '\uD83D\uDC00', description: "Mice and rats don\'t belong near your family. We remove them and seal entry points." },
  { name: 'Cockroach Control', slug: 'cockroach-control', icon: '\uD83E\uDEB3', description: 'Complete cockroach elimination that protects your family and home.' },
  { name: 'Mosquito Control', slug: 'mosquito-control', icon: '\uD83E\uDD9F', description: 'Take back your backyard. Family-friendly mosquito treatments for outdoor enjoyment.' },
  { name: 'Spider Control', slug: 'spider-control', icon: '\uD83D\uDD77\uFE0F', description: 'No more surprises in the basement or garage. Thorough spider removal for your whole home.' },
  { name: 'Wasp & Hornet Removal', slug: 'wasp-hornet-removal', icon: '\uD83D\uDC1D', description: "Protect your family from stinging insects. We\'ll remove nests from your property." },
  { name: 'Flea & Tick Treatment', slug: 'flea-tick-treatment', icon: '\uD83E\uDD97', description: 'Protect your family and pets. Professional flea and tick control for home and yard.' },
  { name: 'Wildlife Removal', slug: 'wildlife-removal', icon: '\uD83E\uDD9D', description: 'Raccoons in the attic? Humane removal that protects your family.' },
  { name: 'Commercial Pest Control', slug: 'commercial-pest-control', icon: '\uD83C\uDFE2', description: 'Customized pest management for businesses. Discreet, reliable, effective.' },
] as const;

export const GMB = {
  placeId: '',
  profileUrl: '',
  rating: 5.0,
  reviewsEnabled: true,
} as const;

export const TRUST_STATS = [
  { icon: '\uD83E\uDD1D', value: '10+ Years', label: 'Protecting Families' },
  { icon: '\u26A1', value: 'Same Day', label: 'Service Available' },
  { icon: '\uD83D\uDD12', value: 'Licensed', label: '& Insured' },
  { icon: '\uD83D\uDD2C', value: 'IPM', label: 'Trained Experts' },
  { icon: '\uD83D\uDCDE', value: 'Fast', label: 'Response Time' },
  { icon: '\u2705', value: 'Family', label: 'Safe Treatments' },
] as const;

export const LEAD_ROUTING = {
  defaultRoute: 'SS',
  webhookUrl: '',
} as const;

export const SEO = {
  titleTemplate: (pageTitle: string) => `${pageTitle} | Jet Pest Control`,
  defaultTitle: 'Jet Pest Control | Professional Exterminators in NYC & Long Island',
  defaultDescription: SITE_DESCRIPTION,
  ogImage: '/images/og-default.jpg',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: 'Ant Control', href: '/services/ant-control' },
    { label: 'Termite Treatment', href: '/services/termite-treatment' },
    { label: 'Bed Bug Removal', href: '/services/bed-bug-removal' },
    { label: 'Rodent Control', href: '/services/rodent-control' },
    { label: 'Cockroach Control', href: '/services/cockroach-control' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;

export const HOURS = {
  weekday: '7:00 AM \u2013 7:00 PM',
  saturday: '7:00 AM \u2013 5:00 PM',
  sunday: 'Closed',
  emergency: '24/7 Emergency Service Available',
} as const;

export const REVIEWS = [] as const;

export const NETWORK_SITES = [] as const;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
