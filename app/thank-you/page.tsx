import Link from 'next/link';
import { SITE_NAME, PHONE, PHONE_HREF } from '@/site.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Thank You | ${SITE_NAME}`,
  description: `Thank you for contacting ${SITE_NAME}. We'll get back to you ASAP.`,
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="flex-1">
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-4">
            Thank You for Reaching Out!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;ve received your request and will get back to you ASAP. If you need immediate
            assistance, please call us directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-brand-accent text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
            >
              📞 Call {PHONE}
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 text-lg"
            >
              Return Home
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-8">
            No commitment. We&apos;ll get back to you ASAP.
          </p>
        </div>
      </section>
    </main>
  );
}
