import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';
import { regionFAQs, getNearbyTowns } from '@/lib/jet-town-data';
import { jetTownOpeners } from '@/lib/jet-city-openers-data';
import { cityFAQs, nearbyTownMap, hubNeighborhoods } from '@/lib/jet-layer7-data';

const SERVICE_NAME = 'Rodent Control';
const SERVICE_SLUG = 'rodent-control';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Rodent Control in Brooklyn, NY`,
    body: `Brooklyn's dense urban environment — connected basements, aging plumbing, restaurant refuse, and Prospect Park's wildlife corridors — makes it one of New York City's most challenging boroughs for rodent control. Norway rats colonize basement levels of brownstone blocks, moving between buildings through utility conduits and shared foundation walls. Mice exploit the same gaps, establishing in wall cavities and kitchen cabinetry. Our Brooklyn rodent control specialists use integrated pest management: thorough inspection to find all entry points, bait stations calibrated for your building type, and professional exclusion sealing to prevent re-entry. We don't just trap — we eliminate colonies and close the door behind them.`,
    faqs: [
      { q: 'Why are rats so common in Brooklyn?', a: "Brooklyn has perfect rodent habitat: abundant food from restaurants and outdoor trash, aging sewer infrastructure, connected buildings with basement corridors, and parks that provide breeding cover. Rat populations have thrived for decades despite city extermination efforts." },
      { q: 'How do mice get into Brooklyn apartments?', a: 'Mice can squeeze through gaps as small as a dime. Common entry points include gaps around pipes under sinks, cracks in foundation walls, gaps at door sweeps, and utility penetrations in walls. We identify and seal all entry points as part of our exclusion service.' },
      { q: 'How long does rodent control take in a Brooklyn building?', a: 'Most residential infestations are resolved within 2–4 visits over 2–3 weeks. We return until activity has ceased, and our exclusion work carries a guarantee against re-entry through sealed points.' },
    ],
  },
  queens: {
    headline: `Professional Rodent Control in Queens, NY`,
    body: `Queens' combination of urban density, commercial food waste, and suburban-style green spaces creates persistent rodent pressure across all neighborhoods. Restaurant concentrations in Flushing, Jackson Heights, and Jamaica produce the food waste that sustains large rat populations near residential blocks. Attached rowhomes and multi-family buildings allow mice and rats to migrate through connected basement systems without outdoor exposure. Our Queens rodent control team uses targeted baiting, professional-grade exclusion, and follow-up monitoring to eliminate infestations permanently rather than simply displacing them to adjacent units.`,
    faqs: [
      { q: 'Are rats a problem near Queens restaurants and food courts?', a: "Yes. The extraordinary restaurant density in areas like Flushing, Jackson Heights, and Jamaica creates one of Queens' most significant rodent pressure points. Residential buildings within 1-2 blocks of these commercial corridors face elevated rat pressure year-round." },
      { q: 'Can rats enter Queens homes through the sewer system?', a: 'Yes. Norway rats commonly use sewer infrastructure as travel corridors and can enter buildings through floor drains, broken sewer laterals, and gaps around utility penetrations. We inspect plumbing entry points as part of every rodent assessment.' },
      { q: 'Do you treat rodents in Queens multi-family buildings?', a: 'Yes. We offer whole-building rodent programs for landlords and property managers throughout Queens, with coordinated treatment across all units and common areas.' },
    ],
  },
  manhattan: {
    headline: `Professional Rodent Control in Manhattan, NY`,
    body: `Manhattan's rodent problem is legendary — the city's 24/7 food service industry, underground transit infrastructure, and century-old building stock provide ideal conditions for year-round rat and mouse activity. Our Manhattan rodent control specialists work in both residential and commercial environments: co-op and condo buildings with basement-level rodent pressure, restaurants facing NYC Health Department violations, and office buildings with shared kitchen areas. We use discreet, unmarked service vehicles and schedule around building access protocols. Every treatment plan includes interior baiting, exterior station placement, and professional exclusion of all identified entry points.`,
    faqs: [
      { q: "Why are rats so persistent in Manhattan despite regular extermination?", a: "Manhattan's rat population is sustained by abundant food (restaurants, outdoor dining, trash), underground corridors (subways, utilities), and the sheer scale of connected building basements. Effective control requires eliminating food sources, sealing entry points, and systematic baiting — not just reactive trapping." },
      { q: 'Can mice live on upper floors of Manhattan high-rises?', a: 'Yes. Mice climb plumbing pipes, elevator shafts, and utility chases to access upper-floor units. Infestations are not limited to ground-floor or basement apartments.' },
      { q: 'Do you handle rodent issues for Manhattan restaurants and businesses?', a: 'Yes. We provide commercial rodent control programs for Manhattan restaurants, hotels, and office buildings, including NYC Health Department compliance documentation and emergency response for inspection failures.' },
    ],
  },
  nassau: {
    headline: `Professional Rodent Control in Nassau County, NY`,
    body: `Nassau County's suburban neighborhoods experience rodent pressure that differs from New York City but is no less persistent. Mice routinely enter homes through foundation gaps and utility penetrations as temperatures drop in fall, establishing in wall voids, attic insulation, and basement storage areas. Norway rats colonize properties near commercial areas, dumpsters, and bird feeders, with populations exploding quickly if not addressed professionally. Our Nassau County rodent control team combines interior bait station programs, professional exclusion sealing, and exterior perimeter baiting to eliminate active infestations and prevent recurrence.`,
    faqs: [
      { q: 'When do rodents start entering Nassau County homes?', a: 'Mouse entry into structures typically increases sharply in October as outdoor temperatures drop. Homeowners often notice the first signs — droppings, gnaw marks, sounds in walls — in late fall. Earlier treatment is more effective and less costly.' },
      { q: 'Do bird feeders attract rats to Nassau County yards?', a: 'Yes. Spilled birdseed is one of the most common rat attractants in Nassau County suburban yards. We recommend switching to squirrel-proof feeders and eliminating ground-level seed accumulation as part of any rodent prevention plan.' },
      { q: 'What does rodent exclusion involve for a Nassau County home?', a: 'Exclusion involves sealing all entry points greater than 1/4 inch using copper mesh, caulk, hardware cloth, and expanding foam. We inspect foundations, utility penetrations, garage doors, and rooflines for gaps that allow rodent access.' },
    ],
  },
  suffolk: {
    headline: `Professional Rodent Control in Suffolk County, NY`,
    body: `Suffolk County's mix of wooded neighborhoods, waterfront properties, and residential communities creates rodent pressure that peaks seasonally but persists year-round. Mice seek shelter in homes from October through March, while rat activity near commercial areas and waterfront restaurants continues through all seasons. The county's abundant green space — state parks, nature preserves, residential woodlands — supports large outdoor populations that pressure home foundations and garages. Our Suffolk County rodent control specialists provide thorough inspections, professional exclusion, and targeted bait programs calibrated for both residential and commercial properties.`,
    faqs: [
      { q: 'Are deer mice common in Suffolk County?', a: "Yes. Deer mice are common in Suffolk County's wooded and suburban areas and are a known carrier of hantavirus. Unlike house mice, deer mice typically enter from outdoor habitats rather than urban environments. We identify the species during inspection and tailor treatment accordingly." },
      { q: 'How do rodents enter a Suffolk County home during winter?', a: 'Common entry points include gaps around utility pipe penetrations, foundation cracks, garage door seals, dryer vents, and attic soffit vents. Mice only need a 1/4-inch gap. We perform a full perimeter inspection and seal all identified openings.' },
      { q: 'Do you treat rodents in Suffolk County commercial properties?', a: 'Yes. We serve restaurants, food service facilities, warehouses, and commercial properties throughout Suffolk County with professional rodent control programs including compliance documentation.' },
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
  const title = `${SERVICE_NAME} in ${townName}, ${region.name} | ${BRAND.name}`;
  const description = `Licensed ${SERVICE_NAME.toLowerCase()} in ${townName}. ${BRAND.name} — same-day service, guaranteed results. Call ${BRAND.phoneFormatted}.`;
  return {
    title,
    description: description.length <= 155 ? description : description.slice(0, 152) + '...',
    alternates: { canonical: `https://${BRAND.domain}/${regionSlug}/${SERVICE_SLUG}/${townSlug}` },
    openGraph: {
      title,
      description,
      url: `https://${BRAND.domain}/${regionSlug}/${SERVICE_SLUG}/${townSlug}`,
      images: [{ url: `https://${BRAND.domain}/og-image.png` }],
    },
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
  const canonicalTownName = region.towns.find(
    (t: string) => t.toLowerCase().replace(/\s+/g, '-') === townSlug
  ) ?? townName;
  const isValidTown = region.towns.some(
    (t: string) => t.toLowerCase().replace(/\s+/g, '-') === townSlug
  );
  if (!isValidTown) notFound();

  const content = SERVICE_CONTENT[regionSlug] ?? SERVICE_CONTENT['brooklyn'];
  const uniqueOpener = jetTownOpeners[townSlug] ?? null;
  const townFaqs = cityFAQs[townSlug] ?? regionFAQs[regionSlug] ?? regionFAQs['brooklyn'];
  const neighborhoods = hubNeighborhoods[townSlug] ?? null;

  const allNearby = nearbyTownMap[townSlug] ?? getNearbyTowns(canonicalTownName, region.towns, 4);
  const nearbyTowns = allNearby.filter((town: string) =>
    region.towns.some((t: string) => t.toLowerCase().replace(/[\s']/g, m => m === "'" ? '' : '-') === town.toLowerCase().replace(/[\s']/g, m => m === "'" ? '' : '-'))
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'PestControlService',
    name: `${SERVICE_NAME} in ${canonicalTownName}`,
    provider: { '@type': 'LocalBusiness', name: BRAND.name, telephone: `+1${BRAND.phone}` },
    areaServed: { '@type': 'City', name: canonicalTownName },
    url: `https://${BRAND.domain}/${regionSlug}/${SERVICE_SLUG}/${townSlug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...content.faqs, ...townFaqs.slice(0, 2)].map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${BRAND.domain}` },
      { '@type': 'ListItem', position: 2, name: region.name, item: `https://${BRAND.domain}/${regionSlug}` },
      { '@type': 'ListItem', position: 3, name: SERVICE_NAME, item: `https://${BRAND.domain}/${regionSlug}/${SERVICE_SLUG}` },
      { '@type': 'ListItem', position: 4, name: canonicalTownName, item: `https://${BRAND.domain}/${regionSlug}/${SERVICE_SLUG}/${townSlug}` },
    ],
  };

  return (
    <>
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-primary">Home</Link>
          {' / '}
          <Link href={`/${regionSlug}`} className="hover:text-brand-primary">{region.name}</Link>
          {' / '}
          <Link href={`/${regionSlug}/${SERVICE_SLUG}`} className="hover:text-brand-primary">{SERVICE_NAME}</Link>
          {' / '}
          <span className="text-gray-900">{canonicalTownName}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {SERVICE_NAME} in {canonicalTownName}, {region.stateCode}
        </h1>

        {uniqueOpener ? (
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{uniqueOpener}</p>
        ) : (
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {BRAND.name} provides licensed rodent control to {canonicalTownName} residents and businesses. Our technicians deliver same-day service with treatments that eliminate infestations and seal entry points permanently.
          </p>
        )}

        <p className="text-gray-600 leading-relaxed mb-8">{content.body}</p>

        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
          <div className="bg-brand-light rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-primary">Same Day</div>
            <div className="text-sm text-gray-600">Service Available</div>
          </div>
          <div className="bg-brand-light rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-primary">Licensed</div>
            <div className="text-sm text-gray-600">NY State DEC Certified</div>
          </div>
          <div className="bg-brand-light rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-primary">Guaranteed</div>
            <div className="text-sm text-gray-600">Results or We Return</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a href={`tel:+1${BRAND.phone}`} className="flex-1 text-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            📞 Call {BRAND.phoneFormatted}
          </a>
          <Link href={`/${regionSlug}/contact`} className="flex-1 text-center bg-brand-accent text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Get a Free Quote
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">{SERVICE_NAME} FAQ — {canonicalTownName}</h2>
        <div className="space-y-6 mb-12">
          {[...content.faqs, ...townFaqs.slice(0, 2)].map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>

        {neighborhoods && (
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Neighborhoods We Serve in {canonicalTownName}
            </h2>
            <div className="space-y-3">
              {neighborhoods.map((n: { name: string; detail: string }) => (
                <div key={n.name} className="flex gap-3">
                  <span className="text-brand-primary font-bold mt-0.5">▸</span>
                  <div>
                    <span className="font-semibold text-gray-900">{n.name}:</span>{' '}
                    <span className="text-gray-600">{n.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {nearbyTowns.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Also Serving Nearby Communities</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyTowns.map((town: string) => {
                const slug = town.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={town}
                    href={`/${regionSlug}/${SERVICE_SLUG}/${slug}`}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-brand-primary hover:bg-brand-light hover:border-brand-primary transition-colors"
                  >
                    {town}
                  </Link>
                );
              })}
              <Link
                href={`/${regionSlug}/${SERVICE_SLUG}`}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-brand-primary hover:bg-brand-light hover:border-brand-primary transition-colors"
              >
                All {region.name} Areas →
              </Link>
            </div>
          </div>
        )}

        <div className="bg-brand-primary rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Rodents from {canonicalTownName}?</h2>
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
