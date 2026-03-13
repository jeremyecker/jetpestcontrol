import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

const SERVICE_NAME = 'Bed Bug Exterminator';
const SERVICE_SLUG = 'bed-bug-exterminator';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Bed Bug Exterminator in Brooklyn, NY`,
    body: `Brooklyn's dense brownstones, multi-family buildings, and constant neighborhood turnover make it one of New York City's highest-risk areas for bed bug infestations. Whether you're in a Crown Heights rowhouse, a Williamsburg loft, or a shared apartment in Flatbush, bed bugs travel easily through walls, shared laundry facilities, and secondhand furniture. Our licensed Brooklyn exterminators use EPA-registered heat treatment and chemical protocols to eliminate every life stage — eggs, nymphs, and adults — in a single visit. We inspect mattresses, box springs, baseboards, and electrical outlets for harborage sites. Every treatment includes a written warranty and a free follow-up inspection so you can sleep soundly again. Don't let an infestation spread to neighboring units — call us today for same-day service in Brooklyn.`,
    faqs: [
      { q: 'How do bed bugs spread in Brooklyn apartment buildings?', a: 'Bed bugs travel through shared walls, electrical conduits, plumbing chases, and hallways. In dense multi-family buildings like those in Brooklyn, an infestation in one unit can spread to neighboring apartments within weeks if untreated.' },
      { q: 'Does heat treatment work in brownstones and older Brooklyn homes?', a: 'Yes. Heat treatment is highly effective in brownstones and pre-war buildings. We raise room temperatures to 120°F+ to kill all life stages, including eggs hidden deep in wall voids and furniture joints that chemicals can\'t always reach.' },
      { q: 'How quickly can you respond to a bed bug call in Brooklyn?', a: 'We offer same-day and next-day appointments throughout Brooklyn. Call before noon for the best chance at a same-day slot.' },
    ],
  },
  queens: {
    headline: `Professional Bed Bug Exterminator in Queens, NY`,
    body: `Queens is one of the most densely populated boroughs in the world, and its diverse mix of attached rowhomes, large apartment complexes, and high-turnover rental units in areas like Astoria, Flushing, and Jackson Heights creates ideal conditions for bed bug spread. Travelers returning through JFK and LaGuardia, plus a constant stream of used furniture on local marketplaces, introduce infestations year-round. Our Queens bed bug exterminators use integrated heat and chemical treatments tailored to your building type — from a Sunnyside attached home to a Flushing high-rise. We identify hidden harborage sites in headboards, sofas, and baseboards, and provide a detailed inspection report after every visit. Same-day service is available across all Queens neighborhoods. Call us now to stop the spread.`,
    faqs: [
      { q: 'Can bed bugs come from JFK or LaGuardia airport travel?', a: 'Absolutely. Bed bugs are expert hitchhikers and commonly enter homes via luggage and clothing after travel. Queens residents near both airports face elevated risk, especially after international trips.' },
      { q: 'What should I do before the bed bug exterminator arrives in Queens?', a: 'Bag and seal clothing and bedding, clear clutter from floors and closets, and leave furniture in place. Our technician will provide a pre-treatment checklist when you book.' },
      { q: 'Do you treat bed bugs in Queens co-op and condo buildings?', a: 'Yes. We work with building management and individual unit owners throughout Queens, coordinating multi-unit treatments when infestations span common walls.' },
    ],
  },
  manhattan: {
    headline: `Professional Bed Bug Exterminator in Manhattan, NY`,
    body: `Manhattan's high-rise co-ops, pre-war condos, and luxury rentals all share one vulnerability: bed bugs thrive wherever people sleep. The constant flow of tourists, business travelers, and residents moving between buildings means infestations can start in any zip code — from a Financial District studio to an Upper West Side classic-six. Our Manhattan bed bug exterminators are trained for high-rise environments, using heat treatment systems certified for use in occupied buildings and targeted chemical applications for wall voids and floor joints. We coordinate directly with building management to meet NYC Local Law compliance requirements and ensure neighboring units aren't overlooked. Discreet service, licensed technicians, and same-day availability make us Manhattan's most trusted bed bug extermination team.`,
    faqs: [
      { q: 'Are Manhattan landlords required to treat bed bugs?', a: 'Yes. Under NYC Housing Maintenance Code, landlords are responsible for exterminating bed bugs in rental units. Tenants must report infestations in writing; landlords must respond within 30 days and provide annual disclosure history.' },
      { q: 'Can you treat bed bugs in a Manhattan high-rise without disturbing neighbors?', a: 'Our heat treatment systems are self-contained and operate within the unit. We work closely with building management to schedule discreet, minimal-disruption treatments during hours that work for your building.' },
      { q: 'How long does a bed bug treatment take in a Manhattan apartment?', a: 'A standard heat treatment for a one-bedroom Manhattan apartment takes 6–8 hours. We recommend staying out of the unit during treatment and for 1–2 hours afterward.' },
    ],
  },
  nassau: {
    headline: `Professional Bed Bug Exterminator in Nassau County, NY`,
    body: `Nassau County's dense suburban communities — from Hempstead to Great Neck to Levittown — face growing bed bug pressure driven by used furniture purchases, travel, and multi-family housing. Older Cape Cods and colonials often have wall-void harborage sites that require specialized treatment protocols. Our Nassau County bed bug exterminators use EPA-approved heat treatment and residual chemical applications to knock out infestations in single-family homes, condos, and multi-unit buildings alike. We inspect every room thoroughly, including closets, upholstered furniture, and electrical outlets. Our service area covers all of Nassau County, and we offer same-day and evening appointments for busy families. Every treatment is backed by our satisfaction guarantee and free follow-up.`,
    faqs: [
      { q: 'Are bed bugs common in Nassau County suburban homes?', a: 'Yes. Bed bugs are increasingly common in Nassau County, particularly in areas with high rental turnover, secondhand furniture markets, and travel hubs near JFK. They have no preference for cleanliness — any home can be affected.' },
      { q: 'What is heat treatment and is it safe for Nassau County homes?', a: 'Heat treatment raises the ambient temperature throughout infested rooms to 120–135°F, killing bed bugs at all life stages. It\'s safe for most furnishings and leaves no chemical residue — ideal for homes with children and pets.' },
      { q: 'Do you offer bed bug inspections before treatment in Nassau County?', a: 'Yes. We offer standalone inspection services if you want confirmation before committing to a full treatment plan. Our inspectors use flashlights, probes, and trained eyes — no dogs required.' },
    ],
  },
  suffolk: {
    headline: `Professional Bed Bug Exterminator in Suffolk County, NY`,
    body: `Suffolk County spans coastal communities, wooded neighborhoods, and busy resort towns that see heavy seasonal foot traffic — all contributing to year-round bed bug pressure. From Patchogue to Huntington to the Hamptons, our Suffolk County bed bug exterminators serve homes and rentals of all types. Summer rental turnover on the South Fork and barrier islands introduces infestations that can persist into fall and winter. We use professional-grade heat treatment and targeted chemical protocols to eliminate infestations fully, regardless of home size or layout. Our team is available for same-day inspections and treatments throughout Suffolk, with evening and weekend slots available. Don't let a bed bug problem ruin your summer — call us today.`,
    faqs: [
      { q: 'Do seasonal rental properties in the Hamptons get bed bugs?', a: 'Yes. High-turnover vacation rentals in the Hamptons and other Suffolk County beach communities are prime entry points for bed bugs. We recommend professional inspections and preventive treatments between rental seasons.' },
      { q: 'How do I know if I have bed bugs in my Suffolk County home?', a: 'Look for rusty-brown stains on bedding, tiny dark fecal spots on mattress seams, shed skins near harborage areas, and small red bite marks on skin in a line or cluster. Call us for a professional inspection if you suspect activity.' },
      { q: 'Can you treat bed bugs in a large Suffolk County colonial home?', a: 'Absolutely. We scale our heat treatment and chemical protocols to any size property, from small condos to large colonial homes. We provide a room-by-room treatment plan before starting work.' },
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
  const description = `Licensed ${SERVICE_NAME.toLowerCase()} serving ${townName}, ${region.name}. ${BRAND.name} — same-day service, guaranteed results. Call ${BRAND.phoneFormatted}.`;
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Bed Bugs in {townName}?</h2>
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
