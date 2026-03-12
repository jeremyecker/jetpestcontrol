import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

const SERVICE_NAME = 'Rodent Control';
const SERVICE_SLUG = 'rodent-control';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Expert Rodent Control Services in Brooklyn, NY`,
    body: `Brooklyn has one of the highest urban rodent densities in the country, driven by aging sewer infrastructure, overflowing commercial waste, and the dense fabric of brownstones and apartment buildings that share walls with restaurants and bodegas. Rats and mice enter homes through gaps as small as a quarter-inch around utility penetrations, under front stoops, and through compromised foundation walls common in pre-war construction. Jet Pest Control's Brooklyn rodent control program combines exterior bait station installation, interior snap-trap placement, and full exclusion sealing of entry points. We also identify harborage areas — overgrown yards, wood piles, compost bins — and advise on sanitation practices that reduce food sources driving rodent activity. Monthly service plans are available for ongoing protection.`,
    faqs: [
      { q: `Why do I have rats even though my building is clean?`, a: `Rats in Brooklyn are often driven by neighborhood-level conditions — adjacent vacant lots, street-level restaurant grease traps, and aging sewer lines — not just your individual building's cleanliness. Entry-point exclusion is more important than interior sanitation alone.` },
      { q: `What's the difference between rat control and mouse control?`, a: `Rats and mice require different approaches. Rats need exterior bait stations and large snap traps near burrow openings. Mice are best controlled with interior snap traps placed along wall runs and exclusion of small gaps around pipes and cables. Jet assesses which rodent species is present before recommending a program.` },
      { q: `How long does Brooklyn rodent control take?`, a: `Most active infestations show significant reduction within 2–4 service visits over 4–6 weeks. Severe cases or buildings adjacent to high-pressure areas like restaurant rows may require longer programs with monthly maintenance visits.` },
    ],
  },
  queens: {
    headline: `Expert Rodent Control Services in Queens, NY`,
    body: `Queens rodent pressure is driven by the same forces that plague all of New York City: aging sewer lines, dense restaurant corridors along Roosevelt Avenue and Northern Boulevard, and rowhomes that share party walls creating easy migration routes. The Long Island Rail Road and subway infrastructure also provide protected harborage and food-rich corridors for rats. Jet Pest Control's Queens rodent program is built around exterior perimeter control — heavy-duty tamper-resistant bait stations placed at building entries, utility penetrations, and perimeter gaps — combined with interior exclusion to deny rats access to living spaces. We also address harborage conditions like deteriorated concrete stoops, ground-level debris, and unprotected compost areas that make properties attractive to rodents.`,
    faqs: [
      { q: `Are Norway rats or roof rats more common in Queens?`, a: `Norway rats (brown rats) dominate Queens, particularly in sewer-adjacent areas and ground-floor buildings. Roof rats are less common but do occur in elevated environments like attics of older wood-frame homes in Woodside and Middle Village. Jet's inspection identifies which species is active and tailors treatment accordingly.` },
      { q: `Can mice come in through Queens apartment building walls?`, a: `Yes. House mice move freely through wall cavities, following electrical conduit and plumbing penetrations from unit to unit. In attached Queens rowhomes, exclusion of internal pathways is as important as sealing exterior entry points.` },
      { q: `What attracts rodents to Queens residential properties?`, a: `The three main attractants are food (unsecured garbage, bird feeders, pet food left outside), water (drainage issues, HVAC condensate), and shelter (wood piles, dense ground cover, deteriorated concrete around foundations). Removing these conditions is part of Jet's integrated rodent management program.` },
    ],
  },
  manhattan: {
    headline: `Expert Rodent Control Services in Manhattan, NY`,
    body: `Manhattan's rodent problem is legendary — and structural. Decades of aging sewer infrastructure beneath some of the world's busiest sidewalks, combined with 24/7 restaurant and food service operations, have created a rodent population that is both enormous and highly adapted to urban pressure. Ground-floor restaurants, basement retail, and the constant sidewalk activity around delivery corridors keep rat populations well-fed and persistent. For residential buildings, the challenge is exclusion: preventing rats from using utility penetrations, elevator pits, and sub-basement mechanical rooms as access points to apartments. Jet Pest Control provides commercial-grade rodent control for Manhattan residential buildings — tamper-resistant exterior bait stations, interior exclusion sealing, and trap placement programs — backed by scheduled follow-up visits to maintain control.`,
    faqs: [
      { q: `How do Manhattan apartment buildings get rodent infestations?`, a: `Most Manhattan residential rodent problems originate from street-level or basement penetrations — gaps around utility risers, deteriorated slab joints, open elevator pit drain lines, and ground-floor delivery entrances. Buildings adjacent to restaurants or with ground-floor food service are at highest risk.` },
      { q: `What should Manhattan apartment residents do if they see a rat inside?`, a: `Immediately notify building management and document the sighting. Under NYC Local Law 55, building owners are required to address pest conditions. If management is unresponsive, residents can file a complaint with 311. Jet Pest Control also works directly with tenants and can provide documentation for housing court.` },
      { q: `How often should Manhattan buildings get rodent service?`, a: `High-risk buildings adjacent to restaurants, with loading docks, or in neighborhoods with known rat pressure should receive monthly exterior bait station maintenance. Lower-risk residential buildings can often maintain control with quarterly inspections and immediate response when activity is observed.` },
    ],
  },
  nassau: {
    headline: `Expert Rodent Control Services in Nassau County, NY`,
    body: `Nassau County's rodent challenge is suburban in character but no less serious than its urban counterpart. Older housing stock with crawl spaces, uninsulated slab perimeters, and attached garages provides easy entry for house mice and Norway rats. The proliferation of residential composting and outdoor chicken coops in communities like Garden City and Mineola has increased ground-level food availability. Municipal sewer upgrades have displaced underground rat populations in some areas, temporarily driving activity into adjacent residential yards. Jet Pest Control's Nassau County rodent control program addresses both interior infestations and exterior pressure — deploying tamper-resistant bait stations around the building perimeter, snap-trap programs inside, and exclusion repair of all entry points below 2 feet.`,
    faqs: [
      { q: `How do mice enter Nassau County homes?`, a: `Mice require only a 1/4-inch gap to enter a home. In Nassau County the most common entry points are gaps around utility penetrations (dryer vents, gas lines, cable conduit), under garage door seals, and around pipe chases in crawl spaces. Fall is peak entry season as mice seek winter warmth.` },
      { q: `Are there rats in Nassau County suburbs?`, a: `Yes. Norway rats are present throughout Nassau County, particularly in communities adjacent to large parks, golf courses, or active restaurant strips. They typically burrow along foundation walls and beneath concrete slabs. Sewer-connected rat activity is common near older municipal infrastructure in Hempstead and Long Beach.` },
      { q: `What is a bait station and is it safe for children and pets?`, a: `Tamper-resistant bait stations are locked plastic housing units that contain rodenticide inside. Children and pets cannot access the bait inside. Jet uses stations rated ASTM-compliant for child and dog tamper resistance and places them at locations away from play areas.` },
    ],
  },
  suffolk: {
    headline: `Expert Rodent Control Services in Suffolk County, NY`,
    body: `Suffolk County rodent pressure comes from two primary sources: the suburban communities of western Suffolk (Babylon, Bay Shore, Islip) where aging sewer infrastructure and dense restaurant corridors drive rat activity similar to Nassau County; and the wooded residential areas of central and eastern Suffolk where white-footed mice — a significant Lyme disease vector — move into homes as temperatures drop each fall. White-footed mice differ from house mice in behavior and control methods, and their role as a tick host makes their control important for household health beyond simple pest management. Jet Pest Control addresses both Norway rat and white-footed/house mouse infestations throughout Suffolk County, with species-appropriate treatment programs and full exclusion repair.`,
    faqs: [
      { q: `What is the difference between house mice and white-footed mice in Suffolk County?`, a: `House mice are year-round indoor residents that breed prolifically inside structures. White-footed mice are woodland species that move indoors in fall seeking winter warmth and typically leave in spring. White-footed mice are the primary reservoir for Lyme disease bacteria in Suffolk County, making their control a health priority.` },
      { q: `How do I keep mice out of my Suffolk County waterfront home?`, a: `Waterfront homes in Suffolk County face additional mouse pressure from tidal marshland and beach dune ecosystems. Key prevention steps include sealing all foundation penetrations with copper mesh and caulk, installing door sweeps on all ground-floor entries, and removing debris piles adjacent to the building. Jet can perform a full exclusion inspection for waterfront properties.` },
      { q: `Can Jet handle commercial rodent control in Suffolk County?`, a: `Yes. Jet Pest Control provides commercial rodent control programs for restaurants, food processing facilities, warehouses, and retail operations throughout Suffolk County. We offer monthly service contracts with detailed documentation suitable for health department inspections.` },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; town: string }>;
}): Promise<Metadata> {
  const { region: regionSlug, town: townSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};
  const townName = townSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const fullTitle = `${SERVICE_NAME} in ${townName}, ${region.stateCode} | ${BRAND.name}`;
  const shortTitle = `${SERVICE_NAME} in ${townName}, ${region.stateCode}`;
  const title = fullTitle.length <= 60 ? fullTitle : shortTitle;
  const description = `Licensed ${SERVICE_NAME.toLowerCase()} serving ${townName}, ${region.stateCode}. ${BRAND.name} — same-day service, guaranteed results. Call ${BRAND.phoneFormatted}.`;
  return {
    title,
    description: description.length <= 155 ? description : description.slice(0, 152) + '...',
    alternates: { canonical: `https://${BRAND.domain}/${regionSlug}/${SERVICE_SLUG}/${townSlug}` },
  };
}

export async function generateStaticParams() {
  const { REGIONS } = await import('@/hub.config');
  return REGIONS.flatMap((region: { slug: string; towns: string[] }) =>
    region.towns.map((town: string) => ({
      region: region.slug,
      town: town.toLowerCase().replace(/\s+/g, '-'),
    }))
  );
}

export default async function ServiceTownPage({
  params,
}: {
  params: Promise<{ region: string; town: string }>;
}) {
  const { region: regionSlug, town: townSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  const townName = townSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const isValidTown = region.towns.some(
    (t: string) => t.toLowerCase().replace(/\s+/g, '-') === townSlug
  );
  if (!isValidTown) notFound();

  const content = SERVICE_CONTENT[regionSlug] ?? SERVICE_CONTENT[Object.keys(SERVICE_CONTENT)[0]];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'PestControlService',
    name: `${SERVICE_NAME} — ${townName}`,
    provider: { '@type': 'LocalBusiness', name: BRAND.name, telephone: `+1${BRAND.phone}` },
    areaServed: { '@type': 'City', name: townName },
    url: `https://${BRAND.domain}/${regionSlug}/${SERVICE_SLUG}/${townSlug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-primary">Home</Link>
          {' / '}
          <Link href={`/${regionSlug}`} className="hover:text-brand-primary">{region.name}</Link>
          {' / '}
          <Link href={`/${regionSlug}/${SERVICE_SLUG}`} className="hover:text-brand-primary">{SERVICE_NAME}</Link>
          {' / '}
          <span className="text-gray-900">{townName}</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.headline}</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">{content.body}</p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a href={`tel:+1${BRAND.phone}`} className="flex-1 text-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            📞 Call {BRAND.phoneFormatted}
          </a>
          <Link href={`/${regionSlug}/contact`} className="flex-1 text-center bg-brand-accent text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Get a Free Quote
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{SERVICE_NAME} FAQ — {townName}</h2>
        <div className="space-y-6 mb-12">
          {content.faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="bg-brand-primary rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Rodents in {townName}?</h2>
          <p className="mb-6 opacity-90">Licensed, insured, same-day service available. Call now or get a free quote online.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:+1${BRAND.phone}`} className="bg-white text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">📞 {BRAND.phoneFormatted}</a>
            <Link href={`/${regionSlug}/contact`} className="bg-brand-accent text-white font-bold py-3 px-8 rounded-lg transition-colors">Get a Free Quote</Link>
          </div>
        </div>
      </div>
      <CTABanner />
    </>
  );
}
