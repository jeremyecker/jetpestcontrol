import type { Metadata } from 'next';
import { SITE_NAME, PHONE, PHONE_HREF, REGIONS, HOURS } from '@/site.config';
import LeadForm from '@/components/forms/LeadForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get a free pest control estimate from ${SITE_NAME}. Call or fill out our form.`,
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Contact {SITE_NAME}
        </h1>
        <p className="text-xl text-gray-600">
          Get a free estimate or ask a question. We respond fast.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <LeadForm variant="page" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
