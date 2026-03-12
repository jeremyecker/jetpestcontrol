import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

const SERVICE_NAME = 'Squirrel Removal';
const SERVICE_SLUG = 'squirrel-removal';

interface ServiceContent {
  headline: string;
  body: string;
  faqs: { q: string; a: string }[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  brooklyn: {
    headline: `Squirrel Removal Services in Brooklyn, NY`,
    body: `Eastern gray squirrels are abundant in Brooklyn's tree-lined streets and parks, and they regularly invade brownstone attics and rooftop cornices to nest. They're most active in late summer through autumn as they seek warm denning sites before winter. Squirrels enter through open soffit ends, gaps around dormer pediments, and damaged ridge caps — vulnerabilities common on Brooklyn's brick rowhouses. Once inside, they chew electrical wires (a fire hazard), tear insulation apart for nesting, and contaminate attic spaces with urine and feces. Jet Pest Control removes squirrels humanely using one-way exclusion funnels and live traps, then seals every entry point with materials squirrels cannot gnaw through. We recommend scheduling removal in late summer or early winter to avoid separating nursing mothers from kits.`,
    faqs: [
      { q: `Can squirrels chew through pest-proofing materials?`, a: `Standard caulk and wood filler won't stop squirrels. Jet uses 16-gauge galvanized steel mesh and steel door sweeps rated for rodent exclusion. Squirrels cannot gnaw through properly installed steel mesh, which is why material choice matters as much as finding the entry points.` },
      { q: `When is the best time to remove squirrels from a Brooklyn attic?`, a: `The safest windows are late summer (August–September, between litters) and mid-winter (January–February, after weaning). Removing squirrels during the spring or early summer nesting season risks trapping dependent kits inside the attic.` },
      { q: `Do I need a permit to remove squirrels in Brooklyn?`, a: `Gray squirrels in New York are a non-protected species, so no DEC permit is required for exclusion or live-trapping. However, if you plan to relocate captured squirrels, the DEC recommends release within one mile of capture. Jet handles all aspects of legal removal.` },
    ],
  },
  queens: {
    headline: `Squirrel Removal Services in Queens, NY`,
    body: `Gray squirrels thrive throughout Queens, particularly in neighborhoods with mature oak and maple canopy like Forest Hills, Kew Gardens, and Douglaston. As these trees approach rooftops and overhang rooflines, they become natural highways squirrels use to access attics, soffits, and rooftop equipment rooms. Jet Pest Control handles squirrel removal in Queens with a humane exclusion-first approach: one-way exclusion funnels installed at all active entry points allow squirrels to exit but not re-enter, then we seal those points permanently with chew-resistant steel mesh. Our Queens technicians are familiar with the HOA and cooperative restrictions in neighborhoods like Forest Hills Gardens and coordinate accordingly. Post-exclusion, we recommend trimming overhanging branches as a long-term prevention measure.`,
    faqs: [
      { q: `How do I know if squirrels are in my Queens attic?`, a: `Listen for light scurrying and scratching in early morning and late afternoon — squirrels are diurnal and most active at dawn and dusk. You may hear them returning to the nest repeatedly through the same entry point. Look for chewed fascia, bent soffit panels, or staining around a corner where they typically enter.` },
      { q: `Will squirrels return after exclusion in Queens?`, a: `If exclusion is done correctly — every entry point sealed with steel mesh — squirrels will not re-enter through those points. They may attempt nearby areas, which is why Jet's technicians inspect the entire roofline and dormer perimeter, not just the obvious entry point.` },
      { q: `Can squirrels cause fires in Queens homes?`, a: `Yes. Squirrels' teeth grow continuously, compelling them to gnaw constantly. In attics they frequently chew insulation from electrical wires, creating bare-wire exposure that is a genuine fire hazard. Jet recommends having an electrician inspect any attic wiring after a confirmed squirrel infestation.` },
    ],
  },
  manhattan: {
    headline: `Squirrel Removal Services in Manhattan, NY`,
    body: `Squirrels are among the most visible wildlife in Manhattan, with dense populations in Central Park, Riverside Park, Morningside Park, and Fort Tryon Park feeding the surrounding neighborhoods. Brownstones and rowhouses on the Upper West Side, Harlem, and Washington Heights face squirrel intrusion each fall as animals seek warm attic spaces for winter. Pre-war buildings with ornate cornices, copper gutters, and wood soffits provide numerous undetected entry points that standard building maintenance often overlooks. Jet Pest Control handles squirrel removal for Manhattan residential and cooperative buildings with a minimally disruptive approach — one-way exclusion funnels and targeted live-trapping, followed by comprehensive exclusion repair using materials appropriate for landmark and historic buildings.`,
    faqs: [
      { q: `Do squirrels cause problems in Manhattan brownstones?`, a: `Yes. Manhattan brownstones, particularly on the Upper West Side and in Harlem, suffer from squirrel intrusions each fall. Squirrels enter through deteriorated copper cornice joints, open soffit vents, and gaps around chimney flashing. Once inside, they nest in insulation and chew wiring.` },
      { q: `Can Jet work on landmark buildings in Manhattan?`, a: `Yes. Jet Pest Control technicians are experienced working on landmarked and historic buildings in Manhattan, using repair materials and methods appropriate for preservation-sensitive structures. We can coordinate with your building's architect or managing agent when required by the Landmarks Preservation Commission.` },
      { q: `How do I prevent squirrels from re-entering my Manhattan apartment building?`, a: `The single most effective prevention is branch trimming — removing branches that overhang or touch the roofline. Additionally, all soffit vents should be covered with galvanized steel mesh and all cornice joints pointed. Jet provides a post-exclusion prevention report for every Manhattan job.` },
    ],
  },
  nassau: {
    headline: `Squirrel Removal Services in Nassau County, NY`,
    body: `Nassau County's suburban neighborhoods — with mature oak canopy in communities like Oyster Bay, Glen Cove, and Roslyn Heights — support robust gray squirrel populations that frequently invade home attics. The combination of large old trees overhanging roofs and Nassau's aging aluminum-soffit homes creates easy entry: squirrels chew through soffit corners and fascia ends in hours. Homeowners in Levittown, Hicksville, and Bethpage often discover squirrel infestations in fall when animals become most aggressive about securing winter den sites. Jet Pest Control removes squirrels from Nassau County homes using one-way exclusion doors and live-trapping, then seals every confirmed and potential entry point with galvanized steel mesh guaranteed to withstand squirrel gnawing. We include attic damage assessment with every removal.`,
    faqs: [
      { q: `How much damage can squirrels cause in a Nassau County attic?`, a: `In a typical Nassau County cape cod or colonial attic, a pair of squirrels nesting for one season can destroy $500–$2,000 of insulation, chew through multiple wire runs, and contaminate insulation with urine. Damage is often not discovered until winter energy bills spike or an electrical fault occurs.` },
      { q: `What is the squirrel exclusion process in Nassau County?`, a: `Jet technicians first inspect the entire roofline and attic to identify all entry points and assess the population size. We install one-way exclusion funnels at active entry points and seal all secondary vulnerabilities simultaneously. After 48–72 hours we confirm all squirrels have exited and remove the funnels, then permanently seal those points.` },
      { q: `Can I prevent squirrels from entering my Nassau County home?`, a: `The most effective prevention measures are trimming tree branches to maintain a minimum 10-foot clearance from the roofline, installing galvanized steel mesh over all soffit vents, and replacing deteriorated fascia and soffit with cellular PVC or aluminum — both harder to gnaw than wood.` },
    ],
  },
  suffolk: {
    headline: `Squirrel Removal Services in Suffolk County, NY`,
    body: `Suffolk County's extensive woodland cover and mature residential landscaping make it one of the highest-density gray squirrel areas on Long Island. Eastern gray squirrels in Suffolk County are particularly active in late summer and fall as they cache food and seek winter den sites, often choosing attics of homes in Smithtown, Hauppauge, Huntington, and Northport. The county's many older ranch and cape cod homes — with original aluminum soffit and wood fascia installed in the 1960s–1980s — are particularly vulnerable to squirrel entry as these materials age and deteriorate. Jet Pest Control provides prompt squirrel removal and exclusion throughout Suffolk County, including the East End communities, with steel-mesh exclusion guaranteed to prevent re-entry.`,
    faqs: [
      { q: `Why do squirrels favor ranch homes in Suffolk County?`, a: `Ranch-style homes common in central Suffolk County have low-pitched rooflines and broad soffit runs that give squirrels easy horizontal access to entry points. The original aluminum soffit typical of 1960s–1980s Suffolk construction is particularly easy to gnaw through at corners and at the fascia joint.` },
      { q: `Do flying squirrels appear in Suffolk County?`, a: `Yes. Northern flying squirrels are present in wooded areas of central and eastern Suffolk County and occasionally enter attics. They are nocturnal and much quieter than gray squirrels, making them harder to detect. Jet technicians can identify flying squirrel infestations by inspecting for their distinctive entry holes and droppings.` },
      { q: `How quickly can Jet respond to a Suffolk County squirrel removal call?`, a: `Jet Pest Control typically schedules Suffolk County squirrel removal within 24–48 hours. We have technicians based throughout western and central Suffolk County for rapid response. East End service (Hamptons area) may require scheduling 2–3 days in advance.` },
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
          <h2 className="text-2xl font-bold mb-2">Ready to Eliminate Squirrels in {townName}?</h2>
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
