import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

const SERVICE_NAME = 'Raccoon Removal';
const SERVICE_SLUG = 'raccoon-removal';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Raccoon Removal Services in Brooklyn, NY`,
    body: `Raccoons have adapted remarkably well to Brooklyn's urban environment, denning in brownstone attics, under decks, and inside detached garages across neighborhoods from Bay Ridge to Greenpoint. They enter through damaged roof edges, uncapped chimneys, and gaps around dormer windows — all common vulnerabilities in Brooklyn's aging pre-war housing. Once inside, a mother raccoon raising a litter can cause thousands in structural damage: insulation compressed into nesting material, HVAC ductwork torn apart, and wiring chewed. Jet Pest Control performs humane raccoon removal using one-way exclusion doors and live-trapping protocols compliant with New York State DEC regulations. After removal, we seal every entry point to prevent re-entry. We also offer attic remediation and insulation replacement for heavily contaminated spaces.`,
    faqs: [
      { q: `Is it legal to trap raccoons in Brooklyn?`, a: `New York State law permits homeowners to trap nuisance raccoons, but relocation must follow DEC guidelines. Jet Pest Control handles all permits, trapping, and transport to ensure full legal compliance. We never release raccoons in a way that violates state regulations.` },
      { q: `How do I know if raccoons are in my Brooklyn attic?`, a: `Listen for heavy thumping and scratching at dusk or dawn — raccoons are crepuscular. You may also hear chittering if a mother has kits. Check your roofline for bent fascia boards, missing soffit sections, or disturbed shingles near the chimney or dormers.` },
      { q: `Will raccoons come back after removal?`, a: `Not if every entry point is properly sealed. Jet Pest Control performs a complete exclusion after removal, using galvanized steel mesh, foam-backer rod, and caulk rated for exterior use. We back our exclusion work with a one-year guarantee against re-entry through sealed points.` },
    ],
  },
  queens: {
    headline: `Raccoon Removal Services in Queens, NY`,
    body: `Queens offers raccoons an ideal mix of urban food sources and quiet residential streets with mature trees and rowhome rooflines to explore. Neighborhoods like Bayside, Queens Village, and Howard Beach see consistent raccoon activity, particularly in spring when mothers seek secure attic spaces to raise litters. Raccoons enter rowhomes through compromised fascia boards, open ridge vents, and deteriorated chimney flashing common on older Queens housing stock. Jet Pest Control provides humane raccoon removal across all Queens neighborhoods, using one-way exclusion doors when kits are present to prevent orphaning, and live-trapping for transient raccoons. After removal, our crew performs a comprehensive exclusion repair, sealing every gap with commercial-grade materials that raccoons cannot pry open.`,
    faqs: [
      { q: `Why are raccoons so common in Queens neighborhoods?`, a: `Queens combines dense residential landscaping — mature trees, wooded park buffers, retention ponds in areas like Jamaica Bay — with abundant food from residential composting and unsecured garbage. This combination makes neighborhoods like Bayside, Little Neck, and Howard Beach particularly high-activity areas.` },
      { q: `What damage can raccoons cause in a Queens rowhouse attic?`, a: `Raccoons typically compress and shred attic insulation for nesting, defecate in latrine piles that can soak through ceilings, and occasionally chew low-voltage wiring. Remediation after a raccoon infestation often costs $800–$3,000 in insulation replacement alone.` },
      { q: `How soon can Jet come for raccoon removal in Queens?`, a: `We typically schedule Queens raccoon removal within 24–48 hours of your call. For urgent situations — raccoon inside living space or aggressive behavior — we offer same-day emergency dispatch.` },
    ],
  },
  manhattan: {
    headline: `Raccoon Removal Services in Manhattan, NY`,
    body: `Manhattan may be the world's most urban borough, but raccoons have carved out a surprisingly robust niche here — particularly in Upper Manhattan neighborhoods like Washington Heights, Inwood, and Harlem where Fort Tryon Park, Inwood Hill Park, and Riverside Park provide woodland habitat adjacent to residential blocks. Raccoons in Manhattan typically den in building rooftop mechanicals, uncapped chimneys, and the crawl spaces of attached rowhouses on the Upper West and Upper East Sides. Jet Pest Control handles Manhattan raccoon removal with the professionalism expected in a premium urban market — discreet service vehicles, licensed and insured technicians, and a full exclusion package that addresses every penetration in the building envelope. We also offer chimney cap installation to prevent re-entry of raccoons in pre-war buildings with original clay flue liners.`,
    faqs: [
      { q: `Are raccoons really present in Midtown Manhattan?`, a: `Raccoons are common in Upper Manhattan near park corridors but rare in Midtown. They are occasionally found in Midtown building rooftop mechanicals and HVAC rooms, typically having traveled along rooftops from adjacent parkland. Central Park hosts a well-established raccoon population that spreads into surrounding neighborhoods.` },
      { q: `Can raccoons get into Manhattan high-rise buildings?`, a: `Raccoons typically don't access buildings above the 6th floor, but rooftop access on lower buildings — particularly in Washington Heights and Inwood — is common. They enter through open rooftop hatches, broken skylights, and gaps around rooftop mechanical rooms.` },
      { q: `What are chimney caps and why are they important in Manhattan?`, a: `Chimney caps are steel mesh covers installed over open flue openings to prevent raccoons, squirrels, and birds from entering. Manhattan pre-war buildings with original terra-cotta flues that are no longer in use frequently lack caps, creating easy attic access. Jet installs galvanized steel caps rated for NYC wind loads.` },
    ],
  },
  nassau: {
    headline: `Raccoon Removal Services in Nassau County, NY`,
    body: `Nassau County's mature suburban landscape — with decades-old oak and maple canopy, abundant ornamental shrubs, and proximity to the South Shore bays and North Shore Sound — supports one of Long Island's densest raccoon populations. Residents across Hempstead, Great Neck, Oyster Bay, and the Five Towns regularly deal with raccoons denning in attic spaces, under decks, and in storm drain openings. Nassau's colonial-era and cape cod housing often has original wood fascia and aluminum soffit that ages poorly, providing easy raccoon entry. Jet Pest Control removes raccoons humanely throughout Nassau County, with season-aware service — using one-way exclusion doors in spring and summer to avoid orphaning nursing kits, and live-trapping in fall through winter when kits are independent. Full exclusion sealing included with every removal.`,
    faqs: [
      { q: `Why do raccoons prefer Nassau County suburban neighborhoods?`, a: `Nassau County offers raccoons an ideal combination of low traffic density, mature tree canopy for travel, abundant unsealed garbage, and aging suburban homes with multiple potential den sites. The South Shore waterfront communities also have large populations fed by tidal marsh food sources.` },
      { q: `How do raccoons get under my Nassau County deck?`, a: `Raccoons exploit the natural gap between the deck ledger board and the ground, particularly if the area beneath is not properly skirted. They often displace lattice panels or dig under paver edges. Jet installs a galvanized steel apron underground that prevents digging back in after removal.` },
      { q: `Will raccoon removal disturb my Nassau County landscaping?`, a: `Minimally. Our exclusion work focuses on the building envelope — fascia, soffits, and entry points — and deck/slab aprons. We try to preserve existing landscaping. Any temporary disruption is restored upon completion.` },
    ],
  },
  suffolk: {
    headline: `Raccoon Removal Services in Suffolk County, NY`,
    body: `Suffolk County's large wooded lots, preserved parkland, and miles of tidal marshland provide ideal raccoon habitat — and with the county's extensive suburban development bordering these natural areas, raccoon-home conflicts are frequent. Communities from Huntington and Smithtown to the Hamptons deal with raccoons denning in attics, raiding chicken coops, tipping garbage cans, and setting up latrines in crawl spaces. The tick and disease pressure associated with raccoons — including rabies and raccoon roundworm — is a serious concern in Suffolk County, which has active rabies surveillance. Jet Pest Control provides DEC-licensed raccoon removal throughout Suffolk County, with season-aware protocols and full exclusion repair. We prioritize jobs in areas with known rabies activity.`,
    faqs: [
      { q: `Is rabies a concern with raccoons in Suffolk County?`, a: `Yes. Suffolk County is within New York's terrestrial rabies zone for raccoons, and positive rabies cases in raccoons are confirmed periodically by the county health department. Never approach or handle a raccoon acting disoriented or active during daylight hours — call Jet for same-day response.` },
      { q: `Do Suffolk County wooded properties attract more raccoons?`, a: `Properties adjacent to wooded lots, golf courses, preserve land, or tidal creeks in Suffolk County are at significantly higher risk of raccoon activity. Raccoons use woodland edges as travel corridors and prefer wooded properties for denning. Jet recommends proactive exclusion for homes adjacent to these environments.` },
      { q: `How does Jet handle raccoon removal in Suffolk County beach communities?`, a: `Coastal communities in Suffolk County face raccoons that have adapted to beach environments — denning in dune vegetation, under beach house decks, and in crawl spaces. Our removal protocols account for sandy soil conditions, which require different exclusion apron methods than inland properties.` },
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Raccoons in {townName}?</h2>
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
