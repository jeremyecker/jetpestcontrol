import type { Metadata } from 'next';
import { getLeadCapturePage } from '@/lib/jet-lead-capture-data';
import LeadCapturePage from '@/components/LeadCapturePage';

const LEAD_TYPE = 'same-day-pest-control';

export async function generateMetadata(
  { params }: { params: Promise<{ region: string }> }
): Promise<Metadata> {
  const { region } = await params;
  const page = getLeadCapturePage(region, LEAD_TYPE);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://jetpestcontrol.com/${region}/${LEAD_TYPE}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDesc,
      url: `https://jetpestcontrol.com/${region}/${LEAD_TYPE}`,
      images: [{ url: 'https://jetpestcontrol.com/og-image.png' }],
    },
  };
}

export async function generateStaticParams() {
  const regions = ['brooklyn', 'queens', 'manhattan', 'nassau', 'suffolk'];
  return regions.map(region => ({ region }));
}

export default async function Page({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  return <LeadCapturePage region={region} leadType={LEAD_TYPE} />;
}
