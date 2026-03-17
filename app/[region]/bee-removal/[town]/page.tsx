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

const SERVICE_NAME = 'Bee & Wasp Removal';
const SERVICE_SLUG = 'bee-removal';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Professional Bee & Wasp Removal in Brooklyn, NY`,
    body: `Bees, wasps, and yellow jackets in Brooklyn range from manageable nuisances to genuine structural infestations. Yellow jacket colonies nest in wall voids of brownstones and apartment buildings — building paper-nest colonies inside exterior walls that can reach 5,000 workers by late summer. Paper wasps construct visible nests under eaves, on window frames, and in building crevices throughout the borough. Honey bee swarms are seasonal visitors that occasionally establish colonies in wall voids and chimney flues of older Brooklyn buildings. European hornets nest in tree hollows and building soffit areas. Our Brooklyn bee and wasp removal team handles all species safely — from immediate wasp nest removal to full honey bee colony extraction from building structures.`,
    faqs: [
      { q: `Do I need to remove a wasp nest from my Brooklyn building or can I leave it?`, a: `Active nests in high-traffic areas or inside building structures should be removed. Leaving a yellow jacket nest in a wall void allows the colony to expand to thousands of workers and potentially damage the structure. Abandoned nests from previous seasons can be left as they will not be reused.` },
      { q: `Is a honey bee swarm in Brooklyn dangerous?`, a: `Swarms — the cluster of bees you see hanging from a tree or ledge — are actually the calmest bees you will encounter. They have no nest to defend and are rarely aggressive. However, if the swarm enters a void space and establishes a colony, professional removal is necessary.` },
      { q: `How do you remove a yellow jacket nest from inside a Brooklyn brownstone wall?`, a: `We apply professional-grade insecticide dust into the nest entrance, which workers carry into the colony. Nests in wall voids are typically eliminated within 24-48 hours. Physical nest removal may be recommended after treatment to prevent honey fermentation and structural damage.` },
    ],
  },
  queens: {
    headline: `Professional Bee & Wasp Removal in Queens, NY`,
    body: `Queens' diverse mix of single-family homes, attached rowhomes, and apartment buildings provides abundant nesting sites for bees, wasps, and yellow jackets. Yellow jackets are the most commonly encountered stinging insect in Queens, building large colonies in soil, wall voids, and attic spaces throughout the summer. Paper wasps colonize under eaves and porch structures across the borough. Bald-faced hornets build large gray paper nests in trees and under roof overhangs that can appear suddenly in July and August. Honey bee swarms are common in spring, occasionally establishing in building voids. Our Queens stinging insect removal team responds same-day to active nest situations and provides structural treatments for hidden nests.`,
    faqs: [
      { q: `What should I do if I find a large gray wasp nest in my Queens yard?`, a: `Keep people and pets away from the nest and call us immediately. Bald-faced hornet nests can house 400-700 highly defensive workers by late summer — disturbing the nest can provoke a mass attack. Professional removal with protective equipment is the only safe approach.` },
      { q: `Are yellow jackets nesting in the ground near my Queens home dangerous?`, a: `Ground-nesting yellow jacket colonies can reach thousands of workers by August and defend a large radius aggressively. We recommend professional treatment — our technicians apply insecticide at night when yellow jackets are less active and all workers are in the nest.` },
      { q: `How quickly can you remove a wasp nest from my Queens property?`, a: `We offer same-day service for stinging insect emergencies throughout Queens. Nest removal is typically completed in 30-60 minutes depending on nest location and species.` },
    ],
  },
  manhattan: {
    headline: `Professional Bee & Wasp Removal in Manhattan, NY`,
    body: `Stinging insects in Manhattan primarily involve yellow jackets nesting in building wall voids and planters, paper wasps under window sills and fire escape structures, and honey bee swarms on building ledges and in chimney flues. The concentrated urban environment means stinging insect activity near building entrances, outdoor dining areas, and rooftop gardens requires prompt professional attention. Manhattan's urban beekeeping community has increased honey bee swarm frequency in recent years. Building management companies across the borough rely on Jet Pest Control for fast, discreet stinging insect removal that meets co-op board and property manager standards.`,
    faqs: [
      { q: `There are bees swarming on my Manhattan building ledge — is this an emergency?`, a: `A swarm cluster on a ledge is not immediately dangerous but should be addressed within 24-48 hours before the bees enter a void. We can contact a local beekeeper to safely relocate honey bee swarms — call us and we will coordinate.` },
      { q: `How do yellow jackets get inside Manhattan building walls?`, a: `Yellow jackets enter through any exterior gap larger than ¼ inch — around window frames, under siding, through utility penetrations, and via roof membrane gaps. Once inside a wall void, colonies can reach 5,000 workers before residents notice the problem.` },
      { q: `Can you remove a wasp nest on a high floor of a Manhattan building?`, a: `Yes. Our technicians are equipped to treat wasp nests at height via interior access, exterior window access, or coordination with building management for roof access. We treat stinging insect issues throughout Manhattan including high-rise environments.` },
    ],
  },
  nassau: {
    headline: `Professional Bee & Wasp Removal in Nassau County, NY`,
    body: `Nassau County homeowners encounter the full range of stinging insect species throughout the warm season. Yellow jacket colonies in wall voids, attic spaces, and underground nests are the most common emergency call — large colonies discovered in August and September when family activity outdoors peaks. Paper wasps build accessible nests under eaves and porch structures that require early-season removal before colonies grow large. Bald-faced hornets construct large above-ground nests in Nassau's mature trees and shrubs. Carpenter bees drill perfectly round holes in cedar siding and wood deck structures across the county. Honey bee swarms are common in spring. Our Nassau County bee and wasp removal team handles all species with same-day emergency service available.`,
    faqs: [
      { q: `How do I know if I have yellow jackets nesting in my Nassau County home's wall?`, a: `You may notice workers entering and exiting a small hole in exterior siding or foundation, hear buzzing in a wall cavity, or see workers appearing from around window trim. Late-season colonies produce significant buzzing audible from indoors.` },
      { q: `Are carpenter bees damaging my Nassau County deck?`, a: `Carpenter bees drill 3/8-inch round entry holes in untreated wood — particularly cedar and pine — to create nesting galleries. Over several years, multiple bee families using the same structure can create significant structural damage. Annual treatment and wood staining prevent establishment.` },
      { q: `Do you handle ground-nesting yellow jacket removal in Nassau County?`, a: `Yes. Ground-nesting yellow jackets are common in Nassau County lawns. We treat underground nests at night when all workers are present, using professional insecticide injected directly into the nest entrance for immediate knockdown.` },
    ],
  },
  suffolk: {
    headline: `Professional Bee & Wasp Removal in Suffolk County, NY`,
    body: `Suffolk County's wooded neighborhoods, large lots, and abundant native landscaping create ideal conditions for every species of stinging insect active in New York. Bald-faced hornets build large paper nests in Suffolk's mature trees and shrubs that can surprise homeowners who discover them mid-summer when foliage hides them. Yellow jackets nest aggressively in underground sites across the county, with lawn mowing and gardening triggering dangerous encounters each summer. The East End's agricultural areas see elevated bee and wasp activity. Carpenter bees are extremely common throughout Suffolk, targeting the cedar shingle and wood trim that defines many South and North Fork homes. Our Suffolk County stinging insect removal team provides same-day service for emergency nest situations.`,
    faqs: [
      { q: `Why are there so many wasps and hornets in my Suffolk County yard?`, a: `Suffolk County's wooded, landscaped environment provides abundant nesting sites for yellow jackets, paper wasps, and bald-faced hornets. Properties bordering wooded areas or with multiple mature trees and dense shrubs experience the highest stinging insect pressure.` },
      { q: `Are carpenter bees a serious problem in Suffolk County cedar-sided homes?`, a: `Yes. Cedar shingles and cedar trim are a carpenter bee magnet throughout Suffolk County. Unpainted or unstained cedar is particularly vulnerable. Annual treatment of existing holes combined with painting or staining exposed wood surfaces is the most effective prevention strategy.` },
      { q: `When is the best time to remove wasp nests in Suffolk County?`, a: `Early season — May and June — when colonies are small (under 50 workers) is the safest and easiest time for removal. By August, yellow jacket colonies can reach 5,000 workers and are extremely defensive. Call us at the first sign of nest activity rather than waiting.` },
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
            <div className="text-sm text-gray-600">Safe Removal Guaranteed</div>
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
          <h2 className="text-2xl font-bold mb-2">Ready for Safe Bee & Wasp Removal in {canonicalTownName}?</h2>
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
