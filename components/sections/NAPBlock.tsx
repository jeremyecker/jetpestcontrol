import { type GMBEntry, type RegionConfig } from '@/hub.config';
import { BRAND } from '@/hub.config';

interface NAPBlockProps {
  gmb: GMBEntry;
  region: RegionConfig;
}

export default function NAPBlock({ gmb, region }: NAPBlockProps) {
  return (
    <section className="py-10 px-4 bg-green-50 border-y border-green-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-green-900 mb-4">{region.name} Office</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-green-800">
          <div>
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">Address</p>
            <address className="not-italic">
              <p>{gmb.address}</p>
              <p>{gmb.city}, {gmb.state} {gmb.zip}</p>
            </address>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">Phone</p>
            <a href={`tel:+1${gmb.phone.replace(/\D/g, '')}`} className="font-bold hover:underline">
              {gmb.phone}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">Hours</p>
            <p>Mon–Fri: 7AM–7PM</p>
            <p>Sat: 7AM–5PM</p>
          </div>
        </div>
        {gmb.reviewCount > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-yellow-500 text-lg">{'⭐'.repeat(Math.round(gmb.rating))}</span>
            <span className="font-semibold text-green-800">{gmb.rating} out of 5</span>
            <span className="text-green-600">({gmb.reviewCount} reviews)</span>
          </div>
        )}
      </div>
    </section>
  );
}
