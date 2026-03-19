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

const SERVICE_NAME = 'Cockroach Exterminator';
const SERVICE_SLUG = 'cockroach-exterminator';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Cockroach Exterminator in Brooklyn, NY`,
    body: `German cockroaches are Brooklyn's most persistent pest — small enough to hide in the thinnest wall crack, prolific enough to produce 300 offspring in a single month, and hardy enough to survive most over-the-counter sprays. In Brooklyn's brownstones and pre-war apartment buildings, a cockroach infestation in one unit's kitchen can spread to an entire building within weeks via shared plumbing chases and wall voids. The commercial kitchen density on Flatbush Avenue, Atlantic Avenue, and the borough's restaurant corridors creates reservoirs of cockroach activity that continuously reinfest adjacent residential buildings. Our Brooklyn cockroach extermination program uses gel bait, insect growth regulators, and targeted application in harborage zones — eliminating infestations in 1-2 treatments.`,
    faqs: [
      { q: `Why do I keep getting cockroaches even after treating my Brooklyn apartment?`, a: `Re-infestation typically occurs because neighboring units or shared building spaces remain untreated. German cockroaches spread through wall voids and plumbing chases from connected units. A whole-building treatment approach is the most effective long-term solution.` },
      { q: `Are the cockroach treatments safe for children and pets?`, a: `Yes. We use gel baits applied in specific harborage areas inaccessible to children and pets, and insect growth regulators that are non-toxic to mammals. There is no need to leave your Brooklyn apartment during or after treatment.` },
      { q: `How fast does cockroach extermination work in a Brooklyn apartment?`, a: `Most Brooklyn cockroach infestations show significant reduction within 3-5 days of gel bait application. Full elimination typically takes 2-3 weeks, with a follow-up visit included in every service.` },
    ],
  },
  queens: {
    headline: `Professional Cockroach Exterminator in Queens, NY`,
    body: `Queens' extraordinary restaurant density — the borough has more restaurants per square mile than almost anywhere else in the world — creates a cockroach pressure environment that affects residential buildings throughout the borough. The commercial kitchen ecosystems of Flushing's Main Street, Jackson Heights' 74th Street, and Jamaica's commercial corridor support massive German cockroach populations that migrate nightly into adjacent residential buildings. Queens' stock of pre-war apartment buildings with original plumbing and shared basement systems allows cockroach populations to spread across entire building footprints. Our Queens cockroach extermination team uses targeted gel bait placement and insect growth regulators to eliminate populations at the source.`,
    faqs: [
      { q: `Can cockroaches come from restaurants into my Queens apartment?`, a: `Yes. German cockroaches regularly migrate between commercial kitchens and residential buildings through shared walls, plumbing penetrations, and utility conduits. If you live above or adjacent to a restaurant in Queens, you face elevated cockroach pressure.` },
      { q: `Do I need to prepare my Queens apartment before a cockroach treatment?`, a: `We recommend removing items from under sinks and behind appliances for access to harborage zones. No need to bag food or leave the apartment — our gel bait treatments are safe for occupied spaces.` },
      { q: `How many treatments does it take to eliminate cockroaches in Queens?`, a: `Most Queens cockroach infestations are resolved in 1-2 treatments. Severe infestations or multi-unit building situations may require a follow-up visit 3-4 weeks after the initial service.` },
    ],
  },
  manhattan: {
    headline: `Professional Cockroach Exterminator in Manhattan, NY`,
    body: `Manhattan's 24/7 food culture — the street carts, the all-night diners, the office building cafeterias — creates a cockroach ecosystem that never sleeps. German cockroaches are the dominant species, thriving in the warm, humid environments of restaurant kitchens and then migrating into residential buildings through shared walls and utility penetrations. Pre-war Manhattan buildings have original plumbing systems designed before pest control was a consideration — every pipe penetration, every steam riser, every dumbwaiter shaft is a cockroach corridor. Our Manhattan cockroach program uses professional gel bait formulations and insect growth regulators that interrupt cockroach reproduction cycles, achieving lasting results where store-bought sprays create resistance.`,
    faqs: [
      { q: `Are cockroaches common in Manhattan luxury buildings?`, a: `Yes. Building prestige has no bearing on cockroach risk. Luxury high-rises have the same plumbing penetrations and service entrances as older buildings, and cockroaches access them the same way. We regularly treat five-star buildings and Upper East Side co-ops.` },
      { q: `My Manhattan building has a pest control service but I still have cockroaches — why?`, a: `Building-level pest control programs often use quarterly spray treatments that provide short-term relief but don't address harborage zones or use insect growth regulators. A targeted gel bait program applied by our technicians typically outperforms building-wide spray programs.` },
      { q: `Can you treat cockroaches in my Manhattan home office without disrupting my work?`, a: `Yes. Gel bait treatments are applied in specific harborage areas and are completely odorless. We can work around your schedule and the treatment takes 30-45 minutes for a typical Manhattan apartment.` },
    ],
  },
  nassau: {
    headline: `Professional Cockroach Exterminator in Nassau County, NY`,
    body: `Nassau County cockroach problems differ from the city in important ways. While German cockroaches dominate in urban environments, Nassau County homeowners also contend with American cockroaches (water bugs) and Oriental cockroaches in basement and crawlspace environments. The moisture conditions in Nassau's aging housing stock — particularly in homes with finished basements near the water table — create ideal conditions for the larger peridomestic species. Restaurant concentrations in Hempstead, Valley Stream, and Freeport generate cockroach pressure that reaches adjacent residential areas. Our Nassau County cockroach extermination team treats both German and peridomestic species with targeted programs appropriate for suburban single-family homes.`,
    faqs: [
      { q: `What is the difference between German cockroaches and water bugs in Nassau County homes?`, a: `German cockroaches (small, tan, live in kitchens) are introduced via groceries and appliance deliveries. American cockroaches (large, reddish-brown) enter from exterior through basement drains and utility penetrations. Both require professional treatment but different protocols.` },
      { q: `Do cockroaches in Nassau County homes mean the house is dirty?`, a: `No. Cockroach infestations in Nassau County most commonly result from introductions via grocery bags, secondhand appliances, or cardboard boxes — not sanitation issues. Any home can develop a cockroach problem regardless of cleanliness.` },
      { q: `How do you treat cockroaches in a Nassau County home with children and pets?`, a: `We use gel baits placed precisely in harborage zones inaccessible to children and pets, and insect growth regulators that affect only insects. Treatments are safe for occupied homes and require no preparation or evacuation.` },
    ],
  },
  suffolk: {
    headline: `Professional Cockroach Exterminator in Suffolk County, NY`,
    body: `Suffolk County cockroach infestations most commonly involve German cockroaches introduced via groceries and used appliances, and American cockroaches entering from exterior moisture environments in basement and crawlspace areas. The county's coastal communities experience elevated moisture pressure that creates ideal conditions for peridomestic cockroach species in basement apartments and below-grade spaces. Commercial areas in Babylon, Brentwood, and Patchogue generate restaurant-associated cockroach pressure. Our Suffolk County cockroach extermination team uses gel bait and insect growth regulator programs that achieve full elimination in 1-2 visits.`,
    faqs: [
      { q: `How do cockroaches get into Suffolk County homes?`, a: `The most common entry routes are grocery bags from infested stores, secondhand appliances and furniture, cardboard moving boxes, and utility penetrations in basements. German cockroaches can also migrate between connected units in multi-family buildings.` },
      { q: `Are cockroaches a year-round problem in Suffolk County?`, a: `Yes. German cockroaches are indoor pests that thrive year-round in heated structures. American cockroaches may become more active outdoors in summer but remain in heated basement environments year-round.` },
      { q: `What is the fastest way to get rid of cockroaches in my Suffolk County home?`, a: `Professional gel bait treatment is the fastest and most effective approach. Our technicians place bait in specific harborage zones, and cockroaches begin feeding within hours. Most infestations show significant reduction within 3-5 days.` },
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Cockroaches in {canonicalTownName}?</h2>
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
