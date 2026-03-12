import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

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
    body: `Gray squirrels are a common sight in Brooklyn's parks and tree-lined streets, but when they enter attics and crawlspaces, they become a serious problem. Squirrels gnaw through fascia boards, ridge vents, and soffit panels to access warm attic spaces — especially in older Brooklyn brownstones and rowhouses where wood trim has weathered over decades. Once inside, they chew electrical wiring, destroy insulation, and create nesting debris that can clog venting. Our Brooklyn squirrel removal team uses one-way exclusion doors that allow squirrels to leave but prevent reentry. After all squirrels have vacated — verified by monitoring — we permanently seal every entry point with gnaw-resistant materials and clean up nesting debris. Same-day service available throughout Brooklyn.`,
    faqs: [
      { q: 'How do squirrels get into Brooklyn brownstones?', a: 'Squirrels exploit gaps at the roofline, deteriorated wood soffit panels, ridge vent openings, and areas where tree branches overhang the roof. Trimming branches 6–8 feet from the roofline significantly reduces access.' },
      { q: 'Is squirrel removal in Brooklyn a humane process?', a: 'Yes. We use one-way exclusion doors that allow squirrels to exit on their own schedule without harm. We never use kill traps or poisons for squirrel removal — exclusion is more effective and permanently resolves the problem.' },
      { q: 'Can squirrels cause a fire hazard in Brooklyn homes?', a: 'Squirrels chew the insulation from electrical wires, which can cause short circuits and fires. This is one reason prompt removal and attic inspection are important when squirrel activity is suspected.' },
    ],
  },
  queens: {
    headline: `Professional Squirrel Removal in Queens, NY`,
    body: `Queens' mature street trees and residential neighborhoods provide squirrels with abundant food and nesting sites — including the attics of homes throughout Bayside, Fresh Meadows, Forest Hills, and Flushing. Squirrels are most likely to attempt entry in late winter and early spring when females seek warm, protected nesting sites for their litters. Once established in an attic, a squirrel family can be heard scrambling and gnawing at all hours. Our Queens squirrel removal specialists perform full exterior inspections to identify all entry points, install one-way exclusion doors, and seal the attic permanently after the animals have left. We also repair damaged soffit, fascia, and ridge venting as part of our exclusion service. Call us for fast, humane squirrel removal throughout Queens.`,
    faqs: [
      { q: 'When do squirrels try to enter Queens homes?', a: 'Squirrel intrusion peaks twice a year in Queens — late winter/early spring (January–March) when females give birth, and late summer/fall (August–October) when young squirrels disperse and look for winter den sites.' },
      { q: 'What noises do squirrels make in Queens attics?', a: 'Squirrels in attics make quick, light scurrying sounds — typically in early morning and late afternoon when they\'re most active. You may also hear rolling sounds (nuts being moved), and loud gnawing.' },
      { q: 'Do you repair squirrel damage to Queens roofs and soffit?', a: 'Yes. Our exclusion service includes repair of damaged entry points. We use galvanized steel mesh, flashing, and sealed caulk to prevent re-entry, and can replace damaged wood fascia and soffit panels.' },
    ],
  },
  manhattan: {
    headline: `Professional Squirrel Removal in Manhattan, NY`,
    body: `While squirrel problems are less common in Manhattan high-rises, residents of northern Manhattan — particularly in Inwood, Washington Heights, and parts of Harlem near parks — regularly deal with squirrels entering through roof-level gaps and upper-floor openings. Pre-war buildings with ornate brick facades and cornices provide numerous gaps that squirrels exploit to access attic spaces and roof voids. Our Manhattan squirrel removal team handles building-access logistics in co-ops and condos, works discreetly, and uses only humane one-way exclusion methods. We coordinate with building management and can provide documentation for HOA records. If squirrels have nested in your Manhattan building, call us for a same-day assessment.`,
    faqs: [
      { q: 'Can squirrels access upper floors of Manhattan buildings?', a: 'Yes. Squirrels are excellent climbers and can access upper floors and roofs via trees, utility lines, and building facades. Northern Manhattan buildings near Inwood Hill Park and Fort Tryon Park see the most activity.' },
      { q: 'How do you remove squirrels from a Manhattan co-op building?', a: 'We work with building management to identify entry points, install one-way exclusion doors at the access sites, and seal permanently after animals have vacated. All work is documented for building records.' },
      { q: 'Are there regulations about squirrel removal in Manhattan?', a: 'Gray squirrels are classified as a nuisance species in New York State and do not require a removal permit. However, work must comply with building regulations and co-op house rules. We ensure all work is fully compliant.' },
    ],
  },
  nassau: {
    headline: `Professional Squirrel Removal in Nassau County, NY`,
    body: `Nassau County's mature suburban neighborhoods — with their dense canopy of oak, maple, and beech trees — support thriving gray squirrel populations that frequently attempt attic entry. Homes in Great Neck, Manhasset, Oyster Bay, and throughout the county deal with squirrel intrusions that cause structural damage and create fire hazards from chewed wiring. Our Nassau County squirrel removal specialists are experts in residential exclusion, identifying every gap in your roofline and attic perimeter and sealing each one with gnaw-proof materials after one-way doors allow the animals to leave safely. We also offer attic insulation inspection and replacement if nesting debris has contaminated your attic. Guaranteed results throughout Nassau County.`,
    faqs: [
      { q: 'How do I know if I have squirrels in my Nassau County attic?', a: 'Signs include rapid light scurrying sounds in the morning and afternoon, visible damage to soffit or fascia boards, and droppings in attic insulation. You may also see squirrels actively entering or exiting near the roofline.' },
      { q: 'Will squirrels chew through the roof to enter a Nassau County home?', a: 'Squirrels don\'t typically chew through solid roofing material, but they will aggressively enlarge existing gaps in wood fascia, soffit, and ridge venting. Preventive inspections before nesting season are the best defense.' },
      { q: 'Is squirrel exclusion guaranteed in Nassau County?', a: 'Yes. We back all exclusion work in Nassau County with a written guarantee. If a squirrel re-enters through a point we sealed, we return and correct the issue at no additional charge.' },
    ],
  },
  suffolk: {
    headline: `Professional Squirrel Removal in Suffolk County, NY`,
    body: `Suffolk County's abundant woodland corridors and mature residential trees sustain large squirrel populations throughout the county's townships. Homes in Smithtown, Huntington, Babylon, and Islip regularly face squirrel intrusions through weathered wood soffits, ridge vents, and gaps at chimney bases. Wooded lots near nature preserves and open space experience the highest intrusion rates, as squirrel populations are dense and territorial disputes push individuals to seek alternate den sites. Our Suffolk County squirrel removal team provides thorough exclusion work — inspection, one-way door installation, permanent sealing, and optional attic remediation. We serve all of Suffolk County's townships and villages with same-day inspection availability.`,
    faqs: [
      { q: 'What time of year are squirrels most active in Suffolk County attics?', a: 'Peak nesting periods in Suffolk County are late January through March and August through October. These are the seasons when squirrel intrusions into attics are most commonly reported.' },
      { q: 'Can squirrels damage insulation in a Suffolk County home?', a: 'Yes. Squirrels use attic insulation as nesting material, compressing and redistributing it in ways that reduce R-value and energy efficiency. They also urinate and defecate in insulation, which may require replacement.' },
      { q: 'Do you handle flying squirrels in Suffolk County?', a: 'Yes. Flying squirrels are nocturnal and often go undetected longer than gray squirrels. They\'re common in wooded Suffolk County areas and are handled with the same humane exclusion methods.' },
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Squirrels in {townName}?</h2>
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
