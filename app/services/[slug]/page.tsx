import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { SERVICE_CONTENT } from '@/lib/service-content';
import { BRAND, REGIONS } from '@/hub.config';

const serviceArea = REGIONS.map(r => r.name).join(', ').replace(/, ([^,]*)$/, ' & $1');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: `Professional ${service.name.toLowerCase()} for ${serviceArea}. Licensed, insured. Same-day service available. Call ${BRAND.phoneFormatted}.`,
  };
}

export function generateStaticParams() {
  return SERVICES.map(service => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);
  if (!service) notFound();

  const content = SERVICE_CONTENT[service.slug];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-brand-primary">Home</Link>
        {' → '}
        <Link href="/services" className="hover:text-brand-primary">Services</Link>
        {' → '}
        <span className="text-gray-900">{service.name}</span>
      </nav>

      <div className="text-6xl mb-4">{service.icon}</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {service.name}
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Professional {service.name.toLowerCase()} for {serviceArea}.
      </p>

      {content && (
        <>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed">{content.overview}</p>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">⚠️ Signs You Need {service.name}</h2>
            <ul className="space-y-3">
              {content.signs.map((sign, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span className="text-gray-700">{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our {service.name} Process</h2>
            <div className="space-y-4">
              {content.process.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-lg">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{step.step}</h3>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🛡️ Prevention Tips</h2>
            <ul className="space-y-3">
              {content.prevention.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Professional {service.name} Matters</h2>
            <p className="text-gray-700 leading-relaxed">{content.whyPro}</p>
          </div>
        </>
      )}

      <div className="bg-gray-50 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Why Choose {BRAND.name}?</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✅ Licensed and insured technicians</li>
          <li>✅ Family and pet-safe treatments</li>
          <li>✅ Same-day service available</li>
          <li>✅ Free, no-obligation estimates</li>
          <li>✅ Serving all of {serviceArea}</li>
        </ul>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">Get a free, no-obligation estimate for {service.name.toLowerCase()}.</p>
        <a
          href={`tel:+1${BRAND.phone.replace(/\D/g, '')}`}
          className="inline-block bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-10 rounded-lg text-xl transition-colors mr-4 mb-3"
        >
          Call {BRAND.phoneFormatted}
        </a>
        <Link
          href="/contact"
          className="inline-block bg-brand-accent hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-colors mb-3"
        >
          Get Free Quote
        </Link>
      </div>
    </div>
  );
}
