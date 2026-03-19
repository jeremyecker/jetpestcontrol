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
export const SITE_DESCRIPTION = 'Pest control for Brooklyn, Queens, Manhattan, Nassau & Suffolk Counties. Licensed, insured, discreet unmarked trucks. Same-day service available.';
export const EMAIL = 'info@jetpestcontrol.com';

export const SITE = {
  name: 'Jet Pest Control',
  id: 'jet',
} as const;

export const PHONE = '(718) 710-0330';
export const PHONE_RAW = '+17187100330';
export const PHONE_HREF = 'tel:+17187100330';

export const REGION_PHONES: Record<string, { display: string; href: string }> = {
  brooklyn:  { display: '(718) 710-0330', href: 'tel:+17187100330' },
  queens:    { display: '(718) 710-0330', href: 'tel:+17187100330' },
  manhattan: { display: '(718) 710-0330', href: 'tel:+17187100330' },
  nassau:    { display: '(516) 774-5051', href: 'tel:+15167745051' },
  suffolk:   { display: '(516) 774-5051', href: 'tel:+15167745051' },
};

export const HOMEPAGE_PHONES = [
  { label: 'NYC', display: '(718) 710-0330', href: 'tel:+17187100330' },
  { label: 'Long Island', display: '(516) 774-5051', href: 'tel:+15167745051' },
];

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
  { name: 'Ant Control', slug: 'ant-control', icon: '🐜', description: 'Keep ants out of your kitchen and away from your family. Effective, family-friendly treatments.' },
  { name: 'Termite Treatment', slug: 'termite-treatment', icon: '🪵', description: 'Protect your biggest investment. Expert termite inspections and treatment.' },
  { name: 'Bed Bug Removal', slug: 'bed-bug-removal', icon: '🛏️', description: 'Help your family sleep easy again. Thorough bed bug removal using proven treatments.' },
  { name: 'Rodent Control', slug: 'rodent-control', icon: '🐀', description: "Mice and rats don't belong near your family. We remove them and seal entry points." },
  { name: 'Cockroach Control', slug: 'cockroach-control', icon: '🪳', description: 'Complete cockroach elimination that protects your family and home.' },
  { name: 'Mosquito Control', slug: 'mosquito-control', icon: '🦟', description: 'Take back your backyard. Family-friendly mosquito treatments for outdoor enjoyment.' },
  { name: 'Spider Control', slug: 'spider-control', icon: '🕷️', description: 'No more surprises in the basement or garage. Thorough spider removal for your whole home.' },
  { name: 'Wasp & Hornet Removal', slug: 'wasp-hornet-removal', icon: '🐝', description: "Protect your family from stinging insects. We'll remove nests from your property." },
  { name: 'Flea & Tick Treatment', slug: 'flea-tick-treatment', icon: '🦗', description: 'Protect your family and pets. Professional flea and tick control for home and yard.' },
  { name: 'Wildlife Removal', slug: 'wildlife-removal', icon: '🦝', description: 'Raccoons in the attic? Humane removal that protects your family.' },
  { name: 'Commercial Pest Control', slug: 'commercial-pest-control', icon: '🏢', description: 'Customized pest management for businesses. Discreet, reliable, effective.' },
] as const;

export const GMB = {
  placeId: '',
  profileUrl: '',
  rating: 5.0,
  reviewsEnabled: true,
} as const;

export const TRUST_STATS = [
  { icon: '🤝', value: 'Thousands', label: 'Of Happy Customers' },
  { icon: '⚡', value: 'Same Day', label: 'Next Day Service' },
  { icon: '🔒', value: 'Discreet', label: 'Services' },
  { icon: '🔬', value: 'Expert', label: 'Analysis & Delivery' },
  { icon: '📞', value: 'High-Level', label: 'Communication' },
  { icon: '✅', value: 'Licensed', label: '& Insured' },
] as const;

export const LEAD_ROUTING = {
  defaultRoute: 'SS',
  webhookUrl: '',
} as const;

export const SEO = {
  titleTemplate: (pageTitle: string) => `${pageTitle} | Jet Pest Control`,
  defaultTitle: 'Jet Pest Control | NYC & Long Island Exterminators',
  defaultDescription: SITE_DESCRIPTION,
  ogImage: '/images/og-default.jpg',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: 'Ant Control', href: '/services/ant-control/' },
    { label: 'Termite Treatment', href: '/services/termite-treatment/' },
    { label: 'Bed Bug Removal', href: '/services/bed-bug-removal/' },
    { label: 'Rodent Control', href: '/services/rodent-control/' },
    { label: 'Cockroach Control', href: '/services/cockroach-control/' },
  ],
  company: [
    { label: 'About Us', href: '/about/' },
    { label: 'Reviews', href: '/reviews/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Blog', href: '/blog/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Service', href: '/terms/' },
  ],
} as const;

export const HOURS = {
  weekday: '7:00 AM – 7:00 PM',
  saturday: '7:00 AM – 5:00 PM',
  sunday: 'Closed',
  emergency: '24/7 Emergency Service Available',
} as const;

export const REVIEWS = [
  {
    name: "Leah G.",
    rating: 5,
    text: "Jeffrey was great! He was super calm, meticulous, and answered all of my questions while he was here. I especially appreciate that he came out quickly within the same day, when my own building wouldn't coordinate a quick response to a pest issue. Would definitely recommend him and this company.",
    date: "2 days ago",
    source: "Google"
  },
  {
    name: "Derrick A.",
    rating: 5,
    text: "Jeffery was fantastic — professional, thorough, and very knowledgeable. He took the time to explain things and gave me helpful tips for the future, which I really appreciated. I have nothing but positive things to say about Jet Pest Control, from the technicians to customer service, the whole team is 10/10!",
    date: "6 days ago",
    source: "Google"
  },
  {
    name: "Patricia T.",
    rating: 5,
    text: "Jeffry does an excellent job, he's the best at what he does!",
    date: "1 day ago",
    source: "Google"
  },
  {
    name: "Michael P.",
    rating: 5,
    text: "The very best. Very personable and friendly, gets the job done quick!",
    date: "2 weeks ago",
    source: "Google"
  },
  {
    name: "Adriana K.",
    rating: 5,
    text: "Julio was amazing!!! Took care of the service with good manners and attention.",
    date: "6 days ago",
    source: "Google"
  },
  {
    name: "Olga S.",
    rating: 5,
    text: "Thank you, Katherine and Allison, for the excellent client service and your prompt response.",
    date: "2 weeks ago",
    source: "Google"
  }
] as const;

export const NETWORK_SITES = [
  { name: 'Suffolk County Pest Control', url: 'https://suffolkcountypestcontrol.com', description: 'Suffolk County, NY pest control experts', emoji: '🐛' },
  { name: 'Nassau County Pest Control', url: 'https://nassaucountypestcontrol.net', description: 'Nassau County, NY pest control services', emoji: '🛡️' },
  { name: 'Quest Pest Control', url: 'https://questpest.net', description: 'Suffolk, Nassau & Queens exterminators', emoji: '🎯' },
  { name: 'Queens Pest Control', url: 'https://queenscountypestcontrol.com', description: 'Queens, NY pest control specialists', emoji: '🏙️' },
  { name: 'Brooklyn Pest Control', url: 'https://brooklynnycpestcontrol.com', description: 'Brooklyn, NY pest control services', emoji: '🌉' },
  { name: 'Bronx Pest Control', url: 'https://bronxcountypestcontrol.com', description: 'Bronx, NY pest control experts', emoji: '🦁' },
  { name: 'Manhattan Pest Control', url: 'https://manhattanpestcontrolnearme.com', description: 'Manhattan, NY pest control services', emoji: '🗽' },
  { name: 'NYC Pest Control', url: 'https://nycpestcontrolnearme.com', description: 'New York City pest control services', emoji: '🏢' },
  { name: 'Wildlife NY', url: 'https://wildlifeny.com', description: 'NY wildlife removal specialists', emoji: '🦝' },
  { name: 'The Bed Bug Inspectors', url: 'https://thebedbuginspectors.com', description: 'Bed bug specialists — inspections & treatment', emoji: '🛏️' },
  { name: 'BluesWay Pest Control', url: 'https://blueswaypestcontrol.com', description: 'Professional pest control services', emoji: '🎵' },
  { name: 'The Bugs Stop Here', url: 'https://thebugsstophere.com', description: 'Stop pests in their tracks', emoji: '🛑' },
  { name: 'Liberty Pest Pros', url: 'https://libertypestpros.com', description: 'Liberty pest control professionals', emoji: '🗽' },
] as const;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
