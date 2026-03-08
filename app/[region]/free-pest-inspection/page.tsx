import type { Metadata } from 'next';
import { getLeadCapturePage } from '@/lib/jet-lead-capture-data';
import LeadCapturePage from '@/components/LeadCapturePage';

const LEAD_TYPE = 'free-pest-inspection';

export async function generateMetadata(
  { params }: { params: { region: string } }
): Promise<Metadata> {
  const page = getLeadCapturePage(params.region, LEAD_TYPE);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://jetpestcontrol.com/${params.region}/${LEAD_TYPE}` },
  };
}

export default function Page({ params }: { params: { region: string } }) {
  return <LeadCapturePage region={params.region} leadType={LEAD_TYPE} />;
}
