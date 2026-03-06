import type { Metadata } from 'next';
import { SITE_NAME, SITE_DOMAIN, PHONE, EMAIL, REGIONS } from '@/site.config';

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Terms of Service for ${SITE_NAME}. Read our terms governing use of our website and services.`,
};

export default function TermsPage() {
  const regionNames = REGIONS.map(r => r.name).join(', ');

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-gray-500 mb-8">Last updated: March 2025</p>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using the {SITE_DOMAIN} website (the &quot;Site&quot;), you agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not use the Site.
        </p>

        <h2>Services</h2>
        <p>
          {SITE_NAME} provides pest control and extermination services in {regionNames}, New York. Service estimates
          provided through this website are non-binding until confirmed by a {SITE_NAME} representative.
        </p>

        <h2>Use of Website</h2>
        <p>You agree to use this website only for lawful purposes. You may not:</p>
        <ul>
          <li>Submit false, misleading, or fraudulent information through our forms</li>
          <li>Interfere with the proper functioning of the Site</li>
          <li>Attempt to gain unauthorized access to any part of the Site</li>
          <li>Use the Site for any purpose that violates applicable laws or regulations</li>
        </ul>

        <h2>Service Estimates</h2>
        <p>
          Estimates provided through this website are preliminary and subject to change based on on-site inspection.
          Final pricing will be provided before any work begins. You are under no obligation to accept any estimate.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on this website, including text, images, logos, and design elements, is the property of {SITE_NAME} and
          may not be reproduced, distributed, or used without prior written permission.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          {SITE_NAME} is not liable for any indirect, incidental, special, or consequential damages arising from your use
          of this website. The Site is provided &quot;as is&quot; without warranties of any kind.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our Site may contain links to third-party websites. We are not responsible for the content or privacy
          practices of those sites.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms of Service at any time. Changes will be posted on this page.
          Continued use of the Site after changes constitutes acceptance of the updated terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of the State of New York.
        </p>

        <h2>Contact Us</h2>
        <p>If you have questions about these Terms of Service, please contact us:</p>
        <ul>
          <li>Phone: {PHONE}</li>
          <li>Email: <a href={`mailto:${EMAIL}`} className="text-brand-primary hover:underline">{EMAIL}</a></li>
        </ul>
      </div>
    </div>
  );
}
