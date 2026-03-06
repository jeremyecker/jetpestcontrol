import { REGIONS, GMBS, type RegionConfig, type GMBEntry } from '@/hub.config';

export function getRegion(slug: string): RegionConfig | undefined {
  return REGIONS.find(r => r.slug === slug);
}

export function getPrimaryRegion(): RegionConfig {
  return REGIONS.find(r => r.isPrimary) ?? REGIONS[0];
}

export function getRegionGMB(region: RegionConfig): GMBEntry | null {
  if (!region.gmbId) return null;
  return GMBS.find(g => g.id === region.gmbId) ?? null;
}

export function getAllRegionSlugs(): string[] {
  return REGIONS.map(r => r.slug);
}

export function hasAnyGMB(): boolean {
  return GMBS.length > 0;
}
