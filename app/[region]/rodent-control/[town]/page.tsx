import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

const SERVICE_NAME = 'Rodent Control';
const SERVICE_SLUG = 'rodent-control';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Expert Rodent Control in Brooklyn, NY`,
    body: `Brooklyn ranks among the most rodent-challenged boroughs in New York City, with rats and mice exploiting its aging housing stock, dense restaurant corridors, and extensive subway infrastructure. Homes in Bushwick, East New York, and Sunset Park often have multiple rodent entry points through gaps at pipe penetrations, deteriorated foundation masonry, and utility chases. Our Brooklyn rodent control team performs detailed exclusion inspections — identifying every gap 1/4 inch or larger — and seals them using gnaw-proof materials including steel mesh, caulk, and cement mortar. We then deploy tamper-resistant bait stations at strategic interior and exterior locations and return for follow-up service until activity ceases. Our integrated pest management approach addresses both the rodents you see and the conditions that attract them.`,
    faqs: [
      { q: 'Why is rodent control so difficult in Brooklyn apartments?', a: 'Brooklyn\'s multi-family buildings have shared wall voids, utility chases, and basement spaces that create highways for rodents between units. Without sealing the entire building\'s entry points, rodents simply move between apartments.' },
      { q: 'What is the best rodent control method for Brooklyn rowhouses?', a: 'Integrated exclusion plus baiting. We seal all exterior entry points with gnaw-proof materials first, then deploy interior and exterior bait stations. Exclusion alone stops entry; baiting eliminates existing populations.' },
      { q: 'Do Brooklyn restaurants need commercial rodent control programs?', a: 'Yes. NYC Health Code requires restaurants to maintain effective pest control programs. We offer monthly commercial rodent control contracts for Brooklyn food service establishments, including documentation for DOH inspections.' },
    ],
  },
  queens: {
    headline: `Expert Rodent Control in Queens, NY`,
    body: `Queens' diverse neighborhoods — from the dense apartment corridors of Astoria to the residential streets of Bayside — all face rodent pressure driven by proximity to food sources, subway lines, and aging utility infrastructure. Mice exploit gaps as small as a dime to enter Queens homes, while rats tunnel under foundations and enter through broken drain pipes and cracks in masonry. Our Queens rodent control specialists perform full exterior and interior inspections, identify all active entry points, and seal them with professional-grade exclusion materials. We install tamper-resistant bait stations appropriate for your property type — from single-family rowhomes to large apartment complexes — and provide monthly maintenance programs to ensure long-term results. Call for a free rodent inspection in any Queens neighborhood.`,
    faqs: [
      { q: 'How do mice get into Queens apartments in winter?', a: 'Mice enter Queens homes through utility penetrations, gaps around pipes under sinks, cracks in foundation walls, and gaps around doors and windows. As temperatures drop, they seek warm harborage inside buildings.' },
      { q: 'What signs of rodents should I look for in a Queens home?', a: 'Look for dark droppings near food sources, gnaw marks on wood and food packaging, greasy rub marks along baseboards, and shredded nesting material in drawers or attic insulation.' },
      { q: 'Can you do rodent control in Queens commercial buildings?', a: 'Absolutely. We handle rodent control for restaurants, offices, warehouses, and multi-family buildings throughout Queens, including compliance documentation for NYC Health Code inspections.' },
    ],
  },
  manhattan: {
    headline: `Expert Rodent Control in Manhattan, NY`,
    body: `Manhattan's pre-war buildings, extensive underground infrastructure, and thousands of restaurants per square mile create a challenging rodent environment unlike anywhere else in the country. Rats in Manhattan exploit the subway system to move between blocks, while mice thrive in the wall voids of pre-war co-ops and condos. Our Manhattan rodent control team specializes in high-density urban environments, using integrated exclusion, tamper-resistant bait stations, and ongoing monitoring to eliminate infestations and prevent recurrence. We work with building management in co-ops and condos to address building-wide rodent problems, and we provide restaurant-grade rodent control programs for food service businesses. Discreet service, licensed professionals, and guaranteed results throughout Manhattan.`,
    faqs: [
      { q: 'Why do Manhattan pre-war buildings have more rodent problems?', a: 'Pre-war buildings have complex utility layouts, aging masonry with settling cracks, and pipe penetrations that were never sealed to modern standards. These create numerous rodent entry points that are difficult to address without professional exclusion expertise.' },
      { q: 'Are Manhattan landlords required to control rodents?', a: 'Yes. NYC Housing Maintenance Code Section 27-2018 requires landlords to keep buildings free from rodent infestations. Landlords who fail to address rodent problems can face fines from the NYC DOHMH.' },
      { q: 'What is IPM (Integrated Pest Management) and do you use it in Manhattan?', a: 'IPM is an evidence-based approach combining inspection, exclusion, sanitation recommendations, and targeted treatment to manage pests with minimal chemical use. NYC requires IPM for all school pest control and recommends it building-wide. We use IPM methods for all Manhattan rodent control work.' },
    ],
  },
  nassau: {
    headline: `Expert Rodent Control in Nassau County, NY`,
    body: `Nassau County's suburban homes, shopping centers, and older housing stock provide mice and rats with ample harborage and food sources year-round. As weather cools each fall, mice attempt to enter Nassau homes in large numbers through gaps around pipes, foundation cracks, and gaps at garage door sweeps. Rats are prevalent near waterways, dumpsters, and older sewer infrastructure in denser Nassau communities like Hempstead and Freeport. Our Nassau County rodent control program begins with a thorough exterior and interior inspection, followed by professional exclusion work and deployment of tamper-resistant bait stations. We also provide sanitation recommendations to remove food and harborage attractants. Monthly maintenance plans available for Nassau homeowners and commercial accounts.`,
    faqs: [
      { q: 'When is rodent season in Nassau County?', a: 'Rodent activity in Nassau County peaks in fall (September–November) as mice and rats seek warm harborage for winter. However, rodents breed year-round indoors, so infestations can develop in any season.' },
      { q: 'How do I mouse-proof my Nassau County home?', a: 'Seal all gaps 1/4 inch or larger around pipes, wires, and foundation penetrations. Install door sweeps, replace damaged weatherstripping, and ensure garage doors seal properly. Our team can perform a full exclusion inspection and seal your home professionally.' },
      { q: 'Do you offer rodent control maintenance plans in Nassau County?', a: 'Yes. Our monthly maintenance plans for Nassau County homes and businesses include regular bait station checks, trap service, and exterior inspections. Plans start at a flat monthly rate with no long-term contract required.' },
    ],
  },
  suffolk: {
    headline: `Expert Rodent Control in Suffolk County, NY`,
    body: `Suffolk County's diverse landscape — from wooded interior townships to dense South Shore communities and North Fork farmland — supports large populations of both house mice and Norway rats. Wooded lots in Brookhaven and Smithtown see deer mice and voles in addition to the common house mouse, while coastal and marina communities deal with persistent Norway rat populations near waterways. Our Suffolk County rodent control specialists tailor programs to your specific environment: exterior rodent bait stations for larger properties, full interior exclusion for homes with active infestations, and commercial IPM programs for restaurants and warehouses. We serve all of Suffolk County with same-day inspection availability and guaranteed results.`,
    faqs: [
      { q: 'Are deer mice or hantavirus a concern in Suffolk County?', a: 'Deer mice, which can carry hantavirus, are present in wooded parts of Suffolk County but are far less common in homes than the typical house mouse. Any rodent dropping cleanup in attics or crawlspaces should use protective equipment and HEPA vacuums.' },
      { q: 'How do rats get into homes near Suffolk County waterways?', a: 'Norway rats near water frequently burrow under foundations, enter through broken sewer laterals, and access homes through gaps in basement walls at or below grade. Waterfront and marina-adjacent properties need regular exterior inspections.' },
      { q: 'What is the cost of rodent control in Suffolk County?', a: 'A one-time rodent inspection and exclusion treatment for a single-family Suffolk County home typically starts at a few hundred dollars depending on scope. We provide detailed written estimates after our free inspection.' },
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Rodents in {townName}?</h2>
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
