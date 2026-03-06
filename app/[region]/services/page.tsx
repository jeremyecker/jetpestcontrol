import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getRegion } from '@/lib/regions';
import { SERVICES, getServiceDescription } from '@/lib/services';
import { BRAND } from '@/hub.config';

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};
  return {
    title: `Pest Control Services in ${region.name}`,
    description: `Full pest control services for ${region.name} homeowners and businesses. ${region.pestContext}.`,
  };
}

export async function generateStaticParams() {
  const { getAllRegionSlugs } = await import('@/lib/regions');
  return getAllRegionSlugs().map(slug => ({ region: slug }));
}

export default async function ServicesPage({ params }: { params: Promise<{ region: string }> }) {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Pest Control Services in {region.name}
        </h1>
        <p className="text-xl text-gray-600">{region.pestContext}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(service => (
          <Link
            key={service.slug}
            href={`/${regionSlug}/services/${service.slug}/`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 p-6 group"
          >
            <div className="text-4xl mb-3">{service.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
              {service.name}
            </h2>
            <p className="text-gray-600 text-sm">{getServiceDescription(service, region)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
