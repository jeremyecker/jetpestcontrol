import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getRegion } from '@/lib/regions';
import { BRAND } from '@/hub.config';

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};
  return {
    title: `Service Areas in ${region.name}`,
    description: `${BRAND.name} serves all towns across ${region.name}. Find your town below.`,
  };
}

export async function generateStaticParams() {
  const { getAllRegionSlugs } = await import('@/lib/regions');
  return getAllRegionSlugs().map(slug => ({ region: slug }));
}

export default async function ServiceAreasPage({ params }: { params: Promise<{ region: string }> }) {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Service Areas — {region.name}
        </h1>
        <p className="text-xl text-gray-600">
          We serve all {region.townCount > 0 ? region.townCount : ''} towns across {region.name}.
        </p>
      </div>

      {region.towns.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {region.towns.map(town => {
            const townSlug = town.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={town}
                href={`/${regionSlug}/${townSlug}/`}
                className="bg-white rounded-lg border border-gray-200 px-4 py-3 text-center hover:border-brand-primary hover:text-brand-primary transition-colors font-medium"
              >
                {town}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Towns list coming soon. Call us to confirm service to your area.</p>
          <a
            href={`tel:+1${BRAND.phone.replace(/\D/g, '')}`}
            className="mt-4 inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary"
          >
            Call {BRAND.phoneFormatted}
          </a>
        </div>
      )}
    </div>
  );
}
