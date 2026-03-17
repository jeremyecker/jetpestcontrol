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

const SERVICE_NAME = 'Wildlife Removal';
const SERVICE_SLUG = 'wildlife-removal';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Wildlife Removal in Brooklyn, NY`,
    body: `Brooklyn may be New York's most urban borough, but its parks, waterways, and green corridors sustain a surprising variety of wildlife that regularly comes into conflict with residents. Raccoons raid trash cans and nest in attics throughout Park Slope, Crown Heights, and Flatbush. Skunks den under porches and stoops across the borough. Squirrels access attics through roofline gaps. Opossums occupy crawlspaces beneath attached homes. Our Brooklyn wildlife removal team handles the full range of urban wildlife conflicts using humane, licensed methods — no poisons, no traps left unattended, no relocations that violate NY State DEC regulations.`,
    faqs: [
      { q: 'What wildlife is most common in Brooklyn homes?', a: 'Raccoons, squirrels, and opossums are the most frequently encountered wildlife in Brooklyn structures. Skunks commonly den under porches and stoops. Bats occasionally roost in attic spaces of older brownstones.' },
      { q: 'Is it legal to trap and relocate wildlife in Brooklyn?', a: 'Trapping and relocation of most wildlife species in New York requires a DEC license. It is illegal to relocate raccoons and other rabies vector species to new areas. Our technicians hold all required state permits.' },
      { q: 'Can wildlife carry diseases that affect Brooklyn residents?', a: 'Yes. Raccoons and bats can carry rabies. Raccoons carry raccoon roundworm. Rodents can carry hantavirus and leptospirosis. Professional removal minimizes exposure risk — never attempt to handle wildlife yourself.' },
    ],
  },
  queens: {
    headline: `Professional Wildlife Removal in Queens, NY`,
    body: `Queens' mix of dense residential neighborhoods and substantial green space — Forest Park, Alley Pond Park, the Jamaica Bay Wildlife Refuge — creates more wildlife pressure than most residents expect. Raccoons are the most common call, nesting in attics across neighborhoods from Bayside to Ozone Park. Groundhogs den under decks and foundations. Skunks establish under sheds and concrete stoops. Bats roost in attic spaces of older homes near the parks. Our Queens wildlife removal specialists handle all species under New York State DEC permits, using humane exclusion methods that resolve the problem permanently.`,
    faqs: [
      { q: 'What wildlife species are commonly found in Queens homes and yards?', a: 'Raccoons (attic nesting), groundhogs (under decks and foundations), skunks (under sheds and porches), squirrels (attic entry), and occasional bat roosts are the most common wildlife calls in Queens.' },
      { q: 'How do I identify what animal is in my Queens attic?', a: 'Raccoons make heavy thumping sounds; squirrels produce rapid scurrying; bats generate soft scratching at dusk; mice create light scratching in walls. We identify the species definitively during our inspection and tailor removal accordingly.' },
      { q: "Is wildlife removal covered by homeowner's insurance in Queens?", a: 'Some policies cover structural damage caused by wildlife. We provide detailed damage reports and invoices to support insurance claims. Review your policy and contact your insurer before your appointment.' },
    ],
  },
  manhattan: {
    headline: `Professional Wildlife Removal in Manhattan, NY`,
    body: `Manhattan's wildlife removal calls are concentrated in northern neighborhoods — Inwood, Washington Heights, Morningside Heights, and East Harlem — where large parks border residential buildings. Raccoons access rooftops and terraces, skunks den beneath stoops in historic brownstone blocks, and bat colonies roost in the attic spaces of pre-war buildings near Riverside and Inwood Hill Parks. Our Manhattan wildlife removal team works discreetly within co-op and condo protocols, coordinating with building management and holding all required NYC and NY State DEC permits for wildlife work.`,
    faqs: [
      { q: 'Can raccoons access upper-floor terraces in Manhattan?', a: 'Yes. Raccoons are exceptional climbers and have been documented on upper-floor terraces throughout northern Manhattan, particularly near Riverside Park and Inwood Hill Park. They follow drain pipes, fire escapes, and building facades.' },
      { q: 'Are there bats in Manhattan buildings?', a: 'Yes. Bat colonies are found in older Manhattan buildings, particularly pre-war structures with accessible attic spaces near parks and the Hudson River. If you suspect a bat roost, call us immediately — bat removal has seasonal restrictions to protect maternity colonies.' },
      { q: 'Who handles wildlife removal permits in Manhattan?', a: 'Our technicians hold all required permits from the New York State DEC for wildlife removal in Manhattan. We handle all regulatory requirements — you don\'t need to contact DEC directly.' },
    ],
  },
  nassau: {
    headline: `Professional Wildlife Removal in Nassau County, NY`,
    body: `Nassau County's suburban landscape — mature trees, large yards, proximity to marshes and preserves — creates abundant wildlife habitat alongside dense residential development. Raccoons, groundhogs, skunks, squirrels, and opossums are all common in Nassau County neighborhoods, and each species requires different removal methods. Our Nassau County wildlife removal team provides free inspections to identify the species and access points, then implements humane exclusion under New York State DEC permits. We also offer structural repairs to seal entry points after removal, preventing future wildlife access.`,
    faqs: [
      { q: 'What wildlife is most common in Nassau County yards and homes?', a: 'Raccoons (attic nesting, trash raiding), groundhogs (foundation and deck burrowing), skunks (under sheds, in window wells), squirrels (attic entry), and opossums (under porches) are the most common Nassau County wildlife calls.' },
      { q: 'How do I get rid of a groundhog burrowing under my Nassau County deck?', a: 'Groundhogs require professional exclusion — filling the burrow without removing the animal is ineffective. We use one-way exclusion devices at burrow entrances and install underground hardware cloth barriers to prevent re-burrowing.' },
      { q: 'Is skunk removal different from other wildlife in Nassau County?', a: 'Skunks require special handling to prevent defensive spray during removal. Our technicians use skunk-specific trapping equipment and low-stress handling techniques to minimize spray risk. We also address the den site to prevent future skunk attraction.' },
    ],
  },
  suffolk: {
    headline: `Professional Wildlife Removal in Suffolk County, NY`,
    body: `Suffolk County's extensive natural areas — the Long Island Pine Barrens, Caumsett State Park, Connetquot River State Park, and dozens of other preserves — support large wildlife populations that regularly enter residential areas. Raccoons, deer, foxes, groundhogs, and skunks are all common calls on Long Island. Seasonal wildlife pressure is especially high in spring (nesting) and fall (shelter-seeking), but our Suffolk County wildlife removal team responds year-round. We hold all required NY State DEC permits and use humane exclusion methods across all property types from small suburban homes to large waterfront estates.`,
    faqs: [
      { q: 'Do foxes cause problems in Suffolk County neighborhoods?', a: 'Red foxes are common in Suffolk County and occasionally den under decks or in window wells. They are generally not dangerous but can pose a risk to small pets. We provide humane fox exclusion and habitat modification to discourage denning near homes.' },
      { q: 'How do I deal with a skunk under my Suffolk County porch?', a: 'Do not attempt to approach or trap the skunk yourself — an adult skunk defending its den will spray. Call us for professional removal using low-stress techniques and exclusion barriers that prevent future denning.' },
      { q: 'What should I do if I find a bat in my Suffolk County home?', a: 'Isolate the room and call us immediately. If there has been any possibility of human or pet contact with the bat, contact Nassau/Suffolk Health for rabies guidance. Never handle a bat with bare hands.' },
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
            {BRAND.name} provides licensed wildlife removal to {canonicalTownName} residents and businesses. Our technicians handle all species using humane, DEC-permitted methods.
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
            <div className="text-sm text-gray-600">All Species, All Methods</div>
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
          <h2 className="text-2xl font-bold mb-2">Ready for Professional Wildlife Removal in {canonicalTownName}?</h2>
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
