import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

export async function generateMetadata({ params }: { params: Promise<{ region: string; town: string }> }): Promise<Metadata> {
  const { region: regionSlug, town: townSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};
  const townName = townSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `Pest Control in ${townName}, ${region.stateCode}`,
    description: `Professional pest control in ${townName}, ${region.stateCode}. Call ${BRAND.phoneFormatted} for same-day service.`,
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

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${regionSlug}/`} className="hover:text-brand-primary">{region.name}</Link>
          {' \u2192 '}
          <Link href={`/${regionSlug}/service-areas/`} className="hover:text-brand-primary">Service Areas</Link>
          {' \u2192 '}
          <span className="text-gray-900">{townName}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Pest Control in {townName}, {region.stateCode}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {BRAND.name} provides professional pest control to {townName} homeowners and businesses. {region.pestContext}
        </p>

        <div className="bg-brand-light rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-3">Serving {townName} with:</h2>
          <ul className="space-y-2 text-brand-dark">
            {region.primaryPests.map(pest => (
              <li key={pest}>\u2705 {pest} treatment and prevention</li>
            ))}
            <li>\u2705 Same-day service available</li>
            <li>\u2705 Family and pet-safe treatments</li>
          </ul>
        </div>

        <div className="text-center">
          <a
            href={`tel:+1${BRAND.phone.replace(/\D/g, '')}`}
            className="inline-block bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-10 rounded-lg text-xl transition-colors mr-4"
          >
            Call {BRAND.phoneFormatted}
          </a>
          <Link
            href={`/${regionSlug}/contact/`}
            className="inline-block bg-brand-accent hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-colors"
          >
            Free Quote
          </Link>
        </div>
      </div>
      <CTABanner />
    </>
  );
}
