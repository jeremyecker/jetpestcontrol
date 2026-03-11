// hub.config.ts — Jet Pest Control
// Everything else reads from here.

// ============================================================
// TEMPLATE METADATA
// ============================================================
export const TEMPLATE_META = {
  vertical: 'pest',
  geoLevel: 'regional-hub',
} as const;

export const BRAND = {
  name: 'Jet Pest Control',
  tagline: 'Professional Pest Control Services — NYC, Long Island & Beyond',
  domain: 'jetpestcontrol.com',
  phone: '7187100330',
  phoneFormatted: '(718) 710-0330',
  email: 'info@jetpestcontrol.com',
  primaryColor: '#1B3A5C',
  secondaryColor: '#2A5C8F',
  accentColor: '#E63946',
  yearFounded: 2015,
  region: 'Brooklyn, Queens, Manhattan, Nassau & Suffolk Counties',
  webhookUrl: '',
} as const;

// ============================================================
// GMBs — add as acquired
// ============================================================
export const GMBS = [] as GMBEntry[];

// ============================================================
// REVIEWS
// ============================================================
export const REVIEWS = [
  {
    name: 'Robert Romar',
    location: 'Brooklyn, NY',
    rating: 5,
    text: "Very happy with the guys from Jet Pest Control, pleased with their work. They removed birds from my attic and covered two holes where the birds had access. Very pleasant and professional and they even took the time to put the baby birds in a nearby tree. I am very happy I found them. Thank you guys!",
  },
  {
    name: 'Angel Vargas',
    location: 'Queens, NY',
    rating: 5,
    text: "Outstanding bed bug extermination service! The technicians from this company were knowledgeable, courteous, and went above and beyond to address the infestation. They explained the process clearly and offered helpful tips to prevent future occurrence. Trustworthy and highly recommended!",
  },
  {
    name: 'Tresha Sanchez',
    location: 'Manhattan, NY',
    rating: 5,
    text: "The building I live in uses poor quality exterminators. I called Jet and they responded immediately. The technician was professional and listened to my concerns. Thanks to them, I feel more at ease knowing I wouldn't be jumping up on tables because of water-bugs. Thanks Jet!",
  },
];

// ============================================================
// REGIONS — Brooklyn (primary), Queens, Manhattan, Nassau, Suffolk
// ============================================================
const BROOKLYN_TOWNS = [
  'Bay Ridge', 'Bedford-Stuyvesant', 'Bensonhurst', 'Borough Park', 'Brighton Beach',
  'Brooklyn Heights', 'Brownsville', 'Bushwick', 'Canarsie', 'Carroll Gardens',
  'Clinton Hill', 'Cobble Hill', 'Coney Island', 'Crown Heights', 'Ditmas Park',
  'Downtown Brooklyn', 'Dumbo', 'Dyker Heights', 'East Flatbush', 'East New York',
  'Flatbush', 'Flatlands', 'Fort Greene', 'Gowanus', 'Gravesend', 'Greenpoint',
  'Greenwood', 'Kensington', 'Marine Park', 'Mill Basin', 'Park Slope',
  'Prospect Heights', 'Sheepshead Bay', 'Sunset Park', 'Williamsburg',
];
const QUEENS_TOWNS = [
  'Arverne', 'Astoria', 'Bayside', 'Bellerose', 'Briarwood',
  'Cambria Heights', 'College Point', 'Corona', 'Douglaston',
  'East Elmhurst', 'Elmhurst', 'Far Rockaway', 'Floral Park',
  'Flushing', 'Forest Hills', 'Fresh Meadows', 'Glen Oaks',
  'Glendale', 'Hollis', 'Howard Beach', 'Jackson Heights',
  'Jamaica', 'Kew Gardens', 'Kew Gardens Hills', 'Little Neck', 'Long Island City',
  'Maspeth', 'Middle Village', 'Oakland Gardens', 'Ozone Park',
  'Queens Village', 'Rego Park', 'Richmond Hill', 'Ridgewood', 'Rosedale',
  'Sunnyside', 'Whitestone', 'Woodhaven', 'Woodside',
];
const MANHATTAN_TOWNS = [
  'Battery Park City', 'Chelsea', 'Chinatown', 'East Harlem', 'East Village',
  'Financial District', 'Flatiron District', 'Gramercy Park', 'Greenwich Village',
  'Hamilton Heights', 'Harlem', 'Hells Kitchen', 'Inwood', 'Kips Bay',
  'Lenox Hill', 'Little Italy', 'Lower East Side', 'Marble Hill', 'Midtown',
  'Morningside Heights', 'Murray Hill', 'NoHo', 'Nolita', 'Roosevelt Island',
  'SoHo', 'Stuyvesant Town', 'Tribeca', 'Upper East Side', 'Upper West Side',
  'Washington Heights', 'West Village', 'Yorkville',
];
const NASSAU_TOWNS = [
  'Albertson', 'Alden Manor', 'Atlantic Beach', 'Baldwin', 'Bayville', 'Bellmore', 'Bethpage',
  'Carle Place', 'Cedarhurst', 'East Meadow', 'East Norwich', 'East Rockaway', 'Elmont',
  'Farmingdale', 'Floral Park', 'Franklin Square', 'Freeport', 'Garden City',
  'Glen Cove', 'Glen Head', 'Glenwood Landing', 'Great Neck', 'Greenvale',
  'Hempstead', 'Herricks', 'Hewlett', 'Hicksville', 'Inwood',
  'Island Park', 'Jericho', 'Lawrence', 'Levittown', 'Lido Beach',
  'Locust Valley', 'Long Beach', 'Lynbrook', 'Malverne', 'Manhasset',
  'Massapequa', 'Massapequa Park', 'Merrick', 'Mineola', 'New Hyde Park',
  'North Bellmore', 'North Merrick', 'North New Hyde Park', 'Oceanside',
  'Old Bethpage', 'Old Westbury', 'Oyster Bay', 'Plainview', 'Point Lookout',
  'Port Washington', 'Rockville Centre', 'Roosevelt', 'Roslyn', 'Roslyn Heights',
  'Sea Cliff', 'Seaford', 'South Farmingdale', 'South Floral Park',
  'South Hempstead', 'Syosset', 'Uniondale', 'Valley Stream', 'Wantagh',
  'West Hempstead', 'Westbury', 'Williston Park', 'Woodbury', 'Woodmere',
];
const SUFFOLK_TOWNS = [
  'Amagansett', 'Amityville', 'Aquebogue', 'Babylon', 'Bay Shore', 'Bayport', 'Bellport',
  'Blue Point', 'Bohemia', 'Brentwood', 'Bridgehampton', 'Brightwaters',
  'Brookhaven', 'Calverton', 'Center Moriches', 'Centereach', 'Centerport', 'Central Islip',
  'Cold Spring Harbor', 'Commack', 'Copiague', 'Coram', 'Cutchogue',
  'Deer Park', 'Dix Hills', 'East Hampton', 'East Islip', 'East Marion',
  'East Moriches', 'East Northport', 'East Patchogue', 'East Quogue',
  'East Setauket', 'Eastport', 'Farmingville', 'Fire Island', 'Flanders',
  'Great River', 'Greenlawn', 'Greenport', 'Hampton Bays', 'Hauppauge', 'Holbrook',
  'Holtsville', 'Huntington', 'Huntington Station', 'Islandia', 'Islip',
  'Islip Terrace', 'Jamesport', 'Kings Park', 'Lake Grove', 'Lake Ronkonkoma',
  'Laurel', 'Lindenhurst', 'Manorville', 'Mastic', 'Mastic Beach',
  'Mattituck', 'Medford', 'Melville', 'Middle Island', 'Miller Place',
  'Montauk', 'Moriches', 'Mount Sinai', 'Nesconset', 'North Babylon',
  'North Patchogue', 'Northport', 'Oakdale', 'Ocean Beach', 'Orient',
  'Patchogue', 'Peconic', 'Port Jefferson', 'Port Jefferson Station',
  'Quogue', 'Remsenburg', 'Ridge', 'Riverhead', 'Rocky Point', 'Ronkonkoma',
  'Sag Harbor', 'Sagaponack', 'Saint James', 'Sayville', 'Selden',
  'Shelter Island', 'Shirley', 'Shoreham', 'Smithtown', 'Sound Beach',
  'South Jamesport', 'Southampton', 'Southold', 'Speonk', 'Stony Brook',
  'Wading River', 'Wainscott', 'Water Mill', 'West Babylon', 'West Islip',
  'West Sayville', 'Westhampton', 'Westhampton Beach', 'Wyandanch', 'Yaphank',
];

export const REGIONS: RegionConfig[] = [
  {
    slug: 'brooklyn',
    name: 'Brooklyn',
    shortName: 'Brooklyn',
    stateName: 'New York',
    stateCode: 'NY',
    isPrimary: true,
    gmbId: null,
    counties: ['Kings County'],
    heroHeadline: 'Brooklyn Pest Control You Can Trust',
    heroSubhead: 'Licensed exterminators serving Williamsburg, Bay Ridge, Park Slope, Bushwick, and all of Brooklyn.',
    heroImage: '/images/brooklyn-hero.jpg',
    geoDescription: "From brownstones in Park Slope to high-rises in Downtown Brooklyn, the borough's dense housing demands expert pest management for bed bugs, rodents, and roaches.",
    primaryPests: ['Bed Bugs', 'Rodents', 'Cockroaches', 'Ants'],
    pestContext: "Brooklyn's dense housing stock, aging buildings, and urban environment create persistent pest challenges from bed bugs, rodents, cockroaches, and ants.",
    metaTitle: 'Brooklyn Exterminators',
    metaDescription: 'Trusted pest control for Brooklyn. Serving Williamsburg, Bay Ridge, Park Slope & all 30 neighborhoods. Discreet, effective treatments.',
    towns: BROOKLYN_TOWNS,
    townCount: BROOKLYN_TOWNS.length,
  },
  {
    slug: 'queens',
    name: 'Queens',
    shortName: 'Queens',
    stateName: 'New York',
    stateCode: 'NY',
    isPrimary: false,
    gmbId: null,
    counties: ['Queens County'],
    heroHeadline: 'Queens Pest Control — Fast, Reliable, Effective',
    heroSubhead: 'Expert pest control for Queens homes, apartments, and businesses. Same-day service available.',
    heroImage: '/images/queens-hero.jpg',
    geoDescription: "Queens' diverse neighborhoods — from row houses in Astoria to apartments in Flushing — demand expert pest management for rodents, roaches, and bed bugs.",
    primaryPests: ['Rodents', 'Cockroaches', 'Bed Bugs', 'Ants'],
    pestContext: "Queens' urban density and diverse housing stock create persistent pest challenges, from rodents and cockroaches in apartments to bed bugs in multi-family buildings.",
    metaTitle: 'Queens Exterminators',
    metaDescription: 'Professional pest control for Queens. Serving Astoria, Flushing, Jamaica & all neighborhoods. Fast response, effective treatments.',
    towns: QUEENS_TOWNS,
    townCount: QUEENS_TOWNS.length,
  },
  {
    slug: 'manhattan',
    name: 'Manhattan',
    shortName: 'Manhattan',
    stateName: 'New York',
    stateCode: 'NY',
    isPrimary: false,
    gmbId: null,
    counties: ['New York County'],
    heroHeadline: 'Manhattan Pest Control — Expert Service, Zero Hassle',
    heroSubhead: 'Discreet, professional pest control for Manhattan apartments, co-ops, and businesses.',
    heroImage: '/images/manhattan-hero.jpg',
    geoDescription: "Manhattan's high-rise apartments, pre-war buildings, and commercial spaces face unique pest pressures from bed bugs, rodents, and cockroaches year-round.",
    primaryPests: ['Bed Bugs', 'Rodents', 'Cockroaches', 'Mice'],
    pestContext: "Manhattan's ultra-dense urban environment, aging building stock, and constant foot traffic create ideal conditions for bed bugs, rodents, and cockroaches.",
    metaTitle: 'Manhattan Exterminators',
    metaDescription: 'Expert pest control for Manhattan. Serving Upper East Side, Harlem, Chelsea & all 32 neighborhoods. Discreet service, guaranteed results.',
    towns: MANHATTAN_TOWNS,
    townCount: MANHATTAN_TOWNS.length,
  },
  {
    slug: 'nassau',
    name: 'Nassau County',
    shortName: 'Nassau',
    stateName: 'New York',
    stateCode: 'NY',
    isPrimary: false,
    gmbId: null,
    counties: ['Nassau County'],
    heroHeadline: 'Nassau County Pest Control Done Right',
    heroSubhead: 'Serving Hempstead, Garden City, Levittown, Long Beach, and every community across Nassau County.',
    heroImage: '/images/nassau-hero.jpg',
    geoDescription: "Nassau County's dense suburban communities and proximity to the coast bring persistent pest challenges from rodents, ants, termites, and mosquitoes.",
    primaryPests: ['Rodents', 'Termites', 'Ants', 'Mosquitoes'],
    pestContext: "Nassau County's suburban density and coastal climate create year-round conditions for rodents, termites, ants, and mosquitoes.",
    metaTitle: 'Nassau County Exterminators',
    metaDescription: 'Professional pest control for Nassau County. Serving Hempstead, Garden City, Levittown & 65 communities.',
    towns: NASSAU_TOWNS,
    townCount: NASSAU_TOWNS.length,
  },
  {
    slug: 'suffolk',
    name: 'Suffolk County',
    shortName: 'Suffolk',
    stateName: 'New York',
    stateCode: 'NY',
    isPrimary: false,
    gmbId: null,
    counties: ['Suffolk County'],
    heroHeadline: 'Suffolk County Pest Control You Can Count On',
    heroSubhead: 'Licensed exterminators serving Huntington, Babylon, Islip, Brookhaven, and all of Suffolk County.',
    heroImage: '/images/suffolk-hero.jpg',
    geoDescription: "From the North Shore estates to the South Shore beaches, Suffolk County homes face year-round pest pressure from rodents, termites, ticks, and wildlife.",
    primaryPests: ['Termites', 'Ticks', 'Rodents', 'Ants'],
    pestContext: "Suffolk County's mix of wooded lots, waterfront properties, and suburban neighborhoods creates ideal conditions for termites, ticks, rodents, and ants.",
    metaTitle: 'Suffolk County Exterminators',
    metaDescription: 'Trusted pest control for Suffolk County. Serving Huntington, Babylon, Islip & all 101 communities.',
    towns: SUFFOLK_TOWNS,
    townCount: SUFFOLK_TOWNS.length,
  },
];

// Town arrays imported from data - see Quest config for full lists
// Brooklyn, Queens, Manhattan, Nassau, Suffolk towns defined in data/towns.json




// ============================================================
// NETWORK SITES — sister sites for cross-linking
// ============================================================
export const NETWORK_SITES: NetworkSite[] = [];

// ============================================================
// TYPES
// ============================================================
export interface GMBEntry {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  placeId: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
}

export interface RegionConfig {
  slug: string;
  name: string;
  shortName: string;
  stateName: string;
  stateCode: string;
  isPrimary: boolean;
  gmbId: string | null;
  counties: string[];
  heroHeadline: string;
  heroSubhead: string;
  heroImage: string;
  geoDescription: string;
  primaryPests: string[];
  pestContext: string;
  metaTitle: string;
  metaDescription: string;
  towns: string[];
  townCount: number;
}

export interface NetworkSite {
  name: string;
  url: string;
  description: string;
  emoji: string;
}
