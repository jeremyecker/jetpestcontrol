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

const SERVICE_NAME = 'Cricket Exterminator';
const SERVICE_SLUG = 'cricket-exterminator';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Cricket Exterminator in Brooklyn, NY`,
    body: `Field crickets and camel crickets (cave crickets) invade Brooklyn homes and apartment buildings in late summer and fall, seeking warmth as outdoor temperatures drop. Field crickets enter through foundation gaps and poorly sealed entry points, establishing in basements and ground-floor areas where their nighttime chirping can disrupt sleep. Camel crickets — the large, humpbacked, silent species — favor damp basement environments and are commonly found in laundry rooms, utility areas, and below-grade spaces. Brooklyn's dense housing stock with shared basements and aging foundation systems provides ample entry points. Our Brooklyn cricket extermination uses perimeter barrier treatments, interior crack-and-crevice application, and moisture management recommendations to eliminate crickets and prevent seasonal return.`,
    faqs: [
      { q: `Why do I suddenly have crickets in my Brooklyn apartment in the fall?`, a: `Field crickets seek heated structures as outdoor temperatures drop below 50°F in September and October. Ground-floor and basement Brooklyn apartments are primary entry points as crickets move through foundation cracks and around utility penetrations.` },
      { q: `Are the large humpbacked crickets in my Brooklyn basement harmful?`, a: `Camel crickets (also called cave crickets or spider crickets) are harmless to humans but can damage fabrics, stored clothing, and cardboard boxes. They thrive in damp basement environments and are a sign of moisture conditions that should be addressed.` },
      { q: `How do I stop crickets from chirping in my Brooklyn home at night?`, a: `Professional exterior perimeter treatment and interior crack-and-crevice application eliminate active crickets and create a barrier against new entry. Results are typically fast — most chirping stops within 24-48 hours of treatment.` },
    ],
  },
  queens: {
    headline: `Professional Cricket Exterminator in Queens, NY`,
    body: `Cricket invasions are a late-summer and fall fixture across Queens, with field crickets and camel crickets seeking shelter in residential structures as temperatures drop. Queens' stock of attached rowhomes and apartment buildings with shared basement areas provides ideal cricket harborage — dark, slightly humid spaces that crickets prefer. The borough's commercial areas near loading docks and dumpster areas also experience elevated cricket activity. Both species are drawn to light sources at night, making commercial storefronts and buildings with exterior lighting prime entry targets. Our Queens cricket extermination program treats both interior infestations and creates exterior barriers to prevent seasonal entry.`,
    faqs: [
      { q: `Are crickets dangerous or just a nuisance in Queens?`, a: `Crickets are primarily a nuisance pest — their chirping disrupts sleep and they can damage stored fabrics. They do not bite or carry disease. However, large camel cricket populations in damp basements can indicate moisture conditions that may attract other pests.` },
      { q: `Why do crickets come into Queens homes in the fall?`, a: `Crickets are cold-intolerant insects that seek heated spaces as temperatures drop. The transition from summer to fall — typically mid-September in Queens — triggers mass cricket movement toward buildings with heat signatures.` },
      { q: `Can professional treatment eliminate crickets completely from my Queens home?`, a: `Yes. A combination of interior treatment and exterior perimeter barrier effectively eliminates existing crickets and prevents seasonal entry. Most Queens homeowners see complete resolution within 48-72 hours.` },
    ],
  },
  manhattan: {
    headline: `Professional Cricket Exterminator in Manhattan, NY`,
    body: `Cricket invasions in Manhattan concentrate in ground-floor and basement spaces — below-grade apartments, building mechanical rooms, laundry facilities, and commercial basement storage areas that provide the dark, moist conditions crickets prefer. Field crickets enter through building perimeter gaps in fall, while camel crickets establish year-round colonies in perpetually damp basement environments. The constant vibration and heat of Manhattan's underground infrastructure actually attracts crickets to certain building locations. Our Manhattan cricket extermination uses targeted interior treatment and entry-point sealing to eliminate crickets from residential and commercial spaces.`,
    faqs: [
      { q: `I hear crickets in my Manhattan building at night but can not find them — why?`, a: `Field crickets chirp to attract mates and often hide during the day in wall voids, under appliances, and in basement ceiling gaps. A professional inspection locates the harborage area so treatment can be targeted precisely.` },
      { q: `Are camel crickets common in Manhattan basements?`, a: `Yes. Manhattan's pre-war buildings with perpetually damp below-grade spaces provide ideal camel cricket habitat. These large, silent crickets are harmless but alarming in appearance and indicate damp conditions that should be addressed.` },
      { q: `Do exterminators really get rid of crickets or do they just come back?`, a: `Professional treatment with perimeter barrier application significantly reduces reentry. Annual fall treatment is the most effective long-term approach, preventing the seasonal influx before it establishes indoors.` },
    ],
  },
  nassau: {
    headline: `Professional Cricket Exterminator in Nassau County, NY`,
    body: `Nassau County homeowners deal with both field crickets and camel crickets (cave crickets) throughout late summer and fall. Field crickets invade from the yard, drawn to exterior lighting and the heat signature of the house. They enter through gaps in weatherstripping, foundation cracks, and around utility penetrations. Camel crickets are a common find in Nassau basements and crawlspaces — they thrive in the slightly damp, dark environments that Nassau's aging housing stock produces. Cricket populations can be significant in Nassau's mature residential neighborhoods where large trees and leaf litter provide ideal outdoor breeding habitat close to homes. Our Nassau County cricket treatment combines interior application, perimeter barrier spray, and outdoor habitat modification recommendations.`,
    faqs: [
      { q: `What causes cricket infestations in Nassau County homes?`, a: `Outdoor lighting attracts field crickets, which then find entry points in the foundation and walls. Damp basement conditions attract camel crickets. Reducing exterior lighting intensity, clearing leaf litter from the foundation, and sealing entry points dramatically reduces cricket pressure.` },
      { q: `Are cricket infestations a sign of a bigger pest problem in Nassau County?`, a: `Large camel cricket populations in basements often indicate moisture conditions that attract other pests — cockroaches, silverfish, and centipedes also prefer damp basements. We recommend addressing the moisture source when camel crickets are found.` },
      { q: `How do you treat crickets in a Nassau County home with a large yard?`, a: `We apply a perimeter barrier treatment around the foundation, treat active indoor areas, and recommend reducing exterior lighting near entry points. A granular outdoor treatment around the yard perimeter can reduce the outdoor cricket population that sources the indoor invasion.` },
    ],
  },
  suffolk: {
    headline: `Professional Cricket Exterminator in Suffolk County, NY`,
    body: `Suffolk County's larger lots and greater proximity to wooded and open areas means cricket populations here can be significantly larger than those in denser suburban areas. Field crickets breed in great numbers in Suffolk's unmowed areas, meadow edges, and woodland borders — producing the populations that invade homes each fall. Camel crickets are particularly common in Suffolk basements and crawlspaces, especially in homes near wetlands and wooded areas where ambient moisture is elevated. The South Fork and North Fork communities with larger properties experience the most intense cricket pressure. Our Suffolk County cricket extermination program includes outdoor habitat reduction, perimeter barrier treatment, and interior application.`,
    faqs: [
      { q: `Why are crickets so bad at my Suffolk County home near the woods?`, a: `Properties bordering woodland, meadow, or wetland areas have direct access to the large cricket breeding populations these habitats support. The abundance of outdoor breeding sites means annual fall treatment is especially important for edge-of-woods Suffolk County homes.` },
      { q: `Do crickets damage anything in my Suffolk County home?`, a: `Field crickets will chew through clothing, curtains, and fabric stored in basement areas. Camel crickets damage stored goods in damp basements. Beyond physical damage, the chirping of field crickets and the startling appearance of camel crickets make them significant nuisance pests.` },
      { q: `What is the best treatment for cricket prevention in Suffolk County?`, a: `A spring perimeter application followed by a fall treatment before peak cricket season (August-September) is the most effective prevention approach for Suffolk County homes. This two-treatment annual program keeps cricket populations from establishing indoors.` },
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Crickets in {canonicalTownName}?</h2>
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
