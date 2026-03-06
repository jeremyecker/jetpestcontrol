import Link from 'next/link';
import { GEO } from '@/site.config';
import { getAllTowns, getTownCount, getTownsByCounty } from '@/lib/db';
import type { Town } from '@/lib/types';

interface TownGridProps {
  title?: string;
  subtitle?: string;
  towns?: Town[];
  limit?: number;
  showViewAll?: boolean;
}

export default function TownGrid({
  title,
  subtitle,
  towns,
  limit,
  showViewAll = true,
}: TownGridProps) {
  const totalCount = getTownCount();
  const defaultTitle = `Your Neighbors in the ${GEO.region} Trust Us`;
  const defaultSubtitle = `We serve families in ${totalCount}+ communities across ${GEO.region}. Find your community below.`;

  const allTowns = towns || getAllTowns();
  const displayTowns = limit ? allTowns.slice(0, limit) : allTowns;

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-4">{title || defaultTitle}</h2>
          {(subtitle || defaultSubtitle) && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle || defaultSubtitle}</p>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {displayTowns.map((town) => (
            <Link
              key={town.slug}
              href={`/${town.countySlug}/${town.slug}`}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-700 hover:bg-brand-light hover:border-brand-primary hover:text-brand-primary transition-all duration-200"
            >
              {town.name}
            </Link>
          ))}
        </div>

        {showViewAll && limit && limit < allTowns.length && (
          <div className="text-center mt-8">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-secondary transition-colors"
            >
              View All {totalCount}+ Service Areas →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
