import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

const SERVICE_NAME = 'Wildlife Removal';
const SERVICE_SLUG = 'wildlife-removal';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Wildlife Removal Services in Brooklyn, NY`,
    body: `Wildlife intrusions in Brooklyn go beyond squirrels and raccoons. Opossums den under decks and in basement window wells. Skunks burrow under front stoops and concrete slabs. Canada geese establish aggressive nesting territories in Prospect Park and waterfront green spaces. Even the occasional red fox has been spotted denning in larger Brooklyn cemeteries. Jet Pest Control handles the full range of urban wildlife common to Brooklyn's neighborhoods, providing humane removal, exclusion, and habitat modification. Our technicians are licensed by the New York State DEC and carry liability insurance for all wildlife work. Whether you're dealing with a skunk under a deck in Park Slope or an opossum in your Greenpoint garage, Jet responds quickly and resolves the problem completely.`,
    faqs: [
      { q: `What wildlife species are most common in Brooklyn homes?`, a: `Raccoons and squirrels lead the list, followed by opossums (under decks and in crawl spaces), skunks (burrowing under stoops and slabs), and occasionally feral cats that create nesting debris. Jet Pest Control handles all of these species under a single service agreement.` },
      { q: `Is wildlife removal in Brooklyn covered by homeowners insurance?`, a: `Damage caused by wildlife — chewed wiring, torn insulation, soiled drywall — is often covered under standard homeowners policies as 'sudden and accidental' damage. The removal service itself is generally not covered, but remediation costs frequently are. Check your policy or ask your insurer.` },
      { q: `How do you handle skunks near a Brooklyn brownstone?`, a: `Skunks must be approached very carefully to avoid spray. Jet Pest Control uses live-cage traps covered with a tarp to reduce agitation, sets traps at dusk when skunks are active, and removes them before dawn. We then seal the burrow entrance with compacted fill and galvanized mesh.` },
    ],
  },
  queens: {
    headline: `Wildlife Removal Services in Queens, NY`,
    body: `Queens' geography — bounded by Jamaica Bay, the Long Island Sound, and extensive park land including Alley Pond Park and Forest Park — creates a diverse urban wildlife environment. Beyond raccoons and squirrels, Queens residents regularly encounter opossums, groundhogs, skunks, and migratory waterfowl like Canada geese that establish aggressive nesting territories in residential yards. Jamaica Bay Wildlife Refuge also pushes occasional unusual species into adjacent neighborhoods during seasonal migrations. Jet Pest Control is licensed to remove all common Queens wildlife species humanely and in compliance with New York State DEC regulations. We handle everything from a groundhog burrowing under a Howard Beach deck to a Canada goose nesting against a Bayside home's front door — providing fast, professional resolution.`,
    faqs: [
      { q: `What wildlife species are most common in Queens residential areas?`, a: `Raccoons and gray squirrels are most frequent, followed by opossums (in basement egress windows and under decks), groundhogs (burrowing under slabs and decks in eastern Queens), and skunks. Canada geese become a problem near the retention ponds and park edges in Bayside and Douglaston.` },
      { q: `Are groundhogs a problem in Queens?`, a: `Yes — particularly in eastern Queens neighborhoods like Hollis, Jamaica, and Bellerose where yards are larger and adjacent to park land. Groundhog burrows can undermine foundations and patios. Jet uses live-trapping and exclusion fencing to remove groundhogs and prevent return.` },
      { q: `Do you handle wildlife removal in Queens apartment buildings?`, a: `Yes. Jet Pest Control works with building managers and co-op boards to address wildlife intrusions in multi-family buildings throughout Queens. We provide documentation of our work suitable for board presentations and insurance claims.` },
    ],
  },
  manhattan: {
    headline: `Wildlife Removal Services in Manhattan, NY`,
    body: `Manhattan wildlife removal is less about rural species and more about the animals that have successfully colonized the urban island. Raccoons from Central Park and Riverside Park venture into adjacent residential blocks. Pigeons and starlings roost in pre-war cornices and create significant health risks from accumulated droppings. Squirrels are omnipresent from 155th Street to the Battery. In Washington Heights and Inwood, proximity to forest park land occasionally brings opossum and even red fox sightings into residential streets. Jet Pest Control handles the full Manhattan wildlife spectrum — with particular expertise in the discretion and professionalism required by Manhattan's cooperative and condominium buildings. We work with building supers and managing agents to resolve wildlife issues with minimal disruption to residents.`,
    faqs: [
      { q: `What wildlife species are most common in Manhattan buildings?`, a: `Gray squirrels are the most frequent intruder, followed by raccoons in upper-floor and rooftop spaces near park corridors. Pigeons are a significant issue in cornice and rooftop HVAC areas. In northern Manhattan, opossums occasionally enter basement egress areas and refuse rooms.` },
      { q: `How do co-op boards typically handle wildlife removal in Manhattan?`, a: `Most Manhattan co-op boards treat wildlife removal as a building-level issue, handling it through their managing agent and preferred vendors. Jet Pest Control works directly with managing agents and can provide multi-unit service contracts, board presentations, and documentation required for insurance claims.` },
      { q: `Are there pigeon control services available for Manhattan buildings?`, a: `Yes. Jet Pest Control offers pigeon exclusion using stainless steel spikes, netting, and wire systems suitable for Manhattan's pre-war cornice and rooftop environments. We work with scaffold-equipped teams for buildings requiring high-elevation installation.` },
    ],
  },
  nassau: {
    headline: `Wildlife Removal Services in Nassau County, NY`,
    body: `Nassau County's suburban landscape supports a diverse wildlife community that regularly intersects with residential properties. Beyond raccoons and squirrels, Nassau homeowners deal with groundhogs burrowing under front stoops and pool decks, skunks denning under sheds and concrete slabs, opossums rummaging through unprotected garbage, and Canada geese establishing aggressive nesting territories in HOA common areas. The coastal communities along Oyster Bay and the South Shore also experience occasional encounters with diamondback terrapins and muskrats. Jet Pest Control handles all Nassau County wildlife removal scenarios — licensed, insured, and DEC-compliant — with a complete exclusion package to ensure removed animals don't return.`,
    faqs: [
      { q: `What wildlife species commonly invade Nassau County properties?`, a: `Raccoons and squirrels are most common, followed by groundhogs (under sheds, decks, and stoops), skunks (under concrete slabs and detached garages), and opossums. Canada geese are a major issue in communities with HOA pond areas. Occasional fox denning is observed in larger wooded lots.` },
      { q: `How do you handle a groundhog under a Nassau County pool deck?`, a: `Jet technicians first confirm the groundhog's primary burrow entrance and establish exclusion barriers around secondary exit points. A one-way eviction door is installed at the main entrance, forcing the groundhog to exit without being able to return. The burrow is then filled and the entry point sealed with galvanized mesh set 12 inches below grade.` },
      { q: `Are skunks dangerous to Nassau County pets?`, a: `Yes — direct skunk spray causes temporary eye irritation and distress in pets, and skunk bites can transmit rabies. Nassau County has confirmed rabies cases in skunks periodically. Jet recommends never attempting to handle skunks yourself and scheduling professional removal when a denning skunk is discovered.` },
    ],
  },
  suffolk: {
    headline: `Wildlife Removal Services in Suffolk County, NY`,
    body: `Suffolk County is one of New York's most wildlife-rich suburban counties, with thousands of acres of protected woodland, wetland, and bay frontage providing habitat for a diverse range of species that regularly conflict with residential and commercial properties. Beyond raccoons and squirrels, Suffolk residents deal with white-tailed deer damaging landscaping, Canada geese fouling waterfront lawns, foxes denning under decks, groundhogs burrowing through garden beds, mink near waterfront properties, and the full range of suburban wildlife species. Jet Pest Control handles all legally removable Suffolk County wildlife species with licensed, humane methods. We're DEC-compliant on all species and provide full documentation for insurance and HOA purposes.`,
    faqs: [
      { q: `What wildlife species are most common in Suffolk County residential properties?`, a: `Raccoons and squirrels are most frequent, followed by groundhogs (burrowing under decks, sheds, and foundations), Canada geese (at waterfront and pond-adjacent properties), skunks, opossums, and red foxes. White-tailed deer are abundant county-wide but are regulated separately under DEC rules.` },
      { q: `Do you handle Canada goose removal in Suffolk County?`, a: `Jet Pest Control offers Canada goose deterrence programs including landscape modification consultation, egg addling (with federal permit), and exclusion fencing for pond and waterfront properties in Suffolk County. Full nest removal requires a Migratory Bird Treaty Act permit, which Jet maintains.` },
      { q: `Is wildlife activity in Suffolk County seasonal?`, a: `Yes. Spring (March–May) brings nesting activity from raccoons, squirrels, and birds. Summer brings peak groundhog activity. Fall (September–November) is peak attic intrusion season as animals seek winter den sites. Jet offers seasonal preventive inspections to identify vulnerabilities before the peak season.` },
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Wildlife in {townName}?</h2>
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
