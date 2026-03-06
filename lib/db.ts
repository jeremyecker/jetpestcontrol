import townData from '@/data/towns.json';
import type { Town, TownData, CountyGroup } from '@/lib/types';

const data = townData as TownData;

/**
 * Get all towns across all regions (with county info attached)
 */
export function getAllTowns(): Town[] {
  return data.regions.flatMap(r =>
    r.towns.map(t => ({ ...t, county: r.county, countySlug: r.regionSlug }))
  );
}

/**
 * Get towns for a specific region by slug
 */
export function getTownsByRegion(regionSlug: string): Town[] {
  const region = data.regions.find(r => r.regionSlug === regionSlug);
  if (!region) return [];
  return region.towns.map(t => ({ ...t, county: region.county, countySlug: region.regionSlug }));
}

/**
 * Get a single town by slug
 */
export function getTownBySlug(slug: string): Town | undefined {
  return getAllTowns().find(t => t.slug === slug);
}

/**
 * Get all town slugs (for static params generation)
 */
export function getAllTownSlugs(): string[] {
  return getAllTowns().map(t => t.slug);
}

/**
 * Get towns grouped by county/region
 */
export function getTownsByCounty(): CountyGroup[] {
  return data.regions.map(r => ({
    county: r.county,
    countySlug: r.regionSlug,
    towns: r.towns.map(t => ({ ...t, county: r.county, countySlug: r.regionSlug })),
  }));
}

/**
 * Get nearby towns (simple: return a few towns for internal linking)
 */
export function getNearbyTowns(currentSlug: string, count: number = 6): Town[] {
  const all = getAllTowns();
  const idx = all.findIndex(t => t.slug === currentSlug);
  if (idx === -1) return all.slice(0, count);

  const nearby: Town[] = [];
  for (let i = 1; nearby.length < count && (idx - i >= 0 || idx + i < all.length); i++) {
    if (idx - i >= 0) nearby.push(all[idx - i]);
    if (nearby.length < count && idx + i < all.length) nearby.push(all[idx + i]);
  }
  return nearby;
}

/**
 * Get total town count
 */
export function getTownCount(): number {
  return data.totalTowns;
}
