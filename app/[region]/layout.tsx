import { notFound } from 'next/navigation';
import { getRegion } from '@/lib/regions';

export default async function RegionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ region: string }>;
}) {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  return <>{children}</>;
}

export async function generateStaticParams() {
  const { getAllRegionSlugs } = await import('@/lib/regions');
  return getAllRegionSlugs().map(slug => ({ region: slug }));
}
