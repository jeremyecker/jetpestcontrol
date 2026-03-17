import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getRegion } from '@/lib/regions';
import { BRAND, SERVICE_TOWN_ROUTES } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';
import { regionFAQs, regionServices, getNearbyTowns } from '@/lib/jet-town-data';
import { jetTownOpeners } from '@/lib/jet-city-openers-data';
import { cityFAQs, nearbyTownMap, hubNeighborhoods } from '@/lib/jet-layer7-data';

export async function generateMetadata({ params }: { params: Promise<{ region: string; town: string }> }): Promise<Metadata> {
  const { region: regionSlug, town: townSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};
  const townName = townSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `Pest Control in ${townName}, ${region.stateCode}`,
    description: `Licensed pest control in ${townName}, ${region.stateCode}. ${BRAND.name} provides same-day service for bed bugs, rodents, cockroaches, and more. Call ${BRAND.phoneFormatted} now.`,
    alternates: { canonical: `https://${BRAND.domain}/${regionSlug}/${townSlug}` },
    openGraph: {
      title: `Pest Control in ${townName}, ${region.stateCode}`,
      description: `Licensed pest control in ${townName}, ${region.stateCode}. ${BRAND.name} provides same-day service for bed bugs, rodents, cockroaches, and more. Call ${BRAND.phoneFormatted} now.`,
      url: `https://${BRAND.domain}/${regionSlug}/${townSlug}`,
      images: [{ url: `https://${BRAND.domain}/og-image.png` }],
      type: 'website',
      locale: 'en_US',
      siteName: BRAND.name,
    },
  };
}

export async function generateStaticParams() {
  const { REGIONS } = await import('@/hub.config');
  return REGIONS.flatMap(region =>
    region.towns.map(town => ({
      region: region.slug,
      town: town.toLowerCase().replace(/\s+/g, '-'),
    }))
  );
}

export default async function TownPage({ params }: { params: Promise<{ region: string; town: string }> }) {
  const { region: regionSlug, town: townSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  const townName = townSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const isValidTown = region.towns.some(
    t => t.toLowerCase().replace(/\s+/g, '-') === townSlug
  );
  if (!isValidTown && region.towns.length > 0) notFound();

  const faqs = cityFAQs[townSlug] ?? regionFAQs[regionSlug] ?? regionFAQs['brooklyn'];
  const services = regionServices[regionSlug] ?? regionServices['brooklyn'];

  // Find the actual town name (for proper casing)
  const canonicalTownName = region.towns.find(
    t => t.toLowerCase().replace(/\s+/g, '-') === townSlug
  ) ?? townName;

  const allNearby = nearbyTownMap[townSlug] ?? getNearbyTowns(canonicalTownName, region.towns, 4);
  const nearbyTowns = allNearby.filter(town =>
    region.towns.some(t => t.toLowerCase().replace(/[\s']/g, m => m === "'" ? '' : '-') === town.toLowerCase().replace(/[\s']/g, m => m === "'" ? '' : '-'))
  );

  // Neighborhoods section (Layer 7)
  const neighborhoods = hubNeighborhoods[townSlug] ?? null;

  // Unique opener for this town (Layer 3)
  const uniqueOpener = jetTownOpeners[townSlug] ?? null;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://${BRAND.domain}/#business`,
    name: BRAND.name,
    description: `Professional pest control services in ${canonicalTownName}, ${region.stateCode}. Licensed and insured. Same-day service available.`,
    url: `https://${BRAND.domain}`,
    telephone: `+1${BRAND.phone}`,
    email: BRAND.email,
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: canonicalTownName,
      containedInPlace: {
        '@type': 'State',
        name: region.stateName,
      },
    },
    hasMap: `https://www.google.com/maps/search/${encodeURIComponent(BRAND.name + ' ' + canonicalTownName + ' ' + region.stateCode)}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${BRAND.domain}` },
      { '@type': 'ListItem', position: 2, name: region.name, item: `https://${BRAND.domain}/${regionSlug}` },
      { '@type': 'ListItem', position: 3, name: `Pest Control in ${canonicalTownName}`, item: `https://${BRAND.domain}/${regionSlug}/${townSlug}` },
    ],
  };

  return (
    <>
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-primary">Home</Link>
          {' / '}
          <Link href={`/${regionSlug}`} className="hover:text-brand-primary">{region.name}</Link>
          {' / '}
          <span className="text-gray-900">Pest Control in {canonicalTownName}</span>
        </nav>

        {/* Hero */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Pest Control in {canonicalTownName}, {region.stateCode}
        </h1>

        {/* Unique opener (Layer 3) or fallback */}
        {uniqueOpener ? (
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{uniqueOpener}</p>
        ) : (
          <p className="text-xl text-gray-600 mb-6">
            {BRAND.name} provides licensed, professional pest control to {canonicalTownName} residents and businesses.{' '}
            {region.pestContext} Our technicians deliver same-day service with treatments that are family-friendly and pets.
          </p>
        )}

        {/* Trust Stats */}
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

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href={`tel:+1${BRAND.phone.replace(/\D/g, '')}`}
            className="flex-1 text-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            📞 Call {BRAND.phoneFormatted}
          </a>
          <Link
            href={`/${regionSlug}/contact`}
            className="flex-1 text-center bg-brand-accent hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Services — linked to service×town pages */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Pest Control Services Available in {canonicalTownName}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SERVICE_TOWN_ROUTES.map((svc) => (
            <Link
              key={svc.slug}
              href={`/${regionSlug}/${svc.slug}/${townSlug}`}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-brand-primary transition-all group"
            >
              <div className="text-3xl mb-2">{svc.emoji}</div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                {svc.label} in {canonicalTownName}
              </h3>
            </Link>
          ))}
        </div>

        {/* Primary Pests */}
        <div className="bg-brand-light rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-brand-dark mb-4">
            Common Pests Treated in {canonicalTownName}
          </h2>
          <ul className="grid grid-cols-2 gap-2 text-brand-dark">
            {region.primaryPests.map(pest => (
              <li key={pest} className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> {pest}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span> Ants &amp; Stinging Insects
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span> Fleas &amp; Ticks
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Pest Control FAQ — {canonicalTownName}
        </h2>
        <div className="space-y-6 mb-12">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Neighborhoods (Layer 7) */}
        {neighborhoods && (
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Neighborhoods We Serve in {canonicalTownName}
            </h2>
            <div className="space-y-3">
              {neighborhoods.map(n => (
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

        {/* Nearby Towns */}
        {nearbyTowns.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Also Serving Nearby Communities
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearbyTowns.map(town => {
                const slug = town.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={town}
                    href={`/${regionSlug}/${slug}`}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-brand-primary hover:bg-brand-light hover:border-brand-primary transition-colors"
                  >
                    {town}
                  </Link>
                );
              })}
              <Link
                href={`/${regionSlug}`}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-brand-primary hover:bg-brand-light hover:border-brand-primary transition-colors"
              >
                All {region.shortName} Service Areas →
              </Link>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-brand-primary rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">
            Ready to Solve Your Pest Problem in {canonicalTownName}?
          </h2>
          <p className="text-brand-light mb-6 opacity-90">
            Licensed, insured, and available same-day. Call now or request a free quote online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:+1${BRAND.phone.replace(/\D/g, '')}`}
              className="bg-white text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              📞 {BRAND.phoneFormatted}
            </a>
            <Link
              href={`/${regionSlug}/contact`}
              className="bg-brand-accent hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

      </div>
      <CTABanner />
    </>
  );
}
