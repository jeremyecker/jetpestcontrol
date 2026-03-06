import type { Metadata } from 'next';
import { SITE_NAME, SITE_DOMAIN, PHONE, EMAIL } from '@/site.config';

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Privacy policy for ${SITE_NAME}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: March 2025</p>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website {SITE_DOMAIN} (the
          &quot;Site&quot;). This Privacy Policy explains how we collect, use, and protect your personal information
          when you visit our Site or use our services.
        </p>

        <h2>Information We Collect</h2>
        <p>When you submit a form on our Site, we may collect:</p>
        <ul>
          <li>Contact information (name, phone number, email address)</li>
          <li>Location information (zip code)</li>
          <li>Service details (pest type, property type, description of issue)</li>
          <li>Communication preferences (SMS consent)</li>
        </ul>
        <p>
          We also automatically collect usage data including pages visited, time on site, browser type, and referral
          source through cookies and analytics tools.
        </p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To respond to your service inquiries and provide pest control estimates</li>
          <li>To contact you regarding your service request via phone, email, or text message</li>
          <li>To improve our website and services</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>Text Message Consent</h2>
        <p>
          By submitting a form and checking the SMS consent box, you agree to receive text messages from {SITE_NAME} at
          the phone number you provided. Message and data rates may apply. Message frequency varies. Reply STOP to opt
          out at any time. Reply HELP for assistance.
        </p>

        <h2>Information Sharing</h2>
        <p>We do not sell your personal information. We may share your information with:</p>
        <ul>
          <li>Our service partners who help us fulfill your pest control service request</li>
          <li>Third-party tools we use to manage and track service requests (e.g., CRM systems)</li>
          <li>Analytics providers (e.g., Google Analytics) in anonymized or aggregated form</li>
          <li>As required by law or legal process</li>
        </ul>

        <h2>Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies, including Google Analytics, to understand how visitors use our
          website and to improve your experience. You can control cookies through your browser settings.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement reasonable security measures to protect your personal information. However, no method of
          transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2>Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information by contacting us
          at <a href={`mailto:${EMAIL}`} className="text-brand-primary hover:underline">{EMAIL}</a> or
          by calling <a href={`tel:+1${PHONE.replace(/\\D/g, '')}`} className="text-brand-primary hover:underline">{PHONE}</a>.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our Site is not intended for children under 13 years of age. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an
          updated revision date.
        </p>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li>Phone: {PHONE}</li>
          <li>Email: <a href={`mailto:${EMAIL}`} className="text-brand-primary hover:underline">{EMAIL}</a></li>
        </ul>
      </div>
    </div>
  );
}
