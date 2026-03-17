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

const SERVICE_NAME = 'Ant Exterminator';
const SERVICE_SLUG = 'ant-exterminator';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Ant Exterminator in Brooklyn, NY`,
    body: `Ants in Brooklyn come in two primary varieties: pavement ants that enter from exterior sidewalk and foundation cracks in the spring, and carpenter ants that nest in moisture-damaged wood in aging building structures. Pavement ant invasions are a seasonal fixture on the ground floors of Brooklyn brownstones and apartment buildings — visible trails leading from exterior cracks to kitchen food sources. Carpenter ants are more concerning: they nest in wood softened by moisture damage, and Brooklyn's pre-war building stock has no shortage of damp basement sills, wet window frames, and water-damaged floor joists. Our Brooklyn ant extermination program uses targeted gel baits, exterior perimeter treatments, and moisture source identification to eliminate colonies and prevent return.`,
    faqs: [
      { q: `What is the difference between carpenter ants and regular ants in Brooklyn?`, a: `Pavement ants (small, dark) forage for food and nest in soil or wall voids — they are a nuisance but don't damage your home. Carpenter ants (large, black) excavate galleries in moist wood to nest — they indicate a moisture problem and can cause structural damage over time.` },
      { q: `Why do ants invade Brooklyn apartments in spring?`, a: `As soil warms in spring, ant colonies expand and forage for food and new nesting sites. Ground-floor Brooklyn apartments and brownstone basements are primary entry points as ants move through foundation cracks and around utility penetrations.` },
      { q: `How long does it take to get rid of ants in a Brooklyn home?`, a: `Gel bait treatments typically reduce visible ant activity within 3-7 days as foragers carry bait back to the colony. Complete colony elimination usually takes 2-3 weeks. Exterior perimeter treatment prevents new colonies from entering.` },
    ],
  },
  queens: {
    headline: `Professional Ant Exterminator in Queens, NY`,
    body: `Ant invasions are among the most common warm-season pest complaints in Queens. The borough's mix of attached rowhomes with shared foundations, mature street trees with ant-hospitable root systems, and dense commercial food waste creates conditions where multiple ant species thrive simultaneously. Pavement ants colonize the spaces between sidewalk sections and foundation walls throughout Queens, with spring and fall being peak invasion periods. Odorous house ants invade kitchen areas through tiny gaps around plumbing. Carpenter ants target the moisture-damaged wood common in Queens' older housing stock. Our Queens ant extermination team uses the right treatment for each species — gel bait, perimeter spray, or granular outdoor treatments.`,
    faqs: [
      { q: `Why do I see more ants in my Queens home after it rains?`, a: `Heavy rain floods ant nests in soil and drives colonies to seek higher, drier spaces — including interior walls and kitchen areas of your Queens home. Post-rain ant invasions are very common and respond well to professional interior gel bait treatment.` },
      { q: `Are carpenter ants dangerous to Queens homes?`, a: `Carpenter ants don't eat wood — they excavate it to create nesting galleries. Over months and years, this can compromise wood structural members. In Queens' older rowhomes, the most common nesting sites are moisture-damaged basement sills and window frames.` },
      { q: `Do you offer seasonal ant prevention programs for Queens homes?`, a: `Yes. Our annual perimeter treatment program applies exterior spray around the foundation and entry points each spring, reducing ant entry pressure throughout the season. Many Queens homeowners combine this with a full service plan.` },
    ],
  },
  manhattan: {
    headline: `Professional Ant Exterminator in Manhattan, NY`,
    body: `Manhattan ant problems center on two species: the pavement ant, which colonizes the cracks and voids beneath every sidewalk in the borough and sends foragers into ground-floor spaces in spring; and the carpenter ant, which establishes in the moisture-damaged wood that aging pre-war buildings generate in abundance. The street tree root systems lining every Manhattan block harbor enormous pavement ant supercolonies that expand into building foundations each spring. High-rise buildings above the 5th floor rarely see pavement ant intrusions, but carpenter ants have been found nesting in wood window frames on upper floors where persistent roof leaks created moisture damage. Our Manhattan ant extermination uses targeted gel baits and perimeter treatment appropriate for urban building environments.`,
    faqs: [
      { q: `Are ants a common problem in Manhattan apartments?`, a: `Yes, particularly on ground floors and garden-level apartments. Pavement ants are a nearly universal spring experience for Manhattan ground-floor residents. Upper floors encounter ants less frequently, usually only where moisture damage has created a nesting site.` },
      { q: `What attracts ants to my Manhattan kitchen?`, a: `Even trace amounts of food residue — crumbs, sticky jar rims, unsealed pet food — are enough to attract ant foragers. Once scouts find a food source, they leave a pheromone trail that brings hundreds of workers.` },
      { q: `How do you treat ants in a Manhattan high-rise without disrupting neighbors?`, a: `We use gel baits applied in specific foraging areas and entry points — no sprays or fumigation. Treatments are safe for occupied spaces, odorless, and complete in under an hour for a typical Manhattan apartment.` },
    ],
  },
  nassau: {
    headline: `Professional Ant Exterminator in Nassau County, NY`,
    body: `Nassau County homeowners deal with a wide range of ant species throughout the year. Carpenter ants are the most structurally concerning — their preference for moisture-damaged wood in basement sills, deck structures, and window framing makes Nassau's aging housing stock particularly vulnerable. Pavement ants colonize Nassau's paved suburban landscapes and invade homes through foundation cracks each spring. Odorous house ants are a kitchen nuisance pest common in Nassau homes. Fire ants have not yet established in Nassau but acrobat ants and citronella ants are increasingly common. Our Nassau County ant extermination program uses species-appropriate treatments: gel bait for interior species, perimeter spray for exterior invasion, and carpenter ant-specific foam injection for void nesting.`,
    faqs: [
      { q: `How do I know if I have carpenter ants in my Nassau County home?`, a: `Look for large black ants (¼–½ inch) near moisture sources — under sinks, around window frames, in basement areas. You may also find coarse sawdust (frass) near wood they've excavated. Carpenter ants are most active at night.` },
      { q: `Are fire ants a concern in Nassau County?`, a: `Fire ants have not yet established breeding populations in Nassau County, though isolated sightings occur near shipping facilities. The ants you find in Nassau are most likely pavement ants, carpenter ants, odorous house ants, or acrobat ants — all manageable with professional treatment.` },
      { q: `How often should I treat my Nassau County home for ants?`, a: `An annual spring perimeter treatment before ant season begins, combined with interior treatment if needed, is the most effective approach. Many Nassau homeowners include ant treatment in their annual pest control plan.` },
    ],
  },
  suffolk: {
    headline: `Professional Ant Exterminator in Suffolk County, NY`,
    body: `Suffolk County's suburban and wooded landscape makes it home to a wider range of ant species than urban areas — carpenter ants are particularly prevalent in the county's heavily wooded neighborhoods, where they nest in both decaying outdoor wood and moisture-compromised structural lumber. The South Fork's wooded estate properties experience elevated carpenter ant pressure from forested property boundaries. Pavement ants are a spring fixture in Suffolk's suburban developments. Odorous house ants invade kitchens across the county. Our Suffolk County ant extermination team identifies the specific species involved and applies the right treatment — from exterior perimeter spray to carpenter ant foam injection to kitchen gel bait programs.`,
    faqs: [
      { q: `Why are carpenter ants worse in wooded parts of Suffolk County?`, a: `Carpenter ants nest primarily in decaying wood outdoors — fallen logs, old stumps, and dead tree limbs provide outdoor colonies that then expand into nearby homes. Suffolk's wooded neighborhoods provide ideal outdoor nesting habitat close to residential structures.` },
      { q: `Can ants damage my Suffolk County deck?`, a: `Carpenter ants frequently nest in wood decks, particularly in the posts, ledger boards, and decking material near the house where moisture from the soil or roof runoff creates soft, attractive wood. Annual inspections can catch deck infestations early.` },
      { q: `What is the best time of year to treat for ants in Suffolk County?`, a: `Early spring — March through May — is the ideal time for a preventative perimeter treatment before ant colonies expand and begin foraging. If you're already seeing ants indoors, immediate interior treatment with exterior follow-up is recommended.` },
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Ants in {canonicalTownName}?</h2>
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
