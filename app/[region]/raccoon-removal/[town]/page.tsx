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

const SERVICE_NAME = 'Raccoon Removal';
const SERVICE_SLUG = 'raccoon-removal';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Raccoon Removal in Brooklyn, NY`,
    body: `Raccoons have adapted remarkably well to Brooklyn's urban landscape. They raid trash cans in Park Slope, nest in the crawlspaces of Brownsville homes, and take shelter in attic spaces above Flatbush row houses. A raccoon in the attic is more than a nuisance — their latrines carry raccoon roundworm, and their constant gnawing can damage structural timbers, insulation, and electrical wiring. Our Brooklyn wildlife removal specialists perform thorough attic inspections, locate all entry points, and install one-way exclusion doors that allow raccoons to leave but not return. After all animals have vacated, we seal every gap permanently and clean up contaminated insulation. All work is done under New York State wildlife permits. Call us for humane raccoon removal anywhere in Brooklyn.`,
    faqs: [
      { q: 'Are raccoons dangerous in Brooklyn neighborhoods?', a: 'Raccoons are wild animals and can become aggressive when cornered, injured, or protecting young. They also carry rabies and raccoon roundworm, which can be transmitted to pets and humans. Never attempt to handle a raccoon yourself.' },
      { q: 'How do raccoons get into Brooklyn row houses and brownstones?', a: "Raccoons enter through deteriorated fascia boards, gaps at roof-wall intersections, uncapped chimneys, and damaged soffit vents. Brooklyn's aging housing stock often has multiple entry points that need professional sealing." },
      { q: 'Can you remove a raccoon with babies in Brooklyn?', a: 'Yes, but timing matters. We use humane eviction fluid near den sites to encourage mothers to relocate their kits voluntarily. Once all animals have left, we seal entry points and perform attic remediation if needed.' },
    ],
  },
  queens: {
    headline: `Professional Raccoon Removal in Queens, NY`,
    body: `Queens' mix of residential neighborhoods, parks, and green spaces along the Queens-Nassau border provides raccoons with excellent foraging and nesting habitat. In densely built areas like Bayside, Fresh Meadows, and Middle Village, raccoons regularly access attics through fascia gaps, open vents, and deteriorated rooflines. Once inside, they establish latrines and can cause serious structural damage within weeks. Our Queens raccoon removal team uses state-licensed, humane exclusion methods — no poisons, no traps left unattended overnight. We identify every entry point, install one-way doors, and return to permanently seal after the animals have vacated. Attic clean-up and insulation replacement services are also available. Same-day inspections available throughout Queens.`,
    faqs: [
      { q: 'Do raccoons in Queens carry diseases that affect humans?', a: 'Yes. Raccoons can carry rabies, leptospirosis, and raccoon roundworm (Baylisascaris procyonis). The roundworm eggs in raccoon feces are especially dangerous and can persist in soil and attic insulation for years.' },
      { q: 'Will raccoons come back after removal in Queens?', a: "Not if all entry points are permanently sealed. Our exclusion work includes a written guarantee — if a raccoon re-enters through a point we sealed, we return at no charge." },
      { q: "Is raccoon removal covered by homeowner's insurance in Queens?", a: 'Some policies cover raccoon damage and remediation. We provide detailed invoices and damage reports to support insurance claims — check your policy and contact your insurer before your appointment.' },
    ],
  },
  manhattan: {
    headline: `Professional Raccoon Removal in Manhattan, NY`,
    body: `Despite the density of Manhattan, raccoons are a persistent urban wildlife problem — especially in northern neighborhoods like Inwood, Washington Heights, and Morningside Heights where green spaces meet residential buildings. They raid rooftop garbage areas, nest in subgrade storage spaces, and occasionally access upper-floor terraces. Raccoons in Manhattan buildings require experienced urban wildlife specialists who understand building management protocols and can work discreetly within co-op and condo rules. Our Manhattan raccoon removal team holds all required New York State DEC permits and works closely with building superintendents to resolve infestations with minimal disruption. Humane exclusion methods only — no traps, no poisons, no surprises.`,
    faqs: [
      { q: 'Can raccoons climb Manhattan apartment buildings?', a: 'Yes. Raccoons are excellent climbers and have been documented reaching upper floors of Manhattan buildings via drain pipes, fire escapes, and brick facade gaps. Northern Manhattan neighborhoods near parks see the most activity.' },
      { q: 'Who is responsible for raccoon removal in a Manhattan co-op or condo?', a: "Responsibility depends on where the animal entered and whether it's in a common area or private unit. We help coordinate with building management and provide documentation to support insurance or HOA claims." },
      { q: 'How quickly can you respond to a raccoon problem in Manhattan?', a: 'We offer same-day inspections throughout Manhattan. Our technicians are familiar with building access requirements in co-ops and condos throughout all Manhattan neighborhoods.' },
    ],
  },
  nassau: {
    headline: `Professional Raccoon Removal in Nassau County, NY`,
    body: `Nassau County's mature suburban tree canopy, coastal marshes, and neighborhood density give raccoons everything they need — food, water, and easy access to attics, crawlspaces, and chimneys. From Massapequa to Great Neck to Hempstead, our Nassau County wildlife removal specialists handle raccoon infestations in single-family homes, condos, and multi-family properties. We locate all entry points using attic and exterior inspections, install one-way exclusion doors certified humane by the National Wildlife Control Operators Association, and permanently seal every opening after the animals vacate. We also offer attic insulation removal and replacement if raccoon latrines have contaminated your insulation. All work is backed by our exclusion guarantee.`,
    faqs: [
      { q: 'When is raccoon season in Nassau County?', a: 'Raccoons are active year-round in Nassau County, but nesting activity peaks in spring (February–May) when females seek attic spaces to give birth. Early spring calls are our most common for in-attic raccoon problems.' },
      { q: 'How do I know if raccoons are in my Nassau County attic?', a: "Listen for heavy thumping, chattering, or whining sounds from above, especially at dusk and dawn. Look for torn soffit vents, disturbed insulation visible through attic access, and raccoon tracks near your home's foundation or roofline." },
      { q: "Can raccoons damage my Nassau County home's electrical wiring?", a: 'Yes. Raccoons chew insulation from wires, disturb attic insulation, and their urine and feces degrade wood and drywall. An undetected raccoon family can cause thousands in damage in a single nesting season.' },
    ],
  },
  suffolk: {
    headline: `Professional Raccoon Removal in Suffolk County, NY`,
    body: `Suffolk County's wooded neighborhoods, nature preserves, and waterfront properties create ideal raccoon habitat. From Smithtown to Islip to Riverhead, raccoons routinely access attics, chimneys, and crawlspaces of Suffolk homes — especially older properties with deteriorated wood and gaps at the roofline. Coastal and lakeside properties near water bodies also experience elevated raccoon pressure due to rich foraging opportunities. Our Suffolk County raccoon removal team provides full-service exclusion, including initial inspection, one-way door installation, permanent sealing, and attic remediation if contamination has occurred. We work throughout all Suffolk County townships and hold all required New York State DEC permits. Humane, effective, guaranteed.`,
    faqs: [
      { q: 'Are raccoons worse in wooded parts of Suffolk County?', a: 'Wooded areas like those in Brookhaven, Smithtown, and Riverhead townships do have higher raccoon populations due to natural food sources and denning sites. However, raccoons near developed neighborhoods often prefer warm attics to outdoor dens.' },
      { q: 'How much does raccoon removal cost in Suffolk County?', a: 'Costs depend on the number of entry points, extent of contamination, and whether remediation is needed. We provide free, no-obligation inspections and detailed written estimates before any work begins.' },
      { q: 'Is it legal to trap raccoons myself in Suffolk County?', a: 'New York State law requires a DEC license to trap and relocate raccoons. Unlicensed trapping can result in fines. Always use a licensed wildlife control professional for raccoon removal.' },
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
            {BRAND.name} provides licensed raccoon removal to {canonicalTownName} residents and businesses. Our technicians deliver same-day service using humane, state-permitted methods.
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
            <div className="text-sm text-gray-600">No Poisons or Traps</div>
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
          <h2 className="text-2xl font-bold mb-2">Ready for Humane Raccoon Removal in {canonicalTownName}?</h2>
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
