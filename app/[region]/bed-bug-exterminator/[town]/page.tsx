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
    body: `Brooklyn's dense brownstones and multi-family rowhouses create ideal conditions for bed bug infestations to spread rapidly between units. When one apartment on a floor gets bed bugs — often carried in on used furniture, luggage from business travel, or clothing — the problem can escalate building-wide within weeks. Jet Pest Control specializes in Brooklyn bed bug extermination using heat treatment and targeted chemical protocols designed for attached housing. Our licensed technicians perform thorough inspections behind baseboards, inside headboards, and along box spring seams. We work discreetly, coordinate with building management when needed, and provide written certification for multi-unit buildings. Don't wait — Brooklyn bed bug populations double every few weeks without treatment.`,
    faqs: [
      { q: `How do bed bugs spread in Brooklyn apartment buildings?`, a: `Bed bugs travel through shared walls, plumbing chases, and hallways. They also hitchhike on luggage, secondhand furniture purchased from street sales, and clothing. Brooklyn's attached housing stock makes neighbor-to-neighbor spread common, which is why whole-floor inspections are often recommended.` },
      { q: `Do you offer heat treatment for Brooklyn brownstones?`, a: `Yes. Jet Pest Control offers thermal heat treatment that raises room temperatures to 120–135°F, killing bed bugs at all life stages — including eggs — in a single day. This method is ideal for Brooklyn brownstones where drilling or chemical applications may be restricted by building management.` },
      { q: `How quickly can you respond to a bed bug call in Brooklyn?`, a: `We offer same-day and next-day appointments throughout Brooklyn. For multi-unit buildings with active infestations, our team can mobilize a full crew within 24 hours. Call early in the day for the best chance of same-day service.` },
    ],
  },
  queens: {
    headline: `Professional Bed Bug Exterminator in Queens, NY`,
    body: `Queens is one of New York City's most densely populated and diverse boroughs, with neighborhoods like Astoria, Flushing, and Jackson Heights packed with attached rowhomes, multi-story apartment buildings, and basement units. This housing density accelerates bed bug spread — a single infested unit in a Flushing apartment building can seed an entire floor within weeks. Jet Pest Control brings targeted bed bug extermination to every Queens neighborhood, using heat treatment for whole-unit eradication and EPA-registered residual sprays for crack-and-crevice follow-up. Our Queens team understands the unique challenges of multi-family housing with limited access to common areas and the need for discreet service. We work around your schedule and coordinate with building supers when needed to ensure complete treatment coverage.`,
    faqs: [
      { q: `How do bed bugs get into Queens apartments?`, a: `The most common introduction routes in Queens are international travel through JFK Airport, secondhand furniture purchased at flea markets or street sales, and neighbor-to-neighbor migration through shared walls and utility chases. Queens' large international traveler population makes travel-related introductions especially common.` },
      { q: `Can bed bugs live in shared laundry rooms?`, a: `Yes. Bed bugs can survive in laundry bags and on clothing long enough to spread from unit to unit via shared laundry facilities — common in Queens apartment buildings. Always transport laundry in sealed bags and transfer directly from dryer to bag without folding in the laundry room.` },
      { q: `Do you provide bed bug inspections for Queens rental properties?`, a: `Yes. Jet Pest Control offers pre-treatment inspections for landlords and tenants in Queens. We provide written inspection reports suitable for housing court filings and can coordinate multi-unit inspections to identify the scope of an infestation across a building.` },
    ],
  },
  manhattan: {
    headline: `Professional Bed Bug Exterminator in Manhattan, NY`,
    body: `Manhattan's high-rise co-ops, pre-war rentals, and boutique hotels create a uniquely challenging environment for bed bug extermination. Residents in buildings with 50+ units face constant re-introduction risk from neighbors, building staff, and the sheer volume of deliveries and visitors passing through lobbies and hallways. Pre-war buildings with plaster walls, original hardwood floors, and intricate moldings provide countless harborage points that standard sprays cannot penetrate. Jet Pest Control brings Manhattan-grade bed bug extermination to every neighborhood from the Financial District to Inwood — using K-9 bed bug detection dogs for initial inspections and heat treatment for eradication. We coordinate with building management, provide white-glove service, and offer confidential billing for clients who prefer discretion.`,
    faqs: [
      { q: `Why are bed bugs so difficult to eliminate in Manhattan co-op buildings?`, a: `Manhattan co-ops face ongoing re-introduction because high resident density, constant visitor flow, and shared infrastructure (elevators, laundry rooms, common hallways) all create transmission routes. Treating a single unit without inspecting adjacent units frequently results in re-infestation within weeks.` },
      { q: `Do you use heat treatment in Manhattan high-rise buildings?`, a: `Yes. Heat treatment is our preferred method for Manhattan high-rises because it requires no evacuation of chemical residues and can treat a unit in a single day. We use portable heating equipment suitable for elevator building access. Some buildings require board approval — we help facilitate this.` },
      { q: `Can bed bugs travel between floors in a Manhattan apartment building?`, a: `Yes. Bed bugs travel through electrical conduit, pipe chases, and door-frame gaps between units on the same floor and between floors above and below. In severe building-wide infestations, Jet recommends a floor-by-floor inspection program to map the spread pattern.` },
    ],
  },
  nassau: {
    headline: `Professional Bed Bug Exterminator in Nassau County, NY`,
    body: `Nassau County's dense suburban communities — from Levittown's post-war cape cods to the colonial homes of Garden City and the townhouse developments of Oceanside — create significant bed bug transmission risk, particularly as residents increasingly purchase secondhand furniture through Facebook Marketplace and app-based resale platforms. Nassau's older housing stock, built largely in the 1940s–1970s, often has original hardwood floors and plaster walls with hidden harborage opportunities that make bed bug eradication challenging without heat treatment. Jet Pest Control serves all of Nassau County with licensed bed bug extermination including K-9 detection, heat treatment, and targeted chemical protocols. We provide written service reports required by Nassau County landlords and offer re-inspection guarantees to confirm eradication.`,
    faqs: [
      { q: `How did I get bed bugs in my Nassau County home?`, a: `Nassau County residents most commonly acquire bed bugs through travel (bringing infested luggage home), secondhand furniture purchases, and visits from or to homes with active infestations. Hotels, college dormitories, and overnight medical care facilities are also common acquisition points.` },
      { q: `Is heat treatment available for Nassau County homes?`, a: `Yes. Heat treatment is available throughout Nassau County. Jet brings portable heating equipment to your home and raises interior temperatures to 120–135°F, eliminating bed bugs at all life stages in a single treatment day. Preparation requirements are minimal compared to chemical treatment.` },
      { q: `How long does bed bug treatment take for a Nassau County house?`, a: `A standard single-family home heat treatment takes 6–8 hours. Chemical treatment requires two visits spaced 10–14 days apart. For homes with significant clutter or multiple infestation points, a combination protocol using both methods may be recommended.` },
    ],
  },
  suffolk: {
    headline: `Professional Bed Bug Exterminator in Suffolk County, NY`,
    body: `Suffolk County's combination of waterfront vacation communities, Hamptons seasonal rentals, and year-round suburban neighborhoods creates a uniquely high bed bug introduction risk. Seasonal rental properties in Southampton, East Hampton, and Westhampton Beach turn over guests weekly all summer — each a potential bed bug introduction event. Year-round communities from Smithtown to Patchogue face the same spread dynamics as suburban Nassau, complicated by the county's geographic size (50+ miles east to west) and the distance from urban pest control services. Jet Pest Control covers all of Suffolk County with licensed bed bug extermination — heat treatment, chemical protocols, and K-9 inspection — delivered by technicians based locally so response times stay short. We also offer seasonal rental property inspection programs for Hamptons landlords.`,
    faqs: [
      { q: `Why are seasonal rental properties in Suffolk County at higher bed bug risk?`, a: `Seasonal rentals in the Hamptons, Fire Island, and the North Fork experience dozens of different guest groups each summer. Each new group represents a potential bed bug introduction. Renters frequently bring infested luggage from prior travel. Jet offers between-rental inspections for Suffolk County property managers.` },
      { q: `Does bed bug treatment work during Suffolk County winters?`, a: `Yes — bed bug activity is year-round regardless of outdoor temperatures because they live inside climate-controlled structures. Heat treatment can be performed any time of year. Chemical treatments may need slightly modified preparation in winter due to reduced ventilation options.` },
      { q: `How far east does Jet Pest Control serve in Suffolk County?`, a: `Jet Pest Control serves all of Suffolk County including the East End communities of Southampton, East Hampton, Montauk, Southold, and the North Fork. Travel fees may apply for locations east of Route 112. Call for specific service availability at your address.` },
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
