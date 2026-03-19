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
    body: `Brooklyn's density makes it one of New York's most rodent-challenged boroughs. Norway rats thrive near the commercial avenues — the restaurant strips on Fifth Avenue, Atlantic Avenue, and Flatbush Avenue generate food waste that sustains large populations which migrate into adjacent residential brownstones and apartment buildings. House mice exploit the original knob-and-tube plumbing and lath-and-plaster walls of pre-war buildings to travel between units without detection. Our Brooklyn rodent control technicians use a multi-step approach: exterior exclusion to seal entry points, interior baiting stations in harborage areas, and snap traps in active zones. We identify the source rather than just treating visible activity.`,
    faqs: [
      { q: `Why are there so many rats in Brooklyn?`, a: `Brooklyn's combination of dense restaurant districts, aging sewer infrastructure, and connected building basements creates ideal conditions for Norway rat populations. Rats access buildings through gaps as small as ½ inch around utility pipes and foundation cracks.` },
      { q: `How do mice get into Brooklyn apartments on upper floors?`, a: `Mice are excellent climbers and travel through plumbing chases, electrical conduits, and shared wall voids between connected brownstone units. Upper-floor infestations often originate in ground-floor or basement harborage areas.` },
      { q: `How quickly can you respond to a rodent problem in Brooklyn?`, a: `We offer same-day and next-day appointments throughout Brooklyn. Early morning calls have the best chance for same-day service.` },
    ],
  },
  queens: {
    headline: `Professional Rodent Control in Queens, NY`,
    body: `Queens' combination of dense residential neighborhoods, active commercial corridors, and proximity to major transit infrastructure creates year-round rodent pressure across the borough. The elevated subway lines along Roosevelt Avenue and Jamaica Avenue create shadowed corridors beneath which restaurant refuse accumulates, sustaining large rat populations that spread into residential streets. House mice are a persistent concern in Queens' abundant stock of brick walk-up apartment buildings, where aging plumbing chases and shared basements allow populations to migrate across entire buildings. Our Queens rodent control team uses exterior exclusion, interior baiting, and targeted snap trapping to eliminate infestations at the source.`,
    faqs: [
      { q: `Are rats common near the subway lines in Queens?`, a: `Yes. The elevated subway corridors along Roosevelt and Jamaica Avenues concentrate food waste from street vendors and restaurants, creating ideal conditions for Norway rat populations. These rats regularly migrate into surrounding residential buildings.` },
      { q: `Can rodents travel between connected row houses in Queens?`, a: `Absolutely. Queens' attached rowhomes share basement walls, plumbing chases, and utility corridors that rodents use as travel highways. An infestation in one unit can spread to neighboring homes without ever entering the outdoors.` },
      { q: `What should I do if I hear scratching in my walls at night in Queens?`, a: `Wall scratching, especially at night, typically indicates mice or rats traveling through wall voids. Call us for a same-day inspection — the sooner an infestation is addressed, the less structural damage occurs.` },
    ],
  },
  manhattan: {
    headline: `Professional Rodent Control in Manhattan, NY`,
    body: `Manhattan's rodent problem is one of the oldest in the Western Hemisphere — rats arrived with the first Dutch settlers and have been expanding their underground territory ever since. The subway system's 245 miles of track and thousands of station rooms provide climate-controlled corridors that rats navigate from the Battery to Inwood without surfacing. Buildings throughout Manhattan experience rodent intrusions through utility penetrations, basement service entrances, and loading docks that open multiple times daily. Our Manhattan rodent control program addresses both the entry points and the harborage — sealing gaps, removing attractants, and placing professional-grade bait stations and traps in the specific locations where rodents travel.`,
    faqs: [
      { q: `Do Manhattan high-rises get rats even on upper floors?`, a: `Yes. Rats and mice access high-rise buildings through basement service areas and travel vertically through utility shafts, pipe chases, and elevator shafts. We've treated active rodent infestations on floors 20 and above.` },
      { q: `Is there a NYC law requiring landlords to address rodent infestations?`, a: `Yes. Under the NYC Housing Maintenance Code, landlords are required to exterminate rodents within 30 days of a written tenant complaint. Our technicians provide documentation for tenant and landlord records.` },
      { q: `Can rodent control be done discreetly in a Manhattan co-op building?`, a: `Absolutely. We use unmarked vehicles, carry equipment in standard bags, and coordinate with building management to schedule treatments at times that minimize visibility to other residents.` },
    ],
  },
  nassau: {
    headline: `Professional Rodent Control in Nassau County, NY`,
    body: `Nassau County's suburban landscape creates seasonal rodent pressure that peaks in fall as temperatures drop and mice and rats seek shelter in residential structures. House mice exploit the smallest gaps — less than a dime's width — around utility penetrations, foundation weep holes, and garage door frames to enter warm basements and crawlspaces. Norway rats are active year-round near commercial areas and dumpster locations, with populations in restaurant areas of Hempstead, Freeport, and Garden City regularly migrating into adjacent residential streets. Our Nassau County rodent control program combines professional-grade exterior exclusion materials, bait stations, and interior snap trapping to eliminate infestations and prevent re-entry.`,
    faqs: [
      { q: `When do mice most commonly enter Nassau County homes?`, a: `The peak entry period is September through November as temperatures drop below 50°F. Mice seek heated spaces and can squeeze through any gap larger than ¼ inch — a gap easily found around utility pipes entering foundations.` },
      { q: `Do I need to worry about rats in suburban Nassau County?`, a: `Yes. Norway rats are active throughout Nassau County, particularly near commercial areas, restaurant dumpsters, and bird feeders. They burrow under concrete slabs and access homes through basement utility openings.` },
      { q: `What is rodent exclusion and does it really work?`, a: `Rodent exclusion involves sealing all potential entry points with steel wool, hardware cloth, caulk, and metal flashing — materials that rodents cannot chew through. Combined with interior treatment, exclusion provides the most permanent solution.` },
    ],
  },
  suffolk: {
    headline: `Professional Rodent Control in Suffolk County, NY`,
    body: `Suffolk County's mix of suburban neighborhoods, wooded preserves, and agricultural land creates year-round rodent pressure from both the native species — white-footed mice, meadow voles, deer mice — and the commensal species that live alongside humans: Norway rats and house mice. Fall migration into homes intensifies in Suffolk due to the larger undeveloped areas surrounding residential communities, giving rodent populations a larger source reservoir than is typical in denser suburban areas. Hamlets near the Long Island Sound and Great South Bay experience additional pressure from waterfront industrial activity. Our Suffolk County rodent control team handles everything from single-family home exclusion projects to multi-building commercial bait station programs.`,
    faqs: [
      { q: `Are deer mice a concern in Suffolk County?`, a: `Yes. Deer mice are common in Suffolk County's wooded areas and can carry Hantavirus. We recommend professional treatment rather than DIY methods when deer mice are suspected, as disturbing nesting material can aerosolize virus particles.` },
      { q: `Do rodent problems get worse near the Hamptons marshes and wetlands?`, a: `Wetland and marsh environments support large rodent populations. Homes bordering nature preserves and wetlands in the Hamptons and East End experience elevated pressure, especially during drought years when natural food sources dry up.` },
      { q: `How often should I have my Suffolk County home inspected for rodents?`, a: `We recommend an annual fall inspection before the peak entry season, plus an inspection any time you see droppings, hear scratching, or notice gnaw marks. Early detection dramatically reduces treatment costs.` },
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
  const title = `${SERVICE_NAME} in ${townName}, ${region.name}`;
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Rodents in {canonicalTownName}?</h2>
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
