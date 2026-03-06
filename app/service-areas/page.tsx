import Link from 'next/link';
import type { Metadata } from 'next';
import { REGIONS } from '@/hub.config';
import { SITE_NAME, GEO } from '@/site.config';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'All Service Areas',
  description: `${SITE_NAME} serves ${GEO.totalTowns}+ communities. Find your town.`,
};

export default function ServiceAreasPage() {
  const totalTowns = REGIONS.reduce((sum, r) => sum + r.townCount, 0);
  const regionList = REGIONS.map(r => r.name).join(', ').replace(/, ([^,]*)$/, ' & $1');

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Service Areas
          </h1>
          <p className="text-xl text-gray-600">
            Serving {totalTowns}+ communities across {regionList}.
          </p>
        </div>

        {REGIONS.map(region => (
          <div key={region.slug} className="mb-12">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                <Link href={`/${region.slug}`} className="hover:text-brand-primary transition-colors">
                  {region.name}
                </Link>
              </h2>
              <span className="text-gray-500 text-sm">{region.townCount} communities</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {region.towns.map(town => {
                const townSlug = town.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={town}
                    href={`/${region.slug}/${townSlug}`}
                    className="bg-white rounded-lg border border-gray-200 px-4 py-3 text-center hover:border-brand-primary hover:text-brand-primary transition-colors font-medium text-sm"
                  >
                    {town}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <CTABanner />
    </>
  );
}
