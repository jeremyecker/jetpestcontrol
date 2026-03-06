import type { Metadata } from 'next';
import { BRAND } from '@/hub.config';
import { SITE_NAME, REGIONS } from '@/site.config';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE_NAME}. Licensed, insured, family-safe pest control.`,
};

export default function AboutPage() {
  const regionNames = REGIONS.map(r => r.name).join(', ');
  const yearsInBusiness = new Date().getFullYear() - BRAND.yearFounded;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About {SITE_NAME}</h1>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            {SITE_NAME} has been protecting homes and businesses across {regionNames} since {BRAND.yearFounded}.
            We&apos;re a locally operated company with deep roots in the communities we serve.
          </p>
          <p>
            Our technicians are licensed, insured, and trained in the latest Integrated Pest Management (IPM)
            techniques — approaches that are effective against pests while being safe for your family and pets.
          </p>
          <h2>Why Homeowners Choose Us</h2>
          <ul>
            <li>Local experts who understand the pest pressures across {regionNames}</li>
            <li>Same-day service availability</li>
            <li>Family-safe, EPA-approved treatments</li>
            <li>Transparent pricing — no surprise charges</li>
            <li>Over {yearsInBusiness} years of experience</li>
            <li>We stand behind our work</li>
          </ul>
          <h2>Our Commitment</h2>
          <p>
            Every home is different. We take the time to assess your specific situation before recommending
            a treatment plan. Your family&apos;s safety and peace of mind is our first priority.
          </p>
        </div>
      </div>
      <CTABanner />
    </>
  );
}
