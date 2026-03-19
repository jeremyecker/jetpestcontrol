import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

const SERVICE_NAME = 'Ant Exterminator';
const SERVICE_SLUG = 'ant-exterminator';
const SERVICE_DESC = 'Complete ant colony elimination — carpenter ants, odorous house ants, and pavement ants treated at the source.';
const SERVICE_ICON = '🐜';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};
  return {
    title: `${SERVICE_ICON} ${SERVICE_NAME} in ${region.name}, ${region.stateCode} | ${BRAND.name}`,
    description: `${SERVICE_DESC} Licensed ${region.stateCode} exterminators serving all communities in ${region.name}. Call ${BRAND.phoneFormatted}.`,
    alternates: { canonical: `https://${BRAND.domain}/${regionSlug}/${SERVICE_SLUG}/` },
    openGraph: {
      title: `${SERVICE_NAME} in ${region.name}, ${region.stateCode}`,
      description: `Licensed ${SERVICE_NAME.toLowerCase()} serving all communities in ${region.name}.`,
      url: `https://${BRAND.domain}/${regionSlug}/${SERVICE_SLUG}/`,
    },
  };
}

export async function generateStaticParams() {
  const { REGIONS } = await import('@/hub.config');
  return REGIONS.map((r: { slug: string }) => ({ region: r.slug }));
}

export default async function ServiceIndexPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  const towns = region.towns.map((t: string) => ({
    name: t,
    slug: t.toLowerCase().replace(/\s+/g, '-').replace(/'/g, ''),
  }));

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-primary">Home</Link>
          {' / '}
          <Link href={`/${regionSlug}/`} className="hover:text-brand-primary">{region.name}</Link>
          {' / '}
          <span className="text-gray-900">{SERVICE_NAME}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {SERVICE_ICON} {SERVICE_NAME} in {region.name}, {region.stateCode}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {SERVICE_DESC} Our licensed {region.stateCode} exterminators serve every community in {region.name}.
        </p>

        {/* Trust stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { stat: 'Same-Day', label: 'Service Available' },
            { stat: 'Licensed', label: `${region.stateCode} Exterminators` },
            { stat: `${towns.length}`, label: 'Areas Covered' },
          ].map(({ stat, label }) => (
            <div key={stat} className="bg-brand-light rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-brand-primary">{stat}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* Dual CTA */}
        <div className="bg-brand-primary rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-white">
            <h2 className="text-xl font-bold mb-1">Need {SERVICE_NAME.toLowerCase()} in {region.name}?</h2>
            <p className="text-brand-light opacity-90 text-sm">Same-day service available throughout {region.name}.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact/"
              className="inline-block bg-brand-accent hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors whitespace-nowrap"
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:+1${BRAND.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-primary font-bold py-3 px-6 rounded-lg transition-colors hover:bg-gray-100 whitespace-nowrap"
            >
              📞 {BRAND.phoneFormatted}
            </a>
          </div>
        </div>

        {/* Town Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Find {SERVICE_NAME} in Your Town
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {towns.map((town) => (
            <Link
              key={town.slug}
              href={`/${regionSlug}/${SERVICE_SLUG}/${town.slug}/`}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-md hover:border-blue-300 transition-all text-center group"
            >
              <span className="font-medium text-gray-900 text-sm group-hover:text-blue-700">{town.name}</span>
            </Link>
          ))}
        </div>

        {/* Related Services */}
        <div className="bg-gray-50 rounded-lg p-5 mb-10">
          <h3 className="font-bold text-gray-900 mb-3">More Pest Control Services in {region.name}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${regionSlug}/`} className="text-brand-primary hover:underline">All Pest Control Services — {region.name}</Link></li>
            <li><Link href="/pest-control-near-me/" className="text-brand-primary hover:underline">Pest Control Near Me — {region.name}</Link></li>
            <li><Link href="/exterminator-near-me/" className="text-brand-primary hover:underline">Exterminator Near Me — {region.name}, {region.stateCode}</Link></li>
            <li><Link href="/contact/" className="text-brand-primary hover:underline">Free Inspection & Quote</Link></li>
          </ul>
        </div>
      </div>
      <CTABanner />
    </>
  );
}
