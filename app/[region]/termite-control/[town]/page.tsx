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

const SERVICE_NAME = 'Termite Control';
const SERVICE_SLUG = 'termite-control';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Termite Control in Brooklyn, NY`,
    body: `Subterranean termites are Brooklyn's most destructive hidden pest — living entirely underground and within wood, they can consume structural lumber for years before signs of damage appear. Brooklyn's brownstones and wood-frame houses, many built between 1880 and 1930, are particularly vulnerable: original untreated lumber in direct soil contact at foundation grade creates ideal termite entry conditions. The Eastern Subterranean Termite is the dominant species throughout New York City, forming colonies of up to 500,000 workers that can cause significant structural damage before discovery. Our Brooklyn termite control program uses liquid termiticide barriers and bait station systems to eliminate colonies and protect structures from re-infestation.`,
    faqs: [
      { q: `How do I know if my Brooklyn brownstone has termites?`, a: `Look for mud tubes on foundation walls or wood surfaces, discarded wings near window sills in spring, hollow-sounding wood when tapped, and small piles of frass (termite droppings) near wood surfaces. Annual professional inspections catch infestations before significant damage occurs.` },
      { q: `Are Brooklyn brownstones at higher risk for termites?`, a: `Yes. Brooklyn brownstones built before 1950 frequently have original wood sill plates in direct contact with soil and original basement wooden framing that has never been treated. These conditions are exactly what Eastern Subterranean Termites exploit.` },
      { q: `How long does termite treatment take for a Brooklyn building?`, a: `A liquid termiticide treatment for a typical Brooklyn brownstone or rowhouse takes 4-6 hours. Bait station installation is faster. We provide a written treatment report and warranty with every service.` },
    ],
  },
  queens: {
    headline: `Professional Termite Control in Queens, NY`,
    body: `Queens has some of the highest termite pressure in New York City — the borough's large inventory of attached rowhomes, many built in the 1920s through 1940s on continuous foundation systems, allows termite colonies to move between buildings without disruption. The Eastern Subterranean Termite forages along soil-structure interfaces, entering through cracks as small as 1/64 of an inch in foundation walls and slab penetrations. Queens' attached housing means a colony under one building can technically forage across an entire block of connected structures. Our Queens termite control team performs thorough pre-treatment inspections and applies liquid termiticide barrier treatments and bait station systems with long-term monitoring.`,
    faqs: [
      { q: `Can termites spread between connected Queens rowhomes?`, a: `Yes. Termite colonies are not contained to a single property — they forage wherever the soil leads them, including under the continuous foundation systems of attached Queens rowhomes. Treating only your unit may not eliminate the colony.` },
      { q: `What is the difference between a termite swarm and a flying ant swarm in Queens?`, a: `Termite swarmers have straight antennae, equal-length wings, and a thick waist. Flying ants have elbowed antennae, unequal wings, and a pinched waist. Either way, a spring swarm indoors indicates an established colony — call us for a free inspection.` },
      { q: `Do you offer termite warranties for Queens homes?`, a: `Yes. Every termite treatment includes a one-year renewable warranty. We perform annual inspection visits and re-treat at no charge if termite activity is found within the warranty period.` },
    ],
  },
  manhattan: {
    headline: `Professional Termite Control in Manhattan, NY`,
    body: `Termites in Manhattan are less visible than in the outer boroughs — but no less destructive. The dense urban infrastructure means Eastern Subterranean Termite colonies live underground beneath sidewalks, street trees, and building foundations, foraging upward into structural wood whenever they find access. Pre-war Manhattan buildings with original wood joists, subflooring, and window framing are particularly vulnerable. The moisture conditions created by aging plumbing systems and below-grade spaces accelerate termite activity. Our Manhattan termite control program uses non-disruptive liquid treatment and bait station systems suitable for occupied high-rise and brownstone environments.`,
    faqs: [
      { q: `Are termites common in Manhattan?`, a: `Termites are present throughout Manhattan, though less commonly encountered than in the outer boroughs due to less exposed wood-soil contact. The highest-risk buildings are pre-war structures with original wood framing elements near grade.` },
      { q: `Can you treat termites in a Manhattan building without major disruption?`, a: `Yes. We use targeted liquid termiticide application through small-diameter drill holes and bait station installation that requires no structural modification. Treatments are completed in a single day with minimal disruption.` },
      { q: `How do termites access a Manhattan building from underground?`, a: `Eastern Subterranean Termites build mud tubes that allow them to travel from soil to wood while maintaining the moisture they need. These tubes can run up foundation walls, through expansion joints, and along utility penetrations to reach structural wood.` },
    ],
  },
  nassau: {
    headline: `Professional Termite Control in Nassau County, NY`,
    body: `Nassau County has among the highest termite pressure in New York State. The island's sandy soil, abundant moisture, and large inventory of pre-1980 housing stock create ideal conditions for Eastern Subterranean Termite colonies throughout the county. Virtually every home built before 1975 has untreated lumber in areas of potential soil contact — and most have never received a professional termite treatment. Nassau's connected neighborhood layouts mean termite colonies can forage across multiple property lines simultaneously. Our Nassau County termite control team performs complete perimeter inspections and uses both liquid termiticide barriers and Sentricon bait station systems to eliminate colonies and provide long-term protection.`,
    faqs: [
      { q: `How common are termites in Nassau County?`, a: `Eastern Subterranean Termites are present on virtually every block in Nassau County. An estimated 1 in 5 homes in Nassau County has some level of termite activity at any given time, most of it undetected.` },
      { q: `What does a Nassau County termite inspection involve?`, a: `Our inspector examines the entire perimeter foundation, all basement and crawlspace areas, garage slab edges, wood deck connections, and any exterior wood features in contact with or near soil. The inspection takes 45-60 minutes and includes a written report.` },
      { q: `How long does termite treatment last for a Nassau County home?`, a: `Liquid termiticide treatments provide 5-10 years of protection. Bait station systems provide ongoing protection with annual monitoring. We offer renewable annual warranties on all treatments.` },
    ],
  },
  suffolk: {
    headline: `Professional Termite Control in Suffolk County, NY`,
    body: `Suffolk County's termite pressure rivals any suburban area on the East Coast. The county's combination of sandy loam soil (ideal for subterranean termite tunneling), abundant moisture from coastal proximity, and aging housing stock creates conditions where termite colonies thrive across the entire county — from Babylon to Montauk. Long Island's barrier island communities face additional pressure from moisture infiltration and the untreated wood common in beach cottages and seasonal structures. Our Suffolk County termite control program includes thorough property inspections, liquid termiticide perimeter treatments, and bait station monitoring systems to eliminate existing colonies and prevent future infestations.`,
    faqs: [
      { q: `Are Hamptons beach homes at risk for termites?`, a: `Extremely high risk. Beach communities in the Hamptons and across the South Fork have historically high termite pressure due to moisture conditions, sandy soil, and older wood construction. We recommend annual inspections for all Suffolk County coastal properties.` },
      { q: `Can termites damage a Suffolk County home in just one season?`, a: `A large Eastern Subterranean Termite colony can consume a 2x4 wood member in as little as 6 months under ideal conditions. Most infestations develop over several years before detection, but damage can be significant.` },
      { q: `Do you treat termites in Suffolk County crawlspace homes?`, a: `Yes. Crawlspace homes are among the highest-risk structures for termite damage because wood framing is near soil grade. We treat crawlspace sill plates, floor joists, and the surrounding soil with termiticide and install bait stations around the perimeter.` },
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
            {BRAND.name} provides licensed {SERVICE_NAME.toLowerCase()} service to {canonicalTownName} residents and businesses. Same-day appointments available — call {BRAND.phoneFormatted}.
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
            <div className="text-2xl font-bold text-brand-primary">Warranted</div>
            <div className="text-sm text-gray-600">Written Guarantee Included</div>
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
          <h2 className="text-2xl font-bold mb-2">Ready to Protect Your {canonicalTownName} Home from Termites?</h2>
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
