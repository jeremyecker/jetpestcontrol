import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { COMMERCIAL_VERTICALS } from '@/lib/jet-commercial-data';
import { BRAND } from '@/hub.config';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const vertical = COMMERCIAL_VERTICALS.find(v => v.slug === slug);
  if (!vertical) return {};
  return {
    title: `${vertical.metaTitle} | Jet Pest Control`,
    description: vertical.metaDescription,
  };
}

export function generateStaticParams() {
  return COMMERCIAL_VERTICALS.map(v => ({ slug: v.slug }));
}

export default async function CommercialVerticalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vertical = COMMERCIAL_VERTICALS.find(v => v.slug === slug);
  if (!vertical) notFound();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND.name,
    telephone: `+1${BRAND.phone}`,
    url: `https://${BRAND.domain}`,
    areaServed: ['Brooklyn', 'Queens', 'Manhattan', 'Nassau County', 'Suffolk County'],
    description: vertical.metaDescription,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: vertical.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b border-gray-200 py-3">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-700 transition-colors">Home</Link>
              </li>
              <li><span className="mx-1">/</span></li>
              <li>
                <Link href="/commercial" className="hover:text-blue-700 transition-colors">Commercial</Link>
              </li>
              <li><span className="mx-1">/</span></li>
              <li className="text-gray-900 font-medium">{vertical.name}</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B3A5C] to-[#2A5C8F] text-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-5xl mb-4">{vertical.icon}</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {vertical.headline}
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mb-8">
              {vertical.subhead}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:+1${BRAND.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {BRAND.phoneFormatted}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#1B3A5C] font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Pest Threats */}
        <section className="py-10 px-4 bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Primary Pest Threats</p>
            <div className="flex flex-wrap gap-3">
              {vertical.pests.map(pest => (
                <span
                  key={pest}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#1B3A5C] text-white"
                >
                  {pest}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-6">Overview</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{vertical.overview}</p>
          </div>
        </section>

        {/* Key Challenges */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-10 text-center">Key Pest Challenges</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {vertical.challenges.map((challenge, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1B3A5C] mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-10 text-center">Our Approach</h2>
            <div className="space-y-8">
              {vertical.ourApproach.map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1B3A5C] text-white flex items-center justify-center text-xl font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold text-[#1B3A5C] mb-2">{step.step}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Types */}
        <section className="py-14 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-8 text-center">Industry Types We Serve</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {vertical.industries.map(industry => (
                <span
                  key={industry}
                  className="inline-flex items-center px-5 py-3 rounded-full text-sm font-semibold bg-white text-[#1B3A5C] border-2 border-[#1B3A5C] shadow-sm"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why Professional Service Matters */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1B3A5C] to-[#2A5C8F] rounded-2xl p-8 sm:p-12 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Professional Service Matters</h2>
            <p className="text-blue-100 text-lg leading-relaxed">{vertical.whyMatters}</p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {vertical.faqs.map((faq, i) => (
                <details key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm group">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-[#1B3A5C] text-lg list-none">
                    <span>{faq.q}</span>
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4 bg-[#E63946] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Protect Your {vertical.name} Business?
            </h2>
            <p className="text-red-100 text-lg mb-8">
              Serving Brooklyn, Queens, Manhattan, Nassau County &amp; Suffolk County. Free estimates, same-day response available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:+1${BRAND.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#E63946] font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {BRAND.phoneFormatted}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1B3A5C] hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Back to Commercial */}
        <div className="py-8 px-4 text-center border-t border-gray-200">
          <Link
            href="/commercial"
            className="inline-flex items-center gap-2 text-[#1B3A5C] hover:text-blue-700 font-semibold text-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View All Commercial Services
          </Link>
        </div>
      </main>
    </>
  );
}
