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

const SERVICE_NAME = 'Squirrel Removal';
const SERVICE_SLUG = 'squirrel-removal';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Squirrel Removal in Brooklyn, NY`,
    body: `Squirrels are one of Brooklyn's most overlooked structural pests. Eastern gray squirrels are ubiquitous in Prospect Park, Fort Greene Park, and the tree-lined streets throughout Park Slope, Carroll Gardens, and Bedford-Stuyvesant — and they regularly access attics through gaps at roofline fascia, deteriorated soffit vents, and open chimney caps. Once inside, squirrels gnaw electrical wiring, shred insulation for nesting, and establish persistent colonies that require professional exclusion to resolve. Our Brooklyn squirrel removal team uses one-way exclusion doors and permanent sealing to remove animals humanely and prevent return.`,
    faqs: [
      { q: 'How do squirrels get into Brooklyn brownstones and row houses?', a: 'Squirrels enter through gaps at the roofline — deteriorated fascia boards, open soffit vents, gaps where dormers meet the main roof, and uncapped chimneys. They can gnaw through wood and plastic to enlarge existing gaps.' },
      { q: 'Is squirrel removal urgent?', a: 'Yes. Squirrels gnaw electrical wiring, which creates fire hazard. A family of squirrels can also destroy attic insulation within a single nesting season. Early intervention prevents expensive structural damage.' },
      { q: 'Can you remove squirrels with babies?', a: 'Yes, but we time the exclusion carefully around the breeding season. We use one-way doors to allow adult squirrels to exit and reunite with their young in an outdoor nest before permanently sealing entry points.' },
    ],
  },
  queens: {
    headline: `Professional Squirrel Removal in Queens, NY`,
    body: `Queens' abundant parks and tree canopy — from Forest Park to Alley Pond Park to Kissena Corridor — sustain large squirrel populations that regularly access residential attics throughout neighborhoods from Bayside to Forest Hills to Fresh Meadows. Squirrels are most problematic in fall when they seek warm nesting sites, but they can be active in attic spaces year-round. Our Queens squirrel removal team inspects rooflines, soffit areas, and attic interiors to locate all entry points and active nesting areas, then installs one-way doors and permanently seals the structure after all animals have vacated.`,
    faqs: [
      { q: 'How do I know if squirrels are in my Queens attic?', a: 'Listen for rapid scurrying sounds above ceilings in the early morning and late afternoon. You may also see squirrels repeatedly accessing your roofline, find chewed wood at fascia or soffit areas, or discover insulation disturbed when you access the attic.' },
      { q: 'What time of year are squirrels most likely to enter Queens homes?', a: 'Squirrels have two breeding seasons — spring (February–April) and fall (August–October). Fall nesting is when attic entry is most common as squirrels seek warm overwintering sites. However, squirrels can access homes any time of year.' },
      { q: 'Will squirrels leave on their own?', a: 'Rarely. Squirrels that have established a nest in an attic treat it as a permanent home. Without professional exclusion, they will continue returning and gnawing new entry points as old ones are blocked.' },
    ],
  },
  manhattan: {
    headline: `Professional Squirrel Removal in Manhattan, NY`,
    body: `Manhattan's squirrel population concentrates in its parks — Central Park, Riverside Park, Morningside Park — and the animals regularly access buildings along park borders in neighborhoods from the Upper West Side to Inwood. Squirrels enter through gaps in aging parapet walls, rooftop mechanical penetrations, and gaps where HVAC equipment meets the building facade. In older pre-war buildings, they access attic and crawlspace areas that haven't been inspected in decades. Our Manhattan squirrel removal specialists work within co-op and condo building protocols, coordinating with building management for roof access and implementing humane one-way exclusion.`,
    faqs: [
      { q: 'Can squirrels enter Manhattan high-rise buildings?', a: 'Squirrels typically access buildings at lower heights — 1-4 story structures near parks are most commonly affected. In Manhattan, the most common squirrel problems are in townhouses, brownstones, and low-rise buildings in northern Manhattan neighborhoods near parks.' },
      { q: 'What damage can squirrels cause in a Manhattan building?', a: 'Squirrels gnaw electrical wiring (creating fire risk), destroy insulation, create nesting debris that blocks ventilation, and introduce parasites including fleas and ticks. Attic remediation may be needed after removal.' },
      { q: 'How do you access a roofline in a Manhattan building for squirrel exclusion?', a: 'We coordinate roof access with building management and carry all required insurance for high-rise work. Our technicians assess all exterior entry points from exterior ladders or through building rooftop access.' },
    ],
  },
  nassau: {
    headline: `Professional Squirrel Removal in Nassau County, NY`,
    body: `Nassau County's mature suburban tree canopy — the old oaks, maples, and elms that shade the neighborhoods from Great Neck to Garden City to Massapequa — creates ideal squirrel habitat right alongside the rooflines of thousands of homes. Squirrels access attics through gaps at the fascia, open gable vents, and deteriorated soffit panels, particularly in older Cape Cods and colonials with original wood roofline components. Once established in an attic, a pair of squirrels can produce two litters per year, creating a persistent structural pest problem. Our Nassau County squirrel removal team handles everything from initial inspection through exclusion and structural sealing.`,
    faqs: [
      { q: 'How common is squirrel attic entry in Nassau County homes?', a: "Very common. Nassau County's combination of mature trees overhanging older homes creates ideal conditions. We receive squirrel calls throughout the county year-round, with peaks in fall and early spring during nesting seasons." },
      { q: 'What is the exclusion process for a Nassau County home?', a: 'We inspect the full exterior to locate all entry points, install one-way exclusion doors at active entry areas, and return after 7-14 days to confirm all animals have vacated before permanently sealing every opening.' },
      { q: 'Do you clean up squirrel nesting material and insulation damage in Nassau County?', a: 'Yes. We offer attic cleanup and insulation replacement services following squirrel removal. Squirrel feces, urine, and nesting material can harbor pathogens and should be professionally remediated.' },
    ],
  },
  suffolk: {
    headline: `Professional Squirrel Removal in Suffolk County, NY`,
    body: `Suffolk County's wooded neighborhoods — from Smithtown to Dix Hills to the pine barrens communities — provide squirrels with excellent habitat that frequently borders residential properties. Fall is peak season as squirrels seek attic spaces for overwintering, but spring breeding also drives structural entry on Long Island. Older homes throughout Suffolk County have fascia, soffit, and roofline components that deteriorate and create entry points even without direct squirrel gnawing. Our Suffolk County squirrel removal team serves all townships with humane exclusion, permanent structural sealing, and attic inspection services.`,
    faqs: [
      { q: 'Are flying squirrels found in Suffolk County?', a: "Yes. Northern flying squirrels are present in Suffolk County's wooded areas and can enter homes just like gray squirrels. They are nocturnal, so homeowners may hear activity at night rather than during daylight hours. We identify the species during inspection." },
      { q: 'How do I prevent squirrels from re-entering my Suffolk County home after removal?', a: 'Permanent prevention requires sealing all potential entry points — not just the active one. We inspect the full roofline, gable vents, fascia, and soffit, and seal every gap greater than 1 inch with hardware cloth and metal flashing that squirrels cannot chew through.' },
      { q: 'Do you service the Hamptons and East End for squirrel removal?', a: 'Yes. We serve all of Suffolk County including the East End, North Fork, and barrier island communities. Seasonal homes that are unoccupied in winter are particularly vulnerable to squirrel entry.' },
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
            {BRAND.name} provides licensed squirrel removal to {canonicalTownName} residents and businesses. Our technicians use humane one-way exclusion methods and permanent sealing to resolve infestations completely.
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
            <div className="text-sm text-gray-600">NY State DEC Permitted</div>
          </div>
          <div className="bg-brand-light rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-primary">Humane</div>
            <div className="text-sm text-gray-600">One-Way Exclusion</div>
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
          <h2 className="text-2xl font-bold mb-2">Ready to Remove Squirrels from {canonicalTownName}?</h2>
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
