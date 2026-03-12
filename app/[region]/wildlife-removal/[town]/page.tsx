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
    headline: `Professional Wildlife Removal in Brooklyn, NY`,
    body: `Urban wildlife in Brooklyn includes raccoons, squirrels, opossums, skunks, pigeons, and an increasing number of coyotes. While most wildlife prefers to avoid contact with humans, structural intrusions, garbage access, and concentrated food sources drive wildlife into close conflict with Brooklyn residents. Our Brooklyn wildlife removal team handles all species under New York State DEC licensing, using humane exclusion and relocation methods appropriate for each animal. Whether you're dealing with a skunk under a Flatbush deck, an opossum in a Crown Heights crawlspace, or raccoons in a Sunset Park attic, we provide fast, professional resolution. All work is performed with full permits and follows New York's wildlife protection statutes. Call us any time for wildlife emergencies in Brooklyn.`,
    faqs: [
      { q: 'What wildlife is most commonly found in Brooklyn homes?', a: 'Raccoons, squirrels, mice, and pigeons are the most common wildlife-related calls we receive in Brooklyn. Opossums and skunks are also regularly found under decks and in crawlspaces throughout the borough.' },
      { q: 'Is wildlife removal in Brooklyn regulated by the state?', a: 'Yes. New York State DEC regulates wildlife removal and requires licensed nuisance wildlife control operators (NWCOs) for trapping and relocation. All our Brooklyn technicians hold valid DEC licenses.' },
      { q: 'What should I do if I find injured wildlife in Brooklyn?', a: 'Call 311 or contact a licensed wildlife rehabilitator. Do not attempt to handle injured wildlife yourself — many species carry zoonotic diseases. We can refer you to the appropriate NYC wildlife resources.' },
    ],
  },
  queens: {
    headline: `Professional Wildlife Removal in Queens, NY`,
    body: `Queens' parklands, including the Jamaica Bay Wildlife Refuge, Alley Pond Park, and Flushing Meadows, create wildlife corridors that bring raccoons, foxes, coyotes, opossums, and migratory birds into contact with residential neighborhoods. Wildlife intrusions are particularly common in eastern Queens neighborhoods near the Nassau border, where suburban-style housing meets open green space. Our Queens wildlife removal team holds all required New York State DEC licenses and handles everything from raccoon attic evictions to skunk removal under decks to bird exclusion from commercial properties. We use humane exclusion methods, remove attractants, and seal structures permanently to prevent re-entry. Available for emergency wildlife calls throughout Queens.`,
    faqs: [
      { q: 'Are coyotes a concern in Queens neighborhoods?', a: 'Coyote sightings have increased significantly in Queens over the past decade, particularly near Alley Pond Park and along the Nassau border. Coyotes are generally not dangerous to humans but can threaten small pets. Do not feed coyotes or leave pet food outdoors.' },
      { q: 'Can you remove a skunk from under my Queens deck without it spraying?', a: 'With proper technique, yes. We use one-way exclusion doors or trap-and-relocation methods that minimize stress to the animal and reduce spray risk. We approach skunk jobs calmly and methodically to avoid triggering a defensive response.' },
      { q: 'How do you handle a wildlife emergency in Queens after hours?', a: 'We offer after-hours emergency wildlife removal throughout Queens. Call our main line anytime — after-hours calls are routed to an on-call technician for urgent situations.' },
    ],
  },
  manhattan: {
    headline: `Professional Wildlife Removal in Manhattan, NY`,
    body: `Manhattan's relationship with urban wildlife is unique: coyotes have been documented in Central Park, pigeons foul rooftop HVAC equipment, and raccoons navigate the park system between Washington Heights and the Bronx. For Manhattan residents and building managers, wildlife problems require discreet, professional resolution that respects building rules and neighbor sensitivities. Our Manhattan wildlife removal specialists handle all permitting, work within co-op and condo access requirements, and document all work for building management records. From pigeon exclusion on a Midtown rooftop to raccoon eviction from an Inwood building's attic, we provide comprehensive urban wildlife management solutions. Licensed by New York State DEC.`,
    faqs: [
      { q: 'What urban wildlife species are found in Manhattan?', a: 'Raccoons, gray squirrels, pigeons, house sparrows, coyotes, and red-tailed hawks are all regularly observed in Manhattan. Below ground, Norway rats are the dominant wildlife pest. Above ground, raccoons and pigeons generate the most residential wildlife calls.' },
      { q: 'Can wildlife enter a Manhattan high-rise?', a: 'Yes. Birds nest on window ledges, AC units, and roof structures. Raccoons access roofs via trees and fire escapes in lower buildings. We handle wildlife exclusion for all building types from tenements to luxury towers.' },
      { q: 'Is bird exclusion legal in Manhattan?', a: 'Exclusion of common pest birds (pigeons, starlings, and house sparrows) is fully legal and does not require permits. We use physical exclusion — spikes, netting, wire coils — not poisons or traps for bird management.' },
    ],
  },
  nassau: {
    headline: `Professional Wildlife Removal in Nassau County, NY`,
    body: `Nassau County's coastal marshes, golf courses, and mature residential neighborhoods support a diverse wildlife community — raccoons, deer, foxes, coyotes, Canada geese, opossums, skunks, and more. When wildlife intrudes into Nassau homes or creates public safety concerns, licensed professional intervention is the safe and legal solution. Our Nassau County wildlife removal team handles all nuisance wildlife under New York State DEC licenses, using species-appropriate exclusion and relocation methods. From raccoon attic eviction in Garden City to Canada geese management on a Massapequa corporate campus, we provide full-spectrum wildlife control for residential, commercial, and municipal clients throughout Nassau County.`,
    faqs: [
      { q: 'What wildlife species are most commonly removed in Nassau County?', a: 'Raccoons, squirrels, skunks, opossums, geese, and groundhogs (woodchucks) are our most common wildlife removal calls in Nassau County. Fox and coyote conflicts are also increasing as populations expand into suburban areas.' },
      { q: 'Can you help with deer damage or deer-vehicle conflicts in Nassau County?', a: 'We offer deer exclusion consulting (fencing and landscape modification) for Nassau County properties. State-regulated deer management beyond exclusion requires coordination with the NYSDEC.' },
      { q: 'Are opossums dangerous to Nassau County pets?', a: 'Opossums are generally non-aggressive and rarely carry rabies (their body temperature is too low for the virus to survive). However, they can hiss and bite if cornered and should not be handled by residents. Call us for humane relocation.' },
    ],
  },
  suffolk: {
    headline: `Professional Wildlife Removal in Suffolk County, NY`,
    body: `Suffolk County's woods, wetlands, and miles of undeveloped open space make it one of Long Island's most wildlife-rich counties — and that wildlife regularly comes into conflict with residential, agricultural, and commercial properties. From deer-vehicle collisions on Sunrise Highway to mink damage at Peconic Bay fish farms, to raccoons in Smithtown attics and coyotes in Huntington neighborhoods, our Suffolk County wildlife removal specialists handle the full spectrum of nuisance wildlife situations. We hold all required New York State DEC licenses and partner with local conservation organizations to ensure humane, environmentally responsible outcomes. Same-day service available throughout all Suffolk County townships.`,
    faqs: [
      { q: 'What is the most common wildlife problem in Suffolk County?', a: 'Raccoon attic intrusions are our most common Suffolk County wildlife call, followed by squirrel removal, skunk removal from under decks, and groundhog exclusion from garden areas. Deer and Canada geese issues are also significant for commercial and agricultural clients.' },
      { q: 'Are there coyotes in Suffolk County neighborhoods?', a: 'Yes. Coyotes are well-established throughout Suffolk County, including suburban neighborhoods. They are generally not dangerous to adults but can threaten small pets and poultry. We offer coyote aversion and property exclusion consulting.' },
      { q: 'Do you handle wildlife removal on waterfront Suffolk County properties?', a: 'Yes. Waterfront properties face unique wildlife challenges including muskrats, mink, geese, herons, and osprey conflicts. We handle all species under appropriate state and federal permits, ensuring full compliance with environmental regulations.' },
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
