import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getRegion } from '@/lib/regions';
import { SERVICES, getServiceDescription } from '@/lib/services';
import { SERVICE_CONTENT } from '@/lib/service-content';
import { serviceSchema } from '@/lib/seo';
import Schema from '@/components/seo/Schema';
import { BRAND, REGIONS } from '@/hub.config';
import CTABanner from '@/components/sections/CTABanner';

export async function generateMetadata({ params }: { params: Promise<{ region: string; slug: string }> }): Promise<Metadata> {
  const { region: regionSlug, slug } = await params;
  const region = getRegion(regionSlug);
  const service = SERVICES.find(s => s.slug === slug);
  if (!region || !service) return {};
  return {
    title: `${service.name} in ${region.name}`,
    description: getServiceDescription(service, region),
  };
}

export async function generateStaticParams() {
  const { getAllRegionSlugs } = await import('@/lib/regions');
  const slugs = getAllRegionSlugs();
  return slugs.flatMap(region =>
    SERVICES.map(service => ({ region, slug: service.slug }))
  );
}

function getFullServiceArea(): string {
  const names = REGIONS.map(r => r.name);
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
}

export default async function ServicePage({ params }: { params: Promise<{ region: string; slug: string }> }) {
  const { region: regionSlug, slug } = await params;
  const region = getRegion(regionSlug);
  const service = SERVICES.find(s => s.slug === slug);
  if (!region || !service) notFound();

  const content = SERVICE_CONTENT[service.slug];
  const schema = serviceSchema(service.name, service.slug, getServiceDescription(service, region));
  const fullArea = getFullServiceArea();

  return (
    <>
      <Schema data={schema} />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${regionSlug}/`} className="hover:text-brand-primary">{region.name}</Link>
          {' → '}
          <Link href={`/${regionSlug}/services/`} className="hover:text-brand-primary">Services</Link>
          {' → '}
          <span className="text-gray-900">{service.name}</span>
        </nav>

        <div className="text-6xl mb-4">{service.icon}</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {service.name} in {region.name}
        </h1>
        <p className="text-xl text-gray-600 mb-8">{getServiceDescription(service, region)}</p>

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

            <div className="bg-brand-light rounded-xl p-6 mb-10">
              <h2 className="text-xl font-bold text-brand-dark mb-3">Why Professional {service.name} Matters</h2>
              <p className="text-brand-dark leading-relaxed">{content.whyPro}</p>
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
            <li>✅ Serving all of {fullArea}</li>
          </ul>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">Get a free, no-obligation estimate for {service.name.toLowerCase()} in {region.name}.</p>
          <a
            href={`tel:+1${BRAND.phone.replace(/\D/g, '')}`}
            className="inline-block bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-10 rounded-lg text-xl transition-colors mr-4 mb-3"
          >
            Call {BRAND.phoneFormatted}
          </a>
          <Link
            href={`/${regionSlug}/contact/`}
            className="inline-block bg-brand-accent hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-colors mb-3"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
      <CTABanner />
    </>
  );
}
