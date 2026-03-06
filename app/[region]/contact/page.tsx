import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getRegion, getRegionGMB } from '@/lib/regions';
import { SITE_NAME, PHONE, PHONE_HREF, REGIONS, HOURS } from '@/site.config';
import LeadForm from '@/components/forms/LeadForm';

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};
  return {
    title: `Contact Us — ${region.name} Pest Control`,
    description: `Get a free pest control estimate in ${region.name}. Call or fill out our form — fast response, no pressure.`,
  };
}

export async function generateStaticParams() {
  const { getAllRegionSlugs } = await import('@/lib/regions');
  return getAllRegionSlugs().map(slug => ({ region: slug }));
}

export default async function ContactPage({ params }: { params: Promise<{ region: string }> }) {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();
  const gmb = getRegionGMB(region);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Contact {SITE_NAME} — {region.name}
        </h1>
        <p className="text-xl text-gray-600">
          Get a free estimate or ask a question. We respond fast.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <LeadForm />
        </div>
        <div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a href={PHONE_HREF} className="text-brand-primary font-bold text-lg hover:underline">
                  {PHONE}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hours</p>
                <p className="text-gray-700">Mon–Fri: {HOURS.weekday}</p>
                <p className="text-gray-700">Sat: {HOURS.saturday}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Areas</p>
                {REGIONS.map(r => (
                  <p key={r.slug} className="text-gray-700">{r.name}</p>
                ))}
              </div>
              {gmb && (
                <div>
                  <p className="text-sm text-gray-500">Office</p>
                  <p className="text-gray-700">{gmb.address}</p>
                  <p className="text-gray-700">{gmb.city}, {gmb.state} {gmb.zip}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
